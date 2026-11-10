import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  FileCheck2,
  ShieldCheck,
  Phone,
  Layers,
  Wrench,
  CheckCircle2,
  Cpu,
  Building,
  Compass,
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { CTASection } from '../components/CTASection';

export const AboutPage: React.FC = () => {
  const { settings } = useSettings();

  return (
    <div className="w-full bg-arch-ivory text-arch-graphite overflow-x-hidden">
      {/* Page Header (Full Width) */}
      <section className="w-full bg-arch-black text-white pt-36 pb-24 relative overflow-hidden border-b border-arch-steel/30">
        <div className="absolute inset-0 bg-blueprint-grid opacity-15" />
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10 space-y-4">
          <span className="text-[10px] font-mono tracking-ultra-wide uppercase text-arch-champagne font-semibold block">
            CORPORATE PROFILE & ENGINEERING DISCIPLINE
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[1.02]">
            Engineering Vertical Movement.
          </h1>
          <p className="text-base sm:text-xl text-arch-sand/80 max-w-3xl font-light leading-relaxed">
            Rooted in Sriperumbudur, Tamil Nadu—an industrial powerhouse of India—manufacturing and erecting engineered lift systems, goods freight elevators, and specialized hydraulic mechanisms.
          </p>
        </div>
      </section>

      {/* Main Corporate Overview (Full Width) */}
      <section className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono tracking-ultra-wide uppercase text-arch-copper font-semibold block">
              PRECISION FABRICATION
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-arch-black leading-[1.1] tracking-tight">
              Moving People & Heavy Freight With Absolute Precision.
            </h2>
            <p className="text-base sm:text-lg text-arch-slate leading-relaxed font-light">
              {settings?.intro_text ||
                'HYDRELEX LIFT SYSTEMS delivers engineering-focused vertical mobility and industrial lifting solutions. Based in Sriperumbudur, Tamil Nadu, we provide durable, precision-engineered elevator systems and hydraulic machinery built for industrial, commercial, and customized structural requirements.'}
            </p>
            <p className="text-sm sm:text-base text-arch-slate leading-relaxed font-light">
              From commercial passenger elevators requiring smooth, whisper-quiet acceleration to massive factory goods lifts handling heavy forklift loading and intense daily cycles, our designs prioritize passenger safety, structural longevity, and easy maintenance.
            </p>

            {/* Official Registration Box */}
            <div className="p-6 rounded-sm bg-white border border-arch-ivoryBorder shadow-sm space-y-4">
              <span className="text-[10px] font-mono tracking-ultra-wide uppercase text-arch-copper font-semibold block">
                VERIFIED GOVERNMENT REGISTRATIONS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-sm bg-arch-ivoryAlt border border-arch-ivoryBorder">
                  <span className="text-arch-slate block text-[10px] mb-1">UDYAM REGISTRATION:</span>
                  <strong className="text-arch-black font-bold text-sm">
                    {settings?.udyam_registration || 'UDYAM-TN-08-0090275'}
                  </strong>
                </div>
                <div className="p-4 rounded-sm bg-arch-ivoryAlt border border-arch-ivoryBorder">
                  <span className="text-arch-slate block text-[10px] mb-1">GST NUMBER (GSTIN):</span>
                  <strong className="text-arch-black font-bold text-sm">
                    {settings?.gstin || '33BNOPK2159N1ZJ'}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-architectural border border-arch-ivoryBorder bg-arch-black">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85"
                alt="Precision Industrial Assembly & Hydraulic Machining"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3 Core Architecture Pillars */}
        <div className="mt-28">
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-mono tracking-ultra-wide uppercase text-arch-copper font-semibold block">
              OPERATIONAL PRINCIPLES
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-arch-black tracking-tight">
              The HYDRELEX Standard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-sm bg-white border border-arch-ivoryBorder shadow-sm space-y-4">
              <div className="p-2.5 rounded-sm bg-arch-ivory text-arch-copper border border-arch-ivoryBorder w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-xl font-bold text-arch-black">
                Zero Compromise Safety
              </h3>
              <p className="text-sm text-arch-slate font-light leading-relaxed">
                Multi-point safety gear, overspeed mechanical braking, interlocked car doors, and emergency battery lowering units engineered into every machine.
              </p>
            </div>

            <div className="p-8 rounded-sm bg-white border border-arch-ivoryBorder shadow-sm space-y-4">
              <div className="p-2.5 rounded-sm bg-arch-ivory text-arch-copper border border-arch-ivoryBorder w-fit">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-xl font-bold text-arch-black">
                Intelligent Motor Drives
              </h3>
              <p className="text-sm text-arch-slate font-light leading-relaxed">
                VVVF frequency controllers provide seamless acceleration, micro-level floor stopping accuracy, and up to 40% lower energy consumption.
              </p>
            </div>

            <div className="p-8 rounded-sm bg-white border border-arch-ivoryBorder shadow-sm space-y-4">
              <div className="p-2.5 rounded-sm bg-arch-ivory text-arch-copper border border-arch-ivoryBorder w-fit">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-xl font-bold text-arch-black">
                Sriperumbudur Hub Proximity
              </h3>
              <p className="text-sm text-arch-slate font-light leading-relaxed">
                Located near major automotive, logistics, and manufacturing corridors, our engineering team provides prompt physical inspections, spare replacements, and rapid turnaround.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
