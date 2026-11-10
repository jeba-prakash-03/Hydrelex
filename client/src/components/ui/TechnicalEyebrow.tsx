import React from 'react';

interface TechnicalEyebrowProps {
  children: React.ReactNode;
  variant?: 'copper' | 'steel' | 'graphite' | 'muted';
  hasIndicator?: boolean;
  className?: string;
}

export const TechnicalEyebrow: React.FC<TechnicalEyebrowProps> = ({
  children,
  variant = 'copper',
  hasIndicator = true,
  className = '',
}) => {
  const variantStyles = {
    copper: 'text-copper-500',
    steel: 'text-steel-300',
    graphite: 'text-copper-700', // High-contrast on light ivory
    muted: 'text-steel-300/80',
  };

  const dotStyles = {
    copper: 'bg-copper-500 shadow-[0_0_8px_rgba(232,120,46,0.8)]',
    steel: 'bg-steel-300',
    graphite: 'bg-copper-700',
    muted: 'bg-steel-300/60',
  };

  return (
    <div
      className={`inline-flex items-center gap-2.5 font-sans text-[12.5px] sm:text-[13px] tracking-[0.12em] uppercase font-semibold select-none ${variantStyles[variant]} ${className}`}
    >
      {hasIndicator && (
        <span
          className={`w-2 h-2 rounded-full shrink-0 ${dotStyles[variant]}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </div>
  );
};
