import React from 'react';

const defaultItems = [
  'PASSENGER LIFTS',
  'GOODS / FREIGHT LIFTS',
  'HEAVY HYDRAULIC PLATFORMS',
  'SCISSOR LIFT SYSTEMS',
  'CUSTOM PANORAMIC LIFTS',
  'VVVF INVERTER MODERNIZATION',
  'SRIPERUMBUDUR MANUFACTURING',
  'UDYAM & GST REGISTERED',
];

interface CopperMarqueeProps {
  className?: string;
  items?: string[];
  text?: string;
}

export const CopperMarquee: React.FC<CopperMarqueeProps> = ({
  className = '',
  items: propItems,
  text,
}) => {
  const displayItems = text
    ? text.split('•').map((s) => s.trim()).filter(Boolean)
    : propItems || defaultItems;

  return (
    <div
      className={`w-full bg-copper-500 text-ink-950 py-3 overflow-hidden select-none relative z-20 border-y border-copper-400 font-sans font-bold text-xs sm:text-sm tracking-[0.14em] uppercase ${className}`}
      aria-hidden="true"
    >
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {/* Sequence 1 */}
        <div className="flex items-center gap-8 shrink-0">
          {displayItems.map((item, idx) => (
            <span key={`seq1-${idx}`} className="flex items-center gap-8">
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-ink-950 shrink-0" />
            </span>
          ))}
        </div>
        {/* Sequence 2 for continuous seamless loop */}
        <div className="flex items-center gap-8 shrink-0 ml-8">
          {displayItems.map((item, idx) => (
            <span key={`seq2-${idx}`} className="flex items-center gap-8">
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-ink-950 shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
