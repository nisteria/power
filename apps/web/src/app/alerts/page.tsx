// Alert Rules - Monitoring Configuration
'use client';

import { useState } from 'react';
import { Bell, Plus, Trash2, Edit2, AlertTriangle, TrendingUp, Zap, Battery } from 'lucide-react';

interface AlertRule {
  id: string;
  name: string;
  type: 'price' | 'consumption' | 'device' | 'system';
  condition: string;
  threshold: number;
  unit: string;
  enabled: boolean;
  notifyEmail: boolean;
  notifyPush: boolean;
}

const mockRules: AlertRule[] = [
  {
    id: '1',
    name: 'Strompreis über 30c/kWh',
    type: 'price',
    condition: 'price_above',
    threshold: 30,
    unit: 'c/kWh',
    enabled: true,
    notifyEmail: true,
    notifyPush: true,
  },
  {
    id: '2',
    name: 'Verbrauch über 5kW',
    type: 'consumption',
    condition: 'consumption_above',
    threshold: 5,
    unit: 'kW',
    enabled: true,
    notifyEmail: false,
    notifyPush: true,
  },
  {
    id: '3',
    name: 'Batterie unter 20%',
    type: 'device',
    condition: 'soc_below',
    threshold: 20,
    unit: '%',
    enabled: true,
    notifyEmail: true,
    notifyPush: true,
  },
];

export default function AlertsPage() {
  const [rules, setRules] = useState<AlertRule[]>(mockRules);
  const [showForm, setShowForm] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'price': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'consumption': return <TrendingUp className="w-5 h-5 text-blue-400" />;
      case 'device': return <Battery className="w-5 h-5 text-green-400" />;
      default: return <Bell className="w-5 h-5 text-slate-400" />;
    }
  };

  const toggleRule = (id: string) => {
    setRules(rules.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Benachrichtigungen</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Neue Regel
        </button>
      </div>

      {/* New Rule Form */}
      {showForm && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Neue Alert-Regel erstellen</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-sm mb-2">Regelname</label>
              <input 
                type="text" 
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                placeholder="z.B. Strompreis zu hoch"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">Typ</label>
              <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none">
                <option value="price">Strompreis</option>
                <option value="consumption">Verbrauch</option>
                <option value="device">Gerät</option>
                <option value="system">System</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">Bedingung</label>
              <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none">
                <option value="above">Über / Größer als</option>
                <option value="below">Unter / Kleiner als</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">Schwellenwert</label>
              <input 
                type="number" 
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                placeholder="30"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <label className="flex items-center gap-2 text-slate-300">
              <input type="checkbox" className="w-4 h-4 rounded" />
              Per E-Mail benachrichtigen
            </label>
            <label className="flex items-center gap-2 text-slate-300">
              <input type="checkbox" className="w-4 h-4 rounded" />
              Push-Benachrichtigung
            </label>
          </div>
          <div className="flex gap-4 mt-6">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition">
              Speichern
            </button>
            <button 
              onClick={() => setShowForm(false)}
              className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition"
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}

      {/* Alert Rules List */}
      <div className="space-y-4">
        {rules.map((rule) => (
          <div 
            key={rule.id}
            className={`bg-slate-800 border rounded-xl p-6 transition ${
              rule.enabled 
                ? 'border-slate-700 hover:border-slate-600' 
                : 'border-slate-800 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${rule.enabled ? 'bg-slate-700' : 'bg-slate-800'}`}>
                  {getTypeIcon(rule.type)}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{rule.name}</h3>
                  <p className="text-slate-400 text-sm">
                    {rule.condition.replace('_', ' ')} {rule.threshold} {rule.unit}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 text-sm">
                  {rule.notifyEmail && (
                    <span className="text-slate-400">📧</span>
                  )}
                  {rule.notifyPush && (
                    <span className="text-slate-400">📱</span>
                  )}
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={rule.enabled}
                    onChange={() => toggleRule(rule.id)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>

                <button 
                  onClick={() => deleteRule(rule.id)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {rules.length === 0 && (
        <div className="text-center py-16">
          <Bell className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Keine Alert-Regeln</h3>
          <p className="text-slate-400 mb-6">Erstelle deine erste Alert-Regel um informiert zu bleiben.</p>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition"
          >
            Regel erstellen
          </button>
        </div>
      )}
    </div>
  );
}
