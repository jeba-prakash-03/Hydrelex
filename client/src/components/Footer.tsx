import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  FileCheck2,
  Lock,
  ArrowUpRight,
  Linkedin,
} from 'lucide-react';
import { Logo } from './Logo';
import { useSettings } from '../context/SettingsContext';
import { Surface } from './ui/Surface';

export const Footer: React.FC = () => {
  const { settings } = useSettings();
  const currentYear = new Date().getFullYear();

  return (
    <Surface
      tone="dark"
      as="footer"
      className="w-full border-t-[4px] border-t-copper-500 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #073842 0%, #0F1416 65%, #0A0A0B 100%)',
      }}
    >
      {/* Main Full-Width Footer Content */}
      <div className="w-full px-fluid pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14 mb-16">
          {/* Brand & Verified Registrations (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Logo variant="light" />

            <p className="text-sm font-normal text-surface-muted leading-relaxed pr-4">
              Precision engineering and architectural vertical mobility systems. Manufacturing and erecting dependable passenger elevators, heavy freight lifts, and hydraulic machinery engineered for longevity and safety.
            </p>

            {/* Verified Certifications */}
            <div className="space-y-2 pt-1 font-mono text-xs">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xs bg-ink-900 border border-[var(--border)] text-surface-fg">
                <FileCheck2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>
                  UDYAM: <strong>{settings?.udyam_registration || 'UDYAM-TN-08-0090275'}</strong>
                </span>
              </div>
              <br />
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xs bg-ink-900 border border-[var(--border)] text-surface-fg">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>
                  GSTIN: <strong>{settings?.gstin || '33BNOPK2159N1ZJ'}</strong>
                </span>
              </div>
            </div>

            {/* Social Links (LinkedIn) */}
            {settings?.social_linkedin && (
              <div className="pt-2">
                <a
                  href={settings.social_linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xs bg-ink-900 border border-[var(--border)] flex items-center justify-center text-surface-fg hover:text-amber-300 hover:border-amber-500 transition-colors shadow-sm"
                  aria-label="HYDRELEX LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>

          {/* Directory Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="font-sans text-[12px] uppercase tracking-[0.14em] text-amber-500 font-bold">
              DIRECTORY
            </div>
            <ul className="space-y-2.5 font-sans text-[13px]">
              <li>
                <Link to="/" className="text-surface-muted hover:text-amber-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-surface-muted hover:text-amber-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-surface-muted hover:text-amber-300 transition-colors">
                  Systems
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-surface-muted hover:text-amber-300 transition-colors">
                  Engineering
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-surface-muted hover:text-amber-300 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-surface-muted hover:text-amber-300 transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-surface-muted hover:text-amber-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Systems List (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="font-sans text-[12px] uppercase tracking-[0.14em] text-amber-500 font-bold">
              SYSTEMS CATALOGUE
            </div>
            <ul className="space-y-2.5 font-sans text-[13px]">
              <li>
                <Link
                  to="/products"
                  className="text-surface-muted hover:text-amber-300 transition-colors flex items-center justify-between group"
                >
                  <span>Passenger Elevators</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-surface-muted group-hover:text-amber-300" />
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-surface-muted hover:text-amber-300 transition-colors flex items-center justify-between group"
                >
                  <span>Goods / Freight Lifts</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-surface-muted group-hover:text-amber-300" />
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-surface-muted hover:text-amber-300 transition-colors flex items-center justify-between group"
                >
                  <span>Heavy Hydraulic Platforms</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-surface-muted group-hover:text-amber-300" />
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-surface-muted hover:text-amber-300 transition-colors flex items-center justify-between group"
                >
                  <span>Industrial Scissor Systems</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-surface-muted group-hover:text-amber-300" />
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-surface-muted hover:text-amber-300 transition-colors flex items-center justify-between group"
                >
                  <span>Custom Panoramic Solutions</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-surface-muted group-hover:text-amber-300" />
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-surface-muted hover:text-amber-300 transition-colors flex items-center justify-between group"
                >
                  <span>Inverter Modernization</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-surface-muted group-hover:text-amber-300" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Registered Headquarter Location & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="font-sans text-[12px] uppercase tracking-[0.14em] text-amber-500 font-bold">
              HEADQUARTERS & MANUFACTURING
            </div>
            <div className="space-y-3.5 font-sans text-xs text-surface-muted">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-copper-400 shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed text-xs text-surface-fg">
                  {settings?.address_line1 || 'No B3-G4, Arakonam Road'},<br />
                  {settings?.address_line2 || 'Mevallurkuppam Village'},<br />
                  {settings?.city || 'Sriperumbudur Taluk'} – {settings?.pincode || '602015'},<br />
                  {settings?.state || 'Tamil Nadu'}, {settings?.country || 'India'}.
                </address>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-copper-400 shrink-0" />
                <div>
                  <a href={`tel:${settings?.phone_primary || '8939359592'}`} className="text-surface-fg hover:text-amber-300 font-mono">
                    +91 {settings?.phone_primary || '8939359592'}
                  </a>
                  <span className="mx-1.5 text-surface-muted">/</span>
                  <a href={`tel:${settings?.phone_secondary || '9789397504'}`} className="text-surface-fg hover:text-amber-300 font-mono">
                    +91 {settings?.phone_secondary || '9789397504'}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-copper-400 shrink-0" />
                <a href={`mailto:${settings?.email || 'info@hydrelex.com'}`} className="text-surface-fg hover:text-amber-300 font-mono">
                  {settings?.email || 'info@hydrelex.com'}
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-copper-400 shrink-0 mt-0.5" />
                <div className="text-[11px] text-surface-muted leading-relaxed">
                  {settings?.business_hours || 'Monday – Saturday: 9:00 AM – 6:30 PM (Sunday Closed)'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Full Width) */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-surface-muted">
          <div>
            © {currentYear} {settings?.company_name || 'HYDRELEX LIFT SYSTEMS'}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Mevallurkuppam • Sriperumbudur</span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 text-surface-fg hover:text-amber-300 transition-colors"
            >
              <Lock className="w-3 h-3 text-amber-500" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>

        {/* Giant Faint "HYDRELEX" Wordmark */}
        <div
          aria-hidden="true"
          className="w-full overflow-hidden flex justify-center pointer-events-none select-none -mb-8 sm:-mb-14 pt-8"
        >
          <span
            className="text-[18vw] font-heading font-black tracking-tighter leading-none opacity-15 whitespace-nowrap"
            style={{
              WebkitTextStroke: '2px #F6B93B',
              color: 'transparent',
            }}
          >
            HYDRELEX
          </span>
        </div>
      </div>
    </Surface>
  );
};
