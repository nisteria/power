// Power Web - Main Layout
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Power Energy - Smart Energy Management',
  description: 'Intelligent energy optimization for Austrian households and businesses',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
          <header className="border-b border-slate-700">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                <span className="text-xl font-bold text-white">Power</span>
              </div>
              <div className="flex items-center space-x-6">
                <a href="/dashboard" className="text-slate-300 hover:text-white transition">Dashboard</a>
                <a href="/devices" className="text-slate-300 hover:text-white transition">Geräte</a>
                <a href="/tariffs" className="text-slate-300 hover:text-white transition">Tarife</a>
                <a href="/billing" className="text-slate-300 hover:text-white transition">Abrechnung</a>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition">
                  Anmelden
                </button>
              </div>
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
