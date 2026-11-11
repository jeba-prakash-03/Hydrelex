import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, CheckCircle2, Clock, Calendar, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../lib/api';
import { formatDate } from '../lib/utils';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';
import { Surface } from './ui/Surface';

interface TrackEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackEnquiryModal: React.FC<TrackEnquiryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [referenceNo, setReferenceNo] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enquiryData, setEnquiryData] = useState<any | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceNo.trim() || !phone.trim()) {
      setError('Please provide both Reference Number and Phone Number.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setEnquiryData(null);
      const res: any = await api.trackEnquiry(referenceNo.trim(), phone.trim());
      if (res.success && res.enquiry) {
        setEnquiryData(res.enquiry);
      } else {
        setError(res.message || 'No record found matching the details provided.');
      }
    } catch (err: any) {
      setError(err.message || 'Unable to retrieve status. Please verify your reference number.');
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setReferenceNo('');
    setPhone('');
    setError(null);
    setEnquiryData(null);
    onClose();
  };

  if (!isOpen) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-amber-500 text-ink-950 font-bold text-xs font-mono">
            <Clock className="w-3.5 h-3.5" />
            Pending Engineer Review
          </span>
        );
      case 'CONTACTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-teal-700 text-ivory-50 font-bold border border-teal-500/40 text-xs font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Engineer Contacted
          </span>
        );
      case 'APPOINTMENT_SCHEDULED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-mint-100 text-teal-900 font-bold text-xs font-mono">
            <Calendar className="w-3.5 h-3.5" />
            Consultation Confirmed
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-sand-100 text-ink-900 font-bold text-xs font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-ivory-100 text-ink-900 font-bold text-xs font-mono">
            {status}
          </span>
        );
    }
  };

  const inputClasses =
    'w-full h-14 px-4 text-sm font-sans bg-ink-900 border border-teal-500/40 rounded-xs text-surface-fg placeholder:text-surface-muted/60 focus:border-copper-500 focus:ring-2 focus:ring-copper-500/30 outline-none transition-colors';
  const labelClasses =
    'block font-sans text-[12px] uppercase tracking-[0.14em] text-surface-fg mb-2 font-bold';

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleModalClose}
          className="fixed inset-0 bg-ink-950/95"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-lg z-10 my-8"
        >
          <Surface
            tone="dark"
            as="div"
            className="w-full rounded-sm shadow-2xl border border-[var(--border)] border-t-[4px] border-t-copper-500 overflow-hidden"
          >
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 transition-colors shadow-copper-glow"
              aria-label="Close"
            >
              <X className="w-5 h-5 font-bold" />
            </button>

            <div className="p-6 sm:p-10 space-y-6">
              <div className="space-y-2">
                <TechnicalEyebrow variant="auto">
                  REFERENCE TRACKING // CONSULTATIONS
                </TechnicalEyebrow>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-surface-heading">
                  Track Consultation Status
                </h3>
                <p className="text-xs sm:text-sm text-surface-muted font-normal">
                  Verify appointment scheduling and view engineering updates using your reference code.
                </p>
              </div>

              <form onSubmit={handleTrack} className="space-y-4">
                <div>
                  <label className={labelClasses}>
                    Reference Code (e.g. HYD-XXXX-XXXX)*
                  </label>
                  <input
                    type="text"
                    value={referenceNo}
                    onChange={(e) => setReferenceNo(e.target.value)}
                    placeholder="HYD-XXXX-XXXX"
                    className={`${inputClasses} font-mono uppercase tracking-wider`}
                  />
                </div>

                <div>
                  <label className={labelClasses}>
                    Registered Telephone Number*
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="8939359592"
                    className={inputClasses}
                  />
                </div>

                {error && (
                  <div className="p-3.5 rounded-sm bg-danger-500 text-white text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 inline-flex items-center justify-center gap-2 px-6 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 font-sans text-[13px] font-bold uppercase tracking-[0.12em] shadow-copper-glow disabled:opacity-50 transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying Database...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Search Record</span>
                    </>
                  )}
                </button>
              </form>

              {/* Status Record Result */}
              {enquiryData && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-sm bg-teal-900 border border-teal-500/40 space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                    <div>
                      <span className="text-[10px] font-mono text-surface-muted uppercase tracking-technical">
                        Reference ID
                      </span>
                      <div className="font-mono text-base font-bold text-amber-300">
                        {enquiryData.referenceNo}
                      </div>
                    </div>
                    <div>{getStatusBadge(enquiryData.status)}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-surface-muted block text-[10px]">CATEGORY:</span>
                      <strong className="text-surface-heading">{enquiryData.enquiryType}</strong>
                    </div>
                    <div>
                      <span className="text-surface-muted block text-[10px]">EQUIPMENT:</span>
                      <strong className="text-surface-heading">{enquiryData.productServiceInterest}</strong>
                    </div>
                    <div>
                      <span className="text-surface-muted block text-[10px]">SITE LOCATION:</span>
                      <strong className="text-surface-heading">{enquiryData.location}</strong>
                    </div>
                    <div>
                      <span className="text-surface-muted block text-[10px]">SUBMISSION:</span>
                      <strong className="text-surface-heading">{formatDate(enquiryData.createdAt)}</strong>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-sm bg-ink-900 border border-[var(--border)] text-xs font-mono space-y-1.5">
                    <div className="text-amber-300 font-semibold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Requested Consultation Window:</span>
                    </div>
                    <div className="text-surface-fg">
                      {formatDate(enquiryData.requestedDate)} ({enquiryData.requestedTime})
                    </div>
                    {enquiryData.confirmedDate && (
                      <div className="text-mint-100 font-semibold text-[11px] pt-1.5 border-t border-[var(--border)]">
                        Confirmed by Staff: {formatDate(enquiryData.confirmedDate)} at {enquiryData.confirmedTime}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </Surface>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
