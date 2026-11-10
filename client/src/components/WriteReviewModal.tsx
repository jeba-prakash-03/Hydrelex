import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Star, Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../lib/api';

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
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({ isOpen, onClose, onReviewSubmitted }) => {
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
            className="absolute top-5 right-5 z-20 p-2.5 rounded-sm bg-arch-ivoryAlt text-arch-slate hover:text-arch-black transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-10">
            {!submitSuccess ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-arch-copper font-semibold block">
                    CLIENT FEEDBACK // QUALITY CONTROL
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-arch-black mt-1">
                    Submit Client Review
                  </h3>
                  <p className="text-xs text-arch-slate mt-1 font-light">
                    Every review is verified by HYDRELEX engineering management before public publication.
                  </p>
                </div>

                {serverError && (
                  <div className="p-3.5 rounded-sm bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Rating Stars Picker */}
                <div>
                  <label className="block text-xs font-mono uppercase text-arch-graphite mb-2 font-medium">
                    Rating Evaluation (1 - 5 Stars)*
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const filled = hoverRating ? hoverRating >= star : selectedRating >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => handleRatingClick(star)}
                          className="p-1 focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              filled
                                ? 'fill-arch-champagne text-arch-champagne'
                                : 'text-arch-ivoryBorder fill-transparent'
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="ml-3 text-xs font-mono font-bold text-arch-copper">
                      {hoverRating || selectedRating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-mono uppercase text-arch-graphite mb-1.5 font-medium">
                    Client Name or Company Name*
                  </label>
                  <input
                    {...register('customerName')}
                    placeholder="e.g. S. Venkataraman, Apex Logistics"
                    className="w-full px-4 py-3 rounded-sm border border-arch-ivoryBorder bg-white text-arch-graphite text-xs font-sans focus:outline-none focus:border-arch-copper"
                  />
                  {errors.customerName && (
                    <span className="text-[11px] font-mono text-rose-600 mt-1 block">
                      {errors.customerName.message}
                    </span>
                  )}
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-arch-graphite mb-1.5 font-medium">
                      Email Address (Optional)
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="client@company.com"
                      className="w-full px-4 py-3 rounded-sm border border-arch-ivoryBorder bg-white text-arch-graphite text-xs font-sans focus:outline-none focus:border-arch-copper"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-arch-graphite mb-1.5 font-medium">
                      Phone Number (Optional)
                    </label>
                    <input
                      {...register('phone')}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-sm border border-arch-ivoryBorder bg-white text-arch-graphite text-xs font-sans focus:outline-none focus:border-arch-copper"
                    />
                  </div>
                </div>

                {/* Review Title */}
                <div>
                  <label className="block text-xs font-mono uppercase text-arch-graphite mb-1.5 font-medium">
                    Headline Summary*
                  </label>
                  <input
                    {...register('title')}
                    placeholder="e.g. Robust goods lift operation in our manufacturing facility"
                    className="w-full px-4 py-3 rounded-sm border border-arch-ivoryBorder bg-white text-arch-graphite text-xs font-sans focus:outline-none focus:border-arch-copper"
                  />
                  {errors.title && (
                    <span className="text-[11px] font-mono text-rose-600 mt-1 block">{errors.title.message}</span>
                  )}
                </div>

                {/* Review Description */}
                <div>
                  <label className="block text-xs font-mono uppercase text-arch-graphite mb-1.5 font-medium">
                    Observations & Performance Feedback*
                  </label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    placeholder="Please detail lift travel smoothness, door operator reliability, installation punctuality, and service support..."
                    className="w-full px-4 py-3 rounded-sm border border-arch-ivoryBorder bg-white text-arch-graphite text-xs font-sans focus:outline-none focus:border-arch-copper leading-relaxed"
                  />
                  {errors.description && (
                    <span className="text-[11px] font-mono text-rose-600 mt-1 block">
                      {errors.description.message}
                    </span>
                  )}
                </div>

                {/* Optional Image */}
                <div>
                  <label className="block text-xs font-mono uppercase text-arch-graphite mb-1.5 font-medium">
                    Optional Site Photo
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-2.5 rounded-sm bg-white border border-arch-ivoryBorder hover:bg-arch-ivoryAlt cursor-pointer text-xs font-mono uppercase">
                      <Upload className="w-3.5 h-3.5 text-arch-copper" />
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
                      <span className="text-xs font-mono text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Attached
                      </span>
                    )}
                  </div>
                </div>

                {/* Honeypot */}
                <input {...register('hp_website')} type="text" className="hidden" tabIndex={-1} />

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="px-5 py-2.5 rounded-sm border border-arch-ivoryBorder text-xs font-mono uppercase text-arch-slate hover:bg-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || uploadingImage}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-sm bg-arch-black text-arch-champagne font-mono text-xs uppercase tracking-architectural hover:bg-arch-graphite disabled:opacity-50 transition-all shadow-sm"
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
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-arch-ivoryAlt border border-arch-ivoryBorder text-arch-copper mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-arch-black">
                  Feedback Received
                </h3>
                <p className="text-xs sm:text-sm text-arch-slate max-w-sm mx-auto leading-relaxed font-light">
                  Thank you for reviewing HYDRELEX Lift Systems. Your evaluation has been saved with status PENDING and will be published once reviewed by our moderation staff.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleModalClose}
                    className="px-6 py-2.5 rounded-sm bg-arch-black text-white text-xs font-mono uppercase tracking-wider hover:bg-arch-graphite transition-colors"
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
