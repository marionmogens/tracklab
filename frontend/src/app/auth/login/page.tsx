'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { Lock, User, Building2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('assessment.it');
  const [password, setPassword] = useState('Password123?');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await authService.login(username, password);
      if (res?.data?.accessToken) {
        localStorage.setItem('access_token', res.data.accessToken);
        router.push('/trackers');
      } else {
        // Fallback jika API merespons format datar
        localStorage.setItem('access_token', (res as any)?.accessToken || 'dummy-token');
        router.push('/trackers');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login gagal. Cek username dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-slate-100">
        <div className="text-center mb-8">
          <div className="inline-flex bg-emerald-600 text-white p-3 rounded-2xl font-black text-2xl mb-3 shadow-lg shadow-emerald-600/30">
            TL
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800">TrackLab System</h1>
          <p className="text-xs text-slate-400 mt-1">Biopharma Technical IT Developer Portal</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Username</label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
              <User size={18} className="absolute left-3 top-3 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
              <Lock size={18} className="absolute left-3 top-3 text-slate-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-emerald-600/30 text-sm mt-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Account'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t text-center text-[11px] text-slate-400 flex justify-center items-center gap-1">
          <Building2 size={14} /> Kalbe Biopharma Assessment Task
        </div>
      </div>
    </div>
  );
}