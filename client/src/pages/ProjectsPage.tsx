import React from 'react';
import { ProjectsGallery } from '../components/ProjectsGallery';
import { CTASection } from '../components/CTASection';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="w-full bg-arch-ivory text-arch-graphite overflow-x-hidden">
      {/* Header Banner (Full Width) */}
      <section className="w-full bg-arch-black text-white pt-36 pb-20 relative overflow-hidden border-b border-arch-steel/30">
        <div className="absolute inset-0 bg-blueprint-grid opacity-15" />
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10 space-y-4">
          <span className="text-[10px] font-mono tracking-ultra-wide uppercase text-arch-champagne font-semibold block">
            GALLERY & INSTALLATION DIRECTORY
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[1.02]">
            Vertical Mobility Projects
          </h1>
          <p className="text-base sm:text-xl text-arch-sand/80 max-w-3xl font-light leading-relaxed">
            Showcasing architectural passenger elevators, industrial freight lifts, and custom hydraulic scissor platforms across South India.
          </p>
        </div>
      </section>

      <ProjectsGallery />

      <CTASection />
    </div>
  );
};
