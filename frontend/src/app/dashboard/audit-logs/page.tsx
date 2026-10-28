'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { ShieldCheck, RefreshCw } from 'lucide-react';

interface AuditLogItem {
  id: number;
  user: string;
  action: string;
  entityName: string;
  entityId: string | null;
  oldValues: string | null;
  newValues: string | null;
  timestamp: string;
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_DOTNET_LOGGING_URL}/auditlogs`);
      setLogs(res.data || []);
    } catch (err) {
      console.error('Failed fetching audit logs from .NET backend', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="text-emerald-600" size={28} /> Audit Trail & Activity Logs
          </h1>
          <p className="text-sm text-slate-500">
            Log histori aktivitas CRUD yang terdaftar di backend .NET SQLite
          </p>
        </div>
        <button
          onClick={fetchAuditLogs}
          className="flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-100 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          <RefreshCw size={16} /> Refresh Log
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-800 text-white font-semibold">
            <tr>
              <th className="p-3">Waktu</th>
              <th className="p-3">User</th>
              <th className="p-3">Action</th>
              <th className="p-3">Tabel / Entity</th>
              <th className="p-3">ID Target</th>
              <th className="p-3">Detail Perubahan</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center p-8 text-slate-400">Loading audit log...</td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-8 text-slate-400">Belum ada aktivitas tercatat</td>
              </tr>
            ) : (
              logs.map((item) => (
                <tr key={item.id} className="border-b hover:bg-slate-50 transition">
                  <td className="p-3 text-xs text-slate-400">
                    {new Date(item.timestamp).toLocaleString('id-ID')}
                  </td>
                  <td className="p-3 font-medium text-slate-700">{item.user}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        item.action === 'CREATE'
                          ? 'bg-emerald-100 text-emerald-700'
                          : item.action === 'UPDATE'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {item.action}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-xs">{item.entityName}</td>
                  <td className="p-3 font-mono text-xs text-slate-500">{item.entityId || '-'}</td>
                  <td className="p-3 text-xs font-mono max-w-xs truncate">
                    {item.oldValues && <div className="text-rose-600">Old: {item.oldValues}</div>}
                    {item.newValues && <div className="text-emerald-600">New: {item.newValues}</div>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}