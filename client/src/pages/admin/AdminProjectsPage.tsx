import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Upload, MapPin, Tag } from 'lucide-react';
import { api } from '../../lib/api';
import { Project } from '../../types';

export const AdminProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.getProjects();
      if (res.success) {
        setProjects(res.projects || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openNew = () => {
    setEditingProject({
      title: '',
      category: 'Industrial Goods Lifts',
      location: 'Sriperumbudur, Tamil Nadu',
      specifications: '',
      description: '',
      cover_image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      is_sample: false,
      display_order: projects.length + 1,
    });
    setIsNew(true);
  };

  const openEdit = (p: Project) => {
    setEditingProject({ ...p });
    setIsNew(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProject) return;
    try {
      setUploading(true);
      const res = await api.uploadImage(file, 'project_image');
      if (res.success && res.url) {
        setEditingProject({ ...editingProject, cover_image: res.url });
      }
    } catch (err: any) {
      alert(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title || !editingProject.description) {
      alert('Title and description are required.');
      return;
    }

    try {
      setSaving(true);
      const payload: any = {
        title: editingProject.title,
        category: editingProject.category || 'General',
        location: editingProject.location || 'Sriperumbudur',
        specifications: editingProject.specifications || null,
        description: editingProject.description,
        coverImage: editingProject.cover_image || '',
        isSample: editingProject.is_sample ?? false,
        displayOrder: Number(editingProject.display_order) || 0,
      };

      if (isNew) {
        await api.createProject(payload);
      } else if (editingProject.id) {
        await api.updateProject(editingProject.id, payload);
      }

      setEditingProject(null);
      fetchProjects();
    } catch (err: any) {
      alert(err.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this project gallery entry?')) return;
    try {
      await api.deleteProject(id);
      fetchProjects();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-brand-accent font-semibold">
            PORTFOLIO SHOWCASE
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-navy">
            Project Gallery Management
          </h1>
          <p className="text-xs sm:text-sm text-brand-steel">
            Manage photographic project entries, installations, and sample engineering representations.
          </p>
        </div>

        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-white text-xs font-medium shadow-glow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project Entry</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="p-5 rounded-2xl bg-white border border-brand-silver shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="relative h-44 rounded-xl overflow-hidden bg-brand-charcoal">
                <img
                  src={proj.cover_image}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-brand-navy/90 text-white font-mono text-[10px] uppercase">
                  {proj.category}
                </span>
                {proj.is_sample && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-amber-500 text-white font-mono text-[10px] uppercase">
                    Sample Placeholder
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-heading text-base font-bold text-brand-navy line-clamp-1">
                  {proj.title}
                </h3>
                <p className="text-xs text-brand-steel line-clamp-2 mt-1">
                  {proj.description}
                </p>
              </div>

              <div className="text-[11px] font-mono text-brand-steel flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                <span className="truncate">{proj.location}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-brand-silver flex items-center justify-between">
              <span className="font-mono text-xs text-brand-steel">Order: #{proj.display_order}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEdit(proj)}
                  className="p-2 rounded-lg bg-brand-light hover:bg-brand-navy hover:text-white transition-colors text-xs"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="p-2 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors text-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            onClick={() => setEditingProject(null)}
            className="fixed inset-0 bg-brand-navy/80 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-brand-silver overflow-hidden z-10 my-8">
            <div className="p-5 border-b border-brand-silver flex items-center justify-between bg-brand-navy text-white">
              <h3 className="font-heading text-lg font-bold">
                {isNew ? 'New Gallery Project' : `Edit: ${editingProject.title}`}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div>
                <label className="block font-mono text-brand-charcoal mb-1">Project Title*</label>
                <input
                  type="text"
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-brand-charcoal mb-1">Category</label>
                  <input
                    type="text"
                    value={editingProject.category || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
                  />
                </div>

                <div>
                  <label className="block font-mono text-brand-charcoal mb-1">Location</label>
                  <input
                    type="text"
                    value={editingProject.location || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-brand-charcoal mb-1">Technical Specs</label>
                <input
                  type="text"
                  value={editingProject.specifications || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, specifications: e.target.value })}
                  placeholder="e.g. 2000kg Freight Lift, 4 Stops"
                  className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
                />
              </div>

              <div>
                <label className="block font-mono text-brand-charcoal mb-1">Detailed Description*</label>
                <textarea
                  rows={3}
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
                />
              </div>

              <div>
                <label className="block font-mono text-brand-charcoal mb-1">Cover Image URL or File</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={editingProject.cover_image || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, cover_image: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
                  />
                  <label className="px-3 py-2 rounded-lg bg-brand-light border border-brand-silver hover:bg-brand-silver cursor-pointer flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-brand-silver">
                <div>
                  <label className="block font-mono text-brand-charcoal mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingProject.display_order ?? 0}
                    onChange={(e) => setEditingProject({ ...editingProject, display_order: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
                  />
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="is_sample_chk"
                    checked={editingProject.is_sample ?? false}
                    onChange={(e) => setEditingProject({ ...editingProject, is_sample: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500"
                  />
                  <label htmlFor="is_sample_chk" className="font-mono text-brand-navy cursor-pointer">
                    Flag as Sample Placeholder
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-silver flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-lg border border-brand-silver"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-brand-accent text-white font-medium shadow-glow"
                >
                  {saving ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

