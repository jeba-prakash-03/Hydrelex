import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, Gauge, Cpu, Weight, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { Link } from 'react-router-dom';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-arch-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-arch-ivory rounded-sm shadow-architectural-dark border border-arch-steel/60 overflow-hidden z-10 my-8 text-arch-graphite"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-sm bg-arch-black/80 text-white hover:bg-arch-black transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header Image */}
          <div className="relative h-72 sm:h-80 w-full bg-arch-black overflow-hidden">
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-arch-black via-arch-black/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-ultra-wide px-2.5 py-1 rounded-sm bg-arch-champagne text-arch-black font-semibold">
                {product.category}
              </span>
              <h3 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">
                {product.title}
              </h3>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-10 space-y-8 max-h-[60vh] overflow-y-auto">
            {/* Overview */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-arch-copper font-semibold block">
                ENGINEERING SPECIFICATION & SCOPE
              </span>
              <p className="text-sm sm:text-base text-arch-graphite leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Technical Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-sm bg-white border border-arch-ivoryBorder shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-arch-slate font-mono uppercase">
                  <Weight className="w-3.5 h-3.5 text-arch-copper" />
                  <span>Payload Rating</span>
                </div>
                <div className="font-heading text-sm font-bold text-arch-graphite">
                  {product.capacity || 'Engineered per site requirement'}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-arch-slate font-mono uppercase">
                  <Gauge className="w-3.5 h-3.5 text-arch-copper" />
                  <span>Velocity Range</span>
                </div>
                <div className="font-heading text-sm font-bold text-arch-graphite">
                  {product.speed || 'Site Configurable'}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-arch-slate font-mono uppercase">
                  <Cpu className="w-3.5 h-3.5 text-arch-copper" />
                  <span>Drive Topology</span>
                </div>
                <div className="font-heading text-sm font-bold text-arch-graphite">
                  {product.drive_system || 'Traction / Electro-Hydraulic'}
                </div>
              </div>
            </div>

            {/* Features List */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-arch-copper font-semibold block">
                  SAFETY SYSTEMS & STRUCTURAL INTEGRATION
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-arch-graphite font-sans">
                      <div className="p-0.5 rounded-sm bg-arch-champagne/20 text-arch-champagneDark mt-0.5 shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-6 sm:p-8 bg-arch-ivoryAlt border-t border-arch-ivoryBorder flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono text-arch-slate">
              Bespoke shaft engineering available for non-standard civil dimensions.
            </span>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-sm border border-arch-steel/30 text-xs font-mono uppercase tracking-wider text-arch-graphite hover:bg-white transition-colors"
              >
                Close
              </button>
              <Link
                to={`/contact?interest=${encodeURIComponent(product.title)}#consultation`}
                onClick={onClose}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm bg-arch-graphite hover:bg-arch-black text-white text-xs font-mono uppercase tracking-architectural transition-all shadow-sm"
              >
                <span>Request Quotation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
