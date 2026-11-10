import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ProductsSection } from '../components/ProductsSection';
import { SpecTable } from '../components/ui/SpecTable';
import { TechnicalEyebrow } from '../components/ui/TechnicalEyebrow';
import { CTASection } from '../components/CTASection';

export const ProductsPage: React.FC = () => {
  return (
    <div className="w-full bg-graphite-900 text-steel-100 overflow-x-hidden">
      {/* 1. Full-Width Dark Header */}
      <section
        className="w-full bg-ink-950 text-steel-100 pt-36 pb-20 relative overflow-hidden border-b border-graphite-700"
        style={{ backgroundColor: '#0A0A0B' }}
      >
        <div className="w-full px-fluid relative z-10 space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-sans text-xs text-steel-300">
            <Link to="/" className="hover:text-copper-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-steel-300/50" />
            <span className="text-copper-500 font-semibold">Systems Catalogue</span>
          </div>

          <TechnicalEyebrow variant="copper">
            EQUIPMENT & VERTICAL MOBILITY CATALOGUE
          </TechnicalEyebrow>

          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-heading font-black tracking-tight text-steel-100 uppercase leading-[1.02]">
            Lift & Elevator <span className="text-copper-500">Systems</span>
          </h1>

          <p className="text-base sm:text-xl text-steel-300 max-w-3xl font-light leading-relaxed">
            Engineered systems from luxury passenger elevators to high-capacity industrial freight lifts and precision electro-hydraulic scissor platforms.
          </p>
        </div>
      </section>

      {/* 2. All 6 Systems Visual Showcase */}
      <ProductsSection showTitle={false} />

      {/* 3. Comprehensive Specifications Matrix */}
      <section
        className="w-full bg-ink-950 text-steel-100 py-24 border-t border-graphite-700"
        style={{ backgroundColor: '#0A0A0B' }}
      >
        <div className="w-full px-fluid">
          <SpecTable themeMode="dark" />
        </div>
      </section>

      <CTASection />
    </div>
  );
};
