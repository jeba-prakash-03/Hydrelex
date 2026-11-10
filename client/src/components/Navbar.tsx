import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Search, Phone } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenTrackModal?: () => void;
  onOpenQuoteModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTrackModal,
  onOpenQuoteModal,
}) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
          isScrolled || !isHome
            ? 'bg-ink-950/95 border-b border-graphite-700 shadow-xl'
            : 'bg-ink-950/80 border-b border-graphite-700/60'
        }`}
        style={{
          backgroundColor: isScrolled || !isHome ? 'rgba(10, 10, 11, 0.98)' : 'rgba(10, 10, 11, 0.85)',
        }}
      >
        {/* Top Corporate Accreditation Strip: Sourced from verified company banner */}
        <div className="w-full border-b border-graphite-700/60 bg-graphite-900/90 py-1.5 px-fluid hidden md:block">
          <div className="w-full flex items-center justify-between text-[11px] font-mono">
            {/* Left: Verified Registrations & Facility */}
            <div className="flex items-center gap-3 text-steel-300">
              <span className="text-copper-400 font-bold tracking-wider">UDYAM: UDYAM-TN-08-0090275</span>
              <span className="text-graphite-700">|</span>
              <span>GSTIN: 33BNOPK2159N1ZJ</span>
              <span className="hidden xl:inline text-graphite-700">|</span>
              <span className="hidden xl:inline text-steel-300">Mevallurkuppam Village, Sriperumbudur Taluk – 602015</span>
            </div>

            {/* Right: Direct Phones */}
            <div className="flex items-center gap-3 text-steel-100">
              <span className="text-steel-300 uppercase tracking-widest text-[10px] hidden sm:inline">Direct Lines:</span>
              <a href="tel:8939359592" className="flex items-center gap-1 hover:text-copper-400 transition-colors">
                <Phone className="w-3 h-3 text-copper-500" />
                <span>8939359592</span>
              </a>
              <span className="text-graphite-700">/</span>
              <a href="tel:9789397504" className="hover:text-copper-400 transition-colors">
                <span>9789397504</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className={`w-full px-fluid flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-3.5 sm:py-4'
        }`}>
          {/* Brand Logo */}
          <Logo variant="light" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group relative py-1 font-sans text-[13px] font-semibold tracking-[0.12em] uppercase transition-colors duration-200 ${
                    isActive ? 'text-copper-500' : 'text-steel-100 hover:text-copper-400'
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Copper underline expanding from left */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-copper-500 transition-all duration-300 origin-left ${
                      isActive ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Quick Consultation Status Tracker */}
            {onOpenTrackModal && (
              <button
                onClick={onOpenTrackModal}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm text-steel-300 hover:text-copper-400 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors"
                title="Track Existing Consultation"
              >
                <Search className="w-3.5 h-3.5 text-copper-500" />
                <span className="hidden xl:inline">Track Status</span>
              </button>
            )}

            {/* Request a Quote Button (copper-500 with ink text and copper glow on hover) */}
            {onOpenQuoteModal ? (
              <button
                onClick={onOpenQuoteModal}
                className="group inline-flex items-center justify-center gap-2 px-6 h-11 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 font-sans text-[13px] font-bold uppercase tracking-[0.12em] transition-all duration-200 active:scale-[0.98] shadow-copper-glow hover:shadow-[0_0_24px_rgba(232,120,46,0.5)]"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 text-ink-950" />
              </button>
            ) : (
              <Link
                to="/contact#consultation"
                className="group inline-flex items-center justify-center gap-2 px-6 h-11 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 font-sans text-[13px] font-bold uppercase tracking-[0.12em] transition-all duration-200 active:scale-[0.98] shadow-copper-glow hover:shadow-[0_0_24px_rgba(232,120,46,0.5)]"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 text-ink-950" />
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button (Min 44px touch target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 rounded-sm text-steel-100 hover:text-copper-400 focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Full-Screen Dark Mobile Drawer Animated with Framer Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-ink-950 text-steel-100 flex flex-col justify-between p-6 sm:p-10 overflow-y-auto"
            style={{ backgroundColor: '#0A0A0B' }}
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between border-b border-graphite-700 pb-6">
              <Logo variant="light" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-sm text-steel-300 hover:text-steel-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links with Staggered Visual Flow */}
            <div className="py-8 space-y-2">
              <div className="font-sans text-[12px] uppercase tracking-[0.15em] text-copper-500 mb-4 font-bold">
                DIRECTORY
              </div>
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 1, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-3 text-2xl sm:text-3xl font-heading font-extrabold transition-colors min-h-[44px] flex items-center justify-between ${
                        isActive ? 'text-copper-500' : 'text-steel-100 hover:text-copper-400'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-5 h-5 text-steel-300/40" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Actions Cluster */}
            <div className="pt-6 border-t border-graphite-700 space-y-4">
              {onOpenTrackModal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTrackModal();
                  }}
                  className="w-full h-12 flex items-center justify-center gap-2 rounded-sm border border-graphite-700 text-steel-300 hover:text-steel-100 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors"
                >
                  <Search className="w-4 h-4 text-copper-500" />
                  <span>Track Existing Consultation</span>
                </button>
              )}

              <Link
                to="/contact#consultation"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-sm bg-copper-500 text-ink-950 font-sans text-[13px] font-bold uppercase tracking-[0.12em] shadow-copper-glow"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Verified Contact Numbers */}
              <div className="pt-2 text-center font-sans text-xs text-steel-300 flex items-center justify-center gap-3">
                <Phone className="w-3.5 h-3.5 text-copper-500" />
                <a href="tel:8939359592" className="hover:text-copper-400 font-mono">
                  +91 89393 59592
                </a>
                <span>/</span>
                <a href="tel:9789397504" className="hover:text-copper-400 font-mono">
                  +91 97893 97504
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
