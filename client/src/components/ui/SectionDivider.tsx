import React from 'react';

interface SectionDividerProps {
  topColor: string;
  bottomColor: string;
  variant?: 'diagonal-down' | 'diagonal-up' | 'stepped';
  accentLineColor?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  topColor,
  bottomColor,
  variant = 'diagonal-down',
  accentLineColor,
}) => {
  return (
    <div
      className="w-full overflow-hidden leading-none select-none pointer-events-none relative"
      style={{ backgroundColor: bottomColor, height: '42px', marginTop: '-1px' }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 42"
        preserveAspectRatio="none"
        className="w-full h-full block"
      >
        {variant === 'diagonal-down' && (
          <>
            <polygon points="0,0 1440,0 1440,8 0,42" fill={topColor} />
            {accentLineColor && (
              <line x1="0" y1="41" x2="1440" y2="7" stroke={accentLineColor} strokeWidth="2.5" />
            )}
          </>
        )}
        {variant === 'diagonal-up' && (
          <>
            <polygon points="0,0 1440,0 1440,42 0,8" fill={topColor} />
            {accentLineColor && (
              <line x1="0" y1="7" x2="1440" y2="41" stroke={accentLineColor} strokeWidth="2.5" />
            )}
          </>
        )}
        {variant === 'stepped' && (
          <>
            <polygon points="0,0 1440,0 1440,14 760,14 720,38 0,38" fill={topColor} />
            {accentLineColor && (
              <polyline points="0,38 720,38 760,14 1440,14" fill="none" stroke={accentLineColor} strokeWidth="2.5" />
            )}
          </>
        )}
      </svg>
    </div>
  );
};

