import React from 'react';
import { ServicesSection } from '../components/ServicesSection';
import { CTASection } from '../components/CTASection';
import { ShieldCheck, Clock, Wrench, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServicesPage: React.FC = () => {
  return (
    <div className="w-full bg-arch-ivory text-arch-graphite overflow-x-hidden">
      {/* Header Banner (Full Width) */}
      <section className="w-full bg-arch-black text-white pt-36 pb-20 relative overflow-hidden border-b border-arch-steel/30">
        <div className="absolute inset-0 bg-blueprint-grid opacity-15" />
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10 space-y-4">
          <span className="text-[10px] font-mono tracking-ultra-wide uppercase text-arch-champagne font-semibold block">
            ENGINEERING & LIFECYCLE SUPPORT
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[1.02]">
            Lift Engineering & Servicing
          </h1>
          <p className="text-base sm:text-xl text-arch-sand/80 max-w-3xl font-light leading-relaxed">
            Turnkey erection, preventive scheduled maintenance, modernization retrofits, and diagnostic breakdown servicing by certified vertical mobility technicians.
          </p>
        </div>
      </section>

      <ServicesSection />

      {/* Protocol Section (Full Width) */}
      <section className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-24 sm:py-32 bg-white border-b border-arch-ivoryBorder">
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="text-xs font-mono tracking-ultra-wide uppercase text-arch-copper font-semibold block">
            METHODOLOGY
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-arch-black tracking-tight">
            Turnkey Execution Protocol
          </h2>
          <p className="text-base text-arch-slate font-light leading-relaxed">
            From initial civil plumb analysis to final commissioning load tests, our engineers execute every step under strict compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-8 rounded-sm bg-arch-ivory border border-arch-ivoryBorder space-y-4">
            <span className="font-mono text-3xl font-extrabold text-arch-copper">01</span>
            <h3 className="font-heading text-lg font-bold text-arch-black">Site Survey & Load Study</h3>
            <p className="text-xs sm:text-sm text-arch-slate font-light leading-relaxed">
              Assessment of civil shaft dimensions, beam structural calculations, pit depth conditions, and power supply lines.
            </p>
          </div>

          <div className="p-8 rounded-sm bg-arch-ivory border border-arch-ivoryBorder space-y-4">
            <span className="font-mono text-3xl font-extrabold text-arch-copper">02</span>
            <h3 className="font-heading text-lg font-bold text-arch-black">Precision Fabrication</h3>
            <p className="text-xs sm:text-sm text-arch-slate font-light leading-relaxed">
              Manufacturing of custom structural frames, guide rail brackets, and hydraulic cylinder power units to site specs.
            </p>
          </div>

          <div className="p-8 rounded-sm bg-arch-ivory border border-arch-ivoryBorder space-y-4">
            <span className="font-mono text-3xl font-extrabold text-arch-copper">03</span>
            <h3 className="font-heading text-lg font-bold text-arch-black">Erection & Commissioning</h3>
            <p className="text-xs sm:text-sm text-arch-slate font-light leading-relaxed">
              Laser plumb alignment, counterweight carriage assembly, VVVF controller tuning, and certified full load drop safety tests.
            </p>
          </div>

          <div className="p-8 rounded-sm bg-arch-ivory border border-arch-ivoryBorder space-y-4">
            <span className="font-mono text-3xl font-extrabold text-arch-copper">04</span>
            <h3 className="font-heading text-lg font-bold text-arch-black">Lifecycle Maintenance</h3>
            <p className="text-xs sm:text-sm text-arch-slate font-light leading-relaxed">
              Routine lubrication, safety switch inspections, brake adjustment, and 24/7 priority emergency attendance.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
