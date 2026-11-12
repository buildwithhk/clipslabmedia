import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface AboutFounderProps {
  onStartProject?: () => void;
  onExploreWork?: () => void;
}

export const AboutFounder: React.FC<AboutFounderProps> = ({
  onStartProject,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section
      id="about-section"
      className={`py-8 sm:py-10 lg:py-12 border-b transition-colors duration-200 relative overflow-hidden ${
        isLight ? 'bg-[#EFECE6] border-[#E2DDD5] text-[#121212]' : 'bg-[#0A0A0A] border-white/10 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Pill */}
        <div className="mb-3 sm:mb-4">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-bold border ${
              isLight
                ? 'bg-[#FFFFFF] border-[#E2DDD5] text-[#121212]'
                : 'bg-[#161616] border-white/10 text-[#AAFF00]'
            }`}
          >
            <span>ABOUT THE FOUNDER // HARSH KUMAR</span>
          </div>
        </div>

        {/* Section Heading */}
        <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] uppercase mb-6 sm:mb-8">
          THE PERSON BEHIND<br />
          <span className="font-editorial-serif italic font-normal lowercase tracking-normal text-[#FF0054]">
            the frames
          </span>
          <span className="text-[#FF0054]">.</span>
        </h2>

        {/* Grid: Left Portrait + Right Personal Narrative (Aligned Heights) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Harsh Kumar's Visual Identity Portrait */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden bg-[#1E1E1E] shadow-xl border border-[#E2DDD5] dark:border-white/15 group">
              <img
                src="/assets/harsh-kumar.jpg?v=2"
                alt="Harsh Kumar — Founder, AI Filmmaker & Video Editor"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column: Founder's Personal Narrative */}
          <div className="lg:col-span-8 flex flex-col justify-center text-left space-y-4">
            
            {/* The exact copy requested */}
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <p
                className={`font-medium ${
                  isLight ? 'text-[#121212]' : 'text-neutral-100'
                }`}
              >
                I'm <span className="font-bold underline decoration-[#FF0054] underline-offset-4">Harsh Kumar</span>, the founder of ClipsLab Media, an AI filmmaker passionate about transforming ideas into cinematic visual experiences.
              </p>

              <p className={isLight ? 'text-[#4A453E]' : 'text-neutral-300'}>
                My interest lies at the intersection of filmmaking, Video Editing, artificial intelligence, creative direction and technology.
              </p>

              <p className={isLight ? 'text-[#4A453E]' : 'text-neutral-300'}>
                I explore how emerging AI models and creative workflows can help produce compelling advertisements, product films, cinematic storytelling and next-generation visual content.
              </p>

              <p className={isLight ? 'text-[#4A453E]' : 'text-neutral-300'}>
                For me, filmmaking is not just about generating beautiful visuals. It's about understanding an idea, developing a creative direction and translating it into an engaging visual story.
              </p>

              <p className={isLight ? 'text-[#4A453E]' : 'text-neutral-300'}>
                Through ClipsLab Media, I'm building a creative space focused on experimentation, innovation and meaningful visual storytelling.
              </p>
            </div>

            {onStartProject && (
              <div className="pt-2">
                <button
                  onClick={onStartProject}
                  className={`px-6 py-3 rounded-full text-xs font-heading font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer transition-all shadow-sm hover:scale-[1.02] ${
                    isLight
                      ? 'bg-[#121212] text-white hover:bg-[#262626]'
                      : 'bg-[#AAFF00] text-[#080808] hover:bg-[#B8FF1F]'
                  }`}
                >
                  <span>Work With Me</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
