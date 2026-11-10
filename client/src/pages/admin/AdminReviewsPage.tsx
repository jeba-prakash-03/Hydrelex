import React, { useEffect, useState } from 'react';
import { Star, Check, X, Trash2, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { api } from '../../lib/api';
import { formatDate } from '../../lib/utils';
import { Review } from '../../types';

export const AdminReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await api.getAdminReviews(statusFilter);
      if (res.success) {
        setReviews(res.reviews || []);
      }
    } catch (err) {
      console.error('Fetch reviews error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [statusFilter]);

  const handleApprove = async (id: number) => {
    try {
      await api.approveReview(id);
      setActionMsg('Review approved and published to website.');
      fetchReviews();
      setTimeout(() => setActionMsg(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Action failed');
    }
  };

  const handleReject = async (id: number) => {
    try {
      await api.rejectReview(id);
      setActionMsg('Review marked as rejected.');
      fetchReviews();
      setTimeout(() => setActionMsg(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Action failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to permanently delete this customer review?')) return;
    try {
      await api.deleteReview(id);
      setActionMsg('Review deleted permanently.');
      fetchReviews();
      setTimeout(() => setActionMsg(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Action failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-brand-accent font-semibold">
            QUALITY ASSURANCE
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-navy">
            Customer Reviews Moderation
          </h1>
          <p className="text-xs sm:text-sm text-brand-steel">
            Approve genuine client testimonials before they are published onto the public corporate portal.
          </p>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-brand-silver bg-white text-xs font-mono"
          >
            <option value="ALL">All Reviews</option>
            <option value="PENDING">PENDING MODERATION</option>
            <option value="APPROVED">APPROVED (Public)</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>
      </div>

      {actionMsg && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{actionMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center text-brand-steel">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-brand-silver text-brand-steel text-sm">
          No customer reviews found matching filter.
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-brand-silver shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          rev.rating >= s ? 'fill-amber-400' : 'text-brand-silver'
                        }`}
                      />
                    ))}
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      rev.status === 'APPROVED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : rev.status === 'PENDING'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {rev.status}
                  </span>

                  <span className="text-[11px] font-mono text-brand-steel">
                    {formatDate(rev.created_at)}
                  </span>
                </div>

                <h3 className="font-heading text-base font-bold text-brand-navy">
                  &ldquo;{rev.title}&rdquo;
                </h3>

                <p className="text-xs sm:text-sm text-brand-steel leading-relaxed">
                  {rev.description}
                </p>

                <div className="pt-1 flex items-center gap-4 text-xs font-mono text-brand-steel">
                  <span className="font-semibold text-brand-navy">By: {rev.customer_name}</span>
                  {rev.email && <span>Email: {rev.email}</span>}
                  {rev.phone && <span>Phone: {rev.phone}</span>}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-brand-silver">
                {rev.status !== 'APPROVED' && (
                  <button
                    onClick={() => handleApprove(rev.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium"
                    title="Approve review"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                )}

                {rev.status !== 'REJECTED' && (
                  <button
                    onClick={() => handleReject(rev.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium"
                    title="Reject review"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                )}

                <button
                  onClick={() => handleDelete(rev.id)}
                  className="p-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50"
                  title="Delete permanently"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

