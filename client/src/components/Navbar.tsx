import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Search, Phone, FileCheck2, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';
import { Surface } from './ui/Surface';

interface NavbarProps {
  onOpenTrackModal?: () => void;
  onOpenQuoteModal?: () => void;
  onMobileMenuOpenChange?: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTrackModal,
  onOpenQuoteModal,
  onMobileMenuOpenChange,
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

  // Lock body scroll & sync drawer state with parent layout
  useEffect(() => {
    onMobileMenuOpenChange?.(mobileMenuOpen);
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, onMobileMenuOpenChange]);

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
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-colors duration-300 border-b ${
          isScrolled || !isHome
            ? 'bg-ink-900 border-copper-500/40 shadow-xl'
            : 'bg-ink-900 border-teal-500/30'
        }`}
      >
        {/* Top Corporate Accreditation Strip: Desktop only (>=1024px); moved into drawer/footer on mobile & tablet */}
        <div className="w-full border-b border-teal-500/30 bg-teal-900 py-1.5 px-fluid hidden lg:block">
          <div className="w-full flex items-center justify-between text-[11px] font-mono">
            {/* Left: Verified Registrations & Facility */}
            <div className="flex items-center gap-3 text-mint-100">
              <span className="text-amber-300 font-bold tracking-wider">UDYAM: UDYAM-TN-08-0090275</span>
              <span className="text-teal-500">|</span>
              <span>GSTIN: 33BNOPK2159N1ZJ</span>
              <span className="hidden xl:inline text-teal-500">|</span>
              <span className="hidden xl:inline text-mint-100">Mevallurkuppam Village, Sriperumbudur Taluk – 602015</span>
            </div>

            {/* Right: Direct Phones */}
            <div className="flex items-center gap-3 text-ivory-50">
              <span className="text-mint-100 uppercase tracking-widest text-[10px] hidden sm:inline">Direct Lines:</span>
              <a href="tel:8939359592" className="flex items-center gap-1 hover:text-amber-300 transition-colors font-semibold">
                <Phone className="w-3 h-3 text-amber-500" />
                <span>8939359592</span>
              </a>
              <span className="text-teal-500">/</span>
              <a href="tel:9789397504" className="hover:text-amber-300 transition-colors font-semibold">
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
                    isActive ? 'text-amber-500' : 'text-ivory-50 hover:text-amber-300'
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

          {/* Desktop Right Action Cluster (>=1024px) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Quick Consultation Status Tracker */}
            {onOpenTrackModal && (
              <button
                type="button"
                onClick={onOpenTrackModal}
                className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-sm text-mint-100 hover:text-amber-300 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors"
                title="Track Existing Consultation"
              >
                <Search className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden xl:inline">Track Status</span>
              </button>
            )}

            {/* Request a Quote Button (copper-500 with ink text and copper glow on hover) */}
            {onOpenQuoteModal ? (
              <button
                type="button"
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

          {/* Mobile Hamburger Button (>= 44x44px touch target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-sm text-ivory-50 hover:text-amber-300 focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Full-Screen Dark Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-ink-900 overflow-y-auto"
          >
            <Surface
              tone="teal"
              as="div"
              className="min-h-full w-full flex flex-col justify-between p-5 sm:p-8"
              style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
            >
              {/* Top Bar inside Menu */}
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-5">
                <Logo variant="light" />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-sm bg-ink-900/50 text-surface-fg hover:text-amber-300 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-6 space-y-2">
                <div className="font-sans text-xs uppercase tracking-[0.14em] text-amber-300 mb-3 font-bold">
                  DIRECTORY
                </div>
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`py-3 text-2xl sm:text-3xl font-heading font-extrabold transition-colors min-h-[48px] flex items-center justify-between ${
                        isActive ? 'text-amber-300' : 'text-surface-heading hover:text-amber-300'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-5 h-5 text-amber-500/70 shrink-0" />
                    </Link>
                  );
                })}
              </div>

              {/* Bottom Actions & Registrations Cluster */}
              <div className="pt-5 border-t border-[var(--border)] space-y-3">
                {/* Registrations moved here cleanly on mobile/tablet */}
                <div className="p-3.5 rounded-sm bg-teal-900/70 border border-teal-500/30 space-y-1.5 text-xs font-mono text-surface-fg">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>UDYAM: UDYAM-TN-08-0090275</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>GSTIN: 33BNOPK2159N1ZJ</span>
                  </div>
                </div>

                {onOpenTrackModal && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenTrackModal();
                    }}
                    className="w-full min-h-[48px] flex items-center justify-center gap-2 rounded-sm border border-[var(--border)] bg-teal-900 text-surface-fg hover:text-amber-300 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors"
                  >
                    <Search className="w-4 h-4 text-amber-500" />
                    <span>Track Existing Consultation</span>
                  </button>
                )}

                {onOpenQuoteModal ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenQuoteModal();
                    }}
                    className="w-full min-h-[52px] flex items-center justify-center gap-2 rounded-sm bg-copper-500 text-ink-950 font-sans text-sm font-bold uppercase tracking-wider shadow-copper-glow"
                  >
                    <span>Request a Quote</span>
                    <ArrowRight className="w-4 h-4 text-ink-950" />
                  </button>
                ) : (
                  <Link
                    to="/contact#consultation"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full min-h-[52px] flex items-center justify-center gap-2 rounded-sm bg-copper-500 text-ink-950 font-sans text-sm font-bold uppercase tracking-wider shadow-copper-glow"
                  >
                    <span>Request a Quote</span>
                    <ArrowRight className="w-4 h-4 text-ink-950" />
                  </Link>
                )}

                {/* Verified Contact Numbers (>= 44px touch targets) */}
                <div className="pt-1 font-sans text-xs text-surface-muted flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="tel:8939359592"
                    className="min-h-[44px] px-2 inline-flex items-center gap-1.5 hover:text-amber-300 text-surface-fg font-mono"
                  >
                    <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>+91 89393 59592</span>
                  </a>
                  <span aria-hidden="true">/</span>
                  <a
                    href="tel:9789397504"
                    className="min-h-[44px] px-2 inline-flex items-center hover:text-amber-300 text-surface-fg font-mono"
                  >
                    <span>+91 97893 97504</span>
                  </a>
                </div>
              </div>
            </Surface>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
