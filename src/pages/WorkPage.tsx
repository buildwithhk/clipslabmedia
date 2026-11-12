import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectItem, FormatFilter } from '../types';
import { Monitor, Smartphone } from 'lucide-react';

interface WorkPageProps {
  onSelectProject: (project: ProjectItem) => void;
  onPlayVideo: (videoUrl: string, title: string, format?: '16:9' | '9:16') => void;
  onStartProject: () => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({
  onSelectProject,
  onPlayVideo,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { projects } = usePortfolio();

  const [selectedFormat, setSelectedFormat] = useState<FormatFilter>('9:16');

  // Compute format counts
  const count16_9 = projects.filter(
    (p) => (p.format || (p.aspectRatio === '9:16' || p.aspectRatio === 'portrait' ? '9:16' : '16:9')) === '16:9'
  ).length;
  const count9_16 = projects.filter(
    (p) => (p.format || (p.aspectRatio === '9:16' || p.aspectRatio === 'portrait' ? '9:16' : '16:9')) === '9:16'
  ).length;

  // Filter projects by format
  const filteredProjects = projects
    .filter((p) => {
      const itemFormat = p.format || (p.aspectRatio === '9:16' || p.aspectRatio === 'portrait' ? '9:16' : '16:9');
      return selectedFormat === 'all' || itemFormat === selectedFormat;
    })
    .sort((a, b) => {
      if (selectedFormat === 'all') {
        const formatA = a.format || (a.aspectRatio === '9:16' || a.aspectRatio === 'portrait' ? '9:16' : '16:9');
        const formatB = b.format || (b.aspectRatio === '9:16' || b.aspectRatio === 'portrait' ? '9:16' : '16:9');
        if (formatA === '9:16' && formatB !== '9:16') return -1;
        if (formatA !== '9:16' && formatB === '9:16') return 1;
      }
      return 0;
    });

  return (
    <div
      className={`w-full transition-colors duration-200 pt-8 sm:pt-12 pb-14 sm:pb-16 ${
        isLight ? 'bg-[#F7F6F2] text-[#121212]' : 'bg-[#080808] text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-6">
          <div className="max-w-3xl">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold mb-3 sm:mb-4 border ${
                isLight
                  ? 'bg-white border-[#E2DDD5] text-[#121212]'
                  : 'bg-[#161616] border-white/10 text-[#AAFF00]'
              }`}
            >
              <span>SELECTED WORK // ARCHIVE</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] uppercase mb-4 flex flex-col items-start">
              <span>VISUAL STORIES &</span>
              <span className="font-editorial-serif italic font-normal lowercase tracking-normal text-[#FF0054] my-0.5 sm:my-1">
                cinematic
              </span>
              <span>
                Films<span className="text-[#FF0054]">.</span>
              </span>
            </h1>

            <p
              className={`text-sm sm:text-base md:text-lg leading-relaxed ${
                isLight ? 'text-[#5E5A53]' : 'text-neutral-400'
              }`}
            >
              Exploring the possibilities of visual storytelling through creativity, technology and imagination.
            </p>
          </div>
        </div>

        {/* PRIMARY FORMAT SWITCHER TABS (9:16 Vertical / 16:9 Cinema) */}
        <div className="relative mb-8 sm:mb-10 p-1.5 rounded-2xl border flex flex-wrap items-center gap-2 max-w-fit shadow-xs transition-colors backdrop-blur-md">
          {/* TAB 1: 9:16 VERTICAL REELS & SHORTS */}
          <button
            onClick={() => setSelectedFormat('9:16')}
            className={`relative px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase font-bold cursor-pointer flex items-center gap-2 z-10 transition-colors ${
              selectedFormat === '9:16'
                ? isLight
                  ? 'text-white'
                  : 'text-[#080808]'
                : isLight
                ? 'text-[#5E5A53] hover:text-[#121212]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {selectedFormat === '9:16' && (
              <motion.div
                layoutId="workTabActiveIndicator"
                className={`absolute inset-0 rounded-xl -z-10 ${
                  isLight ? 'bg-[#121212] shadow-md' : 'bg-[#AAFF00] shadow-glow-lime'
                }`}
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <Smartphone className="w-3.5 h-3.5" />
            <span>9:16 VERTICAL</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                selectedFormat === '9:16'
                  ? isLight
                    ? 'bg-white/20 text-white'
                    : 'bg-black/20 text-black'
                  : 'bg-black/10 dark:bg-white/10'
              }`}
            >
              {count9_16}
            </span>
          </button>

          {/* TAB 2: 16:9 WIDESCREEN CINEMA */}
          <button
            onClick={() => setSelectedFormat('16:9')}
            className={`relative px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase font-bold cursor-pointer flex items-center gap-2 z-10 transition-colors ${
              selectedFormat === '16:9'
                ? isLight
                  ? 'text-white'
                  : 'text-[#080808]'
                : isLight
                ? 'text-[#5E5A53] hover:text-[#121212]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {selectedFormat === '16:9' && (
              <motion.div
                layoutId="workTabActiveIndicator"
                className={`absolute inset-0 rounded-xl -z-10 ${
                  isLight ? 'bg-[#121212] shadow-md' : 'bg-[#AAFF00] shadow-glow-lime'
                }`}
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <Monitor className="w-3.5 h-3.5" />
            <span>16:9 WIDESCREEN</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                selectedFormat === '16:9'
                  ? isLight
                    ? 'bg-white/20 text-white'
                    : 'bg-black/20 text-black'
                  : 'bg-black/10 dark:bg-white/10'
              }`}
            >
              {count16_9}
            </span>
          </button>
        </div>

        {/* PROJECTS GRID (Adaptive Layout with smooth layout transitions) */}
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            className={
              selectedFormat === '9:16'
                ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
            }
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard
                    project={project}
                    onSelectProject={onSelectProject}
                    onPlayVideo={onPlayVideo}
                    isVerticalGrid={selectedFormat === '9:16'}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="p-12 text-center rounded-2xl border border-dashed border-[#E2DDD5] dark:border-white/15">
            <p className="font-heading font-bold uppercase text-base mb-2">No projects match the current filter</p>
            <p className="text-xs font-mono text-[#5E5A53] dark:text-neutral-400 mb-4">
              Try switching format tabs above.
            </p>
            <button
              onClick={() => setSelectedFormat('all')}
              className="px-4 py-2 rounded-full text-xs font-mono uppercase bg-[#121212] text-white dark:bg-[#AAFF00] dark:text-black cursor-pointer font-bold"
            >
              Show All Projects
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
