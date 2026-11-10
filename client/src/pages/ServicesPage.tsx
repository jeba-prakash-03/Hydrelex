import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ServicesSection } from '../components/ServicesSection';
import { TechnicalEyebrow } from '../components/ui/TechnicalEyebrow';
import { CTASection } from '../components/CTASection';

export const ServicesPage: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-br from-ivory-50 via-steel-100/40 to-ivory-100 text-graphite-900 overflow-x-hidden">
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
            <span className="text-copper-500 font-semibold">Engineering & Services</span>
          </div>

          <TechnicalEyebrow variant="copper">
            ENGINEERING & LIFECYCLE SUPPORT
          </TechnicalEyebrow>

          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-heading font-black tracking-tight text-steel-100 uppercase leading-[1.02]">
            Lift Engineering & <span className="text-copper-500">Servicing</span>
          </h1>

          <p className="text-base sm:text-xl text-steel-300 max-w-3xl font-light leading-relaxed">
            Turnkey erection, scheduled preventative maintenance contracts, VVVF modernization retrofits, and bespoke hydraulic engineering by certified mobility technicians.
          </p>
        </div>
      </section>

      {/* 2. Services List & Shaft Blueprint */}
      <ServicesSection />

      {/* 3. Turnkey Execution Protocol */}
      <section className="w-full px-fluid py-24 sm:py-32 bg-white border-b border-graphite-700/20">
        <div className="max-w-3xl mb-16 space-y-3">
          <TechnicalEyebrow variant="graphite">
            TURNKEY PROTOCOL
          </TechnicalEyebrow>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-graphite-900 tracking-tight">
            Execution <span className="text-copper-700">Protocol</span>
          </h2>
          <p className="text-base text-graphite-700 font-light leading-relaxed">
            From initial civil plumb survey in Tamil Nadu to final commissioning drop tests, our engineers execute every step under strict compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-8 rounded-sm bg-ivory-50 border border-graphite-700/20 border-t-2 border-t-copper-500 space-y-4 shadow-elevated-card hover:shadow-copper-glow transition-all duration-300">
            <span className="font-mono text-3xl font-extrabold text-copper-700">01</span>
            <h3 className="font-heading text-lg font-bold text-graphite-900">Site Survey & Load Study</h3>
            <p className="text-xs sm:text-sm text-graphite-700 font-light leading-relaxed">
              Assessment of civil shaft dimensions, beam structural calculations, pit depth conditions, and power supply lines.
            </p>
          </div>

          <div className="p-8 rounded-sm bg-ivory-50 border border-graphite-700/20 border-t-2 border-t-copper-500 space-y-4 shadow-elevated-card hover:shadow-copper-glow transition-all duration-300">
            <span className="font-mono text-3xl font-extrabold text-copper-700">02</span>
            <h3 className="font-heading text-lg font-bold text-graphite-900">Precision Fabrication</h3>
            <p className="text-xs sm:text-sm text-graphite-700 font-light leading-relaxed">
              Manufacturing of custom structural frames, guide rail brackets, and hydraulic cylinder power units to site specs in Sriperumbudur.
            </p>
          </div>

          <div className="p-8 rounded-sm bg-ivory-50 border border-graphite-700/20 border-t-2 border-t-copper-500 space-y-4 shadow-elevated-card hover:shadow-copper-glow transition-all duration-300">
            <span className="font-mono text-3xl font-extrabold text-copper-700">03</span>
            <h3 className="font-heading text-lg font-bold text-graphite-900">Erection & Commissioning</h3>
            <p className="text-xs sm:text-sm text-graphite-700 font-light leading-relaxed">
              Laser plumb alignment, counterweight carriage assembly, VVVF controller tuning, and certified full load safety tests.
            </p>
          </div>

          <div className="p-8 rounded-sm bg-ivory-50 border border-graphite-700/20 border-t-2 border-t-copper-500 space-y-4 shadow-elevated-card hover:shadow-copper-glow transition-all duration-300">
            <span className="font-mono text-3xl font-extrabold text-copper-700">04</span>
            <h3 className="font-heading text-lg font-bold text-graphite-900">Lifecycle Maintenance</h3>
            <p className="text-xs sm:text-sm text-graphite-700 font-light leading-relaxed">
              Routine lubrication, safety switch inspections, brake adjustment, and 24/7 priority emergency attendance from our regional base.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
