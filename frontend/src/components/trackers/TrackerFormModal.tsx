'use client';

import { useState, useEffect } from 'react';
import { Tracker, CreateTrackerDto, UpdateTrackerDto } from '@/types/tracker';
import { X } from 'lucide-react';

interface TrackerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTrackerDto | UpdateTrackerDto) => Promise<void>;
  initialData?: Tracker | null;
}

export default function TrackerFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: TrackerFormModalProps) {
  const [formData, setFormData] = useState<CreateTrackerDto>({
    code: '',
    parentCode: '',
    description: '',
    actionType: 'none',
    moduleFlow: 'CA',
    isUsingNotification: false,
    isPublic: true,
    order: 0,
    mandays: 0,
    isParallel: false,
    createdBy: 'assessment.it',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code || '',
        parentCode: initialData.parentCode || '',
        description: initialData.description || '',
        actionType: initialData.actionType || 'none',
        moduleFlow: initialData.moduleFlow || 'CA',
        isUsingNotification: initialData.isUsingNotification || false,
        isPublic: initialData.isPublic ?? true,
        order: initialData.order || 0,
        mandays: initialData.mandays || 0,
        isParallel: initialData.isParallel || false,
        createdBy: 'assessment.it',
      });
    } else {
      setFormData({
        code: '',
        parentCode: '',
        description: '',
        actionType: 'none',
        moduleFlow: 'CA',
        isUsingNotification: false,
        isPublic: true,
        order: 0,
        mandays: 0,
        isParallel: false,
        createdBy: 'assessment.it',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData) {
        await onSubmit({ ...formData, id: initialData.id, updatedBy: 'assessment.it' } as UpdateTrackerDto);
      } else {
        await onSubmit(formData);
      }
      onClose();
    } catch (err) {
      console.error('Submit tracker error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden border border-slate-100 my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-bold text-slate-800 text-base">
            {initialData ? 'Edit Master Tracker' : 'Add New Master Tracker'}
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Code *</label>
              <input
                type="text"
                required
                disabled={!!initialData}
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none disabled:bg-slate-100"
                placeholder="REQ-CREATE"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Parent Code</label>
              <input
                type="text"
                value={formData.parentCode || ''}
                onChange={(e) => setFormData({ ...formData, parentCode: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="REQ-SUBMIT"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Description *</label>
            <textarea
              required
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="Penjelasan tahapan tracker..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Action Type</label>
              <select
                value={formData.actionType}
                onChange={(e) => setFormData({ ...formData, actionType: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="none">none</option>
                <option value="text">text</option>
                <option value="file">file</option>
                <option value="date">date</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Module Flow</label>
              <input
                type="text"
                value={formData.moduleFlow}
                onChange={(e) => setFormData({ ...formData, moduleFlow: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Order Index</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Mandays</label>
              <input
                type="number"
                value={formData.mandays}
                onChange={(e) => setFormData({ ...formData, mandays: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isParallel}
                onChange={(e) => setFormData({ ...formData, isParallel: e.target.checked })}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              Is Parallel
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublic}
                onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              Is Public
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isUsingNotification}
                onChange={(e) => setFormData({ ...formData, isUsingNotification: e.target.checked })}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              Notification
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : initialData ? 'Update Tracker' : 'Create Tracker'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}