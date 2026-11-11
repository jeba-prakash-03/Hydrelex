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
  tone?: 'copper' | 'amber' | 'teal';
}

export const CopperMarquee: React.FC<CopperMarqueeProps> = ({
  className = '',
  items: propItems,
  text,
  tone = 'copper',
}) => {
  const displayItems = text
    ? text.split('•').map((s) => s.trim()).filter(Boolean)
    : propItems || defaultItems;

  const toneClasses = {
    copper: 'bg-copper-500 text-ink-950 border-copper-400',
    amber: 'bg-amber-500 text-ink-950 border-amber-300',
    teal: 'bg-teal-900 text-amber-300 border-teal-500/40',
  };

  const dotClasses = {
    copper: 'bg-ink-950',
    amber: 'bg-ink-950',
    teal: 'bg-copper-500',
  };

  return (
    <div
      className={`w-full py-3 overflow-hidden select-none relative z-20 border-y font-sans font-bold text-xs sm:text-sm tracking-[0.14em] uppercase ${toneClasses[tone]} ${className}`}
      aria-hidden="true"
    >
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {/* Sequence 1 */}
        <div className="flex items-center gap-8 shrink-0">
          {displayItems.map((item, idx) => (
            <span key={`seq1-${idx}`} className="flex items-center gap-8">
              <span>{item}</span>
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClasses[tone]}`} />
            </span>
          ))}
        </div>
        {/* Sequence 2 for continuous seamless loop */}
        <div className="flex items-center gap-8 shrink-0 ml-8">
          {displayItems.map((item, idx) => (
            <span key={`seq2-${idx}`} className="flex items-center gap-8">
              <span>{item}</span>
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClasses[tone]}`} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
