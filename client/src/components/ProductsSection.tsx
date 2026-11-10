import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Weight, Gauge, ChevronRight, Layers, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';
import { api } from '../lib/api';
import { ProductDetailModal } from './ProductDetailModal';

interface ProductsSectionProps {
  limit?: number;
  showTitle?: boolean;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ limit, showTitle = true }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.getProducts();
        if (res.success && res.products) {
          setProducts(res.products);
        }
      } catch (err) {
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <section id="products" className="w-full bg-arch-black text-white py-24 sm:py-32 relative overflow-hidden">
      {/* Background architectural grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-10 pointer-events-none" />

      {/* Full-Bleed Edge-to-Edge Container */}
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        {showTitle && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-arch-steel/40 pb-8">
            <div className="space-y-3 max-w-3xl">
              <span className="text-xs font-mono tracking-ultra-wide uppercase text-arch-champagne font-semibold block">
                ENGINEERED LIFT ARCHITECTURE // 02
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Vertical Mobility Systems
              </h2>
              <p className="text-base text-arch-sand/80 font-light max-w-2xl">
                Precision passenger elevators, high-capacity industrial goods platforms, and heavy-duty hydraulic lifting systems engineered to exacting structural codes.
              </p>
            </div>

            <Link
              to="/products"
              className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-architectural text-arch-champagne hover:text-white transition-colors shrink-0"
            >
              <span>View Systems Index</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 h-96 rounded-sm bg-arch-graphite animate-pulse" />
            <div className="md:col-span-4 h-96 rounded-sm bg-arch-graphite animate-pulse" />
          </div>
        )}

        {/* Asymmetric Proportional Tiles (Varied Proportions) */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {displayedProducts.map((product, idx) => {
              // Asymmetric grid layout:
              // Index 0: 7 columns (wide hero tile)
              // Index 1: 5 columns (tall portrait tile)
              // Index 2: 4 columns
              // Index 3: 4 columns
              // Index 4: 4 columns
              const spanClasses =
                idx === 0
                  ? 'md:col-span-7 aspect-[16/10] sm:aspect-[16/9]'
                  : idx === 1
                  ? 'md:col-span-5 aspect-[4/5] sm:aspect-[16/11]'
                  : 'md:col-span-4 aspect-[4/3]';

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: idx * 0.08 }}
                  className={`group relative rounded-sm overflow-hidden bg-arch-charcoal border border-arch-steel/50 hover:border-arch-champagne/60 transition-all duration-500 shadow-architectural-dark flex flex-col justify-end p-6 sm:p-8 cursor-pointer ${spanClasses}`}
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* High Quality Background Image */}
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Layered Architectural Gradient Shading */}
                  <div className="absolute inset-0 bg-gradient-to-t from-arch-black via-arch-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                  {/* Top Technical Badges */}
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-sm bg-arch-black/80 backdrop-blur-md text-arch-champagne uppercase text-[10px] tracking-wider border border-white/10">
                      {product.category}
                    </span>
                    <span className="text-white/40 text-[10px]">
                      MOD // 0{idx + 1}
                    </span>
                  </div>

                  {/* Tile Bottom Content */}
                  <div className="relative z-10 space-y-3">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white group-hover:text-arch-champagne transition-colors">
                        {product.title}
                      </h3>
                      {product.capacity && (
                        <span className="text-xs font-mono text-arch-sand/80 px-2 py-0.5 rounded-sm bg-white/10 backdrop-blur-sm">
                          {product.capacity}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-arch-sand/80 font-light line-clamp-2 max-w-xl">
                      {product.short_description}
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs font-mono">
                      <span className="inline-flex items-center gap-1.5 text-arch-champagne uppercase tracking-architectural">
                        <span>Inspect Specifications</span>
                        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>

                      <span className="text-arch-sand/60">
                        {product.drive_system || 'Traction / Hydraulic'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};
