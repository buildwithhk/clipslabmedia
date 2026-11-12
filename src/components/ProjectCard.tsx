import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Monitor, Smartphone, X, Maximize } from 'lucide-react';
import { ProjectItem } from '../types';
import { useTheme } from '../context/ThemeContext';
import { UniversalVideoPlayer } from './UniversalVideoPlayer';
import { getEffectiveThumbnail } from '../utils/videoUtils';

interface ProjectCardProps {
  project: ProjectItem;
  onSelectProject?: (project: ProjectItem) => void;
  onPlayVideo: (videoUrl: string, title: string, format?: '16:9' | '9:16') => void;
  isVerticalGrid?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onPlayVideo,
  isVerticalGrid = false,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [isPlayingInline, setIsPlayingInline] = useState(false);

  const isVertical = project.format === '9:16' || project.aspectRatio === '9:16' || project.aspectRatio === 'portrait';
  const formatType: '16:9' | '9:16' = isVertical ? '9:16' : '16:9';
  const videoUrl = project.fullVideoUrl || project.videoPreviewUrl;
  const poster = getEffectiveThumbnail(videoUrl, project.thumbnail);

  // Dedicated vertical grid view (e.g. 9:16 tab active)
  if (isVerticalGrid) {
    return (
      <div
        className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-500 flex flex-col justify-between ${
          isLight
            ? 'bg-white border-[#E2DDD5] hover:border-[#121212] shadow-[0_12px_28px_-6px_rgba(0,0,0,0.1),0_6px_12px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_45px_-8px_rgba(0,0,0,0.18),0_10px_20px_-6px_rgba(0,0,0,0.1)] hover:-translate-y-1.5'
            : 'bg-[#141414] border-white/10 hover:border-white/30 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.7)] hover:shadow-[0_26px_55px_-6px_rgba(0,0,0,0.9)] hover:-translate-y-1.5'
        }`}
      >
        {/* Smartphone-proportioned Portrait Video Box (Strict 9:16) */}
        <div
          className="relative aspect-[9/16] w-full overflow-hidden bg-black cursor-pointer"
          onClick={() => {
            if (!isPlayingInline) setIsPlayingInline(true);
          }}
        >
          {isPlayingInline ? (
            <div className="relative w-full h-full bg-black" onClick={(e) => e.stopPropagation()}>
              <UniversalVideoPlayer
                videoUrl={videoUrl}
                title={project.title}
                poster={poster}
                autoPlay={true}
                controls={true}
              />

              {/* Close Button to return to card thumbnail */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlayingInline(false);
                }}
                className="absolute top-2.5 right-2.5 z-30 p-1.5 rounded-full bg-black/80 hover:bg-[#FF0054] text-white border border-white/20 backdrop-blur-md transition-colors cursor-pointer shadow-lg"
                title="Stop video and return to card"
                aria-label="Close inline video"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Expand to Fullscreen Modal Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayVideo(videoUrl, project.title, '9:16');
                }}
                className="absolute top-2.5 left-2.5 z-30 p-1.5 rounded-full bg-black/80 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-colors cursor-pointer shadow-lg"
                title="Open cinema mode"
                aria-label="Expand video"
              >
                <Maximize className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              <img
                src={poster}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 group-hover:opacity-60 transition-opacity" />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono tracking-wider uppercase z-10">
                <span className="px-2 py-0.5 rounded-full bg-[#FF0054] text-white font-bold flex items-center gap-1 shadow-md">
                  <Smartphone className="w-2.5 h-2.5" />
                  <span>9:16</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-black/70 text-white backdrop-blur-md border border-white/15 font-bold">
                  {project.year || '2026'}
                </span>
              </div>

              {/* Center Play Button (Plays video in this exact space!) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlayingInline(true);
                  }}
                  className="w-12 h-12 rounded-full bg-[#AAFF00] text-[#080808] flex items-center justify-center shadow-xl cursor-pointer hover:bg-white"
                  aria-label={`Play ${project.title} in place`}
                >
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </motion.button>
              </div>

              {/* Overlay Project Title for mobile-reel look */}
              <div className="absolute bottom-0 inset-x-0 p-4 z-10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#AAFF00] font-bold block mb-1">
                  {project.category}
                </span>
                <h3 className="font-heading font-extrabold text-sm sm:text-base tracking-tight uppercase leading-tight text-white group-hover:text-[#AAFF00] transition-colors line-clamp-2">
                  {project.title}
                </h3>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Standard Grid Card (Strictly 16:9 Widescreen aspect-video for perfect fit)
  return (
    <div
      className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-500 flex flex-col justify-between ${
        isLight
          ? 'bg-white border-[#E2DDD5] hover:border-[#121212] shadow-[0_12px_28px_-6px_rgba(0,0,0,0.1),0_6px_12px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_45px_-8px_rgba(0,0,0,0.18),0_10px_20px_-6px_rgba(0,0,0,0.1)] hover:-translate-y-1.5'
          : 'bg-[#141414] border-white/10 hover:border-white/30 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.7)] hover:shadow-[0_26px_55px_-6px_rgba(0,0,0,0.9)] hover:-translate-y-1.5'
      }`}
    >
      {/* Video Box: Strictly 16:9 aspect-video so YouTube videos fit perfectly */}
      <div
        className="relative aspect-video w-full overflow-hidden bg-black cursor-pointer"
        onClick={() => {
          if (!isPlayingInline) setIsPlayingInline(true);
        }}
      >
        {isPlayingInline ? (
          <div className="relative w-full h-full bg-black" onClick={(e) => e.stopPropagation()}>
            <UniversalVideoPlayer
              videoUrl={videoUrl}
              title={project.title}
              poster={poster}
              autoPlay={true}
              controls={true}
            />

            {/* Close Button to return to card thumbnail */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPlayingInline(false);
              }}
              className="absolute top-2.5 right-2.5 z-30 p-1.5 rounded-full bg-black/80 hover:bg-[#FF0054] text-white border border-white/20 backdrop-blur-md transition-colors cursor-pointer shadow-lg"
              title="Stop video and return to card"
              aria-label="Close inline video"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Expand to Fullscreen Modal Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPlayVideo(videoUrl, project.title, formatType);
              }}
              className="absolute top-2.5 left-2.5 z-30 p-1.5 rounded-full bg-black/80 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-colors cursor-pointer shadow-lg"
              title="Open cinema mode"
              aria-label="Expand video"
            >
              <Maximize className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <>
            <img
              src={poster}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

            {/* Top Badges: Category on Left, Format Indicator on Right */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono tracking-wider uppercase">
              <span className="px-2.5 py-1 rounded-full bg-black/70 text-white backdrop-blur-md border border-white/15">
                {project.category}
              </span>

              <div className="flex items-center gap-1.5">
                {isVertical ? (
                  <span className="px-2 py-0.5 rounded-full bg-[#FF0054] text-white flex items-center gap-1 font-bold shadow-sm">
                    <Smartphone className="w-2.5 h-2.5" />
                    <span>9:16</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-black/70 text-neutral-200 border border-white/20 backdrop-blur-md flex items-center gap-1 font-bold">
                    <Monitor className="w-2.5 h-2.5" />
                    <span>16:9</span>
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full bg-black/60 text-white/90 backdrop-blur-md font-bold">
                  {project.year || '2026'}
                </span>
              </div>
            </div>

            {/* Center Play Button (Plays video directly in this space!) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                type="button"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlayingInline(true);
                }}
                className="w-12 h-12 rounded-full bg-[#AAFF00] text-[#080808] flex items-center justify-center shadow-lg cursor-pointer hover:bg-white"
                aria-label={`Play ${project.title} in place`}
              >
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </motion.button>
            </div>
          </>
        )}
      </div>

      {/* Card Info Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div className="space-y-1.5">
          <h3 className="font-heading font-extrabold text-base sm:text-lg tracking-tight uppercase leading-snug group-hover:text-[#FF0054] transition-colors">
            {project.title}
          </h3>

          <p
            className={`text-xs leading-relaxed line-clamp-2 ${
              isLight ? 'text-[#5E5A53]' : 'text-neutral-400'
            }`}
          >
            {project.shortDescription}
          </p>
        </div>
      </div>
    </div>
  );
};
