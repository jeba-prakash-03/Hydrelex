import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ServicesSection } from '../components/ServicesSection';
import { TechnicalEyebrow } from '../components/ui/TechnicalEyebrow';
import { CTASection } from '../components/CTASection';

export const ServicesPage: React.FC = () => {
  return (
    <div className="w-full bg-ivory-100 text-graphite-800 overflow-x-hidden">
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
            <span className="text-champagne-500">Engineering & Services</span>
          </div>

          <TechnicalEyebrow variant="champagne">
            ENGINEERING & LIFECYCLE SUPPORT
          </TechnicalEyebrow>

          <h1 className="font-h2-clamp font-extrabold tracking-tight uppercase leading-[1.02]">
            Lift Engineering & Servicing
          </h1>

          <p className="text-base sm:text-xl text-silver-400 max-w-3xl font-light leading-relaxed">
            Turnkey erection, scheduled preventative maintenance contracts, VVVF modernization retrofits, and bespoke hydraulic engineering by certified mobility technicians.
          </p>
        </div>
      </section>

      {/* 2. Services List & Shaft Blueprint */}
      <ServicesSection />

      {/* 3. Turnkey Execution Protocol */}
      <section className="w-full px-fluid py-24 sm:py-32 bg-white border-b border-graphite-600/20">
        <div className="max-w-3xl mb-16 space-y-3">
          <TechnicalEyebrow variant="graphite">
            TURNKEY PROTOCOL
          </TechnicalEyebrow>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-graphite-800 tracking-tight">
            Execution Protocol
          </h2>
          <p className="text-base text-graphite-600 font-light leading-relaxed">
            From initial civil plumb survey in Tamil Nadu to final commissioning drop tests, our engineers execute every step under strict compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-8 rounded-sm bg-ivory-50 border border-graphite-600/20 space-y-4 shadow-sm">
            <span className="font-mono text-3xl font-extrabold text-champagne-600">01</span>
            <h3 className="font-heading text-lg font-bold text-graphite-800">Site Survey & Load Study</h3>
            <p className="text-xs sm:text-sm text-graphite-600 font-light leading-relaxed">
              Assessment of civil shaft dimensions, beam structural calculations, pit depth conditions, and power supply lines.
            </p>
          </div>

          <div className="p-8 rounded-sm bg-ivory-50 border border-graphite-600/20 space-y-4 shadow-sm">
            <span className="font-mono text-3xl font-extrabold text-champagne-600">02</span>
            <h3 className="font-heading text-lg font-bold text-graphite-800">Precision Fabrication</h3>
            <p className="text-xs sm:text-sm text-graphite-600 font-light leading-relaxed">
              Manufacturing of custom structural frames, guide rail brackets, and hydraulic cylinder power units to site specs in Sriperumbudur.
            </p>
          </div>

          <div className="p-8 rounded-sm bg-ivory-50 border border-graphite-600/20 space-y-4 shadow-sm">
            <span className="font-mono text-3xl font-extrabold text-champagne-600">03</span>
            <h3 className="font-heading text-lg font-bold text-graphite-800">Erection & Commissioning</h3>
            <p className="text-xs sm:text-sm text-graphite-600 font-light leading-relaxed">
              Laser plumb alignment, counterweight carriage assembly, VVVF controller tuning, and certified full load safety tests.
            </p>
          </div>

          <div className="p-8 rounded-sm bg-ivory-50 border border-graphite-600/20 space-y-4 shadow-sm">
            <span className="font-mono text-3xl font-extrabold text-champagne-600">04</span>
            <h3 className="font-heading text-lg font-bold text-graphite-800">Lifecycle Maintenance</h3>
            <p className="text-xs sm:text-sm text-graphite-600 font-light leading-relaxed">
              Routine lubrication, safety switch inspections, brake adjustment, and 24/7 priority emergency attendance from our regional base.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
