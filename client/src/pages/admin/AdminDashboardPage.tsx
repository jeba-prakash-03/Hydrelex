import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  Clock,
  Calendar,
  CheckCircle2,
  Star,
  Activity,
  ArrowRight,
  ShieldCheck,
  User,
  Compass,
} from 'lucide-react';
import { api } from '../../lib/api';
import { formatDate } from '../../lib/utils';
import { Enquiry } from '../../types';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    pendingEnquiries: 0,
    completedEnquiries: 0,
    confirmedAppointments: 0,
    pendingAppointments: 0,
    approvedReviews: 0,
    pendingReviews: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await api.getDashboardStats();
        if (res.success) {
          setStats(res.stats);
          setRecentEnquiries(res.recentEnquiries || []);
          setRecentLogs(res.recentLogs || []);
        }
      } catch (err) {
        console.error('Failed to load dashboard metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const metricCards = [
    {
      label: 'Pending Inquiries',
      value: stats.pendingEnquiries,
      subtext: 'Requires engineer response',
      icon: Clock,
      color: 'text-arch-copper',
      bg: 'bg-arch-ivory',
      border: 'border-arch-copper/30',
      link: '/admin/enquiries?status=PENDING',
    },
    {
      label: 'Confirmed Site Surveys',
      value: stats.confirmedAppointments,
      subtext: 'Scheduled on calendar',
      icon: Calendar,
      color: 'text-arch-champagneDark',
      bg: 'bg-arch-ivory',
      border: 'border-arch-champagne/30',
      link: '/admin/appointments?status=CONFIRMED',
    },
    {
      label: 'Total Enquiries Logged',
      value: stats.totalEnquiries,
      subtext: `${stats.completedEnquiries} completed projects`,
      icon: Inbox,
      color: 'text-arch-graphite',
      bg: 'bg-arch-ivory',
      border: 'border-arch-ivoryBorder',
      link: '/admin/enquiries',
    },
    {
      label: 'Review Moderation Queue',
      value: stats.pendingReviews,
      subtext: `${stats.approvedReviews} published reviews`,
      icon: Star,
      color: 'text-arch-copperDark',
      bg: 'bg-arch-ivory',
      border: 'border-arch-ivoryBorder',
      link: '/admin/reviews?status=PENDING',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-arch-ivoryBorder pb-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-ultra-wide text-arch-copper font-semibold block">
            CONTROL OVERVIEW // EXECUTIVE
          </span>
          <h1 className="font-heading text-3xl font-extrabold text-arch-black">
            Operations & Lift Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-arch-slate font-light mt-0.5">
            Real-time customer enquiries, confirmed site surveys, and equipment catalog status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/enquiries"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-arch-black text-arch-champagne text-xs font-mono uppercase tracking-architectural hover:bg-arch-graphite transition-colors shadow-sm"
          >
            <Inbox className="w-4 h-4" />
            <span>Manage Inquiries</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((m, idx) => {
          const Icon = m.icon;
          return (
            <Link
              key={idx}
              to={m.link}
              className={`p-6 rounded-sm bg-white border ${m.border} shadow-sm hover:shadow-architectural transition-all duration-300 flex flex-col justify-between space-y-4`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-medium text-arch-slate uppercase tracking-ultra-wide">
                  {m.label}
                </span>
                <div className={`p-2 rounded-sm ${m.bg} ${m.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="font-heading text-3xl sm:text-4xl font-extrabold text-arch-black">
                  {loading ? '...' : m.value}
                </div>
                <div className="text-xs font-mono text-arch-slate mt-1">{m.subtext}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Grid: Recent Enquiries (8 cols) & Activity Feed (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Enquiries Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-sm border border-arch-ivoryBorder shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-arch-ivoryBorder flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg font-bold text-arch-black">
                  Recent Consultation Inquiries
                </h3>
                <p className="text-xs text-arch-slate font-light">
                  Latest customer requests awaiting engineering confirmation.
                </p>
              </div>

              <Link
                to="/admin/enquiries"
                className="inline-flex items-center gap-1 text-xs font-mono text-arch-copper hover:text-arch-copperDark font-semibold uppercase tracking-wider"
              >
                <span>Full Registry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-arch-ivoryAlt text-arch-slate uppercase text-[10px] border-b border-arch-ivoryBorder tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Ref Code</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">System</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-arch-ivoryBorder font-normal text-arch-graphite">
                  {recentEnquiries.length === 0 && !loading && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-arch-slate">
                        No inquiries in database yet.
                      </td>
                    </tr>
                  )}
                  {recentEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-arch-ivory/60 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-arch-black">
                        <Link to={`/admin/enquiries?search=${enq.reference_no}`} className="hover:text-arch-copper">
                          {enq.reference_no}
                        </Link>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-arch-black font-sans">{enq.full_name}</div>
                        <div className="text-[11px] text-arch-slate">{enq.phone}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span>{enq.product_service_interest}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-sm text-[9.5px] font-bold uppercase ${
                            enq.status === 'PENDING'
                              ? 'bg-amber-100 text-amber-900 border border-amber-200'
                              : enq.status === 'APPOINTMENT_SCHEDULED'
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                              : 'bg-arch-ivoryAlt text-arch-graphite border border-arch-ivoryBorder'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-arch-slate">
                        {formatDate(enq.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 bg-arch-ivoryAlt border-t border-arch-ivoryBorder text-right">
            <Link
              to="/admin/enquiries"
              className="text-xs font-mono font-semibold text-arch-copper hover:underline uppercase tracking-wider"
            >
              Open Full Inquiries Registry →
            </Link>
          </div>
        </div>

        {/* Audit Activity Logs (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-sm border border-arch-ivoryBorder shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-arch-ivoryBorder">
            <Activity className="w-4 h-4 text-arch-copper" />
            <h3 className="font-heading text-base font-bold text-arch-black">
              System Audit Trail
            </h3>
          </div>

          <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
            {recentLogs.length === 0 && !loading && (
              <div className="text-xs font-mono text-arch-slate py-4 text-center">No recent audit logs.</div>
            )}
            {recentLogs.map((log) => (
              <div key={log.id} className="text-xs space-y-1 pb-3 border-b border-arch-ivoryBorder last:border-0 font-mono">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-arch-copper uppercase">{log.action}</span>
                  <span className="text-arch-slate">{formatDate(log.created_at)}</span>
                </div>
                <p className="text-arch-graphite font-sans text-xs leading-snug">{log.details}</p>
                <div className="text-[10px] text-arch-slate">
                  User: {log.admin_username || 'System'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
