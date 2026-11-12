import React from 'react';
import { ArrowUpRight, Film, Sparkles, Video, UserCheck, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { AboutFounder } from '../components/AboutFounder';

interface AboutPageProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onStartProject, onExploreWork }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div
      className={`w-full transition-colors duration-200 pt-6 sm:pt-10 pb-14 sm:pb-16 ${
        isLight ? 'bg-[#F7F6F2] text-[#121212]' : 'bg-[#080808] text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full Section 5: About Founder */}
        <AboutFounder onStartProject={onStartProject} onExploreWork={onExploreWork} />

        {/* Extended Founder Philosophy & Values */}
        <div className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-[#E2DDD5] dark:border-white/10">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF0054] font-bold block mb-2">
              FOUNDER PHILOSOPHY
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-4xl uppercase tracking-tight">
              Why AI Filmmaking Changes Everything
            </h3>
            <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isLight ? 'text-[#5E5A53]' : 'text-neutral-400'}`}>
              Filmmaking has historically been gated by the economics of physical production: camera crews, transport, set construction, and weather. Generative video workflows remove the physical ceiling, putting the focus entirely back where it belongs: on creative vision and bold storytelling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-3xl border ${isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#121212] border-white/10'}`}>
              <span className="font-mono text-sm font-bold text-[#FF0054] block mb-3">01 // VISION OVER BUDGET</span>
              <h4 className="font-heading font-bold text-base uppercase mb-2">Zero Logistical Friction</h4>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-[#5E5A53]' : 'text-neutral-400'}`}>
                Simulate zero-gravity fluid dynamics, macro optics, or otherworldly architectural landscapes without multi-million dollar studio sets.
              </p>
            </div>

            <div className={`p-6 rounded-3xl border ${isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#121212] border-white/10'}`}>
              <span className="font-mono text-sm font-bold text-[#AAFF00] block mb-3">02 // ITERATION VELOCITY</span>
              <h4 className="font-heading font-bold text-base uppercase mb-2">Instant Exploration</h4>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-[#5E5A53]' : 'text-neutral-400'}`}>
                Test dozens of lighting scenarios, camera speeds, and metaphorical directions digitally before locking into final frame finishing.
              </p>
            </div>

            <div className={`p-6 rounded-3xl border ${isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#121212] border-white/10'}`}>
              <span className="font-mono text-sm font-bold text-[#638AFF] block mb-3">03 // ARTISTIC SIGNATURE</span>
              <h4 className="font-heading font-bold text-base uppercase mb-2">Human Curation</h4>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-[#5E5A53]' : 'text-neutral-400'}`}>
                Models generate raw possibilities. Human artistic judgment, rhythm, and editing pacing transform those possibilities into films people remember.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
