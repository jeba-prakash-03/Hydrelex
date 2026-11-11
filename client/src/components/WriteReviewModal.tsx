import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Star, Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../lib/api';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';
import { Surface } from './ui/Surface';

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
  const uid = useId();
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
    'w-full min-h-[52px] h-14 px-4 text-base lg:text-sm font-sans bg-ink-900 border border-teal-500/40 rounded-xs text-surface-fg placeholder:text-surface-muted/60 focus:border-copper-500 focus:ring-2 focus:ring-copper-500/30 outline-none transition-colors';
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
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-xl z-10 my-auto"
        >
          <Surface
            tone="dark"
            as="div"
            className="w-full rounded-sm shadow-2xl border border-[var(--border)] border-t-[4px] border-t-copper-500 overflow-hidden"
          >
            <button
              onClick={handleModalClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 transition-colors shadow-copper-glow"
              aria-label="Close"
            >
              <X className="w-5 h-5 font-bold" />
            </button>

            <div className="p-5 sm:p-10 max-h-[90dvh] lg:max-h-[85vh] overflow-y-auto">
              {!submitSuccess ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <div className="space-y-2 pr-10 sm:pr-0">
                    <TechnicalEyebrow variant="auto">
                      CLIENT FEEDBACK // QUALITY CONTROL
                    </TechnicalEyebrow>
                    <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-surface-heading">
                      Submit Client Review
                    </h3>
                    <p className="text-sm text-surface-muted font-normal">
                      Every review is evaluated by HYDRELEX engineering moderation before public publication.
                    </p>
                  </div>

                  {serverError && (
                    <div className="p-3.5 rounded-sm bg-danger-500 text-white text-xs font-mono flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  {/* Star Rating Evaluation (Accessible) */}
                  <div>
                    <span id={`${uid}-rating-label`} className={labelClasses}>
                      Rating Evaluation (1 - 5 Stars)*
                    </span>
                    <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-labelledby={`${uid}-rating-label`}>
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
                            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center p-1.5 focus:outline-none transition-transform hover:scale-110"
                            aria-label={`${star} Stars`}
                            role="radio"
                            aria-checked={selectedRating === star}
                          >
                            <Star
                              className={`w-8 h-8 ${
                                filled
                                  ? 'fill-amber-500 text-amber-500'
                                  : 'text-surface-muted/40 fill-transparent'
                              }`}
                            />
                          </button>
                        );
                      })}
                      <span className="ml-1 sm:ml-2 text-xs font-mono font-bold text-amber-300">
                        {hoverRating || selectedRating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor={`${uid}-customerName`} className={labelClasses}>
                      Client Name or Organization*
                    </label>
                    <input
                      id={`${uid}-customerName`}
                      type="text"
                      autoComplete="name"
                      {...register('customerName')}
                      placeholder="e.g. S. Venkataraman, Apex Logistics"
                      className={inputClasses}
                    />
                    {errors.customerName && (
                      <span className="text-xs lg:text-[11px] font-mono bg-danger-500 text-white px-2 py-0.5 rounded-xs mt-1.5 inline-block">
                        {errors.customerName.message}
                      </span>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`${uid}-email`} className={labelClasses}>
                        Email Address (Optional)
                      </label>
                      <input
                        id={`${uid}-email`}
                        {...register('email')}
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="client@company.com"
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label htmlFor={`${uid}-phone`} className={labelClasses}>
                        Phone Number (Optional)
                      </label>
                      <input
                        id={`${uid}-phone`}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        {...register('phone')}
                        placeholder="+91 98765 43210"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {/* Review Headline */}
                  <div>
                    <label htmlFor={`${uid}-title`} className={labelClasses}>
                      Review Headline*
                    </label>
                    <input
                      id={`${uid}-title`}
                      type="text"
                      {...register('title')}
                      placeholder="e.g. Dependable freight elevator operation in our manufacturing unit"
                      className={inputClasses}
                    />
                    {errors.title && (
                      <span className="text-xs lg:text-[11px] font-mono bg-danger-500 text-white px-2 py-0.5 rounded-xs mt-1.5 inline-block">
                        {errors.title.message}
                      </span>
                    )}
                  </div>

                  {/* Review Description */}
                  <div>
                    <label htmlFor={`${uid}-description`} className={labelClasses}>
                      Observations & Performance Feedback*
                    </label>
                    <textarea
                      id={`${uid}-description`}
                      {...register('description')}
                      rows={4}
                      placeholder="Please detail lift travel smoothness, door operator reliability, installation punctuality, and service support..."
                      className="w-full p-4 min-h-[140px] text-base lg:text-sm font-sans bg-ink-900 border border-teal-500/40 rounded-xs text-surface-fg placeholder:text-surface-muted/60 focus:border-copper-500 focus:ring-2 focus:ring-copper-500/30 outline-none leading-relaxed transition-colors"
                    />
                    {errors.description && (
                      <span className="text-xs lg:text-[11px] font-mono bg-danger-500 text-white px-2 py-0.5 rounded-xs mt-1.5 inline-block">
                        {errors.description.message}
                      </span>
                    )}
                  </div>

                  {/* Optional Image */}
                  <div>
                    <span className={labelClasses}>
                      Optional Site Photo
                    </span>
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor={`${uid}-sitePhoto`}
                        className="min-h-[48px] flex items-center gap-2 px-4 py-3 rounded-sm bg-teal-900 border border-teal-500/40 hover:border-amber-500 cursor-pointer text-xs font-sans uppercase tracking-[0.12em] text-surface-fg hover:text-amber-300 transition-colors"
                      >
                        <Upload className="w-4 h-4 text-amber-500" />
                        <span>{uploadingImage ? 'Uploading...' : 'Attach Image'}</span>
                        <input
                          id={`${uid}-sitePhoto`}
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </label>
                      {imagePreview && (
                        <span className="text-xs font-mono text-mint-100 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-amber-300" />
                          Attached
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Honeypot */}
                  <input {...register('hp_website')} type="text" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                  <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 border-t border-[var(--border)]">
                    <button
                      type="button"
                      onClick={handleModalClose}
                      className="min-h-[48px] px-5 h-12 rounded-sm border border-[var(--border)] text-xs font-sans uppercase tracking-[0.12em] text-surface-muted hover:text-surface-heading hover:bg-teal-900/40 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || uploadingImage}
                      className="min-h-[48px] inline-flex items-center justify-center gap-2 px-8 h-12 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 font-sans text-sm lg:text-[13px] font-bold uppercase tracking-[0.12em] disabled:opacity-50 transition-all shadow-copper-glow"
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
                  <div className="w-16 h-16 rounded-full bg-teal-900 border border-amber-500 text-amber-300 mx-auto flex items-center justify-center shadow-copper-glow">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-surface-heading">
                    Feedback Received
                  </h3>
                  <p className="text-base lg:text-sm text-surface-muted max-w-sm mx-auto leading-relaxed font-normal">
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
          </Surface>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
