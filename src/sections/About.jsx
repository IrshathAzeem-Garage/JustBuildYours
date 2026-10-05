import React from 'react';
import { ArrowRight, Lightbulb, Compass, Code, Send } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { siteConfig } from '../data/siteConfig';

const STEPS = [
  {
    step: "01",
    label: "IDEA",
    desc: "You bring your vision, notes, or business need.",
    icon: Lightbulb
  },
  {
    step: "02",
    label: "DESIGN",
    desc: "We shape clean, modern, intentional UI flows.",
    icon: Compass
  },
  {
    step: "03",
    label: "BUILD",
    desc: "We craft fast, resilient, production-ready code.",
    icon: Code
  },
  {
    step: "04",
    label: "LAUNCH",
    desc: "You launch your digital product to the world.",
    icon: Send
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 border-t border-border-custom bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Concise Copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-secondary-text font-medium">
              About Just Build Yours
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary-text tracking-tight leading-[1.15]">
              We build what you imagine.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-secondary-text leading-relaxed font-normal">
              <p>
                Just Build Yours is a digital product studio for people and businesses with ideas.
              </p>
              <p>
                From a simple business website to a custom AI-powered application, we turn ideas into useful, beautiful digital experiences.
              </p>
            </div>

            {/* Core studio principle note */}
            <div className="pt-4 border-l-2 border-primary-text pl-4">
              <p className="text-sm sm:text-base font-medium text-primary-text italic">
                "{siteConfig.secondaryTagline}"
              </p>
            </div>
          </div>

          {/* Right Column: Visual Sequence IDEA -> DESIGN -> BUILD -> LAUNCH */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-border-custom p-6 sm:p-8 shadow-card">
              <div className="flex items-center justify-between pb-6 border-b border-border-custom mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-text">
                  The Studio Framework
                </span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface-subtle text-primary-text border border-border-custom">
                  Simple & Direct
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {STEPS.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="p-4 rounded-xl border border-border-custom/80 bg-background hover:bg-surface-subtle/50 transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono text-muted-text font-semibold">
                          {item.step}
                        </span>
                        <Icon className="w-4 h-4 text-secondary-text group-hover:text-primary-text transition-colors" />
                      </div>
                      <h3 className="font-display font-bold text-sm tracking-wider text-primary-text mb-1">
                        {item.label}
                      </h3>
                      <p className="text-xs text-secondary-text leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-5 border-t border-border-custom flex items-center justify-between text-xs text-secondary-text">
                <span>No endless corporate meetings</span>
                <span className="font-medium text-primary-text flex items-center gap-1">
                  Pure focused craft <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
