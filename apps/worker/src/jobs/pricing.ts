// Pricing Engine - Dynamic Tariff Calculation
// Calculates optimal pricing based on EPEX, grid fees, and taxes

interface PriceComponent {
  name: string;
  amountEurPerMwh: number;
  isDynamic: boolean;
}

interface TariffCalculation {
  totalEurPerMwh: number;
  components: PriceComponent[];
  breakdown: {
    energy: number;
    grid: number;
    taxes: number;
  };
}

// Austrian grid fees (average 2024 - would come from config in production)
const AUSTRIAN_GRID_FEES = {
  'Wien': 45.50,      // EUR/MWh
  'OÖ': 38.20,
  'NÖ': 42.10,
  'S': 35.80,
  'K': 41.50,
  'B': 39.90,
  'ST': 40.30,
};

// Standard taxes and levies
const TAXES_AND_LEVIES = {
  elektrizitaetsabgabe: 0,  // AT has none for households
  kWK_pauschale: 3.50,       // Cogeneration levy
  offshore_umlage: 0.40,      // Offshore wind
  abschaltumlage: 0.70,      // Interruptible loads
};

// Calculate dynamic tariff price for a specific hour
export function calculateHourlyPrice(
  epexPriceEurPerMwh: number,
  gridRegion: string = 'Wien',
  markupPercent: number = 15
): TariffCalculation {
  
  // Get grid fee for region
  const gridFee = AUSTRIAN_GRID_FEES[gridRegion as keyof typeof AUSTRIAN_GRID_FEES] || 40;
  
  // Calculate markup (supplier margin)
  const markup = epexPriceEurPerMwh * (markupPercent / 100);
  
  // Calculate taxes
  const taxTotal = Object.values(TAXES_AND_LEVIES).reduce((sum, val) => sum + val, 0);
  
  // Total
  const total = epexPriceEurPerMwh + markup + gridFee + taxTotal;
  
  return {
    totalEurPerMwh: Math.round(total * 100) / 100,
    components: [
      { name: 'EPEX Spot', amountEurPerMwh: epexPriceEurPerMwh, isDynamic: true },
      { name: 'Lieferanten-Marge', amountEurPerMwh: markup, isDynamic: true },
      { name: 'Netzgebühren', amountEurPerMwh: gridFee, isDynamic: false },
      { name: 'KWK-Pauschale', amountEurPerMwh: TAXES_AND_LEVIES.kWK_pauschale, isDynamic: false },
      { name: 'Offshore-Umlage', amountEurPerMwh: TAXES_AND_LEVIES.offshore_umlage, isDynamic: false },
      { name: 'Abschalt-Umlage', amountEurPerMwh: TAXES_AND_LEVIES.abschaltumlage, isDynamic: false },
    ],
    breakdown: {
      energy: epexPriceEurPerMwh + markup,
      grid: gridFee,
      taxes: taxTotal,
    },
  };
}

// Calculate monthly cost estimate
export function calculateMonthlyCost(
  consumptionKwh: number,
  hourlyPrices: number[],
  gridRegion: string = 'Wien',
  markupPercent: number = 15
): { totalEur: number; perKwh: number; breakdown: any } {
  
  const avgPricePerMwh = hourlyPrices.reduce((sum, p) => sum + p, 0) / hourlyPrices.length;
  
  const calc = calculateHourlyPrice(avgPricePerMwh, gridRegion, markupPercent);
  
  const totalEur = (consumptionKwh / 1000) * calc.totalEurPerMwh;
  const perKwh = calc.totalEurPerMwh / 1000;
  
  return {
    totalEur: Math.round(totalEur * 100) / 100,
    perKwh: Math.round(perKwh * 10000) / 10000,
    breakdown: {
      energyCost: (consumptionKwh / 1000) * calc.breakdown.energy,
      gridCost: (consumptionKwh / 1000) * calc.breakdown.grid,
      taxCost: (consumptionKwh / 1000) * calc.breakdown.taxes,
    },
  };
}

// Find optimal charging windows
export function findOptimalChargingWindows(
  hourlyPrices: number[],
  targetHours: number = 6,
  minConsecutive: number = 2
): Array<{ startHour: number; endHour: number; avgPrice: number }> {
  
  // Sort hours by price
  const priceWithHours = hourlyPrices.map((price, hour) => ({ hour, price }));
  priceWithHours.sort((a, b) => a.price - b.price);
  
  const windows: Array<{ startHour: number; endHour: number; avgPrice: number }> = [];
  
  // Take the cheapest hours
  const cheapestHours = priceWithHours.slice(0, targetHours);
  
  // Group consecutive hours
  cheapestHours.sort((a, b) => a.hour - b.hour);
  
  let currentWindow = { start: cheapestHours[0].hour, end: cheapestHours[0].hour + 1, prices: [cheapestHours[0].price] };
  
  for (let i = 1; i < cheapestHours.length; i++) {
    if (cheapestHours[i].hour === cheapestHours[i-1].hour + 1) {
      currentWindow.end = cheapestHours[i].hour + 1;
      currentWindow.prices.push(cheapestHours[i].price);
    } else {
      windows.push({
        startHour: currentWindow.start,
        endHour: currentWindow.end,
        avgPrice: currentWindow.prices.reduce((s, p) => s + p, 0) / currentWindow.prices.length,
      });
      currentWindow = { start: cheapestHours[i].hour, end: cheapestHours[i].hour + 1, prices: [cheapestHours[i].price] };
    }
  }
  
  windows.push({
    startHour: currentWindow.start,
    endHour: currentWindow.end,
    avgPrice: currentWindow.prices.reduce((s, p) => s + p, 0) / currentWindow.prices.length,
  });
  
  return windows;
}

// Calculate savings vs fixed tariff
export function compareWithFixedTariff(
  hourlyPrices: number[],
  fixedTariffPerKwh: number,  // in EUR per kWh
  consumptionKwh: number
): { fixedCost: number; dynamicCost: number; savings: number; savingsPercent: number } {
  
  const avgPricePerMwh = hourlyPrices.reduce((s, p) => s + p, 0) / hourlyPrices.length;
  const dynamicPerKwh = avgPricePerMwh / 1000;
  
  const fixedCost = consumptionKwh * fixedTariffPerKwh;
  const dynamicCost = consumptionKwh * dynamicPerKwh;
  
  const savings = fixedCost - dynamicCost;
  const savingsPercent = (savings / fixedCost) * 100;
  
  return {
    fixedCost: Math.round(fixedCost * 100) / 100,
    dynamicCost: Math.round(dynamicCost * 100) / 100,
    savings: Math.round(savings * 100) / 100,
    savingsPercent: Math.round(savingsPercent * 10) / 10,
  };
}
