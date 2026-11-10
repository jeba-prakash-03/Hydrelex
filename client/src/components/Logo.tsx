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
      <div className="relative flex items-center justify-center w-11 h-11 rounded-sm bg-ink-900 border border-graphite-600 group-hover:border-champagne-500 transition-colors duration-300 p-1.5 shrink-0 shadow-sm">
        <img
          src="/logo_transparent.png"
          alt="HYDRELEX Emblem"
          className="w-full h-full object-contain filter brightness-105"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        {/* Architectural indicator point */}
        <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-champagne-500 rounded-full" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <span
            className={`font-heading text-lg sm:text-xl tracking-tight font-extrabold transition-colors duration-200 ${
              isLight
                ? 'text-ivory-100 group-hover:text-champagne-500'
                : 'text-graphite-800 group-hover:text-champagne-600'
            }`}
          >
            HYDRELEX
          </span>
          <span className="text-[9px] font-mono tracking-widest uppercase font-semibold px-1.5 py-0.5 rounded-sm bg-graphite-600/60 text-champagne-500 border border-graphite-600">
            SYSTEMS
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[9px] font-mono tracking-technical uppercase mt-0.5 font-medium ${
              isLight ? 'text-silver-400' : 'text-graphite-600'
            }`}
          >
            A way to reach a goal
          </span>
        )}
      </div>
    </Link>
  );
};
