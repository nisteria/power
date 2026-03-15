// Analytics Page - Energy Insights
'use client';

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const consumptionData = [
  { month: 'Okt', kwh: 420 },
  { month: 'Nov', kwh: 480 },
  { month: 'Dez', kwh: 520 },
  { month: 'Jän', kwh: 490 },
  { month: 'Feb', kwh: 450 },
  { month: 'Mär', kwh: 380 },
];

const savingsData = [
  { category: 'PV-Eigenverbrauch', amount: 45 },
  { category: 'Dynamic Tariff', amount: 28 },
  { category: 'Peak Shaving', amount: 15 },
  { category: 'Optimierung', amount: 12 },
];

const deviceUsage = [
  { name: 'Batterie', value: 35, color: '#22c55e' },
  { name: 'Wallbox', value: 25, color: '#3b82f6' },
  { name: 'Wärmepumpe', value: 20, color: '#f97316' },
  { name: 'Sonstige', value: 20, color: '#64748b' },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('month');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Analysen</h1>
        <select 
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="week">Diese Woche</option>
          <option value="month">Dieser Monat</option>
          <option value="year">Dieses Jahr</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <p className="text-slate-400 text-sm mb-2">Gesamtverbrauch</p>
          <p className="text-3xl font-bold text-white">2.740 kWh</p>
          <p className="text-green-400 text-sm mt-2">↓ 12% vs. Vormonat</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <p className="text-slate-400 text-sm mb-2">PV-Eigenverbrauch</p>
          <p className="text-3xl font-bold text-white">78%</p>
          <p className="text-green-400 text-sm mt-2">↑ 8% vs. Vormonat</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <p className="text-slate-400 text-sm mb-2">Ersparnis</p>
          <p className="text-3xl font-bold text-green-400">€124,50</p>
          <p className="text-slate-400 text-sm mt-2">Diesen Monat</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <p className="text-slate-400 text-sm mb-2">CO₂ gespart</p>
          <p className="text-3xl font-bold text-white">320 kg</p>
          <p className="text-slate-400 text-sm mt-2">Dieses Jahr</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Consumption Trend */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Verbrauchstrend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={consumptionData}>
                <defs>
                  <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="kwh" stroke="#22c55e" fill="url(#consumptionGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Savings Breakdown */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Ersparnis nach Kategorie</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={savingsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#64748b" unit="€" />
                <YAxis dataKey="category" type="category" stroke="#64748b" width={120} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                <Bar dataKey="amount" fill="#22c55e" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Device Usage Pie */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Geräte-Nutzung</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={deviceUsage} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                  {deviceUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {deviceUsage.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-400 text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="md:col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Erkenntnisse</h2>
          <div className="space-y-4">
            {[
              { icon: '💡', title: 'Optimierungspotenzial', text: 'Batterie könnte 2x täglich geladen werden für bessere Auslastung' },
              { icon: '⏰', title: 'Spitzenverbrauch', text: 'Zwischen 18-21 Uhr ist Verbrauch 40% höher als optimal' },
              { icon: '🌡️', title: 'Wärmepumpe', text: 'Heizphasen können in günstige Tarifzeiten verschoben werden' },
            ].map((insight, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-slate-700/50 rounded-lg">
                <span className="text-2xl">{insight.icon}</span>
                <div>
                  <h3 className="text-white font-medium">{insight.title}</h3>
                  <p className="text-slate-400 text-sm">{insight.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
