import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  FileCheck2,
  Lock,
  ArrowUpRight,
  Clock,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from 'lucide-react';
import { Logo } from './Logo';
import { useSettings } from '../context/SettingsContext';

export const Footer: React.FC = () => {
  const { settings } = useSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-arch-black border-t border-arch-steel/40 text-arch-sand relative overflow-hidden">
      {/* Blueprint grid accent */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-10 pointer-events-none" />

      {/* Main Full-Width Footer Content */}
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Identity & Legal Registrations (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Logo variant="light" />

            <p className="text-xs sm:text-sm text-arch-sand/80 leading-relaxed font-light pr-4">
              Precision engineering and architectural vertical mobility systems. Manufacturing and erecting dependable
              passenger lifts, heavy freight elevators, and hydraulic machinery engineered for longevity and safety.
            </p>

            <div className="space-y-2 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-arch-graphite border border-arch-steel/60 text-xs font-mono text-arch-bone">
                <FileCheck2 className="w-3.5 h-3.5 text-arch-champagne shrink-0" />
                <span>UDYAM: <strong>{settings?.udyam_registration || 'UDYAM-TN-08-0090275'}</strong></span>
              </div>
              <br />
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-arch-graphite border border-arch-steel/60 text-xs font-mono text-arch-bone">
                <ShieldCheck className="w-3.5 h-3.5 text-arch-copper shrink-0" />
                <span>GSTIN: <strong>{settings?.gstin || '33BNOPK2159N1ZJ'}</strong></span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {settings?.social_linkedin && (
                <a
                  href={settings.social_linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-sm bg-arch-graphite border border-arch-steel/60 flex items-center justify-center text-arch-sand hover:text-arch-champagne transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              )}
              {settings?.social_twitter && (
                <a
                  href={settings.social_twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-sm bg-arch-graphite border border-arch-steel/60 flex items-center justify-center text-arch-sand hover:text-arch-champagne transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
              )}
              {settings?.social_facebook && (
                <a
                  href={settings.social_facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-sm bg-arch-graphite border border-arch-steel/60 flex items-center justify-center text-arch-sand hover:text-arch-champagne transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              )}
              {settings?.social_instagram && (
                <a
                  href={settings.social_instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-sm bg-arch-graphite border border-arch-steel/60 flex items-center justify-center text-arch-sand hover:text-arch-champagne transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Architectural Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[10px] font-mono tracking-ultra-wide uppercase text-arch-champagne font-semibold block">
              DIRECTORY
            </span>
            <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider">
              <li>
                <Link to="/" className="text-arch-sand/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-arch-sand/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-arch-sand/80 hover:text-white transition-colors">
                  Lifting Systems
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-arch-sand/80 hover:text-white transition-colors">
                  Engineering
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-arch-sand/80 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-arch-sand/80 hover:text-white transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-arch-sand/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions Category Index (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[10px] font-mono tracking-ultra-wide uppercase text-arch-champagne font-semibold block">
              SYSTEMS INDEX
            </span>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link to="/products" className="text-arch-sand/80 hover:text-white transition-colors flex items-center justify-between">
                  <span>Passenger Elevators</span>
                  <ArrowUpRight className="w-3 h-3 text-arch-slate" />
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-arch-sand/80 hover:text-white transition-colors flex items-center justify-between">
                  <span>Goods Freight Lifts</span>
                  <ArrowUpRight className="w-3 h-3 text-arch-slate" />
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-arch-sand/80 hover:text-white transition-colors flex items-center justify-between">
                  <span>Heavy Hydraulic Platforms</span>
                  <ArrowUpRight className="w-3 h-3 text-arch-slate" />
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-arch-sand/80 hover:text-white transition-colors flex items-center justify-between">
                  <span>Scissor Dock Systems</span>
                  <ArrowUpRight className="w-3 h-3 text-arch-slate" />
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-arch-sand/80 hover:text-white transition-colors flex items-center justify-between">
                  <span>Custom Panoramic Lifts</span>
                  <ArrowUpRight className="w-3 h-3 text-arch-slate" />
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-arch-sand/80 hover:text-white transition-colors flex items-center justify-between">
                  <span>Inverter Modernization</span>
                  <ArrowUpRight className="w-3 h-3 text-arch-slate" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Registered Factory Location (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[10px] font-mono tracking-ultra-wide uppercase text-arch-champagne font-semibold block">
              FACTORY & HEADQUARTERS
            </span>
            <div className="space-y-3.5 text-xs text-arch-sand/80 font-mono">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-arch-copper shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed">
                  {settings?.address_line1 || 'No B3-G4, Arakonam Road'},<br />
                  {settings?.address_line2 || 'Mevallurkuppam Village'},<br />
                  {settings?.city || 'Sriperumbudur Taluk'} – {settings?.pincode || '602015'},<br />
                  {settings?.state || 'Tamil Nadu'}, {settings?.country || 'India'}.
                </address>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-arch-copper shrink-0" />
                <div>
                  <a href={`tel:${settings?.phone_primary || '8939359592'}`} className="hover:text-arch-champagne">
                    +91 {settings?.phone_primary || '8939359592'}
                  </a>
                  <span className="mx-1.5 text-white/30">/</span>
                  <a href={`tel:${settings?.phone_secondary || '9789397504'}`} className="hover:text-arch-champagne">
                    +91 {settings?.phone_secondary || '9789397504'}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-arch-copper shrink-0" />
                <a href={`mailto:${settings?.email || 'info@hydrelex.com'}`} className="hover:text-arch-champagne">
                  {settings?.email || 'info@hydrelex.com'}
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-arch-copper shrink-0 mt-0.5" />
                <div className="text-[11px] text-arch-sand/70 leading-relaxed">
                  {settings?.business_hours || 'Mon – Sat: 9:00 AM – 6:30 PM (Sun Closed)'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Full Width) */}
        <div className="pt-8 border-t border-arch-steel/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-arch-slate">
          <div>
            © {currentYear} {settings?.company_name || 'HYDRELEX LIFT SYSTEMS'}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Mevallurkuppam • Sriperumbudur</span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 text-arch-sand/70 hover:text-arch-champagne transition-colors"
            >
              <Lock className="w-3 h-3 text-arch-copper" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
