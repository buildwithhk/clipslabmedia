import React from 'react';
import { Shield, Lock, Clock, MessageSquare, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface TestimonialsTrustProps {
  onStartProject?: () => void;
}

export const TestimonialsTrust: React.FC<TestimonialsTrustProps> = ({ onStartProject }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

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
            <span>INTEGRITY & STANDARDS</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] uppercase mb-4 sm:mb-6">
            TRUST BUILT ON<br />
            <span
              className={`font-editorial-serif italic font-normal lowercase ${
                isLight ? 'text-[#FF0054]' : 'text-[#AAFF00]'
              }`}
            >
              obsessive execution.
            </span>
          </h2>
          <p className={`text-xs sm:text-base md:text-lg leading-relaxed font-normal ${isLight ? 'text-[#6E6860]' : 'text-neutral-400'}`}>
            We value genuine client outcomes above fabricated marketing claims. Our studio operates with complete transparency, enterprise confidentiality, and relentless delivery discipline.
          </p>
        </div>

        {/* Guarantees Grid with Precise Terms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div
            className={`p-5 sm:p-8 rounded-2xl border flex flex-col justify-between transition-colors ${
              isLight
                ? 'bg-white border-[#E5E0D8] hover:border-[#390099] shadow-subtle'
                : 'bg-[#121212] border-white/10 hover:border-[#AAFF00]/40'
            }`}
          >
            <div>
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 sm:mb-6 ${
                  isLight
                    ? 'bg-[#F0EDE7] border-[#E5E0D8] text-[#390099]'
                    : 'bg-[#181818] border-white/10 text-[#AAFF00]'
                }`}
              >
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg sm:text-xl mb-2">
                Mutual NDA Confidentiality
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-[#6E6860]' : 'text-neutral-400'}`}>
                Standard bilateral NDA executed prior to onboarding. Legally protects your proprietary product CAD models, formulations, trade secrets, and embargoed launch dates.
              </p>
            </div>
            <div
              className={`pt-5 mt-5 sm:pt-6 sm:mt-6 border-t text-[10px] font-mono uppercase tracking-widest ${
                isLight ? 'border-[#E5E0D8] text-[#8C857B]' : 'border-white/10 text-neutral-500'
              }`}
            >
              Binding Legal Confidentiality
            </div>
          </div>

          <div
            className={`p-5 sm:p-8 rounded-2xl border flex flex-col justify-between transition-colors ${
              isLight
                ? 'bg-white border-[#E5E0D8] hover:border-[#FF5400] shadow-subtle'
                : 'bg-[#121212] border-white/10 hover:border-[#FFA670]/40'
            }`}
          >
            <div>
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 sm:mb-6 ${
                  isLight
                    ? 'bg-[#F0EDE7] border-[#E5E0D8] text-[#FF5400]'
                    : 'bg-[#181818] border-white/10 text-[#FFA670]'
                }`}
              >
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg sm:text-xl mb-2">
                Transparent 3–7 Day Cycles
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-[#6E6860]' : 'text-neutral-400'}`}>
                3–5 business days for single commercial spots; 7–12 business days for multi-format launch campaigns. Turnaround commences upon brief sign-off and receipt of raw assets.
              </p>
            </div>
            <div
              className={`pt-5 mt-5 sm:pt-6 sm:mt-6 border-t text-[10px] font-mono uppercase tracking-widest ${
                isLight ? 'border-[#E5E0D8] text-[#8C857B]' : 'border-white/10 text-neutral-500'
              }`}
            >
              Milestone-Based Scheduling
            </div>
          </div>

          <div
            className={`p-5 sm:p-8 rounded-2xl border flex flex-col justify-between transition-colors ${
              isLight
                ? 'bg-white border-[#E5E0D8] hover:border-[#FF0054] shadow-subtle'
                : 'bg-[#121212] border-white/10 hover:border-[#EEF23A]/40'
            }`}
          >
            <div>
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 sm:mb-6 ${
                  isLight
                    ? 'bg-[#F0EDE7] border-[#E5E0D8] text-[#FF0054]'
                    : 'bg-[#181818] border-white/10 text-[#EEF23A]'
                }`}
              >
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg sm:text-xl mb-2">
                Perpetual Commercial Rights
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-[#6E6860]' : 'text-neutral-400'}`}>
                Full worldwide commercial ownership and perpetual broadcast/digital usage rights for all delivered video masters, vertical cutdowns, audio stems, and campaign stills.
              </p>
            </div>
            <div
              className={`pt-5 mt-5 sm:pt-6 sm:mt-6 border-t text-[10px] font-mono uppercase tracking-widest ${
                isLight ? 'border-[#E5E0D8] text-[#8C857B]' : 'border-white/10 text-neutral-500'
              }`}
            >
              Worldwide Perpetual License
            </div>
          </div>
        </div>

        {/* Client Collaboration Banner */}
        <div
          className={`p-6 sm:p-8 lg:p-10 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 ${
            isLight
              ? 'bg-[#F0EDE7] border-[#E5E0D8] text-[#171717]'
              : 'bg-[#141414] border-white/10 text-white'
          }`}
        >
          <div className="space-y-2 text-center md:text-left">
            <div
              className={`inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider ${
                isLight ? 'text-[#390099]' : 'text-[#AAFF00]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Partner Review Portal</span>
            </div>
            <h4 className="font-heading font-bold text-xl sm:text-2xl">
              Authentic Client Collaborations
            </h4>
            <p className={`text-xs sm:text-sm max-w-xl ${isLight ? 'text-[#6E6860]' : 'text-neutral-400'}`}>
              We work closely with direct founders and brand leads. Post-campaign verified reviews and performance debriefs are published with client consent following launch cycles.
            </p>
          </div>

          <button
            type="button"
            onClick={onStartProject}
            className={`w-full sm:w-auto whitespace-nowrap inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider cursor-pointer shadow-md ${
              isLight
                ? 'bg-[#390099] text-white hover:bg-[#2E007A] shadow-glow-purple'
                : 'btn-teevra-lime shadow-glow-lime-sm'
            }`}
          >
            <span>Collaborate With Our Studio</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </section>
  );
};
