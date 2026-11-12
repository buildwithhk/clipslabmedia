import React from 'react';
import { ArrowUpRight, Sparkles, Box, Compass, Film, Eye, Smartphone, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SERVICES_DATA } from '../data/services';

interface ServicesPageProps {
  onStartProject: (serviceName?: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-[#AAFF00]" />,
  Box: <Box className="w-5 h-5 text-[#FFA670]" />,
  Compass: <Compass className="w-5 h-5 text-[#FF0054]" />,
  Film: <Film className="w-5 h-5 text-[#638AFF]" />,
  Eye: <Eye className="w-5 h-5 text-[#EEF23A]" />,
  Smartphone: <Smartphone className="w-5 h-5 text-[#AAFF00]" />,
};

export const ServicesPage: React.FC<ServicesPageProps> = ({ onStartProject }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div
      className={`w-full transition-colors duration-200 pt-8 sm:pt-12 pb-14 sm:pb-16 ${
        isLight ? 'bg-[#F7F6F2] text-[#121212]' : 'bg-[#080808] text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold mb-4 border ${
              isLight
                ? 'bg-white border-[#E2DDD5] text-[#121212]'
                : 'bg-[#161616] border-white/10 text-[#AAFF00]'
            }`}
          >
            <span>STUDIO CAPABILITIES // WHAT WE DO</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.02] uppercase mb-4">
            CREATIVE PRODUCTION<br />
            <span className="font-editorial-serif italic font-normal lowercase tracking-normal text-[#FF0054]">
              capabilities
            </span>
            <span className="text-[#FF0054]">.</span>
          </h1>

          <p
            className={`text-sm sm:text-base md:text-lg leading-relaxed ${
              isLight ? 'text-[#5E5A53]' : 'text-neutral-400'
            }`}
          >
            From high-concept AI commercial spots and product films to complete visual campaigns, each service is personally directed and produced by Harsh Kumar.
          </p>
        </div>

        {/* 6 Detailed Services Grid */}
        <div className="space-y-6 sm:space-y-8 mb-16 sm:mb-24">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.number}
              className={`p-6 sm:p-10 rounded-3xl border transition-all duration-300 ${
                isLight
                  ? 'bg-white border-[#E2DDD5] hover:border-[#121212] shadow-sm'
                  : 'bg-[#121212] border-white/10 hover:border-white/30'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left col: Title and Short Desc */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-base sm:text-lg font-extrabold text-[#FF0054]">
                      {service.number} —
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full border flex items-center justify-center ${
                        isLight ? 'bg-[#F7F6F2] border-[#E2DDD5]' : 'bg-[#181818] border-white/15'
                      }`}
                    >
                      {iconMap[service.iconName]}
                    </div>
                  </div>

                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase tracking-tight">
                    {service.title}
                  </h3>

                  <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-[#3E3A33]' : 'text-neutral-300'}`}>
                    {service.extendedDescription}
                  </p>

                  <div className="pt-2 flex items-center gap-4 text-xs font-mono">
                    <span className="text-[#FF0054] font-bold">TURNAROUND:</span>
                    <span>{service.turnaroundTime}</span>
                  </div>
                </div>

                {/* Right col: Deliverables & CTA */}
                <div className="lg:col-span-7 space-y-6 lg:pl-8 lg:border-l border-[#E2DDD5]/60 dark:border-white/10">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#5E5A53] dark:text-neutral-400 mb-3">
                      Key Deliverables
                    </h4>
                    <ul className="space-y-2.5">
                      {service.keyDeliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <Check className="w-4 h-4 text-[#AAFF00] flex-shrink-0 mt-0.5" />
                          <span className={isLight ? 'text-[#4A453E]' : 'text-neutral-300'}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#E2DDD5]/60 dark:border-white/10">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#7D766D] dark:text-neutral-500 block">
                        IDEAL APPLICATION
                      </span>
                      <span className="text-xs font-mono font-medium">
                        {service.idealFor}
                      </span>
                    </div>

                    <button
                      onClick={() => onStartProject(service.title)}
                      className={`px-5 py-2.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
                        isLight
                          ? 'bg-[#121212] text-white hover:bg-[#262626]'
                          : 'bg-[#AAFF00] text-[#080808] hover:bg-[#B8FF1F]'
                      }`}
                    >
                      <span>Inquire About This Service</span>
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
