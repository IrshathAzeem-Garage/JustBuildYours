import React, { useState } from 'react';
import { ArrowUpRight, Globe, Layers, Cpu, Code2, Sparkles } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useDriveData } from '../hooks/useDriveData';

// Map icon string names from JSON to Lucide icons
const ICON_MAP = {
  Globe,
  Layers,
  Cpu,
  Code2,
};

export default function WhatWeBuild() {
  const { data: services, loading, error } = useDriveData('whatWeBuild');
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 border-t border-border-custom bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading (Static UI) */}
        <SectionHeading
          eyebrow="Capabilities"
          title="What we build."
          subtitle="From simple websites to custom digital products, we build around what you actually need."
        />

        {/* Loading Skeleton */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/60 rounded-2xl border border-border-custom p-8 animate-pulse">
                <div className="h-6 bg-neutral-200 rounded w-1/4 mb-4" />
                <div className="h-4 bg-neutral-100 rounded w-1/2 mb-2" />
                <div className="h-4 bg-neutral-100 rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* Error Fallback */}
        {error && !loading && (
          <div className="p-6 rounded-xl bg-white border border-border-custom text-center text-sm text-secondary-text">
            Unable to load services at this time. Please refresh or check back shortly.
          </div>
        )}

        {/* Dynamic Services from Google Drive JSON */}
        {!loading && services && (
          <div className="space-y-4">
            {services.map((service, index) => {
              const isHovered = hoveredIndex === index;
              const IconComponent = (service.icon && ICON_MAP[service.icon]) || Sparkles;

              return (
                <div
                  key={service.number || index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onClick={scrollToContact}
                  className={`group cursor-pointer rounded-2xl border transition-luxury p-6 sm:p-8 md:p-10 ${
                    isHovered
                      ? 'bg-white border-primary-text/40 shadow-card'
                      : 'bg-white/60 hover:bg-white border-border-custom'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    
                    {/* Number & Main Service Header */}
                    <div className="lg:col-span-4 flex items-start gap-4 sm:gap-6">
                      <span className="font-mono text-sm sm:text-base text-muted-text font-medium pt-1">
                        {service.number}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <IconComponent className={`w-4 h-4 transition-colors ${isHovered ? 'text-primary-text' : 'text-muted-text'}`} />
                          {service.visualTag && (
                            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-text">
                              {service.visualTag}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-primary-text group-hover:text-black">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description & Deliverables */}
                    <div className="lg:col-span-5 space-y-3">
                      <p className="text-base sm:text-lg text-secondary-text font-normal leading-relaxed">
                        {service.description}
                      </p>
                      
                      {service.deliverables && service.deliverables.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {service.deliverables.map((item) => (
                            <span
                              key={item}
                              className="text-xs px-2.5 py-1 rounded-md bg-surface-subtle text-secondary-text border border-border-custom/60 font-medium"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Link & Arrow */}
                    <div className="lg:col-span-3 flex lg:justify-end items-center gap-3">
                      <span className="text-xs font-semibold tracking-tight text-primary-text opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:inline">
                        Tell us your idea
                      </span>
                      <div className="w-10 h-10 rounded-full border border-border-custom bg-white flex items-center justify-center text-primary-text group-hover:bg-primary-text group-hover:text-white transition-all duration-200 group-hover:rotate-45">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                  </div>

                  {/* Subtle revealed details drawer on expand/hover */}
                  {isHovered && service.visualDetail && (
                    <div className="mt-6 pt-5 border-t border-border-custom/80 text-xs text-secondary-text flex flex-col sm:flex-row sm:items-center justify-between gap-2 animate-fade-in">
                      <p className="text-primary-text/80 font-normal">
                        {service.visualDetail}
                      </p>
                      <span className="text-primary-text font-semibold underline underline-offset-4 shrink-0">
                        Explore options in Contact →
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
