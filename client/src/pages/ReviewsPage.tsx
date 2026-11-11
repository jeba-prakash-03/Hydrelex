import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { CustomerReviews } from '../components/CustomerReviews';
import { TechnicalEyebrow } from '../components/ui/TechnicalEyebrow';
import { CTASection } from '../components/CTASection';
import { Surface } from '../components/ui/Surface';

export const ReviewsPage: React.FC = () => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. Full-Width Warm Sand Header Band */}
      <Surface
        tone="sand"
        as="section"
        className="w-full pt-28 pb-12 lg:pt-36 lg:pb-20 relative overflow-hidden border-b border-sand-200"
      >
        <div className="w-full px-fluid relative z-10 space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-sans text-xs text-surface-fg font-semibold">
            <Link to="/" className="hover:text-copper-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-surface-muted" />
            <span className="bg-teal-700 text-ivory-50 px-2.5 py-0.5 rounded-xs font-bold">
              Client Feedback
            </span>
          </div>

          <TechnicalEyebrow variant="copper">
            VERIFIED CLIENT PERSPECTIVES
          </TechnicalEyebrow>

          <h1 className="text-[clamp(1.85rem,7.5vw,2.75rem)] lg:text-[56px] font-heading font-black tracking-tight text-surface-heading uppercase leading-[1.02]">
            Client Feedback &{' '}
            <span className="text-copper-700 underline decoration-copper-500/40 underline-offset-8">
              Ratings
            </span>
          </h1>

          <p className="text-base sm:text-xl text-surface-fg max-w-3xl font-normal leading-relaxed">
            Verified evaluations from property managers, industrial plants, and architects who trust HYDRELEX Lift Systems.
          </p>
        </div>
      </Surface>

      {/* 2. Customer Reviews with Featured Review & Moderation Flow (Deep Teal) */}
      <CustomerReviews />

      <CTASection />
    </div>
  );
};
