import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useDriveData } from '../hooks/useDriveData';

export default function Testimonials() {
  const { data: testimonials, loading, error } = useDriveData('whatPeopleSay');
  const [currentIndex, setCurrentIndex] = useState(0);

  // If loading or no items, return placeholder or null
  if (loading) {
    return (
      <section className="py-20 md:py-28 border-t border-border-custom bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Social Proof"
            title="What people say."
            subtitle="Direct impressions from founders, creators, and business operators who partnered with us."
          />
          <div className="bg-white rounded-2xl border border-border-custom p-12 shadow-card animate-pulse">
            <div className="h-6 bg-neutral-200 rounded w-1/4 mb-4" />
            <div className="h-8 bg-neutral-100 rounded w-3/4 mb-6" />
            <div className="h-4 bg-neutral-100 rounded w-1/3" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !testimonials || testimonials.length === 0) {
    return null;
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex] || testimonials[0];

  return (
    <section className="py-20 md:py-28 border-t border-border-custom bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Social Proof"
          title="What people say."
          subtitle="Direct impressions from founders, creators, and business operators who partnered with us."
          action={
            testimonials.length > 1 ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full border border-border-custom bg-white hover:border-primary-text flex items-center justify-center text-primary-text transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full border border-border-custom bg-white hover:border-primary-text flex items-center justify-center text-primary-text transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ) : null
          }
        />

        {/* Testimonial Editorial Stage */}
        <div className="bg-white rounded-2xl border border-border-custom p-8 sm:p-12 md:p-16 shadow-card relative overflow-hidden">
          <Quote className="w-12 h-12 text-[#EAE6DE] absolute top-8 right-8 pointer-events-none" />

          <div className="max-w-3xl">
            {current.projectType && (
              <span className="inline-block text-xs font-mono uppercase tracking-wider text-muted-text mb-4">
                {current.projectType}
              </span>
            )}

            <p className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-primary-text leading-snug tracking-tight">
              "{current.quote}"
            </p>

            <div className="mt-8 pt-6 border-t border-border-custom/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-primary-text">
                  — {current.author || current.name}
                </h4>
                <p className="text-sm text-secondary-text">
                  {current.role}{current.role && current.company && ', '}
                  {current.company && <span className="text-primary-text font-medium">{current.company}</span>}
                </p>
              </div>

              {/* Slide indicators */}
              {testimonials.length > 1 && (
                <div className="flex items-center gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? 'w-8 bg-primary-text' : 'w-2 bg-[#E5E3DE]'
                      }`}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
