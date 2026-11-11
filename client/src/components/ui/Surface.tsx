import React from 'react';

export type SurfaceTone =
  | 'teal'
  | 'dark'
  | 'sand'
  | 'mint'
  | 'peach'
  | 'copper'
  | 'amber'
  | 'ivory'
  | 'light';

const TONE_CLASS_MAP: Record<SurfaceTone, string> = {
  teal: 'surface-teal',
  dark: 'surface-dark',
  sand: 'surface-sand',
  mint: 'surface-mint',
  peach: 'surface-peach',
  copper: 'surface-copper',
  amber: 'surface-amber',
  ivory: 'surface-ivory',
  light: 'surface-light',
};

export interface SurfaceProps extends React.HTMLAttributes<HTMLElement> {
  tone?: SurfaceTone;
  as?: 'section' | 'div' | 'article' | 'aside' | 'header' | 'footer' | 'nav' | 'main';
  children: React.ReactNode;
  className?: string;
  hasNoise?: boolean;
}

export const Surface = React.forwardRef<HTMLElement, SurfaceProps>(
  (
    {
      tone = 'dark',
      as: Component = 'section',
      children,
      className = '',
      hasNoise = false,
      style,
      ...rest
    },
    ref
  ) => {
    const toneClass = TONE_CLASS_MAP[tone];

    return (
      <Component
        ref={ref as any}
        data-surface-tone={tone}
        className={`relative ${toneClass} ${hasNoise ? 'bg-grain' : ''} ${className}`}
        style={style}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

Surface.displayName = 'Surface';
