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
import { SectionDivider } from '../components/ui/SectionDivider';
import { Surface } from '../components/ui/Surface';
import { MapPin, Phone, Mail, Clock, FileCheck2, ShieldCheck } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export const HomePage: React.FC = () => {
  const { settings } = useSettings();

  return (
    <div className="w-full overflow-x-hidden space-y-0">
      {/* 1. HERO (Deep Teal #0B4F5C, animated lift engine) */}
      <Hero />

      {/* Ticker Marquee 1 */}
      <CopperMarquee text="PASSENGER LIFTS • GOODS LIFTS • HYDRAULIC PLATFORMS • SCISSOR SYSTEMS • PANORAMIC LIFTS • MODERNIZATION" />

      {/* 2. COMPANY INTRO (Warm Sand #F6E9D7) */}
      <CompanyIntro />

      {/* Stepped Divider: Sand -> Ink Dark */}
      <SectionDivider topColor="#F6E9D7" bottomColor="#0F1416" variant="diagonal-down" accentLineColor="#E8782E" />

      {/* 3. PRODUCTS (Ink Dark #0F1416 with 6 individually color-blocked product tiles) */}
      <ProductsSection limit={6} />

      {/* Ticker Marquee 2 */}
      <CopperMarquee
        tone="amber"
        text="SRIPERUMBUDUR ENGINEERING FACILITY • UDYAM-TN-08-0090275 • GSTIN 33BNOPK2159N1ZJ • VERIFIED INDUSTRIAL COMPLIANCE"
      />

      {/* 4. ENGINEERING & SERVICES (Mint Tint #D9EEE6) */}
      <ServicesSection />

      {/* Stepped Divider: Mint -> Copper */}
      <SectionDivider topColor="#D9EEE6" bottomColor="#E8782E" variant="stepped" accentLineColor="#073842" />

      {/* 5. WHY CHOOSE US (Copper Orange #E8782E with ink text & dark/amber pillars) */}
      <WhyChooseUs />

      {/* Diagonal Divider: Copper -> Ivory */}
      <SectionDivider topColor="#E8782E" bottomColor="#FBF8F2" variant="diagonal-up" accentLineColor="#0B4F5C" />

      {/* 6. PROJECTS GALLERY (Ivory #FBF8F2 with colored category chips) */}
      <ProjectsGallery />

      {/* Diagonal Divider: Ivory -> Deep Teal */}
      <SectionDivider topColor="#FBF8F2" bottomColor="#0B4F5C" variant="diagonal-down" accentLineColor="#F6B93B" />

      {/* 7. REVIEWS (Deep Teal #0B4F5C with amber stars & giant amber quote) */}
      <CustomerReviews />

      {/* Stepped Divider: Deep Teal -> Amber Gold */}
      <SectionDivider topColor="#073842" bottomColor="#F6B93B" variant="stepped" accentLineColor="#E8782E" />

      {/* 8. CONTACT / ENQUIRY (Bold AMBER GOLD full-bleed background with ink text & ink form panel) */}
      <Surface
        tone="amber"
        as="section"
        id="consultation"
        className="w-full py-24 sm:py-32 relative overflow-hidden border-t border-amber-600/30 shadow-2xl bg-gradient-to-br from-amber-500 via-amber-500 to-copper-500"
      >
        {/* Subtle Decorative Technical Overlay */}
        <div className="absolute inset-0 bg-technical-grid-light opacity-20 pointer-events-none" />

        {/* Oversized Outlined Wordmark Behind Text */}
        <div
          aria-hidden="true"
          className="absolute -bottom-10 right-4 text-[18vw] font-heading font-black select-none pointer-events-none leading-none opacity-15"
          style={{
            WebkitTextStroke: '2px #0F1416',
            color: 'transparent',
          }}
        >
          CONTACT
        </div>

        <div className="w-full px-fluid relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
            {/* Left Column: Headline & Verified Facility Coordinates in Ink Box (5 cols) */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xs bg-ink-900 text-amber-300 font-sans text-[11px] font-bold uppercase tracking-[0.16em] shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  INITIATE PROJECT // CONSULTATION
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-heading font-black text-surface-heading tracking-tight leading-[1.02]">
                  Start Your <span className="underline decoration-ink-900/40 underline-offset-8">Project</span>.
                </h2>

                <p className="text-base sm:text-lg text-surface-fg font-medium max-w-xl leading-relaxed">
                  Connect with our Sriperumbudur vertical mobility engineering office. We provide technical site feasibility assessments, structural load calculations, and tailored quotation proposals.
                </p>
              </div>

              {/* Verified Contact Details Box (Solid Dark Ink Surface for Maximum Contrast) */}
              <Surface tone="dark" as="div" className="p-6 sm:p-8 rounded-sm border border-teal-500/20 shadow-2xl space-y-6">
                <div className="font-sans text-[11px] uppercase tracking-[0.15em] text-amber-500 font-bold border-b border-[var(--border)] pb-3 flex items-center justify-between">
                  <span>HEADQUARTERS & MANUFACTURING HUB</span>
                  <span className="font-mono text-surface-muted">TN-602015</span>
                </div>

                <div className="space-y-4 font-sans text-xs text-surface-muted">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-copper-400 shrink-0 mt-0.5" />
                    <address className="not-italic leading-relaxed text-xs sm:text-sm text-surface-fg">
                      {settings?.address_line1 || 'No B3-G4, Arakonam Road'},<br />
                      {settings?.address_line2 || 'Mevallurkuppam Village'},<br />
                      {settings?.city || 'Sriperumbudur Taluk'} – {settings?.pincode || '602015'},<br />
                      {settings?.state || 'Tamil Nadu'}, {settings?.country || 'India'}.
                    </address>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-copper-400 shrink-0" />
                    <div>
                      <a
                        href={`tel:${settings?.phone_primary || '8939359592'}`}
                        className="hover:text-amber-300 text-surface-fg font-mono font-bold text-sm"
                      >
                        +91 {settings?.phone_primary || '8939359592'}
                      </a>
                      <span className="mx-2 text-surface-muted">/</span>
                      <a
                        href={`tel:${settings?.phone_secondary || '9789397504'}`}
                        className="hover:text-amber-300 text-surface-fg font-mono font-bold text-sm"
                      >
                        +91 {settings?.phone_secondary || '9789397504'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-copper-400 shrink-0" />
                    <a
                      href={`mailto:${settings?.email || 'info@hydrelex.com'}`}
                      className="hover:text-amber-300 text-surface-fg font-mono"
                    >
                      {settings?.email || 'info@hydrelex.com'}
                    </a>
                  </div>

                  <div className="flex items-start gap-3 pt-1">
                    <Clock className="w-4 h-4 text-copper-400 shrink-0 mt-0.5" />
                    <div className="text-surface-muted leading-relaxed text-[11px]">
                      {settings?.business_hours || 'Monday – Saturday: 9:00 AM – 6:30 PM (Sunday Closed)'}
                    </div>
                  </div>
                </div>

                {/* Verified Reg Badges */}
                <div className="pt-4 border-t border-[var(--border)] flex flex-wrap gap-2 text-[10px] font-mono">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-teal-900 border border-teal-500/30 text-surface-fg">
                    <FileCheck2 className="w-3.5 h-3.5 text-amber-500" />
                    UDYAM: {settings?.udyam_registration || 'UDYAM-TN-08-0090275'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-teal-900 border border-teal-500/30 text-surface-fg">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    GSTIN: {settings?.gstin || '33BNOPK2159N1ZJ'}
                  </span>
                </div>
              </Surface>
            </div>

            {/* Right Column: Consultation Form in Large Ink Panel (7 cols) */}
            <div className="lg:col-span-7">
              <EnquiryForm themeMode="dark" />
            </div>
          </div>
        </div>
      </Surface>
    </div>
  );
};
