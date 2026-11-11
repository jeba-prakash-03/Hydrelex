import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ShieldCheck, Wrench, RefreshCw, Cpu } from 'lucide-react';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';
import { LiftLineArtSvg } from './ui/LiftLineArtSvg';
import { Surface } from './ui/Surface';

interface ServiceItem {
  number: string;
  title: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  deliverables: string[];
  accentLeftBorder: string;
  badgeBg: string;
  badgeText: string;
  iconColor: string;
}

const servicesList: ServiceItem[] = [
  {
    number: '01',
    title: 'New Installation & Turnkey Erection',
    category: 'CIVIL INTEGRATION',
    icon: Wrench,
    accentLeftBorder: 'border-l-teal-700',
    badgeBg: 'bg-teal-700',
    badgeText: 'text-ivory-50',
    iconColor: 'text-teal-700',
    description:
      'Complete mechanical and electrical erection of passenger, goods, and panoramic elevators from civil plumb survey to final commissioning.',
    deliverables: [
      'Laser-aligned vertical guide rail brackets',
      'Counterweight and traction machine assembly',
      'Dynamic balance and drop-test safety verification',
    ],
  },
  {
    number: '02',
    title: 'Preventative Maintenance & AMC Contracts',
    category: 'LIFECYCLE OPERATIONS',
    icon: ShieldCheck,
    accentLeftBorder: 'border-l-copper-500',
    badgeBg: 'bg-copper-500',
    badgeText: 'text-ink-900',
    iconColor: 'text-copper-700',
    description:
      'Scheduled preventive inspections, multi-point lubrication, and emergency breakdown attendance by factory-trained vertical transport technicians.',
    deliverables: [
      'Periodic mechanical safety gear and governor audits',
      'Landing door interlock and car gate testing',
      'Rapid emergency attendance from Sriperumbudur hub',
    ],
  },
  {
    number: '03',
    title: 'Inverter Modernization & Electrical Retrofits',
    category: 'EFFICIENCY UPGRADES',
    icon: Cpu,
    accentLeftBorder: 'border-l-amber-500',
    badgeBg: 'bg-amber-500',
    badgeText: 'text-ink-900',
    iconColor: 'text-copper-700',
    description:
      'Upgrading older relay-based or inefficient elevator drives with advanced microprocessor controllers and energy-efficient VVVF frequency inverters.',
    deliverables: [
      'Smooth S-curve acceleration and deceleration',
      'Micro-level floor leveling accuracy',
      'Reduction in operating motor thermals and energy draw',
    ],
  },
  {
    number: '04',
    title: 'Custom Engineering & Hydraulic Adaptation',
    category: 'BESPOKE FABRICATION',
    icon: RefreshCw,
    accentLeftBorder: 'border-l-teal-900',
    badgeBg: 'bg-teal-900',
    badgeText: 'text-amber-300',
    iconColor: 'text-teal-700',
    description:
      'Specialized engineering for non-standard shafts, shallow pit depth allowances, zero overhead machine room restrictions, and heavy industrial scissor mechanisms.',
    deliverables: [
      'In-house fabrication at Sriperumbudur facility',
      'Direct and indirect electro-hydraulic cylinder systems',
      'Panoramic curved and polygonal glass enclosure integration',
    ],
  },
];

export const ServicesSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  return (
    <Surface
      tone="mint"
      as="section"
      id="services"
      className="w-full py-[clamp(3rem,6vw,5rem)] lg:py-32 relative overflow-hidden border-b border-[var(--border)]"
    >
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-technical-grid-light opacity-40 pointer-events-none" />

      {/* Oversized Outlined Numeral 03 Cropped Behind Section */}
      <div
        aria-hidden="true"
        className="absolute top-4 sm:top-6 right-6 sm:right-16 text-[88px] sm:text-[130px] lg:text-[18vw] font-heading font-black select-none pointer-events-none leading-none opacity-20"
        style={{
          WebkitTextStroke: '2px #073842',
          color: 'transparent',
        }}
      >
        03
      </div>

      <div className="w-full px-fluid relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column: Sticky Heading + Architectural Line-Art Cross-Section (5 cols) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-4">
              <TechnicalEyebrow variant="copper">
                ENGINEERING & LIFECYCLE SERVICES // 03
              </TechnicalEyebrow>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-heading font-extrabold text-surface-heading tracking-tight leading-[1.08]">
                Precision Turnkey{' '}
                <span className="text-copper-700 underline decoration-copper-500/50 underline-offset-8">
                  Execution
                </span>
                .
              </h2>
              <p className="text-base sm:text-lg text-surface-fg font-normal leading-relaxed">
                From initial civil plumb survey in Tamil Nadu to lifetime preventive maintenance, our certified vertical mobility specialists oversee full equipment integrity.
              </p>
            </div>

            {/* Scale Divider with Center Diamond */}
            <div className="scale-divider">
              <span className="diamond" />
            </div>

            {/* Hand-Drawn Architectural Shaft Cross-Section Diagram */}
            <Surface tone="light" as="div" className="p-6 rounded-sm border border-[var(--border)] shadow-elevated-card space-y-4">
              <div className="flex items-center justify-between font-sans text-xs lg:text-[11px] font-bold uppercase tracking-[0.14em] text-copper-700 border-b border-[var(--border)] pb-3">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-copper-500 inline-block" />
                  ELEVATOR SHAFT CROSS-SECTION
                </span>
                <span className="font-mono text-xs text-surface-fg font-bold">CAD-SEC.01</span>
              </div>
              <div className="h-64 sm:h-72 w-full flex items-center justify-center p-3 bg-teal-900 rounded-sm overflow-hidden">
                <LiftLineArtSvg
                  type="shaft-cross-section"
                  className="h-full w-auto"
                  strokeColor="#F6B93B"
                />
              </div>
              <div className="text-xs lg:text-[11px] font-mono text-surface-muted font-medium text-center">
                *Laser-calibrated vertical plumb alignment with progressive safety gear
              </div>
            </Surface>

            <div className="pt-2">
              <Link
                to="/contact#consultation"
                className="group inline-flex items-center gap-3 px-8 h-12 py-3 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 font-sans text-[13px] font-bold uppercase tracking-[0.12em] transition-all duration-200 shadow-md hover:shadow-copper-glow"
              >
                <span>Book Engineering Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Numbered List (01-04) of Services with Color Left Bars & Badges (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {servicesList.map((service, idx) => {
              const isActive = activeIdx === idx;
              const IconComp = service.icon;

              return (
                <motion.div
                  key={service.number}
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05, margin: '0px 0px -10% 0px' }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  onMouseEnter={() => setActiveIdx(idx)}
                >
                  <Surface
                    tone="light"
                    as="div"
                    className={`p-6 sm:p-8 rounded-sm transition-all duration-300 border border-[var(--border)] border-l-[6px] ${service.accentLeftBorder} cursor-pointer ${
                      isActive ? 'shadow-elevated-card bg-white' : 'bg-white/95 hover:bg-white shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`font-mono text-xs font-extrabold px-2.5 py-1 rounded-xs shrink-0 ${service.badgeBg} ${service.badgeText}`}
                        >
                          {service.number}
                        </span>
                        <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-surface-heading flex items-center gap-2.5">
                          <IconComp className={`w-5 h-5 shrink-0 ${service.iconColor}`} />
                          <span>{service.title}</span>
                        </h3>
                      </div>
                      <span className="text-xs lg:text-[11px] font-sans font-bold tracking-[0.12em] uppercase text-surface-accent bg-sand-100 px-3 py-1 rounded-xs border border-sand-200 shrink-0 w-fit">
                        {service.category}
                      </span>
                    </div>

                    <p className="text-base text-surface-fg font-normal leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Key Deliverables */}
                    <div className="pt-3 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-sans">
                      {service.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${service.iconColor}`} />
                          <span className="font-semibold text-surface-fg">{item}</span>
                        </div>
                      ))}
                    </div>
                  </Surface>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Surface>
  );
};
