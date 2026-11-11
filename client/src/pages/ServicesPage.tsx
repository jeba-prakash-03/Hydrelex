import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ServicesSection } from '../components/ServicesSection';
import { TechnicalEyebrow } from '../components/ui/TechnicalEyebrow';
import { CTASection } from '../components/CTASection';
import { Surface } from '../components/ui/Surface';

export const ServicesPage: React.FC = () => {
  const protocolSteps = [
    {
      num: '01',
      title: 'Site Survey & Load Study',
      desc: 'Assessment of civil shaft dimensions, beam structural calculations, pit depth conditions, and power supply lines.',
      leftBorder: 'border-l-teal-700',
      badgeClass: 'bg-teal-700 text-ivory-50',
    },
    {
      num: '02',
      title: 'Precision Fabrication',
      desc: 'Manufacturing of custom structural frames, guide rail brackets, and hydraulic cylinder power units to site specs in Sriperumbudur.',
      leftBorder: 'border-l-copper-500',
      badgeClass: 'bg-copper-500 text-ink-950',
    },
    {
      num: '03',
      title: 'Installation & Commissioning',
      desc: 'Rigorous mechanical erection, VVVF wiring calibration, emergency interlock certification, and comprehensive load testing.',
      leftBorder: 'border-l-amber-500',
      badgeClass: 'bg-amber-500 text-ink-950',
    },
    {
      num: '04',
      title: 'Lifecycle Maintenance',
      desc: 'Routine lubrication, safety switch inspections, brake adjustment, and 24/7 priority emergency attendance from our regional base.',
      leftBorder: 'border-l-teal-900',
      badgeClass: 'bg-teal-900 text-amber-300',
    },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. Full-Width Warm Sand Header Band */}
      <Surface
        tone="sand"
        as="section"
        className="w-full pt-28 pb-12 lg:pt-36 lg:pb-20 relative overflow-hidden border-b border-sand-200"
      >
        <div className="w-full px-fluid relative z-10 space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-sans text-xs text-surface-fg font-semibold">
            <Link to="/" className="hover:text-copper-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-surface-muted" />
            <span className="bg-teal-700 text-ivory-50 px-2.5 py-0.5 rounded-xs font-bold">
              Engineering & Services
            </span>
          </div>

          <TechnicalEyebrow variant="copper">
            ENGINEERING & LIFECYCLE SUPPORT
          </TechnicalEyebrow>

          <h1 className="text-[clamp(1.85rem,7.5vw,2.75rem)] lg:text-[56px] font-heading font-black tracking-tight text-surface-heading uppercase leading-[1.02]">
            Lift Engineering &{' '}
            <span className="text-copper-700 underline decoration-copper-500/40 underline-offset-8">
              Servicing
            </span>
          </h1>

          <p className="text-base sm:text-xl text-surface-fg max-w-3xl font-normal leading-relaxed">
            Turnkey erection, scheduled preventative maintenance contracts, VVVF modernization retrofits, and bespoke hydraulic engineering by certified mobility technicians.
          </p>
        </div>
      </Surface>

      {/* 2. Services List & Shaft Blueprint (Mint Tint) */}
      <ServicesSection />

      {/* 3. Turnkey Execution Protocol (Peach Tint with Color-Badged Cards) */}
      <Surface tone="peach" as="section" className="w-full px-fluid py-[clamp(3rem,6vw,5rem)] lg:py-32 border-b border-[var(--border)]">
        <div className="max-w-3xl mb-16 space-y-3">
          <TechnicalEyebrow variant="copper">
            TURNKEY PROTOCOL
          </TechnicalEyebrow>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-surface-heading tracking-tight">
            Execution <span className="text-copper-700">Protocol</span>
          </h2>
          <p className="text-base text-surface-fg font-normal leading-relaxed">
            From initial civil plumb survey in Tamil Nadu to final commissioning drop tests, our engineers execute every step under strict compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {protocolSteps.map((step) => (
            <Surface
              key={step.num}
              tone="light"
              as="div"
              className={`p-8 rounded-sm border border-[var(--border)] border-l-[6px] ${step.leftBorder} space-y-4 shadow-elevated-card hover:-translate-y-1 transition-all duration-300`}
            >
              <span className={`inline-block font-mono text-lg font-extrabold px-3 py-1 rounded-xs ${step.badgeClass}`}>
                {step.num}
              </span>
              <h3 className="font-heading text-lg font-bold text-surface-heading">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-surface-fg font-normal leading-relaxed">
                {step.desc}
              </p>
            </Surface>
          ))}
        </div>
      </Surface>

      <CTASection />
    </div>
  );
};
