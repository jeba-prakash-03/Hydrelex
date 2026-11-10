import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquarePlus } from 'lucide-react';
import { Review } from '../types';
import { api } from '../lib/api';
import { formatDate } from '../lib/utils';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';
import { WriteReviewModal } from './WriteReviewModal';

export const CustomerReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({ averageRating: 0, totalReviews: 0 });
  const [loading, setLoading] = useState(true);
  const [writeModalOpen, setWriteModalOpen] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await api.getApprovedReviews();
      if (res.success) {
        setReviews(res.reviews || []);
        setStats(res.stats || { averageRating: 0, totalReviews: 0 });
      }
    } catch (err) {
      console.error('Error fetching approved reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const featuredReview = reviews.length > 0 ? reviews[0] : null;
  const secondaryReviews = reviews.length > 1 ? reviews.slice(1) : [];

  return (
    <section
      id="reviews"
      className="w-full bg-graphite-800 text-ivory-100 py-24 sm:py-32 relative overflow-hidden border-b border-graphite-600/60"
      style={{ backgroundColor: '#1C1C1E' }}
    >
      <div className="w-full px-fluid relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-graphite-600/60 pb-8">
          <div className="space-y-3 max-w-3xl">
            <TechnicalEyebrow variant="champagne">
              VERIFIED CLIENT PERSPECTIVES // 06
            </TechnicalEyebrow>
            <h2 className="font-h2-clamp font-extrabold tracking-tight text-ivory-100 leading-tight">
              Customer Perspectives
            </h2>
            <p className="text-base sm:text-lg text-silver-400 font-light leading-relaxed">
              Direct evaluations from property managers, industrial factory operators, and building owners across South India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            {stats.totalReviews > 0 && (
              <div className="flex items-center gap-4 p-4 rounded-sm bg-ink-900 border border-graphite-600">
                <div className="text-right">
                  <div className="font-heading text-2xl font-bold text-ivory-100 leading-none">
                    {stats.averageRating}
                  </div>
                  <div className="text-[10px] font-mono text-silver-400 uppercase mt-1">
                    {stats.totalReviews} {stats.totalReviews === 1 ? 'Review' : 'Reviews'}
                  </div>
                </div>
                <div className="flex text-champagne-500">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        stats.averageRating >= i
                          ? 'fill-champagne-500 text-champagne-500'
                          : stats.averageRating >= i - 0.5
                          ? 'fill-champagne-500/50 text-champagne-500'
                          : 'fill-transparent text-graphite-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setWriteModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 h-13 rounded-sm bg-champagne-500 hover:bg-champagne-600 text-ink-900 font-mono text-xs font-bold uppercase tracking-technical transition-all shadow-sm active:scale-[0.98]"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 h-80 rounded-sm bg-ink-900 border border-graphite-600 animate-pulse" />
            <div className="md:col-span-4 h-80 rounded-sm bg-ink-900 border border-graphite-600 animate-pulse" />
          </div>
        )}

        {/* Featured Review + Horizontal Snap Row of Others */}
        {!loading && reviews.length > 0 && (
          <div className="space-y-12">
            {/* Big Featured Review Tile */}
            {featuredReview && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6 }}
                className="relative p-8 sm:p-12 lg:p-16 rounded-sm bg-ink-900 border border-graphite-600 shadow-xl overflow-hidden"
              >
                {/* Large Editorial Quotation Mark Typography */}
                <span
                  className="font-heading text-8xl sm:text-9xl text-champagne-500/15 font-black absolute top-4 left-6 select-none pointer-events-none leading-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                <div className="relative z-10 space-y-6 max-w-4xl">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-2">
                    <div className="flex text-champagne-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-5 h-5 ${
                            featuredReview.rating >= s
                              ? 'fill-champagne-500 text-champagne-500'
                              : 'text-graphite-600 fill-transparent'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-mono text-silver-400 ml-2">
                      {formatDate(featuredReview.created_at)}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-4xl font-extrabold text-ivory-100 tracking-tight leading-snug">
                    {featuredReview.title}
                  </h3>

                  <p className="text-base sm:text-xl text-silver-400 font-light leading-relaxed">
                    &ldquo;{featuredReview.description}&rdquo;
                  </p>

                  <div className="pt-4 border-t border-graphite-600/60 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-ivory-100 font-bold block text-sm">
                        {featuredReview.customer_name}
                      </span>
                      <span className="text-champagne-500 text-[10px] uppercase tracking-technical">
                        Verified HYDRELEX Client
                      </span>
                    </div>
                    <span className="text-silver-400/60 text-[11px]">
                      FEATURED EVALUATION
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Horizontal Snap Row for Secondary Reviews */}
            {secondaryReviews.length > 0 && (
              <div>
                <div className="font-mono text-[11px] uppercase tracking-technical text-champagne-500 mb-4 font-semibold">
                  ADDITIONAL CLIENT EVALUATIONS
                </div>
                <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
                  {secondaryReviews.map((rev, idx) => (
                    <motion.div
                      key={rev.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      className="min-w-[320px] sm:min-w-[400px] max-w-[480px] p-6 sm:p-8 rounded-sm bg-ink-900 border border-graphite-600 flex flex-col justify-between space-y-4 snap-start shrink-0 shadow-lg"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex text-champagne-500">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${
                                  rev.rating >= s
                                    ? 'fill-champagne-500 text-champagne-500'
                                    : 'text-graphite-600 fill-transparent'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-mono text-silver-400">
                            {formatDate(rev.created_at)}
                          </span>
                        </div>

                        <h4 className="font-heading text-lg font-bold text-ivory-100">
                          {rev.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-silver-400 font-light leading-relaxed line-clamp-4">
                          {rev.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-graphite-600/50 flex items-center justify-between font-mono text-xs">
                        <span className="font-bold text-ivory-100">{rev.customer_name}</span>
                        <span className="text-[9.5px] uppercase tracking-technical px-2 py-0.5 rounded-sm bg-graphite-600 text-champagne-500">
                          Verified
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State when no approved reviews yet */}
        {!loading && reviews.length === 0 && (
          <div className="p-12 sm:p-16 rounded-sm bg-ink-900 border border-graphite-600 shadow-md text-center max-w-2xl mx-auto space-y-4">
            <span
              className="font-heading text-7xl text-champagne-500/25 font-extrabold block leading-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <h3 className="font-heading text-2xl font-bold text-ivory-100">
              Be the First to Review HYDRELEX
            </h3>
            <p className="text-sm text-silver-400 font-light max-w-lg mx-auto leading-relaxed">
              We uphold transparency: we publish verified customer evaluations and do not fabricate testimonials. Have you partnered with HYDRELEX Lift Systems?
            </p>
            <div className="pt-4">
              <button
                onClick={() => setWriteModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 h-12 rounded-sm bg-champagne-500 hover:bg-champagne-600 text-ink-900 font-mono text-xs font-bold uppercase tracking-technical shadow-sm"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Submit Client Review</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <WriteReviewModal
        isOpen={writeModalOpen}
        onClose={() => setWriteModalOpen(false)}
        onReviewSubmitted={fetchReviews}
      />
    </section>
  );
};
