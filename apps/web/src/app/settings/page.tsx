// Settings Page
'use client';

import { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, Key, LogOut, Save } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'notifications', label: 'Benachrichtigungen', icon: Bell },
    { id: 'security', label: 'Sicherheit', icon: Shield },
    { id: 'appearance', label: 'Erscheinungsbild', icon: Palette },
    { id: 'language', label: 'Sprache', icon: Globe },
    { id: 'api', label: 'API Keys', icon: Key },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Einstellungen</h1>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === tab.id
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
          
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition mt-8">
            <LogOut className="w-5 h-5" />
            Abmelden
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-6">
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Profil</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Vorname</label>
                  <input 
                    type="text" 
                    defaultValue="Max"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Nachname</label>
                  <input 
                    type="text" 
                    defaultValue="Muster"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">E-Mail</label>
                  <input 
                    type="email" 
                    defaultValue="max.muster@example.at"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Telefon</label>
                  <input 
                    type="tel" 
                    defaultValue="+43 664 123 4567"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Benachrichtigungen</h2>
              <div className="space-y-4">
                {[
                  { label: 'E-Mail bei neuen Rechnungen', desc: 'Erinnerung bei offenen Rechnungen' },
                  { label: 'Push-Benachrichtigungen', desc: 'Wichtige Alerts auf das Handy' },
                  { label: 'Wöchentlicher Report', desc: 'Zusammenfassung der Woche' },
                  { label: 'Preisalarme', desc: 'Benachrichtigung bei Strompreis-Spitzen' },
                  { label: 'Geräte-Status', desc: 'Änderungen bei verbundenen Geräten' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{item.label}</p>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Sicherheit</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Aktuelles Passwort</label>
                  <input 
                    type="password" 
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Neues Passwort</label>
                  <input 
                    type="password" 
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Neues Passwort bestätigen</label>
                  <input 
                    type="password" 
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                  />
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition">
                  Passwort ändern
                </button>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Erscheinungsbild</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-3">Farbschema</label>
                  <div className="flex gap-4">
                    {['Dunkel', 'Hell', 'System'].map((theme) => (
                      <button
                        key={theme}
                        className={`px-6 py-3 rounded-lg border transition ${
                          theme === 'Dunkel'
                            ? 'bg-green-500/20 border-green-500 text-green-400'
                            : 'bg-slate-700 border-slate-600 text-slate-400 hover:border-slate-500'
                        }`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'language' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Sprache</h2>
              <div className="space-y-4">
                {[
                  { lang: 'Deutsch', flag: '🇦🇹', current: true },
                  { lang: 'English', flag: '🇬🇧', current: false },
                ].map((item) => (
                  <button
                    key={item.lang}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border transition ${
                      item.current
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : 'bg-slate-700/50 border-slate-600 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-2xl">{item.flag}</span>
                      {item.lang}
                    </span>
                    {item.current && <span className="text-green-400">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">API Keys</h2>
              <div className="space-y-4">
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Mein API Key</span>
                    <button className="text-green-400 text-sm">Neu generieren</button>
                  </div>
                  <code className="block bg-slate-800 px-4 py-2 rounded text-slate-400 text-sm font-mono">
                    pk_live_xxxxxxxxxxxxxxxxxxxxxxxx
                  </code>
                </div>
                <p className="text-slate-400 text-sm">
                  Mit diesem Key kannst du auf die Power API zugreifen. Behandle ihn wie ein Passwort.
                </p>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition">
              <Save className="w-5 h-5" />
              Änderungen speichern
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
