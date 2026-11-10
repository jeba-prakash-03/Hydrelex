import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Wrench, RefreshCw, ShieldCheck, Hammer, Compass } from 'lucide-react';
import { api } from '../../lib/api';
import { Service } from '../../types';

export const AdminServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [featureInput, setFeatureInput] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.getServices(true);
      if (res.success) {
        setServices(res.services || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openNewService = () => {
    setEditingService({
      title: '',
      slug: '',
      short_description: '',
      description: '',
      icon_name: 'Wrench',
      features: [],
      is_active: true,
      display_order: services.length + 1,
    });
    setIsNew(true);
    setFeatureInput('');
  };

  const openEditService = (s: Service) => {
    setEditingService({ ...s });
    setIsNew(false);
    setFeatureInput('');
  };

  const handleAddFeature = () => {
    if (!featureInput.trim() || !editingService) return;
    const current = editingService.features || [];
    setEditingService({ ...editingService, features: [...current, featureInput.trim()] });
    setFeatureInput('');
  };

  const handleRemoveFeature = (idx: number) => {
    if (!editingService || !editingService.features) return;
    setEditingService({ ...editingService, features: editingService.features.filter((_, i) => i !== idx) });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title || !editingService.short_description) {
      alert('Title and short description are required.');
      return;
    }

    try {
      setSaving(true);
      const payload: any = {
        title: editingService.title,
        slug:
          editingService.slug ||
          editingService.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        shortDescription: editingService.short_description,
        description: editingService.description || editingService.short_description,
        iconName: editingService.icon_name || 'Wrench',
        features: editingService.features || [],
        imageUrl: editingService.image_url || null,
        isActive: editingService.is_active ?? true,
        displayOrder: Number(editingService.display_order) || 0,
      };

      if (isNew) {
        await api.createService(payload);
      } else if (editingService.id) {
        await api.updateService(editingService.id, payload);
      }

      setEditingService(null);
      fetchServices();
    } catch (err: any) {
      alert(err.message || 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this service category?')) return;
    try {
      await api.deleteService(id);
      fetchServices();
    } catch (err: any) {
      alert(err.message || 'Failed to delete service');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-brand-accent font-semibold">
            SERVICES & MAINTENANCE
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-navy">
            Engineering Services
          </h1>
          <p className="text-xs sm:text-sm text-brand-steel">
            Manage installation, maintenance, modernization, and consultation packages.
          </p>
        </div>

        <button
          onClick={openNewService}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-white text-xs font-medium shadow-glow"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div
            key={s.id}
            className="p-6 rounded-2xl bg-white border border-brand-silver shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-brand-light border border-brand-silver">
                  Icon: {s.icon_name}
                </span>
                {!s.is_active && (
                  <span className="font-mono text-[10px] text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                    Inactive
                  </span>
                )}
              </div>

              <h3 className="font-heading text-lg font-bold text-brand-navy">{s.title}</h3>
              <p className="text-xs text-brand-steel leading-relaxed">{s.short_description}</p>
            </div>

            <div className="pt-3 border-t border-brand-silver flex items-center justify-between">
              <span className="font-mono text-xs text-brand-steel">Order: #{s.display_order}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditService(s)}
                  className="p-2 rounded-lg bg-brand-light hover:bg-brand-navy hover:text-white transition-colors text-xs"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="p-2 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors text-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            onClick={() => setEditingService(null)}
            className="fixed inset-0 bg-brand-navy/80 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-brand-silver overflow-hidden z-10 my-8">
            <div className="p-5 border-b border-brand-silver flex items-center justify-between bg-brand-navy text-white">
              <h3 className="font-heading text-lg font-bold">
                {isNew ? 'New Service' : `Edit: ${editingService.title}`}
              </h3>
              <button
                onClick={() => setEditingService(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div>
                <label className="block font-mono text-brand-charcoal mb-1">Service Title*</label>
                <input
                  type="text"
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
                />
              </div>

              <div>
                <label className="block font-mono text-brand-charcoal mb-1">Short Description*</label>
                <input
                  type="text"
                  value={editingService.short_description || ''}
                  onChange={(e) => setEditingService({ ...editingService, short_description: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
                />
              </div>

              <div>
                <label className="block font-mono text-brand-charcoal mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
                />
              </div>

              <div>
                <label className="block font-mono text-brand-charcoal mb-1">Lucide Icon</label>
                <select
                  value={editingService.icon_name || 'Wrench'}
                  onChange={(e) => setEditingService({ ...editingService, icon_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light font-mono"
                >
                  <option value="Wrench">Wrench</option>
                  <option value="Hammer">Hammer (Installation)</option>
                  <option value="ShieldCheck">ShieldCheck (Preventive)</option>
                  <option value="RefreshCw">RefreshCw (Modernization)</option>
                  <option value="Compass">Compass (Consultation)</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-brand-charcoal mb-1">Included Service Points</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="e.g. Laser rail alignment study"
                    className="flex-1 px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-3 py-2 rounded-lg bg-brand-navy text-white text-xs"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1">
                  {editingService.features?.map((f, i) => (
                    <div key={i} className="flex items-center justify-between p-1.5 rounded bg-brand-light">
                      <span>{f}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(i)}
                        className="text-rose-500"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-brand-silver">
                <div>
                  <label className="block font-mono text-brand-charcoal mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingService.display_order ?? 0}
                    onChange={(e) => setEditingService({ ...editingService, display_order: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
                  />
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="srv_active"
                    checked={editingService.is_active ?? true}
                    onChange={(e) => setEditingService({ ...editingService, is_active: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-accent"
                  />
                  <label htmlFor="srv_active" className="font-mono text-brand-navy cursor-pointer">
                    Active / Published
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-silver flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-lg border border-brand-silver"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-brand-accent text-white font-medium shadow-glow"
                >
                  {saving ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

