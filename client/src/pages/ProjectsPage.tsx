import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ProjectsGallery } from '../components/ProjectsGallery';
import { TechnicalEyebrow } from '../components/ui/TechnicalEyebrow';
import { CTASection } from '../components/CTASection';
import { Surface } from '../components/ui/Surface';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. Full-Width Amber Gold Header Band */}
      <Surface
        tone="amber"
        as="section"
        className="w-full pt-36 pb-20 relative overflow-hidden border-b border-ink-900/20 bg-gradient-to-br from-amber-500 via-amber-500 to-copper-500"
      >
        <div className="w-full px-fluid relative z-10 space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-sans text-xs text-surface-fg font-semibold">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-surface-fg" />
            <span className="bg-ink-900 text-amber-300 px-2.5 py-0.5 rounded-xs font-bold">
              Installation Gallery
            </span>
          </div>

          <TechnicalEyebrow variant="graphite">
            GALLERY & INSTALLATION DIRECTORY
          </TechnicalEyebrow>

          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-heading font-black tracking-tight text-surface-heading uppercase leading-[1.02]">
            Vertical Mobility{' '}
            <span className="inline-block bg-teal-900 text-amber-300 px-3 py-0.5 rounded-xs">
              Projects
            </span>
          </h1>

          <p className="text-base sm:text-xl text-surface-fg max-w-3xl font-medium leading-relaxed">
            Showcasing architectural passenger elevators, industrial freight lifts, and custom hydraulic scissor platforms across South India.
          </p>
        </div>
      </Surface>

      {/* 2. Asymmetric Gallery with Filter Tabs and Lightbox (Ivory) */}
      <ProjectsGallery />

      <CTASection />
    </div>
  );
};
