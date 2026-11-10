import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', showTagline = true, className = '' }) => {
  const isLight = variant === 'light'; // Light text for dark backgrounds

  return (
    <Link to="/" className={`group inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* Precision Emblem Mark */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-sm bg-arch-black border border-arch-steel/80 group-hover:border-arch-champagne/80 transition-all duration-300 p-1.5 shadow-sm">
        <img
          src="/logo_transparent.png"
          alt="HYDRELEX"
          className="w-full h-full object-contain filter drop-shadow brightness-110"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        {/* Subtle architectural vertical movement tick */}
        <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-arch-champagne rounded-full opacity-80 group-hover:scale-125 transition-transform duration-300" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <span
            className={`font-heading text-lg tracking-tight font-extrabold transition-colors duration-200 ${
              isLight ? 'text-arch-bone group-hover:text-arch-champagne' : 'text-arch-graphite group-hover:text-arch-copper'
            }`}
          >
            HYDRELEX
          </span>
          <span
            className={`text-[9px] font-mono tracking-widest uppercase font-semibold px-1.5 py-0.5 rounded-sm ${
              isLight
                ? 'bg-white/10 text-arch-champagne border border-white/15'
                : 'bg-arch-graphite text-arch-champagne border border-arch-graphite'
            }`}
          >
            SYSTEMS
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[8.5px] font-mono tracking-ultra-wide uppercase mt-0.5 font-medium ${
              isLight ? 'text-arch-sand/70' : 'text-arch-slate'
            }`}
          >
            A way to reach a goal
          </span>
        )}
      </div>
    </Link>
  );
};
