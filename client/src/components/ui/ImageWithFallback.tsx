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
  // If the source is an external URL that might be unreliable (e.g. Unsplash) or empty,
  // or if image loading fails, we immediately render our deliberate line-art architectural fallback.
  const isInvalidUrl = !src || src.includes('unsplash.com') || src.trim() === '';
  const [imageFailed, setImageFailed] = useState<boolean>(isInvalidUrl);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <div
      className={`relative w-full overflow-hidden bg-graphite-800 ${aspectRatioClass} ${className}`}
      style={{ backgroundColor: '#1C1C1E' }}
    >
      {/* Fallback Architectural Visual Canvas */}
      {imageFailed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none bg-graphite-800 border border-graphite-600/50">
          <div className="w-full h-full max-h-[75%] max-w-[75%] flex items-center justify-center opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
            <LiftLineArtSvg type={fallbackType} strokeColor="#B08D57" />
          </div>
          {fallbackLabel && (
            <div className="mt-2 font-mono text-[10px] tracking-technical uppercase text-silver-400/80 font-medium border-t border-graphite-600/60 pt-1.5 px-3">
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

      {/* Guaranteed Contrast Overlay: Heavy dark gradient ensures white/ivory text remains 100% readable */}
      {showOverlay && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(14, 14, 15, 0.3) 0%, rgba(14, 14, 15, 0.65) 60%, rgba(14, 14, 15, 0.95) 100%)',
          }}
        />
      )}
    </div>
  );
};

