import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Wrench, ShieldCheck, FileCheck2, ArrowUpRight } from 'lucide-react';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';

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
    <section
      id="why-us"
      className="w-full bg-ink-950 text-steel-100 relative overflow-hidden border-b border-graphite-700"
      style={{ backgroundColor: '#0A0A0B' }}
    >
      {/* Full-Bleed Copper Ticker Band at Top of Section */}
      <div className="w-full bg-copper-500 text-ink-950 py-3.5 px-fluid overflow-hidden border-y border-copper-400 shadow-copper-glow">
        <div className="flex items-center justify-between gap-6 text-[12px] sm:text-[13px] font-sans font-bold uppercase tracking-[0.14em]">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-ink-950" />
            DIRECT SRIPERUMBUDUR MANUFACTURING BASE
          </span>
          <span className="hidden md:inline font-mono text-ink-950/90">
            ARAKONAM ROAD // MEVALLURKUPPAM VILLAGE
          </span>
          <span className="hidden lg:inline font-mono">
            UDYAM-TN-08-0090275 • GSTIN 33BNOPK2159N1ZJ
          </span>
        </div>
      </div>

      {/* Film Grain and Grid Texture */}
      <div className="absolute inset-0 bg-technical-grid opacity-20 pointer-events-none" />

      {/* Oversized Outlined Numeral 04 Cropped Behind Section */}
      <div
        aria-hidden="true"
        className="absolute -top-10 left-6 sm:left-16 text-[18vw] font-heading font-black select-none pointer-events-none leading-none opacity-10"
        style={{
          WebkitTextStroke: '1.5px #E8782E',
          color: 'transparent',
        }}
      >
        04
      </div>

      <div className="w-full px-fluid py-24 sm:py-32 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 space-y-4">
          <TechnicalEyebrow variant="copper">
            CORE ENGINEERING DISCIPLINE // 04
          </TechnicalEyebrow>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-heading font-extrabold tracking-tight text-steel-100 leading-tight">
            The HYDRELEX <span className="text-copper-500">Standard</span>
          </h2>
          <p className="text-base sm:text-lg text-steel-300 font-light leading-relaxed">
            Four verifiable operational commitments guiding our vertical transportation and industrial lifting systems.
          </p>
        </div>

        {/* Staggered Offset Layout with Central Copper Line Indicator */}
        <div className="relative">
          {/* Vertical Copper Connecting Line on Large Screens */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-copper-500 via-copper-400 to-copper-500/20 opacity-40 pointer-events-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {verifiedPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              // Staggered offset: even items (right column) slightly pushed down on desktop
              const isOffset = idx % 2 === 1;

              return (
                <motion.div
                  key={pillar.num}
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`group relative p-8 sm:p-10 rounded-sm bg-graphite-700 border border-graphite-600/50 border-t-[2.5px] border-t-copper-500 shadow-elevated-card hover:shadow-copper-glow hover:border-copper-500/80 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6 overflow-hidden ${
                    isOffset ? 'md:mt-10' : ''
                  }`}
                >
                  {/* Giant Outlined Numeral in 1px Copper Stroke */}
                  <span
                    className="font-heading text-8xl sm:text-9xl font-black absolute right-4 bottom-2 select-none pointer-events-none transition-all duration-500 leading-none opacity-25 group-hover:opacity-60"
                    style={{
                      WebkitTextStroke: '1px #E8782E',
                      color: 'transparent',
                    }}
                    aria-hidden="true"
                  >
                    {pillar.num}
                  </span>

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between border-b border-graphite-600/60 pb-4">
                      <div className="flex items-center gap-2.5 text-copper-500">
                        <Icon className="w-5 h-5 shrink-0" />
                        <span className="font-sans text-[11px] uppercase tracking-[0.14em] font-bold">
                          {pillar.tagline}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-copper-400">
                        // {pillar.num}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl sm:text-[26px] font-bold text-steel-100 group-hover:text-copper-400 transition-colors leading-tight">
                      {pillar.title}
                    </h3>

                    <p className="text-sm sm:text-base text-steel-300 font-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-graphite-600/60">
                    <div className="flex items-center gap-2 font-sans text-xs text-steel-300">
                      <span className="w-2 h-2 rounded-full bg-copper-500 shrink-0 shadow-copper-glow" />
                      <span className="font-medium text-steel-100">{pillar.bullet}</span>
                    </div>
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
