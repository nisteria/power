// Command palette - Quick actions
import { useState } from 'react';
import { Search, Command, X } from 'lucide-react';

const actions = [
  { id: 'dashboard', label: 'Go to Dashboard', shortcut: 'G D', action: '/dashboard' },
  { id: 'devices', label: 'Go to Devices', shortcut: 'G V', action: '/devices' },
  { id: 'tariffs', label: 'Go to Tariffs', shortcut: 'G T', action: '/tariffs' },
  { id: 'billing', label: 'Go to Billing', shortcut: 'G B', action: '/billing' },
  { id: 'settings', label: 'Go to Settings', shortcut: 'G S', action: '/settings' },
  { id: 'newdevice', label: 'Add New Device', shortcut: 'N D', action: '/devices/new' },
  { id: 'logout', label: 'Logout', shortcut: '⌘ L', action: '/auth/logout' },
];

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [search, setSearch] = useState('');
  
  const filtered = actions.filter(a => 
    a.label.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center p-4 border-b border-slate-700">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            placeholder="Type a command..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none"
            autoFocus
          />
          <button onClick={onClose}>
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        <div className="max-h-64 overflow-auto p-2">
          {filtered.map((action) => (
            <button
              key={action.id}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-slate-700 text-left"
              onClick={() => {
                window.location.href = action.action;
                onClose();
              }}
            >
              <span className="text-white">{action.label}</span>
              <span className="text-slate-500 text-sm">{action.shortcut}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
