import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Layers,
  ChevronDown,
  Compass,
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export const Hero: React.FC = () => {
  const { settings } = useSettings();

  return (
    <section className="relative min-h-screen w-full bg-arch-black text-white overflow-hidden flex flex-col justify-between pt-32 sm:pt-36 pb-12">
      {/* Full-Bleed Architectural Elevator Photography Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=2560&q=85"
          alt="Architectural Vertical Elevator Shaft and Precision Glass Lift Engineering"
          className="w-full h-full object-cover object-center opacity-35 scale-105 transform motion-safe:animate-pulse [animation-duration:14s]"
        />
        {/* Architectural Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-arch-black/95 via-arch-black/75 to-arch-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-arch-black via-transparent to-arch-black/70" />
        <div className="absolute inset-0 bg-blueprint-grid opacity-15" />

        {/* Vertical Engineering Coordinate Line */}
        <div className="hidden xl:block absolute left-24 top-0 bottom-0 w-[1px] bg-white/10">
          <motion.div
            animate={{ y: ['0vh', '80vh', '0vh'] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-24 bg-gradient-to-b from-transparent via-arch-champagne to-transparent shadow-champagne-glow"
          />
        </div>
      </div>

      {/* Main Full-Width Editorial Grid */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-end">
          {/* Headline & Manifesto (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Technical Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 text-xs font-mono tracking-ultra-wide uppercase text-arch-champagne"
            >
              <span className="w-2 h-2 rounded-full bg-arch-champagne" />
              <span>EST. SRIPERUMBUDUR // VERTICAL MOBILITY ENGINEERING</span>
            </motion.div>

            {/* Editorial Headline: THE ART OF VERTICAL MOVEMENT. */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-extrabold tracking-tight text-white uppercase text-4xl sm:text-6xl md:text-7xl xl:text-8xl 2xl:text-9xl leading-[0.98]"
            >
              THE ART OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-arch-bone via-arch-sand to-arch-champagne">
                VERTICAL MOVEMENT.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-xl text-arch-sand/90 max-w-2xl font-light leading-relaxed font-sans"
            >
              Engineering lift solutions that connect spaces, people and possibilities.
            </motion.p>

            {/* Architectural Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-sm bg-arch-champagne text-arch-black font-mono text-xs font-bold uppercase tracking-architectural hover:bg-arch-champagneLight transition-all duration-300 shadow-sm"
              >
                <span>Explore Our Solutions</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>

              <Link
                to="/contact#consultation"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-sm bg-arch-charcoal/60 hover:bg-arch-charcoal text-arch-bone font-mono text-xs font-medium uppercase tracking-architectural border border-arch-steel/70 backdrop-blur-md transition-all duration-300"
              >
                <span>Request a Consultation</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Restrained Engineering Metrics (4 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="lg:col-span-4 space-y-4"
          >
            <div className="p-6 sm:p-8 rounded-sm bg-arch-graphite/70 border border-arch-steel/60 backdrop-blur-xl shadow-architectural-dark space-y-6">
              <div className="flex items-center justify-between text-xs font-mono text-arch-champagne border-b border-arch-steel/50 pb-3">
                <span className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5" />
                  SPECIFICATION DIRECTIVE
                </span>
                <span className="text-white/40">SRIPERUMBUDUR</span>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-start justify-between">
                  <span className="text-arch-slate">CORE SYSTEMS:</span>
                  <span className="text-arch-bone text-right font-medium">Passenger • Goods • Hydraulic</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-arch-slate">MAX LOAD RATING:</span>
                  <span className="text-arch-bone text-right font-medium">Configurable up to 20,000 kg</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-arch-slate">SAFETY ARD:</span>
                  <span className="text-arch-champagne text-right font-semibold">Standard Integrated Automatic Rescue</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-arch-slate">STANDARDS:</span>
                  <span className="text-arch-bone text-right font-medium">UDYAM & GST Registered</span>
                </div>
              </div>

              <div className="pt-2 border-t border-arch-steel/50 flex items-center justify-between text-[11px] font-mono text-arch-sand/70">
                <span>PLANT CODE: 602015</span>
                <span className="text-arch-champagne font-semibold">100% RELIABILITY</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar: Engineering Coordinates & Scroll Cue (Full Width) */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 pt-8 border-t border-arch-steel/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-arch-slate">
        <div className="flex items-center gap-6">
          <span>LAT 13.0125° N</span>
          <span>•</span>
          <span>LON 79.9482° E</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">TAMIL NADU INDUSTRIAL CORRIDOR</span>
        </div>

        <a
          href="#company-intro"
          className="flex items-center gap-2 text-arch-sand hover:text-arch-champagne transition-colors"
        >
          <span className="tracking-architectural uppercase text-[11px]">DISCOVER ARCHITECTURE</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-arch-champagne" />
        </a>
      </div>
    </section>
  );
};
