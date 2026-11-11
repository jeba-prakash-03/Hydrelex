import React, { useState } from 'react';
import { LiftLineArtSvg, LiftType } from './LiftLineArtSvg';

interface ImageWithFallbackProps {
  src?: string | null;
  alt: string;
  fallbackType?: LiftType;
  fallbackLabel?: string;
  aspectRatioClass?: string;
  priority?: boolean;
  className?: string;
  showOverlay?: boolean;
  transparentBg?: boolean;
  strokeColor?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackType = 'passenger',
  fallbackLabel,
  aspectRatioClass = 'aspect-[16/10]',
  priority = false,
  className = '',
  showOverlay = true,
  transparentBg = false,
  strokeColor,
}) => {
  const isInvalidUrl =
    !src ||
    src.includes('unsplash.com') ||
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.trim() === '';

  const [imageFailed, setImageFailed] = useState<boolean>(isInvalidUrl);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  React.useEffect(() => {
    if (isInvalidUrl) {
      setImageFailed(true);
    }
  }, [src, isInvalidUrl]);

  const shouldShowFallback = isInvalidUrl || imageFailed;
  const resolvedStroke = strokeColor || 'currentColor';

  return (
    <div
      className={`relative w-full overflow-hidden ${
        transparentBg ? 'bg-transparent' : 'bg-[var(--bg-elevated,#073842)]'
      } ${aspectRatioClass} ${className}`}
    >
      {/* Fallback Architectural Visual Canvas */}
      {shouldShowFallback ? (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none ${
            transparentBg ? 'bg-transparent' : 'bg-[var(--bg-elevated,#073842)] border border-[var(--border)]'
          }`}
        >
          <div className="w-full h-full max-h-[78%] max-w-[78%] flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
            <LiftLineArtSvg type={fallbackType} strokeColor={resolvedStroke} />
          </div>
          {fallbackLabel && (
            <div className="mt-2 font-sans text-[11px] tracking-[0.14em] uppercase text-[var(--fg-muted)] font-bold border-t border-[var(--border)] pt-1.5 px-3">
              {fallbackLabel}
            </div>
          )}
        </div>
      ) : (
        /* Real Image with onError Handler */
        <>
          <img
            src={src!}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            onLoad={() => setIsLoaded(true)}
            onError={() => setImageFailed(true)}
            className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {/* Guaranteed Contrast Overlay over real photography */}
          {showOverlay && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(15, 20, 22, 0.35) 0%, rgba(15, 20, 22, 0.72) 55%, rgba(15, 20, 22, 0.96) 100%)',
              }}
            />
          )}
        </>
      )}
    </div>
  );
};
