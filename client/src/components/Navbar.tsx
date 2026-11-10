import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  MapPin,
  Menu,
  X,
  Search,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Logo } from './Logo';
import { useSettings } from '../context/SettingsContext';

interface NavbarProps {
  onOpenTrackModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTrackModal }) => {
  const { settings } = useSettings();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Systems', path: '/products' },
    { label: 'Engineering', path: '/services' },
    { label: 'Gallery', path: '/projects' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Contact', path: '/contact' },
  ];

  const isHome = location.pathname === '/';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500">
        {/* Top Minimal Engineering Status Bar (Full Width) */}
        <div
          className={`w-full border-b transition-colors duration-500 text-[11px] font-mono hidden md:block ${
            isScrolled || !isHome
              ? 'bg-arch-black/95 border-arch-steel/40 text-arch-sand/80 backdrop-blur-md'
              : 'bg-arch-black/40 border-white/10 text-white/80 backdrop-blur-sm'
          }`}
        >
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-arch-champagne">
                <span className="w-1.5 h-1.5 rounded-full bg-arch-champagne animate-pulse" />
                SRIPERUMBUDUR INDUSTRIAL PRECISION
              </span>
              <span className="text-white/20">|</span>
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-arch-champagne" />
                <span>Mevallurkuppam, Tamil Nadu 602015</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-arch-champagne" />
                <a href="tel:8939359592" className="hover:text-arch-champagne transition-colors">
                  +91 89393 59592
                </a>
                <span className="text-white/30">/</span>
                <a href="tel:9789397504" className="hover:text-arch-champagne transition-colors">
                  +91 97893 97504
                </a>
              </div>
              <span className="text-white/20">|</span>
              <span className="text-arch-sand/70">
                UDYAM: <strong className="text-arch-bone">{settings?.udyam_registration || 'UDYAM-TN-08-0090275'}</strong>
              </span>
              <span className="text-white/20">|</span>
              {onOpenTrackModal && (
                <button
                  onClick={onOpenTrackModal}
                  className="flex items-center gap-1.5 text-arch-champagne hover:text-white transition-colors"
                >
                  <Search className="w-3 h-3" />
                  <span>Track Consultation</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Full-Width Navigation */}
        <nav
          className={`w-full transition-all duration-500 ${
            isScrolled || !isHome
              ? 'bg-arch-black/95 backdrop-blur-lg border-b border-arch-steel/50 py-3.5 shadow-architectural-dark'
              : 'bg-gradient-to-b from-arch-black/80 via-arch-black/30 to-transparent py-5'
          }`}
        >
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 flex items-center justify-between">
            {/* Logo */}
            <Logo variant="light" />

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative py-1 text-xs font-mono tracking-architectural uppercase transition-colors duration-200 group ${
                      isActive ? 'text-arch-champagne font-semibold' : 'text-arch-bone/85 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span
                      className={`absolute -bottom-1 left-0 w-full h-[1.5px] bg-arch-champagne transition-transform duration-300 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-4">
              {onOpenTrackModal && (
                <button
                  onClick={onOpenTrackModal}
                  className="lg:hidden p-2.5 rounded-sm text-arch-sand hover:text-white hover:bg-white/5 border border-white/10 text-xs"
                  title="Track Consultation Status"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}

              <Link
                to="/contact#consultation"
                className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-sm bg-arch-champagne text-arch-black font-mono text-xs font-semibold uppercase tracking-architectural hover:bg-arch-champagneLight transition-all duration-300 shadow-sm active:scale-[0.98]"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-sm text-arch-bone hover:text-white hover:bg-white/5 border border-white/10 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-[56px] sm:top-[68px] z-40 bg-arch-black/98 backdrop-blur-2xl border-t border-arch-steel/60 lg:hidden overflow-y-auto px-6 py-8 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-ultra-wide uppercase text-arch-champagne block">
                NAVIGATION
              </span>
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-4 py-3 rounded-sm font-heading text-lg font-bold transition-all ${
                        isActive
                          ? 'text-arch-champagne bg-white/5 border-l-2 border-arch-champagne pl-4'
                          : 'text-arch-bone/85 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-arch-steel/40 space-y-3">
                {onOpenTrackModal && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenTrackModal();
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-sm bg-white/5 border border-arch-steel/60 text-arch-bone text-xs font-mono uppercase"
                  >
                    <span className="flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-arch-champagne" />
                      Track Existing Consultation
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-arch-sand" />
                  </button>
                )}

                <Link
                  to="/contact#consultation"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-arch-champagne text-arch-black font-mono text-xs font-semibold uppercase tracking-wider shadow-sm"
                >
                  <span>Request a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="pt-8 border-t border-arch-steel/40 text-xs font-mono text-arch-slate space-y-1.5">
              <div className="text-arch-bone font-medium">SRIPERUMBUDUR, TAMIL NADU</div>
              <div>TEL: 8939359592 / 9789397504</div>
              <div>UDYAM: {settings?.udyam_registration}</div>
              <div>GSTIN: {settings?.gstin}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
