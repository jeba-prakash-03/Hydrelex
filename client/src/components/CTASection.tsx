import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';

export const CTASection: React.FC = () => {
  const { settings } = useSettings();

  return (
    <section
      className="w-full bg-ink-900 text-ivory-100 py-24 sm:py-32 relative overflow-hidden border-t border-graphite-600/60"
      style={{ backgroundColor: '#0E0E0F' }}
    >
      <div className="w-full px-fluid relative z-10">
        <div className="max-w-4xl space-y-8">
          <TechnicalEyebrow variant="champagne">
            CONNECT WITH ENGINEERING
          </TechnicalEyebrow>

          <h2 className="font-h2-clamp font-extrabold tracking-tight uppercase leading-[1.02]">
            {settings?.contact_cta_headline || "LET'S MOVE YOUR PROJECT FORWARD."}
          </h2>

          <p className="text-base sm:text-xl text-silver-400 font-light max-w-2xl leading-relaxed">
            {settings?.contact_cta_subtext ||
              "Connect with our vertical mobility specialists in Sriperumbudur for a technical consultation tailored to your facility's elevator demands."}
          </p>

          {/* Action Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
            <Link
              to="/contact#consultation"
              className="inline-flex items-center justify-center gap-3 px-10 h-14 rounded-sm bg-champagne-500 hover:bg-champagne-600 text-ink-900 font-mono text-xs font-bold uppercase tracking-technical transition-all shadow-sm active:scale-[0.98]"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${settings?.phone_primary || '8939359592'}`}
              className="inline-flex items-center justify-center gap-3 px-8 h-14 rounded-sm bg-graphite-800 hover:bg-graphite-600 border border-graphite-600 text-ivory-100 font-mono text-xs uppercase tracking-technical transition-all"
            >
              <Phone className="w-4 h-4 text-champagne-500" />
              <span>Call +91 {settings?.phone_primary || '8939359592'}</span>
            </a>
          </div>

          <div className="pt-8 border-t border-graphite-600/50 text-xs font-mono text-silver-400/80 flex flex-wrap items-center gap-6">
            <span>UDYAM: {settings?.udyam_registration || 'UDYAM-TN-08-0090275'}</span>
            <span>•</span>
            <span>GSTIN: {settings?.gstin || '33BNOPK2159N1ZJ'}</span>
            <span>•</span>
            <span>SRIPERUMBUDUR TALUK, TAMIL NADU 602015</span>
          </div>
        </div>
      </div>
    </section>
  );
};
