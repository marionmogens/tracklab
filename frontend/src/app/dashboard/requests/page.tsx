'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { requestService } from '@/services/request.service';
import { RequestHeader } from '@/types/request';
import { PaginationParams } from '@/types/api';
import { Search, Filter, Eye, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function RequestsPage() {
  const [requests, setRequests] = useState<RequestHeader[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const [pagination, setPagination] = useState<PaginationParams>({
    offset: 0,
    limit: 10,
    sortBy: 'received_date',
    sortOrder: 'DESC',
  });

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await requestService.getPaged({ ...pagination, search });
      setRequests(res?.data || res || []);
    } catch (err) {
      console.error('Error fetching requests', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [pagination.offset, pagination.limit]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Lab Analysis Request</h1>
          <p className="text-sm text-slate-500">Manage all lab testing transactions data</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition">
            <Plus size={16} /> Add Request
          </button>
        </div>
      </div>

      {/* Search & Advance Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
        <div className="flex gap-3 w-96">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search project code or status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          </div>
          <button onClick={fetchRequests} className="flex items-center gap-2 bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      {/* Table Requests */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-emerald-700 text-white font-semibold">
            <tr>
              <th className="p-3">Action</th>
              <th className="p-3">Request ID</th>
              <th className="p-3">Project Code</th>
              <th className="p-3">Request Date</th>
              <th className="p-3">Last Status</th>
              <th className="p-3">Receiving Status</th>
              <th className="p-3">Total Fee</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center p-8 text-slate-400">Loading request data...</td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-8 text-slate-400">Data transaksi kosong</td>
              </tr>
            ) : (
              requests.map((item) => (
                <tr key={item.id} className="border-b hover:bg-slate-50 transition">
                  <td className="p-3">
                    <Link href={`/requests/${item.id}`} className="p-1.5 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-700 rounded-lg inline-flex items-center text-slate-600">
                      <Eye size={16} />
                    </Link>
                  </td>
                  <td className="p-3 font-mono text-xs font-semibold text-slate-800">{item.id?.substring(0, 18)}...</td>
                  <td className="p-3 font-medium text-slate-800">{item.projectCode}</td>
                  <td className="p-3">{item.receivedDate ? new Date(item.receivedDate).toLocaleDateString('id-ID') : '-'}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
                      {item.lastStatus || 'N/A'}
                    </span>
                  </td>
                  <td className="p-3 text-xs">{item.receivingStatus || '-'}</td>
                  <td className="p-3 font-semibold text-slate-800">
                    Rp {item.totalFee ? item.totalFee.toLocaleString('id-ID') : '0'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="p-4 flex justify-between items-center border-t border-slate-100">
          <span className="text-sm text-slate-500">Offset {pagination.offset} | Limit {pagination.limit}</span>
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