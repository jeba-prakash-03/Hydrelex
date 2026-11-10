import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2, Building, Phone, MapPin, Globe, ShieldCheck } from 'lucide-react';
import { api } from '../../lib/api';
import { useSettings } from '../../context/SettingsContext';

export const AdminSettingsPage: React.FC = () => {
  const { refreshSettings } = useSettings();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.getSettings();
        if (res.success && res.settings) {
          setFormData(res.settings as any);
        }
      } catch (err) {
        console.error('Settings load err:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSuccessMsg(null);
      await api.updateSettings(formData);
      await refreshSettings();
      setSuccessMsg('Corporate profile and settings updated successfully.');
      setTimeout(() => setSuccessMsg(null), 3500);
    } catch (err: any) {
      alert(err.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-brand-steel">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-brand-accent font-semibold">
            GLOBAL CONFIGURATION
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-navy">
            Company Settings & Verified Details
          </h1>
          <p className="text-xs sm:text-sm text-brand-steel">
            Update verified registration details, plant address, phone numbers, and marketing copy.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Official Corporate Identity & Registrations */}
        <div className="p-6 rounded-2xl bg-white border border-brand-silver shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-brand-silver">
            <ShieldCheck className="w-4 h-4 text-brand-accent" />
            <h3 className="font-heading text-base font-bold text-brand-navy">
              Corporate Entity & Registrations
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-mono text-brand-charcoal mb-1">Company Legal Name</label>
              <input
                type="text"
                value={formData.company_name || ''}
                onChange={(e) => handleChange('company_name', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light font-semibold"
              />
            </div>

            <div>
              <label className="block font-mono text-brand-charcoal mb-1">Company Tagline</label>
              <input
                type="text"
                value={formData.tagline || ''}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
              />
            </div>

            <div>
              <label className="block font-mono text-brand-charcoal mb-1">UDYAM Registration No.</label>
              <input
                type="text"
                value={formData.udyam_registration || ''}
                onChange={(e) => handleChange('udyam_registration', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light font-mono"
              />
            </div>

            <div>
              <label className="block font-mono text-brand-charcoal mb-1">GSTIN Number</label>
              <input
                type="text"
                value={formData.gstin || ''}
                onChange={(e) => handleChange('gstin', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Information & Location */}
        <div className="p-6 rounded-2xl bg-white border border-brand-silver shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-brand-silver">
            <MapPin className="w-4 h-4 text-brand-accent" />
            <h3 className="font-heading text-base font-bold text-brand-navy">
              Physical Location & Telephones
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-mono text-brand-charcoal mb-1">Address Line 1</label>
              <input
                type="text"
                value={formData.address_line1 || ''}
                onChange={(e) => handleChange('address_line1', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
              />
            </div>

            <div>
              <label className="block font-mono text-brand-charcoal mb-1">Address Line 2 (Village / Area)</label>
              <input
                type="text"
                value={formData.address_line2 || ''}
                onChange={(e) => handleChange('address_line2', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
              />
            </div>

            <div>
              <label className="block font-mono text-brand-charcoal mb-1">City / Taluk</label>
              <input
                type="text"
                value={formData.city || ''}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
              />
            </div>

            <div>
              <label className="block font-mono text-brand-charcoal mb-1">Postal PIN Code</label>
              <input
                type="text"
                value={formData.pincode || ''}
                onChange={(e) => handleChange('pincode', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light font-mono"
              />
            </div>

            <div>
              <label className="block font-mono text-brand-charcoal mb-1">Primary Contact Phone</label>
              <input
                type="text"
                value={formData.phone_primary || ''}
                onChange={(e) => handleChange('phone_primary', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light font-mono"
              />
            </div>

            <div>
              <label className="block font-mono text-brand-charcoal mb-1">Secondary Contact Phone</label>
              <input
                type="text"
                value={formData.phone_secondary || ''}
                onChange={(e) => handleChange('phone_secondary', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light font-mono"
              />
            </div>

            <div>
              <label className="block font-mono text-brand-charcoal mb-1">Corporate Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
              />
            </div>

            <div>
              <label className="block font-mono text-brand-charcoal mb-1">Business Hours</label>
              <input
                type="text"
                value={formData.business_hours || ''}
                onChange={(e) => handleChange('business_hours', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Homepage Headlines & Copy */}
        <div className="p-6 rounded-2xl bg-white border border-brand-silver shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-brand-silver">
            <Building className="w-4 h-4 text-brand-accent" />
            <h3 className="font-heading text-base font-bold text-brand-navy">
              Homepage Headlines & Content
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-mono text-brand-charcoal mb-1">Hero Main Headline</label>
              <input
                type="text"
                value={formData.hero_headline || ''}
                onChange={(e) => handleChange('hero_headline', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
              />
            </div>

            <div>
              <label className="block font-mono text-brand-charcoal mb-1">Hero Supporting Text</label>
              <input
                type="text"
                value={formData.hero_subheading || ''}
                onChange={(e) => handleChange('hero_subheading', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
              />
            </div>

            <div>
              <label className="block font-mono text-brand-charcoal mb-1">Introduction Headline</label>
              <input
                type="text"
                value={formData.intro_headline || ''}
                onChange={(e) => handleChange('intro_headline', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
              />
            </div>

            <div>
              <label className="block font-mono text-brand-charcoal mb-1">Introduction Narrative</label>
              <textarea
                rows={3}
                value={formData.intro_text || ''}
                onChange={(e) => handleChange('intro_text', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-white font-medium text-sm shadow-glow disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Profile...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

