import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface MobileActionBarProps {
  hidden?: boolean;
  onOpenQuoteModal: () => void;
}

/**
 * Sticky mobile/tablet bottom action bar (<1024px only).
 * Provides instant tap-to-call and quote request with safe-area padding.
 */
export const MobileActionBar: React.FC<MobileActionBarProps> = ({
  hidden = false,
  onOpenQuoteModal,
}) => {
  const { settings } = useSettings();
  const primaryPhone = settings?.phone_primary || '8939359592';

  if (hidden) return null;

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 w-full bg-ink-900 border-t-2 border-copper-500 px-4 py-2 shadow-2xl"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      role="region"
      aria-label="Quick Contact Actions"
    >
      <div className="flex items-center gap-2.5 min-h-[44px]">
        <a
          href={`tel:${primaryPhone}`}
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 px-3 rounded-sm bg-teal-900 hover:bg-teal-700 border border-teal-500/60 text-ivory-50 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors active:scale-[0.98]"
        >
          <Phone className="w-4 h-4 text-amber-300 shrink-0" />
          <span>Call Now</span>
        </a>

        <button
          type="button"
          onClick={onOpenQuoteModal}
          className="flex-[1.3] min-h-[44px] inline-flex items-center justify-center gap-2 px-3 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors active:scale-[0.98] shadow-copper-glow-sm"
        >
          <span>Request a Quote</span>
          <ArrowRight className="w-4 h-4 text-ink-950 shrink-0" />
        </button>
      </div>
    </div>
  );
};

