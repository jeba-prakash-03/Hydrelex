import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Eye,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  X,
  FileText,
  AlertCircle,
  Building,
} from 'lucide-react';
import { api } from '../../lib/api';
import { formatDate, formatDateTime } from '../../lib/utils';
import { Enquiry, EnquiryStatus } from '../../types';

export const AdminEnquiriesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStatus = searchParams.get('status') || 'ALL';
  const initialSearch = searchParams.get('search') || '';

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [loading, setLoading] = useState(true);

  // Detail Modal state
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [modalStatus, setModalStatus] = useState<EnquiryStatus>('PENDING');
  const [modalNotes, setModalNotes] = useState('');
  const [modalApptDate, setModalApptDate] = useState('');
  const [modalApptTime, setModalApptTime] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updateMsg, setUpdateMsg] = useState<string | null>(null);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await api.getAdminEnquiries({
        status: statusFilter,
        type: typeFilter,
        search: searchTerm,
      });
      if (res.success) {
        setEnquiries(res.enquiries || []);
      }
    } catch (err) {
      console.error('Fetch enquiries error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter, typeFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const openDetailModal = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setModalStatus(enquiry.status);
    setModalNotes(enquiry.internal_notes || '');
    setModalApptDate(enquiry.scheduled_date || enquiry.preferred_date || '');
    setModalApptTime(enquiry.scheduled_time || enquiry.preferred_time || '');
    setUpdateMsg(null);
  };

  const handleSaveModal = async () => {
    if (!selectedEnquiry) return;
    try {
      setUpdating(true);
      setUpdateMsg(null);

      // 1. Update enquiry status and internal notes
      await api.updateEnquiryStatus(selectedEnquiry.id, modalStatus, modalNotes);

      // 2. If appointment info updated or confirming appointment
      if (selectedEnquiry.appointment_id) {
        await api.confirmAppointment(selectedEnquiry.appointment_id, {
          scheduled_date: modalApptDate,
          scheduled_time: modalApptTime,
          status: modalStatus === 'APPOINTMENT_SCHEDULED' ? 'CONFIRMED' : 'SCHEDULED',
          notes: modalNotes,
        });
      }

      setUpdateMsg('Record updated successfully.');
      fetchEnquiries();
      setTimeout(() => setSelectedEnquiry(null), 1200);
    } catch (err: any) {
      setUpdateMsg(err.message || 'Update failed');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-brand-accent font-semibold">
            CLIENT CORRESPONDENCE
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-navy">
            Consultation Inquiries Registry
          </h1>
          <p className="text-xs sm:text-sm text-brand-steel">
            Review customer requests, examine site scope, and confirm engineer appointments.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-brand-silver shadow-sm space-y-4">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Ref #, Name, Phone, Email, Location..."
              className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-brand-silver bg-brand-light text-brand-navy text-xs focus:outline-none focus:border-brand-accent"
            />
            <Search className="w-4 h-4 text-brand-steel absolute left-3 top-3" />
          </div>

          {/* Status Filter */}
          <div className="md:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-brand-silver bg-brand-light text-brand-navy text-xs focus:outline-none focus:border-brand-accent font-mono"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">PENDING</option>
              <option value="CONTACTED">CONTACTED</option>
              <option value="APPOINTMENT_SCHEDULED">APPOINTMENT_SCHEDULED</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="md:col-span-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-brand-silver bg-brand-light text-brand-navy text-xs focus:outline-none focus:border-brand-accent"
            >
              <option value="ALL">All Enquiry Types</option>
              <option value="New Lift Installation">New Lift Installation</option>
              <option value="Product Enquiry">Product Enquiry</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Repair">Repair</option>
              <option value="Business Partnership">Business Partnership</option>
              <option value="General Enquiry">General Enquiry</option>
            </select>
          </div>

          <div className="md:col-span-1">
            <button
              type="submit"
              className="w-full h-full py-2.5 px-3 rounded-lg bg-brand-navy hover:bg-brand-industrial text-white text-xs font-medium flex items-center justify-center"
            >
              Filter
            </button>
          </div>
        </form>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-brand-silver shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-brand-light font-mono text-brand-steel uppercase text-[11px] border-b border-brand-silver">
              <tr>
                <th className="py-3.5 px-4">Ref #</th>
                <th className="py-3.5 px-4">Customer Details</th>
                <th className="py-3.5 px-4">Category & Interest</th>
                <th className="py-3.5 px-4">Requested Slot</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-silver/50 font-normal text-brand-charcoal">
              {loading && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-brand-steel">
                    Loading inquiries...
                  </td>
                </tr>
              )}

              {!loading && enquiries.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-brand-steel">
                    No enquiries found matching criteria.
                  </td>
                </tr>
              )}

              {!loading &&
                enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-brand-light/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-navy whitespace-nowrap">
                      {enq.reference_no}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-brand-navy">{enq.full_name}</div>
                      <div className="font-mono text-brand-steel text-[11px] flex items-center gap-2 mt-0.5">
                        <a href={`tel:${enq.phone}`} className="hover:text-brand-accent">
                          {enq.phone}
                        </a>
                        <span>•</span>
                        <span className="truncate max-w-[150px]">{enq.location}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-brand-navy">{enq.product_service_interest}</div>
                      <div className="text-[11px] text-brand-steel">{enq.enquiry_type}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs">
                      <div>{formatDate(enq.preferred_date)}</div>
                      <div className="text-[11px] text-brand-steel">{enq.preferred_time}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase ${
                          enq.status === 'PENDING'
                            ? 'bg-amber-100 text-amber-800'
                            : enq.status === 'APPOINTMENT_SCHEDULED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : enq.status === 'CONTACTED'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openDetailModal(enq)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-light hover:bg-brand-navy hover:text-white border border-brand-silver font-medium text-xs transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Manage</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail & Action Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            onClick={() => setSelectedEnquiry(null)}
            className="fixed inset-0 bg-brand-navy/85"
          />

          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-brand-silver overflow-hidden z-10 my-4 sm:my-8">
            <div className="p-4 sm:p-6 border-b border-brand-silver flex items-center justify-between bg-brand-navy text-white">
              <div>
                <span className="text-xs lg:text-[10px] font-mono uppercase text-brand-accent tracking-widest font-semibold">
                  ENQUIRY RECORD
                </span>
                <h3 className="font-heading text-xl font-bold font-mono">
                  {selectedEnquiry.reference_no}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                aria-label="Close enquiry modal"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-xs">
              {updateMsg && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{updateMsg}</span>
                </div>
              )}

              {/* Customer Info Card */}
              <div className="p-4 rounded-xl bg-brand-light border border-brand-silver space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-silver/60 pb-2">
                  <div className="font-bold text-sm text-brand-navy">{selectedEnquiry.full_name}</div>
                  <div className="flex items-center gap-3">
                    <a
                      href={`tel:${selectedEnquiry.phone}`}
                      className="inline-flex items-center gap-1 text-brand-accent hover:underline font-mono"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{selectedEnquiry.phone}</span>
                    </a>
                    <a
                      href={`mailto:${selectedEnquiry.email}`}
                      className="inline-flex items-center gap-1 text-brand-accent hover:underline font-mono"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-brand-charcoal">
                  <div>
                    <span className="text-brand-steel block">Location:</span>
                    <strong>{selectedEnquiry.location}</strong>
                  </div>
                  <div>
                    <span className="text-brand-steel block">Company:</span>
                    <strong>{selectedEnquiry.company_name || 'N/A'}</strong>
                  </div>
                  <div>
                    <span className="text-brand-steel block">Enquiry Type:</span>
                    <strong>{selectedEnquiry.enquiry_type}</strong>
                  </div>
                  <div>
                    <span className="text-brand-steel block">Product / Service:</span>
                    <strong>{selectedEnquiry.product_service_interest}</strong>
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <span className="text-brand-steel font-mono uppercase block mb-1">
                  Customer Project Scope / Technical Requirements:
                </span>
                <div className="p-3.5 rounded-xl bg-white border border-brand-silver leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.project_description}
                </div>
              </div>

              {selectedEnquiry.additional_message && (
                <div>
                  <span className="text-brand-steel font-mono uppercase block mb-1">
                    Additional Notes:
                  </span>
                  <div className="p-3 rounded-lg bg-white border border-brand-silver text-brand-steel">
                    {selectedEnquiry.additional_message}
                  </div>
                </div>
              )}

              {/* Status & Appointment Scheduling Section */}
              <div className="pt-4 border-t border-brand-silver space-y-4">
                <h4 className="font-heading text-sm font-bold text-brand-navy">
                  Administrative Status & Consultation Slot
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-mono text-brand-steel mb-1">Update Status</label>
                    <select
                      value={modalStatus}
                      onChange={(e) => setModalStatus(e.target.value as EnquiryStatus)}
                      className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light font-mono"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="APPOINTMENT_SCHEDULED">APPOINTMENT_SCHEDULED</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-brand-steel mb-1">Scheduled Date</label>
                    <input
                      type="date"
                      value={modalApptDate}
                      onChange={(e) => setModalApptDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-brand-steel mb-1">Scheduled Time</label>
                    <input
                      type="text"
                      value={modalApptTime}
                      onChange={(e) => setModalApptTime(e.target.value)}
                      placeholder="e.g. 11:00 AM"
                      className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-brand-steel mb-1">
                    Internal Engineer Notes
                  </label>
                  <textarea
                    value={modalNotes}
                    onChange={(e) => setModalNotes(e.target.value)}
                    rows={3}
                    placeholder="Add engineering notes, site survey observations, or follow-up timelines..."
                    className="w-full px-3 py-2 rounded-lg border border-brand-silver bg-brand-light"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-brand-light border-t border-brand-silver flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 rounded-lg border border-brand-silver text-brand-charcoal hover:bg-white"
              >
                Close
              </button>
              <button
                onClick={handleSaveModal}
                disabled={updating}
                className="px-5 py-2 rounded-lg bg-brand-accent hover:bg-brand-accent/90 text-white font-medium shadow-glow disabled:opacity-50"
              >
                {updating ? 'Saving Changes...' : 'Save & Update Record'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

