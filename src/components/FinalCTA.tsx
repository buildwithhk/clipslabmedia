import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface FinalCTAProps {
  onStartProject: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartProject }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section
      className={`py-14 sm:py-18 lg:py-20 relative overflow-hidden border-t transition-colors duration-200 ${
        isLight
          ? 'bg-[#FAF9F6] border-[#E5E0D8] text-[#171717]'
          : 'bg-[#080808] border-white/10 text-white'
      }`}
    >
      {/* Ambient Radial Lighting */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[250px] sm:h-[350px] blur-[130px] rounded-full pointer-events-none ${
          isLight ? 'bg-[#390099]/5' : 'bg-[#AAFF00]/10'
        }`}
      />
      <div
        className={`absolute -bottom-20 -right-20 w-60 sm:w-80 h-60 sm:h-80 blur-[120px] rounded-full pointer-events-none ${
          isLight ? 'bg-[#FF0054]/5' : 'bg-[#FFA670]/10'
        }`}
      />
      <div className="absolute inset-0 bg-studio-grid opacity-50 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Top Centered Status Pill */}
        <div
          className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border mb-6 sm:mb-8 backdrop-blur-md max-w-full ${
            isLight
              ? 'bg-white border-[#E5E0D8] text-[#171717] shadow-sm'
              : 'bg-[#141414] border-white/10 text-neutral-300'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full animate-pulse flex-shrink-0 ${
              isLight ? 'bg-[#FF0054]' : 'bg-[#AAFF00]'
            }`}
          />
          <span className="text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-widest uppercase font-bold truncate">
            Available For Select Brand Campaigns
          </span>
        </div>

        {/* Massive Headline with Instrument Serif Contrast */}
        <h2 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.0] uppercase mb-6 sm:mb-8">
          YOUR NEXT BIG IDEA<br />
          <span
            className={`font-editorial-serif italic font-normal lowercase ${
              isLight ? 'text-[#FF0054]' : 'text-[#AAFF00]'
            }`}
          >
            deserves a bigger execution.
          </span>
        </h2>

        {/* Supporting Copy */}
        <p
          className={`text-sm sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12 font-normal ${
            isLight ? 'text-[#6E6860]' : 'text-neutral-400'
          }`}
        >
          Let's turn your product, story or campaign idea into something audiences remember — pairing visionary creative direction with agile generative production pipelines.
        </p>

        {/* CTA Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onStartProject}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-heading font-bold uppercase tracking-wider cursor-pointer shadow-lg transition-all ${
              isLight
                ? 'bg-[#390099] text-white hover:bg-[#2E007A] shadow-glow-purple'
                : 'btn-teevra-lime shadow-glow-lime'
            }`}
          >
            <span>Start A Project</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <a
            href="mailto:contact@clipslabmedia.com"
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-heading font-medium uppercase tracking-wider cursor-pointer border transition-all ${
              isLight
                ? 'bg-white border-[#E5E0D8] text-[#171717] hover:border-[#171717]'
                : 'btn-teevra-glass'
            }`}
          >
            <Mail className={`w-4 h-4 ${isLight ? 'text-[#390099]' : 'text-[#AAFF00]'}`} />
            <span>Direct Email Studio</span>
          </a>
        </div>

        {/* Contact Assurance */}
        <p
          className={`mt-6 sm:mt-8 text-[10px] sm:text-xs font-mono uppercase tracking-wider sm:tracking-widest ${
            isLight ? 'text-[#8C857B]' : 'text-neutral-500'
          }`}
        >
          Direct response from studio creative directors • Mutual NDA protection available
        </p>

      </div>
    </section>
  );
};
