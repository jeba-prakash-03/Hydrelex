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
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { api } from '../lib/api';

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

interface EnquiryFormProps {
  initialInterest?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ initialInterest }) => {
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

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
      productServiceInterest: initialInterest || 'Passenger Lifts',
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
          colors: ['#C5A880', '#C67D5A', '#EAE8E1', '#18191B'],
        });
      } else {
        setServerError(res.message || 'Submission failed. Please try again.');
      }
    } catch (err: any) {
      setServerError(err.message || 'Server error. Please check your connection.');
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

  return (
    <div className="w-full bg-arch-graphite text-white rounded-sm border border-arch-steel/60 shadow-architectural-dark p-8 sm:p-12 lg:p-16 relative overflow-hidden">
      {/* Restrained architectural accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-arch-champagne via-arch-copper to-arch-steel" />

      {!submittedReference ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-ultra-wide uppercase text-arch-champagne font-semibold block">
              TECHNICAL CONSULTATION // SRIPERUMBUDUR HUB
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Initiate Project Consultation
            </h3>
            <p className="text-sm text-arch-sand/80 font-light max-w-2xl leading-relaxed">
              Submit your architectural shaft parameters or industrial lifting requirements. Our senior vertical mobility engineers will review the civil scope and confirm an appointment.
            </p>
          </div>

          {serverError && (
            <div className="p-4 rounded-sm bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs font-mono flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Section 1: Customer Contact Credentials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase text-arch-sand mb-1.5 font-medium">
                Full Name*
              </label>
              <div className="relative">
                <input
                  {...register('fullName')}
                  placeholder="e.g. S. Rajendran"
                  className="w-full pl-10 pr-4 py-3 rounded-sm border border-arch-steel/70 bg-arch-charcoal text-white text-xs font-sans focus:outline-none focus:border-arch-champagne transition-colors"
                />
                <User className="w-4 h-4 text-arch-slate absolute left-3.5 top-3.5" />
              </div>
              {errors.fullName && (
                <span className="text-[11px] font-mono text-rose-400 mt-1 block">{errors.fullName.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-arch-sand mb-1.5 font-medium">
                Telephone / Mobile Number*
              </label>
              <div className="relative">
                <input
                  {...register('phone')}
                  placeholder="8939359592 / 9876543210"
                  className="w-full pl-10 pr-4 py-3 rounded-sm border border-arch-steel/70 bg-arch-charcoal text-white text-xs font-sans focus:outline-none focus:border-arch-champagne transition-colors"
                />
                <Phone className="w-4 h-4 text-arch-slate absolute left-3.5 top-3.5" />
              </div>
              {errors.phone && (
                <span className="text-[11px] font-mono text-rose-400 mt-1 block">{errors.phone.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-arch-sand mb-1.5 font-medium">
                Corporate Email Address*
              </label>
              <div className="relative">
                <input
                  {...register('email')}
                  type="email"
                  placeholder="client@company.com"
                  className="w-full pl-10 pr-4 py-3 rounded-sm border border-arch-steel/70 bg-arch-charcoal text-white text-xs font-sans focus:outline-none focus:border-arch-champagne transition-colors"
                />
                <Mail className="w-4 h-4 text-arch-slate absolute left-3.5 top-3.5" />
              </div>
              {errors.email && (
                <span className="text-[11px] font-mono text-rose-400 mt-1 block">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-arch-sand mb-1.5 font-medium">
                Company / Organization (Optional)
              </label>
              <div className="relative">
                <input
                  {...register('companyName')}
                  placeholder="e.g. Apex Industrial Systems"
                  className="w-full pl-10 pr-4 py-3 rounded-sm border border-arch-steel/70 bg-arch-charcoal text-white text-xs font-sans focus:outline-none focus:border-arch-champagne transition-colors"
                />
                <Building className="w-4 h-4 text-arch-slate absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono uppercase text-arch-sand mb-1.5 font-medium">
                Installation Site Location*
              </label>
              <div className="relative">
                <input
                  {...register('location')}
                  placeholder="e.g. SIPCOT Industrial Area, Sriperumbudur / Chennai"
                  className="w-full pl-10 pr-4 py-3 rounded-sm border border-arch-steel/70 bg-arch-charcoal text-white text-xs font-sans focus:outline-none focus:border-arch-champagne transition-colors"
                />
                <MapPin className="w-4 h-4 text-arch-slate absolute left-3.5 top-3.5" />
              </div>
              {errors.location && (
                <span className="text-[11px] font-mono text-rose-400 mt-1 block">{errors.location.message}</span>
              )}
            </div>
          </div>

          {/* Section 2: Enquiry Category & Product Interest */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-arch-steel/40">
            <div>
              <label className="block text-xs font-mono uppercase text-arch-sand mb-1.5 font-medium">
                Enquiry Category*
              </label>
              <select
                {...register('enquiryType')}
                className="w-full px-4 py-3 rounded-sm border border-arch-steel/70 bg-arch-charcoal text-white text-xs font-sans focus:outline-none focus:border-arch-champagne"
              >
                <option value="New Lift Installation">New Lift Installation</option>
                <option value="Product Enquiry">Product Enquiry</option>
                <option value="Maintenance">Preventative Maintenance Contract</option>
                <option value="Repair">Emergency Repair & Servicing</option>
                <option value="Business Partnership">Architectural / Civil Partnership</option>
                <option value="General Enquiry">General Engineering Enquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-arch-sand mb-1.5 font-medium">
                System or Service of Interest*
              </label>
              <input
                {...register('productServiceInterest')}
                placeholder="e.g. Heavy Goods Lift 3000kg / Passenger Lift 13 Persons"
                className="w-full px-4 py-3 rounded-sm border border-arch-steel/70 bg-arch-charcoal text-white text-xs font-sans focus:outline-none focus:border-arch-champagne"
              />
              {errors.productServiceInterest && (
                <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                  {errors.productServiceInterest.message}
                </span>
              )}
            </div>
          </div>

          {/* Section 3: Consultation Date & Window */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-arch-steel/40">
            <div>
              <label className="block text-xs font-mono uppercase text-arch-sand mb-1.5 font-medium">
                Preferred Consultation Date*
              </label>
              <div className="relative">
                <input
                  {...register('preferredDate')}
                  type="date"
                  min={todayStr}
                  className="w-full pl-10 pr-4 py-3 rounded-sm border border-arch-steel/70 bg-arch-charcoal text-white text-xs font-mono focus:outline-none focus:border-arch-champagne"
                />
                <Calendar className="w-4 h-4 text-arch-slate absolute left-3.5 top-3.5" />
              </div>
              {errors.preferredDate && (
                <span className="text-[11px] font-mono text-rose-400 mt-1 block">{errors.preferredDate.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-arch-sand mb-1.5 font-medium">
                Preferred Consultation Window*
              </label>
              <div className="relative">
                <select
                  {...register('preferredTime')}
                  className="w-full pl-10 pr-4 py-3 rounded-sm border border-arch-steel/70 bg-arch-charcoal text-white text-xs font-sans focus:outline-none focus:border-arch-champagne"
                >
                  <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                  <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                  <option value="Evening (4:00 PM – 6:30 PM)">Evening (4:00 PM – 6:30 PM)</option>
                  <option value="Flexible / Contact to confirm">Flexible / Call to confirm</option>
                </select>
                <Clock className="w-4 h-4 text-arch-slate absolute left-3.5 top-3.5" />
              </div>
            </div>
          </div>

          {/* Section 4: Project Scope */}
          <div className="pt-4 border-t border-arch-steel/40 space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-arch-sand mb-1.5 font-medium">
                Technical Scope & Structural Description*
              </label>
              <textarea
                {...register('projectDescription')}
                rows={4}
                placeholder="Please outline floor levels, required passenger or cargo payload, pit depth/headroom constraints, and civil construction state..."
                className="w-full px-4 py-3 rounded-sm border border-arch-steel/70 bg-arch-charcoal text-white text-xs font-sans focus:outline-none focus:border-arch-champagne leading-relaxed"
              />
              {errors.projectDescription && (
                <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                  {errors.projectDescription.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-arch-sand mb-1.5 font-medium">
                Additional Site Conditions / Access Instructions (Optional)
              </label>
              <input
                {...register('additionalMessage')}
                placeholder="Gate pass requirements, security protocols, or architect references..."
                className="w-full px-4 py-3 rounded-sm border border-arch-steel/70 bg-arch-charcoal text-white text-xs font-sans focus:outline-none focus:border-arch-champagne"
              />
            </div>
          </div>

          {/* Honeypot */}
          <input {...register('hp_company_url')} type="text" className="hidden" tabIndex={-1} />

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-arch-steel/40">
            <span className="text-xs font-mono text-arch-sand/60">
              *Notice: An engineering specialist will contact you directly to confirm the requested time slot.
            </span>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-sm bg-arch-champagne hover:bg-arch-champagneLight text-arch-black font-mono text-xs font-bold uppercase tracking-architectural transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
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
          <div className="w-16 h-16 rounded-full bg-arch-champagne/20 border border-arch-champagne/40 text-arch-champagne mx-auto flex items-center justify-center shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-mono uppercase tracking-ultra-wide text-arch-champagne font-semibold block">
              REQUEST RECORDED IN HYDRELEX SYSTEMS
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
              Consultation Logged
            </h3>
            <p className="text-sm text-arch-sand/80 font-light leading-relaxed">
              Your appointment request has been persisted to the HYDRELEX operations database and routed to our Sriperumbudur engineering office.
            </p>
          </div>

          {/* Reference ID Card */}
          <div className="max-w-md mx-auto p-6 rounded-sm bg-arch-charcoal border border-arch-steel/70 space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-ultra-wide text-arch-sand/70">
              Your Official Tracking Code
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="font-mono text-2xl sm:text-3xl font-extrabold tracking-widest text-arch-champagne">
                {submittedReference}
              </span>
              <button
                onClick={handleCopy}
                className="p-2 rounded-sm bg-white/10 hover:bg-white/20 text-arch-champagne transition-colors"
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
            <p className="text-[11px] font-mono text-arch-sand/60 leading-tight">
              Keep this reference code to track appointment progress on our website using the Track Consultation portal.
            </p>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={handleNewEnquiry}
              className="px-6 py-2.5 rounded-sm border border-arch-steel/60 text-xs font-mono uppercase text-arch-sand hover:text-white hover:bg-white/5 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
