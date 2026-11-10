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
}) => {
  // Disallow external hotlinks (e.g. Unsplash) per Section 7 Image Policy.
  // Only valid local assets or deliberate vector line-arts are permitted.
  const isInvalidUrl =
    !src ||
    src.includes('unsplash.com') ||
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.trim() === '';

  const [imageFailed, setImageFailed] = useState<boolean>(isInvalidUrl);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Sync state if src prop changes dynamically after API fetch
  React.useEffect(() => {
    if (isInvalidUrl) {
      setImageFailed(true);
    }
  }, [src, isInvalidUrl]);

  const shouldShowFallback = isInvalidUrl || imageFailed;

  return (
    <div
      className={`relative w-full overflow-hidden bg-graphite-900 ${aspectRatioClass} ${className}`}
      style={{ backgroundColor: '#141416' }}
    >
      {/* Fallback Architectural Visual Canvas in Vivid Steel + Copper */}
      {shouldShowFallback ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none bg-graphite-900 border border-graphite-700/60">
          <div className="w-full h-full max-h-[78%] max-w-[78%] flex items-center justify-center opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
            <LiftLineArtSvg type={fallbackType} strokeColor="#E8782E" />
          </div>
          {fallbackLabel && (
            <div className="mt-2 font-sans text-[11px] tracking-[0.14em] uppercase text-steel-300 font-bold border-t border-graphite-700 pt-1.5 px-3">
              {fallbackLabel}
            </div>
          )}
        </div>
      ) : (
        /* Real Image with onError Handler */
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
      )}

      {/* Guaranteed Contrast Overlay: Heavy dark gradient ensures text remains 100% readable */}
      {showOverlay && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(10, 10, 11, 0.25) 0%, rgba(10, 10, 11, 0.65) 60%, rgba(10, 10, 11, 0.95) 100%)',
          }}
        />
      )}
    </div>
  );
};

