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
  const isLight = variant === 'light'; // Light text for dark backgrounds

  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3.5 select-none ${className}`}
      aria-label="HYDRELEX LIFT SYSTEMS Home"
    >
      {/* Real Emblem Mark Container */}
      <div className="relative flex items-center justify-center w-11 h-11 rounded-sm bg-ink-950 border border-graphite-700 group-hover:border-copper-500 transition-colors duration-300 p-1.5 shrink-0 shadow-sm">
        <img
          src="/logo_transparent.png"
          alt="HYDRELEX Emblem"
          className="w-full h-full object-contain filter brightness-105"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
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
                ? 'text-steel-100 group-hover:text-copper-400'
                : 'text-graphite-900 group-hover:text-copper-700'
            }`}
          >
            HYDRELEX
          </span>
          <span className="text-[9px] font-sans tracking-widest uppercase font-bold px-1.5 py-0.5 rounded-xs bg-ink-950 text-copper-500 border border-copper-500/30">
            SYSTEMS
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[9px] font-sans tracking-[0.14em] uppercase mt-0.5 font-bold ${
              isLight ? 'text-steel-300' : 'text-graphite-700'
            }`}
          >
            A way to reach a goal
          </span>
        )}
      </div>
    </Link>
  );
};
