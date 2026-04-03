// EPEX Price Worker - Fetch Austrian Spot Prices
// Runs every 15 minutes

import { db } from './db/index.js';
import { epexPrices } from './db/schema/prices.js';

interface EPEXPriceResponse {
  data: Array<{
    datetime: string;
    price: number;
  }>;
}

export async function fetchEPEXPrices(): Promise<number> {
  const API_KEY = process.env.EPEX_API_KEY;
  
  if (!API_KEY) {
    console.log('⚠️ EPEX API Key not configured, using mock data');
    return await fetchMockPrices();
  }
  
  try {
    // EPEX Austrian Day-Ahead Prices
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const response = await fetch(
      `https://api.epexspot.com/api/v1/marketdata/at/2024-01-01/AT/2024-01-02?token=${API_KEY}`,
      { signal: AbortSignal.timeout(10000) }
    );
    
    if (!response.ok) {
      throw new Error(`EPEX API error: ${response.status}`);
    }
    
    const data: EPEXPriceResponse = await response.json();
    
    let savedCount = 0;
    
    for (const hour of data.data) {
      const hourNum = new Date(hour.datetime).getHours();
      
      await db.insert(epexPrices).values({
        date: new Date(hour.datetime).toISOString().split('T')[0] + ' ' + hourNum + ':00:00',
        hour: hourNum,
        priceEurMwh: hour.price,
      }).onConflictDoNothing();
      
      savedCount++;
    }
    
    console.log(`✅ Saved ${savedCount} EPEX prices`);
    return savedCount;
    
  } catch (error) {
    console.error('❌ EPEX fetch failed:', error);
    return await fetchMockPrices();
  }
}

// Mock data for development
async function fetchMockPrices(): Promise<number> {
  const today = new Date();
  const prices = [
    // Night hours (0-6): cheap
    8.5, 7.2, 6.8, 6.5, 7.0, 8.2,
    // Morning (7-12): medium
    12.5, 18.3, 22.1, 24.5, 25.2, 24.8,
    // Afternoon (13-18): high
    23.5, 22.8, 21.5, 20.2, 18.5, 15.2,
    // Evening (19-23): medium
    14.8, 13.2, 11.5, 10.2, 9.5
  ];
  
  let savedCount = 0;
  
  for (let hour = 0; hour < 24; hour++) {
    const price = prices[hour] || 15.0;
    
    await db.insert(epexPrices).values({
      date: today.toISOString().split('T')[0],
      hour: hour,
      priceEurMwh: price,
    }).onConflictDoUpdate({
      target: [epexPrices.date, epexPrices.hour],
      set: { priceEurMwh: price },
    });
    
    savedCount++;
  }
  
  console.log(`✅ Saved ${savedCount} mock EPEX prices`);
  return savedCount;
}

// Get current price
export async function getCurrentPrice(): Promise<number> {
  const now = new Date();
  const hour = now.getHours();
  
  const result = await db.select()
    .from(epexPrices)
    .where(sql`date = ${now.toISOString().split('T')[0]} AND hour = ${hour}`)
    .limit(1);
  
  if (result.length > 0) {
    return Number(result[0].priceEurMwh);
  }
  
  // Default price if not found
  return 15.0;
}

// Get price forecast for next 24 hours
export async function getPriceForecast(): Promise<Array<{ hour: number; price: number; period: string }>> {
  const today = new Date().toISOString().split('T')[0];
  
  const prices = await db.select()
    .from(epexPrices)
    .where(sql`date >= ${today}`)
    .orderBy(epexPrices.hour);
  
  const periods = [
    { start: 0, end: 5, label: 'Nacht (günstig)' },
    { start: 6, end: 8, label: 'Früh' },
    { start: 9, end: 12, label: 'Vormittag' },
    { start: 13, end: 17, label: 'Nachmittag' },
    { start: 18, end: 20, label: 'Abend' },
    { start: 21, end: 23, label: 'Nacht' }
  ];
  
  return prices.map(p => {
    const hour = p.hour;
    const period = periods.find(per => hour >= per.start && hour <= per.end)?.label || 'Unknown';
    return { hour, price: Number(p.priceEurMwh), period };
  });
}
