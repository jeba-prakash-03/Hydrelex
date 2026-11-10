import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Layers, Sliders, MapPin, Check, ArrowRight } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Precision Safety Engineering',
      tagline: 'MULTI-REDUNDANT ARCHITECTURE',
      description:
        'Every installation incorporates certified progressive mechanical safety gear, instant overspeed governors, hydraulic rupture burst valves, and automatic rescue devices (ARD) ensuring uncompromised passenger and freight safety.',
      metrics: ['Mechanical safety gear interlock', 'Emergency battery lowering unit', 'Certified overload detection'],
      icon: Shield,
    },
    {
      num: '02',
      title: 'Heavy Structural Fabrication',
      tagline: 'HIGH-TENSILE STEEL CHASSIS',
      description:
        'Manufactured for intense duty cycles, forklift impact resistance, and heavy factory payloads. We employ heavy-gauge anti-deflection structural channels and laser-machined guide rail brackets.',
      metrics: ['Heavy gauge steel chassis', 'Laser-guided vertical plumb line', 'High safety factor ratings'],
      icon: Layers,
    },
    {
      num: '03',
      title: 'Bespoke Architectural Adaptation',
      tagline: 'SITE-SPECIFIC ENGINEERING',
      description:
        'When standard catalogue elevators cannot accommodate existing civil structures, our engineering office designs custom cabin footprints, shallow pit depths, and panoramic architectural glass enclosures.',
      metrics: ['Reduced pit depth options', 'Custom doorway & shaft geometry', 'Panoramic glass integration'],
      icon: Sliders,
    },
    {
      num: '04',
      title: 'Sriperumbudur Regional Hub',
      tagline: 'RAPID ON-SITE RESPONSE',
      description:
        'Centrally based in Mevallurkuppam on Arakonam Road in Sriperumbudur, our field engineers ensure immediate spare parts availability, regular preventive audits, and rapid dispatch across Tamil Nadu industrial corridors.',
      metrics: ['Direct engineer support', 'Local spare parts inventory', 'Fast emergency dispatch'],
      icon: MapPin,
    },
  ];

  return (
    <section className="w-full bg-arch-black text-white py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint-grid opacity-10 pointer-events-none" />

      {/* Full-Bleed Container */}
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 space-y-3">
          <span className="text-xs font-mono tracking-ultra-wide uppercase text-arch-champagne font-semibold block">
            CORE METHODOLOGY // 04
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            The HYDRELEX Standard
          </h2>
          <p className="text-base text-arch-sand/80 font-light leading-relaxed">
            Vertical mobility systems engineered without compromise. Combining rigorous safety protocols with bespoke architectural manufacturing.
          </p>
        </div>

        {/* 4 Distinctive Editorial Monograph Blocks (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative p-8 sm:p-10 rounded-sm bg-arch-graphite/70 border border-arch-steel/60 hover:border-arch-champagne/60 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-architectural-dark"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-arch-steel/40 pb-4">
                    <span className="font-mono text-3xl sm:text-4xl font-extrabold text-arch-champagne">
                      {pillar.num}
                    </span>
                    <span className="font-mono text-[10px] tracking-ultra-wide uppercase text-arch-sand/70">
                      {pillar.tagline}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-white group-hover:text-arch-champagne transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-arch-sand/85 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-arch-steel/40 space-y-2">
                  {pillar.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-2.5 text-xs font-mono text-arch-bone/80">
                      <span className="w-1.5 h-1.5 bg-arch-champagne rounded-full" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
