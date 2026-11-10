import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, FileCheck2, ShieldCheck } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';
import { ImageWithFallback } from './ui/ImageWithFallback';

export const CompanyIntro: React.FC = () => {
  const { settings } = useSettings();

  return (
    <section
      id="company-intro"
      className="w-full bg-ivory-100 text-graphite-800 py-24 sm:py-32 relative overflow-hidden border-b border-graphite-600/20"
      style={{ backgroundColor: '#F4EFE6' }}
    >
      <div className="w-full px-fluid">
        {/* 50/50 Edge-to-Edge Architectural Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Left Column: Big Visual Bleeding (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative group"
          >
            <div className="relative rounded-sm overflow-hidden border border-graphite-600/30 shadow-xl bg-graphite-800">
              <ImageWithFallback
                alt="HYDRELEX Lift Engineering Assembly in Sriperumbudur"
                fallbackType="shaft-cross-section"
                fallbackLabel="SRIPERUMBUDUR ENGINEERING HUB // ELEVATOR CROSS-SECTION"
                aspectRatioClass="aspect-[4/5]"
                showOverlay={true}
              />

              {/* Overlaid Operations Base Info Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-sm bg-graphite-800/95 border border-graphite-600 text-ivory-100 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono tracking-technical uppercase text-champagne-500">
                  <span>FACILITY BASE</span>
                  <span>TAMIL NADU 602015</span>
                </div>
                <div className="font-heading text-sm font-bold tracking-tight text-ivory-100">
                  No. B3-G4, Arakonam Road, Mevallurkuppam Village
                </div>
                <div className="text-[11px] font-mono text-silver-400">
                  Sriperumbudur Taluk • Lift Systems & Engineering Hub
                </div>
              </div>
            </div>

            {/* Architectural Champagne Corner Accents */}
            <div className="absolute -top-2.5 -left-2.5 w-8 h-8 border-t-2 border-l-2 border-champagne-600 pointer-events-none" />
            <div className="absolute -bottom-2.5 -right-2.5 w-8 h-8 border-b-2 border-r-2 border-champagne-600 pointer-events-none" />
          </motion.div>

          {/* Right Column: Oversized Editorial Narrative (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-3">
              <TechnicalEyebrow variant="graphite">
                ABOUT HYDRELEX LIFT SYSTEMS // 01
              </TechnicalEyebrow>
              <h2 className="font-h2-clamp font-extrabold text-graphite-800 tracking-tight leading-[1.05]">
                {settings?.intro_headline || 'A Way to Reach a Goal.'}
              </h2>
            </div>

            <p className="text-lg sm:text-xl text-graphite-600 leading-relaxed font-light font-sans">
              {settings?.intro_text ||
                'HYDRELEX LIFT SYSTEMS delivers engineering-focused vertical mobility and industrial lifting solutions. Based in Sriperumbudur, Tamil Nadu, we engineer durable elevator systems and hydraulic machinery built for industrial, commercial, and customized structural requirements.'}
            </p>

            {/* Verified Certifications & Scope Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-sm bg-white border border-graphite-600/25 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-champagne-600 text-xs font-mono uppercase tracking-technical font-semibold">
                  <FileCheck2 className="w-4 h-4" />
                  <span>UDYAM REGISTERED</span>
                </div>
                <div className="font-mono text-sm font-bold text-graphite-800">
                  {settings?.udyam_registration || 'UDYAM-TN-08-0090275'}
                </div>
                <p className="text-xs text-graphite-600 font-light">
                  Government of India Ministry of MSME verified enterprise.
                </p>
              </div>

              <div className="p-5 rounded-sm bg-white border border-graphite-600/25 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-champagne-600 text-xs font-mono uppercase tracking-technical font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>GST COMPLIANT</span>
                </div>
                <div className="font-mono text-sm font-bold text-graphite-800">
                  {settings?.gstin || '33BNOPK2159N1ZJ'}
                </div>
                <p className="text-xs text-graphite-600 font-light">
                  Direct commercial tax and trade registration in Tamil Nadu.
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 px-8 h-13 py-3.5 rounded-sm bg-graphite-800 hover:bg-ink-900 text-ivory-100 font-mono text-xs font-bold uppercase tracking-technical transition-all duration-200 shadow-sm"
              >
                <span>Read Full Corporate Profile</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-technical text-champagne-600 hover:text-champagne-500 font-bold transition-colors"
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
