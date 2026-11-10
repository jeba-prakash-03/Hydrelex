import React from 'react';

interface TechnicalEyebrowProps {
  children: React.ReactNode;
  variant?: 'champagne' | 'silver' | 'graphite' | 'muted';
  hasIndicator?: boolean;
  className?: string;
}

export const TechnicalEyebrow: React.FC<TechnicalEyebrowProps> = ({
  children,
  variant = 'champagne',
  hasIndicator = true,
  className = '',
}) => {
  const variantStyles = {
    champagne: 'text-champagne-500',
    silver: 'text-silver-400',
    graphite: 'text-graphite-600',
    muted: 'text-silver-400/70',
  };

  const dotStyles = {
    champagne: 'bg-champagne-500',
    silver: 'bg-silver-400',
    graphite: 'bg-graphite-600',
    muted: 'bg-silver-400/60',
  };

  return (
    <div
      className={`inline-flex items-center gap-2.5 font-mono text-[11px] sm:text-xs tracking-technical uppercase font-medium select-none ${variantStyles[variant]} ${className}`}
    >
      {hasIndicator && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotStyles[variant]}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </div>
  );
};
