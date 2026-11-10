import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, ShieldCheck, Compass } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export const CTASection: React.FC = () => {
  const { settings } = useSettings();

  return (
    <section className="w-full bg-arch-black relative overflow-hidden text-white py-24 sm:py-32 border-t border-arch-steel/30">
      {/* Blueprint background lines */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-15 pointer-events-none" />

      {/* Full-Bleed Edge-to-Edge Container */}
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        <div className="max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2.5 text-xs font-mono tracking-ultra-wide uppercase text-arch-champagne">
            <span className="w-2 h-2 rounded-full bg-arch-champagne" />
            <span>CONNECT WITH ENGINEERING</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[0.98]">
            {settings?.contact_cta_headline || "LET'S MOVE YOUR PROJECT FORWARD."}
          </h2>

          <p className="text-base sm:text-xl text-arch-sand/85 font-light max-w-2xl leading-relaxed">
            {settings?.contact_cta_subtext ||
              "Connect with our engineering specialists in Sriperumbudur for a technical consultation tailored to your facility's vertical mobility demands."}
          </p>

          {/* Action Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
            <Link
              to="/contact#consultation"
              className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-sm bg-arch-champagne text-arch-black font-mono text-xs font-bold uppercase tracking-architectural hover:bg-arch-champagneLight transition-all shadow-sm"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${settings?.phone_primary || '8939359592'}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-sm bg-arch-graphite hover:bg-arch-charcoal text-arch-bone font-mono text-xs uppercase tracking-architectural border border-arch-steel/60 transition-all"
            >
              <Phone className="w-4 h-4 text-arch-champagne" />
              <span>Call +91 {settings?.phone_primary || '8939359592'}</span>
            </a>
          </div>

          <div className="pt-8 border-t border-arch-steel/30 text-xs font-mono text-arch-slate flex flex-wrap items-center gap-6">
            <span>UDYAM: {settings?.udyam_registration}</span>
            <span>•</span>
            <span>GSTIN: {settings?.gstin}</span>
            <span>•</span>
            <span>SRIPERUMBUDUR TALUK, TAMIL NADU 602015</span>
          </div>
        </div>
      </div>
    </section>
  );
};
