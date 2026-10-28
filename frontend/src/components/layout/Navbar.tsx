'use client';

import { Bell, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3 text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 w-64 text-sm">
        <Search size={16} />
        <input 
          type="text" 
          placeholder="Global search..." 
          className="bg-transparent focus:outline-none text-slate-700 w-full text-xs"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
        </button>
        <div className="h-4 w-px bg-slate-200"></div>
        <span className="text-xs font-semibold text-slate-600">PANGGALIH SAKO DENTA</span>
        <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
          PS
        </div>
      </div>
    </header>
  );
}