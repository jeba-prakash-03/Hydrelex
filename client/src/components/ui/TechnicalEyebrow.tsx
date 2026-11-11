import React from 'react';

interface TechnicalEyebrowProps {
  children: React.ReactNode;
  variant?: 'copper' | 'amber' | 'teal' | 'graphite' | 'steel' | 'auto';
  hasIndicator?: boolean;
  className?: string;
}

export const TechnicalEyebrow: React.FC<TechnicalEyebrowProps> = ({
  children,
  variant = 'auto',
  hasIndicator = true,
  className = '',
}) => {
  const variantStyles = {
    auto: 'text-surface-accent',
    copper: 'text-copper-700',
    amber: 'text-amber-500',
    teal: 'text-teal-700',
    graphite: 'text-ink-900',
    steel: 'text-steel-300',
  };

  const dotStyles = {
    auto: 'bg-surface-accent shadow-sm',
    copper: 'bg-copper-700',
    amber: 'bg-amber-500 shadow-[0_0_8px_rgba(246,185,59,0.8)]',
    teal: 'bg-teal-700',
    graphite: 'bg-ink-900',
    steel: 'bg-steel-300',
  };

  return (
    <div
      className={`inline-flex items-center gap-2.5 font-sans text-[12.5px] sm:text-[13px] tracking-[0.12em] uppercase font-bold select-none ${variantStyles[variant]} ${className}`}
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
