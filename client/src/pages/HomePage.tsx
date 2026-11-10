import React from 'react';
import { Hero } from '../components/Hero';
import { CompanyIntro } from '../components/CompanyIntro';
import { ProductsSection } from '../components/ProductsSection';
import { ServicesSection } from '../components/ServicesSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ProjectsGallery } from '../components/ProjectsGallery';
import { CustomerReviews } from '../components/CustomerReviews';
import { EnquiryForm } from '../components/EnquiryForm';
import { TechnicalEyebrow } from '../components/ui/TechnicalEyebrow';
import { MapPin, Phone, Mail, Clock, FileCheck2, ShieldCheck } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export const HomePage: React.FC = () => {
  const { settings } = useSettings();

  return (
    <div className="w-full overflow-x-hidden space-y-0">
      {/* 1. HERO (Dark, 100svh) */}
      <Hero />

      {/* 2. COMPANY INTRO (Ivory, 50/50 split) */}
      <CompanyIntro />

      {/* 3. PRODUCTS (Graphite, 6 systems asymmetric grid) */}
      <ProductsSection limit={6} />

      {/* 4. ENGINEERING & SERVICES (Ivory, asymmetric 2-column with shaft diagram) */}
      <ServicesSection />

      {/* 5. WHY CHOOSE US (Black, offset grid with faint numerals 01-04) */}
      <WhyChooseUs />

      {/* 6. PROJECTS GALLERY (Ivory, asymmetric masonry & lightbox) */}
      <ProjectsGallery />

      {/* 7. REVIEWS (Graphite, featured review + horizontal snap row) */}
      <CustomerReviews />

      {/* 8. CONTACT / ENQUIRY (Full-Bleed Dark Block) */}
      <section
        id="consultation"
        className="w-full bg-ink-900 text-ivory-100 py-24 sm:py-32 relative overflow-hidden border-t border-graphite-600/60"
        style={{ backgroundColor: '#0E0E0F' }}
      >
        <div className="w-full px-fluid relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
            {/* Left Column: Headline & Verified Facility Coordinates (5 cols) */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
              <div className="space-y-4">
                <TechnicalEyebrow variant="champagne">
                  INITIATE PROJECT // CONSULTATION
                </TechnicalEyebrow>
                <h2 className="font-h2-clamp font-extrabold text-ivory-100 tracking-tight leading-[1.02]">
                  Start Your Project.
                </h2>
                <p className="text-base sm:text-lg text-silver-400 font-light leading-relaxed">
                  Connect with our Sriperumbudur vertical mobility engineering office. We provide technical site feasibility assessments, structural load calculations, and tailored quotation proposals.
                </p>
              </div>

              {/* Verified Contact Details Box */}
              <div className="p-6 sm:p-8 rounded-sm bg-graphite-800 border border-graphite-600 space-y-5">
                <div className="font-mono text-[11px] uppercase tracking-technical text-champagne-500 font-semibold border-b border-graphite-600/60 pb-3">
                  HEADQUARTERS & MANUFACTURING FACILITY
                </div>

                <div className="space-y-4 font-mono text-xs text-silver-400">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-champagne-500 shrink-0 mt-0.5" />
                    <address className="not-italic leading-relaxed font-sans text-xs sm:text-sm text-ivory-100">
                      {settings?.address_line1 || 'No B3-G4, Arakonam Road'},<br />
                      {settings?.address_line2 || 'Mevallurkuppam Village'},<br />
                      {settings?.city || 'Sriperumbudur Taluk'} – {settings?.pincode || '602015'},<br />
                      {settings?.state || 'Tamil Nadu'}, {settings?.country || 'India'}.
                    </address>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-champagne-500 shrink-0" />
                    <div>
                      <a href={`tel:${settings?.phone_primary || '8939359592'}`} className="hover:text-champagne-500 text-ivory-100 font-bold">
                        +91 {settings?.phone_primary || '8939359592'}
                      </a>
                      <span className="mx-2 text-graphite-600">/</span>
                      <a href={`tel:${settings?.phone_secondary || '9789397504'}`} className="hover:text-champagne-500 text-ivory-100 font-bold">
                        +91 {settings?.phone_secondary || '9789397504'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-champagne-500 shrink-0" />
                    <a href={`mailto:${settings?.email || 'info@hydrelex.com'}`} className="hover:text-champagne-500 text-ivory-100">
                      {settings?.email || 'info@hydrelex.com'}
                    </a>
                  </div>

                  <div className="flex items-start gap-3 pt-1">
                    <Clock className="w-4 h-4 text-champagne-500 shrink-0 mt-0.5" />
                    <div className="text-silver-400/80 leading-relaxed text-[11px]">
                      {settings?.business_hours || 'Monday – Saturday: 9:00 AM – 6:30 PM (Sunday Closed)'}
                    </div>
                  </div>
                </div>

                {/* Verified Reg Badges */}
                <div className="pt-3 border-t border-graphite-600/60 flex flex-wrap gap-2 text-[10px] font-mono">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-ink-900 border border-graphite-600 text-silver-400">
                    <FileCheck2 className="w-3.5 h-3.5 text-champagne-500" />
                    UDYAM: {settings?.udyam_registration || 'UDYAM-TN-08-0090275'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-ink-900 border border-graphite-600 text-silver-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-champagne-500" />
                    GSTIN: {settings?.gstin || '33BNOPK2159N1ZJ'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Redesigned Consultation Form (7 cols) */}
            <div className="lg:col-span-7">
              <EnquiryForm themeMode="dark" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
