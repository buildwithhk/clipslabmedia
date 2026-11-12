import React, { useEffect } from 'react';
import { X, ArrowLeft, ArrowUpRight, UserCheck, Monitor, Smartphone } from 'lucide-react';
import { ProjectItem } from '../types';
import { useTheme } from '../context/ThemeContext';
import { UniversalVideoPlayer } from './UniversalVideoPlayer';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onStartSimilarProject: (projectTitle: string) => void;
  onPlayFullVideo: (videoUrl: string, title: string, format?: '16:9' | '9:16') => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onStartSimilarProject,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentVideoUrl = project.fullVideoUrl || project.videoPreviewUrl;
  const isVertical = project.format === '9:16' || project.aspectRatio === '9:16' || project.aspectRatio === 'portrait';
  const formatLabel = isVertical ? '9:16 Vertical Reel' : '16:9 Widescreen Cinema';

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex flex-col items-center justify-start p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Pinned Floating "Go Back" Button for Instant Access */}
      <div className="fixed top-3 left-3 sm:top-5 sm:left-6 z-50 pointer-events-auto">
        <button
          onClick={onClose}
          type="button"
          className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-black/90 text-white hover:bg-[#FF0054] border border-white/25 shadow-2xl backdrop-blur-md transition-all text-xs font-mono uppercase tracking-wider font-bold cursor-pointer hover:scale-105"
          title="Return to Portfolio (Esc)"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>GO BACK</span>
        </button>
      </div>

      {/* Main Modal Card Container */}
      <div
        className={`relative w-full max-w-4xl rounded-3xl shadow-2xl border flex flex-col my-auto mt-14 sm:mt-12 mb-8 transition-colors overflow-hidden ${
          isLight
            ? 'bg-[#F7F6F2] text-[#121212] border-[#E2DDD5]'
            : 'bg-[#121212] text-white border-white/15'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Header Bar - Never Scrolls Away */}
        <div
          className={`sticky top-0 z-30 px-4 sm:px-6 py-3.5 border-b backdrop-blur-md flex items-center justify-between transition-colors ${
            isLight
              ? 'bg-[#F7F6F2]/95 border-[#E2DDD5]'
              : 'bg-[#121212]/95 border-white/10'
          }`}
        >
          {/* Back Button inside header */}
          <button
            onClick={onClose}
            type="button"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer ${
              isLight
                ? 'bg-white border-[#E2DDD5] text-[#121212] hover:bg-[#121212] hover:text-white'
                : 'bg-white/10 border-white/15 text-white hover:bg-[#AAFF00] hover:text-black'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>BACK TO WORK</span>
          </button>

          {/* Project Category & Format Tag */}
          <div className="hidden sm:flex items-center gap-2">
            {isVertical ? (
              <span className="px-2 py-0.5 rounded-full bg-[#FF0054] text-white text-[10px] font-mono font-bold uppercase flex items-center gap-1 shadow-xs">
                <Smartphone className="w-3 h-3" />
                <span>9:16 VERTICAL</span>
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-black/60 text-white dark:bg-white/15 text-[10px] font-mono font-bold uppercase flex items-center gap-1">
                <Monitor className="w-3 h-3" />
                <span>16:9 CINEMA</span>
              </span>
            )}
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#5E5A53] dark:text-neutral-400">
              {project.category} • {project.year || '2026'}
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            type="button"
            className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-transparent hover:border-[#E2DDD5] dark:hover:border-white/15 hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors cursor-pointer text-xs font-mono uppercase"
            aria-label="Close modal"
          >
            <span className="hidden sm:inline">CLOSE</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Container (Adaptive: Smartphone container for 9:16, Widescreen for 16:9) */}
        {isVertical ? (
          <div className="w-full flex justify-center py-6 px-4 bg-gradient-to-b from-black/95 to-black/85">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#222222] ring-1 ring-white/20 bg-black">
              {/* Mobile device notch indicator */}
              <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-black/80 to-transparent z-20 pointer-events-none flex items-center justify-between px-4 text-[9px] font-mono text-white/70">
                <span className="flex items-center gap-1 font-bold">
                  <Smartphone className="w-2.5 h-2.5 text-[#FF0054]" />
                  <span>9:16 MOBILE FORMAT</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#AAFF00] animate-pulse" />
              </div>

              <UniversalVideoPlayer
                videoUrl={currentVideoUrl}
                title={project.title}
                poster={project.thumbnail}
                autoPlay={true}
                controls={true}
              />
            </div>
          </div>
        ) : (
          <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
            <UniversalVideoPlayer
              videoUrl={currentVideoUrl}
              title={project.title}
              poster={project.thumbnail}
              autoPlay={true}
              controls={true}
            />
          </div>
        )}

        {/* Project Details Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Title & Short Description */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF0054] font-bold mb-1">
              <span>{project.category}</span>
              <span>//</span>
              <span>{formatLabel}</span>
              <span>//</span>
              <span>{project.year || '2026'}</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight leading-tight">
              {project.title}
            </h2>
            <p className={`mt-2 text-sm sm:text-base leading-relaxed ${isLight ? 'text-[#3E3A33]' : 'text-neutral-300'}`}>
              {project.shortDescription}
            </p>
          </div>

          {/* Founder Role Callout */}
          <div
            className={`p-4 rounded-2xl border flex items-start gap-3 ${
              isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#181818] border-white/10'
            }`}
          >
            <UserCheck className="w-5 h-5 text-[#FF0054] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#5E5A53] dark:text-neutral-400">
                Founder & Director Role
              </p>
              <p className="font-heading font-bold text-sm sm:text-base">
                {project.role || 'Founder, Creative Director & AI Filmmaker — Harsh Kumar'}
              </p>
            </div>
          </div>

          {/* Creative Concept & Production Approach */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div
              className={`p-5 rounded-2xl border ${
                isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#181818] border-white/10'
              }`}
            >
              <p className="text-xs font-mono uppercase font-bold tracking-wider mb-2 text-[#FF0054]">
                01 // Creative Concept
              </p>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-[#5E5A53]' : 'text-neutral-300'}`}>
                {project.creativeConcept || project.shortDescription}
              </p>
            </div>

            <div
              className={`p-5 rounded-2xl border ${
                isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#181818] border-white/10'
              }`}
            >
              <p className="text-xs font-mono uppercase font-bold tracking-wider mb-2 text-[#AAFF00] dark:text-[#AAFF00]">
                02 // Production Approach
              </p>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-[#5E5A53]' : 'text-neutral-300'}`}>
                {project.productionApproach || 'Integrated neural generation pipeline with custom prompt choreography, physical physics simulation, and Adobe Premiere Pro pacing.'}
              </p>
            </div>
          </div>

          {/* Tools and Models Used */}
          <div>
            <p className="text-xs font-mono uppercase font-bold tracking-wider mb-3 text-[#5E5A53] dark:text-neutral-400">
              Tools & Generative Models Used
            </p>
            <div className="flex flex-wrap gap-2">
              {project.toolsUsed && project.toolsUsed.map((tool, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-medium border ${
                    isLight
                      ? 'bg-white border-[#E2DDD5] text-[#121212]'
                      : 'bg-[#181818] border-white/10 text-neutral-200'
                  }`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons: Go Back & Collaborate */}
          <div className="pt-6 border-t border-[#E2DDD5] dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onClose}
              type="button"
              className={`w-full sm:w-auto px-5 py-3 rounded-full text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                isLight
                  ? 'bg-white border-[#E2DDD5] text-[#121212] hover:bg-[#EFECE6]'
                  : 'bg-[#181818] border-white/15 text-white hover:bg-white/10'
              }`}
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Back to All Projects</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onStartSimilarProject(project.title);
              }}
              type="button"
              className={`w-full sm:w-auto px-6 py-3 rounded-full text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                isLight
                  ? 'bg-[#121212] text-white hover:bg-[#262626]'
                  : 'bg-[#AAFF00] text-[#080808] hover:bg-[#B8FF1F]'
              }`}
            >
              <span>Collaborate With Harsh</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
