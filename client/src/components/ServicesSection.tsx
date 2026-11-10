import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Hammer,
  ShieldCheck,
  RefreshCw,
  Compass,
  ArrowRight,
  Layers,
  ChevronRight,
  LucideIcon,
} from 'lucide-react';
import { Service } from '../types';
import { api } from '../lib/api';

const iconMap: Record<string, LucideIcon> = {
  Hammer,
  ShieldCheck,
  Wrench,
  RefreshCw,
  Compass,
};

export const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeServiceId, setActiveServiceId] = useState<number | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.getServices();
        if (res.success && res.services) {
          setServices(res.services);
          if (res.services.length > 0) setActiveServiceId(res.services[0].id);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section id="services" className="w-full bg-arch-ivory text-arch-graphite py-24 sm:py-32 relative overflow-hidden border-b border-arch-ivoryBorder">
      {/* Blueprint lines background */}
      <div className="absolute inset-0 bg-light-blueprint opacity-60 pointer-events-none" />

      {/* Full-Bleed Container */}
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column: Asymmetric Editorial Lead & Technical Manifesto (5 cols) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-36">
            <div className="space-y-3">
              <span className="text-xs font-mono tracking-ultra-wide uppercase text-arch-copper font-semibold block">
                ENGINEERING & LIFECYCLE SERVICES // 03
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-arch-black tracking-tight leading-[1.08]">
                Precision Turnkey Execution.
              </h2>
            </div>

            <p className="text-base text-arch-slate font-light leading-relaxed">
              Every vertical lift installation demands structural plumb accuracy, dynamic balancing, and rigorous fail-safe commissioning. Our certified engineers oversee full equipment lifecycles from civil shaft survey to ongoing preventative safety inspections.
            </p>

            {/* Technical Service Directives */}
            <div className="p-6 rounded-sm bg-white border border-arch-ivoryBorder shadow-sm space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-arch-copper border-b border-arch-ivoryBorder pb-3">
                <span>SERVICE CRITERIA</span>
                <span>SRIPERUMBUDUR HUB</span>
              </div>
              <ul className="space-y-2.5 text-xs font-mono text-arch-graphite">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-arch-copper rounded-full" />
                  Turnkey Erection to IS Elevator Standards
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-arch-copper rounded-full" />
                  Scheduled Multi-Point Lubrication & Brake Tuning
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-arch-copper rounded-full" />
                  Energy-Efficient VVVF Inverter Modernization
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <Link
                to="/contact#consultation"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-sm bg-arch-black text-white font-mono text-xs uppercase tracking-architectural hover:bg-arch-graphite transition-all shadow-sm"
              >
                <span>Book Engineering Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Minimalist Technical Line Panels (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-32 rounded-sm bg-white border border-arch-ivoryBorder animate-pulse" />
                ))}
              </div>
            ) : (
              services.map((service, idx) => {
                const IconComponent = iconMap[service.icon_name] || Wrench;
                const isActive = activeServiceId === service.id;

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    onMouseEnter={() => setActiveServiceId(service.id)}
                    className={`p-6 sm:p-8 rounded-sm transition-all duration-300 border ${
                      isActive
                        ? 'bg-white border-arch-copper shadow-architectural'
                        : 'bg-white/70 border-arch-ivoryBorder hover:bg-white hover:border-arch-copper/40'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-arch-copper">
                          [0{idx + 1}]
                        </span>
                        <h3 className="font-heading text-xl sm:text-2xl font-bold text-arch-black">
                          {service.title}
                        </h3>
                      </div>
                      <div className="p-1.5 rounded-sm bg-arch-ivory text-arch-copper border border-arch-ivoryBorder shrink-0 hidden sm:block">
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>

                    <p className="text-sm text-arch-slate font-light leading-relaxed mb-4">
                      {service.short_description}
                    </p>

                    {/* Features checklist if present */}
                    {service.features && service.features.length > 0 && (
                      <div className="pt-3 border-t border-arch-ivoryBorder grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-arch-graphite">
                        {service.features.slice(0, 4).map((f, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2">
                            <span className="text-arch-copper font-bold">+</span>
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-4 mt-4 border-t border-arch-ivoryBorder flex items-center justify-between">
                      <Link
                        to={`/contact?interest=${encodeURIComponent(service.title)}#consultation`}
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-architectural text-arch-copper hover:text-arch-copperDark font-semibold"
                      >
                        <span>Schedule Technical Service</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
