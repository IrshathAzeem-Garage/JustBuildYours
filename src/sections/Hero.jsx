import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Layout, Code2, Rocket, Lightbulb, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

const TRANSFORMATION_STAGES = [
  {
    id: 'idea',
    step: '01',
    label: 'Idea',
    icon: Lightbulb,
    title: 'The Raw Concept',
    badge: 'You bring this',
    description: 'A scribble in your notes, a workflow bottleneck in your business, or a vision for an AI tool.',
    previewType: 'idea'
  },
  {
    id: 'design',
    step: '02',
    label: 'Design',
    icon: Layout,
    title: 'High-Craft Interface',
    badge: 'We shape it',
    description: 'Purposeful typography, calm color palettes, and intuitive user flows. Zero generic templates.',
    previewType: 'design'
  },
  {
    id: 'build',
    step: '03',
    label: 'Build',
    icon: Code2,
    title: 'Clean Engineering',
    badge: 'We code it',
    description: 'High-performance React code, responsive layouts, API integrations, and fast loading speeds.',
    previewType: 'build'
  },
  {
    id: 'launch',
    step: '04',
    label: 'Launch',
    icon: Rocket,
    title: 'Live Product',
    badge: 'You own it',
    description: 'Deployed to the world, ready for real customers, investors, and automated growth.',
    previewType: 'launch'
  }
];

export default function Hero() {
  const [activeStage, setActiveStage] = useState('idea');
  const [isAutoCycling, setIsAutoCycling] = useState(true);

  // Auto-cycle through stages slowly if user hasn't manually interacted
  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      setActiveStage(current => {
        const currentIndex = TRANSFORMATION_STAGES.findIndex(s => s.id === current);
        const nextIndex = (currentIndex + 1) % TRANSFORMATION_STAGES.length;
        return TRANSFORMATION_STAGES[nextIndex].id;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoCycling]);

  const handleStageClick = (id) => {
    setIsAutoCycling(false);
    setActiveStage(id);
  };

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentStageData = TRANSFORMATION_STAGES.find(s => s.id === activeStage);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden studio-grid-bg">
      {/* Subtle radial ambient highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-b from-[#EAE6DE]/60 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Studio Micro-badge */}
        <div className="flex items-center justify-start mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border-custom shadow-subtle text-xs font-medium text-primary-text">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>Digital Product Studio</span>
            <span className="text-secondary-text">·</span>
            <span className="text-secondary-text">Accepting New Builds</span>
          </div>
        </div>

        {/* Main Hero Headline */}
        <div className="max-w-4xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-primary-text leading-[1.03]">
            You bring the idea. <br className="hidden sm:inline" />
            <span className="text-primary-text/90">We build it.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-secondary-text font-normal max-w-2xl leading-relaxed">
            {siteConfig.description}
          </p>

          {/* Primary CTA and Secondary notes */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-primary-text text-white font-medium text-base hover:bg-neutral-800 transition-all duration-200 shadow-card hover:shadow-card-hover group active:scale-[0.98]"
              id="hero-primary-cta"
            >
              <span>Let's Build Yours</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              href="#services"
              className="inline-flex items-center justify-center px-6 py-4 rounded-full bg-white border border-border-custom text-primary-text font-medium text-base hover:border-primary-text transition-all duration-200 shadow-subtle hover:bg-neutral-50"
            >
              See What We Build
            </a>
          </div>

          <div className="mt-6 flex items-center gap-6 text-xs sm:text-sm text-secondary-text font-normal">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-primary-text" />
              <span>Starting from ₹3,000</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-primary-text" />
              <span>Direct communication</span>
            </span>
            <span className="flex items-center gap-1.5 hidden sm:flex">
              <CheckCircle2 className="w-4 h-4 text-primary-text" />
              <span>100% code ownership</span>
            </span>
          </div>
        </div>

        {/* Transformation Showcase: Idea -> Design -> Build -> Launch */}
        <div className="mt-16 md:mt-20">
          <div className="bg-white rounded-2xl border border-border-custom shadow-card overflow-hidden">
            
            {/* Step Selection Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border-custom bg-surface-subtle/50">
              {TRANSFORMATION_STAGES.map((stage) => {
                const isActive = activeStage === stage.id;
                const IconComponent = stage.icon;
                return (
                  <button
                    key={stage.id}
                    onClick={() => handleStageClick(stage.id)}
                    className={`p-4 md:p-5 text-left transition-all relative flex flex-col justify-between ${
                      isActive
                        ? 'bg-white text-primary-text shadow-sm'
                        : 'text-secondary-text hover:bg-white/60 hover:text-primary-text'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-medium text-muted-text">{stage.step}</span>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-primary-text text-white' : 'bg-black/5 text-secondary-text'
                      }`}>
                        {stage.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <IconComponent className={`w-4 h-4 ${isActive ? 'text-primary-text' : 'text-muted-text'}`} />
                      <span className="font-display font-bold text-sm sm:text-base">
                        {stage.label}
                      </span>
                    </div>

                    {/* Active highlight indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary-text" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Interactive Stage Preview Box */}
            <div className="p-6 md:p-10 bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Description column */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-text">
                    <span>Phase {currentStageData.step}</span>
                    <span>/</span>
                    <span>The Process</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-primary-text">
                    {currentStageData.title}
                  </h3>
                  <p className="text-base text-secondary-text leading-relaxed">
                    {currentStageData.description}
                  </p>
                  
                  <div className="pt-2">
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-text mb-2">Key deliverable:</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-subtle border border-border-custom text-xs font-medium text-primary-text">
                      <Sparkles className="w-3.5 h-3.5 text-primary-text" />
                      {activeStage === 'idea' && 'Clear product brief & requirement architecture'}
                      {activeStage === 'design' && 'High-fidelity design system & interactive prototypes'}
                      {activeStage === 'build' && 'Production-ready code & high-speed performance'}
                      {activeStage === 'launch' && 'Live deployment & customer ready onboarding'}
                    </div>
                  </div>
                </div>

                {/* Visual Preview Screen */}
                <div className="lg:col-span-7">
                  <div className="bg-[#FAF9F5] border border-border-custom rounded-xl p-4 sm:p-6 min-h-[260px] flex items-center justify-center relative overflow-hidden transition-all">
                    
                    {/* Stage 1: Idea Preview */}
                    {activeStage === 'idea' && (
                      <div className="w-full max-w-md bg-white border border-border-custom rounded-lg p-5 shadow-subtle animate-fade-in">
                        <div className="flex items-center justify-between pb-3 border-b border-border-custom/80 mb-3">
                          <span className="text-xs font-mono text-muted-text">NOTES // 09:42 AM</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-medium border border-amber-200">Raw Idea</span>
                        </div>
                        <p className="text-sm font-semibold text-primary-text mb-2">
                          "I want an internal AI dashboard for our freight team that checks carrier rates and auto-replies to vendor emails."
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          <span className="text-[11px] px-2 py-0.5 rounded bg-surface-subtle text-secondary-text">No technical jargon needed</span>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-surface-subtle text-secondary-text">Just your core workflow</span>
                        </div>
                      </div>
                    )}

                    {/* Stage 2: Design Preview */}
                    {activeStage === 'design' && (
                      <div className="w-full max-w-md bg-white border border-border-custom rounded-lg p-4 shadow-subtle animate-fade-in">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#E5E3DE]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#E5E3DE]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#E5E3DE]" />
                          </div>
                          <span className="text-xs font-mono text-secondary-text">Figma Specs // 8px Grid</span>
                        </div>
                        <div className="space-y-2.5">
                          <div className="h-6 bg-surface-subtle rounded w-3/4 animate-pulse" />
                          <div className="grid grid-cols-3 gap-2">
                            <div className="h-14 bg-surface-subtle rounded p-2 flex flex-col justify-end">
                              <span className="text-[10px] text-muted-text">Typography</span>
                            </div>
                            <div className="h-14 bg-surface-subtle rounded p-2 flex flex-col justify-end">
                              <span className="text-[10px] text-muted-text">Palette</span>
                            </div>
                            <div className="h-14 bg-surface-subtle rounded p-2 flex flex-col justify-end">
                              <span className="text-[10px] text-muted-text">Motion</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Stage 3: Build Preview */}
                    {activeStage === 'build' && (
                      <div className="w-full max-w-md bg-[#1C1B1F] text-zinc-300 rounded-lg p-4 font-mono text-xs shadow-card animate-fade-in">
                        <div className="flex items-center justify-between pb-2 border-b border-zinc-800 mb-3 text-zinc-500 text-[11px]">
                          <span>App.jsx — React + Tailwind</span>
                          <span className="text-emerald-400">● 100/100 Lighthouse</span>
                        </div>
                        <p className="text-emerald-400">// Modular, high-speed frontend</p>
                        <p className="text-zinc-400 mt-1"><span className="text-purple-400">const</span> product = <span className="text-yellow-300">useStudioBuild</span>({'{'} id: idea.id {'}'});</p>
                        <p className="text-zinc-400 mt-1"><span className="text-purple-400">return</span> &lt;<span className="text-sky-300">InteractiveExperience</span> data={'{'}product{'}'} /&gt;;</p>
                        <div className="mt-3 pt-2 border-t border-zinc-800 flex justify-between text-[10px] text-zinc-500">
                          <span>Build Time: 0.8s</span>
                          <span>Zero Bloat</span>
                        </div>
                      </div>
                    )}

                    {/* Stage 4: Launch Preview */}
                    {activeStage === 'launch' && (
                      <div className="w-full max-w-md bg-white border border-border-custom rounded-lg p-5 shadow-card animate-fade-in">
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Live on custom domain
                          </span>
                          <span className="text-xs text-secondary-text font-mono">100% Deployed</span>
                        </div>
                        <div className="space-y-2">
                          <div className="h-8 bg-neutral-900 rounded-md flex items-center px-3 text-white text-xs font-medium justify-between">
                            <span>Ready for customers</span>
                            <span>→</span>
                          </div>
                          <p className="text-xs text-secondary-text">Full DNS routing, SSL certificate, analytics & client handover completed.</p>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
