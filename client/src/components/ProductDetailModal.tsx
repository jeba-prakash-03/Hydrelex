import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, Gauge, Cpu, Weight } from 'lucide-react';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './ui/ImageWithFallback';
import { LiftType } from './ui/LiftLineArtSvg';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';
import { Surface } from './ui/Surface';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

function getFallbackType(product: Product): LiftType {
  const text = `${product.title} ${product.category} ${product.slug}`.toLowerCase();
  if (text.includes('freight') || text.includes('goods')) return 'freight';
  if (text.includes('scissor') || text.includes('dock')) return 'scissor';
  if (text.includes('hydraulic')) return 'hydraulic';
  if (text.includes('panoramic') || text.includes('glass')) return 'panoramic';
  if (text.includes('inverter') || text.includes('modern')) return 'inverter';
  return 'passenger';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  if (!product) return null;

  const fallbackType = getFallbackType(product);

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-ink-950/95"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl z-10 my-8"
        >
          <Surface
            tone="dark"
            as="div"
            className="w-full rounded-sm shadow-2xl border border-[var(--border)] border-t-[4px] border-t-copper-500 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 transition-colors shadow-copper-glow"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 font-bold" />
            </button>

            {/* Modal Header Visual Banner */}
            <Surface tone="teal" as="div" className="relative h-56 sm:h-72 w-full overflow-hidden">
              <ImageWithFallback
                src={product.image_url}
                alt={product.title}
                fallbackType={fallbackType}
                aspectRatioClass="h-full w-full"
                strokeColor="#F6B93B"
                showOverlay={false}
              />

              {/* Guaranteed dark contrast scrim protecting title text */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(7, 56, 66, 0.15) 0%, rgba(10, 10, 11, 0.72) 55%, rgba(10, 10, 11, 0.94) 100%)',
                }}
              />

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-ivory-50 space-y-2 z-10">
                <span className="inline-block text-xs lg:text-[11px] font-sans uppercase tracking-[0.14em] px-3 py-1 rounded-xs bg-copper-500 text-ink-950 font-bold">
                  {product.category}
                </span>
                <h3 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                  {product.title}
                </h3>
              </div>
            </Surface>

            {/* Modal Body */}
            <div className="p-5 sm:p-10 space-y-6 sm:space-y-8 max-h-[52dvh] sm:max-h-[55vh] overflow-y-auto">
              {/* Overview */}
              <div className="space-y-2">
                <TechnicalEyebrow variant="auto">
                  ENGINEERING SPECIFICATION & SCOPE
                </TechnicalEyebrow>
                <p className="text-base text-surface-fg leading-relaxed font-normal font-sans">
                  {product.description}
                </p>
              </div>

              {/* Technical Parameters Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 sm:p-5 rounded-sm bg-teal-900 border border-teal-500/30">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-sans uppercase tracking-[0.1em] font-bold">
                    <Weight className="w-3.5 h-3.5 text-amber-500" />
                    <span>Payload Rating</span>
                  </div>
                  <div className="font-heading text-sm font-bold text-surface-heading">
                    {product.capacity || 'Engineered per site requirement'}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-sans uppercase tracking-[0.1em] font-bold">
                    <Gauge className="w-3.5 h-3.5 text-amber-500" />
                    <span>Velocity Range</span>
                  </div>
                  <div className="font-heading text-sm font-bold text-surface-heading">
                    {product.speed || 'Site Configurable'}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-sans uppercase tracking-[0.1em] font-bold">
                    <Cpu className="w-3.5 h-3.5 text-amber-500" />
                    <span>Drive Topology</span>
                  </div>
                  <div className="font-heading text-sm font-bold text-surface-heading">
                    {product.drive_system || 'Traction / Electro-Hydraulic'}
                  </div>
                </div>
              </div>

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-3">
                  <TechnicalEyebrow variant="auto">
                    SAFETY SYSTEMS & STRUCTURAL INTEGRATION
                  </TechnicalEyebrow>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-sm lg:text-xs text-surface-fg font-sans"
                      >
                        <div className="p-0.5 rounded-xs bg-amber-500 text-ink-950 mt-0.5 shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="leading-relaxed font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-8 bg-ink-950 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-sans text-surface-muted text-center sm:text-left">
                Bespoke structural adaptation available for non-standard civil dimensions.
              </span>

              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="min-h-[48px] lg:min-h-[44px] px-5 py-2.5 rounded-sm border border-[var(--border)] text-xs font-sans uppercase tracking-[0.12em] text-surface-muted hover:text-surface-heading hover:bg-teal-900/50 transition-colors"
                >
                  Close
                </button>
                <Link
                  to={`/contact?interest=${encodeURIComponent(product.title)}#consultation`}
                  onClick={onClose}
                  className="flex-1 sm:flex-none min-h-[48px] lg:min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 text-xs font-sans font-bold uppercase tracking-[0.12em] transition-all shadow-copper-glow"
                >
                  <span>Request Quotation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-ink-950" />
                </Link>
              </div>
            </div>
          </Surface>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
