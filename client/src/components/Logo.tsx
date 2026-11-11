import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  showTagline = true,
  className = '',
}) => {
  const isLight = variant === 'light'; // Light text for dark/teal backgrounds

  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3.5 select-none ${className}`}
      aria-label="HYDRELEX LIFT SYSTEMS Home"
    >
      {/* Real Emblem Mark Container */}
      <div className="relative flex items-center justify-center w-11 h-11 rounded-sm bg-ink-900 border border-teal-500/40 group-hover:border-amber-500 transition-colors duration-300 p-1 shrink-0 shadow-sm">
        <img
          src="/logo_emblem.png"
          alt="HYDRELEX Emblem"
          className="w-full h-full object-contain filter brightness-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (!target.src.includes('logo_transparent.png')) {
              target.src = '/logo_transparent.png';
            }
          }}
        />
        {/* Architectural indicator point */}
        <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-copper-500 rounded-full shadow-copper-glow" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <span
            className={`font-heading text-lg sm:text-xl tracking-tight font-extrabold transition-colors duration-200 ${
              isLight
                ? 'text-ivory-50 group-hover:text-amber-300'
                : 'text-ink-900 group-hover:text-copper-700'
            }`}
          >
            HYDRELEX
          </span>
          <span className="text-[9px] font-sans tracking-widest uppercase font-bold px-1.5 py-0.5 rounded-xs bg-teal-900 text-amber-300 border border-amber-500/40">
            SYSTEMS
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[9px] font-sans tracking-[0.14em] uppercase mt-0.5 font-bold ${
              isLight ? 'text-mint-100' : 'text-teal-900'
            }`}
          >
            A way to reach a goal
          </span>
        )}
      </div>
    </Link>
  );
};
