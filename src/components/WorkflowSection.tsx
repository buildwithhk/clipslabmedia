import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { WORKFLOW_STAGES } from '../data/workflow';
import { WorkflowStage } from '../types';
import { useTheme } from '../context/ThemeContext';

export const WorkflowSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [selectedStageId, setSelectedStageId] = useState<string>('brief');

  const currentStage = WORKFLOW_STAGES.find((s: WorkflowStage) => s.id === selectedStageId) || WORKFLOW_STAGES[0];

  return (
    <section
      className={`py-10 sm:py-14 lg:py-16 border-b transition-colors duration-200 relative ${
        isLight ? 'bg-[#F0EDE7] border-[#E5E0D8] text-[#171717]' : 'bg-[#0a0a0a] border-white/10 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold mb-4 border ${
              isLight ? 'bg-white border-[#E5E0D8] text-[#390099]' : 'bg-[#161616] border-white/10 text-[#AAFF00]'
            }`}
          >
            <span>OPERATIONAL DISCIPLINE</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] uppercase mb-4">
            CREATIVITY MEETS<br />
            <span
              className={`font-editorial-serif italic font-normal lowercase ${
                isLight ? 'text-[#FF0054]' : 'text-[#AAFF00]'
              }`}
            >
              intelligent production.
            </span>
          </h2>
          <p className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto ${isLight ? 'text-[#6E6860]' : 'text-neutral-400'}`}>
            Every commercial campaign moves through a disciplined 7-stage neural pipeline designed to eliminate guesswork, speed up turnaround, and ensure extraordinary creative execution.
          </p>
        </div>

        {/* Visual Workflow Stage Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8 sm:mb-10">
          {WORKFLOW_STAGES.map((stage: WorkflowStage, idx: number) => {
            const isSelected = selectedStageId === stage.id;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setSelectedStageId(stage.id)}
                className={`p-3 sm:p-4 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between h-24 sm:h-28 cursor-pointer ${
                  isSelected
                    ? isLight
                      ? 'bg-white text-[#171717] border-[#390099] shadow-md scale-[1.02] ring-1 ring-[#390099]'
                      : 'bg-[#181818] text-white border-[#AAFF00] shadow-[0_0_20px_rgba(170,255,0,0.15)] scale-[1.02]'
                    : isLight
                    ? 'bg-[#FAF9F6] text-[#6E6860] border-[#E5E0D8] hover:border-[#390099]/40 hover:text-[#171717]'
                    : 'bg-[#121212] text-neutral-400 border-white/10 hover:border-white/25 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-[10px] font-mono font-bold ${
                      isSelected
                        ? isLight
                          ? 'text-[#390099]'
                          : 'text-[#AAFF00]'
                        : isLight
                        ? 'text-[#8C857B]'
                        : 'text-neutral-500'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  {idx < WORKFLOW_STAGES.length - 1 && (
                    <ArrowRight
                      className={`w-3 h-3 hidden lg:block ${
                        isSelected
                          ? isLight
                            ? 'text-[#390099]'
                            : 'text-[#AAFF00]'
                          : isLight
                          ? 'text-[#C4BEB5]'
                          : 'text-neutral-600'
                      }`}
                    />
                  )}
                </div>
                <div>
                  <p className="font-heading font-bold text-xs sm:text-sm leading-tight uppercase truncate">
                    {stage.title}
                  </p>
                  <p
                    className={`text-[9px] sm:text-[10px] font-mono truncate mt-0.5 ${
                      isSelected
                        ? isLight
                          ? 'text-[#FF0054] font-bold'
                          : 'text-[#AAFF00]'
                        : isLight
                        ? 'text-[#8C857B]'
                        : 'text-neutral-500'
                    }`}
                  >
                    {stage.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Detailed Stage Viewer */}
        <div
          className={`rounded-2xl border p-5 sm:p-8 lg:p-10 shadow-2xl ${
            isLight ? 'bg-white border-[#E5E0D8] text-[#171717]' : 'bg-[#121212] border-white/10 text-white'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Left: What Happens */}
            <div className="lg:col-span-5 space-y-3 sm:space-y-4">
              <span
                className={`text-[11px] sm:text-xs font-mono uppercase tracking-widest font-bold block ${
                  isLight ? 'text-[#390099]' : 'text-[#AAFF00]'
                }`}
              >
                Stage Deep Dive // {currentStage.title}
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl">
                What Happens During {currentStage.title}
              </h3>
              <p className={`text-xs sm:text-sm md:text-base leading-relaxed ${isLight ? 'text-[#4A453E]' : 'text-neutral-300'}`}>
                {currentStage.description}
              </p>
            </div>

            {/* Middle: What is Delivered */}
            <div
              className={`lg:col-span-4 p-4 sm:p-6 rounded-xl border space-y-3 ${
                isLight ? 'bg-[#FAF9F6] border-[#E5E0D8]' : 'bg-[#181818] border-white/5'
              }`}
            >
              <p className={`text-xs font-mono uppercase tracking-wider font-bold ${isLight ? 'text-[#FF5400]' : 'text-[#FFA670]'}`}>
                Tangible Deliverables
              </p>
              <div className="space-y-2">
                {currentStage.deliverables.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                    <CheckCircle2
                      className={`w-4 h-4 flex-shrink-0 ${
                        isLight ? 'text-[#FF0054]' : 'text-[#AAFF00]'
                      }`}
                    />
                    <span className={isLight ? 'text-[#171717]' : 'text-neutral-200'}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Strategic Impact */}
            <div
              className={`lg:col-span-3 p-4 sm:p-6 border rounded-xl space-y-3 ${
                isLight ? 'bg-[#F0EDE7] border-[#E5E0D8]' : 'bg-[#141414] border-white/10'
              }`}
            >
              <p className={`text-xs font-mono uppercase tracking-wider font-bold ${isLight ? 'text-[#390099]' : 'text-[#EEF23A]'}`}>
                Strategic Impact
              </p>
              <p className={`text-xs sm:text-sm leading-relaxed font-normal ${isLight ? 'text-[#4A453E]' : 'text-neutral-300'}`}>
                {currentStage.contribution}
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
