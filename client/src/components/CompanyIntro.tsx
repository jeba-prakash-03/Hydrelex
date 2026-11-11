import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FileCheck2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';
import { BlueprintShaftView } from './ui/BlueprintShaftView';
import { Surface } from './ui/Surface';

export const CompanyIntro: React.FC = () => {
  const { settings } = useSettings();

  return (
    <Surface
      tone="sand"
      as="section"
      id="company-intro"
      className="w-full py-24 sm:py-32 relative overflow-hidden border-b border-sand-200"
    >
      {/* Background Architectural Scale Grid Overlay */}
      <div className="absolute inset-0 bg-technical-grid-light opacity-40 pointer-events-none" />

      {/* Oversized Outlined Numeral 01 Cropped Behind Section */}
      <div
        aria-hidden="true"
        className="absolute -top-10 right-4 sm:right-16 text-[18vw] font-heading font-black select-none pointer-events-none leading-none opacity-20"
        style={{
          WebkitTextStroke: '2px #B4531A',
          color: 'transparent',
        }}
      >
        01
      </div>

      <div className="w-full px-fluid relative z-10">
        {/* Edge-to-Edge 50/50 Architectural Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-center">
          {/* Left Column: Full-Bleed Blueprint Cross-Section Panel (6 cols) */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative"
          >
            <BlueprintShaftView />
          </motion.div>

          {/* Right Column: Oversized Editorial Narrative & Pull-Quote (6 cols) */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-4">
              <TechnicalEyebrow variant="copper">
                ABOUT HYDRELEX LIFT SYSTEMS // 01
              </TechnicalEyebrow>

              {/* Big Pull-Quote Line in 40-60px type */}
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-heading font-extrabold text-surface-heading tracking-tight leading-[1.08]">
                A Way to Reach a Goal through{' '}
                <span className="text-copper-700 underline decoration-copper-500/40 underline-offset-8">
                  Engineered
                </span>{' '}
                Precision.
              </h2>
            </div>

            <p className="text-lg sm:text-xl text-surface-fg leading-relaxed font-normal font-sans">
              {settings?.intro_text ||
                'HYDRELEX LIFT SYSTEMS is an industrial-grade elevator and vertical mobility manufacturer headquartered in Sriperumbudur, Tamil Nadu. We specialize in heavy-capacity goods lifts, hydraulic platforms, custom passenger systems, and modernization built to strict architectural and industrial standards.'}
            </p>

            {/* Verified Certifications in a single row of Copper-Outlined Badge Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="border border-sand-200 bg-white shadow-sm px-4 py-2.5 rounded-sm inline-flex items-center gap-2.5 transition-colors hover:border-copper-700">
                <FileCheck2 className="w-4 h-4 text-copper-700 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.14em] text-copper-700">
                    UDYAM MSME VERIFIED
                  </span>
                  <span className="font-mono text-xs font-bold text-ink-900">
                    {settings?.udyam_registration || 'UDYAM-TN-08-0090275'}
                  </span>
                </div>
              </div>

              <div className="border border-sand-200 bg-white shadow-sm px-4 py-2.5 rounded-sm inline-flex items-center gap-2.5 transition-colors hover:border-copper-700">
                <ShieldCheck className="w-4 h-4 text-copper-700 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.14em] text-copper-700">
                    GST TAX REGISTERED
                  </span>
                  <span className="font-mono text-xs font-bold text-ink-900">
                    {settings?.gstin || '33BNOPK2159N1ZJ'}
                  </span>
                </div>
              </div>

              <div className="border border-sand-200 bg-white shadow-sm px-4 py-2.5 rounded-sm inline-flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.14em] text-teal-700">
                    LOCATION
                  </span>
                  <span className="font-sans text-xs font-semibold text-ink-900">
                    Sriperumbudur, Tamil Nadu
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link
                to="/about"
                className="group relative inline-flex items-center gap-3 px-8 h-12 py-3 rounded-sm bg-teal-700 hover:bg-teal-900 text-white font-sans text-[13px] font-bold uppercase tracking-[0.12em] transition-all duration-200 shadow-md hover:shadow-teal-glow"
              >
                <span>Read Full Corporate Profile</span>
                <ArrowRight className="w-4 h-4 text-amber-300 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/services"
                className="group inline-flex items-center gap-2 text-[13px] font-sans uppercase tracking-[0.12em] text-copper-700 hover:text-copper-600 font-bold transition-colors"
              >
                <span>Explore Technical Services</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Surface>
  );
};
