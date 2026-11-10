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

export const ContactPage: React.FC = () => {
  const { settings } = useSettings();
  const [searchParams] = useSearchParams();
  const initialInterest = searchParams.get('interest') || undefined;
  const [trackModalOpen, setTrackModalOpen] = useState(false);

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
            <span className="text-copper-500 font-semibold">Contact & Consultation</span>
          </div>

          <TechnicalEyebrow variant="copper">
            FACILITY COMMUNICATIONS // CONSULTATION
          </TechnicalEyebrow>

          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-heading font-black tracking-tight text-steel-100 uppercase leading-[1.02]">
            Connect With <span className="text-copper-500">HYDRELEX</span>
          </h1>

          <p className="text-base sm:text-xl text-steel-300 max-w-3xl font-light leading-relaxed">
            Headquartered in Sriperumbudur, Tamil Nadu. Reach out for site surveys, custom engineering quotes, maintenance proposals, or appointment scheduling.
          </p>
        </div>
      </section>

      {/* 2. Main Full-Width Content */}
      <section className="w-full px-fluid py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column: Verified Contact Details & Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-3">
              <TechnicalEyebrow variant="graphite">
                HEADQUARTERS & MANUFACTURING
              </TechnicalEyebrow>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-graphite-900 leading-tight">
                Operations & Factory Facility
              </h2>
              <p className="text-sm sm:text-base text-graphite-700 font-light leading-relaxed">
                Centrally located on Arakonam Road in the Sriperumbudur industrial belt, supporting fast deployment of engineering staff and genuine components across Tamil Nadu.
              </p>
            </div>

            {/* Contact Details Stack */}
            <div className="space-y-4">
              <div className="p-6 rounded-sm bg-white border border-graphite-700/20 shadow-elevated-card flex items-start gap-4">
                <div className="p-3 rounded-xs bg-copper-500/10 text-copper-700 border border-copper-700/20 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1 font-sans text-xs">
                  <div className="uppercase text-copper-700 font-bold text-[11px] tracking-[0.14em]">
                    Registered Facility Address
                  </div>
                  <address className="not-italic text-xs sm:text-sm font-normal text-graphite-900 leading-relaxed">
                    {settings?.address_line1 || 'No B3-G4, Arakonam Road'},<br />
                    {settings?.address_line2 || 'Mevallurkuppam Village'},<br />
                    {settings?.city || 'Sriperumbudur Taluk'} – {settings?.pincode || '602015'},<br />
                    {settings?.state || 'Tamil Nadu'}, {settings?.country || 'India'}.
                  </address>
                </div>
              </div>

              <div className="p-6 rounded-sm bg-white border border-graphite-700/20 shadow-elevated-card flex items-start gap-4">
                <div className="p-3 rounded-xs bg-copper-500/10 text-copper-700 border border-copper-700/20 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1 font-sans text-xs">
                  <div className="uppercase text-copper-700 font-bold text-[11px] tracking-[0.14em]">
                    Direct Telephones
                  </div>
                  <div>
                    <a
                      href={`tel:${settings?.phone_primary || '8939359592'}`}
                      className="hover:text-copper-700 font-bold text-sm text-graphite-900 font-mono"
                    >
                      +91 {settings?.phone_primary || '8939359592'}
                    </a>
                  </div>
                  <div>
                    <a
                      href={`tel:${settings?.phone_secondary || '9789397504'}`}
                      className="hover:text-copper-700 font-bold text-sm text-graphite-900 font-mono"
                    >
                      +91 {settings?.phone_secondary || '9789397504'}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-sm bg-white border border-graphite-700/20 shadow-elevated-card flex items-start gap-4">
                <div className="p-3 rounded-xs bg-copper-500/10 text-copper-700 border border-copper-700/20 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1 font-sans text-xs">
                  <div className="uppercase text-copper-700 font-bold text-[11px] tracking-[0.14em]">
                    Official Correspondence
                  </div>
                  <div className="text-sm font-semibold text-graphite-900">
                    <a
                      href={`mailto:${settings?.email || 'info@hydrelex.com'}`}
                      className="hover:text-copper-700 font-mono"
                    >
                      {settings?.email || 'info@hydrelex.com'}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-sm bg-white border border-graphite-700/20 shadow-elevated-card flex items-start gap-4">
                <div className="p-3 rounded-xs bg-copper-500/10 text-copper-700 border border-copper-700/20 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1 font-sans text-xs">
                  <div className="uppercase text-copper-700 font-bold text-[11px] tracking-[0.14em]">
                    Working Hours
                  </div>
                  <div className="text-xs text-graphite-700">
                    {settings?.business_hours || 'Monday – Saturday: 9:00 AM – 6:30 PM (Sunday Closed)'}
                  </div>
                </div>
              </div>
            </div>

            {/* Official Registrations Card with Banner */}
            <div className="p-6 rounded-sm bg-ink-950 text-steel-100 space-y-4 border border-graphite-700 shadow-elevated-card">
              <span className="text-[11px] font-sans tracking-[0.14em] uppercase text-copper-400 font-bold block">
                VERIFIED CORPORATE CREDENTIALS
              </span>
              <div className="p-2 bg-white rounded-xs border border-graphite-700/40">
                <img
                  src="/company_brand_banner.jpg"
                  alt="HYDRELEX Verified Enterprise Credentials"
                  className="w-full h-auto object-contain rounded-xs"
                />
              </div>
              <div className="space-y-2 text-xs font-mono pt-1">
                <div className="flex items-center gap-2.5">
                  <FileCheck2 className="w-4 h-4 text-copper-500" />
                  <span>
                    UDYAM: <strong className="text-steel-100">{settings?.udyam_registration || 'UDYAM-TN-08-0090275'}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-copper-500" />
                  <span>
                    GSTIN: <strong className="text-steel-100">{settings?.gstin || '33BNOPK2159N1ZJ'}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Track Existing Consultation Card */}
            <div className="p-6 rounded-sm bg-white border border-graphite-700/20 shadow-elevated-card space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-sans uppercase tracking-[0.14em] text-copper-700 font-bold">
                  STATUS VERIFICATION
                </span>
                <Search className="w-4 h-4 text-copper-700" />
              </div>
              <h3 className="font-heading text-lg font-bold text-graphite-900">
                Track Existing Consultation?
              </h3>
              <p className="text-xs text-graphite-700 font-light leading-relaxed">
                Check appointment confirmation status using your reference code and telephone number.
              </p>
              <button
                onClick={() => setTrackModalOpen(true)}
                className="w-full h-12 inline-flex items-center justify-center gap-2 px-5 rounded-sm bg-graphite-900 hover:bg-ink-950 text-steel-100 text-xs font-sans uppercase tracking-[0.12em] transition-colors font-bold shadow-sm"
              >
                <span>Track By Reference Number</span>
              </button>
            </div>
          </div>

          {/* Right Column: Refined Consultation Form (7 cols) */}
          <div className="lg:col-span-7" id="consultation">
            <EnquiryForm initialInterest={initialInterest} themeMode="dark" />
          </div>
        </div>
      </section>

      <TrackEnquiryModal
        isOpen={trackModalOpen}
        onClose={() => setTrackModalOpen(false)}
      />
    </div>
  );
};
