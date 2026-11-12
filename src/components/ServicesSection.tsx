import React from 'react';
import { ArrowUpRight, Sparkles, Box, Compass, Film, Eye, Smartphone } from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import { useTheme } from '../context/ThemeContext';

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-[#AAFF00]" />,
  Box: <Box className="w-5 h-5 text-[#FFA670]" />,
  Compass: <Compass className="w-5 h-5 text-[#FF0054]" />,
  Film: <Film className="w-5 h-5 text-[#638AFF]" />,
  Eye: <Eye className="w-5 h-5 text-[#EEF23A]" />,
  Smartphone: <Smartphone className="w-5 h-5 text-[#AAFF00]" />,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section
      id="services-section"
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
              <span>STUDIO CAPABILITIES // SERVICES</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] uppercase">
              WHAT WE{' '}
              <span className="font-editorial-serif italic font-normal lowercase tracking-normal text-[#FF0054]">
                do
              </span>
              <span className="text-[#FF0054]">.</span>
            </h2>
          </div>

          <p
            className={`max-w-md text-xs sm:text-sm md:text-base leading-relaxed ${
              isLight ? 'text-[#5E5A53]' : 'text-neutral-400'
            }`}
          >
            Six focused creative capabilities engineered to bring visionary brand concepts, product films, and cinematic stories into reality.
          </p>
        </div>

        {/* 6 Minimalist Premium Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.number}
              onClick={() => onSelectService && onSelectService(service.title)}
              className={`group p-6 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                isLight
                  ? 'bg-white border-[#E2DDD5] hover:border-[#121212] shadow-sm hover:shadow-card-lift'
                  : 'bg-[#121212] border-white/10 hover:border-white/40'
              }`}
            >
              <div>
                {/* Card Top: Number + Icon */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#E2DDD5]/60 dark:border-white/10">
                  <span className="font-mono text-sm sm:text-base font-bold tracking-widest text-[#FF0054]">
                    {service.number} —
                  </span>

                  <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isLight ? 'bg-[#F7F6F2] border-[#E2DDD5]' : 'bg-[#1A1A1A] border-white/15'
                    }`}
                  >
                    {iconMap[service.iconName] || <Sparkles className="w-5 h-5 text-[#AAFF00]" />}
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="font-heading font-extrabold text-lg sm:text-xl uppercase tracking-tight mb-3 group-hover:text-[#FF0054] transition-colors">
                  {service.title}
                </h3>

                {/* Service Short Description */}
                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    isLight ? 'text-[#5E5A53]' : 'text-neutral-400'
                  }`}
                >
                  {service.shortDescription}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-6 mt-6 border-t border-[#E2DDD5]/60 dark:border-white/10 flex items-center justify-between text-xs font-mono">
                <span className={`text-[11px] uppercase tracking-wider ${isLight ? 'text-[#7D766D]' : 'text-neutral-500'}`}>
                  {service.turnaroundTime}
                </span>

                <span className="flex items-center gap-1 font-bold uppercase tracking-wider text-[#121212] dark:text-[#AAFF00] group-hover:translate-x-1 transition-transform">
                  <span>DISCUSS BRIEF</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
