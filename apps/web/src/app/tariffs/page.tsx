// Tariffs Page
'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Zap, Calendar, AlertCircle, Check } from 'lucide-react';

interface Tariff {
  id: string;
  name: string;
  provider: string;
  type: 'fixed' | 'dynamic';
  pricePerKwh: number;
  basePrice: number;
  features: string[];
  recommended?: boolean;
}

const tariffs: Tariff[] = [
  {
    id: '1',
    name: 'Wiener Netze Fix',
    provider: 'Wiener Netze',
    type: 'fixed',
    pricePerKwh: 0.28,
    basePrice: 4.90,
    features: ['Fixer Preis', 'Kein Risiko', 'Österreichweit'],
  },
  {
    id: '2',
    name: 'Wiener Netze Dynamic',
    provider: 'Wiener Netze',
    type: 'dynamic',
    pricePerKwh: 0.18, // Durchschnitt
    basePrice: 2.90,
    features: ['EPEX Spot + Aufschlag', 'Spare bei günstigen Zeiten', 'Flexible Anpassung'],
    recommended: true,
  },
  {
    id: '3',
    name: 'Salzburg AG Smart',
    provider: 'Salzburg AG',
    type: 'dynamic',
    pricePerKwh: 0.19,
    basePrice: 3.90,
    features: ['Stündliche Preise', 'App-Überwachung', 'Region Salzburg'],
  },
];

export default function TariffsPage() {
  const [selectedTariff, setSelectedTariff] = useState<Tariff | null>(tariffs[1]);
  
  // Mock price data for chart
  const priceData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    price: i >= 6 && i <= 22 
      ? 15 + Math.random() * 20 
      : 5 + Math.random() * 8,
  }));

  const savingsData = [
    { month: 'Jan', fixed: 85, dynamic: 62 },
    { month: 'Feb', fixed: 78, dynamic: 55 },
    { month: 'Mär', fixed: 82, dynamic: 58 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Tarife</h1>

      {/* Current Tariff Status */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-1">Aktueller Tarif</p>
            <h2 className="text-2xl font-bold text-white">Wiener Netze Dynamic</h2>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-sm mb-1">Durchschnittspreis</p>
            <p className="text-2xl font-bold text-green-400">0,18€/kWh</p>
          </div>
        </div>
      </div>

      {/* Tariff Comparison */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {tariffs.map((tariff) => (
          <div 
            key={tariff.id}
            onClick={() => setSelectedTariff(tariff)}
            className={`bg-slate-800 border rounded-xl p-6 cursor-pointer transition ${
              selectedTariff?.id === tariff.id 
                ? 'border-green-500 ring-2 ring-green-500/20' 
                : 'border-slate-700 hover:border-slate-600'
            }`}
          >
            {tariff.recommended && (
              <div className="flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm mb-4 w-fit">
                <TrendingUp className="w-4 h-4" />
                Empfohlen
              </div>
            )}
            
            <h3 className="text-xl font-bold text-white mb-1">{tariff.name}</h3>
            <p className="text-slate-400 text-sm mb-4">{tariff.provider}</p>
            
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-3xl font-bold text-white">{tariff.pricePerKwh.toFixed(2)}€</span>
              <span className="text-slate-400">/kWh</span>
            </div>
            
            <p className="text-slate-400 text-sm mb-4">Grundpreis: {tariff.basePrice}€/Monat</p>
            
            <ul className="space-y-2">
              {tariff.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <button className={`w-full mt-6 py-3 rounded-lg font-semibold transition ${
              selectedTariff?.id === tariff.id
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-white'
            }`}>
              {selectedTariff?.id === tariff.id ? 'Ausgewählt' : 'Auswählen'}
            </button>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Today's Prices */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Heutige Strompreise</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} unit="c" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                  formatter={(value: number) => [`${value.toFixed(2)}c/kWh`, 'Preis']}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#eab308" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Savings Comparison */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Ersparnis vs. Fix-Tarif</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={savingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} unit="€" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                  formatter={(value: number) => [`${value}€`, '']}
                />
                <Bar dataKey="fixed" fill="#64748b" name="Fix-Tarif" radius={[4, 4, 0, 0]} />
                <Bar dataKey="dynamic" fill="#22c55e" name="Dynamic" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-green-400">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">Ø 25% Ersparnis mit Dynamic-Tarif</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-white mb-1">Wie funktioniert Dynamic Pricing?</h4>
            <p className="text-slate-400 text-sm">
              Dynamic-Tarife folgen dem realen Strompreis am EPEX-Spotmarkt. 
              Günstigster Strom ist usually zwischen 22:00 und 6:00 Uhr morgens. 
              Du kannst bis zu 30% sparen, wenn du deinen Verbrauch in diese Zeiten verlegst.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
