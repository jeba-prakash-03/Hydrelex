import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import confetti from 'canvas-confetti';
import {
  Send,
  CheckCircle2,
  Copy,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { api } from '../lib/api';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';
import { Surface } from './ui/Surface';

const enquiryFormSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name must be at least 2 characters').max(120),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+() -]{7,20}$/, 'Please enter a valid telephone/mobile number'),
  email: z.string().trim().email('Please enter a valid email address').max(191),
  companyName: z.string().trim().max(191).optional().or(z.literal('')),
  location: z.string().trim().min(2, 'Site location or city is required (e.g. Sriperumbudur)').max(191),
  enquiryType: z.enum([
    'New Lift Installation',
    'Product Enquiry',
    'Maintenance',
    'Repair',
    'Business Partnership',
    'General Enquiry',
  ]),
  productServiceInterest: z.string().trim().min(2, 'Please select or type your equipment/service of interest').max(191),
  preferredDate: z.string().refine((val) => {
    if (!val) return false;
    const selected = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today;
  }, 'Preferred appointment date must be today or in the future'),
  preferredTime: z.string().trim().min(2, 'Please select a preferred consultation time window').max(50),
  projectDescription: z
    .string()
    .trim()
    .min(10, 'Please describe your project scope, building type, or elevator capacity requirements (min 10 chars)')
    .max(3000),
  additionalMessage: z.string().trim().max(2000).optional().or(z.literal('')),
  hp_company_url: z.string().optional(),
});

type EnquiryFormData = z.infer<typeof enquiryFormSchema>;

export interface EnquiryFormProps {
  initialInterest?: string;
  themeMode?: 'dark' | 'light';
  isModal?: boolean;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialInterest,
  themeMode = 'dark',
  isModal = false,
}) => {
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const isDark = themeMode === 'dark';
  const todayStr = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      enquiryType: 'New Lift Installation',
      productServiceInterest: initialInterest || 'Passenger Lifts (Elevators)',
      preferredDate: todayStr,
      preferredTime: 'Morning (10:00 AM – 1:00 PM)',
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    try {
      setServerError(null);
      const res = await api.submitEnquiry(data);
      if (res.success && res.referenceNo) {
        setSubmittedReference(res.referenceNo);
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#0B4F5C', '#E8782E', '#F6B93B', '#FBF8F2'],
        });
      } else {
        setServerError(res.message || 'Submission failed. Please try again.');
      }
    } catch (err: any) {
      setServerError(err.message || 'Server connection error. Please check your network.');
    }
  };

  const handleCopy = () => {
    if (submittedReference) {
      navigator.clipboard.writeText(submittedReference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNewEnquiry = () => {
    setSubmittedReference(null);
    setCopied(false);
    reset();
  };

  const inputBaseClasses = `w-full h-14 px-4 text-sm font-sans transition-all duration-200 border rounded-xs outline-none ${
    isDark
      ? 'bg-ink-900 border-teal-500/40 text-surface-fg placeholder:text-surface-muted/60 focus:border-copper-500 focus:ring-2 focus:ring-copper-500/40'
      : 'bg-white border-ink-900/25 text-ink-900 placeholder:text-graphite-600/60 focus:border-copper-500 focus:ring-2 focus:ring-copper-500/40'
  }`;

  const labelBaseClasses = `block font-sans text-[12px] uppercase tracking-[0.12em] mb-2 font-bold text-surface-fg`;
  const errorTextClass = isDark ? 'text-amber-300 bg-danger-500/90 px-2 py-0.5 rounded-xs inline-block' : 'text-danger-500 font-semibold';

  return (
    <Surface
      tone={isDark ? 'dark' : 'ivory'}
      as="div"
      className={`w-full rounded-sm transition-colors ${
        isModal
          ? 'p-6 sm:p-10 lg:p-12'
          : 'p-6 sm:p-10 lg:p-14 border border-[var(--border)] border-t-[4px] border-t-copper-500 shadow-2xl'
      }`}
    >
      {/* 2px Copper Top Accent */}
      {!isModal && (
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-copper-500 to-transparent mb-8" />
      )}

      {!submittedReference ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
          <div className="space-y-3">
            <TechnicalEyebrow variant="auto">
              TECHNICAL CONSULTATION // SRIPERUMBUDUR HUB
            </TechnicalEyebrow>
            <h3 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-heading">
              Start Your Project Consultation
            </h3>
            <p className="text-sm sm:text-base font-normal max-w-2xl leading-relaxed text-surface-muted">
              Submit your structural elevator shaft parameters or industrial lifting requirements. Our senior vertical mobility engineers will review the civil scope and confirm an appointment.
            </p>
          </div>

          {serverError && (
            <div className="p-4 rounded-sm bg-danger-500 text-white text-xs font-mono flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Section 1: Customer Contact Credentials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className={labelBaseClasses}>
                Full Name*
              </label>
              <input
                {...register('fullName')}
                placeholder="e.g. S. Rajendran"
                className={inputBaseClasses}
              />
              {errors.fullName && (
                <span className={`text-[11px] font-mono mt-1.5 block ${errorTextClass}`}>
                  {errors.fullName.message}
                </span>
              )}
            </div>

            <div>
              <label className={labelBaseClasses}>
                Telephone / Mobile Number*
              </label>
              <input
                {...register('phone')}
                type="tel"
                placeholder="8939359592"
                className={inputBaseClasses}
              />
              {errors.phone && (
                <span className={`text-[11px] font-mono mt-1.5 block ${errorTextClass}`}>
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div>
              <label className={labelBaseClasses}>
                Corporate Email Address*
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="client@company.com"
                className={inputBaseClasses}
              />
              {errors.email && (
                <span className={`text-[11px] font-mono mt-1.5 block ${errorTextClass}`}>
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label className={labelBaseClasses}>
                Company / Organization (Optional)
              </label>
              <input
                {...register('companyName')}
                placeholder="e.g. Apex Industrial Systems"
                className={inputBaseClasses}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelBaseClasses}>
                Installation Site Location*
              </label>
              <input
                {...register('location')}
                placeholder="e.g. SIPCOT Industrial Area, Sriperumbudur / Chennai"
                className={inputBaseClasses}
              />
              {errors.location && (
                <span className={`text-[11px] font-mono mt-1.5 block ${errorTextClass}`}>
                  {errors.location.message}
                </span>
              )}
            </div>
          </div>

          {/* Section 2: Enquiry Category & Equipment of Interest */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[var(--border)]">
            <div>
              <label className={labelBaseClasses}>
                Enquiry Category*
              </label>
              <select
                {...register('enquiryType')}
                className={`${inputBaseClasses} cursor-pointer`}
              >
                <option value="New Lift Installation" className="bg-ink-900 text-ivory-50">
                  New Lift Installation
                </option>
                <option value="Product Enquiry" className="bg-ink-900 text-ivory-50">
                  Product Enquiry
                </option>
                <option value="Maintenance" className="bg-ink-900 text-ivory-50">
                  Preventative Maintenance Contract
                </option>
                <option value="Repair" className="bg-ink-900 text-ivory-50">
                  Emergency Repair & Servicing
                </option>
                <option value="Business Partnership" className="bg-ink-900 text-ivory-50">
                  Architectural / Civil Partnership
                </option>
                <option value="General Enquiry" className="bg-ink-900 text-ivory-50">
                  General Engineering Enquiry
                </option>
              </select>
            </div>

            <div>
              <label className={labelBaseClasses}>
                Equipment or Service of Interest*
              </label>
              <input
                {...register('productServiceInterest')}
                placeholder="e.g. Heavy Goods Lift / Passenger Elevator"
                className={inputBaseClasses}
              />
              {errors.productServiceInterest && (
                <span className={`text-[11px] font-mono mt-1.5 block ${errorTextClass}`}>
                  {errors.productServiceInterest.message}
                </span>
              )}
            </div>
          </div>

          {/* Section 3: Consultation Date & Window */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[var(--border)]">
            <div>
              <label className={labelBaseClasses}>
                Preferred Consultation Date*
              </label>
              <input
                {...register('preferredDate')}
                type="date"
                min={todayStr}
                className={`${inputBaseClasses} font-mono`}
              />
              {errors.preferredDate && (
                <span className={`text-[11px] font-mono mt-1.5 block ${errorTextClass}`}>
                  {errors.preferredDate.message}
                </span>
              )}
            </div>

            <div>
              <label className={labelBaseClasses}>
                Preferred Time Window*
              </label>
              <select
                {...register('preferredTime')}
                className={`${inputBaseClasses} cursor-pointer`}
              >
                <option value="Morning (10:00 AM – 1:00 PM)" className="bg-ink-900 text-ivory-50">
                  Morning (10:00 AM – 1:00 PM)
                </option>
                <option value="Afternoon (1:00 PM – 4:00 PM)" className="bg-ink-900 text-ivory-50">
                  Afternoon (1:00 PM – 4:00 PM)
                </option>
                <option value="Evening (4:00 PM – 6:30 PM)" className="bg-ink-900 text-ivory-50">
                  Evening (4:00 PM – 6:30 PM)
                </option>
                <option value="Flexible / Contact to confirm" className="bg-ink-900 text-ivory-50">
                  Flexible / Call to confirm
                </option>
              </select>
            </div>
          </div>

          {/* Section 4: Project Scope */}
          <div className="pt-4 border-t border-[var(--border)] space-y-4">
            <div>
              <label className={labelBaseClasses}>
                Technical Scope & Structural Description*
              </label>
              <textarea
                {...register('projectDescription')}
                rows={4}
                placeholder="Please outline floor levels, required passenger or cargo payload, pit depth/headroom constraints, and civil construction state..."
                className={`w-full p-4 min-h-[140px] text-sm font-sans transition-all duration-200 border rounded-sm outline-none leading-relaxed ${
                  isDark
                    ? 'bg-ink-900 border-teal-500/40 text-surface-fg placeholder:text-surface-muted/60 focus:border-copper-500 focus:ring-2 focus:ring-copper-500/40'
                    : 'bg-white border-ink-900/25 text-ink-900 placeholder:text-graphite-600/60 focus:border-copper-500 focus:ring-2 focus:ring-copper-500/40'
                }`}
              />
              {errors.projectDescription && (
                <span className={`text-[11px] font-mono mt-1.5 block ${errorTextClass}`}>
                  {errors.projectDescription.message}
                </span>
              )}
            </div>

            <div>
              <label className={labelBaseClasses}>
                Additional Site Conditions / Access Instructions (Optional)
              </label>
              <input
                {...register('additionalMessage')}
                placeholder="Gate pass requirements, security protocols, or architect references..."
                className={inputBaseClasses}
              />
            </div>
          </div>

          {/* Honeypot field */}
          <input {...register('hp_company_url')} type="text" className="hidden" tabIndex={-1} autoComplete="off" />

          {/* Submission Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[var(--border)]">
            <span className="text-xs font-mono text-surface-muted">
              *An engineering specialist will contact you directly to confirm the requested time slot.
            </span>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 h-14 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 font-sans text-[13px] font-bold uppercase tracking-[0.12em] transition-all duration-200 active:scale-[0.98] disabled:opacity-50 shrink-0 shadow-copper-glow hover:shadow-[0_0_28px_rgba(232,120,46,0.6)]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Request...</span>
                </>
              ) : (
                <>
                  <span>Submit Consultation Request</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Confirmation State */
        <div className="text-center py-12 space-y-6">
          <div className="w-16 h-16 rounded-full bg-copper-500/15 border border-copper-500 text-surface-accent mx-auto flex items-center justify-center shadow-copper-glow">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <TechnicalEyebrow variant="auto">
              REQUEST RECORDED IN HYDRELEX SYSTEMS
            </TechnicalEyebrow>
            <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-surface-heading">
              Consultation Logged
            </h3>
            <p className="text-sm font-normal leading-relaxed text-surface-muted">
              Your appointment request has been persisted to the HYDRELEX operations database and routed to our Sriperumbudur engineering office.
            </p>
          </div>

          {/* Reference ID Card */}
          <div className="max-w-md mx-auto p-6 rounded-sm border border-[var(--border)] bg-surface-elevated space-y-3">
            <div className="text-[11px] font-sans uppercase tracking-[0.12em] font-bold text-surface-muted">
              Your Official Reference Tracking Code
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="font-mono text-2xl sm:text-3xl font-extrabold tracking-widest text-surface-accent">
                {submittedReference}
              </span>
              <button
                onClick={handleCopy}
                className="p-2 rounded-sm bg-copper-500 text-ink-950 hover:bg-copper-400 transition-colors shadow-sm"
                title="Copy Reference Code"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copied && (
              <span className="text-xs font-mono text-emerald-400 block">
                Reference code copied to clipboard!
              </span>
            )}
            <p className="text-[11px] font-sans leading-tight text-surface-muted">
              Keep this reference code to track appointment progress on our website using the Track Consultation feature.
            </p>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={handleNewEnquiry}
              className="px-6 py-3 rounded-sm border border-[var(--border)] text-surface-fg hover:bg-copper-500/15 text-xs font-sans font-bold uppercase tracking-[0.12em] transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      )}
    </Surface>
  );
};
