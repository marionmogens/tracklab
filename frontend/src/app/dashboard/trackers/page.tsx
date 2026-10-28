'use client';

import { useState, useEffect } from 'react';
import api, { buildPagingHeaders } from '@/lib/api';
import { Tracker, PaginationParams } from '@/types/tracker';
import { sendAuditLog } from '@/lib/logger';
import { Plus, Search, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TrackersPage() {
  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  
  // State Pagination
  const [pagination, setPagination] = useState<PaginationParams>({
    offset: 0,
    limit: 10,
    sortBy: 'code',
    sortOrder: 'ASC',
  });

  const fetchTrackers = async () => {
    setLoading(true);
    try {
      const headers = buildPagingHeaders({ ...pagination, search });
      const res = await api.get('/api/v1/feature/trackers/paging', { headers });
      setTrackers(res.data?.data || res.data || []);
    } catch (err) {
      console.error('Error fetching trackers', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrackers();
  }, [pagination.offset, pagination.limit, pagination.sortBy, pagination.sortOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination((prev) => ({ ...prev, offset: 0 }));
    fetchTrackers();
  };

  const handleDelete = async (id: string, code: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus tracker ${code}?`)) return;
    try {
      await api.delete('/api/v1/feature/trackers', {
        data: { id, deletedBy: 'assessment.it', doHardDelete: false },
      });
      
      // Kirim Log ke .NET Backend (Audit Trail)
      sendAuditLog({
        user: 'assessment.it',
        action: 'DELETE',
        entityName: 'm_trackers',
        entityId: id,
        oldValues: JSON.stringify({ code }),
      });

      fetchTrackers();
    } catch (err) {
      alert('Gagal menghapus tracker');
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Master Tracker</h1>
          <p className="text-sm text-slate-500">Kelola master data workflow tracker</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition">
          <Plus size={18} /> Add Tracker
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-4 flex justify-between items-center">
        <form onSubmit={handleSearch} className="flex gap-2 w-72">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search code or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          </div>
        </form>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-emerald-700 text-white font-semibold">
            <tr>
              <th className="p-3">Action</th>
              <th className="p-3">Code</th>
              <th className="p-3">Parent Code</th>
              <th className="p-3">Description</th>
              <th className="p-3">Order</th>
              <th className="p-3">Action Type</th>
              <th className="p-3">Mandays</th>
              <th className="p-3">Parallel</th>
              <th className="p-3">Public</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="text-center p-8 text-slate-400">Loading data...</td>
              </tr>
            ) : trackers.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center p-8 text-slate-400">Data tidak ditemukan</td>
              </tr>
            ) : (
              trackers.map((item) => (
                <tr key={item.id} className="border-b hover:bg-slate-50 transition">
                  <td className="p-3 flex gap-2">
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-600"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(item.id, item.code)} className="p-1 hover:bg-red-100 rounded text-red-600"><Trash2 size={16} /></button>
                  </td>
                  <td className="p-3 font-medium text-slate-800">{item.code}</td>
                  <td className="p-3">{item.parentCode || '-'}</td>
                  <td className="p-3">{item.description}</td>
                  <td className="p-3">{item.order}</td>
                  <td className="p-3">{item.actionType}</td>
                  <td className="p-3">{item.mandays}</td>
                  <td className="p-3">{item.isParallel ? '✓' : '✗'}</td>
                  <td className="p-3">{item.isPublic ? '✓' : '✗'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="p-4 flex justify-between items-center border-t border-slate-100">
          <span className="text-sm text-slate-500">Showing Offset {pagination.offset} (Limit {pagination.limit})</span>
          <div className="flex gap-2">
            <button
              disabled={pagination.offset === 0}
              onClick={() => setPagination((p) => ({ ...p, offset: Math.max(0, p.offset - p.limit) }))}
              className="p-2 border rounded-lg disabled:opacity-50 hover:bg-slate-100"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setPagination((p) => ({ ...p, offset: p.offset + p.limit }))}
              className="p-2 border rounded-lg hover:bg-slate-100"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}