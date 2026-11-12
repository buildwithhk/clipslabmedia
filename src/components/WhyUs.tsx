import React from 'react';
import { Brain, Film, Cpu, Layers, Sliders, Smartphone, Check, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const WhyUs: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const pillars = [
    {
      icon: <Brain className={`w-6 h-6 ${isLight ? 'text-[#390099]' : 'text-[#AAFF00]'}`} />,
      title: 'Creative-First Thinking',
      description: 'We start with brand psychology, audience tension, and commercial objectives. Technology is our brush, not our brain.'
    },
    {
      icon: <Film className={`w-6 h-6 ${isLight ? 'text-[#FF5400]' : 'text-[#FFA670]'}`} />,
      title: 'Cinematic Visual Execution',
      description: 'Studio-grade camera moves, intentional depth of field, anamorphic optical textures, and volumetric studio lighting.'
    },
    {
      icon: <Cpu className={`w-6 h-6 ${isLight ? 'text-[#9E0059]' : 'text-[#EEF23A]'}`} />,
      title: 'AI-Powered Production Workflows',
      description: 'Proprietary multi-model pipelines orchestrating the best generative models into a unified, coherent commercial universe.'
    },
    {
      icon: <Layers className={`w-6 h-6 ${isLight ? 'text-[#390099]' : 'text-[#638AFF]'}`} />,
      title: 'Complete Campaign Delivery',
      description: 'Not a fragmented asset dump. A comprehensive suite of hero ads, cutdowns, vertical stories, and static editorial stills.'
    },
    {
      icon: <Sliders className={`w-6 h-6 ${isLight ? 'text-[#FF0054]' : 'text-[#AAFF00]'}`} />,
      title: 'Flexible Creative Production',
      description: 'Rapid digital iteration that allows adjustments to lighting, environments, and hooks without expensive set rebuilds.'
    },
    {
      icon: <Smartphone className={`w-6 h-6 ${isLight ? 'text-[#FF5400]' : 'text-[#FFA670]'}`} />,
      title: 'Platform-Ready Deliverables',
      description: 'Engineered specifically for Meta Ads Manager, TikTok Spark Ads, and YouTube, formatted to maximize hook retention.'
    }
  ];

  return (
    <section
      className={`py-10 sm:py-14 lg:py-16 border-b transition-colors duration-200 relative ${
        isLight ? 'bg-[#FAF9F6] border-[#E5E0D8] text-[#171717]' : 'bg-[#080808] border-white/10 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold mb-4 border ${
              isLight ? 'bg-white border-[#E5E0D8] text-[#390099]' : 'bg-[#161616] border-white/10 text-[#AAFF00]'
            }`}
          >
            <span>THE CLIPSLAB ADVANTAGE</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] uppercase mb-4 sm:mb-6">
            MORE THAN GENERATION.<br />
            <span
              className={`font-editorial-serif italic font-normal lowercase ${
                isLight ? 'text-[#FF0054]' : 'text-[#AAFF00]'
              }`}
            >
              it's creative direction.
            </span>
          </h2>
          <p className={`text-xs sm:text-base md:text-lg leading-relaxed font-normal ${isLight ? 'text-[#6E6860]' : 'text-neutral-400'}`}>
            Anyone can prompt an AI tool to generate random video frames. We direct cohesive advertising narratives that capture human attention and turn passive scrollers into paying customers.
          </p>
        </div>

        {/* Comparison Box */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Left: Raw AI Video Generation */}
          <div
            className={`p-5 sm:p-8 rounded-2xl border ${
              isLight ? 'bg-[#F0EDE7] border-[#E5E0D8] text-[#171717]' : 'bg-[#121212] border-white/10 text-white'
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <p className={`font-mono text-xs uppercase tracking-wider font-bold ${isLight ? 'text-[#8C857B]' : 'text-neutral-400'}`}>
                Raw AI Video Generation (Commodity)
              </p>
            </div>
            <h3 className="font-heading font-bold text-lg sm:text-xl mb-4">
              Disjointed Prompts & Flawed Output
            </h3>
            <ul className={`space-y-3 text-xs sm:text-sm ${isLight ? 'text-[#6E6860]' : 'text-neutral-400'}`}>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Inconsistent product packaging and distorted brand logos across frames.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>No narrative arc, commercial strategy, or emotional hook structure.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Unusable aspect ratios and lack of clean audio stems or custom Foley.</span>
              </li>
            </ul>
          </div>

          {/* Right: ClipsLab Studio Direction */}
          <div
            className={`p-5 sm:p-8 rounded-2xl border relative ${
              isLight
                ? 'bg-white border-[#390099] shadow-md ring-1 ring-[#390099]'
                : 'bg-[#141414] border-[#AAFF00]/50 shadow-[0_0_30px_rgba(170,255,0,0.1)]'
            }`}
          >
            <div
              className={`sm:absolute sm:top-4 sm:right-4 inline-block mb-3 sm:mb-0 px-3 py-0.5 rounded-full text-[10px] font-mono uppercase font-extrabold tracking-wider ${
                isLight ? 'bg-[#390099] text-white' : 'bg-[#AAFF00] text-[#080808]'
              }`}
            >
              Studio Standard
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-2.5 h-2.5 rounded-full ${isLight ? 'bg-[#390099]' : 'bg-[#AAFF00]'}`} />
              <p
                className={`font-mono text-xs uppercase tracking-wider font-bold ${
                  isLight ? 'text-[#390099]' : 'text-[#AAFF00]'
                }`}
              >
                ClipsLab Creative Direction & Production
              </p>
            </div>
            <h3 className="font-heading font-bold text-lg sm:text-xl mb-4">
              Strategically Directed Commercial Systems
            </h3>
            <ul className={`space-y-3 text-xs sm:text-sm font-medium ${isLight ? 'text-[#332F2A]' : 'text-neutral-200'}`}>
              <li className="flex items-start gap-2.5">
                <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isLight ? 'text-[#FF0054]' : 'text-[#AAFF00]'}`} />
                <span>Absolute visual fidelity, coherent lighting, and exact brand geometry preservation.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isLight ? 'text-[#FF0054]' : 'text-[#AAFF00]'}`} />
                <span>Custom narrative treatments, psychological hooks, and rhythm-synced sound scores.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isLight ? 'text-[#FF0054]' : 'text-[#AAFF00]'}`} />
                <span>Master vault delivery with multi-ratio paid ads cutdowns and high-res editorial stills.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 6 Key Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`p-5 sm:p-8 rounded-2xl border transition-all ${
                isLight
                  ? 'bg-white border-[#E5E0D8] hover:border-[#390099] shadow-subtle'
                  : 'bg-[#121212] border-white/10 hover:border-[#AAFF00]/40'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 sm:mb-6 ${
                  isLight ? 'bg-[#F0EDE7] border-[#E5E0D8]' : 'bg-[#181818] border-white/10'
                }`}
              >
                {pillar.icon}
              </div>
              <h4 className="font-heading font-bold text-lg sm:text-xl mb-2">
                {pillar.title}
              </h4>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-[#6E6860]' : 'text-neutral-400'}`}>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
