import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, CheckCircle2, Clock, Calendar, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../lib/api';
import { formatDate } from '../lib/utils';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';

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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-mono">
            <Clock className="w-3.5 h-3.5" />
            Pending Engineer Review
          </span>
        );
      case 'CONTACTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-blue-500/15 text-blue-300 border border-blue-500/30 text-xs font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Engineer Contacted
          </span>
        );
      case 'APPOINTMENT_SCHEDULED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-mono">
            <Calendar className="w-3.5 h-3.5" />
            Consultation Confirmed
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-silver-400/15 text-silver-400 border border-silver-400/30 text-xs font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-graphite-600 text-silver-400 text-xs font-mono">
            {status}
          </span>
        );
    }
  };

  const inputClasses =
    'w-full h-14 px-4 text-sm font-sans bg-graphite-900 border border-steel-300/40 rounded-xs text-steel-100 placeholder:text-steel-300/40 focus:border-copper-500 focus:ring-2 focus:ring-copper-500/30 outline-none transition-colors';
  const labelClasses =
    'block font-sans text-[12px] uppercase tracking-[0.14em] text-steel-300 mb-2 font-bold';

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
          className="relative w-full max-w-lg bg-graphite-900 text-steel-100 rounded-sm shadow-2xl border border-graphite-700 border-t-2 border-t-copper-500 overflow-hidden z-10 my-8"
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
              <TechnicalEyebrow variant="copper">
                REFERENCE TRACKING // CONSULTATIONS
              </TechnicalEyebrow>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-steel-100">
                Track Consultation Status
              </h3>
              <p className="text-xs sm:text-sm text-steel-300 font-light">
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
                <div className="p-3.5 rounded-sm bg-danger-500/15 border border-danger-500 text-danger-500 text-xs font-mono flex items-center gap-2">
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
                className="p-5 rounded-sm bg-ink-950 border border-graphite-700 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between pb-3 border-b border-graphite-700">
                  <div>
                    <span className="text-[10px] font-mono text-steel-300 uppercase tracking-technical">
                      Reference ID
                    </span>
                    <div className="font-mono text-base font-bold text-copper-500">
                      {enquiryData.referenceNo}
                    </div>
                  </div>
                  <div>{getStatusBadge(enquiryData.status)}</div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <span className="text-steel-300/70 block text-[10px]">CATEGORY:</span>
                    <strong className="text-steel-100">{enquiryData.enquiryType}</strong>
                  </div>
                  <div>
                    <span className="text-steel-300/70 block text-[10px]">EQUIPMENT:</span>
                    <strong className="text-steel-100">{enquiryData.productServiceInterest}</strong>
                  </div>
                  <div>
                    <span className="text-steel-300/70 block text-[10px]">SITE LOCATION:</span>
                    <strong className="text-steel-100">{enquiryData.location}</strong>
                  </div>
                  <div>
                    <span className="text-steel-300/70 block text-[10px]">SUBMISSION:</span>
                    <strong className="text-steel-100">{formatDate(enquiryData.createdAt)}</strong>
                  </div>
                </div>

                <div className="p-3.5 rounded-sm bg-graphite-900 border border-graphite-700 text-xs font-mono space-y-1.5">
                  <div className="text-copper-500 font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Requested Consultation Window:</span>
                  </div>
                  <div className="text-steel-300">
                    {formatDate(enquiryData.requestedDate)} ({enquiryData.requestedTime})
                  </div>
                  {enquiryData.confirmedDate && (
                    <div className="text-emerald-400 text-[11px] pt-1.5 border-t border-graphite-700">
                      Confirmed by Staff: {formatDate(enquiryData.confirmedDate)} at {enquiryData.confirmedTime}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
