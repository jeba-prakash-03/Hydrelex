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
    <div className="w-full bg-ivory-100 text-graphite-800 overflow-x-hidden">
      {/* 1. Full-Width Dark Header (Guarantees Nav Legibility) */}
      <section
        className="w-full bg-ink-900 text-ivory-100 pt-36 pb-20 relative overflow-hidden border-b border-graphite-600/60"
        style={{ backgroundColor: '#0E0E0F' }}
      >
        <div className="w-full px-fluid relative z-10 space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mono text-xs text-silver-400">
            <Link to="/" className="hover:text-champagne-500 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-silver-400/50" />
            <span className="text-champagne-500">Contact & Consultation</span>
          </div>

          <TechnicalEyebrow variant="champagne">
            FACILITY COMMUNICATIONS // CONSULTATION
          </TechnicalEyebrow>

          <h1 className="font-h2-clamp font-extrabold tracking-tight uppercase leading-[1.02]">
            Connect With HYDRELEX
          </h1>

          <p className="text-base sm:text-xl text-silver-400 max-w-3xl font-light leading-relaxed">
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
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-graphite-800 leading-tight">
                Operations & Factory Facility
              </h2>
              <p className="text-sm sm:text-base text-graphite-600 font-light leading-relaxed">
                Centrally located on Arakonam Road in the Sriperumbudur industrial belt, supporting fast deployment of engineering staff and genuine components across Tamil Nadu.
              </p>
            </div>

            {/* Contact Details Stack */}
            <div className="space-y-4">
              <div className="p-6 rounded-sm bg-white border border-graphite-600/25 shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-sm bg-ivory-50 text-champagne-600 border border-graphite-600/20 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1 font-mono text-xs">
                  <div className="uppercase text-champagne-600 font-bold text-[10px] tracking-technical">
                    Registered Facility Address
                  </div>
                  <address className="not-italic font-sans text-xs sm:text-sm font-normal text-graphite-800 leading-relaxed">
                    {settings?.address_line1 || 'No B3-G4, Arakonam Road'},<br />
                    {settings?.address_line2 || 'Mevallurkuppam Village'},<br />
                    {settings?.city || 'Sriperumbudur Taluk'} – {settings?.pincode || '602015'},<br />
                    {settings?.state || 'Tamil Nadu'}, {settings?.country || 'India'}.
                  </address>
                </div>
              </div>

              <div className="p-6 rounded-sm bg-white border border-graphite-600/25 shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-sm bg-ivory-50 text-champagne-600 border border-graphite-600/20 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1 font-mono text-xs">
                  <div className="uppercase text-champagne-600 font-bold text-[10px] tracking-technical">
                    Direct Telephones
                  </div>
                  <div>
                    <a
                      href={`tel:${settings?.phone_primary || '8939359592'}`}
                      className="hover:text-champagne-600 font-bold text-sm text-graphite-800"
                    >
                      +91 {settings?.phone_primary || '8939359592'}
                    </a>
                  </div>
                  <div>
                    <a
                      href={`tel:${settings?.phone_secondary || '9789397504'}`}
                      className="hover:text-champagne-600 font-bold text-sm text-graphite-800"
                    >
                      +91 {settings?.phone_secondary || '9789397504'}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-sm bg-white border border-graphite-600/25 shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-sm bg-ivory-50 text-champagne-600 border border-graphite-600/20 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1 font-mono text-xs">
                  <div className="uppercase text-champagne-600 font-bold text-[10px] tracking-technical">
                    Official Correspondence
                  </div>
                  <div className="text-sm font-semibold text-graphite-800">
                    <a
                      href={`mailto:${settings?.email || 'info@hydrelex.com'}`}
                      className="hover:text-champagne-600"
                    >
                      {settings?.email || 'info@hydrelex.com'}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-sm bg-white border border-graphite-600/25 shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-sm bg-ivory-50 text-champagne-600 border border-graphite-600/20 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1 font-mono text-xs">
                  <div className="uppercase text-champagne-600 font-bold text-[10px] tracking-technical">
                    Working Hours
                  </div>
                  <div className="text-xs text-graphite-600">
                    {settings?.business_hours || 'Monday – Saturday: 9:00 AM – 6:30 PM (Sunday Closed)'}
                  </div>
                </div>
              </div>
            </div>

            {/* Official Registrations Card */}
            <div className="p-6 rounded-sm bg-ink-900 text-ivory-100 space-y-3 border border-graphite-600 shadow-sm">
              <span className="text-[10px] font-mono tracking-technical uppercase text-champagne-500 font-semibold block">
                VERIFIED REGISTRATIONS
              </span>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2.5">
                  <FileCheck2 className="w-4 h-4 text-champagne-500" />
                  <span>
                    UDYAM: <strong className="text-ivory-100">{settings?.udyam_registration || 'UDYAM-TN-08-0090275'}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-champagne-500" />
                  <span>
                    GSTIN: <strong className="text-ivory-100">{settings?.gstin || '33BNOPK2159N1ZJ'}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Track Existing Consultation Card */}
            <div className="p-6 rounded-sm bg-white border border-graphite-600/25 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-technical text-champagne-600 font-semibold">
                  STATUS VERIFICATION
                </span>
                <Search className="w-4 h-4 text-champagne-600" />
              </div>
              <h3 className="font-heading text-lg font-bold text-graphite-800">
                Track Existing Consultation?
              </h3>
              <p className="text-xs text-graphite-600 font-light leading-relaxed">
                Check appointment confirmation status using your reference code and telephone number.
              </p>
              <button
                onClick={() => setTrackModalOpen(true)}
                className="w-full h-12 inline-flex items-center justify-center gap-2 px-5 rounded-sm bg-ivory-50 hover:bg-ivory-100 text-graphite-800 text-xs font-mono uppercase tracking-technical border border-graphite-600/30 transition-colors font-medium"
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
