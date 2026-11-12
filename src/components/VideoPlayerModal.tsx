import React, { useEffect } from 'react';
import { X, ArrowLeft, Smartphone, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { UniversalVideoPlayer } from './UniversalVideoPlayer';

interface VideoPlayerModalProps {
  isOpen: boolean;
  videoUrl: string;
  title: string;
  format?: '16:9' | '9:16';
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  videoUrl,
  title,
  format = '16:9',
  onClose,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !videoUrl) return null;

  const isVertical = format === '9:16';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Pinned Floating "Go Back" Button for Instant Access */}
      <div className="fixed top-3 left-3 sm:top-5 sm:left-6 z-50 pointer-events-auto">
        <button
          onClick={onClose}
          type="button"
          className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-black/90 text-white hover:bg-[#FF0054] border border-white/25 shadow-2xl backdrop-blur-md transition-all text-xs font-mono uppercase tracking-wider font-bold cursor-pointer hover:scale-105"
          title="Return (Esc)"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>GO BACK</span>
        </button>
      </div>

      {/* Top Header Bar */}
      <div
        className={`w-full ${isVertical ? 'max-w-md' : 'max-w-5xl'} flex items-center justify-between pb-3 sm:pb-4 text-white`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 sm:gap-3 pr-2 ml-28 sm:ml-0 min-w-0">
          <span
            className={`w-2.5 h-2.5 rounded-full animate-pulse flex-shrink-0 ${
              isVertical ? 'bg-[#FF0054]' : isLight ? 'bg-[#FF0054]' : 'bg-[#AAFF00]'
            }`}
          />
          <div className="min-w-0">
            <h3 className="font-heading font-bold text-sm sm:text-lg truncate text-white">
              {title || 'ClipsLab Media Reel'}
            </h3>
            <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1 uppercase">
              {isVertical ? (
                <>
                  <Smartphone className="w-2.5 h-2.5 text-[#FF0054]" />
                  <span>9:16 Vertical Reel</span>
                </>
              ) : (
                <>
                  <Monitor className="w-2.5 h-2.5 text-[#AAFF00]" />
                  <span>16:9 Widescreen Cinema</span>
                </>
              )}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#FF0054] text-white transition-colors cursor-pointer text-xs font-mono uppercase font-bold flex-shrink-0"
          aria-label="Close video player"
        >
          <X className="w-4 h-4" />
          <span className="hidden sm:inline">CLOSE [ESC]</span>
        </button>
      </div>

      {/* Video Viewport Container: Phone frame for 9:16, Cinematic wide for 16:9 */}
      {isVertical ? (
        <div
          className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] bg-[#080808] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#222222] ring-1 ring-white/20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Notch indicator */}
          <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-black/80 to-transparent z-20 pointer-events-none flex items-center justify-between px-4 text-[9px] font-mono text-white/70">
            <span className="flex items-center gap-1 font-bold">
              <Smartphone className="w-2.5 h-2.5 text-[#FF0054]" />
              <span>9:16 REEL</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#AAFF00] animate-pulse" />
          </div>

          <UniversalVideoPlayer
            videoUrl={videoUrl}
            title={title}
            autoPlay={true}
            controls={true}
          />
        </div>
      ) : (
        <div
          className="relative w-full max-w-5xl aspect-[16/9] bg-[#080808] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/15"
          onClick={(e) => e.stopPropagation()}
        >
          <UniversalVideoPlayer
            videoUrl={videoUrl}
            title={title}
            autoPlay={true}
            controls={true}
          />
        </div>
      )}

      {/* Bottom Footer Bar */}
      <div
        className={`w-full ${isVertical ? 'max-w-md' : 'max-w-5xl'} pt-3 sm:pt-4 flex items-center justify-between text-[10px] sm:text-xs font-mono text-neutral-400`}
        onClick={(e) => e.stopPropagation()}
      >
        <span>CLIPSLAB MEDIA AI PRODUCTION SUITE</span>
        <button
          onClick={onClose}
          className="underline hover:text-white cursor-pointer"
        >
          ← Return to site
        </button>
      </div>
    </div>
  );
};
