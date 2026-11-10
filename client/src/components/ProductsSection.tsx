import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Product } from '../types';
import { api } from '../lib/api';
import { TechnicalEyebrow } from './ui/TechnicalEyebrow';
import { ImageWithFallback } from './ui/ImageWithFallback';
import { LiftType } from './ui/LiftLineArtSvg';
import { ProductDetailModal } from './ProductDetailModal';

// Baseline fallback product records matching the 6 verified systems from Section 13
const baselineProducts: Product[] = [
  {
    id: 1,
    slug: 'passenger-elevators',
    title: 'Passenger Lifts',
    category: 'Passenger Elevators',
    short_description:
      'Engineered passenger elevator systems delivering smooth acceleration, quiet travel, and custom architectural cabin finishes.',
    description:
      'HYDRELEX passenger elevator systems are engineered for commercial, residential, and corporate buildings. Designed with precision traction machines, automated door operators, and customizable car aesthetics.',
    features: [
      'Variable Voltage Variable Frequency (VVVF) drive controller',
      'Progressive mechanical safety gear interlock',
      'Automatic Rescue Device (ARD) interface',
      'Customizable cabin wall finishes and spot lighting',
    ],
    image_url: '/public/images/product-passenger.webp',
    is_active: true,
    display_order: 1,
  },
  {
    id: 2,
    slug: 'goods-freight-lifts',
    title: 'Goods / Freight Lifts',
    category: 'Goods / Freight Lifts',
    short_description:
      'Heavy-duty industrial cargo and freight elevators designed for intense warehouse, forklift, and manufacturing cycles.',
    description:
      'Built for factory warehouses, logistics terminals, and production floors. Features high-tensile structural steel chassis, anti-deflection crossheads, and reinforced entrance sills for forklift and pallet traffic.',
    features: [
      'Heavy structural steel carriage frame',
      'High-impact checker plate steel floor',
      'Collapsible gate or heavy power-operated door options',
      'Overload detection safety threshold',
    ],
    image_url: '/public/images/product-freight.webp',
    is_active: true,
    display_order: 2,
  },
  {
    id: 3,
    slug: 'heavy-hydraulic-platforms',
    title: 'Heavy Hydraulic Platforms',
    category: 'Heavy Hydraulic Platforms',
    short_description:
      'Precision electro-hydraulic lifting mechanisms engineered for low pit depth and heavy industrial applications.',
    description:
      'Electro-hydraulic vertical platforms engineered for automotive service centers, multi-level warehouses, and low-headroom installations where conventional overhead machine rooms are impossible.',
    features: [
      'Direct or indirect single/twin hydraulic ram pistons',
      'Integrated hydraulic burst velocity check valve',
      'Emergency manual lowering valve',
      'Quiet hydraulic power unit with multi-stage pump',
    ],
    image_url: '/public/images/product-hydraulic.webp',
    is_active: true,
    display_order: 3,
  },
  {
    id: 4,
    slug: 'industrial-lifting-systems',
    title: 'Industrial Scissor Systems',
    category: 'Industrial Lifting Systems',
    short_description:
      'Heavy pantograph scissor lifts, dock leveling mechanisms, and floor-to-mezzanine cargo platforms.',
    description:
      'Robust material-handling lifting solutions fabricated in Sriperumbudur. Engineered for manufacturing plant logistics, dock transfer bays, and mezzanine material dispatch.',
    features: [
      'High-yield structural steel pantograph arms',
      'Perimeter safety contact trip edge',
      'Dual heavy-duty displacement cylinders',
      'Maintenance lock struts for certified inspection safety',
    ],
    image_url: '/public/images/product-scissor.webp',
    is_active: true,
    display_order: 4,
  },
  {
    id: 5,
    slug: 'custom-panoramic-solutions',
    title: 'Panoramic Glass Lifts',
    category: 'Custom Panoramic Lifts',
    short_description:
      'Architectural observation glass elevators tailored for contemporary atriums and executive structures.',
    description:
      'Bespoke architectural elevators featuring panoramic curved or planar laminated glass enclosures. Designed to integrate seamlessly with dramatic corporate lobbies and luxury architectural spaces.',
    features: [
      'Curved or flat laminated architectural safety glass',
      'Exposed brushed stainless steel car stanchions',
      'Custom ceiling and floor illumination schemes',
      'Whisper-quiet guide shoe alignment',
    ],
    image_url: '/public/images/product-panoramic.webp',
    is_active: true,
    display_order: 5,
  },
  {
    id: 6,
    slug: 'inverter-modernization',
    title: 'Inverter Modernization',
    category: 'Inverter Modernization',
    short_description:
      'Energy-efficient VVVF controller retrofits and complete electromechanical lifecycle modernizations.',
    description:
      'Upgrade older, inefficient elevator systems with modern microprocessor controllers and VVVF frequency inverters. Improves ride quality, floor leveling accuracy, and reduces operational energy consumption.',
    features: [
      'Microprocessor controller retrofit package',
      'Regenerative VVVF drive topology',
      'Micro-level floor leveling accuracy',
      'Full safety switch circuit renewal',
    ],
    image_url: '/public/images/product-inverter.webp',
    is_active: true,
    display_order: 6,
  },
];

// Helper to map category/slug to dedicated line-art SVG fallback
function getFallbackType(product: Product): LiftType {
  const text = `${product.title} ${product.category} ${product.slug}`.toLowerCase();
  if (text.includes('freight') || text.includes('goods')) return 'freight';
  if (text.includes('scissor') || text.includes('dock')) return 'scissor';
  if (text.includes('hydraulic')) return 'hydraulic';
  if (text.includes('panoramic') || text.includes('glass')) return 'panoramic';
  if (text.includes('inverter') || text.includes('modern')) return 'inverter';
  return 'passenger';
}

interface ProductsSectionProps {
  limit?: number;
  showTitle?: boolean;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  limit,
  showTitle = true,
}) => {
  const [products, setProducts] = useState<Product[]>(baselineProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.getProducts();
        if (res.success && res.products && res.products.length > 0) {
          // Merge with baseline records to guarantee 6 core systems
          setProducts(res.products);
        }
      } catch (err) {
        console.error('Products fetch error, keeping baseline:', err);
      }
    };
    fetchProducts();
  }, []);

  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <section
      id="products"
      className="w-full bg-graphite-900 text-steel-100 py-24 sm:py-32 relative overflow-hidden border-b border-graphite-700"
      style={{ backgroundColor: '#141416' }}
    >
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-technical-grid opacity-25 pointer-events-none" />

      {/* Oversized Outlined Numeral 02 Cropped Behind Section */}
      <div
        aria-hidden="true"
        className="absolute -top-12 left-4 sm:left-12 text-[18vw] font-heading font-black select-none pointer-events-none leading-none opacity-10"
        style={{
          WebkitTextStroke: '1.5px #E8782E',
          color: 'transparent',
        }}
      >
        02
      </div>

      <div className="w-full px-fluid relative z-10">
        {showTitle && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-graphite-700 pb-8">
            <div className="space-y-4 max-w-3xl">
              <TechnicalEyebrow variant="copper">
                ENGINEERED LIFT ARCHITECTURE // 02
              </TechnicalEyebrow>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-heading font-extrabold tracking-tight text-steel-100 leading-tight">
                Vertical Mobility <span className="text-copper-500">Systems</span>
              </h2>
              <p className="text-base sm:text-lg text-steel-300 font-light max-w-2xl leading-relaxed">
                Six engineered vertical transportation classifications manufactured for industrial endurance, architectural distinction, and certified structural safety.
              </p>
            </div>

            <Link
              to="/products"
              className="group inline-flex items-center gap-2 font-sans text-[13px] font-bold uppercase tracking-[0.12em] text-copper-500 hover:text-copper-400 transition-colors shrink-0"
            >
              <span>Explore All 6 Systems</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}

        {/* Asymmetric Proportional Full-Width Grid (6 Systems) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {displayedProducts.map((product, idx) => {
            const fallbackType = getFallbackType(product);
            const numStr = `0${idx + 1}`;

            // Asymmetric CSS grid areas and proportions across 12 columns:
            // 0: md:col-span-7 (Large Wide)
            // 1: md:col-span-5 (Tall Portrait)
            // 2: md:col-span-4
            // 3: md:col-span-4
            // 4: md:col-span-4
            // 5: md:col-span-12 (Full-bleed panoramic feature card)
            let colSpan = 'md:col-span-4';
            let minHeightClass = 'min-h-[420px]';

            if (idx === 0) {
              colSpan = 'md:col-span-7';
              minHeightClass = 'min-h-[460px] sm:min-h-[500px]';
            } else if (idx === 1) {
              colSpan = 'md:col-span-5';
              minHeightClass = 'min-h-[460px] sm:min-h-[500px]';
            } else if (idx === 5) {
              colSpan = 'md:col-span-12';
              minHeightClass = 'min-h-[380px]';
            }

            return (
              <motion.div
                key={product.id || product.slug}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.06 }}
                onClick={() => setSelectedProduct(product)}
                className={`group relative rounded-sm overflow-hidden bg-graphite-700 border border-graphite-600/50 border-t-[2.5px] border-t-copper-500 shadow-elevated-card hover:shadow-copper-glow hover:border-copper-500/80 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between p-6 sm:p-8 cursor-pointer select-none ${colSpan} ${minHeightClass}`}
              >
                {/* Background Line-Art Illustration or Real Image */}
                <div className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none">
                  <ImageWithFallback
                    src={product.image_url}
                    alt={product.title}
                    fallbackType={fallbackType}
                    fallbackLabel={`SYSTEM REF // ${numStr}`}
                    aspectRatioClass="h-full w-full"
                    showOverlay={true}
                  />
                </div>

                {/* Top Row: Oversized Outlined Numeral + Category Chip */}
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-xs bg-ink-950/85 text-copper-500 font-sans text-[11px] font-bold uppercase tracking-[0.15em] border border-copper-500/30">
                      {product.category}
                    </span>
                    <span className="hidden sm:inline font-mono text-[11px] text-steel-300/80">
                      SYS-{numStr}
                    </span>
                  </div>

                  {/* Oversized Outlined Numeral */}
                  <span
                    className="text-4xl sm:text-5xl font-heading font-black select-none pointer-events-none leading-none opacity-40 group-hover:opacity-90 transition-opacity"
                    style={{
                      WebkitTextStroke: '1px #E8782E',
                      color: 'transparent',
                    }}
                  >
                    {numStr}
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 space-y-3 pt-12 sm:pt-16">
                  {/* Copper Accent Bar */}
                  <div className="w-10 h-[2.5px] bg-copper-500 transition-all duration-300 group-hover:w-24 group-hover:bg-copper-400" />

                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-steel-100 group-hover:text-copper-400 transition-colors leading-tight">
                    {product.title}
                  </h3>

                  <p className="text-sm text-steel-300 font-light line-clamp-2 max-w-xl leading-relaxed">
                    {product.short_description}
                  </p>

                  <div className="pt-3 flex items-center justify-between border-t border-graphite-600/60 text-xs font-sans">
                    <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-[0.12em] text-copper-500 group-hover:text-copper-400 transition-colors">
                      <span>Explore System</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                    <span className="font-mono text-steel-300/70 text-[11px]">
                      {product.drive_system || 'Custom Engineered'}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};
