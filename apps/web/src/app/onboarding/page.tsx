// Onboarding Flow - New Customer Setup
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ArrowRight, Battery, Zap, Thermometer, Home } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Willkommen bei Power',
    description: 'Lass uns dein Energie-Setup konfigurieren',
    icon: Home,
  },
  {
    id: 2,
    title: 'Smart Meter verbinden',
    description: 'Verbinde deinen Stromzähler',
    icon: Zap,
  },
  {
    id: 3,
    title: 'Geräte hinzufügen',
    description: 'Batterie, Wallbox oder Wärmepumpe',
    icon: Battery,
  },
  {
    id: 4,
    title: 'Tarif wählen',
    description: 'Wähle den optimalen Tarif',
    icon: Thermometer,
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/dashboard');
    }
  };

  const progress = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">
            Einrichtung
          </h1>
          <p className="text-slate-400">
            Schritt {currentStep} von 4
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-12">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <div
                key={step.id}
                className={`flex items-center gap-4 p-4 rounded-xl transition ${
                  isActive 
                    ? 'bg-green-500/20 border-2 border-green-500' 
                    : isCompleted
                    ? 'bg-slate-800 border-2 border-green-500/50'
                    : 'bg-slate-800 border-2 border-slate-700'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-green-500' : isCompleted ? 'bg-green-500/50' : 'bg-slate-700'
                }`}>
                  {isCompleted ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  )}
                </div>
                <div>
                  <h3 className={`font-semibold ${isActive ? 'text-white' : isCompleted ? 'text-green-400' : 'text-slate-400'}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-6 py-3 text-slate-400 hover:text-white disabled:opacity-50"
          >
            Zurück
          </button>
          <button
            onClick={nextStep}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            {currentStep === 4 ? 'Fertig' : 'Weiter'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
