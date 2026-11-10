import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { api } from '../lib/api';
import { Eye, MapPin, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
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
      className="w-full bg-ivory-100 text-graphite-800 py-24 sm:py-32 relative overflow-hidden border-b border-graphite-600/20"
      style={{ backgroundColor: '#F4EFE6' }}
    >
      <div className="w-full px-fluid relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-graphite-600/20 pb-8">
          <div className="space-y-3 max-w-3xl">
            <TechnicalEyebrow variant="graphite">
              PORTFOLIO SHOWCASE // 05
            </TechnicalEyebrow>
            <h2 className="font-h2-clamp font-extrabold text-graphite-800 tracking-tight leading-tight">
              Selected Installations
            </h2>
            <p className="text-base sm:text-lg text-graphite-600 font-light leading-relaxed">
              Examine vertical mobility systems, heavy industrial cargo platforms, and bespoke architectural installations executed across Tamil Nadu.
            </p>
          </div>

          <div className="text-xs font-mono text-graphite-600 p-4 rounded-sm bg-white border border-graphite-600/20 max-w-md shadow-sm">
            <strong className="text-graphite-800 block mb-0.5 uppercase tracking-technical text-[10px]">
              Commissioning Notice:
            </strong>
            Installation records marked with Sample Reference illustrate engineering geometry and will be updated with live commissioning photography.
          </div>
        </div>

        {/* Category Filters with Framer Motion Layout Underline */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-5 py-2.5 rounded-sm text-xs font-mono uppercase tracking-technical transition-colors duration-200 select-none ${
                  isActive
                    ? 'text-ivory-100 bg-graphite-800 font-bold shadow-sm'
                    : 'text-graphite-800 bg-white hover:bg-ivory-50 border border-graphite-600/20 font-medium'
                }`}
              >
                <span>{cat}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeFilterUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-champagne-600"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Asymmetric Masonry Grid */}
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.05 }}
                onClick={() => setActiveModalProject(project)}
                className={`group relative rounded-sm overflow-hidden bg-ink-900 border border-graphite-600/30 hover:border-champagne-600 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-end p-6 sm:p-8 cursor-pointer ${spanClass}`}
              >
                {/* Image with Guaranteed Fallback */}
                <div className="absolute inset-0 w-full h-full">
                  <ImageWithFallback
                    src={project.cover_image}
                    alt={project.title}
                    fallbackType={fallbackType}
                    fallbackLabel={project.category}
                    aspectRatioClass="h-full w-full"
                    showOverlay={true}
                  />
                </div>

                {/* Top Tags */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs font-mono z-10">
                  <span className="px-2.5 py-1 rounded-sm bg-ink-900/90 text-champagne-500 text-[10px] uppercase tracking-technical border border-graphite-600">
                    {project.category}
                  </span>
                  {project.is_sample && (
                    <span className="px-2 py-0.5 rounded-sm bg-graphite-600/90 text-silver-400 text-[9.5px] uppercase tracking-wider font-semibold border border-graphite-600">
                      Sample Reference
                    </span>
                  )}
                </div>

                {/* Bottom Text Content (Animated Slide-Up on Hover) */}
                <div className="relative z-10 space-y-2 text-ivory-100">
                  <h3 className="font-heading text-2xl font-bold group-hover:text-champagne-500 transition-colors">
                    {project.title.replace(' [Sample Placeholder]', '')}
                  </h3>

                  <p className="text-xs sm:text-sm text-silver-400 font-light line-clamp-2 max-w-lg leading-relaxed">
                    {project.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-graphite-600/50 text-xs font-mono text-silver-400/80">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-champagne-500 shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-champagne-500 uppercase tracking-technical text-[10px] font-semibold">
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

      {/* Elegant Lightbox Modal with Fade/Scale Transition & Focus Trap */}
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
              className="fixed inset-0 bg-ink-900/95"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl bg-graphite-800 text-ivory-100 rounded-sm shadow-2xl border border-graphite-600 overflow-hidden z-10 my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-sm bg-ink-900/80 text-silver-400 hover:text-ivory-100 border border-graphite-600 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Visual Banner */}
              <div className="relative h-72 sm:h-80 w-full bg-ink-900 overflow-hidden">
                <ImageWithFallback
                  src={activeModalProject.cover_image}
                  alt={activeModalProject.title}
                  fallbackType={getCategoryFallbackType(activeModalProject.category)}
                  fallbackLabel={activeModalProject.category}
                  aspectRatioClass="h-full w-full"
                  showOverlay={true}
                />
                <div className="absolute bottom-6 left-6 right-6 text-ivory-100 space-y-2 z-10">
                  <span className="text-[10px] font-mono uppercase tracking-technical px-2.5 py-1 rounded-sm bg-champagne-500 text-ink-900 font-bold">
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
                  <div className="p-4 rounded-sm bg-ink-900 border border-graphite-600 text-xs font-mono text-ivory-100">
                    <strong className="text-champagne-500">ENGINEERING SCOPE:</strong>{' '}
                    {activeModalProject.specifications}
                  </div>
                )}

                <p className="text-sm text-silver-400 leading-relaxed font-light font-sans">
                  {activeModalProject.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-mono text-silver-400 pt-2 border-t border-graphite-600/40">
                  <MapPin className="w-4 h-4 text-champagne-500" />
                  <span>{activeModalProject.location}</span>
                </div>
              </div>

              {/* Modal Footer with Actions */}
              <div className="p-6 bg-ink-900 border-t border-graphite-600 flex items-center justify-between">
                <span className="text-xs font-mono text-silver-400/80">
                  Use Esc or Arrow Keys to navigate
                </span>

                <Link
                  to="/contact#consultation"
                  onClick={() => setActiveModalProject(null)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm bg-champagne-500 hover:bg-champagne-600 text-ink-900 font-mono text-xs font-bold uppercase tracking-technical shadow-sm"
                >
                  <span>Request Similar Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
