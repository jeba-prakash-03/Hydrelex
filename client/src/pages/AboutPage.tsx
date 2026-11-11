import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cpu, Building2, FileCheck2, ChevronRight } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { TechnicalEyebrow } from '../components/ui/TechnicalEyebrow';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { CTASection } from '../components/CTASection';
import { Surface } from '../components/ui/Surface';
import { SectionDivider } from '../components/ui/SectionDivider';

export const AboutPage: React.FC = () => {
  const { settings } = useSettings();

  const operatingPrinciples = [
    {
      num: '01',
      title: 'Rigorous Safety Architecture',
      desc: 'Progressive mechanical safety gear, overspeed mechanical governors, interlocked car doors, and automatic rescue devices engineered into every system.',
      icon: ShieldCheck,
      leftBorder: 'border-l-teal-700',
      badgeClass: 'bg-teal-700 text-ivory-50',
      iconColor: 'text-teal-700',
    },
    {
      num: '02',
      title: 'Intelligent Inverter Drives',
      desc: 'VVVF frequency controllers provide seamless acceleration, micro-level floor stopping accuracy, and significant reduction in motor energy draw.',
      icon: Cpu,
      leftBorder: 'border-l-copper-500',
      badgeClass: 'bg-copper-500 text-ink-950',
      iconColor: 'text-copper-700',
    },
    {
      num: '03',
      title: 'Sriperumbudur Hub Proximity',
      desc: 'Located near major automotive and industrial corridors, our field engineering team provides prompt physical inspections, genuine spare parts, and fast turnaround.',
      icon: Building2,
      leftBorder: 'border-l-amber-500',
      badgeClass: 'bg-amber-500 text-ink-950',
      iconColor: 'text-copper-700',
    },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. Full-Width Deep Teal Header Band */}
      <Surface
        tone="teal"
        as="section"
        className="w-full pt-36 pb-20 relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-br from-teal-900 via-teal-700 to-teal-900"
      >
        <div className="absolute inset-0 bg-technical-grid opacity-20 pointer-events-none" />
        <div className="w-full px-fluid relative z-10 space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-sans text-xs text-surface-muted font-semibold">
            <Link to="/" className="hover:text-amber-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-surface-muted" />
            <span className="bg-amber-500 text-ink-950 px-2.5 py-0.5 rounded-xs font-bold">
              About Us
            </span>
          </div>

          <TechnicalEyebrow variant="auto">
            CORPORATE PROFILE & ENGINEERING DISCIPLINE
          </TechnicalEyebrow>

          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-heading font-black tracking-tight text-surface-heading uppercase leading-[1.02]">
            Engineering Vertical{' '}
            <span className="text-amber-300 underline decoration-copper-500 underline-offset-8">
              Movement
            </span>
            .
          </h1>

          <p className="text-base sm:text-xl text-surface-fg max-w-3xl font-normal leading-relaxed">
            Headquartered in Sriperumbudur, Tamil Nadu — manufacturing and erecting engineered passenger elevator systems, industrial freight lifts, and precision hydraulic mechanisms.
          </p>
        </div>
      </Surface>

      {/* 2. Main Corporate Narrative (Warm Sand Section) */}
      <Surface tone="sand" as="section" className="w-full px-fluid py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 space-y-6">
            <TechnicalEyebrow variant="auto">
              PRECISION FABRICATION HUB
            </TechnicalEyebrow>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-surface-heading leading-[1.1] tracking-tight">
              Moving People & Heavy Freight With Absolute{' '}
              <span className="text-surface-accent">Precision</span>.
            </h2>

            <p className="text-base sm:text-lg text-surface-fg leading-relaxed font-normal">
              {settings?.intro_text ||
                'HYDRELEX LIFT SYSTEMS delivers engineering-focused vertical mobility and industrial lifting solutions. Based in Sriperumbudur, Tamil Nadu, we provide durable, precision-engineered elevator systems and hydraulic machinery built for industrial, commercial, and customized structural requirements.'}
            </p>

            <p className="text-sm sm:text-base text-surface-muted leading-relaxed font-normal">
              From commercial passenger elevators requiring smooth, quiet acceleration to heavy factory goods lifts handling demanding loading cycles, our designs prioritize passenger safety, structural longevity, and reliable maintenance.
            </p>

            {/* Verified Government Registrations */}
            <Surface
              tone="light"
              as="div"
              className="p-6 rounded-sm border border-[var(--border)] border-t-[4px] border-t-copper-500 shadow-elevated-card space-y-4"
            >
              <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-surface-accent font-bold block">
                VERIFIED REGULATORY INTEGRITY
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <Surface
                  tone="sand"
                  as="div"
                  className="p-4 rounded-xs border border-[var(--border)]"
                >
                  <div className="flex items-center gap-1.5 text-surface-muted mb-1">
                    <FileCheck2 className="w-4 h-4 text-surface-accent" />
                    <span className="text-[10px] font-bold">UDYAM REGISTRATION:</span>
                  </div>
                  <strong className="text-surface-heading font-bold text-sm">
                    {settings?.udyam_registration || 'UDYAM-TN-08-0090275'}
                  </strong>
                </Surface>

                <Surface
                  tone="mint"
                  as="div"
                  className="p-4 rounded-xs border border-[var(--border)]"
                >
                  <div className="flex items-center gap-1.5 text-surface-muted mb-1">
                    <ShieldCheck className="w-4 h-4 text-teal-700" />
                    <span className="text-[10px] font-bold">GSTIN (TAMIL NADU):</span>
                  </div>
                  <strong className="text-surface-heading font-bold text-sm">
                    {settings?.gstin || '33BNOPK2159N1ZJ'}
                  </strong>
                </Surface>
              </div>
            </Surface>
          </div>

          {/* Right Visual Frame: Official Banner & Engineering Assembly */}
          <div className="lg:col-span-6 relative space-y-6">
            <Surface
              tone="light"
              as="div"
              className="p-4 rounded-sm border border-[var(--border)] border-t-[4px] border-t-teal-700 shadow-elevated-card"
            >
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-surface-muted mb-2">
                <span className="font-bold">Official Registered Enterprise Brand</span>
                <span className="text-surface-accent font-bold">UDYAM & GST VERIFIED</span>
              </div>
              <img
                src="/company_brand_banner.jpg"
                alt="HYDRELEX LIFT SYSTEMS Official Verified Registration Banner"
                className="w-full h-auto object-contain border border-[var(--border)] rounded-xs bg-white"
              />
            </Surface>

            <Surface tone="teal" as="div" className="rounded-sm overflow-hidden shadow-2xl border border-teal-500/30">
              <ImageWithFallback
                alt="HYDRELEX Elevator Engineering Assembly Bay in Sriperumbudur"
                fallbackType="passenger"
                fallbackLabel="SRIPERUMBUDUR HUB // STRUCTURAL ASSEMBLY"
                aspectRatioClass="aspect-[16/9]"
                strokeColor="#F6B93B"
                showOverlay={true}
              />
            </Surface>
          </div>
        </div>
      </Surface>

      {/* Stepped Divider: Sand -> Mint */}
      <SectionDivider topColor="#F6E9D7" bottomColor="#D9EEE6" variant="diagonal-down" accentLineColor="#E8782E" />

      {/* 3. Core Operating Principles (Mint Tint with Color-Badged Cards) */}
      <Surface tone="mint" as="section" className="w-full px-fluid py-24 sm:py-32">
        <div className="max-w-3xl mb-16 space-y-3">
          <TechnicalEyebrow variant="auto">
            OPERATIONAL PRINCIPLES
          </TechnicalEyebrow>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-surface-heading tracking-tight">
            Engineering <span className="text-surface-accent">Values</span>
          </h2>
          <p className="text-sm sm:text-base text-surface-muted font-normal leading-relaxed">
            Every elevator assembly engineered and erected from our Sriperumbudur manufacturing base follows disciplined mechanical standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {operatingPrinciples.map((item) => {
            const IconComp = item.icon;
            return (
              <Surface
                key={item.num}
                tone="light"
                as="div"
                className={`p-8 rounded-sm border border-[var(--border)] border-l-[6px] ${item.leftBorder} shadow-elevated-card space-y-4 hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xs ${item.badgeClass} w-fit`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className={`font-mono text-sm font-extrabold px-2.5 py-0.5 rounded-xs ${item.badgeClass}`}>
                    {item.num}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-surface-heading">
                  {item.title}
                </h3>
                <p className="text-sm text-surface-fg font-normal leading-relaxed">
                  {item.desc}
                </p>
              </Surface>
            );
          })}
        </div>
      </Surface>

      <CTASection />
    </div>
  );
};
