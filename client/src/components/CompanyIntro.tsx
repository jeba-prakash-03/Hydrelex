import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Compass,
  Building,
  Wrench,
  Check,
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export const CompanyIntro: React.FC = () => {
  const { settings } = useSettings();

  const capabilities = [
    {
      code: 'CAP-01',
      title: 'Precision Mechanical Alignment',
      spec: 'Laser-calibrated vertical guide rails with millimeter plumb tolerance.',
    },
    {
      code: 'CAP-02',
      title: 'Heavy Payload Structural Chassis',
      spec: 'High-tensile steel crossheads engineered for continuous industrial loading cycles.',
    },
    {
      code: 'CAP-03',
      title: 'Multi-Redundant Safety Brakes',
      spec: 'Overspeed mechanical governors, ARD rescue units, and certified rupture valves.',
    },
    {
      code: 'CAP-04',
      title: 'Regional Manufacturing In Sriperumbudur',
      spec: 'Rapid on-site physical support, local spare inventory, and dedicated engineers.',
    },
  ];

  return (
    <section id="company-intro" className="w-full bg-arch-ivory text-arch-graphite py-24 sm:py-32 relative overflow-hidden border-b border-arch-ivoryBorder">
      {/* Subtle blueprint grid overlay */}
      <div className="absolute inset-0 bg-light-blueprint opacity-60 pointer-events-none" />

      {/* Edge-to-Edge Container */}
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Left Column: Full-Bleed Architectural Visual Composition (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative group">
              {/* Massive Photographic Frame */}
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-arch-black shadow-architectural border border-arch-ivoryBorder">
                <img
                  src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=85"
                  alt="Precision Hydraulic Lift Engineering Assembly"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-arch-black/85 via-arch-black/20 to-transparent" />

                {/* Overlaid Engineering Monograph Card */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-sm bg-arch-graphite/90 backdrop-blur-md border border-arch-steel/80 text-white space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-ultra-wide uppercase text-arch-champagne">
                    <span>OPERATIONS BASE</span>
                    <span>TAMIL NADU 602015</span>
                  </div>
                  <div className="font-heading text-sm font-bold tracking-tight text-arch-bone">
                    No. B3-G4, Arakonam Road, Mevallurkuppam Village
                  </div>
                  <div className="text-[11px] font-mono text-arch-sand/70">
                    Sriperumbudur Taluk • Heavy Lift & Hydraulic Hub
                  </div>
                </div>
              </div>

              {/* Architectural Framing Accents */}
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-arch-copper pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-arch-champagne pointer-events-none" />
            </div>
          </motion.div>

          {/* Right Column: Oversized Editorial Typography & Technical Narrative (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-3">
              <span className="text-xs font-mono tracking-ultra-wide uppercase text-arch-copper font-semibold block">
                ABOUT HYDRELEX LIFT SYSTEMS // 01
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-arch-black tracking-tight leading-[1.05]">
                {settings?.intro_headline || 'Moving Beyond Expectations.'}
              </h2>
            </div>

            <p className="text-base sm:text-lg text-arch-slate leading-relaxed font-light">
              {settings?.intro_text ||
                'HYDRELEX LIFT SYSTEMS delivers engineering-focused vertical mobility and industrial lifting solutions. Based in Sriperumbudur, Tamil Nadu, we provide durable, precision-engineered elevator systems and hydraulic machinery built for industrial, commercial, and customized structural requirements.'}
            </p>

            {/* Asymmetric Technical Grid of 4 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {capabilities.map((cap) => (
                <div
                  key={cap.code}
                  className="p-5 rounded-sm bg-white border border-arch-ivoryBorder shadow-sm space-y-2 hover:border-arch-copper/60 transition-colors"
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-arch-copper tracking-wider uppercase">
                    <span>{cap.code}</span>
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="font-heading text-sm font-bold text-arch-graphite">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-arch-slate leading-relaxed">
                    {cap.spec}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-sm bg-arch-graphite text-white font-mono text-xs font-semibold uppercase tracking-architectural hover:bg-arch-black transition-all shadow-sm"
              >
                <span>Read Full Corporate Profile</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-arch-copper hover:text-arch-copperDark font-semibold transition-colors"
              >
                <span>Explore Technical Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
