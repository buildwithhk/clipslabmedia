import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Clock, Target } from 'lucide-react';
import { CAMPAIGN_STEPS } from '../data/campaignSteps';
import { useTheme } from '../context/ThemeContext';

interface CampaignJourneyProps {
  onPlanCampaign: () => void;
}

export const CampaignJourney: React.FC<CampaignJourneyProps> = ({ onPlanCampaign }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = CAMPAIGN_STEPS[activeStepIndex];

  return (
    <section
      className={`py-10 sm:py-14 lg:py-16 border-b transition-colors duration-200 relative overflow-hidden ${
        isLight ? 'bg-[#FAF9F6] border-[#E5E0D8] text-[#171717]' : 'bg-[#080808] border-white/10 text-white'
      }`}
      id="campaigns-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold mb-4 border ${
                isLight ? 'bg-white border-[#E5E0D8] text-[#390099]' : 'bg-[#161616] border-white/10 text-[#AAFF00]'
              }`}
            >
              <span>CAMPAIGN ARCHITECTURE</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] uppercase">
              FROM PRODUCT IDEA<br />
              <span
                className={`font-editorial-serif italic font-normal lowercase ${
                  isLight ? 'text-[#FF0054]' : 'text-[#AAFF00]'
                }`}
              >
                to market-ready campaign.
              </span>
            </h2>
          </div>

          <p
            className={`max-w-md text-xs sm:text-sm md:text-base leading-relaxed ${
              isLight ? 'text-[#6E6860]' : 'text-neutral-400'
            }`}
          >
            We don’t just create standalone video files. We deliver full-funnel, synchronized advertising systems designed to capture attention and convert audiences across every digital touchpoint.
          </p>
        </div>

        {/* Step Selector Tabs (Desktop Horizontal Timeline) */}
        <div className="hidden lg:grid grid-cols-6 gap-3 mb-10">
          {CAMPAIGN_STEPS.map((step, idx) => {
            const isCurrent = activeStepIndex === idx;
            return (
              <button
                key={step.step}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`text-left p-4 rounded-xl border transition-all duration-300 relative cursor-pointer ${
                  isCurrent
                    ? isLight
                      ? 'bg-white text-[#171717] border-[#390099] shadow-md ring-1 ring-[#390099]'
                      : 'bg-[#181818] text-white border-[#AAFF00] shadow-[0_0_20px_rgba(170,255,0,0.15)]'
                    : isLight
                    ? 'bg-[#F0EDE7] text-[#6E6860] border-[#E5E0D8] hover:border-[#390099]/40 hover:text-[#171717]'
                    : 'bg-[#121212] text-neutral-400 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-mono font-bold ${
                      isCurrent
                        ? isLight
                          ? 'text-[#390099]'
                          : 'text-[#AAFF00]'
                        : isLight
                        ? 'text-[#6E6860]'
                        : 'text-neutral-500'
                    }`}
                  >
                    STEP {step.step}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isCurrent
                        ? isLight
                          ? 'bg-[#390099]/10 text-[#390099]'
                          : 'bg-[#AAFF00]/15 text-[#AAFF00]'
                        : isLight
                        ? 'bg-white/60 text-[#6E6860]'
                        : 'bg-white/5 text-neutral-500'
                    }`}
                  >
                    {step.duration}
                  </span>
                </div>
                <p className={`font-heading font-bold text-sm tracking-tight leading-snug ${isLight ? 'text-[#171717]' : 'text-white'}`}>
                  {step.name}
                </p>
              </button>
            );
          })}
        </div>

        {/* Mobile Step Selector */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {CAMPAIGN_STEPS.map((step, idx) => {
            const isCurrent = activeStepIndex === idx;
            return (
              <button
                key={step.step}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`whitespace-nowrap px-3.5 py-2 rounded-full text-[11px] font-mono uppercase tracking-wider border transition-all cursor-pointer flex-shrink-0 ${
                  isCurrent
                    ? isLight
                      ? 'bg-[#390099] text-white border-[#390099] font-bold shadow-sm'
                      : 'bg-[#AAFF00] text-[#080808] border-[#AAFF00] font-bold'
                    : isLight
                    ? 'bg-white text-[#6E6860] border-[#E5E0D8]'
                    : 'bg-[#141414] text-neutral-400 border-white/10'
                }`}
              >
                {step.step}. {step.name}
              </button>
            );
          })}
        </div>

        {/* Active Stage Showcase Card */}
        <div
          className={`rounded-2xl border p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden ${
            isLight ? 'bg-white border-[#E5E0D8] text-[#171717]' : 'bg-[#121212] border-white/10 text-white'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Stage Left Details */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span
                  className={`font-mono text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full border ${
                    isLight
                      ? 'bg-[#390099]/10 border-[#390099]/30 text-[#390099]'
                      : 'bg-[#AAFF00]/10 border-[#AAFF00]/30 text-[#AAFF00]'
                  }`}
                >
                  STAGE {activeStep.step} OF 06
                </span>
                <span
                  className={`text-[11px] sm:text-xs font-mono flex items-center gap-1.5 ${
                    isLight ? 'text-[#6E6860]' : 'text-neutral-400'
                  }`}
                >
                  <Clock className={`w-3.5 h-3.5 ${isLight ? 'text-[#390099]' : 'text-[#AAFF00]'}`} />
                  <span>Timeline: {activeStep.duration}</span>
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl leading-tight">
                {activeStep.name}
              </h3>
              
              <p
                className={`font-heading font-medium text-base sm:text-lg ${
                  isLight ? 'text-[#FF5400]' : 'text-[#FFA670]'
                }`}
              >
                {activeStep.tagline}
              </p>

              <p className={`text-sm sm:text-base leading-relaxed font-normal ${isLight ? 'text-[#4A453E]' : 'text-neutral-300'}`}>
                {activeStep.description}
              </p>

              {/* Outputs list */}
              <div className="pt-2">
                <p className={`text-[11px] sm:text-xs font-mono uppercase tracking-wider font-bold mb-3 ${isLight ? 'text-[#6E6860]' : 'text-neutral-500'}`}>
                  Verified Stage Deliverables:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeStep.outputs.map((output: string, idx: number) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 text-xs sm:text-sm font-medium p-2.5 sm:p-3 rounded-xl border ${
                        isLight
                          ? 'bg-[#FAF9F6] text-[#171717] border-[#E5E0D8]'
                          : 'bg-[#181818] text-neutral-200 border-white/5'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 flex-shrink-0 ${
                          isLight ? 'text-[#FF0054]' : 'text-[#AAFF00]'
                        }`}
                      />
                      <span>{output}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stage Right: Impact Box */}
            <div
              className={`lg:col-span-5 flex flex-col justify-between p-5 sm:p-7 lg:p-8 rounded-xl border space-y-6 ${
                isLight ? 'bg-[#F0EDE7] border-[#E5E0D8]' : 'bg-[#181818] border-white/10'
              }`}
            >
              <div className="space-y-3 sm:space-y-4">
                <div
                  className={`w-10 h-10 rounded-full border flex items-center justify-center ${
                    isLight
                      ? 'bg-white border-[#390099]/30 text-[#390099]'
                      : 'bg-[#AAFF00]/10 border-[#AAFF00]/30 text-[#AAFF00]'
                  }`}
                >
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-lg sm:text-xl">
                  Commercial Objective
                </h4>
                <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-[#4A453E]' : 'text-neutral-300'}`}>
                  {activeStep.impact}
                </p>
              </div>

              <div className={`pt-4 border-t flex items-center justify-between ${isLight ? 'border-[#E5E0D8]' : 'border-white/10'}`}>
                <button
                  type="button"
                  onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : CAMPAIGN_STEPS.length - 1))}
                  className={`py-1 px-2 text-xs font-mono font-bold uppercase cursor-pointer ${
                    isLight ? 'text-[#6E6860] hover:text-[#171717]' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  ← Previous
                </button>
                <span className={`text-xs font-mono ${isLight ? 'text-[#8C857B]' : 'text-neutral-600'}`}>
                  {activeStepIndex + 1} / {CAMPAIGN_STEPS.length}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveStepIndex((prev) => (prev < CAMPAIGN_STEPS.length - 1 ? prev + 1 : 0))}
                  className={`py-1 px-2 text-xs font-mono font-bold uppercase flex items-center gap-1 cursor-pointer ${
                    isLight ? 'text-[#390099] hover:text-[#FF0054]' : 'text-[#AAFF00] hover:text-white'
                  }`}
                >
                  <span>Next Step</span>
                  <span>→</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Section Bottom CTA */}
        <div className="mt-12 sm:mt-14 text-center">
          <button
            type="button"
            onClick={onPlanCampaign}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-heading font-bold uppercase tracking-wider cursor-pointer shadow-lg ${
              isLight
                ? 'bg-[#390099] text-white hover:bg-[#2E007A] shadow-glow-purple'
                : 'btn-teevra-lime shadow-glow-lime'
            }`}
          >
            <span>Let's Plan Your Campaign</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </section>
  );
};
