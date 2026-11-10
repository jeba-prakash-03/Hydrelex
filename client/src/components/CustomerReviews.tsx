import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquarePlus, ShieldCheck, Quote, Clock, Check } from 'lucide-react';
import { Review } from '../types';
import { api } from '../lib/api';
import { formatDate } from '../lib/utils';
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
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <section id="reviews" className="w-full bg-arch-ivory text-arch-graphite py-24 sm:py-32 relative overflow-hidden border-b border-arch-ivoryBorder">
      <div className="absolute inset-0 bg-light-blueprint opacity-60 pointer-events-none" />

      {/* Full-Bleed Container */}
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-arch-ivoryBorder pb-8">
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs font-mono tracking-ultra-wide uppercase text-arch-copper font-semibold block">
              CLIENT TESTIMONIALS & EVALUATIONS // 06
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-arch-black tracking-tight leading-tight">
              Customer Perspectives
            </h2>
            <p className="text-base text-arch-slate font-light leading-relaxed">
              Transparent evaluations from commercial property managers, industrial factory operators, and building owners across South India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            {stats.totalReviews > 0 && (
              <div className="flex items-center gap-4 p-4 rounded-sm bg-white border border-arch-ivoryBorder shadow-sm">
                <div className="text-right">
                  <div className="font-heading text-2xl font-bold text-arch-black leading-none">
                    {stats.averageRating}
                  </div>
                  <div className="text-[10px] font-mono text-arch-slate uppercase mt-1">
                    {stats.totalReviews} Verified {stats.totalReviews === 1 ? 'Review' : 'Reviews'}
                  </div>
                </div>
                <div className="flex text-arch-champagne">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        stats.averageRating >= i
                          ? 'fill-arch-champagne'
                          : stats.averageRating >= i - 0.5
                          ? 'fill-arch-champagne/50'
                          : 'fill-transparent text-arch-champagne'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setWriteModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-sm bg-arch-black text-white hover:bg-arch-graphite font-mono text-xs uppercase tracking-architectural transition-all shadow-sm active:scale-[0.98]"
            >
              <MessageSquarePlus className="w-4 h-4 text-arch-champagne" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="p-8 rounded-sm bg-white border border-arch-ivoryBorder h-56 animate-pulse" />
            ))}
          </div>
        )}

        {/* Reviews Grid */}
        {!loading && reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((rev, idx) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative p-8 sm:p-10 rounded-sm bg-white border border-arch-ivoryBorder shadow-sm hover:shadow-architectural transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                {/* Large Editorial Quotation Mark */}
                <span className="font-heading text-6xl text-arch-ivoryBorder font-extrabold select-none leading-none -mb-4 block">
                  &ldquo;
                </span>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex text-arch-champagne">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            rev.rating >= s ? 'fill-arch-champagne' : 'text-arch-ivoryBorder fill-transparent'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-arch-slate">
                      {formatDate(rev.created_at)}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-arch-black">
                    {rev.title}
                  </h3>

                  <p className="text-sm text-arch-slate font-light leading-relaxed">
                    {rev.description}
                  </p>

                  {rev.image_url && (
                    <div className="pt-2">
                      <img
                        src={rev.image_url}
                        alt="Client installation"
                        className="w-full h-40 object-cover rounded-sm border border-arch-ivoryBorder"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-arch-ivoryBorder flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-arch-black">{rev.customer_name}</span>
                  <span className="text-[9.5px] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-arch-ivory text-arch-copper border border-arch-ivoryBorder font-semibold">
                    Verified Client
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && reviews.length === 0 && (
          <div className="p-12 sm:p-16 rounded-sm bg-white border border-arch-ivoryBorder shadow-sm text-center max-w-2xl mx-auto space-y-4">
            <span className="font-heading text-6xl text-arch-champagne font-extrabold block leading-none">
              &ldquo;
            </span>
            <h3 className="font-heading text-2xl font-bold text-arch-black">
              Be the First to Review HYDRELEX
            </h3>
            <p className="text-sm text-arch-slate font-light max-w-lg mx-auto leading-relaxed">
              We uphold complete transparency: we publish verified client feedback and do not fabricate testimonials. Have you partnered with HYDRELEX Lift Systems for equipment installation or maintenance?
            </p>
            <div className="pt-4">
              <button
                onClick={() => setWriteModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-arch-black text-arch-champagne hover:bg-arch-graphite font-mono text-xs uppercase tracking-architectural shadow-sm"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
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
