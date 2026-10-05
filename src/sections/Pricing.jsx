import React from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useDriveData } from '../hooks/useDriveData';

export default function Pricing() {
  const { data: pricingPlans, loading, error } = useDriveData('pricing');

  const scrollToContact = (e, planName) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      const messageInput = document.getElementById('message');
      if (messageInput && planName) {
        if (!messageInput.value) {
          messageInput.value = `Hi JBY team, I'm interested in building a ${planName}. Here is my idea: `;
        }
        messageInput.focus();
      }
    }
  };

  return (
    <section id="pricing" className="py-20 md:py-28 border-t border-border-custom bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading (Static UI) */}
        <SectionHeading
          eyebrow="Transparent Rates"
          title={
            <span>
              Start with what you need.<br />
              Build from there.
            </span>
          }
          subtitle="Every project is different. These are starting prices, not fixed packages."
        />

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-border-custom p-8 animate-pulse">
                <div className="h-6 bg-neutral-200 rounded w-1/2 mb-4" />
                <div className="h-4 bg-neutral-100 rounded w-3/4 mb-6" />
                <div className="h-10 bg-neutral-200 rounded w-1/3 mb-6" />
                <div className="space-y-3">
                  <div className="h-3 bg-neutral-100 rounded w-full" />
                  <div className="h-3 bg-neutral-100 rounded w-4/5" />
                  <div className="h-3 bg-neutral-100 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error or Unavailable Fallback */}
        {((error && !loading) || (!loading && (!pricingPlans || pricingPlans.length === 0))) && (
          <div className="p-8 rounded-2xl bg-white border border-border-custom text-center text-sm text-secondary-text shadow-subtle max-w-xl mx-auto space-y-2">
            <p className="font-medium text-primary-text">Pricing options are currently unavailable.</p>
            <p className="text-xs text-muted-text">Please check back shortly or reach out to us below for a custom quote.</p>
          </div>
        )}

        {/* Pricing Cards Grid from Google Drive JSON (Rendered ONLY when valid data exists) */}
        {!loading && pricingPlans && pricingPlans.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {pricingPlans.map((plan) => {
              const isFeatured = plan.popular;

              return (
                <div
                  key={plan.id || plan.name}
                  className={`bg-white rounded-2xl border transition-luxury flex flex-col justify-between p-6 sm:p-8 relative ${
                    isFeatured
                      ? 'border-primary-text ring-1 ring-primary-text shadow-card'
                      : 'border-border-custom hover:border-primary-text/40 shadow-subtle hover:shadow-card'
                  }`}
                >
                  {/* Popular Badge */}
                  {isFeatured && (
                    <div className="absolute -top-3 left-6">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary-text text-white shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        Most Requested
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-display font-bold text-primary-text">
                        {plan.name}
                      </h3>
                    </div>

                    {plan.description && (
                      <p className="text-xs sm:text-sm text-secondary-text mb-6 min-h-[40px] leading-relaxed">
                        {plan.description}
                      </p>
                    )}

                    {/* Price Block */}
                    <div className="pb-6 border-b border-border-custom/80">
                      {plan.prefix && (
                        <span className="block text-xs font-mono uppercase tracking-wider text-muted-text mb-1">
                          {plan.prefix}
                        </span>
                      )}
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-display font-extrabold text-primary-text">
                          {plan.price}
                        </span>
                      </div>
                    </div>

                    {/* Feature Checklist */}
                    {plan.features && plan.features.length > 0 && (
                      <div className="py-6 space-y-3">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-muted-text block mb-2">
                          What's included:
                        </span>
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-secondary-text">
                            <Check className="w-4 h-4 text-primary-text shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Plan CTA */}
                  <div className="pt-4 border-t border-border-custom/50">
                    <button
                      onClick={(e) => scrollToContact(e, plan.name)}
                      className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                        isFeatured
                          ? 'bg-primary-text text-white hover:bg-neutral-800 shadow-sm'
                          : 'bg-surface-subtle text-primary-text hover:bg-neutral-200 border border-border-custom'
                      }`}
                    >
                      <span>{plan.ctaText || 'Get Started'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Custom inquiry banner CTA (Static UI) */}
        <div className="mt-12 bg-white rounded-2xl border border-border-custom p-8 sm:p-10 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-primary-text">
              Have something different in mind?
            </h3>
            <p className="text-sm sm:text-base text-secondary-text">
              Tell us what you're building. We will assess scope, timeline, and share a straightforward estimate.
            </p>
          </div>

          <a
            href="#contact"
            onClick={(e) => scrollToContact(e, "Custom Architecture Idea")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary-text text-white text-sm font-medium hover:bg-neutral-800 transition-all shrink-0 shadow-sm group"
          >
            <span>Tell us what you're building</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
}
