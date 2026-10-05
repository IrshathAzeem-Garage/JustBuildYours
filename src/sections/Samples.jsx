import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, X } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useDriveData } from '../hooks/useDriveData';

export default function Samples() {
  const { data: samples, loading, error } = useDriveData('madeByUs');
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [previewProject, setPreviewProject] = useState(null);

  // Derive unique categories dynamically from the loaded projects
  const sampleCategories = samples && samples.length > 0
    ? ["All", ...Array.from(new Set(samples.map((item) => item.category).filter(Boolean)))]
    : ["All"];

  const filteredSamples = !samples
    ? []
    : selectedCategory === "All"
    ? samples
    : samples.filter((item) => item.category === selectedCategory);

  const openProject = (e, project) => {
    e.preventDefault();
    setPreviewProject(project);
  };

  return (
    <section id="work" className="py-20 md:py-28 border-t border-border-custom bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading (Static UI) */}
        <SectionHeading
          eyebrow="Selected Work"
          title="Made by us."
          subtitle="A few things we've brought to life."
        />

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-border-custom overflow-hidden shadow-subtle p-6 animate-pulse">
                <div className="aspect-[16/10] bg-neutral-200 rounded-lg mb-4" />
                <div className="h-6 bg-neutral-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-neutral-100 rounded w-3/4 mb-4" />
                <div className="h-4 bg-neutral-100 rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* Error Fallback */}
        {error && !loading && (
          <div className="p-6 rounded-xl bg-white border border-border-custom text-center text-sm text-secondary-text">
            Unable to load showcase projects at this time. Please refresh or check back shortly.
          </div>
        )}

        {/* Dynamic Content */}
        {!loading && samples && (
          <>
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
              {sampleCategories.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-xs sm:text-sm px-4 py-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
                      isSelected
                        ? 'bg-primary-text text-white shadow-sm'
                        : 'bg-white text-secondary-text hover:text-primary-text border border-border-custom hover:border-primary-text/40'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Portfolio Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredSamples.map((project) => (
                <div
                  key={project.id || project.title}
                  className="group bg-white rounded-2xl border border-border-custom overflow-hidden shadow-subtle hover:shadow-card-hover transition-luxury flex flex-col justify-between"
                >
                  {/* Image Preview Container */}
                  <div
                    className="relative aspect-[16/10] bg-surface-subtle overflow-hidden cursor-pointer border-b border-border-custom/60"
                    onClick={(e) => openProject(e, project)}
                  >
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    
                    {/* Subtle Hover Overlay */}
                    <div className="absolute inset-0 bg-primary-text/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-4 py-2 rounded-full bg-white text-primary-text text-xs font-semibold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <span>Inspect Project</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Category Pill Tag */}
                    {project.category && (
                      <div className="absolute top-3.5 left-3.5">
                        <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm border border-border-custom text-[11px] font-semibold text-primary-text tracking-wide shadow-sm">
                          {project.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Meta Content */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-xl font-display font-bold text-primary-text group-hover:text-black transition-colors">
                        {project.title}
                      </h3>
                      {project.tagline && (
                        <p className="mt-2 text-sm text-secondary-text leading-relaxed font-normal">
                          {project.tagline}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-border-custom/60 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {project.deliverables?.slice(0, 2).map((item, idx) => (
                          <span key={idx} className="text-[10px] text-muted-text bg-surface-subtle px-2 py-0.5 rounded font-mono">
                            {item}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={(e) => openProject(e, project)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary-text hover:text-black group/link"
                      >
                        <span>View Project</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for Project Detail & Live Link */}
            {previewProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-text/40 backdrop-blur-sm animate-fade-in">
                <div className="bg-white rounded-2xl border border-border-custom max-w-2xl w-full p-6 sm:p-8 shadow-elevated relative overflow-hidden">
                  
                  <button
                    onClick={() => setPreviewProject(null)}
                    className="absolute top-5 right-5 p-2 rounded-full text-secondary-text hover:text-primary-text hover:bg-black/5 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {previewProject.category && (
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-subtle text-xs font-medium text-secondary-text mb-4 border border-border-custom">
                      <span>{previewProject.category}</span>
                    </div>
                  )}

                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-primary-text">
                    {previewProject.title}
                  </h3>
                  
                  {previewProject.tagline && (
                    <p className="mt-2 text-base text-secondary-text">
                      {previewProject.tagline}
                    </p>
                  )}

                  {previewProject.image && (
                    <div className="my-6 rounded-xl overflow-hidden border border-border-custom bg-surface-subtle aspect-[16/9]">
                      <img
                        src={previewProject.image}
                        alt={previewProject.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {previewProject.deliverables && previewProject.deliverables.length > 0 && (
                    <div className="space-y-3 mb-6">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-muted-text">Built Features & Specs</h4>
                      <div className="flex flex-wrap gap-2">
                        {previewProject.deliverables.map((feat, i) => (
                          <span key={i} className="text-xs px-3 py-1.5 rounded-lg bg-surface-subtle border border-border-custom text-primary-text font-medium">
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-border-custom">
                    <button
                      onClick={() => setPreviewProject(null)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-border-custom text-sm font-medium text-secondary-text hover:text-primary-text transition-colors"
                    >
                      Close
                    </button>
                    {previewProject.url && (
                      <a
                        href={previewProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary-text text-white text-sm font-medium hover:bg-neutral-800 transition-all shadow-sm"
                      >
                        <span>Launch Live Showcase Demo</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                </div>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
