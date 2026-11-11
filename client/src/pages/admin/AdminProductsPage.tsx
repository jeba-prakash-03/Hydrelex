import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, Upload, Layers } from 'lucide-react';
import { api } from '../../lib/api';
import { Product } from '../../types';
import { ImageWithFallback } from '../../components/ui/ImageWithFallback';

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [featureInput, setFeatureInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.getProducts(true);
      if (res.success) {
        setProducts(res.products || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openNewProduct = () => {
    setEditingProduct({
      title: '',
      slug: '',
      category: 'Commercial & Residential',
      short_description: '',
      description: '',
      capacity: '',
      speed: '',
      drive_system: '',
      features: [],
      image_url: '',
      is_active: true,
      display_order: products.length + 1,
    });
    setIsNew(true);
    setFeatureInput('');
  };

  const openEditProduct = (prod: Product) => {
    setEditingProduct({ ...prod });
    setIsNew(false);
    setFeatureInput('');
  };

  const handleAddFeature = () => {
    if (!featureInput.trim() || !editingProduct) return;
    const currentFeatures = editingProduct.features || [];
    setEditingProduct({
      ...editingProduct,
      features: [...currentFeatures, featureInput.trim()],
    });
    setFeatureInput('');
  };

  const handleRemoveFeature = (idx: number) => {
    if (!editingProduct || !editingProduct.features) return;
    const updated = editingProduct.features.filter((_, i) => i !== idx);
    setEditingProduct({ ...editingProduct, features: updated });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProduct) return;
    try {
      setUploading(true);
      const res = await api.uploadImage(file, 'product_image');
      if (res.success && res.url) {
        setEditingProduct({ ...editingProduct, image_url: res.url });
      }
    } catch (err: any) {
      alert(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.title || !editingProduct.short_description) {
      alert('Please fill out product title and short description.');
      return;
    }

    try {
      setSaving(true);
      const payload: any = {
        title: editingProduct.title,
        slug:
          editingProduct.slug ||
          editingProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        category: editingProduct.category || 'General',
        shortDescription: editingProduct.short_description,
        description: editingProduct.description || editingProduct.short_description,
        capacity: editingProduct.capacity || null,
        speed: editingProduct.speed || null,
        driveSystem: editingProduct.drive_system || null,
        features: editingProduct.features || [],
        imageUrl: editingProduct.image_url || '',
        isActive: editingProduct.is_active ?? true,
        displayOrder: Number(editingProduct.display_order) || 0,
      };

      if (isNew) {
        await api.createProduct(payload);
      } else if (editingProduct.id) {
        await api.updateProduct(editingProduct.id, payload);
      }

      setEditingProduct(null);
      fetchProducts();
    } catch (err: any) {
      alert(err.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.deleteProduct(id);
      fetchProducts();
    } catch (err: any) {
      alert(err.message || 'Failed to delete product');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-brand-accent font-semibold">
            PRODUCT MANAGEMENT
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-navy">
            Lifting Systems & Products
          </h1>
          <p className="text-xs sm:text-sm text-brand-steel">
            Add, update, or reorganize elevator categories and technical specifications.
          </p>
        </div>

        <button
          onClick={openNewProduct}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-white text-xs font-medium shadow-glow"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="p-5 rounded-2xl bg-white border border-brand-silver shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="relative h-44 rounded-xl overflow-hidden bg-brand-charcoal">
                <ImageWithFallback
                  src={prod.image_url}
                  alt={prod.title}
                  fallbackType="passenger"
                  aspectRatioClass="w-full h-full"
                  showOverlay={false}
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-brand-navy/90 text-white font-mono text-[10px] uppercase z-10">
                  {prod.category}
                </span>
                {!prod.is_active && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-rose-500 text-white font-mono text-[10px] uppercase">
                    Inactive
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-heading text-lg font-bold text-brand-navy">{prod.title}</h3>
                <p className="text-xs text-brand-steel line-clamp-2 mt-1">
                  {prod.short_description}
                </p>
              </div>

              <div className="text-[11px] font-mono text-brand-steel space-y-0.5">
                {prod.capacity && <div>Capacity: {prod.capacity}</div>}
                {prod.speed && <div>Speed: {prod.speed}</div>}
              </div>
            </div>

            <div className="pt-3 border-t border-brand-silver flex items-center justify-between">
              <span className="font-mono text-xs text-brand-steel">Order: #{prod.display_order}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditProduct(prod)}
                  className="p-2 rounded-lg bg-brand-light hover:bg-brand-navy hover:text-white transition-colors text-xs"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(prod.id)}
                  className="p-2 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors text-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            onClick={() => setEditingProduct(null)}
            className="fixed inset-0 bg-brand-navy/85"
          />

          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-brand-silver overflow-hidden z-10 my-8">
            <div className="p-5 border-b border-brand-silver flex items-center justify-between bg-brand-navy text-white">
              <h3 className="font-heading text-lg font-bold">
                {isNew ? 'Create New Lift Product' : `Edit: ${editingProduct.title}`}
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-brand-charcoal mb-1">Product Title*</label>
                  <input
                    type="text"
                    value={editingProduct.title || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
                  />
                </div>

                <div>
                  <label className="block font-mono text-brand-charcoal mb-1">Category</label>
                  <input
                    type="text"
                    value={editingProduct.category || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-brand-charcoal mb-1">Short Description*</label>
                <input
                  type="text"
                  value={editingProduct.short_description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, short_description: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
                />
              </div>

              <div>
                <label className="block font-mono text-brand-charcoal mb-1">Full Detailed Overview</label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-mono text-brand-charcoal mb-1">Capacity / Payload</label>
                  <input
                    type="text"
                    value={editingProduct.capacity || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, capacity: e.target.value })}
                    placeholder="e.g. 500kg - 3000kg"
                    className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
                  />
                </div>

                <div>
                  <label className="block font-mono text-brand-charcoal mb-1">Speed</label>
                  <input
                    type="text"
                    value={editingProduct.speed || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, speed: e.target.value })}
                    placeholder="e.g. 0.5 - 1.5 m/s"
                    className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
                  />
                </div>

                <div>
                  <label className="block font-mono text-brand-charcoal mb-1">Drive System</label>
                  <input
                    type="text"
                    value={editingProduct.drive_system || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, drive_system: e.target.value })}
                    placeholder="e.g. Hydraulic / Traction"
                    className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
                  />
                </div>
              </div>

              {/* Image URL & File Upload */}
              <div>
                <label className="block font-mono text-brand-charcoal mb-1">Product Image URL or Upload</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={editingProduct.image_url || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-lg border border-brand-silver bg-brand-light text-xs"
                  />
                  <label className="px-3 py-2 rounded-lg bg-brand-light border border-brand-silver hover:bg-brand-silver cursor-pointer flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Key Features List */}
              <div>
                <label className="block font-mono text-brand-charcoal mb-1">Key Engineering Features</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="e.g. VVVF regenerative motor drive"
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
                <div className="space-y-1 max-h-28 overflow-y-auto">
                  {editingProduct.features?.map((f, i) => (
                    <div key={i} className="flex items-center justify-between p-1.5 rounded bg-brand-light border border-brand-silver/60">
                      <span>{f}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(i)}
                        className="text-rose-500 hover:text-rose-700"
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
                    value={editingProduct.display_order ?? 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, display_order: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
                  />
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="is_active_chk"
                    checked={editingProduct.is_active ?? true}
                    onChange={(e) => setEditingProduct({ ...editingProduct, is_active: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-accent"
                  />
                  <label htmlFor="is_active_chk" className="font-mono text-brand-navy cursor-pointer">
                    Active / Published on Site
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-silver flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-lg border border-brand-silver"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-brand-accent text-white font-medium shadow-glow"
                >
                  {saving ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

