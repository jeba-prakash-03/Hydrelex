import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, ShieldCheck, Layers, ChevronDown } from 'lucide-react';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';
import { HeroLiftShaftAnimated } from './ui/HeroLiftShaftAnimated';
import { Surface } from './ui/Surface';
import { useMediaQuery } from '../hooks/useMediaQuery';

export const Hero: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const prefersReduced = useReducedMotion();
  const animateMount = isDesktop && !prefersReduced;

  return (
    <Surface
      tone="teal"
      as="section"
      id="hero"
      className="w-full min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-28 lg:pt-36 pb-6 lg:pb-8 overflow-hidden bg-gradient-to-b from-teal-700 via-teal-700 to-teal-900"
    >
      {/* Background Glow: Blur blob only on desktop (>=1024px); static radial tint below */}
      {isDesktop ? (
        <div
          aria-hidden="true"
          className="hidden lg:block absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40 blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, rgba(246, 185, 59, 0.45) 0%, rgba(232, 120, 46, 0.25) 40%, transparent 70%)',
          }}
        />
      ) : (
        <div
          aria-hidden="true"
          className="lg:hidden absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 82% 24%, rgba(246, 185, 59, 0.16) 0%, rgba(232, 120, 46, 0.08) 45%, transparent 75%)',
          }}
        />
      )}

      {/* Lightweight static right-edge architectural shaft accent on mobile/tablet (<1024px) */}
      {!isDesktop && (
        <svg
          aria-hidden="true"
          viewBox="0 0 48 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="lg:hidden pointer-events-none absolute right-2 top-24 bottom-20 h-[62%] w-10 opacity-25"
        >
          <line x1="18" y1="0" x2="18" y2="420" stroke="#D9EEE6" strokeWidth="1" />
          <line x1="34" y1="0" x2="34" y2="420" stroke="#F6B93B" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="8" y1="70" x2="44" y2="70" stroke="#F6B93B" strokeWidth="1.5" />
          <line x1="8" y1="210" x2="44" y2="210" stroke="#D9EEE6" strokeWidth="1.5" />
          <line x1="8" y1="350" x2="44" y2="350" stroke="#F6B93B" strokeWidth="1.5" />
        </svg>
      )}

      {/* Main Full-Width Split Composition: Left 55%, Right 45% (desktop only for animated shaft) */}
      <div className="relative z-10 w-full px-fluid my-auto py-4 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Manifesto */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 lg:space-y-8 max-w-3xl">
            {/* 1. Eyebrow */}
            <motion.div
              initial={animateMount ? { opacity: 0, y: 14 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: animateMount ? 0.5 : 0, ease: [0.22, 1, 0.36, 1] }}
            >
              <TechnicalEyebrow variant="amber">
                VERTICAL MOBILITY ENGINEERING — SRIPERUMBUDUR
              </TechnicalEyebrow>
            </motion.div>

            {/* 2. Three-Line Editorial Headline */}
            <h1 className="space-y-0.5 sm:space-y-1">
              <span className="block overflow-hidden">
                <motion.span
                  initial={animateMount ? { y: '100%' } : { y: 0 }}
                  animate={{ y: 0 }}
                  transition={{ duration: animateMount ? 0.7 : 0, delay: animateMount ? 0.1 : 0, ease: [0.22, 1, 0.36, 1] }}
                  className="block font-hero-clamp font-extrabold uppercase text-surface-heading tracking-tight"
                >
                  THE ART OF
                </motion.span>
              </span>

              <span className="block overflow-hidden">
                <motion.span
                  initial={animateMount ? { y: '100%' } : { y: 0 }}
                  animate={{ y: 0 }}
                  transition={{ duration: animateMount ? 0.7 : 0, delay: animateMount ? 0.2 : 0, ease: [0.22, 1, 0.36, 1] }}
                  className="block font-hero-clamp font-extrabold uppercase text-surface-heading tracking-tight"
                >
                  VERTICAL
                </motion.span>
              </span>

              <span className="block overflow-hidden">
                <motion.span
                  initial={animateMount ? { y: '100%' } : { y: 0 }}
                  animate={{ y: 0 }}
                  transition={{ duration: animateMount ? 0.7 : 0, delay: animateMount ? 0.3 : 0, ease: [0.22, 1, 0.36, 1] }}
                  className="block font-hero-clamp font-extrabold uppercase text-copper-400 tracking-tight lg:drop-shadow-[0_0_35px_rgba(232,120,46,0.5)]"
                >
                  MOVEMENT.
                </motion.span>
              </span>
            </h1>

            {/* 3. Supporting Text */}
            <motion.p
              initial={animateMount ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: animateMount ? 0.7 : 0, delay: animateMount ? 0.42 : 0, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-xl lg:text-2xl text-surface-muted font-light max-w-2xl leading-relaxed font-sans"
            >
              Engineering lift solutions that connect spaces, people and possibilities.
            </motion.p>

            {/* 4. Action Buttons: full width, stacked 12px gap <1024px; side-by-side on desktop */}
            <motion.div
              initial={animateMount ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: animateMount ? 0.7 : 0, delay: animateMount ? 0.52 : 0, ease: [0.22, 1, 0.36, 1] }}
              className="pt-1 lg:pt-2 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4"
            >
              <Link
                to="/products"
                className="group relative w-full lg:w-auto inline-flex items-center justify-center gap-3 px-6 lg:px-9 h-[52px] lg:h-14 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 font-sans text-xs sm:text-sm lg:text-xs font-bold uppercase tracking-[0.06em] lg:tracking-technical transition-all duration-300 shadow-[0_0_30px_rgba(232,120,46,0.4)] hover:shadow-[0_0_45px_rgba(232,120,46,0.6)] active:scale-[0.98]"
              >
                <span>Explore Our Systems</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
              </Link>

              <a
                href="#consultation"
                className="w-full lg:w-auto inline-flex items-center justify-center gap-2.5 px-6 lg:px-8 h-[52px] lg:h-14 rounded-sm border-2 border-amber-500 hover:border-amber-300 text-amber-300 hover:text-white font-sans text-xs sm:text-sm lg:text-xs font-bold uppercase tracking-[0.06em] lg:tracking-technical transition-all duration-200 active:scale-[0.98] bg-teal-900 hover:bg-ink-900"
              >
                <span>Request a Consultation</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: ONLY rendered >= 1024px so zero SVG/JS animation runs below 1024px */}
          {isDesktop && (
            <div className="lg:col-span-5 h-[480px] sm:h-[580px] lg:h-[680px] w-full flex items-center justify-center relative">
              <HeroLiftShaftAnimated className="w-full h-full" />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Info Strip (<1024px): clean 2 small lines below CTAs */}
      <div className="lg:hidden relative z-10 w-full px-fluid pt-4 mt-4 border-t border-teal-500/30 bg-teal-900/40 text-xs font-mono space-y-1.5 py-3">
        <div className="flex items-center gap-2 text-surface-fg">
          <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>Sriperumbudur Taluk 602015</span>
        </div>
        <div className="flex items-center gap-2 text-surface-muted">
          <Layers className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>Passenger - Goods - Hydraulic</span>
        </div>
      </div>

      {/* Desktop Bottom Hero Strip (>=1024px): unchanged */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="hidden lg:flex relative z-10 w-full px-fluid pt-6 flex-row items-center justify-between gap-4 text-xs font-mono border-t border-teal-500/30 bg-teal-900/40"
      >
        <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-wider">
          <div className="flex items-center gap-2 text-surface-fg">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>SRIPERUMBUDUR TALUK 602015</span>
          </div>

          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_6px_#F6B93B]" />

          <div className="flex items-center gap-2 text-surface-fg">
            <Layers className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>PASSENGER • GOODS • HEAVY HYDRAULIC</span>
          </div>

          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_6px_#F6B93B]" />

          <div className="flex items-center gap-2 text-surface-fg">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>UDYAM & GST REGISTERED</span>
          </div>
        </div>

        <a
          href="#company-intro"
          className="group inline-flex items-center gap-2 text-surface-muted hover:text-amber-300 transition-colors uppercase tracking-technical text-[11px] font-medium"
        >
          <span>Discover Architecture</span>
          <ChevronDown className="w-4 h-4 text-amber-500 transition-transform duration-200 group-hover:translate-y-0.5" />
        </a>
      </motion.div>
    </Surface>
  );
};
