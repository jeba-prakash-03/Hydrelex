import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { api } from '../lib/api';
import { Eye, MapPin, X, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';
import { ImageWithFallback } from './ui/ImageWithFallback';
import { LiftType } from './ui/LiftLineArtSvg';

// Initial baseline projects so gallery renders beautifully if database table is empty
const baselineGalleryProjects: Project[] = [
  {
    id: 101,
    title: 'Commercial Executive Passenger Elevator',
    category: 'Passenger Elevators',
    location: 'Corporate Park, Sriperumbudur',
    specifications: 'Custom stainless steel finish, VVVF gearless traction',
    description:
      'High-specification executive passenger lift installation with energy-efficient VVVF controller and automated landing doors.',
    cover_image: '/public/images/project-1.webp',
    is_sample: true,
    display_order: 1,
  },
  {
    id: 102,
    title: 'Heavy-Duty Warehouse Freight Lift',
    category: 'Goods / Freight Lifts',
    location: 'Industrial Logistics Hub, Mevallurkuppam',
    specifications: 'Heavy structural chassis, reinforced forklift sill',
    description:
      'Rugged industrial freight elevator engineered for heavy daily pallet truck transit and intensive factory duty cycles.',
    cover_image: '/public/images/project-2.webp',
    is_sample: true,
    display_order: 2,
  },
  {
    id: 103,
    title: 'Industrial Hydraulic Scissor Platform',
    category: 'Industrial Systems',
    location: 'Manufacturing Assembly Plant, Sriperumbudur',
    specifications: 'Dual hydraulic rams, heavy pantograph linkage',
    description:
      'Floor-to-mezzanine cargo lifting system engineered for high-tonnage component transfer with perimeter safety edges.',
    cover_image: '/public/images/project-3.webp',
    is_sample: true,
    display_order: 3,
  },
  {
    id: 104,
    title: 'Architectural Observation Panoramic Lift',
    category: 'Custom Panoramic',
    location: 'Executive Atrium Facility, Tamil Nadu',
    specifications: 'Curved laminated glass capsule, circular frame',
    description:
      'Custom architectural glass elevator ascending through an open corporate atrium with panoramic viewing panels.',
    cover_image: '/public/images/project-4.webp',
    is_sample: true,
    display_order: 4,
  },
  {
    id: 105,
    title: 'VVVF Inverter Modernization Retrofit',
    category: 'Modernization',
    location: 'Industrial Commercial Complex, Chennai Corridor',
    specifications: 'Regenerative VVVF drive, modern microprocessor panel',
    description:
      'Comprehensive electromechanical modernization replacing aging relays with modern digital speed controllers.',
    cover_image: '/public/images/project-5.webp',
    is_sample: true,
    display_order: 5,
  },
  {
    id: 106,
    title: 'Electro-Hydraulic Vehicle Transfer Lift',
    category: 'Hydraulic Platforms',
    location: 'Automotive Center, Sriperumbudur',
    specifications: 'Direct-acting ram piston, zero overhead machine room',
    description:
      'Heavy hydraulic lift platform designed for automotive transfer between ground and upper mezzanine levels.',
    cover_image: '/public/images/project-6.webp',
    is_sample: true,
    display_order: 6,
  },
];

function getCategoryFallbackType(category: string): LiftType {
  const c = category.toLowerCase();
  if (c.includes('freight') || c.includes('goods')) return 'freight';
  if (c.includes('scissor') || c.includes('industrial')) return 'scissor';
  if (c.includes('hydraulic')) return 'hydraulic';
  if (c.includes('panoramic') || c.includes('custom')) return 'panoramic';
  if (c.includes('modern') || c.includes('inverter')) return 'inverter';
  return 'passenger';
}

export const ProjectsGallery: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(baselineGalleryProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.getProjects();
        if (res.success && res.projects && res.projects.length > 0) {
          setProjects(res.projects);
        }
      } catch (err) {
        console.error('Gallery projects fetch error, keeping baseline:', err);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['ALL', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === 'ALL'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!activeModalProject) return;

      if (e.key === 'Escape') {
        setActiveModalProject(null);
      } else if (e.key === 'ArrowRight') {
        const currIdx = filteredProjects.findIndex((p) => p.id === activeModalProject.id);
        if (currIdx !== -1 && currIdx < filteredProjects.length - 1) {
          setActiveModalProject(filteredProjects[currIdx + 1]);
        }
      } else if (e.key === 'ArrowLeft') {
        const currIdx = filteredProjects.findIndex((p) => p.id === activeModalProject.id);
        if (currIdx > 0) {
          setActiveModalProject(filteredProjects[currIdx - 1]);
        }
      }
    },
    [activeModalProject, filteredProjects]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section
      id="projects"
      className="w-full bg-gradient-to-br from-ivory-50 via-steel-100/40 to-ivory-100 text-graphite-900 py-24 sm:py-32 relative overflow-hidden border-b border-graphite-700/20"
      style={{ backgroundColor: '#FBF8F2' }}
    >
      {/* Background Architectural Grid Overlay */}
      <div className="absolute inset-0 bg-technical-grid opacity-30 pointer-events-none" />

      {/* Oversized Outlined Numeral 05 Cropped Behind Section */}
      <div
        aria-hidden="true"
        className="absolute -top-12 left-6 sm:left-16 text-[18vw] font-heading font-black select-none pointer-events-none leading-none opacity-15"
        style={{
          WebkitTextStroke: '1.5px #B4531A',
          color: 'transparent',
        }}
      >
        05
      </div>

      <div className="w-full px-fluid relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8 border-b border-graphite-700/20 pb-8">
          <div className="space-y-4 max-w-3xl">
            <TechnicalEyebrow variant="graphite">
              PORTFOLIO SHOWCASE // 05
            </TechnicalEyebrow>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-heading font-extrabold text-graphite-900 tracking-tight leading-tight">
              Selected{' '}
              <span className="text-copper-700 underline decoration-copper-500/40 underline-offset-8">
                Installations
              </span>
            </h2>
            <p className="text-base sm:text-lg text-graphite-700 font-light leading-relaxed">
              Examine vertical mobility systems, heavy industrial cargo platforms, and bespoke architectural installations executed across Tamil Nadu.
            </p>
          </div>

          <div className="text-xs font-sans text-graphite-700 p-4 rounded-sm bg-white border border-graphite-700/20 max-w-md shadow-sm">
            <strong className="text-graphite-900 block mb-1 uppercase tracking-[0.12em] text-[11px] font-bold">
              Engineering Notice:
            </strong>
            Installation records marked with Sample Reference illustrate architectural geometry and will be refreshed with live commissioning photography.
          </div>
        </div>

        {/* Category Filters with Copper Indicator Chips */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-5 py-2.5 rounded-sm text-[12px] font-sans font-bold uppercase tracking-[0.14em] transition-all duration-200 select-none ${
                  isActive
                    ? 'text-ink-950 bg-copper-500 shadow-copper-glow font-bold'
                    : 'text-graphite-800 bg-white hover:bg-copper-500/10 border border-graphite-700/25 hover:border-copper-700/40'
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Asymmetric Proportional Grid (Large Tiles) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {filteredProjects.map((project, idx) => {
            const fallbackType = getCategoryFallbackType(project.category);

            // Asymmetric proportions across 12 columns
            const spanClass =
              idx % 3 === 0
                ? 'md:col-span-7 aspect-[16/10]'
                : idx % 3 === 1
                ? 'md:col-span-5 aspect-[4/3]'
                : 'md:col-span-6 aspect-[16/10]';

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.05 }}
                onClick={() => setActiveModalProject(project)}
                className={`group relative rounded-sm overflow-hidden bg-graphite-900 border border-graphite-700 border-t-[2.5px] border-t-copper-500 shadow-elevated-card hover:shadow-copper-glow hover:border-copper-500/80 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-end p-6 sm:p-8 cursor-pointer ${spanClass}`}
              >
                {/* Image with Fallback */}
                <div className="absolute inset-0 w-full h-full opacity-65 group-hover:opacity-85 transition-opacity duration-300">
                  <ImageWithFallback
                    src={project.cover_image}
                    alt={project.title}
                    fallbackType={fallbackType}
                    fallbackLabel={project.category}
                    aspectRatioClass="h-full w-full"
                    showOverlay={true}
                  />
                </div>

                {/* Top Tags with Copper Category Chip */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs z-10">
                  <span className="px-3 py-1 rounded-xs bg-copper-500 text-ink-950 text-[10px] font-sans font-bold uppercase tracking-[0.14em] shadow-sm">
                    {project.category}
                  </span>
                  {project.is_sample && (
                    <span className="px-2 py-0.5 rounded-xs bg-graphite-700/90 text-steel-300 text-[9.5px] uppercase tracking-wider font-semibold border border-graphite-600">
                      Sample Reference
                    </span>
                  )}
                </div>

                {/* Bottom Text Content (Animated Slide-Up on Hover with Copper Underline) */}
                <div className="relative z-10 space-y-2 text-steel-100">
                  {/* Copper Underline Indicator */}
                  <div className="w-8 h-[2px] bg-copper-500 transition-all duration-300 group-hover:w-20" />

                  <h3 className="font-heading text-2xl font-bold group-hover:text-copper-400 transition-colors">
                    {project.title.replace(' [Sample Placeholder]', '')}
                  </h3>

                  <p className="text-xs sm:text-sm text-steel-300 font-light line-clamp-2 max-w-lg leading-relaxed">
                    {project.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-graphite-600/50 text-xs text-steel-300">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-copper-500 shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-copper-500 uppercase tracking-[0.12em] text-[11px] font-bold group-hover:text-copper-400">
                      <span>Inspect</span>
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal with Copper Close Button & Actions */}
      <AnimatePresence>
        {activeModalProject && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="fixed inset-0 bg-ink-950/95"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl bg-graphite-900 text-steel-100 rounded-sm shadow-2xl border border-graphite-700 overflow-hidden z-10 my-8"
            >
              {/* Copper Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 transition-colors shadow-copper-glow"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 font-bold" />
              </button>

              {/* Visual Banner */}
              <div className="relative h-72 sm:h-80 w-full bg-ink-950 overflow-hidden">
                <ImageWithFallback
                  src={activeModalProject.cover_image}
                  alt={activeModalProject.title}
                  fallbackType={getCategoryFallbackType(activeModalProject.category)}
                  fallbackLabel={activeModalProject.category}
                  aspectRatioClass="h-full w-full"
                  showOverlay={true}
                />
                <div className="absolute bottom-6 left-6 right-6 text-steel-100 space-y-2 z-10">
                  <span className="text-[11px] font-sans uppercase tracking-[0.14em] px-3 py-1 rounded-xs bg-copper-500 text-ink-950 font-bold">
                    {activeModalProject.category}
                  </span>
                  <h3 className="font-heading text-3xl font-extrabold tracking-tight">
                    {activeModalProject.title.replace(' [Sample Placeholder]', '')}
                  </h3>
                </div>
              </div>

              {/* Details Content */}
              <div className="p-6 sm:p-8 space-y-4">
                {activeModalProject.specifications && (
                  <div className="p-4 rounded-sm bg-ink-950 border border-graphite-700 text-xs font-mono text-steel-100">
                    <strong className="text-copper-500">ENGINEERING SCOPE:</strong>{' '}
                    {activeModalProject.specifications}
                  </div>
                )}

                <p className="text-sm text-steel-300 leading-relaxed font-light font-sans">
                  {activeModalProject.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-sans text-steel-300 pt-2 border-t border-graphite-700/60">
                  <MapPin className="w-4 h-4 text-copper-500" />
                  <span>{activeModalProject.location}</span>
                </div>
              </div>

              {/* Modal Footer with Actions */}
              <div className="p-6 bg-ink-950 border-t border-graphite-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-sans text-steel-300/80">
                  Use Esc or Arrow Keys to navigate
                </span>

                <Link
                  to="/contact#consultation"
                  onClick={() => setActiveModalProject(null)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 font-sans text-[13px] font-bold uppercase tracking-[0.12em] shadow-copper-glow"
                >
                  <span>Request Similar Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
