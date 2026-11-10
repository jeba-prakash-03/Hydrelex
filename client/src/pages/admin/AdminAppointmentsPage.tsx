import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Phone, Mail, CheckCircle2, AlertCircle, MapPin, User } from 'lucide-react';
import { api } from '../../lib/api';
import { formatDate } from '../../lib/utils';
import { Appointment } from '../../types';

export const AdminAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await api.getAppointments({ status: statusFilter });
      if (res.success) {
        setAppointments(res.appointments || []);
      }
    } catch (err) {
      console.error('Fetch appointments error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter]);

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      setActionMsg(null);
      await api.updateAppointmentStatus(id, newStatus);
      setActionMsg(`Appointment status updated to ${newStatus}.`);
      fetchAppointments();
      setTimeout(() => setActionMsg(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to update');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-brand-accent font-semibold">
            SITE CONSULTATIONS
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-navy">
            Scheduled Appointments
          </h1>
          <p className="text-xs sm:text-sm text-brand-steel">
            Manage on-site elevator survey schedules and technical consultations.
          </p>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-brand-silver bg-white text-xs font-mono"
          >
            <option value="ALL">All Statuses</option>
            <option value="SCHEDULED">SCHEDULED (Requested)</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="RESCHEDULED">RESCHEDULED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      </div>

      {actionMsg && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionMsg}</span>
        </div>
      )}

      {/* Grid of Appointments */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="p-6 rounded-2xl bg-white border border-brand-silver h-48 animate-pulse" />
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-brand-silver text-brand-steel text-sm">
          No appointments recorded matching this status.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="p-6 rounded-2xl bg-white border border-brand-silver shadow-sm hover:shadow-luxury transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-brand-navy">
                    {appt.reference_no}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase ${
                      appt.status === 'CONFIRMED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : appt.status === 'SCHEDULED'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {appt.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading text-base font-bold text-brand-navy">
                    {appt.full_name}
                  </h3>
                  <div className="text-xs text-brand-steel flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                    <span>{appt.location}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-brand-light border border-brand-silver space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 font-mono text-brand-navy font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                    <span>{formatDate(appt.scheduled_date)}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-brand-steel">
                    <Clock className="w-3.5 h-3.5 text-brand-accent" />
                    <span>{appt.scheduled_time}</span>
                  </div>
                </div>

                <div className="text-xs text-brand-charcoal">
                  <span className="text-brand-steel block">Interest:</span>
                  <span className="font-medium">{appt.product_service_interest}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-brand-silver/60 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs">
                  <a
                    href={`tel:${appt.phone}`}
                    className="p-2 rounded-lg bg-brand-light text-brand-accent hover:bg-brand-accent hover:text-white transition-colors"
                    title="Call Client"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`mailto:${appt.email}`}
                    className="p-2 rounded-lg bg-brand-light text-brand-accent hover:bg-brand-accent hover:text-white transition-colors"
                    title="Email Client"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="flex items-center gap-1.5">
                  {appt.status !== 'CONFIRMED' && (
                    <button
                      onClick={() => handleUpdateStatus(appt.id, 'CONFIRMED')}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-medium hover:bg-emerald-700"
                    >
                      Confirm
                    </button>
                  )}
                  {appt.status !== 'COMPLETED' && (
                    <button
                      onClick={() => handleUpdateStatus(appt.id, 'COMPLETED')}
                      className="px-2.5 py-1.5 rounded-lg bg-brand-navy text-white text-[11px] font-medium hover:bg-brand-industrial"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

