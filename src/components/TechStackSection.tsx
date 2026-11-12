import React from 'react';
import { TOOLKIT_CATEGORIES } from '../data/techStack';
import { useTheme } from '../context/ThemeContext';
import { Cpu, Video, Music, Scissors, Sparkles } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  'AI & Generative Tools': <Cpu className="w-4 h-4 text-[#FF0054]" />,
  'Image & Video Generation': <Video className="w-4 h-4 text-[#AAFF00]" />,
  'Audio & Soundscapes': <Music className="w-4 h-4 text-[#638AFF]" />,
  'Post-Production & Polish': <Scissors className="w-4 h-4 text-[#FFA670]" />,
};

export const TechStackSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section
      id="toolkit-section"
      className={`py-10 sm:py-14 lg:py-16 border-b transition-colors duration-200 relative ${
        isLight ? 'bg-[#F7F6F2] border-[#E2DDD5] text-[#121212]' : 'bg-[#080808] border-white/10 text-white'
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
              <span>STUDIO PIPELINE // MY CREATIVE TOOLKIT</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] uppercase">
              POWERED BY CREATIVITY.<br />
              <span className="font-editorial-serif italic font-normal lowercase tracking-normal text-[#FF0054]">
                built with technology
              </span>
              <span className="text-[#FF0054]">.</span>
            </h2>
          </div>

          <p
            className={`max-w-md text-xs sm:text-sm md:text-base leading-relaxed ${
              isLight ? 'text-[#5E5A53]' : 'text-neutral-400'
            }`}
          >
            Tools don't replace creative direction—they amplify it. Here are the generative models and production suites I deploy to craft impossible visuals.
          </p>
        </div>

        {/* 4 Clean Editorial Category Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOOLKIT_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                isLight
                  ? 'bg-white border-[#E2DDD5] shadow-sm hover:border-[#121212]'
                  : 'bg-[#141414] border-white/10 hover:border-white/30'
              }`}
            >
              <div>
                {/* Header with category icon */}
                <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-[#E2DDD5]/60 dark:border-white/10">
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                      isLight ? 'bg-[#F7F6F2] border-[#E2DDD5]' : 'bg-[#181818] border-white/15'
                    }`}
                  >
                    {categoryIcons[category.title] || <Sparkles className="w-4 h-4 text-[#AAFF00]" />}
                  </div>
                  <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider">
                    {category.title}
                  </h3>
                </div>

                {/* List of text-based tool items */}
                <div className="space-y-4">
                  {category.tools.map((tool, tIdx) => (
                    <div key={tIdx} className="group">
                      <p className="font-heading font-bold text-sm tracking-tight group-hover:text-[#FF0054] transition-colors">
                        {tool.name}
                      </p>
                      <p
                        className={`text-[11px] leading-relaxed mt-0.5 ${
                          isLight ? 'text-[#6B665E]' : 'text-neutral-400'
                        }`}
                      >
                        {tool.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-[#E2DDD5]/60 dark:border-white/10 text-[10px] font-mono uppercase tracking-widest text-[#7D766D] dark:text-neutral-500">
                ACTIVE PRODUCTION PIPELINE
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
