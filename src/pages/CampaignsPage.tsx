import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { CAMPAIGN_STEPS } from '../data/campaignSteps';
import { FinalCTA } from '../components/FinalCTA';

interface CampaignsPageProps {
  onStartCampaignPlan: () => void;
}

export const CampaignsPage: React.FC<CampaignsPageProps> = ({ onStartCampaignPlan }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [includeHero, setIncludeHero] = useState(true);
  const [cutdownCount, setCutdownCount] = useState(10);
  const [stillsCount, setStillsCount] = useState(6);
  const [needMultiRatio, setNeedMultiRatio] = useState(true);

  const baseCost = 3500;
  const cutdownCost = cutdownCount * 250;
  const stillsCost = stillsCount * 120;
  const multiRatioCost = needMultiRatio ? 800 : 0;
  const totalEstimate = baseCost + cutdownCost + stillsCost + multiRatioCost;
  const estimatedDays = cutdownCount > 10 ? '7 - 10 business days' : '5 - 7 business days';

  return (
    <div
      className={`w-full transition-colors duration-200 pt-8 sm:pt-12 pb-20 sm:pb-24 ${
        isLight ? 'bg-[#FAF9F6] text-[#171717]' : 'bg-[#080808] text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold mb-4 sm:mb-6 border ${
              isLight
                ? 'bg-white border-[#E5E0D8] text-[#390099]'
                : 'bg-[#161616] border-white/10 text-[#AAFF00]'
            }`}
          >
            <span>FULL CAMPAIGN MACHINE</span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[0.98] uppercase mb-4 sm:mb-6">
            FROM PRODUCT IDEA<br />
            <span
              className={`font-editorial-serif italic font-normal lowercase ${
                isLight ? 'text-[#FF0054]' : 'text-[#AAFF00]'
              }`}
            >
              to market-ready campaign.
            </span>
          </h1>

          <p
            className={`text-sm sm:text-lg md:text-xl leading-relaxed font-normal ${
              isLight ? 'text-[#6E6860]' : 'text-neutral-400'
            }`}
          >
            Most agencies sell you an isolated video clip and leave your marketing team stranded. We build the entire synchronized campaign ecosystem from brand discovery to platform launch.
          </p>
        </div>

        {/* 6 Step Linear Deep Dive */}
        <div className="space-y-6 sm:space-y-8 mb-20 sm:mb-28">
          {CAMPAIGN_STEPS.map((step) => (
            <div
              key={step.step}
              className={`p-5 sm:p-8 lg:p-10 rounded-2xl border transition-all grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start sm:items-center shadow-sm ${
                isLight
                  ? 'bg-white border-[#E5E0D8] hover:border-[#390099]/50'
                  : 'bg-[#121212] border-white/10 hover:border-[#AAFF00]/40'
              }`}
            >
              <div className="lg:col-span-1">
                <span
                  className={`font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold ${
                    isLight ? 'text-[#390099]' : 'text-[#AAFF00]'
                  }`}
                >
                  {step.step}
                </span>
              </div>

              <div className="lg:col-span-6 space-y-2">
                <span
                  className={`text-[11px] sm:text-xs font-mono font-bold uppercase block ${
                    isLight ? 'text-[#6E6860]' : 'text-neutral-500'
                  }`}
                >
                  Phase {step.step} • {step.duration}
                </span>
                <h3 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl">
                  {step.name}
                </h3>
                <p
                  className={`font-heading font-medium text-sm sm:text-base ${
                    isLight ? 'text-[#FF5400]' : 'text-[#FFA670]'
                  }`}
                >
                  {step.tagline}
                </p>
                <p
                  className={`text-xs sm:text-sm leading-relaxed pt-1 ${
                    isLight ? 'text-[#6E6860]' : 'text-neutral-400'
                  }`}
                >
                  {step.description}
                </p>
              </div>

              <div
                className={`lg:col-span-5 p-4 sm:p-6 rounded-xl border space-y-3 ${
                  isLight
                    ? 'bg-[#F0EDE7] border-[#E5E0D8]'
                    : 'bg-[#181818] border-white/5'
                }`}
              >
                <p
                  className={`text-xs font-mono uppercase tracking-wider font-bold ${
                    isLight ? 'text-[#390099]' : 'text-[#AAFF00]'
                  }`}
                >
                  Stage Deliverables:
                </p>
                <div className="space-y-1.5">
                  {step.outputs.map((out: string, idx: number) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 text-xs font-medium ${
                        isLight ? 'text-[#171717]' : 'text-neutral-200'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-3.5 h-3.5 flex-shrink-0 ${
                          isLight ? 'text-[#390099]' : 'text-[#AAFF00]'
                        }`}
                      />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
                <div
                  className={`pt-2 border-t ${
                    isLight ? 'border-[#E5E0D8]' : 'border-white/10'
                  }`}
                >
                  <span
                    className={`text-[11px] italic block ${
                      isLight ? 'text-[#6E6860]' : 'text-neutral-400'
                    }`}
                  >
                    "{step.impact}"
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Campaign Calculator */}
        <div
          className={`rounded-3xl p-5 sm:p-8 lg:p-12 mb-20 sm:mb-24 border relative overflow-hidden shadow-2xl transition-colors ${
            isLight
              ? 'bg-white border-[#E5E0D8] text-[#171717]'
              : 'bg-[#121212] border-white/15 text-white'
          }`}
        >
          <div className="max-w-3xl mb-8 sm:mb-10">
            <span
              className={`text-xs font-mono uppercase tracking-widest font-bold mb-2 block ${
                isLight ? 'text-[#390099]' : 'text-[#AAFF00]'
              }`}
            >
              INTERACTIVE CONFIGURATOR
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight leading-tight uppercase">
              ESTIMATE YOUR CAMPAIGN SCOPE.
            </h2>
            <p
              className={`text-xs sm:text-sm md:text-base mt-2 ${
                isLight ? 'text-[#6E6860]' : 'text-neutral-400'
              }`}
            >
              Select your required asset volume below to see estimated turnaround and investment parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              {/* Hero Spot */}
              <div
                className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl border ${
                  isLight
                    ? 'bg-[#F0EDE7] border-[#E5E0D8]'
                    : 'bg-[#181818] border-white/10'
                }`}
              >
                <div>
                  <p className="font-heading font-bold text-sm sm:text-base">
                    4K UHD Hero Commercial Spot
                  </p>
                  <p
                    className={`text-xs ${
                      isLight ? 'text-[#6E6860]' : 'text-neutral-400'
                    }`}
                  >
                    Flagship centerpiece advertisement (30s & 60s)
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-mono font-bold rounded-full ${
                    isLight
                      ? 'bg-[#390099] text-white'
                      : 'bg-[#AAFF00] text-[#080808]'
                  }`}
                >
                  Included
                </span>
              </div>

              {/* Cutdowns */}
              <div
                className={`p-3.5 sm:p-4 rounded-xl border space-y-2 ${
                  isLight
                    ? 'bg-[#F0EDE7] border-[#E5E0D8]'
                    : 'bg-[#181818] border-white/10'
                }`}
              >
                <div className="flex justify-between items-center text-xs sm:text-sm font-heading font-bold">
                  <span>Social Ad Cutdowns & Hook Variations:</span>
                  <span
                    className={`font-mono text-sm sm:text-base font-bold ${
                      isLight ? 'text-[#390099]' : 'text-[#AAFF00]'
                    }`}
                  >
                    {cutdownCount} Variations
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="20"
                  step="1"
                  value={cutdownCount}
                  onChange={(e) => setCutdownCount(parseInt(e.target.value))}
                  className={`w-full cursor-pointer ${
                    isLight ? 'accent-[#390099]' : 'accent-[#AAFF00]'
                  }`}
                />
                <div
                  className={`flex justify-between text-[10px] sm:text-[11px] font-mono ${
                    isLight ? 'text-[#6E6860]' : 'text-neutral-500'
                  }`}
                >
                  <span>5 Variations (Sprint)</span>
                  <span>10 (Recommended)</span>
                  <span>20 (High Volume)</span>
                </div>
              </div>

              {/* Stills */}
              <div
                className={`p-3.5 sm:p-4 rounded-xl border space-y-2 ${
                  isLight
                    ? 'bg-[#F0EDE7] border-[#E5E0D8]'
                    : 'bg-[#181818] border-white/10'
                }`}
              >
                <div className="flex justify-between items-center text-xs sm:text-sm font-heading font-bold">
                  <span>High-Resolution 3D Editorial Stills:</span>
                  <span
                    className={`font-mono text-sm sm:text-base font-bold ${
                      isLight ? 'text-[#FF5400]' : 'text-[#FFA670]'
                    }`}
                  >
                    {stillsCount} Stills
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="2"
                  value={stillsCount}
                  onChange={(e) => setStillsCount(parseInt(e.target.value))}
                  className={`w-full cursor-pointer ${
                    isLight ? 'accent-[#FF5400]' : 'accent-[#FFA670]'
                  }`}
                />
                <div
                  className={`flex justify-between text-[10px] sm:text-[11px] font-mono ${
                    isLight ? 'text-[#6E6860]' : 'text-neutral-500'
                  }`}
                >
                  <span>2 Key Stills</span>
                  <span>6 (Recommended)</span>
                  <span>12 (Complete Catalog)</span>
                </div>
              </div>

              {/* Multi-Ratio Toggle */}
              <div
                className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl border ${
                  isLight
                    ? 'bg-[#F0EDE7] border-[#E5E0D8]'
                    : 'bg-[#181818] border-white/10'
                }`}
              >
                <div>
                  <p className="font-heading font-bold text-xs sm:text-sm">
                    Multi-Platform Aspect Adaptation (16:9, 9:16, 1:1, 4:5)
                  </p>
                  <p
                    className={`text-[11px] ${
                      isLight ? 'text-[#6E6860]' : 'text-neutral-400'
                    }`}
                  >
                    Custom spatial reframing with dynamic text repositioning
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setNeedMultiRatio(!needMultiRatio)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    needMultiRatio
                      ? isLight
                        ? 'bg-[#390099] text-white shadow-glow-purple-sm'
                        : 'bg-[#AAFF00] text-[#080808] shadow-glow-lime-sm'
                      : isLight
                        ? 'bg-neutral-200 text-neutral-600'
                        : 'bg-white/10 text-neutral-400'
                  }`}
                >
                  {needMultiRatio ? 'Active (+$800)' : 'Disabled'}
                </button>
              </div>
            </div>

            {/* Live Pricing Summary Box */}
            <div className="lg:col-span-5">
              <div
                className={`p-6 sm:p-8 rounded-2xl border text-center lg:text-left space-y-6 ${
                  isLight
                    ? 'bg-[#FAF9F6] border-[#390099]/30 shadow-xl'
                    : 'bg-[#161616] border-[#AAFF00]/30 shadow-glow-lime-sm'
                }`}
              >
                <div>
                  <span
                    className={`text-[11px] font-mono uppercase tracking-widest font-bold block mb-1 ${
                      isLight ? 'text-[#390099]' : 'text-[#AAFF00]'
                    }`}
                  >
                    ESTIMATED PRODUCTION SCOPE
                  </span>
                  <div className="flex items-baseline justify-center lg:justify-start gap-1">
                    <span className="font-heading font-extrabold text-4xl sm:text-5xl">
                      ${totalEstimate.toLocaleString()}
                    </span>
                    <span
                      className={`text-xs font-mono ${
                        isLight ? 'text-[#6E6860]' : 'text-neutral-400'
                      }`}
                    >
                      USD
                    </span>
                  </div>
                  <p
                    className={`text-xs mt-2 ${
                      isLight ? 'text-[#6E6860]' : 'text-neutral-400'
                    }`}
                  >
                    Estimated turnaround: <strong className={isLight ? 'text-[#390099]' : 'text-[#AAFF00]'}>{estimatedDays}</strong> (post-brief approval)
                  </p>
                </div>

                <div
                  className={`pt-4 border-t space-y-2 text-xs font-mono text-left ${
                    isLight
                      ? 'border-[#E5E0D8] text-[#171717]'
                      : 'border-white/10 text-neutral-300'
                  }`}
                >
                  <div className="flex justify-between">
                    <span>1x Flagship 4K Commercial</span>
                    <span className="font-bold">${baseCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{cutdownCount}x Social Cutdowns</span>
                    <span className="font-bold">${cutdownCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{stillsCount}x Editorial Stills</span>
                    <span className="font-bold">${stillsCost.toLocaleString()}</span>
                  </div>
                  {needMultiRatio && (
                    <div className="flex justify-between">
                      <span>Multi-Ratio Reframing</span>
                      <span className="font-bold">${multiRatioCost.toLocaleString()}</span>
                    </div>
                  )}
                  <div
                    className={`flex justify-between pt-2 border-t font-bold ${
                      isLight ? 'border-[#E5E0D8] text-[#390099]' : 'border-white/10 text-[#AAFF00]'
                    }`}
                  >
                    <span>Full Commercial Rights</span>
                    <span>Included</span>
                  </div>
                </div>

                <button
                  onClick={onStartCampaignPlan}
                  className={`w-full py-3.5 sm:py-4 rounded-full font-heading font-bold text-xs sm:text-sm uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 cursor-pointer ${
                    isLight
                      ? 'bg-[#390099] text-white hover:bg-[#2E007A] shadow-glow-purple'
                      : 'btn-teevra-lime shadow-glow-lime-sm'
                  }`}
                >
                  <span>Commission This Scope</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <FinalCTA onStartProject={onStartCampaignPlan} />
    </div>
  );
};