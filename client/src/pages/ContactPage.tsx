import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  FileCheck2,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { EnquiryForm } from '../components/EnquiryForm';
import { TrackEnquiryModal } from '../components/TrackEnquiryModal';

export const ContactPage: React.FC = () => {
  const { settings } = useSettings();
  const [searchParams] = useSearchParams();
  const initialInterest = searchParams.get('interest') || undefined;
  const [trackModalOpen, setTrackModalOpen] = useState(false);

  return (
    <div className="w-full bg-arch-ivory text-arch-graphite overflow-x-hidden">
      {/* Header Banner (Full Width) */}
      <section className="w-full bg-arch-black text-white pt-36 pb-20 relative overflow-hidden border-b border-arch-steel/30">
        <div className="absolute inset-0 bg-blueprint-grid opacity-15" />
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10 space-y-4">
          <span className="text-[10px] font-mono tracking-ultra-wide uppercase text-arch-champagne font-semibold block">
            FACILITY COMMUNICATIONS // CONSULTATION
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[1.02]">
            Connect With HYDRELEX
          </h1>
          <p className="text-base sm:text-xl text-arch-sand/80 max-w-3xl font-light leading-relaxed">
            Headquartered in Sriperumbudur, Tamil Nadu. Reach out for site surveys, custom engineering quotes, maintenance proposals, or appointment scheduling.
          </p>
        </div>
      </section>

      {/* Main Full-Width Content */}
      <section className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20">
          {/* Left Column: Verified Contact Details & Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono tracking-ultra-wide uppercase text-arch-copper font-semibold block">
                HEADQUARTERS & MANUFACTURING
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-arch-black leading-tight">
                Operations & Factory Facility
              </h2>
              <p className="text-sm text-arch-slate font-light leading-relaxed">
                Centrally located on Arakonam Road in Sriperumbudur industrial belt, supporting fast deployment of engineering staff and genuine components.
              </p>
            </div>

            {/* Contact Details Stack */}
            <div className="space-y-4">
              <div className="p-6 rounded-sm bg-white border border-arch-ivoryBorder shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-sm bg-arch-ivory text-arch-copper border border-arch-ivoryBorder shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1 font-mono text-xs">
                  <div className="uppercase text-arch-copper font-bold text-[10px]">Registered Facility Address</div>
                  <address className="not-italic font-sans text-xs sm:text-sm font-normal text-arch-black leading-relaxed">
                    {settings?.address_line1 || 'No B3-G4, Arakonam Road'},<br />
                    {settings?.address_line2 || 'Mevallurkuppam Village'},<br />
                    {settings?.city || 'Sriperumbudur Taluk'} – {settings?.pincode || '602015'},<br />
                    {settings?.state || 'Tamil Nadu'}, {settings?.country || 'India'}.
                  </address>
                </div>
              </div>

              <div className="p-6 rounded-sm bg-white border border-arch-ivoryBorder shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-sm bg-arch-ivory text-arch-copper border border-arch-ivoryBorder shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1 font-mono text-xs">
                  <div className="uppercase text-arch-copper font-bold text-[10px]">Direct Telephones</div>
                  <div>
                    <a href={`tel:${settings?.phone_primary || '8939359592'}`} className="hover:text-arch-copper font-bold text-sm text-arch-black">
                      +91 {settings?.phone_primary || '8939359592'}
                    </a>
                  </div>
                  <div>
                    <a href={`tel:${settings?.phone_secondary || '9789397504'}`} className="hover:text-arch-copper font-bold text-sm text-arch-black">
                      +91 {settings?.phone_secondary || '9789397504'}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-sm bg-white border border-arch-ivoryBorder shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-sm bg-arch-ivory text-arch-copper border border-arch-ivoryBorder shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1 font-mono text-xs">
                  <div className="uppercase text-arch-copper font-bold text-[10px]">Official Correspondence</div>
                  <div className="text-sm font-semibold text-arch-black">
                    <a href={`mailto:${settings?.email || 'info@hydrelex.com'}`} className="hover:text-arch-copper">
                      {settings?.email || 'info@hydrelex.com'}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-sm bg-white border border-arch-ivoryBorder shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-sm bg-arch-ivory text-arch-copper border border-arch-ivoryBorder shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1 font-mono text-xs">
                  <div className="uppercase text-arch-copper font-bold text-[10px]">Working Hours</div>
                  <div className="text-xs text-arch-slate">
                    {settings?.business_hours || 'Monday – Saturday: 9:00 AM – 6:30 PM (Sunday Closed)'}
                  </div>
                </div>
              </div>
            </div>

            {/* Official Certifications Card */}
            <div className="p-6 rounded-sm bg-arch-black text-white space-y-4 border border-arch-steel/50">
              <span className="text-[10px] font-mono tracking-ultra-wide uppercase text-arch-champagne font-semibold block">
                VERIFIED REGISTRATIONS
              </span>
              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex items-center gap-2.5">
                  <FileCheck2 className="w-4 h-4 text-arch-champagne" />
                  <span>UDYAM: <strong className="text-arch-bone">{settings?.udyam_registration || 'UDYAM-TN-08-0090275'}</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-arch-copper" />
                  <span>GSTIN: <strong className="text-arch-bone">{settings?.gstin || '33BNOPK2159N1ZJ'}</strong></span>
                </div>
              </div>
            </div>

            {/* Track Existing Consultation Card */}
            <div className="p-6 rounded-sm bg-white border border-arch-ivoryBorder shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-arch-copper font-semibold">
                  STATUS VERIFICATION
                </span>
                <Search className="w-4 h-4 text-arch-copper" />
              </div>
              <h3 className="font-heading text-lg font-bold text-arch-black">
                Existing Request?
              </h3>
              <p className="text-xs text-arch-slate font-light leading-relaxed">
                Check appointment confirmation status using your reference number and telephone.
              </p>
              <button
                onClick={() => setTrackModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-arch-ivoryAlt hover:bg-arch-ivory text-arch-black text-xs font-mono uppercase tracking-wider border border-arch-ivoryBorder transition-colors font-medium"
              >
                <span>Track By Reference Number</span>
              </button>
            </div>
          </div>

          {/* Right Column: Refined Consultation Form (7 cols) */}
          <div className="lg:col-span-7" id="consultation">
            <EnquiryForm initialInterest={initialInterest} />
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
