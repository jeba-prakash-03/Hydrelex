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
      className="w-full bg-graphite-900 text-steel-100 py-24 sm:py-32 relative overflow-hidden border-b border-graphite-700"
      style={{ backgroundColor: '#141416' }}
    >
      {/* Background Architectural Grid Overlay */}
      <div className="absolute inset-0 bg-technical-grid opacity-25 pointer-events-none" />

      {/* Oversized Outlined Numeral 06 Cropped Behind Section */}
      <div
        aria-hidden="true"
        className="absolute -top-12 right-6 sm:right-16 text-[18vw] font-heading font-black select-none pointer-events-none leading-none opacity-10"
        style={{
          WebkitTextStroke: '1.5px #E8782E',
          color: 'transparent',
        }}
      >
        06
      </div>

      <div className="w-full px-fluid relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-graphite-700 pb-8">
          <div className="space-y-4 max-w-3xl">
            <TechnicalEyebrow variant="copper">
              VERIFIED CLIENT PERSPECTIVES // 06
            </TechnicalEyebrow>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-heading font-extrabold tracking-tight text-steel-100 leading-tight">
              Verified Client <span className="text-copper-500">Perspectives</span>
            </h2>
            <p className="text-base sm:text-lg text-steel-300 font-light leading-relaxed">
              Direct evaluations from property managers, industrial factory operators, and building owners across South India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            {stats.totalReviews > 0 && (
              <div className="flex items-center gap-4 p-4 rounded-sm bg-ink-950 border border-graphite-700 shadow-sm">
                <div className="text-right">
                  <div className="font-heading text-2xl font-bold text-steel-100 leading-none">
                    {stats.averageRating}
                  </div>
                  <div className="text-[10px] font-mono text-steel-300 uppercase mt-1">
                    {stats.totalReviews} {stats.totalReviews === 1 ? 'Review' : 'Reviews'}
                  </div>
                </div>
                <div className="flex text-copper-500">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        stats.averageRating >= i
                          ? 'fill-copper-500 text-copper-500'
                          : stats.averageRating >= i - 0.5
                          ? 'fill-copper-500/50 text-copper-500'
                          : 'fill-transparent text-graphite-600'
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
            <div className="md:col-span-8 h-80 rounded-sm bg-ink-950 border border-graphite-700 animate-pulse" />
            <div className="md:col-span-4 h-80 rounded-sm bg-ink-950 border border-graphite-700 animate-pulse" />
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
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5 }}
                className="relative p-8 sm:p-12 lg:p-16 rounded-sm bg-graphite-700 border border-graphite-600/50 border-t-[3px] border-t-copper-500 shadow-elevated-card overflow-hidden"
              >
                {/* Huge Copper Quotation Mark Typography (200px+) */}
                <span
                  className="font-heading text-[220px] sm:text-[280px] text-copper-500/20 font-black absolute -top-16 sm:-top-20 left-4 sm:left-8 select-none pointer-events-none leading-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                <div className="relative z-10 space-y-6 max-w-4xl">
                  {/* Rating Stars in Bright Copper */}
                  <div className="flex items-center gap-3">
                    <div className="flex text-copper-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-5 h-5 ${
                            featuredReview.rating >= s
                              ? 'fill-copper-500 text-copper-500'
                              : 'text-graphite-600 fill-transparent'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-mono text-copper-400 ml-2">
                      {formatDate(featuredReview.created_at)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-steel-100 tracking-tight">
                    {featuredReview.title}
                  </h3>

                  {/* Large Serif-Feeling Quote Text in 36-56px type */}
                  <p className="text-2xl sm:text-3xl lg:text-[40px] font-heading font-normal text-steel-100 leading-snug tracking-tight">
                    &ldquo;{featuredReview.description}&rdquo;
                  </p>

                  <div className="pt-6 border-t border-graphite-600/60 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-steel-100 font-bold block text-base font-sans">
                        {featuredReview.customer_name}
                      </span>
                      <span className="text-copper-500 text-[11px] font-sans uppercase tracking-[0.14em] font-semibold">
                        Verified HYDRELEX Client
                      </span>
                    </div>
                    <span className="font-mono text-xs text-steel-300">
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
                    viewport={{ once: true, amount: 0.1 }}
                    className="p-6 rounded-sm bg-graphite-700 border border-graphite-600/50 border-t-2 border-t-copper-500 shadow-elevated-card hover:shadow-copper-glow hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex text-copper-500">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                rev.rating >= s
                                  ? 'fill-copper-500 text-copper-500'
                                  : 'text-graphite-600 fill-transparent'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono text-steel-300">
                          {formatDate(rev.created_at)}
                        </span>
                      </div>

                      <h4 className="font-heading text-lg font-bold text-steel-100 line-clamp-1">
                        {rev.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-steel-300 font-light line-clamp-3 leading-relaxed">
                        &ldquo;{rev.description}&rdquo;
                      </p>
                    </div>

                    <div className="pt-3 border-t border-graphite-600/50 flex items-center justify-between text-xs">
                      <span className="font-sans font-semibold text-steel-100">
                        {rev.customer_name}
                      </span>
                      <span className="text-copper-500 text-[10px] uppercase tracking-[0.12em] font-semibold">
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
          <div className="p-12 sm:p-16 rounded-sm bg-graphite-700 border border-graphite-600/50 border-t-2 border-t-copper-500 text-center space-y-4 max-w-2xl mx-auto shadow-elevated-card">
            <h3 className="font-heading text-2xl font-bold text-steel-100">
              No Client Evaluations Published Yet
            </h3>
            <p className="text-sm text-steel-300 font-light leading-relaxed">
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
    </section>
  );
};
