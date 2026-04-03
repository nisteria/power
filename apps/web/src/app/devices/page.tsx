// Device Management Page
'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Battery, Zap, Thermometer, Settings, Power, Plus, RefreshCw } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: 'battery' | 'wallbox' | 'heat_pump';
  status: 'active' | 'charging' | 'discharging' | 'idle' | 'error';
  soc?: number;
  power?: number;
  lastUpdate: string;
}

const mockDevices: Device[] = [
  { id: '1', name: 'BYD HVS 12.8', type: 'battery', status: 'charging', soc: 72, power: 3.2, lastUpdate: '2 min ago' },
  { id: '2', name: 'Wallbox Pulsar', type: 'wallbox', status: 'idle', power: 0, lastUpdate: '15 min ago' },
  { id: '3', name: 'Wärmepumpe', type: 'heat_pump', status: 'active', power: 1.8, lastUpdate: '1 min ago' },
];

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>(mockDevices);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'battery': return <Battery className="w-6 h-6 text-green-400" />;
      case 'wallbox': return <Zap className="w-6 h-6 text-blue-400" />;
      case 'heat_pump': return <Thermometer className="w-6 h-6 text-orange-400" />;
      default: return <Settings className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'charging': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'discharging': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'idle': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'error': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Geräte</h1>
        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition">
          <Plus className="w-5 h-5" />
          Gerät hinzufügen
        </button>
      </div>

      {/* Device Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {devices.map((device) => (
          <div 
            key={device.id}
            onClick={() => setSelectedDevice(device)}
            className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {getDeviceIcon(device.type)}
                <div>
                  <h3 className="text-white font-semibold">{device.name}</h3>
                  <p className="text-slate-400 text-sm capitalize">{device.type.replace('_', ' ')}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(device.status)}`}>
                {device.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {device.soc !== undefined && (
                <div>
                  <p className="text-slate-400 text-xs mb-1">Ladezustand</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full transition-all"
                        style={{ width: `${device.soc}%` }}
                      />
                    </div>
                    <span className="text-white text-sm">{device.soc}%</span>
                  </div>
                </div>
              )}
              {device.power !== undefined && (
                <div>
                  <p className="text-slate-400 text-xs mb-1">Leistung</p>
                  <p className="text-white font-semibold">{device.power} kW</p>
                </div>
              )}
            </div>

            <p className="text-slate-500 text-xs mt-4">Letzte Aktualisierung: {device.lastUpdate}</p>
          </div>
        ))}
      </div>

      {/* Device Details */}
      {selectedDevice && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">{selectedDevice.name}</h2>
              <p className="text-slate-400">ID: {selectedDevice.id}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition">
                <RefreshCw className="w-5 h-5 text-slate-400" />
              </button>
              <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition">
                <Settings className="w-5 h-5 text-slate-400" />
              </button>
              <button className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg transition border border-red-500/30">
                <Power className="w-5 h-5" />
                Ausschalten
              </button>
            </div>
          </div>

          {/* Power Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { time: '00:00', power: 1.2 },
                { time: '04:00', power: 0.8 },
                { time: '08:00', power: 2.5 },
                { time: '12:00', power: 3.8 },
                { time: '16:00', power: 4.2 },
                { time: '20:00', power: 2.8 },
                { time: '24:00', power: 1.5 },
              ]}>
                <defs>
                  <linearGradient id="powerGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="power" 
                  stroke="#22c55e" 
                  fillOpacity={1} 
                  fill="url(#powerGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
