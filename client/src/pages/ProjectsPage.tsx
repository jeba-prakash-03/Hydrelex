import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ProjectsGallery } from '../components/ProjectsGallery';
import { TechnicalEyebrow } from '../components/ui/TechnicalEyebrow';
import { CTASection } from '../components/CTASection';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-br from-ivory-50 via-steel-100/40 to-ivory-100 text-graphite-900 overflow-x-hidden">
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
            <span className="text-copper-500 font-semibold">Installation Gallery</span>
          </div>

          <TechnicalEyebrow variant="copper">
            GALLERY & INSTALLATION DIRECTORY
          </TechnicalEyebrow>

          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-heading font-black tracking-tight text-steel-100 uppercase leading-[1.02]">
            Vertical Mobility <span className="text-copper-500">Projects</span>
          </h1>

          <p className="text-base sm:text-xl text-steel-300 max-w-3xl font-light leading-relaxed">
            Showcasing architectural passenger elevators, industrial freight lifts, and custom hydraulic scissor platforms across South India.
          </p>
        </div>
      </section>

      {/* 2. Asymmetric Gallery with Filter Tabs and Lightbox */}
      <ProjectsGallery />

      <CTASection />
    </div>
  );
};
