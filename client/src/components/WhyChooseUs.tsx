import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Wrench, ShieldCheck, FileCheck2 } from 'lucide-react';
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
      className="w-full bg-ink-900 text-ivory-100 py-24 sm:py-32 relative overflow-hidden border-b border-graphite-600/60"
      style={{ backgroundColor: '#0E0E0F' }}
    >
      <div className="w-full px-fluid relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 space-y-3">
          <TechnicalEyebrow variant="champagne">
            CORE ENGINEERING DISCIPLINE // 04
          </TechnicalEyebrow>
          <h2 className="font-h2-clamp font-extrabold tracking-tight text-ivory-100 leading-tight">
            The HYDRELEX Standard
          </h2>
          <p className="text-base sm:text-lg text-silver-400 font-light leading-relaxed">
            Four verifiable operational commitments guiding our vertical transportation and industrial lifting systems.
          </p>
        </div>

        {/* Offset Asymmetric Grid with Giant Faint Outlined Numerals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {verifiedPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            // Create an offset rhythm: even items start slightly offset on larger displays
            const isOffset = idx % 2 === 1;

            return (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`group relative p-8 sm:p-10 rounded-sm bg-graphite-800 border border-graphite-600 hover:border-champagne-500 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl overflow-hidden ${
                  isOffset ? 'md:mt-8' : ''
                }`}
              >
                {/* Giant Faint Numeral Behind Text */}
                <span
                  className="font-heading text-8xl sm:text-9xl font-extrabold text-graphite-600/20 group-hover:text-champagne-500/10 absolute right-4 bottom-2 select-none pointer-events-none transition-colors duration-500 leading-none"
                  aria-hidden="true"
                >
                  {pillar.num}
                </span>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between border-b border-graphite-600/60 pb-4">
                    <div className="flex items-center gap-2.5 text-champagne-500">
                      <Icon className="w-5 h-5 shrink-0" />
                      <span className="font-mono text-xs uppercase tracking-technical font-semibold">
                        {pillar.tagline}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold text-silver-400">
                      {pillar.num}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-ivory-100 group-hover:text-champagne-500 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-silver-400 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-graphite-600/60">
                  <div className="flex items-center gap-2 font-mono text-xs text-silver-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne-500 shrink-0" />
                    <span>{pillar.bullet}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
