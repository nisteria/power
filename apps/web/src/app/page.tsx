// Landing Page
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center py-20">
        <div className="inline-flex items-center bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm mb-8">
          <span className="animate-pulse mr-2">●</span>
          Made in Austria
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Intelligente
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            {' '}Stromoptimierung
          </span>
        </h1>
        
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Power orchestriert Ihren Energieverbrauch automatisch - für maximalen 
          Eigenverbrauch,最低ste Kosten und beste Nachhaltigkeit.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/register" 
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition"
          >
            Kostenlos testen
          </Link>
          <Link 
            href="/demo" 
            className="border border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition"
          >
            Demo ansehen
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Warum Power?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">15-25€/Monat sparen</h3>
            <p className="text-slate-400">
              Durch intelligente Steuerung von PV-Speicher, Wallbox und Tarifen.
            </p>
          </div>
          
          <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Automatische Optimierung</h3>
            <p className="text-slate-400">
              Unser AI-Algorithmus optimiert 24/7 ohne manuelles Eingreifen.
            </p>
          </div>
          
          <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Nachhaltig & lokal</h3>
            <p className="text-slate-400">
              Made in Austria - lokaler Support und Datenspeicherung in der EU.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          So funktioniert's
        </h2>
        
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Verbinden', desc: 'Energy Hub installieren' },
            { step: '2', title: 'Smart Meter', desc: 'Daten werden automatisch importiert' },
            { step: '3', title: 'AI Optimierung', desc: 'Algorithmus lernt & optimiert' },
            { step: '4', title: 'Sparen', desc: 'Automatisch Geld sparen' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">{item.step}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Einfache Preise
        </h2>
        
        <div className="max-w-md mx-auto bg-slate-800 border border-green-500/50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <span className="text-slate-400">EMS Subscription</span>
            <div className="text-5xl font-bold text-white mt-2">
              149€<span className="text-xl font-normal text-slate-400">/Monat</span>
            </div>
          </div>
          
          <ul className="space-y-4 mb-8">
            {[
              'Unbegrenzte Geräte-Steuerung',
              'Smart Meter Integration',
              'Dynamische Tarif-Optimierung',
              '24/7 AI-Optimierung',
              'Web & Mobile App',
              'Österreichischer Support'
            ].map((feature) => (
              <li key={feature} className="flex items-center text-slate-300">
                <span className="text-green-400 mr-3">✓</span>
                {feature}
              </li>
            ))}
          </ul>
          
          <Link 
            href="/register" 
            className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-4 rounded-xl font-semibold transition"
          >
            Kostenlos starten
          </Link>
        </div>
      </section>
    </div>
  );
}
