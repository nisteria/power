// Dashboard Page
'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const [consumptionData, setConsumptionData] = useState([]);
  const [savings, setSavings] = useState({ month: 23.50, total: 156.80 });

  useEffect(() => {
    // Mock data - in production: fetch from API
    setConsumptionData([
      { time: '00:00', kWh: 1.2 },
      { time: '04:00', kWh: 0.8 },
      { time: '08:00', kWh: 2.5 },
      { time: '12:00', kWh: 3.8 },
      { time: '16:00', kWh: 4.2 },
      { time: '20:00', kWh: 2.8 },
      { time: '24:00', kWh: 1.5 },
    ]);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="text-slate-400 text-sm mb-2">Aktueller Verbrauch</div>
          <div className="text-3xl font-bold text-white">3.2 kW</div>
          <div className="text-green-400 text-sm mt-2">↑ 12% vs. gestern</div>
        </div>
        
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="text-slate-400 text-sm mb-2">PV-Eigenverbrauch</div>
          <div className="text-3xl font-bold text-white">78%</div>
          <div className="text-green-400 text-sm mt-2">↑ 5% diese Woche</div>
        </div>
        
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="text-slate-400 text-sm mb-2">Speicher</div>
          <div className="text-3xl font-bold text-white">65%</div>
          <div className="text-green-400 text-sm mt-2">Wird geladen</div>
        </div>
        
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="text-slate-400 text-sm mb-2">Ersparnis Monat</div>
          <div className="text-3xl font-bold text-green-400">€{savings.month.toFixed(2)}</div>
          <div className="text-slate-400 text-sm mt-2">Gesamt: €{savings.total.toFixed(2)}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Verbrauch heute</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={consumptionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line 
                type="monotone" 
                dataKey="kWh" 
                stroke="#22c55e" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Devices */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Geräte</h2>
          <div className="space-y-4">
            {[
              { name: 'BYD Battery', status: 'Lädt', soc: 65, icon: '🔋' },
              { name: 'Wallbox', status: 'Bereit', soc: null, icon: '⚡' },
              { name: 'Wärmepumpe', status: 'Aus', soc: null, icon: '🌡️' },
            ].map((device) => (
              <div key={device.name} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{device.icon}</span>
                  <div>
                    <div className="text-white font-medium">{device.name}</div>
                    <div className="text-slate-400 text-sm">{device.status}</div>
                  </div>
                </div>
                {device.soc && (
                  <div className="text-green-400 font-medium">{device.soc}%</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Optimierung</h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="text-green-400 font-medium mb-1">Nächste Ladung</div>
              <div className="text-white">22:00 - 23:30</div>
              <div className="text-slate-400 text-sm">Günstigster Strom: 8,2c/kWh</div>
            </div>
            
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="text-blue-400 font-medium mb-1">Empfehlung</div>
              <div className="text-white">Wechsle zu动态 Tariff</div>
              <div className="text-slate-400 text-sm">+€15/Monat einsparbar</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
