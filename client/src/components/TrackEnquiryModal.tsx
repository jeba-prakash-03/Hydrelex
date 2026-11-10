import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, CheckCircle2, Clock, Calendar, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../lib/api';
import { formatDate } from '../lib/utils';

interface TrackEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackEnquiryModal: React.FC<TrackEnquiryModalProps> = ({ isOpen, onClose }) => {
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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-amber-50 text-amber-800 border border-amber-200 text-xs font-mono">
            <Clock className="w-3.5 h-3.5" />
            Pending Engineer Review
          </span>
        );
      case 'CONTACTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-blue-50 text-blue-800 border border-blue-200 text-xs font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Engineer Contacted
          </span>
        );
      case 'APPOINTMENT_SCHEDULED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono">
            <Calendar className="w-3.5 h-3.5" />
            Consultation Confirmed
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-zinc-100 text-zinc-800 border border-zinc-300 text-xs font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-gray-100 text-gray-800 text-xs font-mono">
            {status}
          </span>
        );
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleModalClose}
          className="fixed inset-0 bg-arch-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative w-full max-w-lg bg-arch-ivory rounded-sm shadow-architectural-dark border border-arch-steel/60 overflow-hidden z-10 my-8 text-arch-graphite"
        >
          <button
            onClick={handleModalClose}
            className="absolute top-5 right-5 z-20 p-2 rounded-sm bg-arch-ivoryAlt text-arch-slate hover:text-arch-black transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-10 space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-arch-copper font-semibold block">
                REFERENCE TRACKING // CONSULTATIONS
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-arch-black mt-1">
                Track Consultation Status
              </h3>
              <p className="text-xs text-arch-slate mt-1 font-light">
                Verify appointment scheduling and view engineering notes using your reference code.
              </p>
            </div>

            <form onSubmit={handleTrack} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-arch-graphite mb-1.5 font-medium">
                  Reference Code (e.g. HYD-2611-1234)*
                </label>
                <input
                  type="text"
                  value={referenceNo}
                  onChange={(e) => setReferenceNo(e.target.value)}
                  placeholder="HYD-XXXX-XXXX"
                  className="w-full px-4 py-3 rounded-sm border border-arch-ivoryBorder bg-white text-arch-black font-mono text-sm uppercase focus:outline-none focus:border-arch-copper"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-arch-graphite mb-1.5 font-medium">
                  Registered Telephone Number*
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 8939359592"
                  className="w-full px-4 py-3 rounded-sm border border-arch-ivoryBorder bg-white text-arch-black text-sm focus:outline-none focus:border-arch-copper"
                />
              </div>

              {error && (
                <div className="p-3.5 rounded-sm bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-arch-black text-arch-champagne hover:bg-arch-graphite font-mono text-xs uppercase tracking-architectural shadow-sm disabled:opacity-50"
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
                className="p-5 rounded-sm bg-white border border-arch-ivoryBorder space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between pb-3 border-b border-arch-ivoryBorder">
                  <div>
                    <span className="text-[10px] font-mono text-arch-slate uppercase">Reference ID</span>
                    <div className="font-mono text-sm font-bold text-arch-black">
                      {enquiryData.referenceNo}
                    </div>
                  </div>
                  <div>{getStatusBadge(enquiryData.status)}</div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <span className="text-arch-slate block text-[10px]">CATEGORY:</span>
                    <strong>{enquiryData.enquiryType}</strong>
                  </div>
                  <div>
                    <span className="text-arch-slate block text-[10px]">EQUIPMENT:</span>
                    <strong>{enquiryData.productServiceInterest}</strong>
                  </div>
                  <div>
                    <span className="text-arch-slate block text-[10px]">SITE LOCATION:</span>
                    <strong>{enquiryData.location}</strong>
                  </div>
                  <div>
                    <span className="text-arch-slate block text-[10px]">SUBMISSION:</span>
                    <strong>{formatDate(enquiryData.createdAt)}</strong>
                  </div>
                </div>

                <div className="p-3 rounded-sm bg-arch-ivoryAlt border border-arch-ivoryBorder text-xs font-mono space-y-1">
                  <div className="text-arch-copper font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Requested Consultation Window:</span>
                  </div>
                  <div className="text-arch-graphite">
                    {formatDate(enquiryData.requestedDate)} ({enquiryData.requestedTime})
                  </div>
                  {enquiryData.confirmedDate && (
                    <div className="text-emerald-800 text-[11px] pt-1 border-t border-arch-ivoryBorder">
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
