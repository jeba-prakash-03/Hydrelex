import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';

export const CTASection: React.FC = () => {
  const { settings } = useSettings();

  return (
    <section
      className="w-full bg-ink-950 text-steel-100 py-24 sm:py-32 relative overflow-hidden border-t-2 border-t-copper-500 shadow-2xl"
      style={{ backgroundColor: '#0A0A0B' }}
    >
      {/* Decorative Technical Background Overlay */}
      <div className="absolute inset-0 bg-technical-grid opacity-20 pointer-events-none" />

      <div className="w-full px-fluid relative z-10">
        <div className="max-w-4xl space-y-8">
          <TechnicalEyebrow variant="copper">
            CONNECT WITH ENGINEERING
          </TechnicalEyebrow>

          <h2 className="text-3xl sm:text-4xl lg:text-[54px] font-heading font-black tracking-tight text-steel-100 uppercase leading-[1.02]">
            {settings?.contact_cta_headline ? (
              settings.contact_cta_headline
            ) : (
              <>
                LET'S MOVE YOUR PROJECT <span className="text-copper-500">FORWARD</span>.
              </>
            )}
          </h2>

          <p className="text-base sm:text-xl text-steel-300 font-light max-w-2xl leading-relaxed">
            {settings?.contact_cta_subtext ||
              "Connect with our vertical mobility specialists in Sriperumbudur for a technical consultation tailored to your facility's elevator demands."}
          </p>

          {/* Action Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
            <Link
              to="/contact#consultation"
              className="inline-flex items-center justify-center gap-3 px-10 h-14 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 font-sans text-[13px] font-bold uppercase tracking-[0.12em] transition-all shadow-copper-glow active:scale-[0.98]"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 text-ink-950" />
            </Link>

            <a
              href={`tel:${settings?.phone_primary || '8939359592'}`}
              className="inline-flex items-center justify-center gap-3 px-8 h-14 rounded-sm bg-graphite-900 hover:bg-graphite-700 border border-graphite-700 text-steel-100 font-sans text-[13px] uppercase tracking-[0.12em] transition-all"
            >
              <Phone className="w-4 h-4 text-copper-500" />
              <span>Call +91 {settings?.phone_primary || '8939359592'}</span>
            </a>
          </div>

          <div className="pt-8 border-t border-graphite-700 text-xs font-sans text-steel-300/80 flex flex-wrap items-center gap-6">
            <span className="font-mono">UDYAM: {settings?.udyam_registration || 'UDYAM-TN-08-0090275'}</span>
            <span>•</span>
            <span className="font-mono">GSTIN: {settings?.gstin || '33BNOPK2159N1ZJ'}</span>
            <span>•</span>
            <span>SRIPERUMBUDUR TALUK, TAMIL NADU 602015</span>
          </div>
        </div>
      </div>
    </section>
  );
};
