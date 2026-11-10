import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import confetti from 'canvas-confetti';
import {
  Send,
  CheckCircle2,
  Calendar,
  Clock,
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  Copy,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { api } from '../lib/api';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';

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
          colors: ['#B08D57', '#B8BBBE', '#1C1C1E', '#F4EFE6'],
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

  const inputBaseClasses = `w-full h-14 px-4 text-sm font-sans transition-all duration-200 border rounded-sm outline-none placeholder:text-silver-400/50 ${
    isDark
      ? 'bg-ink-900/70 border-graphite-600 text-ivory-100 focus:border-champagne-500 focus:ring-1 focus:ring-champagne-500'
      : 'bg-white border-graphite-600/30 text-graphite-800 focus:border-champagne-600 focus:ring-1 focus:ring-champagne-600'
  }`;

  const labelBaseClasses = `block font-mono text-[11px] uppercase tracking-technical mb-2 font-medium ${
    isDark ? 'text-silver-400' : 'text-graphite-600'
  }`;

  return (
    <div
      className={`w-full rounded-sm transition-colors ${
        isModal
          ? 'p-6 sm:p-10 lg:p-12'
          : `p-6 sm:p-10 lg:p-14 border ${
              isDark
                ? 'bg-graphite-800 border-graphite-600 shadow-2xl'
                : 'bg-ivory-50 border-graphite-600/30 shadow-md'
            }`
      }`}
    >
      {/* 1px Champagne Top Accent */}
      {!isModal && (
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-champagne-500/70 to-transparent mb-8" />
      )}

      {!submittedReference ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
          <div className="space-y-3">
            <TechnicalEyebrow variant={isDark ? 'champagne' : 'graphite'}>
              TECHNICAL CONSULTATION // SRIPERUMBUDUR HUB
            </TechnicalEyebrow>
            <h3
              className={`font-heading text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isDark ? 'text-ivory-100' : 'text-graphite-800'
              }`}
            >
              Start Your Project Consultation
            </h3>
            <p
              className={`text-sm sm:text-base font-light max-w-2xl leading-relaxed ${
                isDark ? 'text-silver-400' : 'text-graphite-600'
              }`}
            >
              Submit your structural elevator shaft parameters or industrial lifting requirements. Our senior vertical mobility engineers will review the civil scope and confirm an appointment.
            </p>
          </div>

          {serverError && (
            <div className="p-4 rounded-sm bg-danger-500/10 border border-danger-500 text-danger-500 text-xs font-mono flex items-center gap-2.5">
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
              <div className="relative">
                <input
                  {...register('fullName')}
                  placeholder="e.g. S. Rajendran"
                  className={inputBaseClasses}
                />
              </div>
              {errors.fullName && (
                <span className="text-[11px] font-mono text-danger-500 mt-1.5 block">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            <div>
              <label className={labelBaseClasses}>
                Telephone / Mobile Number*
              </label>
              <div className="relative">
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="8939359592"
                  className={inputBaseClasses}
                />
              </div>
              {errors.phone && (
                <span className="text-[11px] font-mono text-danger-500 mt-1.5 block">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div>
              <label className={labelBaseClasses}>
                Corporate Email Address*
              </label>
              <div className="relative">
                <input
                  {...register('email')}
                  type="email"
                  placeholder="client@company.com"
                  className={inputBaseClasses}
                />
              </div>
              {errors.email && (
                <span className="text-[11px] font-mono text-danger-500 mt-1.5 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label className={labelBaseClasses}>
                Company / Organization (Optional)
              </label>
              <div className="relative">
                <input
                  {...register('companyName')}
                  placeholder="e.g. Apex Industrial Systems"
                  className={inputBaseClasses}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className={labelBaseClasses}>
                Installation Site Location*
              </label>
              <div className="relative">
                <input
                  {...register('location')}
                  placeholder="e.g. SIPCOT Industrial Area, Sriperumbudur / Chennai"
                  className={inputBaseClasses}
                />
              </div>
              {errors.location && (
                <span className="text-[11px] font-mono text-danger-500 mt-1.5 block">
                  {errors.location.message}
                </span>
              )}
            </div>
          </div>

          {/* Section 2: Enquiry Category & Equipment of Interest */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-graphite-600/40">
            <div>
              <label className={labelBaseClasses}>
                Enquiry Category*
              </label>
              <select
                {...register('enquiryType')}
                className={`${inputBaseClasses} cursor-pointer`}
              >
                <option value="New Lift Installation" className="bg-graphite-800 text-ivory-100">
                  New Lift Installation
                </option>
                <option value="Product Enquiry" className="bg-graphite-800 text-ivory-100">
                  Product Enquiry
                </option>
                <option value="Maintenance" className="bg-graphite-800 text-ivory-100">
                  Preventative Maintenance Contract
                </option>
                <option value="Repair" className="bg-graphite-800 text-ivory-100">
                  Emergency Repair & Servicing
                </option>
                <option value="Business Partnership" className="bg-graphite-800 text-ivory-100">
                  Architectural / Civil Partnership
                </option>
                <option value="General Enquiry" className="bg-graphite-800 text-ivory-100">
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
                <span className="text-[11px] font-mono text-danger-500 mt-1.5 block">
                  {errors.productServiceInterest.message}
                </span>
              )}
            </div>
          </div>

          {/* Section 3: Consultation Date & Window */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-graphite-600/40">
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
                <span className="text-[11px] font-mono text-danger-500 mt-1.5 block">
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
                <option value="Morning (10:00 AM – 1:00 PM)" className="bg-graphite-800 text-ivory-100">
                  Morning (10:00 AM – 1:00 PM)
                </option>
                <option value="Afternoon (1:00 PM – 4:00 PM)" className="bg-graphite-800 text-ivory-100">
                  Afternoon (1:00 PM – 4:00 PM)
                </option>
                <option value="Evening (4:00 PM – 6:30 PM)" className="bg-graphite-800 text-ivory-100">
                  Evening (4:00 PM – 6:30 PM)
                </option>
                <option value="Flexible / Contact to confirm" className="bg-graphite-800 text-ivory-100">
                  Flexible / Call to confirm
                </option>
              </select>
            </div>
          </div>

          {/* Section 4: Project Scope */}
          <div className="pt-4 border-t border-graphite-600/40 space-y-4">
            <div>
              <label className={labelBaseClasses}>
                Technical Scope & Structural Description*
              </label>
              <textarea
                {...register('projectDescription')}
                rows={4}
                placeholder="Please outline floor levels, required passenger or cargo payload, pit depth/headroom constraints, and civil construction state..."
                className={`w-full p-4 min-h-[140px] text-sm font-sans transition-all duration-200 border rounded-sm outline-none placeholder:text-silver-400/50 leading-relaxed ${
                  isDark
                    ? 'bg-ink-900/70 border-graphite-600 text-ivory-100 focus:border-champagne-500 focus:ring-1 focus:ring-champagne-500'
                    : 'bg-white border-graphite-600/30 text-graphite-800 focus:border-champagne-600 focus:ring-1 focus:ring-champagne-600'
                }`}
              />
              {errors.projectDescription && (
                <span className="text-[11px] font-mono text-danger-500 mt-1.5 block">
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
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-graphite-600/40">
            <span className={`text-xs font-mono ${isDark ? 'text-silver-400/70' : 'text-graphite-600'}`}>
              *An engineering specialist will contact you directly to confirm the requested time slot.
            </span>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 h-14 rounded-sm bg-champagne-500 hover:bg-champagne-600 text-ink-900 font-mono text-xs font-bold uppercase tracking-technical transition-all duration-200 active:scale-[0.98] disabled:opacity-50 shrink-0"
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
          <div className="w-16 h-16 rounded-full bg-champagne-500/15 border border-champagne-500 text-champagne-500 mx-auto flex items-center justify-center shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <TechnicalEyebrow variant={isDark ? 'champagne' : 'graphite'}>
              REQUEST RECORDED IN HYDRELEX SYSTEMS
            </TechnicalEyebrow>
            <h3
              className={`font-heading text-3xl sm:text-4xl font-extrabold ${
                isDark ? 'text-ivory-100' : 'text-graphite-800'
              }`}
            >
              Consultation Logged
            </h3>
            <p
              className={`text-sm font-light leading-relaxed ${
                isDark ? 'text-silver-400' : 'text-graphite-600'
              }`}
            >
              Your appointment request has been persisted to the HYDRELEX operations database and routed to our Sriperumbudur engineering office.
            </p>
          </div>

          {/* Reference ID Card */}
          <div
            className={`max-w-md mx-auto p-6 rounded-sm border space-y-3 ${
              isDark
                ? 'bg-ink-900/80 border-graphite-600'
                : 'bg-white border-graphite-600/30'
            }`}
          >
            <div
              className={`text-[10px] font-mono uppercase tracking-technical ${
                isDark ? 'text-silver-400' : 'text-graphite-600'
              }`}
            >
              Your Official Reference Tracking Code
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="font-mono text-2xl sm:text-3xl font-extrabold tracking-widest text-champagne-500">
                {submittedReference}
              </span>
              <button
                onClick={handleCopy}
                className="p-2 rounded-sm bg-graphite-600/50 hover:bg-graphite-600 text-champagne-500 transition-colors"
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
            <p
              className={`text-[11px] font-mono leading-tight ${
                isDark ? 'text-silver-400/80' : 'text-graphite-600'
              }`}
            >
              Keep this reference code to track appointment progress on our website using the Track Consultation feature.
            </p>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={handleNewEnquiry}
              className={`px-6 py-3 rounded-sm border text-xs font-mono uppercase transition-colors ${
                isDark
                  ? 'border-graphite-600 text-silver-400 hover:text-ivory-100 hover:bg-graphite-600/30'
                  : 'border-graphite-600/40 text-graphite-800 hover:bg-ivory-100'
              }`}
            >
              Submit Another Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
