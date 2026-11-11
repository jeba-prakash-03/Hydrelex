import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { api } from '../lib/api';
import { Eye, MapPin, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';
import { ImageWithFallback } from './ui/ImageWithFallback';
import { LiftType } from './ui/LiftLineArtSvg';
import { Surface, SurfaceTone } from './ui/Surface';

const baselineGalleryProjects: Project[] = [
  {
    id: 101,
    title: 'Commercial Executive Passenger Elevator',
    category: 'Passenger Elevators',
    location: 'Corporate Park, Sriperumbudur',
    specifications: 'Custom stainless steel finish, VVVF gearless traction',
    description:
      'High-specification executive passenger lift installation with energy-efficient VVVF controller and automated landing doors.',
    cover_image: '',
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
    cover_image: '',
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
    cover_image: '',
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
    cover_image: '',
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
    cover_image: '',
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
    cover_image: '',
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

const CHIP_STYLES = [
  { activeBg: 'bg-teal-700 text-ivory-50', inactiveBorder: 'border-teal-700/40 hover:bg-teal-700/10 text-ink-900', dot: 'bg-teal-700' },
  { activeBg: 'bg-copper-500 text-ink-950', inactiveBorder: 'border-copper-700/40 hover:bg-copper-500/10 text-ink-900', dot: 'bg-copper-500' },
  { activeBg: 'bg-amber-500 text-ink-950', inactiveBorder: 'border-amber-600/40 hover:bg-amber-500/15 text-ink-900', dot: 'bg-amber-500' },
  { activeBg: 'bg-ink-900 text-amber-300', inactiveBorder: 'border-ink-900/30 hover:bg-ink-900/10 text-ink-900', dot: 'bg-ink-900' },
];

const CARD_TONES: Array<{ tone: SurfaceTone; badgeBg: string; badgeText: string; stroke: string; borderTop: string }> = [
  { tone: 'teal', badgeBg: 'bg-amber-500', badgeText: 'text-ink-950', stroke: '#F6B93B', borderTop: 'border-t-amber-500' },
  { tone: 'dark', badgeBg: 'bg-copper-500', badgeText: 'text-ink-950', stroke: '#E8782E', borderTop: 'border-t-copper-500' },
  { tone: 'sand', badgeBg: 'bg-teal-700', badgeText: 'text-ivory-50', stroke: '#073842', borderTop: 'border-t-teal-700' },
  { tone: 'mint', badgeBg: 'bg-copper-700', badgeText: 'text-ivory-50', stroke: '#0B4F5C', borderTop: 'border-t-copper-700' },
];

export const ProjectsGallery: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(baselineGalleryProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const touchStartXRef = React.useRef<number | null>(null);

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
    <Surface
      tone="ivory"
      as="section"
      id="projects"
      className="w-full py-[clamp(3rem,6vw,5rem)] lg:py-32 relative overflow-hidden border-b border-[var(--border)]"
    >
      {/* Background Architectural Grid Overlay */}
      <div className="absolute inset-0 bg-technical-grid-light opacity-40 pointer-events-none" />

      {/* Oversized Outlined Numeral 05 Cropped Behind Section */}
      <div
        aria-hidden="true"
        className="hidden sm:block absolute top-4 sm:top-6 left-6 sm:left-16 text-[88px] sm:text-[130px] lg:text-[18vw] font-heading font-black select-none pointer-events-none leading-none opacity-20"
        style={{
          WebkitTextStroke: '2px #0B4F5C',
          color: 'transparent',
        }}
      >
        05
      </div>

      <div className="w-full px-fluid relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8 border-b border-[var(--border)] pb-8">
          <div className="space-y-4 max-w-3xl">
            <TechnicalEyebrow variant="teal">
              PORTFOLIO SHOWCASE // 05
            </TechnicalEyebrow>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-heading font-extrabold text-surface-heading tracking-tight leading-tight">
              Selected{' '}
              <span className="text-copper-700 underline decoration-copper-500/50 underline-offset-8">
                Installations
              </span>
            </h2>
            <p className="text-base sm:text-lg text-surface-fg font-normal leading-relaxed">
              Examine vertical mobility systems, heavy industrial cargo platforms, and bespoke architectural installations executed across Tamil Nadu.
            </p>
          </div>

          <Surface tone="sand" as="div" className="text-xs font-sans p-4 rounded-sm border border-sand-200 max-w-md shadow-sm">
            <strong className="text-surface-heading block mb-1 uppercase tracking-[0.12em] text-[11px] font-bold">
              Engineering Notice:
            </strong>
            <span className="text-surface-fg">
              Installation records marked with Sample Reference illustrate architectural geometry and will be refreshed with live commissioning photography.
            </span>
          </Surface>
        </div>

        {/* Colored Category Chips */}
        <div className="flex flex-nowrap lg:flex-wrap overflow-x-auto lg:overflow-visible snap-x snap-mandatory items-center gap-2.5 lg:gap-3 mb-8 lg:mb-12 pb-2 lg:pb-0 no-scrollbar [&>button]:shrink-0 [&>button]:snap-start [&>button]:min-h-[44px]">
          {categories.map((cat, idx) => {
            const isActive = selectedCategory === cat;
            const style = CHIP_STYLES[idx % CHIP_STYLES.length];
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-5 py-2.5 rounded-sm text-[12px] font-sans font-bold uppercase tracking-[0.14em] transition-all duration-200 select-none inline-flex items-center gap-2 border ${
                  isActive
                    ? `${style.activeBg} border-transparent shadow-md`
                    : `bg-white ${style.inactiveBorder}`
                }`}
              >
                {!isActive && <span className={`w-2 h-2 rounded-full ${style.dot}`} />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Balanced Asymmetric Proportional Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {filteredProjects.map((project, idx) => {
            const fallbackType = getCategoryFallbackType(project.category);
            const cardStyle = CARD_TONES[idx % CARD_TONES.length];

            // Pair rows cleanly across 12 columns: odd trailing card expands full row
            const isOddTrailing =
              filteredProjects.length % 2 === 1 && idx === filteredProjects.length - 1;
            const spanClass = isOddTrailing
              ? 'md:col-span-2 lg:col-span-12 min-h-[280px] lg:min-h-[400px]'
              : idx % 4 === 0 || idx % 4 === 3
              ? 'lg:col-span-7 min-h-[280px] lg:min-h-[420px]'
              : 'lg:col-span-5 min-h-[280px] lg:min-h-[420px]';

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.05 }}
                className={`${spanClass} flex`}
              >
                <Surface
                  tone={cardStyle.tone}
                  as="div"
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveModalProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveModalProject(project);
                    }
                  }}
                  className={`group w-full rounded-sm overflow-hidden border border-[var(--border)] border-t-[4px] ${cardStyle.borderTop} shadow-elevated-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-end p-6 sm:p-8 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-500`}
                >
                  {/* Image with Fallback */}
                  <div className="hidden sm:block absolute inset-0 w-full h-full opacity-25 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none">
                    <ImageWithFallback
                      src={project.cover_image}
                      alt={project.title}
                      fallbackType={fallbackType}
                      aspectRatioClass="h-full w-full"
                      transparentBg={true}
                      strokeColor={cardStyle.stroke}
                      showOverlay={true}
                    />
                  </div>

                  {/* Top Tags */}
                  <div className="relative sm:absolute sm:top-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-2 text-xs z-10 mb-6 sm:mb-0">
                    <span className={`px-3 py-1 rounded-xs text-xs lg:text-[10px] font-sans font-bold uppercase tracking-[0.14em] shadow-sm ${cardStyle.badgeBg} ${cardStyle.badgeText}`}>
                      {project.category}
                    </span>
                    {project.is_sample && (
                      <span className="px-2.5 py-0.5 rounded-xs bg-ink-900 text-ivory-50 text-xs lg:text-[10px] uppercase tracking-wider font-semibold">
                        Sample Reference
                      </span>
                    )}
                  </div>

                  {/* Bottom Text Content */}
                  <div className="relative z-10 space-y-2 sm:pt-20">
                    <div className="w-8 h-[3px] bg-copper-500 transition-all duration-300 group-hover:w-20" />

                    <h3 className="font-heading text-2xl font-extrabold text-surface-heading leading-tight">
                      {project.title.replace(' [Sample Placeholder]', '')}
                    </h3>

                    <p className="text-base lg:text-sm text-surface-fg font-normal line-clamp-3 lg:line-clamp-2 max-w-lg leading-relaxed">
                      {project.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between gap-3 border-t border-[var(--border)] text-xs text-surface-muted font-medium">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <MapPin className="w-3.5 h-3.5 text-surface-accent shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 min-h-[44px] lg:min-h-0 text-surface-accent uppercase tracking-[0.12em] text-xs lg:text-[11px] font-bold shrink-0 whitespace-nowrap">
                        <span>Inspect</span>
                        <Eye className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Surface>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="fixed inset-0 bg-ink-950/90"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onTouchStart={(e) => {
                touchStartXRef.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                if (touchStartXRef.current === null || !activeModalProject) return;
                const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
                touchStartXRef.current = null;
                if (Math.abs(deltaX) < 40) return;
                const currIdx = filteredProjects.findIndex((p) => p.id === activeModalProject.id);
                if (deltaX < 0 && currIdx !== -1 && currIdx < filteredProjects.length - 1) {
                  setActiveModalProject(filteredProjects[currIdx + 1]);
                } else if (deltaX > 0 && currIdx > 0) {
                  setActiveModalProject(filteredProjects[currIdx - 1]);
                }
              }}
              className="relative w-full max-w-4xl z-10 my-auto"
            >
              <Surface tone="dark" as="div" className="rounded-sm shadow-2xl border border-teal-500/30 overflow-hidden max-h-[90dvh] flex flex-col">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 transition-colors shadow-copper-glow"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 font-bold" />
                </button>

                <Surface tone="teal" as="div" className="relative h-56 sm:h-80 w-full overflow-hidden shrink-0">
                  <div className="absolute inset-0 opacity-30">
                    <ImageWithFallback
                      src={activeModalProject.cover_image}
                      alt={activeModalProject.title}
                      fallbackType={getCategoryFallbackType(activeModalProject.category)}
                      aspectRatioClass="h-full w-full"
                      transparentBg={true}
                      strokeColor="#F6B93B"
                      showOverlay={true}
                    />
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 space-y-2 z-10">
                    <span className="text-xs lg:text-[11px] font-sans uppercase tracking-[0.14em] px-3 py-1 rounded-xs bg-amber-500 text-ink-950 font-bold">
                      {activeModalProject.category}
                    </span>
                    <h3 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-surface-heading">
                      {activeModalProject.title.replace(' [Sample Placeholder]', '')}
                    </h3>
                  </div>
                </Surface>

                <div className="p-5 sm:p-8 space-y-4 overflow-y-auto">
                  {activeModalProject.specifications && (
                    <div className="p-4 rounded-sm bg-teal-900/50 border border-teal-500/30 text-xs font-mono text-surface-fg">
                      <strong className="text-amber-500">ENGINEERING SCOPE:</strong>{' '}
                      {activeModalProject.specifications}
                    </div>
                  )}

                  <p className="text-base lg:text-sm text-surface-muted leading-relaxed font-normal font-sans">
                    {activeModalProject.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-sans text-surface-muted pt-2 border-t border-[var(--border)]">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{activeModalProject.location}</span>
                  </div>
                </div>

                <div className="p-4 sm:p-6 bg-ink-950 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 shrink-0">
                  <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                    <div className="flex items-center gap-2">
                      {(() => {
                        const currIdx = filteredProjects.findIndex((p) => p.id === activeModalProject.id);
                        return (
                          <>
                            <button
                              type="button"
                              onClick={() => currIdx > 0 && setActiveModalProject(filteredProjects[currIdx - 1])}
                              disabled={currIdx <= 0}
                              aria-label="Previous project"
                              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-sm border border-[var(--border)] text-surface-fg hover:text-amber-300 disabled:opacity-35 transition-colors"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                currIdx !== -1 &&
                                currIdx < filteredProjects.length - 1 &&
                                setActiveModalProject(filteredProjects[currIdx + 1])
                              }
                              disabled={currIdx === -1 || currIdx >= filteredProjects.length - 1}
                              aria-label="Next project"
                              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-sm border border-[var(--border)] text-surface-fg hover:text-amber-300 disabled:opacity-35 transition-colors"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </>
                        );
                      })()}
                    </div>
                    <span className="text-xs font-sans text-surface-muted">
                      <span className="lg:hidden">Swipe left / right</span>
                      <span className="hidden lg:inline">Use Esc or Arrow Keys to navigate</span>
                    </span>
                  </div>

                  <Link
                    to="/contact#consultation"
                    onClick={() => setActiveModalProject(null)}
                    className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm bg-copper-500 hover:bg-copper-400 text-ink-950 font-sans text-[13px] font-bold uppercase tracking-[0.12em] shadow-copper-glow"
                  >
                    <span>Request Similar Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Surface>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Surface>
  );
};
