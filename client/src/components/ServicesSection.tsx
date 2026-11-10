import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Check } from 'lucide-react';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';
import { LiftLineArtSvg } from './ui/LiftLineArtSvg';

interface ServiceItem {
  number: string;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
}

const servicesList: ServiceItem[] = [
  {
    number: '01',
    title: 'New Installation & Turnkey Erection',
    category: 'CIVIL INTEGRATION',
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
      className="w-full bg-ivory-100 text-graphite-800 py-24 sm:py-32 relative overflow-hidden border-b border-graphite-600/20"
      style={{ backgroundColor: '#F4EFE6' }}
    >
      <div className="w-full px-fluid relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column: Sticky Heading + Large Architectural Line-Art Cross-Section (5 cols) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-3">
              <TechnicalEyebrow variant="graphite">
                ENGINEERING & LIFECYCLE SERVICES // 03
              </TechnicalEyebrow>
              <h2 className="font-h2-clamp font-extrabold text-graphite-800 tracking-tight leading-[1.08]">
                Precision Turnkey Execution.
              </h2>
              <p className="text-base sm:text-lg text-graphite-600 font-light leading-relaxed">
                From initial civil plumb survey in Tamil Nadu to lifetime preventive maintenance, our certified vertical mobility specialists oversee full equipment integrity.
              </p>
            </div>

            {/* Hand-Drawn Architectural Shaft Cross-Section Diagram */}
            <div className="p-6 rounded-sm bg-white border border-graphite-600/25 shadow-sm space-y-4">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-technical text-champagne-600 border-b border-graphite-600/20 pb-3">
                <span>ELEVATOR SHAFT CROSS-SECTION</span>
                <span>FIG 01.A</span>
              </div>
              <div className="h-64 sm:h-72 w-full flex items-center justify-center p-2 bg-ivory-50 rounded-sm">
                <LiftLineArtSvg
                  type="shaft-cross-section"
                  className="h-full w-auto"
                  strokeColor="#8F7144"
                />
              </div>
              <div className="text-[11px] font-mono text-graphite-600 text-center">
                *Laser-calibrated vertical plumb alignment with progressive safety gear
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#consultation"
                className="inline-flex items-center gap-3 px-8 h-13 py-3.5 rounded-sm bg-graphite-800 hover:bg-ink-900 text-ivory-100 font-mono text-xs font-bold uppercase tracking-technical transition-all duration-200 shadow-sm"
              >
                <span>Book Engineering Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Numbered List (01-04) of Services with Hover Highlight (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {servicesList.map((service, idx) => {
              const isActive = activeIdx === idx;
              return (
                <motion.div
                  key={service.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`p-6 sm:p-8 rounded-sm transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? 'bg-white border-champagne-600 shadow-xl'
                      : 'bg-white/70 border-graphite-600/25 hover:bg-white hover:border-champagne-600/50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-champagne-600 tracking-technical">
                        [{service.number}]
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-graphite-800">
                        {service.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono tracking-technical uppercase text-graphite-600 bg-ivory-50 px-2 py-0.5 rounded-sm border border-graphite-600/20 shrink-0">
                      {service.category}
                    </span>
                  </div>

                  <p className="text-sm text-graphite-600 font-light leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Key Deliverables */}
                  <div className="pt-3 border-t border-graphite-600/15 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-graphite-800">
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-champagne-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 mt-4 border-t border-graphite-600/15 flex items-center justify-between text-xs font-mono text-champagne-600 font-bold uppercase tracking-technical">
                    <Link
                      to={`/contact?interest=${encodeURIComponent(service.title)}#consultation`}
                      className="inline-flex items-center gap-1.5 hover:text-champagne-500 transition-colors"
                    >
                      <span>Inquire Technical Service</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
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
