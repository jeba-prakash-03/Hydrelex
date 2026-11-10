import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';
import { LiftLineArtSvg } from './ui/LiftLineArtSvg';

export const Hero: React.FC = () => {
  return (
    <section
      className="relative w-full min-h-[100svh] bg-ink-900 text-ivory-100 flex flex-col justify-between pt-32 sm:pt-36 pb-10 overflow-hidden"
      style={{ backgroundColor: '#0E0E0F' }}
    >
      {/* Full-Bleed Photographic Composition Background with Fallback */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Background Visual Canvas with Slow Mount Zoom (1.08 -> 1) */}
        <motion.div
          initial={{ scale: 1.08, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full relative"
        >
          {/* Deliberate Architectural Line-Art Shaft Silhouette Canvas */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 flex items-center justify-end p-8 lg:p-16 opacity-30">
            <LiftLineArtSvg
              type="shaft-cross-section"
              className="h-[80%] max-h-[700px] w-auto"
              strokeColor="#B08D57"
            />
          </div>

          {/* Heavy Architectural Dark Gradient Overlays (Guarantees WCAG AA Contrast) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(14, 14, 15, 0.4) 0%, rgba(14, 14, 15, 0.95) 100%)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-ink-900/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/90 to-transparent" />
        </motion.div>
      </div>

      {/* Main Full-Width Editorial Content (Mount-Animated) */}
      <div className="relative z-10 w-full px-fluid my-auto">
        <div className="max-w-5xl space-y-8">
          {/* 1. Technical Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <TechnicalEyebrow variant="champagne">
              VERTICAL MOBILITY ENGINEERING — SRIPERUMBUDUR
            </TechnicalEyebrow>
          </motion.div>

          {/* 2. Editorial Headline on Two Lines */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-hero-clamp font-extrabold uppercase text-ivory-100 tracking-tight leading-[0.96]"
            >
              <span>THE ART OF</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ivory-100 via-silver-400 to-champagne-500">
                VERTICAL MOVEMENT.
              </span>
            </motion.h1>
          </div>

          {/* 3. Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-xl text-silver-400 font-light max-w-2xl leading-relaxed font-sans"
          >
            Engineering lift solutions that connect spaces, people and possibilities.
          </motion.p>

          {/* 4. Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <Link
              to="/products"
              className="group inline-flex items-center justify-center gap-3 px-8 h-14 rounded-sm bg-champagne-500 hover:bg-champagne-600 text-ink-900 font-mono text-xs font-bold uppercase tracking-technical transition-all duration-200 active:scale-[0.98] shadow-sm"
            >
              <span>Explore Our Systems</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <a
              href="#consultation"
              className="inline-flex items-center justify-center gap-2.5 px-8 h-14 rounded-sm border border-silver-400/60 hover:border-champagne-500 text-ivory-100 hover:text-champagne-500 font-mono text-xs font-bold uppercase tracking-technical transition-all duration-200 active:scale-[0.98]"
            >
              <span>Request a Consultation</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Cue at Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 w-full px-fluid pt-8 flex items-center justify-between text-xs font-mono text-silver-400/70 border-t border-graphite-600/40"
      >
        <div className="flex items-center gap-4 text-[11px] uppercase tracking-wider">
          <span className="text-champagne-500 font-medium">SRIPERUMBUDUR HUB</span>
          <span className="hidden sm:inline text-graphite-600">•</span>
          <span className="hidden sm:inline">TAMIL NADU 602015</span>
        </div>

        <a
          href="#company-intro"
          className="group inline-flex items-center gap-2 text-silver-400 hover:text-champagne-500 transition-colors uppercase tracking-technical text-[11px]"
        >
          <span>Discover Architecture</span>
          <ChevronDown className="w-4 h-4 text-champagne-500 transition-transform duration-200 group-hover:translate-y-0.5" />
        </a>
      </motion.div>
    </section>
  );
};
