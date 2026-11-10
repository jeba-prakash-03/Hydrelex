import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cpu, Building2, FileCheck2, ChevronRight } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { TechnicalEyebrow } from '../components/ui/TechnicalEyebrow';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { CTASection } from '../components/CTASection';

export const AboutPage: React.FC = () => {
  const { settings } = useSettings();

  return (
    <div className="w-full bg-gradient-to-br from-ivory-50 via-steel-100/40 to-ivory-100 text-graphite-900 overflow-x-hidden">
      {/* 1. Full-Width Dark Header */}
      <section
        className="w-full bg-ink-950 text-steel-100 pt-36 pb-20 relative overflow-hidden border-b border-graphite-700"
        style={{ backgroundColor: '#0A0A0B' }}
      >
        <div className="w-full px-fluid relative z-10 space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-sans text-xs text-steel-300">
            <Link to="/" className="hover:text-copper-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-steel-300/50" />
            <span className="text-copper-500 font-semibold">About Us</span>
          </div>

          <TechnicalEyebrow variant="copper">
            CORPORATE PROFILE & ENGINEERING DISCIPLINE
          </TechnicalEyebrow>

          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-heading font-black tracking-tight text-steel-100 uppercase leading-[1.02]">
            Engineering Vertical <span className="text-copper-500">Movement</span>.
          </h1>

          <p className="text-base sm:text-xl text-steel-300 max-w-3xl font-light leading-relaxed">
            Headquartered in Sriperumbudur, Tamil Nadu—manufacturing and erecting engineered passenger elevator systems, industrial freight lifts, and precision hydraulic mechanisms.
          </p>
        </div>
      </section>

      {/* 2. Main Corporate Narrative (Ivory Light Section) */}
      <section className="w-full px-fluid py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 space-y-6">
            <TechnicalEyebrow variant="graphite">
              PRECISION FABRICATION HUB
            </TechnicalEyebrow>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-graphite-900 leading-[1.1] tracking-tight">
              Moving People & Heavy Freight With Absolute <span className="text-copper-700">Precision</span>.
            </h2>

            <p className="text-base sm:text-lg text-graphite-700 leading-relaxed font-light">
              {settings?.intro_text ||
                'HYDRELEX LIFT SYSTEMS delivers engineering-focused vertical mobility and industrial lifting solutions. Based in Sriperumbudur, Tamil Nadu, we provide durable, precision-engineered elevator systems and hydraulic machinery built for industrial, commercial, and customized structural requirements.'}
            </p>

            <p className="text-sm sm:text-base text-graphite-700 leading-relaxed font-light">
              From commercial passenger elevators requiring smooth, whisper-quiet acceleration to massive factory goods lifts handling heavy forklift loading and intense daily cycles, our designs prioritize passenger safety, structural longevity, and easy maintenance.
            </p>

            {/* Verified Government Registrations */}
            <div className="p-6 rounded-sm bg-white border border-graphite-700/20 shadow-elevated-card space-y-4">
              <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-copper-700 font-bold block">
                VERIFIED REGULATORY INTEGRITY
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xs bg-ivory-50 border border-graphite-700/15">
                  <div className="flex items-center gap-1.5 text-graphite-700 mb-1">
                    <FileCheck2 className="w-4 h-4 text-copper-700" />
                    <span className="text-[10px] font-bold">UDYAM REGISTRATION:</span>
                  </div>
                  <strong className="text-graphite-900 font-bold text-sm">
                    {settings?.udyam_registration || 'UDYAM-TN-08-0090275'}
                  </strong>
                </div>

                <div className="p-4 rounded-xs bg-ivory-50 border border-graphite-700/15">
                  <div className="flex items-center gap-1.5 text-graphite-700 mb-1">
                    <ShieldCheck className="w-4 h-4 text-copper-700" />
                    <span className="text-[10px] font-bold">GSTIN (TAMIL NADU):</span>
                  </div>
                  <strong className="text-graphite-900 font-bold text-sm">
                    {settings?.gstin || '33BNOPK2159N1ZJ'}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Frame */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-sm overflow-hidden shadow-2xl border border-graphite-700 bg-graphite-900">
              <ImageWithFallback
                alt="HYDRELEX Elevator Engineering Assembly Bay in Sriperumbudur"
                fallbackType="passenger"
                fallbackLabel="SRIPERUMBUDUR HUB // STRUCTURAL ASSEMBLY"
                aspectRatioClass="aspect-[4/3]"
                showOverlay={true}
              />
            </div>
          </div>
        </div>

        {/* 3 Core Operating Principles */}
        <div className="mt-28">
          <div className="max-w-3xl mb-16 space-y-3">
            <TechnicalEyebrow variant="graphite">
              OPERATIONAL PRINCIPLES
            </TechnicalEyebrow>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-graphite-900 tracking-tight">
              Engineering <span className="text-copper-700">Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-sm bg-white border border-graphite-700/20 border-t-2 border-t-copper-500 shadow-elevated-card space-y-4 hover:shadow-copper-glow transition-all duration-300">
              <div className="p-2.5 rounded-xs bg-copper-500/10 text-copper-700 border border-copper-700/20 w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-xl font-bold text-graphite-900">
                Rigorous Safety Architecture
              </h3>
              <p className="text-sm text-graphite-700 font-light leading-relaxed">
                Progressive mechanical safety gear, overspeed mechanical governors, interlocked car doors, and automatic rescue devices engineered into every system.
              </p>
            </div>

            <div className="p-8 rounded-sm bg-white border border-graphite-700/20 border-t-2 border-t-copper-500 shadow-elevated-card space-y-4 hover:shadow-copper-glow transition-all duration-300">
              <div className="p-2.5 rounded-xs bg-copper-500/10 text-copper-700 border border-copper-700/20 w-fit">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-xl font-bold text-graphite-900">
                Intelligent Inverter Drives
              </h3>
              <p className="text-sm text-graphite-700 font-light leading-relaxed">
                VVVF frequency controllers provide seamless acceleration, micro-level floor stopping accuracy, and up to 40% reduction in motor energy consumption.
              </p>
            </div>

            <div className="p-8 rounded-sm bg-white border border-graphite-700/20 border-t-2 border-t-copper-500 shadow-elevated-card space-y-4 hover:shadow-copper-glow transition-all duration-300">
              <div className="p-2.5 rounded-xs bg-copper-500/10 text-copper-700 border border-copper-700/20 w-fit">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-xl font-bold text-graphite-900">
                Sriperumbudur Hub Proximity
              </h3>
              <p className="text-sm text-graphite-700 font-light leading-relaxed">
                Located near major automotive and industrial corridors, our field engineering team provides prompt physical inspections, genuine spare parts, and fast turnaround.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
