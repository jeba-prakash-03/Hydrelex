import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { api } from '../lib/api';
import { Eye, MapPin, X, Info, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProjectsGallery: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.getProjects();
        if (res.success && res.projects) {
          setProjects(res.projects);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = ['ALL', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === 'ALL'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="w-full bg-arch-ivory text-arch-graphite py-24 sm:py-32 relative overflow-hidden border-b border-arch-ivoryBorder">
      <div className="absolute inset-0 bg-light-blueprint opacity-60 pointer-events-none" />

      {/* Full-Bleed Container */}
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-arch-ivoryBorder pb-8">
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs font-mono tracking-ultra-wide uppercase text-arch-copper font-semibold block">
              PORTFOLIO SHOWCASE // 05
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-arch-black tracking-tight leading-tight">
              Selected Installations
            </h2>
            <p className="text-base text-arch-slate font-light leading-relaxed">
              Examine vertical mobility installations, high-capacity factory freight elevators, and customized architectural glass shafts.
            </p>
          </div>

          <div className="p-4 rounded-sm bg-white border border-arch-ivoryBorder shadow-sm text-xs font-mono text-arch-slate max-w-md flex items-start gap-3">
            <Info className="w-4 h-4 text-arch-copper shrink-0 mt-0.5" />
            <div>
              <strong className="text-arch-black block mb-0.5">Design Reference Notice:</strong>
              Items tagged with &apos;Sample Placeholder&apos; represent visual engineering capabilities and will be updated with live commissioning photography.
            </div>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-sm text-xs font-mono uppercase tracking-architectural transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-arch-black text-arch-champagne border border-arch-black shadow-sm font-semibold'
                  : 'bg-white text-arch-graphite hover:bg-arch-ivoryAlt border border-arch-ivoryBorder font-medium'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Asymmetric Masonry Gallery */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-6 h-80 bg-white border border-arch-ivoryBorder animate-pulse rounded-sm" />
            <div className="md:col-span-6 h-80 bg-white border border-arch-ivoryBorder animate-pulse rounded-sm" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {filteredProjects.map((project, idx) => {
              // Asymmetric masonry layout across 12 cols
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
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  onClick={() => setActiveModalProject(project)}
                  className={`group relative rounded-sm overflow-hidden bg-arch-black cursor-pointer border border-arch-ivoryBorder shadow-sm hover:shadow-architectural transition-all duration-500 flex flex-col justify-end p-6 sm:p-8 ${spanClass}`}
                >
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-arch-black/95 via-arch-black/40 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                  {/* Top Tags */}
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-sm bg-arch-black/80 backdrop-blur-md text-arch-champagne text-[10px] uppercase tracking-wider border border-white/10">
                      {project.category}
                    </span>
                    {project.is_sample && (
                      <span className="px-2.5 py-1 rounded-sm bg-arch-copper text-white text-[9.5px] uppercase tracking-wider font-semibold">
                        Sample Placeholder
                      </span>
                    )}
                  </div>

                  {/* Bottom Text Content */}
                  <div className="relative z-10 space-y-2 text-white">
                    <h3 className="font-heading text-2xl font-bold group-hover:text-arch-champagne transition-colors">
                      {project.title.replace(' [Sample Placeholder]', '')}
                    </h3>
                    <p className="text-xs sm:text-sm text-arch-sand/85 font-light line-clamp-2 max-w-lg">
                      {project.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-white/15 text-xs font-mono text-arch-sand/70">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-arch-champagne shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-arch-champagne uppercase text-[10px] tracking-wider">
                        <span>Preview</span>
                        <Eye className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Project Modal Preview */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="fixed inset-0 bg-arch-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-3xl bg-arch-ivory rounded-sm shadow-architectural-dark border border-arch-steel/60 overflow-hidden z-10 text-arch-graphite"
            >
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-5 right-5 z-20 p-2.5 rounded-sm bg-arch-black/80 text-white hover:bg-arch-black transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-80 w-full bg-arch-black overflow-hidden">
                <img
                  src={activeModalProject.cover_image}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-arch-black via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-sm bg-arch-champagne text-arch-black font-semibold">
                    {activeModalProject.category}
                  </span>
                  <h3 className="font-heading text-3xl font-extrabold tracking-tight">
                    {activeModalProject.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                {activeModalProject.specifications && (
                  <div className="p-4 rounded-sm bg-white border border-arch-ivoryBorder text-xs font-mono text-arch-black">
                    <strong className="text-arch-copper">SPECIFICATIONS:</strong> {activeModalProject.specifications}
                  </div>
                )}

                <p className="text-sm text-arch-graphite leading-relaxed font-light">
                  {activeModalProject.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-mono text-arch-slate pt-2 border-t border-arch-ivoryBorder">
                  <MapPin className="w-4 h-4 text-arch-copper" />
                  <span>{activeModalProject.location}</span>
                </div>
              </div>

              <div className="p-6 bg-arch-ivoryAlt border-t border-arch-ivoryBorder flex justify-end">
                <Link
                  to="/contact#consultation"
                  onClick={() => setActiveModalProject(null)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm bg-arch-black hover:bg-arch-graphite text-white font-mono text-xs uppercase tracking-architectural shadow-sm"
                >
                  <span>Request Similar Lift Consultation</span>
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
