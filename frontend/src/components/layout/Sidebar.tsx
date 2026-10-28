'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FlaskConical, 
  Sliders, 
  ShieldCheck, 
  LogOut,
  ChevronDown
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Lab Analysis Request', href: '/requests', icon: FlaskConical },
    { name: 'Master Tracker', href: '/trackers', icon: Sliders },
    { name: 'Audit Trail (.NET)', href: '/audit-logs', icon: ShieldCheck },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col justify-between p-4">
      <div>
        {/* Logo Brand */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-100">
          <div className="bg-emerald-600 text-white font-bold p-2 rounded-xl text-lg tracking-wider">
            TL
          </div>
          <div>
            <h1 className="font-extrabold text-slate-800 tracking-tight text-lg">TRACKLAB</h1>
            <p className="text-[10px] text-emerald-600 font-semibold uppercase tracking-widest">PharmaMetricLabs</p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1">
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Main Menu</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-emerald-600' : 'text-slate-400'} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Info & Logout */}
      <div className="border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
              AI
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700">assessment.it</p>
              <p className="text-[10px] text-slate-400">Administrator</p>
            </div>
          </div>
          <Link href="/login" className="text-slate-400 hover:text-rose-600 transition">
            <LogOut size={16} />
          </Link>
        </div>
      </div>
    </aside>
  );
}