import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, ShieldCheck, Layers, ChevronDown } from 'lucide-react';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';
import { HeroLiftShaftAnimated } from './ui/HeroLiftShaftAnimated';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[100svh] bg-ink-950 text-ivory-50 flex flex-col justify-between pt-28 sm:pt-32 pb-8 overflow-hidden bg-grain"
      style={{ backgroundColor: '#0A0A0B' }}
    >
      {/* Background Radial Glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(232, 120, 46, 0.45) 0%, transparent 70%)',
        }}
      />

      {/* Main Full-Width Split Composition: Left 55%, Right 45% */}
      <div className="relative z-10 w-full px-fluid my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 55% Editorial Manifesto (7 cols) */}
          <div className="lg:col-span-7 space-y-8 max-w-3xl">
            {/* 1. Bolder Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <TechnicalEyebrow variant="copper">
                VERTICAL MOBILITY ENGINEERING — SRIPERUMBUDUR
              </TechnicalEyebrow>
            </motion.div>

            {/* 2. Three-Line Editorial Headline with solid copper "MOVEMENT." */}
            <div className="space-y-1">
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-hero-clamp font-extrabold uppercase text-ivory-50 tracking-tight leading-[0.92]"
                >
                  THE ART OF
                </motion.div>
              </div>

              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="font-hero-clamp font-extrabold uppercase text-ivory-50 tracking-tight leading-[0.92]"
                >
                  VERTICAL
                </motion.div>
              </div>

              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="font-hero-clamp font-extrabold uppercase text-copper-500 tracking-tight leading-[0.92] drop-shadow-[0_0_30px_rgba(232,120,46,0.4)]"
                >
                  MOVEMENT.
                </motion.div>
              </div>
            </div>

            {/* 3. Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg sm:text-2xl text-steel-300 font-light max-w-2xl leading-relaxed font-sans"
            >
              Engineering lift solutions that connect spaces, people and possibilities.
            </motion.p>

            {/* 4. Action Buttons with Copper Glow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <Link
                to="/products"
                className="group relative inline-flex items-center justify-center gap-3 px-9 h-14 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 font-sans text-xs font-bold uppercase tracking-technical transition-all duration-300 shadow-[0_0_25px_rgba(232,120,46,0.4)] hover:shadow-[0_0_40px_rgba(232,120,46,0.6)] active:scale-[0.98]"
              >
                <span>Explore Our Systems</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <a
                href="#consultation"
                className="inline-flex items-center justify-center gap-2.5 px-8 h-14 rounded-sm border border-steel-300/60 hover:border-copper-500 text-ivory-50 hover:text-copper-400 font-sans text-xs font-bold uppercase tracking-technical transition-all duration-200 active:scale-[0.98] bg-graphite-900/40"
              >
                <span>Request a Consultation</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: 45% Animated Lift Shaft Engine (5 cols) */}
          <div className="lg:col-span-5 h-[480px] sm:h-[580px] lg:h-[680px] w-full flex items-center justify-center relative">
            <HeroLiftShaftAnimated className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Bottom Hero Strip: 3 Count-Free Verified Items */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 w-full px-fluid pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-steel-300 border-t border-graphite-700/80"
      >
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] uppercase tracking-wider">
          <div className="flex items-center gap-2 text-ivory-50">
            <MapPin className="w-3.5 h-3.5 text-copper-500 shrink-0" />
            <span>SRIPERUMBUDUR TALUK 602015</span>
          </div>

          <span className="w-1.5 h-1.5 rounded-full bg-copper-500 shadow-[0_0_6px_#E8782E]" />

          <div className="flex items-center gap-2 text-ivory-50">
            <Layers className="w-3.5 h-3.5 text-copper-500 shrink-0" />
            <span>PASSENGER • GOODS • HEAVY HYDRAULIC</span>
          </div>

          <span className="w-1.5 h-1.5 rounded-full bg-copper-500 shadow-[0_0_6px_#E8782E]" />

          <div className="flex items-center gap-2 text-ivory-50">
            <ShieldCheck className="w-3.5 h-3.5 text-copper-500 shrink-0" />
            <span>UDYAM & GST REGISTERED</span>
          </div>
        </div>

        <a
          href="#company-intro"
          className="group inline-flex items-center gap-2 text-steel-300 hover:text-copper-400 transition-colors uppercase tracking-technical text-[11px] font-medium"
        >
          <span>Discover Architecture</span>
          <ChevronDown className="w-4 h-4 text-copper-500 transition-transform duration-200 group-hover:translate-y-0.5" />
        </a>
      </motion.div>
    </section>
  );
};
