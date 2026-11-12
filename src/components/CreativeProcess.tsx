import React from 'react';
import { CREATIVE_PROCESS_STEPS } from '../data/workflow';
import { useTheme } from '../context/ThemeContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const CreativeProcess: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section
      id="process-section"
      className={`py-10 sm:py-14 lg:py-16 border-b transition-colors duration-200 relative ${
        isLight ? 'bg-[#EFECE6] border-[#E2DDD5] text-[#121212]' : 'bg-[#0A0A0A] border-white/10 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-bold mb-3 sm:mb-4 border ${
                isLight
                  ? 'bg-[#FFFFFF] border-[#E2DDD5] text-[#121212]'
                  : 'bg-[#161616] border-white/10 text-[#AAFF00]'
              }`}
            >
              <span>DIRECTOR WORKFLOW // STEP BY STEP</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] uppercase">
              FROM AN IDEA TO<br />
              <span className="font-editorial-serif italic font-normal lowercase tracking-normal text-[#FF0054]">
                the final frame
              </span>
              <span className="text-[#FF0054]">.</span>
            </h2>
          </div>

          <p
            className={`max-w-md text-xs sm:text-sm md:text-base leading-relaxed ${
              isLight ? 'text-[#5E5A53]' : 'text-neutral-400'
            }`}
          >
            A disciplined four-step creative production pipeline that turns conceptual seeds into broadcast-ready, cinema-grade films.
          </p>
        </div>

        {/* 4-Step Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {CREATIVE_PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.number}
              className={`relative p-6 sm:p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                isLight
                  ? 'bg-white border-[#E2DDD5] shadow-sm hover:border-[#121212]'
                  : 'bg-[#141414] border-white/10 hover:border-white/30'
              }`}
            >
              <div>
                {/* Step Number Badge */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2DDD5]/60 dark:border-white/10">
                  <span className="font-mono text-base font-extrabold tracking-widest text-[#FF0054]">
                    {step.number}
                  </span>
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${isLight ? 'text-[#7D766D]' : 'text-neutral-500'}`}>
                    PHASE 0{idx + 1}
                  </span>
                </div>

                {/* Step Title & Subtitle */}
                <h3 className="font-heading font-extrabold text-lg uppercase tracking-tight mb-1">
                  {step.title}
                </h3>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#FF0054] font-semibold mb-3">
                  {step.subtitle}
                </p>

                {/* Step Description */}
                <p
                  className={`text-xs sm:text-sm leading-relaxed mb-5 ${
                    isLight ? 'text-[#5E5A53]' : 'text-neutral-300'
                  }`}
                >
                  {step.description}
                </p>

                {/* Granular deliverables */}
                <ul className="space-y-2 border-t border-[#E2DDD5]/60 dark:border-white/10 pt-4">
                  {step.details.map((detail, dIdx) => (
                    <li key={dIdx} className="text-[11px] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#AAFF00] flex-shrink-0 mt-1.5" />
                      <span className={isLight ? 'text-[#6B665E]' : 'text-neutral-400'}>
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E2DDD5]/60 dark:border-white/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#7D766D] dark:text-neutral-500">
                <span>STAGE VERIFIED</span>
                {idx < 3 && <ArrowRight className="w-3.5 h-3.5 text-[#5E5A53] dark:text-neutral-400 hidden lg:block" />}
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};
