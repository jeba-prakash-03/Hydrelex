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
            ? 'bg-graphite-800 border-b border-graphite-600/60 shadow-lg py-3.5'
            : 'bg-transparent py-5 sm:py-6'
        }`}
        style={{
          backgroundColor: isScrolled || !isHome ? '#1C1C1E' : 'transparent',
        }}
      >
        <div className="w-full px-fluid flex items-center justify-between">
          {/* Brand Logo */}
          <Logo variant="light" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group relative py-1 font-mono text-xs tracking-technical uppercase transition-colors duration-200 ${
                    isActive ? 'text-champagne-500 font-semibold' : 'text-ivory-100 hover:text-champagne-500'
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Champagne underline expanding from left */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-champagne-500 transition-all duration-300 origin-left ${
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
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm text-silver-400 hover:text-champagne-500 font-mono text-xs uppercase tracking-technical transition-colors"
                title="Track Existing Consultation"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Track Status</span>
              </button>
            )}

            {/* Request a Quote Button */}
            {onOpenQuoteModal ? (
              <button
                onClick={onOpenQuoteModal}
                className="group inline-flex items-center justify-center gap-2 px-6 h-11 rounded-sm bg-champagne-500 hover:bg-champagne-600 text-ink-900 font-mono text-xs font-bold uppercase tracking-technical transition-all duration-200 active:scale-[0.98] shadow-sm"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            ) : (
              <Link
                to="/contact#consultation"
                className="group inline-flex items-center justify-center gap-2 px-6 h-11 rounded-sm bg-champagne-500 hover:bg-champagne-600 text-ink-900 font-mono text-xs font-bold uppercase tracking-technical transition-all duration-200 active:scale-[0.98] shadow-sm"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button (Min 44px touch target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 rounded-sm text-ivory-100 hover:text-champagne-500 focus:outline-none transition-colors"
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
            className="fixed inset-0 z-50 bg-ink-900 text-ivory-100 flex flex-col justify-between p-6 sm:p-10 overflow-y-auto"
            style={{ backgroundColor: '#0E0E0F' }}
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between border-b border-graphite-600/60 pb-6">
              <Logo variant="light" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-sm text-silver-400 hover:text-ivory-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links with Staggered Visual Flow */}
            <div className="py-8 space-y-2">
              <div className="font-mono text-[11px] uppercase tracking-technical text-champagne-500 mb-4 font-semibold">
                DIRECTORY
              </div>
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-3 text-2xl sm:text-3xl font-heading font-extrabold transition-colors min-h-[44px] flex items-center justify-between ${
                        isActive ? 'text-champagne-500' : 'text-ivory-100 hover:text-champagne-500'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-5 h-5 text-silver-400/40" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Actions Cluster */}
            <div className="pt-6 border-t border-graphite-600/60 space-y-4">
              {onOpenTrackModal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTrackModal();
                  }}
                  className="w-full h-12 flex items-center justify-center gap-2 rounded-sm border border-graphite-600 text-silver-400 hover:text-ivory-100 font-mono text-xs uppercase tracking-technical transition-colors"
                >
                  <Search className="w-4 h-4 text-champagne-500" />
                  <span>Track Existing Consultation</span>
                </button>
              )}

              <Link
                to="/contact#consultation"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-sm bg-champagne-500 text-ink-900 font-mono text-xs font-bold uppercase tracking-technical shadow-sm"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Verified Contact Numbers */}
              <div className="pt-2 text-center font-mono text-xs text-silver-400 flex items-center justify-center gap-3">
                <Phone className="w-3.5 h-3.5 text-champagne-500" />
                <a href="tel:8939359592" className="hover:text-champagne-500">
                  +91 89393 59592
                </a>
                <span>/</span>
                <a href="tel:9789397504" className="hover:text-champagne-500">
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
