import React from 'react';
import SectionHeading from '../components/SectionHeading';
import { Target, HeartHandshake, Sparkles, TrendingUp } from 'lucide-react';

const VALUES = [
  {
    title: "Built for you.",
    description: "No unnecessary templates or features. We build around your actual requirements.",
    icon: Target
  },
  {
    title: "Made to feel right.",
    description: "Clean design isn't optional.",
    icon: Sparkles
  },
  {
    title: "Simple for your customers.",
    description: "Beautiful doesn't have to mean complicated.",
    icon: HeartHandshake
  },
  {
    title: "Ready for what's next.",
    description: "We build with growth in mind.",
    icon: TrendingUp
  }
];

export default function Values() {
  return (
    <section className="py-20 md:py-28 border-t border-border-custom bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Principles"
          title="Why build with us?"
          subtitle="We focus on clarity, craft, and usefulness above everything else."
        />

        {/* 4 Minimal Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-border-custom p-6 sm:p-8 flex flex-col justify-between hover:border-primary-text/40 transition-luxury group shadow-subtle hover:shadow-card"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-border-custom flex items-center justify-center text-primary-text mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-primary-text" />
                  </div>

                  <h3 className="text-xl font-display font-bold text-primary-text mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-secondary-text leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-border-custom/50 flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-text">0{index + 1}</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-text">Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
