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

export const Footer: React.FC = () => {
  const { settings } = useSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-ink-900 border-t border-champagne-500/40 text-silver-400 relative overflow-hidden"
      style={{ backgroundColor: '#0E0E0F' }}
    >
      {/* Subtle 1px Top Champagne Highlight */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-champagne-500 to-transparent" />

      {/* Main Full-Width Footer Content */}
      <div className="w-full px-fluid pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14 mb-16">
          {/* Brand & Verified Registrations (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Logo variant="light" />

            <p className="text-sm font-light text-silver-400/90 leading-relaxed pr-4">
              Precision engineering and architectural vertical mobility systems. Manufacturing and erecting dependable passenger elevators, heavy freight lifts, and hydraulic machinery engineered for longevity and safety.
            </p>

            {/* Verified Certifications */}
            <div className="space-y-2 pt-1 font-mono text-xs">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-graphite-800 border border-graphite-600 text-ivory-100">
                <FileCheck2 className="w-3.5 h-3.5 text-champagne-500 shrink-0" />
                <span>
                  UDYAM: <strong>{settings?.udyam_registration || 'UDYAM-TN-08-0090275'}</strong>
                </span>
              </div>
              <br />
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-graphite-800 border border-graphite-600 text-ivory-100">
                <ShieldCheck className="w-3.5 h-3.5 text-champagne-500 shrink-0" />
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
                  className="w-9 h-9 rounded-sm bg-graphite-800 border border-graphite-600 flex items-center justify-center text-silver-400 hover:text-champagne-500 hover:border-champagne-500 transition-colors"
                  aria-label="HYDRELEX LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>

          {/* Directory Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="font-mono text-[11px] uppercase tracking-technical text-champagne-500 font-semibold">
              DIRECTORY
            </div>
            <ul className="space-y-2.5 font-mono text-xs uppercase tracking-wider">
              <li>
                <Link to="/" className="text-silver-400 hover:text-champagne-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-silver-400 hover:text-champagne-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-silver-400 hover:text-champagne-500 transition-colors">
                  Systems
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-silver-400 hover:text-champagne-500 transition-colors">
                  Engineering
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-silver-400 hover:text-champagne-500 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-silver-400 hover:text-champagne-500 transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-silver-400 hover:text-champagne-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Systems List (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="font-mono text-[11px] uppercase tracking-technical text-champagne-500 font-semibold">
              SYSTEMS CATALOGUE
            </div>
            <ul className="space-y-2.5 font-mono text-xs">
              <li>
                <Link
                  to="/products"
                  className="text-silver-400 hover:text-champagne-500 transition-colors flex items-center justify-between group"
                >
                  <span>Passenger Elevators</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-silver-400/40 group-hover:text-champagne-500" />
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-silver-400 hover:text-champagne-500 transition-colors flex items-center justify-between group"
                >
                  <span>Goods / Freight Lifts</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-silver-400/40 group-hover:text-champagne-500" />
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-silver-400 hover:text-champagne-500 transition-colors flex items-center justify-between group"
                >
                  <span>Heavy Hydraulic Platforms</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-silver-400/40 group-hover:text-champagne-500" />
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-silver-400 hover:text-champagne-500 transition-colors flex items-center justify-between group"
                >
                  <span>Industrial Scissor Systems</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-silver-400/40 group-hover:text-champagne-500" />
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-silver-400 hover:text-champagne-500 transition-colors flex items-center justify-between group"
                >
                  <span>Custom Panoramic Solutions</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-silver-400/40 group-hover:text-champagne-500" />
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-silver-400 hover:text-champagne-500 transition-colors flex items-center justify-between group"
                >
                  <span>Inverter Modernization</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-silver-400/40 group-hover:text-champagne-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Registered Headquarter Location & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="font-mono text-[11px] uppercase tracking-technical text-champagne-500 font-semibold">
              HEADQUARTERS & MANUFACTURING
            </div>
            <div className="space-y-3.5 font-mono text-xs text-silver-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-champagne-500 shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed font-sans text-xs">
                  {settings?.address_line1 || 'No B3-G4, Arakonam Road'},<br />
                  {settings?.address_line2 || 'Mevallurkuppam Village'},<br />
                  {settings?.city || 'Sriperumbudur Taluk'} – {settings?.pincode || '602015'},<br />
                  {settings?.state || 'Tamil Nadu'}, {settings?.country || 'India'}.
                </address>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-champagne-500 shrink-0" />
                <div>
                  <a href={`tel:${settings?.phone_primary || '8939359592'}`} className="hover:text-champagne-500">
                    +91 {settings?.phone_primary || '8939359592'}
                  </a>
                  <span className="mx-1.5 text-graphite-600">/</span>
                  <a href={`tel:${settings?.phone_secondary || '9789397504'}`} className="hover:text-champagne-500">
                    +91 {settings?.phone_secondary || '9789397504'}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-champagne-500 shrink-0" />
                <a href={`mailto:${settings?.email || 'info@hydrelex.com'}`} className="hover:text-champagne-500">
                  {settings?.email || 'info@hydrelex.com'}
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-champagne-500 shrink-0 mt-0.5" />
                <div className="text-[11px] text-silver-400/80 leading-relaxed">
                  {settings?.business_hours || 'Monday – Saturday: 9:00 AM – 6:30 PM (Sunday Closed)'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Full Width) */}
        <div className="pt-8 border-t border-graphite-600/40 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-silver-400/70">
          <div>
            © {currentYear} {settings?.company_name || 'HYDRELEX LIFT SYSTEMS'}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Mevallurkuppam • Sriperumbudur</span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 text-silver-400 hover:text-champagne-500 transition-colors"
            >
              <Lock className="w-3 h-3 text-champagne-500" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
