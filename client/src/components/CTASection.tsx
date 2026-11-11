import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';
import { Surface } from './ui/Surface';

export const CTASection: React.FC = () => {
  const { settings } = useSettings();

  return (
    <Surface
      tone="copper"
      as="section"
      className="w-full py-24 sm:py-32 relative overflow-hidden border-t-[4px] border-t-teal-900 shadow-2xl bg-gradient-to-br from-copper-500 via-copper-500 to-amber-500"
    >
      <div className="absolute inset-0 bg-technical-grid-light opacity-20 pointer-events-none" />

      <div className="w-full px-fluid relative z-10">
        <div className="max-w-4xl space-y-8">
          <TechnicalEyebrow variant="graphite">
            CONNECT WITH ENGINEERING
          </TechnicalEyebrow>

          <h2 className="text-3xl sm:text-4xl lg:text-[54px] font-heading font-black tracking-tight text-surface-heading uppercase leading-[1.02]">
            {settings?.contact_cta_headline ? (
              settings.contact_cta_headline
            ) : (
              <>
                LET'S MOVE YOUR PROJECT <span className="bg-ink-900 text-amber-400 px-3 py-0.5 rounded-xs inline-block">FORWARD</span>.
              </>
            )}
          </h2>

          <p className="text-base sm:text-xl text-surface-fg font-medium max-w-2xl leading-relaxed">
            {settings?.contact_cta_subtext ||
              "Connect with our vertical mobility specialists in Sriperumbudur for a technical consultation tailored to your facility's elevator demands."}
          </p>

          {/* Action Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
            <Link
              to="/contact#consultation"
              className="inline-flex items-center justify-center gap-3 px-10 h-14 rounded-sm bg-ink-900 hover:bg-teal-900 text-amber-300 font-sans text-[13px] font-bold uppercase tracking-[0.12em] transition-all shadow-lg active:scale-[0.98]"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </Link>

            <a
              href={`tel:${settings?.phone_primary || '8939359592'}`}
              className="inline-flex items-center justify-center gap-3 px-8 h-14 rounded-sm bg-white hover:bg-sand-100 border border-ink-900/30 text-ink-900 font-sans text-[13px] font-bold uppercase tracking-[0.12em] transition-all shadow-sm"
            >
              <Phone className="w-4 h-4 text-copper-700" />
              <span>Call +91 {settings?.phone_primary || '8939359592'}</span>
            </a>
          </div>

          <div className="pt-8 border-t border-ink-900/20 text-xs font-sans font-bold text-surface-fg flex flex-wrap items-center gap-6">
            <span className="font-mono">UDYAM: {settings?.udyam_registration || 'UDYAM-TN-08-0090275'}</span>
            <span>•</span>
            <span className="font-mono">GSTIN: {settings?.gstin || '33BNOPK2159N1ZJ'}</span>
            <span>•</span>
            <span>SRIPERUMBUDUR TALUK, TAMIL NADU 602015</span>
          </div>
        </div>
      </div>
    </Surface>
  );
};
