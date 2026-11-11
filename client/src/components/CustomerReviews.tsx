import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquarePlus } from 'lucide-react';
import { Review } from '../types';
import { api } from '../lib/api';
import { formatDate } from '../lib/utils';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';
import { WriteReviewModal } from './WriteReviewModal';
import { Surface } from './ui/Surface';

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
    <Surface
      tone="teal"
      as="section"
      id="reviews"
      className="w-full py-24 sm:py-32 relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-teal-700 via-teal-700 to-teal-900"
    >
      {/* Background Architectural Grid Overlay */}
      <div className="absolute inset-0 bg-technical-grid opacity-20 pointer-events-none" />

      {/* Oversized Outlined Numeral 06 Cropped Behind Section */}
      <div
        aria-hidden="true"
        className="absolute top-4 sm:top-6 right-6 sm:right-16 text-[88px] sm:text-[130px] lg:text-[18vw] font-heading font-black select-none pointer-events-none leading-none opacity-20"
        style={{
          WebkitTextStroke: '2px #F6B93B',
          color: 'transparent',
        }}
      >
        06
      </div>

      <div className="w-full px-fluid relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-[var(--border)] pb-8">
          <div className="space-y-4 max-w-3xl">
            <TechnicalEyebrow variant="amber">
              VERIFIED CLIENT PERSPECTIVES // 06
            </TechnicalEyebrow>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-heading font-extrabold tracking-tight text-surface-heading leading-tight">
              Verified Client <span className="text-amber-500">Perspectives</span>
            </h2>
            <p className="text-base sm:text-lg text-surface-muted font-normal leading-relaxed">
              Direct evaluations from property managers, industrial factory operators, and building owners across South India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            {stats.totalReviews > 0 && (
              <div className="flex items-center gap-4 p-4 rounded-sm bg-teal-900 border border-teal-500/40 shadow-sm">
                <div className="text-right">
                  <div className="font-heading text-2xl font-bold text-surface-heading leading-none">
                    {stats.averageRating}
                  </div>
                  <div className="text-[10px] font-mono text-surface-muted uppercase mt-1">
                    {stats.totalReviews} {stats.totalReviews === 1 ? 'Review' : 'Reviews'}
                  </div>
                </div>
                <div className="flex text-amber-500">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        stats.averageRating >= i
                          ? 'fill-amber-500 text-amber-500'
                          : stats.averageRating >= i - 0.5
                          ? 'fill-amber-500/50 text-amber-500'
                          : 'fill-transparent text-teal-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setWriteModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 h-12 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 font-sans text-[13px] font-bold uppercase tracking-[0.12em] transition-all shadow-copper-glow active:scale-[0.98]"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 h-80 rounded-sm bg-teal-900 border border-teal-500/30 animate-pulse" />
            <div className="md:col-span-4 h-80 rounded-sm bg-teal-900 border border-teal-500/30 animate-pulse" />
          </div>
        )}

        {/* Featured Review + Secondary Reviews Grid */}
        {!loading && reviews.length > 0 && (
          <div className="space-y-12">
            {/* Big Featured Review Tile */}
            {featuredReview && (
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.5 }}
                className="relative p-8 sm:p-12 lg:p-16 rounded-sm bg-teal-900 border border-teal-500/30 border-t-[4px] border-t-amber-500 shadow-2xl overflow-hidden"
              >
                {/* Giant Amber Quotation Mark Typography */}
                <span
                  className="font-heading text-[220px] sm:text-[280px] text-amber-500/25 font-black absolute -top-16 sm:-top-20 left-4 sm:left-8 select-none pointer-events-none leading-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                <div className="relative z-10 space-y-6 max-w-4xl">
                  {/* Rating Stars in Amber Gold */}
                  <div className="flex items-center gap-3">
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-5 h-5 ${
                            featuredReview.rating >= s
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-teal-500 fill-transparent'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-mono text-amber-300 ml-2">
                      {formatDate(featuredReview.created_at)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-surface-heading tracking-tight">
                    {featuredReview.title}
                  </h3>

                  {/* Large Serif-Feeling Quote Text */}
                  <p className="text-2xl sm:text-3xl lg:text-[40px] font-heading font-normal text-surface-fg leading-snug tracking-tight">
                    &ldquo;{featuredReview.description}&rdquo;
                  </p>

                  <div className="pt-6 border-t border-[var(--border)] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-surface-heading font-bold block text-base font-sans">
                        {featuredReview.customer_name}
                      </span>
                      <span className="text-amber-500 text-[11px] font-sans uppercase tracking-[0.14em] font-semibold">
                        Verified HYDRELEX Client
                      </span>
                    </div>
                    <span className="font-mono text-xs text-surface-muted">
                      REF #{featuredReview.id}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Secondary Reviews Grid */}
            {secondaryReviews.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {secondaryReviews.map((rev) => (
                  <motion.div
                    key={rev.id}
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.05, margin: '0px 0px -10% 0px' }}
                    className="p-6 rounded-sm bg-teal-900 border border-teal-500/30 border-t-[3px] border-t-amber-500 shadow-elevated-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex text-amber-500">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                rev.rating >= s
                                  ? 'fill-amber-500 text-amber-500'
                                  : 'text-teal-500 fill-transparent'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono text-surface-muted">
                          {formatDate(rev.created_at)}
                        </span>
                      </div>

                      <h4 className="font-heading text-lg font-bold text-surface-heading line-clamp-1">
                        {rev.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-surface-fg font-normal line-clamp-3 leading-relaxed">
                        &ldquo;{rev.description}&rdquo;
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
                      <span className="font-sans font-semibold text-surface-heading">
                        {rev.customer_name}
                      </span>
                      <span className="text-amber-500 text-[10px] uppercase tracking-[0.12em] font-semibold">
                        Verified
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && reviews.length === 0 && (
          <div className="p-12 sm:p-16 rounded-sm bg-teal-900 border border-teal-500/40 border-t-[3px] border-t-amber-500 text-center space-y-4 max-w-2xl mx-auto shadow-elevated-card">
            <h3 className="font-heading text-2xl font-bold text-surface-heading">
              No Client Evaluations Published Yet
            </h3>
            <p className="text-sm text-surface-muted font-normal leading-relaxed">
              Be the first property owner, plant manager, or architectural engineer to submit a direct evaluation of our Sriperumbudur vertical mobility engineering services.
            </p>
            <button
              onClick={() => setWriteModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 font-sans text-xs font-bold uppercase tracking-[0.12em] shadow-copper-glow"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Submit First Review</span>
            </button>
          </div>
        )}
      </div>

      <WriteReviewModal
        isOpen={writeModalOpen}
        onClose={() => setWriteModalOpen(false)}
        onSuccess={fetchReviews}
      />
    </Surface>
  );
};
