import React from 'react';
import { ProductsSection } from '../components/ProductsSection';
import { CTASection } from '../components/CTASection';

export const ProductsPage: React.FC = () => {
  return (
    <div className="w-full bg-arch-black text-white overflow-x-hidden">
      {/* Header Banner (Full Width) */}
      <section className="w-full bg-arch-black text-white pt-36 pb-20 relative overflow-hidden border-b border-arch-steel/30">
        <div className="absolute inset-0 bg-blueprint-grid opacity-15" />
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10 space-y-4">
          <span className="text-[10px] font-mono tracking-ultra-wide uppercase text-arch-champagne font-semibold block">
            EQUIPMENT & VERTICAL MOBILITY CATALOGUE
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[1.02]">
            Lift & Elevator Systems
          </h1>
          <p className="text-base sm:text-xl text-arch-sand/80 max-w-3xl font-light leading-relaxed">
            Engineered solutions from passenger and executive elevators to heavy industrial freight lifts and precision hydraulic scissor platforms.
          </p>
        </div>
      </section>

      <ProductsSection showTitle={false} />

      <CTASection />
    </div>
  );
};
