import React from 'react';
import { Hero } from '../components/Hero';
import { CompanyIntro } from '../components/CompanyIntro';
import { ProductsSection } from '../components/ProductsSection';
import { ServicesSection } from '../components/ServicesSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ProjectsGallery } from '../components/ProjectsGallery';
import { CustomerReviews } from '../components/CustomerReviews';
import { EnquiryForm } from '../components/EnquiryForm';
import { CopperMarquee } from '../components/ui/CopperMarquee';
import { MapPin, Phone, Mail, Clock, FileCheck2, ShieldCheck } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export const HomePage: React.FC = () => {
  const { settings } = useSettings();

  return (
    <div className="w-full overflow-x-hidden space-y-0">
      {/* 1. HERO (Dark, 100svh split with animated lift engine) */}
      <Hero />

      {/* Ticker Marquee 1 */}
      <CopperMarquee text="PASSENGER LIFTS • GOODS LIFTS • HYDRAULIC PLATFORMS • SCISSOR SYSTEMS • PANORAMIC LIFTS • MODERNIZATION" />

      {/* 2. COMPANY INTRO (Ivory brushed-metal, 50/50 split with blueprint cross-section) */}
      <CompanyIntro />

      {/* 3. PRODUCTS (Dark graphite, 6 systems asymmetric grid with copper top-borders) */}
      <ProductsSection limit={6} />

      {/* Ticker Marquee 2 */}
      <CopperMarquee text="SRIPERUMBUDUR ENGINEERING FACILITY • UDYAM-TN-08-0090275 • GSTIN 33BNOPK2159N1ZJ • VERIFIED INDUSTRIAL COMPLIANCE" />

      {/* 4. ENGINEERING & SERVICES (Ivory, asymmetric 2-column with CAD diagram) */}
      <ServicesSection />

      {/* 5. WHY CHOOSE US (Ink black, full-bleed copper ticker band + offset pillars) */}
      <WhyChooseUs />

      {/* 6. PROJECTS GALLERY (Ivory, asymmetric masonry & copper lightbox) */}
      <ProjectsGallery />

      {/* 7. REVIEWS (Graphite, huge 200px copper quotation mark + serif quote) */}
      <CustomerReviews />

      {/* 8. CONTACT / ENQUIRY (Bold COPPER full-bleed background with ink text & ink form panel) */}
      <section
        id="consultation"
        className="w-full bg-copper-500 text-ink-950 py-24 sm:py-32 relative overflow-hidden border-t-2 border-copper-400 shadow-2xl"
        style={{ backgroundColor: '#E8782E' }}
      >
        {/* Subtle Decorative Technical Overlay */}
        <div className="absolute inset-0 bg-technical-grid opacity-15 pointer-events-none" />

        {/* Oversized Outlined Wordmark Behind Text */}
        <div
          aria-hidden="true"
          className="absolute -bottom-10 right-4 text-[18vw] font-heading font-black select-none pointer-events-none leading-none opacity-15"
          style={{
            WebkitTextStroke: '2px #0A0A0B',
            color: 'transparent',
          }}
        >
          CONTACT
        </div>

        <div className="w-full px-fluid relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
            {/* Left Column: Headline & Verified Facility Coordinates in Ink-950 Box (5 cols) */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
              <div className="space-y-4 text-ink-950">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xs bg-ink-950 text-copper-400 font-sans text-[11px] font-bold uppercase tracking-[0.16em] shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-copper-400 animate-pulse" />
                  INITIATE PROJECT // CONSULTATION
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-heading font-black text-ink-950 tracking-tight leading-[1.02]">
                  Start Your <span className="underline decoration-ink-950/40 underline-offset-8">Project</span>.
                </h2>

                <p className="text-base sm:text-lg text-ink-950/90 font-medium max-w-xl leading-relaxed">
                  Connect with our Sriperumbudur vertical mobility engineering office. We provide technical site feasibility assessments, structural load calculations, and tailored quotation proposals.
                </p>
              </div>

              {/* Verified Contact Details Box (Solid Ink-950 Panel for Maximum Contrast) */}
              <div className="p-6 sm:p-8 rounded-sm bg-ink-950 text-steel-100 border border-ink-950 shadow-2xl space-y-6">
                <div className="font-sans text-[11px] uppercase tracking-[0.15em] text-copper-400 font-bold border-b border-graphite-700 pb-3 flex items-center justify-between">
                  <span>HEADQUARTERS & MANUFACTURING HUB</span>
                  <span className="font-mono text-steel-300">TN-602015</span>
                </div>

                <div className="space-y-4 font-sans text-xs text-steel-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-copper-500 shrink-0 mt-0.5" />
                    <address className="not-italic leading-relaxed text-xs sm:text-sm text-steel-100">
                      {settings?.address_line1 || 'No B3-G4, Arakonam Road'},<br />
                      {settings?.address_line2 || 'Mevallurkuppam Village'},<br />
                      {settings?.city || 'Sriperumbudur Taluk'} – {settings?.pincode || '602015'},<br />
                      {settings?.state || 'Tamil Nadu'}, {settings?.country || 'India'}.
                    </address>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-copper-500 shrink-0" />
                    <div>
                      <a
                        href={`tel:${settings?.phone_primary || '8939359592'}`}
                        className="hover:text-copper-400 text-steel-100 font-mono font-bold text-sm"
                      >
                        +91 {settings?.phone_primary || '8939359592'}
                      </a>
                      <span className="mx-2 text-graphite-600">/</span>
                      <a
                        href={`tel:${settings?.phone_secondary || '9789397504'}`}
                        className="hover:text-copper-400 text-steel-100 font-mono font-bold text-sm"
                      >
                        +91 {settings?.phone_secondary || '9789397504'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-copper-500 shrink-0" />
                    <a
                      href={`mailto:${settings?.email || 'info@hydrelex.com'}`}
                      className="hover:text-copper-400 text-steel-100 font-mono"
                    >
                      {settings?.email || 'info@hydrelex.com'}
                    </a>
                  </div>

                  <div className="flex items-start gap-3 pt-1">
                    <Clock className="w-4 h-4 text-copper-500 shrink-0 mt-0.5" />
                    <div className="text-steel-300 leading-relaxed text-[11px]">
                      {settings?.business_hours || 'Monday – Saturday: 9:00 AM – 6:30 PM (Sunday Closed)'}
                    </div>
                  </div>
                </div>

                {/* Verified Reg Badges */}
                <div className="pt-4 border-t border-graphite-700 flex flex-wrap gap-2 text-[10px] font-mono">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-graphite-900 border border-graphite-700 text-steel-100">
                    <FileCheck2 className="w-3.5 h-3.5 text-copper-500" />
                    UDYAM: {settings?.udyam_registration || 'UDYAM-TN-08-0090275'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-graphite-900 border border-graphite-700 text-steel-100">
                    <ShieldCheck className="w-3.5 h-3.5 text-copper-500" />
                    GSTIN: {settings?.gstin || '33BNOPK2159N1ZJ'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Consultation Form in Large Ink Panel (7 cols) */}
            <div className="lg:col-span-7">
              <EnquiryForm themeMode="dark" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
