import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Wrench, ShieldCheck, FileCheck2 } from 'lucide-react';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';
import { Surface } from './ui/Surface';

export const WhyChooseUs: React.FC = () => {
  const verifiedPillars = [
    {
      num: '01',
      title: 'In-House Manufacturing in Sriperumbudur',
      tagline: 'SRIPERUMBUDUR INDUSTRIAL HUB',
      description:
        'Centrally based in Mevallurkuppam Village on Arakonam Road, Sriperumbudur Taluk. We maintain dedicated engineering fabrication facilities, localized inventory of genuine parts, and immediate engineering response across the Tamil Nadu manufacturing corridors.',
      icon: Building2,
      bullet: 'Direct manufacturing base at Sriperumbudur 602015',
    },
    {
      num: '02',
      title: 'Bespoke Architectural & Civil Engineering',
      tagline: 'SITE-SPECIFIC ADAPTATION',
      description:
        'Where standard modular catalog lifts cannot accommodate unique civil footprints, our engineering office designs custom cabin sizes, low pit depth configurations, shallow overhead headroom solutions, and panoramic glass integrations.',
      icon: Wrench,
      bullet: 'Bespoke structural adaptation to site architectural constraints',
    },
    {
      num: '03',
      title: 'Turnkey Installation & Maintenance Support',
      tagline: 'LIFECYCLE COMMITMENT',
      description:
        'Certified field engineers oversee each phase: initial shaft plumb survey, structural erection, VVVF electrical commissioning, and scheduled preventative maintenance visits ensuring uncompromised passenger and freight safety.',
      icon: ShieldCheck,
      bullet: 'Full lifecycle coverage from civil survey to preventative AMC',
    },
    {
      num: '04',
      title: 'UDYAM & GST Registered Operations',
      tagline: 'VERIFIED REGULATORY INTEGRITY',
      description:
        'Operating with formal government registration under UDYAM-TN-08-0090275 and GSTIN 33BNOPK2159N1ZJ. We maintain clear invoicing, verified corporate governance, and documented compliance with industrial mobility norms.',
      icon: FileCheck2,
      bullet: 'UDYAM-TN-08-0090275 & GSTIN 33BNOPK2159N1ZJ verified',
    },
  ];

  return (
    <Surface
      tone="copper"
      as="section"
      id="why-us"
      className="w-full relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-br from-copper-500 via-copper-500 to-amber-500"
    >
      {/* Top Teal Architectural Header Band */}
      <Surface tone="teal" as="div" className="w-full py-3.5 px-fluid border-y border-teal-500/40">
        <div className="flex items-center justify-between gap-6 text-[12px] sm:text-[13px] font-sans font-bold uppercase tracking-[0.14em] text-surface-fg">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            DIRECT SRIPERUMBUDUR MANUFACTURING BASE
          </span>
          <span className="hidden md:inline font-mono text-surface-muted">
            ARAKONAM ROAD // MEVALLURKUPPAM VILLAGE
          </span>
          <span className="hidden lg:inline font-mono text-amber-300">
            UDYAM-TN-08-0090275 • GSTIN 33BNOPK2159N1ZJ
          </span>
        </div>
      </Surface>

      {/* Oversized Outlined Numeral 04 Cropped Behind Section */}
      <div
        aria-hidden="true"
        className="absolute top-12 left-6 sm:left-16 text-[18vw] font-heading font-black select-none pointer-events-none leading-none opacity-15"
        style={{
          WebkitTextStroke: '2px #0F1416',
          color: 'transparent',
        }}
      >
        04
      </div>

      <div className="w-full px-fluid py-24 sm:py-32 relative z-10">
        {/* Section Header in Deep Ink on Full-Bleed Copper */}
        <div className="max-w-3xl mb-20 space-y-4">
          <TechnicalEyebrow variant="graphite">
            CORE ENGINEERING DISCIPLINE // 04
          </TechnicalEyebrow>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-heading font-extrabold tracking-tight text-surface-heading leading-tight">
            The HYDRELEX{' '}
            <span className="inline-block bg-ink-900 text-amber-500 px-3 py-0.5 rounded-xs">
              Standard
            </span>
          </h2>
          <p className="text-base sm:text-lg text-surface-fg font-medium leading-relaxed">
            Four verifiable operational commitments guiding our vertical transportation and industrial lifting systems.
          </p>
        </div>

        {/* Staggered Offset Layout */}
        <div className="relative">
          {/* Vertical Ink Connecting Line on Large Screens */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-ink-900/30 pointer-events-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {verifiedPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isOffset = idx % 2 === 1;

              return (
                <motion.div
                  key={pillar.num}
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05, margin: '0px 0px -10% 0px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={isOffset ? 'md:mt-10' : ''}
                >
                  <Surface
                    tone="dark"
                    as="div"
                    className="group h-full p-8 sm:p-10 rounded-sm border border-teal-500/20 border-t-[4px] border-t-amber-500 shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6 overflow-hidden"
                  >
                    {/* Giant Outlined Numeral in Amber Gold */}
                    <span
                      className="font-heading text-8xl sm:text-9xl font-black absolute right-4 bottom-2 select-none pointer-events-none transition-all duration-500 leading-none opacity-30 group-hover:opacity-75 text-amber-500"
                      style={{
                        WebkitTextStroke: '1.5px #F6B93B',
                        color: 'transparent',
                      }}
                      aria-hidden="true"
                    >
                      {pillar.num}
                    </span>

                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                        <div className="flex items-center gap-2.5 text-amber-500">
                          <Icon className="w-5 h-5 shrink-0" />
                          <span className="font-sans text-[11px] uppercase tracking-[0.14em] font-bold">
                            {pillar.tagline}
                          </span>
                        </div>
                        <span className="font-mono text-sm font-black px-2.5 py-0.5 rounded-xs bg-amber-500 text-ink-900">
                          {pillar.num}
                        </span>
                      </div>

                      <h3 className="font-heading text-2xl sm:text-[26px] font-bold text-surface-heading leading-tight">
                        {pillar.title}
                      </h3>

                      <p className="text-sm sm:text-base text-surface-muted font-normal leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="relative z-10 pt-4 border-t border-[var(--border)]">
                      <div className="flex items-center gap-2 font-sans text-xs text-surface-fg">
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 shadow-[0_0_8px_#F6B93B]" />
                        <span className="font-medium text-surface-fg">{pillar.bullet}</span>
                      </div>
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
