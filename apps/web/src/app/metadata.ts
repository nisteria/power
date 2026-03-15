// SEO Metadata - Next.js App
import { Metadata } from 'next';

export const baseMetadata: Metadata = {
  metadataBase: new URL('https://power.energy'),
  title: {
    default: 'Power Energy - Intelligent Energy Management',
    template: '%s | Power Energy',
  },
  description: 'AI-gesteuertes Energiemanagement für österreichische Haushalte und Unternehmen. Spare bis zu 25% Stromkosten mit automatischer Optimierung.',
  keywords: ['Energiemanagement', 'Smart Grid', 'Stromoptimierung', 'PV', 'Batteriespeicher', 'Wallbox', ' Österreich'],
  authors: [{ name: 'Power Energy' }],
  creator: 'Power Energy',
  publisher: 'Power Energy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    url: 'https://power.energy',
    siteName: 'Power Energy',
    title: 'Power Energy - Intelligent Energy Management',
    description: 'AI-gesteuertes Energiemanagement für österreichische Haushalte. Spare bis zu 25% Stromkosten.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Power Energy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Power Energy',
    description: 'AI-gesteuertes Energiemanagement für Österreich',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const dashboardMetadata: Metadata = {
  title: 'Dashboard',
  description: 'Dein Energie-Dashboard in Echtzeit',
};

export const devicesMetadata: Metadata = {
  title: 'Geräte',
  description: 'Verwalte deine verbundenen Geräte',
};

export const tariffsMetadata: Metadata = {
  title: 'Tarife',
  description: 'Vergleiche und wähle den optimalen Tarif',
};

export const billingMetadata: Metadata = {
  title: 'Abrechnung',
  description: 'Deine Rechnungen und Zahlungshistorie',
};
