import Link from 'next/link';
import { Sliders, FlaskConical, ShieldCheck, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-sm text-slate-500">Welcome to TrackLab Biopharma Management Portal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="p-3 bg-emerald-100 text-emerald-700 w-fit rounded-xl mb-4">
            <Sliders size={24} />
          </div>
          <h2 className="font-bold text-slate-800 text-lg">Master Trackers</h2>
          <p className="text-xs text-slate-500 mt-1 mb-4">Kelola alur workflow dan tahapan analisis lab</p>
          <Link href="/trackers" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
            Buka Master Tracker <ArrowRight size={16} />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="p-3 bg-blue-100 text-blue-700 w-fit rounded-xl mb-4">
            <FlaskConical size={24} />
          </div>
          <h2 className="font-bold text-slate-800 text-lg">Lab Requests</h2>
          <p className="text-xs text-slate-500 mt-1 mb-4">Pantau transaksi pengujian sampel laboratorium</p>
          <Link href="/requests" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
            Lihat Transaksi <ArrowRight size={16} />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="p-3 bg-slate-100 text-slate-700 w-fit rounded-xl mb-4">
            <ShieldCheck size={24} />
          </div>
          <h2 className="font-bold text-slate-800 text-lg">Audit Logs (.NET)</h2>
          <p className="text-xs text-slate-500 mt-1 mb-4">Jejak aktivitas CRUD tercatat pada SQLite Backend</p>
          <Link href="/audit-logs" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-700">
            Periksa Audit Trail <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}