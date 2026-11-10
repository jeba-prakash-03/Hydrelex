import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ProductsSection } from '../components/ProductsSection';
import { SpecTable } from '../components/ui/SpecTable';
import { TechnicalEyebrow } from '../components/ui/TechnicalEyebrow';
import { CTASection } from '../components/CTASection';

export const ProductsPage: React.FC = () => {
  return (
    <div className="w-full bg-graphite-800 text-ivory-100 overflow-x-hidden">
      {/* 1. Full-Width Dark Header (Guarantees Nav Legibility) */}
      <section
        className="w-full bg-ink-900 text-ivory-100 pt-36 pb-20 relative overflow-hidden border-b border-graphite-600/60"
        style={{ backgroundColor: '#0E0E0F' }}
      >
        <div className="w-full px-fluid relative z-10 space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mono text-xs text-silver-400">
            <Link to="/" className="hover:text-champagne-500 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-silver-400/50" />
            <span className="text-champagne-500">Systems Catalogue</span>
          </div>

          <TechnicalEyebrow variant="champagne">
            EQUIPMENT & VERTICAL MOBILITY CATALOGUE
          </TechnicalEyebrow>

          <h1 className="font-h2-clamp font-extrabold tracking-tight uppercase leading-[1.02]">
            Lift & Elevator Systems
          </h1>

          <p className="text-base sm:text-xl text-silver-400 max-w-3xl font-light leading-relaxed">
            Engineered systems from luxury passenger elevators to high-capacity industrial freight lifts and precision electro-hydraulic scissor platforms.
          </p>
        </div>
      </section>

      {/* 2. All 6 Systems Visual Showcase */}
      <ProductsSection showTitle={false} />

      {/* 3. Comprehensive Specifications Matrix */}
      <section
        className="w-full bg-ink-900 text-ivory-100 py-24 border-t border-graphite-600/60"
        style={{ backgroundColor: '#0E0E0F' }}
      >
        <div className="w-full px-fluid">
          <SpecTable themeMode="dark" />
        </div>
      </section>

      <CTASection />
    </div>
  );
};
