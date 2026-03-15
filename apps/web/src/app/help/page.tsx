// Help Center - FAQ Page
'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';

const faqs = [
  {
    category: 'Allgemein',
    questions: [
      {
        q: 'Was ist Power?',
        a: 'Power ist ein intelligentes Energiemanagement-System, das deinen Stromverbrauch automatisch optimiert. Wir verbinden uns mit deinem Smart Meter, deiner Batterie, Wallbox und Wärmepumpe und steuern diese automatisch für maximale Ersparnis.'
      },
      {
        q: 'Wie viel kann ich sparen?',
        a: 'Die durchschnittliche Ersparnis liegt bei 15-25€/Monat für Haushalte mit PV-Anlage und Speicher. Das hängt von deinem Verbrauchsmuster und den aktuellen Strompreisen ab.'
      },
      {
        q: 'Ist Power sicher?',
        a: 'Ja! Wir verwenden Bank-level Sicherheit: TLS-Verschlüsselung, OAuth2-Authentifizierung und speichern alle Daten auf Servern in Österreich. Wir teilen keine Daten mit Dritten.'
      }
    ]
  },
  {
    category: 'Installation',
    questions: [
      {
        q: 'Was brauche ich für Power?',
        a: 'Für die Grundfunktionen brauchst du nur einen Smart Meter. Für volle Funktionalität empfehlen wir: PV-Anlage + Batteriespeicher + Wallbox (optional). Wir unterstützen alle gängigen Hersteller.'
      },
      {
        q: 'Wie lange dauert die Installation?',
        a: 'Die Hardware-Installation dauert 2-4 Stunden durch einen unserer zertifizierten Partner. Die Einrichtung in unserer App dauert ca. 15 Minuten.'
      },
      {
        q: 'Kann ich Power selbst installieren?',
        a: 'Die Hardware muss von einem Elektriker installiert werden. Die App-Einrichtung kannst du selbst durchführen - wir führen dich Schritt für Schritt durch den Prozess.'
      }
    ]
  },
  {
    category: 'Tarife',
    questions: [
      {
        q: 'Wie funktioniert dynamic pricing?',
        a: 'Dynamic Pricing bedeutet, dass dein Strompreis sich an den actual EPEX-Spotpreis orientiert. Günstiger Strom (nachts) wird automatisch zum Laden genutzt, teurer Strom (abends) wird durch deine Batterie abgedeckt.'
      },
      {
        q: 'Kann ich meinen bestehenden Tarif behalten?',
        a: 'Ja! Power funktioniert mit fast allen Tarifen. Für maximale Ersparnis empfehlen wir jedoch einen dynamischen Tarif, da wir diesen optimal ausnutzen können.'
      },
      {
        q: 'Was ist der Unterschied zu Fixed-Tarifen?',
        a: 'Fixed-Tarife haben einen konstanten Preis über das ganze Jahr. Dynamic Tarife folgen dem realen Strompreis am Markt und sind meist günstiger, wenn du deinen Verbrauch anpasst.'
      }
    ]
  },
  {
    category: 'Datenschutz',
    questions: [
      {
        q: 'Wo werden meine Daten gespeichert?',
        a: 'Alle Daten werden auf Servern in Österreich (EU) gespeichert. Wir nutzen ISO-zertifizierte Rechenzentren und entsprechen der DSGVO.'
      },
      {
        q: 'Welche Daten werden erhoben?',
        a: 'Wir erheben nur notwendige Daten: Verbrauchsdaten von deinem Smart Meter, Gerätezustände und Einstellungen. Wir verkaufen keine Daten und teilen sie nicht mit Dritten.'
      },
      {
        q: 'Kann ich meine Daten löschen?',
        a: 'Ja, du kannst jederzeit die Löschung deiner Daten beantragen. Innerhalb von 30 Tagen werden alle persönlichen Daten gelöscht.'
      }
    ]
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState('Allgemein');

  const toggleQuestion = (index: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };

  const filteredFaqs = faqs.filter(category => 
    selectedCategory === 'Alle' || category.category === selectedCategory
  ).map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      searchQuery === '' || 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Hilfe & FAQ</h1>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input
          type="text"
          placeholder="Suche in FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:border-green-500 focus:outline-none"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {['Alle', ...faqs.map(c => c.category)].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-green-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQs */}
      <div className="space-y-6">
        {filteredFaqs.map((category) => (
          category.questions.length > 0 && (
            <div key={category.category}>
              <h2 className="text-xl font-semibold text-white mb-4">{category.category}</h2>
              <div className="space-y-3">
                {category.questions.map((item, index) => {
                  const globalIndex = `${category.category}-${index}`;
                  const isExpanded = expandedQuestions.has(globalIndex as any);
                  
                  return (
                    <div key={index} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleQuestion(globalIndex as any)}
                        className="w-full flex items-center justify-between p-4 text-left"
                      >
                        <span className="text-white font-medium pr-4">{item.q}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="px-4 pb-4 text-slate-400">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )
        ))}
      </div>

      {/* Contact */}
      <div className="mt-12 bg-gradient-to-r from-green-900/50 to-blue-900/50 border border-green-500/30 rounded-xl p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-500/20 rounded-lg">
            <HelpCircle className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Noch Fragen?</h3>
            <p className="text-slate-400 mb-4">
              Unser Support-Team ist für dich da. Wir antworten usually innerhalb von 24 Stunden.
            </p>
            <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition">
              <MessageCircle className="w-5 h-5" />
              Kontakt aufnehmen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
