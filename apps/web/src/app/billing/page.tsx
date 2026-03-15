// Billing Page
'use client';

import { useState } from 'react';
import { Download, CreditCard, Calendar, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  items: Array<{ description: string; amount: number }>;
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    number: 'INV-2026-0003',
    date: '2026-03-01',
    dueDate: '2026-03-15',
    amount: 149.00,
    status: 'pending',
    items: [
      { description: 'EMS SaaS - März 2026', amount: 124.17 },
      { description: 'USt 20%', amount: 24.83 },
    ],
  },
  {
    id: '2',
    number: 'INV-2026-0002',
    date: '2026-02-01',
    dueDate: '2026-02-15',
    amount: 149.00,
    status: 'paid',
    items: [
      { description: 'EMS SaaS - Februar 2026', amount: 124.17 },
      { description: 'USt 20%', amount: 24.83 },
    ],
  },
  {
    id: '3',
    number: 'INV-2026-0001',
    date: '2026-01-01',
    dueDate: '2026-01-15',
    amount: 149.00,
    status: 'paid',
    items: [
      { description: 'EMS SaaS - Jänner 2026', amount: 124.17 },
      { description: 'USt 20%', amount: 24.83 },
    ],
  },
];

export default function BillingPage() {
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'overdue':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const totalPaid = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalPending = invoices
    .filter(inv => inv.status === 'pending')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Abrechnung</h1>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <CreditCard className="w-5 h-5 text-green-400" />
            <span className="text-slate-400">Bezahlt (2026)</span>
          </div>
          <div className="text-3xl font-bold text-white">€{totalPaid.toFixed(2)}</div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span className="text-slate-400">Offen</span>
          </div>
          <div className="text-3xl font-bold text-white">€{totalPending.toFixed(2)}</div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            <span className="text-slate-400">Nächste Abbuchung</span>
          </div>
          <div className="text-3xl font-bold text-white">15.04.2026</div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">VISA</span>
            </div>
            <div>
              <p className="text-white font-medium">Visa ending in 4242</p>
              <p className="text-slate-400 text-sm">Expires 12/2027</p>
            </div>
          </div>
          <button className="text-green-400 hover:text-green-300 text-sm">
            Ändern
          </button>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">Rechnungen</h2>
        </div>

        <div className="divide-y divide-slate-700">
          {invoices.map((invoice) => (
            <div 
              key={invoice.id}
              onClick={() => setSelectedInvoice(invoice)}
              className="p-6 hover:bg-slate-700/50 transition cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText className="w-6 h-6 text-slate-400" />
                  <div>
                    <p className="text-white font-medium">{invoice.number}</p>
                    <p className="text-slate-400 text-sm">Rechnungsdatum: {invoice.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-white font-bold">€{invoice.amount.toFixed(2)}</p>
                    <p className="text-slate-400 text-sm">Fällig: {invoice.dueDate}</p>
                  </div>

                  <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs border ${getStatusColor(invoice.status)}`}>
                    {getStatusIcon(invoice.status)}
                    {invoice.status === 'paid' && 'Bezahlt'}
                    {invoice.status === 'pending' && 'Offen'}
                    {invoice.status === 'overdue' && 'Überfällig'}
                  </span>

                  <button className="p-2 hover:bg-slate-600 rounded-lg transition">
                    <Download className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-lg w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">{selectedInvoice.number}</h3>
              <button 
                onClick={() => setSelectedInvoice(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-400">Rechnungsdatum</span>
                <span className="text-white">{selectedInvoice.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fälligkeitsdatum</span>
                <span className="text-white">{selectedInvoice.dueDate}</span>
              </div>
              <div className="border-t border-slate-700 pt-4">
                <p className="text-slate-400 mb-2">Positionen:</p>
                {selectedInvoice.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-slate-300">{item.description}</span>
                    <span className="text-white">€{item.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-700 pt-4 flex justify-between">
                <span className="text-white font-bold">Gesamt</span>
                <span className="text-white font-bold">€{selectedInvoice.amount.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg transition">
                <Download className="w-5 h-5" />
                PDF herunterladen
              </button>
              {selectedInvoice.status === 'pending' && (
                <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition">
                  Jetzt bezahlen
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
