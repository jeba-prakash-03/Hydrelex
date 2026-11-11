import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ProductsSection } from '../components/ProductsSection';
import { SpecTable } from '../components/ui/SpecTable';
import { TechnicalEyebrow } from '../components/ui/TechnicalEyebrow';
import { CTASection } from '../components/CTASection';
import { Surface } from '../components/ui/Surface';

export const ProductsPage: React.FC = () => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. Full-Width Copper Header Band */}
      <Surface
        tone="copper"
        as="section"
        className="w-full pt-28 pb-12 lg:pt-36 lg:pb-20 relative overflow-hidden border-b border-ink-900/20 bg-gradient-to-br from-copper-500 via-copper-500 to-amber-500"
      >
        <div className="w-full px-fluid relative z-10 space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-sans text-xs text-surface-fg font-semibold">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-surface-fg" />
            <span className="bg-ink-900 text-amber-300 px-2.5 py-0.5 rounded-xs font-bold">
              Systems Catalogue
            </span>
          </div>

          <TechnicalEyebrow variant="graphite">
            EQUIPMENT & VERTICAL MOBILITY CATALOGUE
          </TechnicalEyebrow>

          <h1 className="text-[clamp(1.85rem,7.5vw,2.75rem)] lg:text-[56px] font-heading font-black tracking-tight text-surface-heading uppercase leading-[1.02]">
            Lift & Elevator{' '}
            <span className="inline-block bg-ink-900 text-amber-400 px-3 py-0.5 rounded-xs">
              Systems
            </span>
          </h1>

          <p className="text-base sm:text-xl text-surface-fg max-w-3xl font-medium leading-relaxed">
            Engineered systems from luxury passenger elevators to high-capacity industrial freight lifts and precision electro-hydraulic scissor platforms.
          </p>
        </div>
      </Surface>

      {/* 2. All 6 Systems Visual Showcase (Color-blocked dark background with 6 different colored tiles) */}
      <ProductsSection showTitle={false} />

      {/* 3. Comprehensive Specifications Matrix */}
      <Surface tone="teal" as="section" className="w-full py-[clamp(3rem,6vw,5rem)] lg:py-24 border-t border-[var(--border)]">
        <div className="w-full px-fluid">
          <SpecTable themeMode="dark" />
        </div>
      </Surface>

      <CTASection />
    </div>
  );
};
