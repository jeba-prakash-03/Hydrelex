import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Phone } from 'lucide-react';
import { Surface } from '../components/ui/Surface';
import { TechnicalEyebrow } from '../components/ui/TechnicalEyebrow';

export const NotFoundPage: React.FC = () => {
  return (
    <Surface
      tone="teal"
      as="section"
      className="w-full min-h-[80svh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 px-fluid relative overflow-hidden bg-gradient-to-b from-teal-700 via-teal-700 to-teal-900"
    >
      <div className="absolute inset-0 bg-technical-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl space-y-6">
        <TechnicalEyebrow variant="amber">
          HTTP 404 // ROUTE NOT FOUND
        </TechnicalEyebrow>

        <h1 className="font-heading text-[clamp(2.25rem,10vw,4.5rem)] font-black uppercase tracking-tight text-surface-heading leading-[0.96]">
          Floor Not <span className="text-amber-300">Found</span>.
        </h1>

        <p className="text-base sm:text-lg text-surface-fg font-normal leading-relaxed max-w-xl">
          The page or technical catalogue route you requested is unavailable. Return to the main architectural index or explore our engineered lift systems below.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <Link
            to="/"
            className="min-h-[52px] px-7 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors shadow-copper-glow"
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span>Return Home</span>
          </Link>

          <Link
            to="/products"
            className="min-h-[52px] px-7 rounded-sm bg-teal-900 hover:bg-ink-900 border-2 border-amber-500 text-amber-300 hover:text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors"
          >
            <span>Explore Lift Systems</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>

          <Link
            to="/contact"
            className="min-h-[52px] px-6 rounded-sm border border-[var(--border)] bg-ink-900 hover:bg-teal-900 text-surface-fg font-sans text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </Surface>
  );
};

