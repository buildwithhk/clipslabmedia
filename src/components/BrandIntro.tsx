import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const BrandIntro: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section
      className={`py-10 sm:py-14 lg:py-16 border-y transition-colors duration-200 relative overflow-hidden ${
        isLight
          ? 'bg-[#FAF9F6] border-[#E5E0D8] text-[#171717]'
          : 'bg-[#0a0a0a] border-white/10 text-white'
      }`}
    >
      {/* Kinetic Marquee Ribbon */}
      <div
        className={`border-b pb-4 sm:pb-6 mb-12 sm:mb-16 overflow-hidden select-none ${
          isLight ? 'border-[#E5E0D8]' : 'border-white/10'
        }`}
      >
        <div
          className={`animate-marquee-ticker flex items-center gap-8 sm:gap-10 whitespace-nowrap text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase ${
            isLight ? 'text-[#6E6860]' : 'text-neutral-400'
          }`}
        >
          <span className="flex items-center gap-2 sm:gap-3">
            <span className={isLight ? 'text-[#FF0054]' : 'text-[#AAFF00]'}>●</span> AI ADVERTISING
          </span>
          <span className="flex items-center gap-2 sm:gap-3">
            <span className={isLight ? 'text-[#390099]' : 'text-[#EEF23A]'}>●</span> AI FILMMAKING
          </span>
          <span className="flex items-center gap-2 sm:gap-3">
            <span className={isLight ? 'text-[#FF5400]' : 'text-[#FFA670]'}>●</span> ZERO-GRAVITY SIMULATION
          </span>
          <span className="flex items-center gap-2 sm:gap-3">
            <span className={isLight ? 'text-[#9E0059]' : 'text-[#638AFF]'}>●</span> GEN FX & NEURAL LIGHTING
          </span>
          <span className="flex items-center gap-2 sm:gap-3">
            <span className={isLight ? 'text-[#FF0054]' : 'text-[#AAFF00]'}>●</span> CINEMA-GRADE FINISHING
          </span>
          <span className="flex items-center gap-2 sm:gap-3">
            <span className={isLight ? 'text-[#FFBD00]' : 'text-[#EEF23A]'}>●</span> CREATIVE DIRECTION
          </span>
          <span className="flex items-center gap-2 sm:gap-3">
            <span className={isLight ? 'text-[#FF5400]' : 'text-[#FFA670]'}>●</span> PRODUCT LAUNCH CAMPAIGNS
          </span>
          <span className="flex items-center gap-2 sm:gap-3">
            <span className={isLight ? 'text-[#FF0054]' : 'text-[#AAFF00]'}>●</span> AI ADVERTISING
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          
          {/* Left: What We Do */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-widest border ${
                isLight
                  ? 'bg-white border-[#E5E0D8] text-[#390099] font-bold'
                  : 'bg-[#181818] border-white/10 text-[#AAFF00]'
              }`}
            >
              <span>WHAT WE DO</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] uppercase">
              THE NEW LANGUAGE<br />
              OF BRAND<br />
              <span
                className={`font-editorial-serif italic font-normal lowercase ${
                  isLight ? 'text-[#FF0054]' : 'text-[#AAFF00]'
                }`}
              >
                advertising.
              </span>
            </h2>

            <p
              className={`text-lg sm:text-2xl font-medium leading-snug ${
                isLight ? 'text-[#171717]' : 'text-neutral-200'
              }`}
            >
              One integrated pipeline from initial brief to cinema-grade finish.{' '}
              <span className={isLight ? 'text-[#390099] font-bold' : 'text-[#AAFF00]'}>
                Unlocking creative scale
              </span>{' '}
              without losing human art direction.
            </p>
          </div>

          {/* Right: Narrative Details & Pillars */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <p
              className={`text-sm sm:text-base lg:text-lg leading-relaxed font-normal ${
                isLight ? 'text-[#4A453E]' : 'text-neutral-400'
              }`}
            >
              Attention is expensive. Creativity is the advantage. At ClipsLab Media, we combine creative direction, generative AI, and cinematic production together to help ambitious brands communicate differently.
            </p>

            <p
              className={`text-xs sm:text-sm md:text-base leading-relaxed ${
                isLight ? 'text-[#6E6860]' : 'text-neutral-400'
              }`}
            >
              We are not selling AI-generated clips as a commodity shortcut. We deliver cohesive creative concepts, storytelling, commercial campaigns, and visual worlds engineered for real brand impact.
            </p>

            {/* Feature Callouts */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t ${
                isLight ? 'border-[#E5E0D8]' : 'border-white/10'
              }`}
            >
              <div
                className={`p-4 sm:p-5 rounded-xl border transition-colors ${
                  isLight
                    ? 'bg-white border-[#E5E0D8] hover:border-[#390099]'
                    : 'bg-[#141414] border-white/10 hover:border-[#AAFF00]/40'
                }`}
              >
                <span
                  className={`text-[10px] font-mono uppercase font-bold tracking-wider block mb-1 ${
                    isLight ? 'text-[#390099]' : 'text-[#AAFF00]'
                  }`}
                >
                  01 // AGILE WORKFLOWS
                </span>
                <p className="font-heading font-bold text-sm sm:text-base">
                  Rapid Digital Iteration
                </p>
                <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-[#6E6860]' : 'text-neutral-400'}`}>
                  Explore multiple lighting moods, product environments, and camera angles digitally without expensive set rebuilds.
                </p>
              </div>

              <div
                className={`p-4 sm:p-5 rounded-xl border transition-colors ${
                  isLight
                    ? 'bg-white border-[#E5E0D8] hover:border-[#FF0054]'
                    : 'bg-[#141414] border-white/10 hover:border-[#FFA670]/40'
                }`}
              >
                <span
                  className={`text-[10px] font-mono uppercase font-bold tracking-wider block mb-1 ${
                    isLight ? 'text-[#FF0054]' : 'text-[#FFA670]'
                  }`}
                >
                  02 // DIRECTED STORYTELLING
                </span>
                <p className="font-heading font-bold text-sm sm:text-base">
                  Cinema-Grade Craft
                </p>
                <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-[#6E6860]' : 'text-neutral-400'}`}>
                  Cinematography fundamentals, volumetric lighting, disciplined depth of field, and custom sound staging.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
