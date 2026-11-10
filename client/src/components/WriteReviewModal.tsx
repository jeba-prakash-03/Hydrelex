import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Star, Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../lib/api';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';

const reviewFormSchema = z.object({
  customerName: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
  email: z.string().trim().email('Invalid email address').max(191).optional().or(z.literal('')),
  phone: z.string().trim().max(25).optional().or(z.literal('')),
  rating: z.number().int().min(1, 'Please select a star rating (1-5)').max(5),
  title: z.string().trim().min(3, 'Review title must be at least 3 characters').max(191),
  description: z.string().trim().min(10, 'Please share at least a few sentences regarding your experience (10+ characters)').max(2000),
  imageUrl: z.string().optional().or(z.literal('')),
  hp_website: z.string().optional(),
});

type ReviewFormData = z.infer<typeof reviewFormSchema>;

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted?: () => void;
  onSuccess?: () => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onReviewSubmitted,
  onSuccess,
}) => {
  const [selectedRating, setSelectedRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 5,
      imageUrl: '',
    },
  });

  const handleRatingClick = (r: number) => {
    setSelectedRating(r);
    setValue('rating', r);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const res = await api.uploadImage(file, 'review_image');
      if (res.success && res.url) {
        setValue('imageUrl', res.url);
        setImagePreview(res.url);
      }
    } catch (err: any) {
      alert(err.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (data: ReviewFormData) => {
    try {
      setServerError(null);
      const res = await api.submitReview(data);
      if (res.success) {
        setSubmitSuccess(true);
        if (onReviewSubmitted) onReviewSubmitted();
        if (onSuccess) onSuccess();
      } else {
        setServerError(res.message || 'Failed to submit review');
      }
    } catch (err: any) {
      setServerError(err.message || 'Error communicating with server');
    }
  };

  const handleModalClose = () => {
    reset();
    setSubmitSuccess(false);
    setServerError(null);
    setImagePreview(null);
    onClose();
  };

  if (!isOpen) return null;

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
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-xl bg-graphite-900 text-steel-100 rounded-sm shadow-2xl border border-graphite-700 border-t-2 border-t-copper-500 overflow-hidden z-10 my-8"
        >
          <button
            onClick={handleModalClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 transition-colors shadow-copper-glow"
            aria-label="Close"
          >
            <X className="w-5 h-5 font-bold" />
          </button>

          <div className="p-6 sm:p-10 max-h-[85vh] overflow-y-auto">
            {!submitSuccess ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="space-y-2">
                  <TechnicalEyebrow variant="copper">
                    CLIENT FEEDBACK // QUALITY CONTROL
                  </TechnicalEyebrow>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-steel-100">
                    Submit Client Review
                  </h3>
                  <p className="text-xs sm:text-sm text-steel-300 font-light">
                    Every review is evaluated by HYDRELEX engineering moderation before public publication.
                  </p>
                </div>

                {serverError && (
                  <div className="p-3.5 rounded-sm bg-danger-500/15 border border-danger-500 text-danger-500 text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Star Rating Evaluation (Accessible) */}
                <div>
                  <label className={labelClasses}>
                    Rating Evaluation (1 - 5 Stars)*
                  </label>
                  <div className="flex items-center gap-2" role="radiogroup" aria-label="Star Rating">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const filled = hoverRating ? hoverRating >= star : selectedRating >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => handleRatingClick(star)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleRatingClick(star);
                            }
                          }}
                          className="p-1 focus:outline-none transition-transform hover:scale-110"
                          aria-label={`${star} Stars`}
                          role="radio"
                          aria-checked={selectedRating === star}
                        >
                          <Star
                            className={`w-7 h-7 ${
                              filled
                                ? 'fill-copper-500 text-copper-500'
                                : 'text-graphite-600 fill-transparent'
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="ml-3 text-xs font-mono font-bold text-copper-500">
                      {hoverRating || selectedRating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className={labelClasses}>
                    Client Name or Organization*
                  </label>
                  <input
                    {...register('customerName')}
                    placeholder="e.g. S. Venkataraman, Apex Logistics"
                    className={inputClasses}
                  />
                  {errors.customerName && (
                    <span className="text-[11px] font-mono text-danger-500 mt-1 block">
                      {errors.customerName.message}
                    </span>
                  )}
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>
                      Email Address (Optional)
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="client@company.com"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>
                      Phone Number (Optional)
                    </label>
                    <input
                      {...register('phone')}
                      placeholder="+91 98765 43210"
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Review Headline */}
                <div>
                  <label className={labelClasses}>
                    Review Headline*
                  </label>
                  <input
                    {...register('title')}
                    placeholder="e.g. Dependable freight elevator operation in our manufacturing unit"
                    className={inputClasses}
                  />
                  {errors.title && (
                    <span className="text-[11px] font-mono text-danger-500 mt-1 block">
                      {errors.title.message}
                    </span>
                  )}
                </div>

                {/* Review Description */}
                <div>
                  <label className={labelClasses}>
                    Observations & Performance Feedback*
                  </label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    placeholder="Please detail lift travel smoothness, door operator reliability, installation punctuality, and service support..."
                    className="w-full p-4 min-h-[140px] text-sm font-sans bg-graphite-900 border border-steel-300/40 rounded-xs text-steel-100 placeholder:text-steel-300/40 focus:border-copper-500 focus:ring-2 focus:ring-copper-500/30 outline-none leading-relaxed transition-colors"
                  />
                  {errors.description && (
                    <span className="text-[11px] font-mono text-danger-500 mt-1 block">
                      {errors.description.message}
                    </span>
                  )}
                </div>

                {/* Optional Image */}
                <div>
                  <label className={labelClasses}>
                    Optional Site Photo
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-3 rounded-sm bg-ink-950 border border-graphite-700 hover:border-copper-500 cursor-pointer text-xs font-sans uppercase tracking-[0.12em] text-steel-300 hover:text-steel-100 transition-colors">
                      <Upload className="w-4 h-4 text-copper-500" />
                      <span>{uploadingImage ? 'Uploading...' : 'Attach Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                    </label>
                    {imagePreview && (
                      <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Attached
                      </span>
                    )}
                  </div>
                </div>

                {/* Honeypot */}
                <input {...register('hp_website')} type="text" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-graphite-700/60">
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="px-5 h-12 rounded-sm border border-graphite-700 text-xs font-sans uppercase tracking-[0.12em] text-steel-300 hover:text-steel-100 hover:bg-graphite-700/50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || uploadingImage}
                    className="inline-flex items-center gap-2 px-8 h-12 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 font-sans text-[13px] font-bold uppercase tracking-[0.12em] disabled:opacity-50 transition-all shadow-copper-glow"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit Review</span>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-copper-500/15 border border-copper-500 text-copper-500 mx-auto flex items-center justify-center shadow-copper-glow">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-steel-100">
                  Feedback Received
                </h3>
                <p className="text-sm text-steel-300 max-w-sm mx-auto leading-relaxed font-light">
                  Thank you for reviewing HYDRELEX Lift Systems. Your evaluation has been saved with status PENDING and will be published once verified by engineering moderation.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleModalClose}
                    className="px-8 h-12 rounded-sm bg-copper-500 text-ink-950 font-sans text-[13px] font-bold uppercase tracking-[0.12em] shadow-copper-glow hover:bg-copper-400 transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
