import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  FileCheck2,
  ShieldCheck,
  Search,
  ChevronRight,
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { EnquiryForm } from '../components/EnquiryForm';
import { TrackEnquiryModal } from '../components/TrackEnquiryModal';
import { TechnicalEyebrow } from '../components/ui/TechnicalEyebrow';
import { Surface } from '../components/ui/Surface';
import { SectionDivider } from '../components/ui/SectionDivider';

export const ContactPage: React.FC = () => {
  const { settings } = useSettings();
  const [searchParams] = useSearchParams();
  const initialInterest = searchParams.get('interest') || undefined;
  const [trackModalOpen, setTrackModalOpen] = useState(false);

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
              Contact & Consultation
            </span>
          </div>

          <TechnicalEyebrow variant="auto">
            FACILITY COMMUNICATIONS // CONSULTATION
          </TechnicalEyebrow>

          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-heading font-black tracking-tight text-surface-heading uppercase leading-[1.02]">
            Connect With{' '}
            <span className="bg-copper-500 text-ink-950 px-3 py-0.5 rounded-xs inline-block">
              HYDRELEX
            </span>
          </h1>

          <p className="text-base sm:text-xl text-surface-fg max-w-3xl font-normal leading-relaxed">
            Headquartered in Sriperumbudur, Tamil Nadu. Reach out for site surveys, custom engineering quotes, maintenance proposals, or appointment scheduling.
          </p>
        </div>
      </Surface>

      {/* Diagonal Divider: Teal -> Warm Sand */}
      <SectionDivider topColor="#0B4F5C" bottomColor="#F6E9D7" variant="diagonal-up" accentLineColor="#F6B93B" />

      {/* 2. Main Full-Width Content (Warm Sand Base) */}
      <Surface tone="sand" as="section" className="w-full px-fluid py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column: Verified Contact Details & Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-3">
              <TechnicalEyebrow variant="auto">
                HEADQUARTERS & MANUFACTURING
              </TechnicalEyebrow>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-surface-heading leading-tight">
                Operations & Factory Facility
              </h2>
              <p className="text-sm sm:text-base text-surface-muted font-normal leading-relaxed">
                Centrally located on Arakonam Road in the Sriperumbudur industrial belt, supporting fast deployment of engineering staff and genuine components across Tamil Nadu.
              </p>
            </div>

            {/* Contact Details Stack */}
            <div className="space-y-4">
              <Surface
                tone="light"
                as="div"
                className="p-6 rounded-sm border border-[var(--border)] border-l-[6px] border-l-teal-700 shadow-elevated-card flex items-start gap-4"
              >
                <div className="p-3 rounded-xs bg-teal-700 text-ivory-50 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1 font-sans text-xs">
                  <div className="uppercase text-teal-700 font-bold text-[11px] tracking-[0.14em]">
                    Registered Facility Address
                  </div>
                  <address className="not-italic text-xs sm:text-sm font-medium text-surface-heading leading-relaxed">
                    {settings?.address_line1 || 'No B3-G4, Arakonam Road'},<br />
                    {settings?.address_line2 || 'Mevallurkuppam Village'},<br />
                    {settings?.city || 'Sriperumbudur Taluk'} – {settings?.pincode || '602015'},<br />
                    {settings?.state || 'Tamil Nadu'}, {settings?.country || 'India'}.
                  </address>
                </div>
              </Surface>

              <Surface
                tone="light"
                as="div"
                className="p-6 rounded-sm border border-[var(--border)] border-l-[6px] border-l-copper-500 shadow-elevated-card flex items-start gap-4"
              >
                <div className="p-3 rounded-xs bg-copper-500 text-ink-950 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1 font-sans text-xs">
                  <div className="uppercase text-surface-accent font-bold text-[11px] tracking-[0.14em]">
                    Direct Telephones
                  </div>
                  <div>
                    <a
                      href={`tel:${settings?.phone_primary || '8939359592'}`}
                      className="hover:text-surface-accent font-bold text-sm text-surface-heading font-mono transition-colors"
                    >
                      +91 {settings?.phone_primary || '8939359592'}
                    </a>
                  </div>
                  <div>
                    <a
                      href={`tel:${settings?.phone_secondary || '9789397504'}`}
                      className="hover:text-surface-accent font-bold text-sm text-surface-heading font-mono transition-colors"
                    >
                      +91 {settings?.phone_secondary || '9789397504'}
                    </a>
                  </div>
                </div>
              </Surface>

              <Surface
                tone="light"
                as="div"
                className="p-6 rounded-sm border border-[var(--border)] border-l-[6px] border-l-amber-500 shadow-elevated-card flex items-start gap-4"
              >
                <div className="p-3 rounded-xs bg-amber-500 text-ink-950 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1 font-sans text-xs">
                  <div className="uppercase text-surface-accent font-bold text-[11px] tracking-[0.14em]">
                    Official Correspondence
                  </div>
                  <div className="text-sm font-semibold text-surface-heading">
                    <a
                      href={`mailto:${settings?.email || 'info@hydrelex.com'}`}
                      className="hover:text-surface-accent font-mono transition-colors"
                    >
                      {settings?.email || 'info@hydrelex.com'}
                    </a>
                  </div>
                </div>
              </Surface>

              <Surface
                tone="light"
                as="div"
                className="p-6 rounded-sm border border-[var(--border)] border-l-[6px] border-l-teal-900 shadow-elevated-card flex items-start gap-4"
              >
                <div className="p-3 rounded-xs bg-teal-900 text-amber-300 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1 font-sans text-xs">
                  <div className="uppercase text-teal-700 font-bold text-[11px] tracking-[0.14em]">
                    Working Hours
                  </div>
                  <div className="text-xs text-surface-fg font-medium">
                    {settings?.business_hours || 'Monday – Saturday: 9:00 AM – 6:30 PM (Sunday Closed)'}
                  </div>
                </div>
              </Surface>
            </div>

            {/* Official Registrations Card with Banner */}
            <Surface
              tone="teal"
              as="div"
              className="p-6 rounded-sm space-y-4 border border-teal-500/30 shadow-elevated-card"
            >
              <span className="text-[11px] font-sans tracking-[0.14em] uppercase text-surface-accent font-bold block">
                VERIFIED CORPORATE CREDENTIALS
              </span>
              <div className="p-2 bg-white rounded-xs border border-[var(--border)]">
                <img
                  src="/company_brand_banner.jpg"
                  alt="HYDRELEX Verified Enterprise Credentials"
                  className="w-full h-auto object-contain rounded-xs"
                />
              </div>
              <div className="space-y-2 text-xs font-mono pt-1">
                <div className="flex items-center gap-2.5 text-surface-muted">
                  <FileCheck2 className="w-4 h-4 text-surface-accent" />
                  <span>
                    UDYAM: <strong className="text-surface-heading">{settings?.udyam_registration || 'UDYAM-TN-08-0090275'}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-surface-muted">
                  <ShieldCheck className="w-4 h-4 text-surface-accent" />
                  <span>
                    GSTIN: <strong className="text-surface-heading">{settings?.gstin || '33BNOPK2159N1ZJ'}</strong>
                  </span>
                </div>
              </div>
            </Surface>

            {/* Track Existing Consultation Card */}
            <Surface
              tone="light"
              as="div"
              className="p-6 rounded-sm border border-[var(--border)] border-t-[4px] border-t-copper-500 shadow-elevated-card space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-sans uppercase tracking-[0.14em] text-surface-accent font-bold">
                  STATUS VERIFICATION
                </span>
                <Search className="w-4 h-4 text-surface-accent" />
              </div>
              <h3 className="font-heading text-lg font-bold text-surface-heading">
                Track Existing Consultation?
              </h3>
              <p className="text-xs text-surface-muted font-normal leading-relaxed">
                Check appointment confirmation status using your reference code and telephone number.
              </p>
              <button
                onClick={() => setTrackModalOpen(true)}
                className="w-full h-12 inline-flex items-center justify-center gap-2 px-5 rounded-sm bg-teal-700 hover:bg-teal-900 text-ivory-50 text-xs font-sans uppercase tracking-[0.12em] transition-colors font-bold shadow-sm"
              >
                <span>Track By Reference Number</span>
              </button>
            </Surface>
          </div>

          {/* Right Column: Refined Consultation Form (7 cols) */}
          <div className="lg:col-span-7" id="consultation">
            <EnquiryForm initialInterest={initialInterest} themeMode="dark" />
          </div>
        </div>
      </Surface>

      <TrackEnquiryModal
        isOpen={trackModalOpen}
        onClose={() => setTrackModalOpen(false)}
      />
    </div>
  );
};
