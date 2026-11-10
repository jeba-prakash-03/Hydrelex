import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { CustomerReviews } from '../components/CustomerReviews';
import { TechnicalEyebrow } from '../components/ui/TechnicalEyebrow';
import { CTASection } from '../components/CTASection';

export const ReviewsPage: React.FC = () => {
  return (
    <div className="w-full bg-graphite-900 text-steel-100 overflow-x-hidden">
      {/* 1. Full-Width Dark Header */}
      <section
        className="w-full bg-ink-950 text-steel-100 pt-36 pb-20 relative overflow-hidden border-b border-graphite-700"
        style={{ backgroundColor: '#0A0A0B' }}
      >
        <div className="w-full px-fluid relative z-10 space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-sans text-xs text-steel-300">
            <Link to="/" className="hover:text-copper-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-steel-300/50" />
            <span className="text-copper-500 font-semibold">Client Feedback</span>
          </div>

          <TechnicalEyebrow variant="copper">
            VERIFIED CLIENT PERSPECTIVES
          </TechnicalEyebrow>

          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-heading font-black tracking-tight text-steel-100 uppercase leading-[1.02]">
            Client Feedback & <span className="text-copper-500">Ratings</span>
          </h1>

          <p className="text-base sm:text-xl text-steel-300 max-w-3xl font-light leading-relaxed">
            Verified evaluations from property managers, industrial plants, and architects who trust HYDRELEX Lift Systems.
          </p>
        </div>
      </section>

      {/* 2. Customer Reviews with Featured Review & Moderation Flow */}
      <CustomerReviews />

      <CTASection />
    </div>
  );
};
