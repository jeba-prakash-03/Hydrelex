import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Check, ShieldCheck, Wrench, RefreshCw, Cpu } from 'lucide-react';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';
import { LiftLineArtSvg } from './ui/LiftLineArtSvg';

interface ServiceItem {
  number: string;
  title: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  deliverables: string[];
}

const servicesList: ServiceItem[] = [
  {
    number: '01',
    title: 'New Installation & Turnkey Erection',
    category: 'CIVIL INTEGRATION',
    icon: Wrench,
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
    <section
      id="services"
      className="w-full bg-gradient-to-br from-ivory-50 via-steel-100/40 to-ivory-100 text-graphite-900 py-24 sm:py-32 relative overflow-hidden border-b border-graphite-700/20"
      style={{ backgroundColor: '#FBF8F2' }}
    >
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-technical-grid opacity-30 pointer-events-none" />

      {/* Oversized Outlined Numeral 03 Cropped Behind Section */}
      <div
        aria-hidden="true"
        className="absolute -top-12 right-6 sm:right-16 text-[18vw] font-heading font-black select-none pointer-events-none leading-none opacity-15"
        style={{
          WebkitTextStroke: '1.5px #B4531A',
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
              <TechnicalEyebrow variant="graphite">
                ENGINEERING & LIFECYCLE SERVICES // 03
              </TechnicalEyebrow>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-heading font-extrabold text-graphite-900 tracking-tight leading-[1.08]">
                Precision Turnkey{' '}
                <span className="text-copper-700 underline decoration-copper-500/40 underline-offset-8">
                  Execution
                </span>
                .
              </h2>
              <p className="text-base sm:text-lg text-graphite-700 font-light leading-relaxed">
                From initial civil plumb survey in Tamil Nadu to lifetime preventive maintenance, our certified vertical mobility specialists oversee full equipment integrity.
              </p>
            </div>

            {/* Scale Divider with Center Diamond */}
            <div className="scale-divider">
              <span className="diamond" />
            </div>

            {/* Hand-Drawn Architectural Shaft Cross-Section Diagram */}
            <div className="p-6 rounded-sm bg-white border border-graphite-700/20 shadow-elevated-card space-y-4">
              <div className="flex items-center justify-between font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-copper-700 border-b border-graphite-700/15 pb-3">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-copper-500 inline-block" />
                  ELEVATOR SHAFT CROSS-SECTION
                </span>
                <span className="font-mono text-xs text-graphite-700">CAD-SEC.01</span>
              </div>
              <div className="h-64 sm:h-72 w-full flex items-center justify-center p-3 bg-graphite-900 rounded-sm overflow-hidden">
                <LiftLineArtSvg
                  type="shaft-cross-section"
                  className="h-full w-auto"
                  strokeColor="#E8782E"
                />
              </div>
              <div className="text-[11px] font-mono text-graphite-600 text-center">
                *Laser-calibrated vertical plumb alignment with progressive safety gear
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/contact#consultation"
                className="group inline-flex items-center gap-3 px-8 h-12 py-3 rounded-sm bg-graphite-900 hover:bg-ink-950 text-steel-100 font-sans text-[13px] font-bold uppercase tracking-[0.12em] transition-all duration-200 shadow-elevated-card hover:shadow-copper-glow"
              >
                <span>Book Engineering Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-copper-500" />
              </Link>
            </div>
          </div>

          {/* Right Column: Numbered List (01-04) of Services with Hover Highlight (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {servicesList.map((service, idx) => {
              const isActive = activeIdx === idx;
              const IconComp = service.icon;

              return (
                <motion.div
                  key={service.number}
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`p-6 sm:p-8 rounded-sm transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? 'bg-white border-l-4 border-l-copper-500 border-t-graphite-700/20 border-r-graphite-700/20 border-b-graphite-700/20 shadow-elevated-card'
                      : 'bg-white/75 border border-graphite-700/20 hover:bg-white hover:border-l-4 hover:border-l-copper-500/70'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-copper-700">
                        [{service.number}]
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-graphite-900 flex items-center gap-2">
                        <IconComp className="w-5 h-5 text-copper-700" />
                        <span>{service.title}</span>
                      </h3>
                    </div>
                    <span className="text-[11px] font-sans font-bold tracking-[0.12em] uppercase text-copper-700 bg-copper-500/10 px-2.5 py-1 rounded-xs border border-copper-700/20 shrink-0">
                      {service.category}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-graphite-700 font-light leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Key Deliverables */}
                  <div className="pt-3 border-t border-graphite-700/15 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-graphite-900">
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-copper-700 shrink-0 mt-0.5" />
                        <span className="font-medium text-graphite-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
