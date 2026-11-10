import React from 'react';
import { Hero } from '../components/Hero';
import { CompanyIntro } from '../components/CompanyIntro';
import { ProductsSection } from '../components/ProductsSection';
import { ServicesSection } from '../components/ServicesSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ProjectsGallery } from '../components/ProjectsGallery';
import { CustomerReviews } from '../components/CustomerReviews';
import { EnquiryForm } from '../components/EnquiryForm';
import { CTASection } from '../components/CTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full overflow-x-hidden space-y-0">
      {/* 1. Hero: Cinematic full-width image & editorial headline */}
      <Hero />

      {/* 2. Company Introduction: Full-width split */}
      <CompanyIntro />

      {/* 3. Products: Full-width showcase with large image tiles in varied proportions */}
      <ProductsSection limit={5} />

      {/* 4. Engineering & Services: Asymmetric layout with technical lines */}
      <ServicesSection />

      {/* 5. Why Choose Us: 4 distinctive editorial monograph blocks */}
      <WhyChooseUs />

      {/* 6. Projects: Full-width gallery, asymmetric masonry, hover zoom */}
      <ProjectsGallery />

      {/* 7. Customer Reviews: Premium quotation typography & moderation */}
      <CustomerReviews />

      {/* 8. Contact & Enquiry: Full-width contrasting background & refined consultation form */}
      <section id="consultation" className="w-full bg-arch-black py-24 sm:py-32 relative overflow-hidden border-t border-arch-steel/30">
        <div className="absolute inset-0 bg-blueprint-grid opacity-10 pointer-events-none" />
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
          <EnquiryForm />
        </div>
      </section>

      {/* 9. Full-Width CTA Section */}
      <CTASection />
    </div>
  );
};
