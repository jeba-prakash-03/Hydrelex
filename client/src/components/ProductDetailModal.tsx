import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, Gauge, Cpu, Weight } from 'lucide-react';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './ui/ImageWithFallback';
import { LiftType } from './ui/LiftLineArtSvg';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';

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
        {/* Backdrop (Solid Dark Overlay without Blur) */}
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
          className="relative w-full max-w-4xl bg-graphite-900 text-steel-100 rounded-sm shadow-2xl border border-graphite-700 border-t-2 border-t-copper-500 overflow-hidden z-10 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 transition-colors shadow-copper-glow"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 font-bold" />
          </button>

          {/* Modal Header Visual Banner */}
          <div className="relative h-64 sm:h-72 w-full bg-ink-950 overflow-hidden">
            <ImageWithFallback
              src={product.image_url}
              alt={product.title}
              fallbackType={fallbackType}
              fallbackLabel={product.category}
              aspectRatioClass="h-full w-full"
              showOverlay={true}
            />

            <div className="absolute bottom-6 left-6 right-6 text-steel-100 space-y-2 z-10">
              <span className="text-[11px] font-sans uppercase tracking-[0.14em] px-3 py-1 rounded-xs bg-copper-500 text-ink-950 font-bold">
                {product.category}
              </span>
              <h3 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight">
                {product.title}
              </h3>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-10 space-y-8 max-h-[55vh] overflow-y-auto">
            {/* Overview */}
            <div className="space-y-2">
              <TechnicalEyebrow variant="copper">
                ENGINEERING SPECIFICATION & SCOPE
              </TechnicalEyebrow>
              <p className="text-sm sm:text-base text-steel-300 leading-relaxed font-light font-sans">
                {product.description}
              </p>
            </div>

            {/* Technical Parameters Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-sm bg-ink-950 border border-graphite-700">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-steel-300 font-sans uppercase tracking-[0.1em]">
                  <Weight className="w-3.5 h-3.5 text-copper-500" />
                  <span>Payload Rating</span>
                </div>
                <div className="font-heading text-sm font-bold text-steel-100">
                  {product.capacity || 'Engineered per site requirement'}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-steel-300 font-sans uppercase tracking-[0.1em]">
                  <Gauge className="w-3.5 h-3.5 text-copper-500" />
                  <span>Velocity Range</span>
                </div>
                <div className="font-heading text-sm font-bold text-steel-100">
                  {product.speed || 'Site Configurable'}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-steel-300 font-sans uppercase tracking-[0.1em]">
                  <Cpu className="w-3.5 h-3.5 text-copper-500" />
                  <span>Drive Topology</span>
                </div>
                <div className="font-heading text-sm font-bold text-steel-100">
                  {product.drive_system || 'Traction / Electro-Hydraulic'}
                </div>
              </div>
            </div>

            {/* Features List */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-3">
                <TechnicalEyebrow variant="copper">
                  SAFETY SYSTEMS & STRUCTURAL INTEGRATION
                </TechnicalEyebrow>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-steel-300 font-sans"
                    >
                      <div className="p-0.5 rounded-xs bg-copper-500/20 text-copper-500 mt-0.5 shrink-0">
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
          <div className="p-6 sm:p-8 bg-ink-950 border-t border-graphite-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-sans text-steel-300/80">
              Bespoke structural adaptation available for non-standard civil dimensions.
            </span>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-sm border border-graphite-700 text-xs font-sans uppercase tracking-[0.12em] text-steel-300 hover:text-steel-100 hover:bg-graphite-700/50 transition-colors"
              >
                Close
              </button>
              <Link
                to={`/contact?interest=${encodeURIComponent(product.title)}#consultation`}
                onClick={onClose}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 text-xs font-sans font-bold uppercase tracking-[0.12em] transition-all shadow-copper-glow"
              >
                <span>Request Quotation</span>
                <ArrowRight className="w-3.5 h-3.5 text-ink-950" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
