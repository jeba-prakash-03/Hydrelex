import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { EnquiryForm } from '../EnquiryForm';
import { Surface } from './Surface';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialInterest?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialInterest,
}) => {
  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto"
        >
          {/* Backdrop: Solid dark overlay (no blur artifacts) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink-950/95"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl z-10 my-auto"
          >
            <Surface
              tone="dark"
              as="div"
              className="w-full rounded-sm shadow-2xl border border-[var(--border)] border-t-[4px] border-t-copper-500 overflow-hidden"
            >
              {/* Top Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 transition-colors shadow-copper-glow"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 font-bold" />
              </button>

              <div className="max-h-[92dvh] lg:max-h-[85vh] overflow-y-auto">
                <EnquiryForm initialInterest={initialInterest} themeMode="dark" isModal />
              </div>
            </Surface>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
