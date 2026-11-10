import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
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
    title: 'Passenger Lifts (Elevators)',
    category: 'Passenger Elevators',
    short_description:
      'Engineered passenger elevator systems delivering smooth acceleration, quiet travel, and custom cabin architecture.',
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
      'Heavy-duty industrial cargo and freight elevators designed for intense warehouse and manufacturing loading cycles.',
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
    title: 'Heavy Hydraulic Lifts / Platforms',
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
    title: 'Industrial Lifting Systems',
    category: 'Industrial Lifting Systems',
    short_description:
      'Heavy pantograph scissor lifts, dock leveling systems, and floor-to-mezzanine cargo platforms.',
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
    title: 'Custom / Panoramic Lift Solutions',
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
      className="w-full bg-graphite-800 text-ivory-100 py-24 sm:py-32 relative overflow-hidden border-b border-graphite-600/60"
      style={{ backgroundColor: '#1C1C1E' }}
    >
      <div className="w-full px-fluid relative z-10">
        {showTitle && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-graphite-600/60 pb-8">
            <div className="space-y-3 max-w-3xl">
              <TechnicalEyebrow variant="champagne">
                ENGINEERED LIFT ARCHITECTURE // 02
              </TechnicalEyebrow>
              <h2 className="font-h2-clamp font-extrabold tracking-tight text-ivory-100 leading-tight">
                Vertical Mobility Systems
              </h2>
              <p className="text-base sm:text-lg text-silver-400 font-light max-w-2xl leading-relaxed">
                Six engineered vertical transportation classifications manufactured for industrial strength, architectural distinction, and certified safety.
              </p>
            </div>

            <Link
              to="/products"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-technical text-champagne-500 hover:text-ivory-100 transition-colors shrink-0"
            >
              <span>Explore All 6 Systems</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}

        {/* Asymmetric Proportional Tiles (Different Tile Proportions) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {displayedProducts.map((product, idx) => {
            const fallbackType = getFallbackType(product);

            // Asymmetric CSS grid areas and proportions across 12 columns:
            // Item 0: 7 columns (Large wide feature tile)
            // Item 1: 5 columns (Tall portrait tile)
            // Item 2: 4 columns
            // Item 3: 4 columns
            // Item 4: 4 columns
            // Item 5: 12 columns (Full-width panoramic feature banner) or 6 columns
            let colSpan = 'md:col-span-4';
            let aspectClass = 'aspect-[4/3]';

            if (idx === 0) {
              colSpan = 'md:col-span-7';
              aspectClass = 'aspect-[16/10] sm:aspect-[16/9]';
            } else if (idx === 1) {
              colSpan = 'md:col-span-5';
              aspectClass = 'aspect-[4/5] sm:aspect-[16/11]';
            } else if (idx === 5) {
              colSpan = 'md:col-span-12 lg:col-span-8';
              aspectClass = 'aspect-[16/9] sm:aspect-[21/9]';
            }

            return (
              <motion.div
                key={product.id || product.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.08 }}
                onClick={() => setSelectedProduct(product)}
                className={`group relative rounded-sm overflow-hidden bg-ink-900 border border-graphite-600 hover:border-champagne-500 transition-all duration-300 shadow-xl flex flex-col justify-end p-6 sm:p-8 cursor-pointer select-none ${colSpan} ${aspectClass}`}
              >
                {/* Background Image with Hand-drawn SVG Line-Art Fallback */}
                <div className="absolute inset-0 w-full h-full">
                  <ImageWithFallback
                    src={product.image_url}
                    alt={product.title}
                    fallbackType={fallbackType}
                    fallbackLabel={`SYSTEM REF // 0${idx + 1}`}
                    aspectRatioClass="h-full w-full"
                    showOverlay={true}
                  />
                </div>

                {/* Top Technical Badges */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs font-mono z-10 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-sm bg-ink-900/90 text-champagne-500 uppercase text-[10px] tracking-technical border border-graphite-600">
                    {product.category}
                  </span>
                  <span className="text-silver-400/80 text-[10px]">
                    MOD // 0{idx + 1}
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 space-y-3">
                  {/* Subtle Expanding Champagne Line on Hover */}
                  <div className="w-8 h-[2px] bg-champagne-500 transition-all duration-300 group-hover:w-20" />

                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-ivory-100 group-hover:text-champagne-500 transition-colors">
                    {product.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-silver-400 font-light line-clamp-2 max-w-xl leading-relaxed">
                    {product.short_description}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-graphite-600/50 text-xs font-mono text-champagne-500">
                    <span className="inline-flex items-center gap-1.5 uppercase tracking-technical font-medium">
                      <span>View Specifications</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                    <span className="text-silver-400/70 text-[11px]">
                      {product.drive_system || 'Engineered to Site'}
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
