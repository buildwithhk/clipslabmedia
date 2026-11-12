import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Video, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';
import { parseVideoUrl, getEffectiveThumbnail } from '../utils/videoUtils';

interface ShowreelProps {
  onOpenFullScreen?: (videoUrl: string, title: string) => void;
}

export const Showreel: React.FC<ShowreelProps> = ({ onOpenFullScreen }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { showreelVideoUrl, showreelThumbnail } = usePortfolio();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const parsed = parseVideoUrl(showreelVideoUrl, isPlaying);
  const posterImage = getEffectiveThumbnail(showreelVideoUrl, showreelThumbnail);

  const handleStartPlay = () => {
    setIsPlaying(true);
    if (!parsed.isEmbed && videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        });
    }
  };

  const handleStopPlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlaying(false);
    if (!parsed.isEmbed && videoRef.current) {
      videoRef.current.pause();
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullScreen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        containerRef.current.requestFullscreen().catch(() => {});
      }
    } else if (onOpenFullScreen) {
      onOpenFullScreen(showreelVideoUrl, 'ClipsLab Media — Visuals That Speak');
    }
  };

  return (
    <section
      id="showreel-section"
      className={`py-10 sm:py-14 lg:py-16 border-b transition-colors duration-200 relative ${
        isLight ? 'bg-[#EFECE6] border-[#E2DDD5] text-[#121212]' : 'bg-[#0A0A0A] border-white/10 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-6">
          <div>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-bold mb-3 sm:mb-4 border ${
                isLight
                  ? 'bg-[#FFFFFF] border-[#E2DDD5] text-[#121212]'
                  : 'bg-[#161616] border-white/10 text-[#AAFF00]'
              }`}
            >
              <span>FEATURED SHOWREEL // 2026</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] uppercase">
              VISUALS THAT SPEAK<span className="text-[#FF0054]">.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p
              className={`max-w-md text-xs sm:text-sm md:text-base leading-relaxed ${
                isLight ? 'text-[#5E5A53]' : 'text-neutral-400'
              }`}
            >
              A selection of creative experiments, cinematic films and brand-focused visual storytelling.
            </p>
          </div>
        </div>

        {/* Video Player Container with Rich Atmospheric Drop Shadow & In/Out Animations */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6, transition: { duration: 0.35, ease: 'easeOut' } }}
          className="relative max-w-2xl lg:max-w-[720px] mx-auto group"
        >
          {/* Ambient Layered Drop Shadow Behind Video */}
          <div
            className={`absolute -inset-3 sm:-inset-4 rounded-3xl blur-2xl -z-10 transition-all duration-700 pointer-events-none ${
              isLight
                ? 'bg-black/20 opacity-70 group-hover:opacity-100 group-hover:blur-3xl group-hover:bg-black/30'
                : 'bg-black/90 opacity-90 group-hover:opacity-100 group-hover:blur-3xl group-hover:bg-[#FF0054]/20'
            }`}
          />

          <div
            ref={containerRef}
            className={`relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 border ${
              isLight
                ? 'border-[#E2DDD5] bg-[#FFFFFF] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.22),0_12px_24px_-8px_rgba(0,0,0,0.12)] group-hover:shadow-[0_35px_80px_-15px_rgba(0,0,0,0.3),0_16px_32px_-8px_rgba(0,0,0,0.16)]'
                : 'border-white/15 bg-[#121212] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85),0_0_40px_rgba(255,255,255,0.03)] group-hover:border-white/30'
            }`}
          >
            <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                {parsed.isEmbed ? (
                  /* Embedded YouTube or Vimeo Player */
                  isPlaying ? (
                    <motion.div
                      key="embed-player"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="relative w-full h-full bg-black"
                    >
                      <iframe
                        src={parsed.embedUrl}
                        title="ClipsLab Media Showreel"
                        className="w-full h-full border-0 absolute inset-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                        allowFullScreen
                      />
                      {/* In-place Close Button to return to poster */}
                      <button
                        type="button"
                        onClick={handleStopPlay}
                        className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 hover:bg-[#FF0054] text-white border border-white/20 backdrop-blur-md transition-colors cursor-pointer text-xs font-mono font-bold shadow-xl"
                        title="Return to poster"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>CLOSE</span>
                      </button>
                    </motion.div>
                  ) : (
                    /* Poster View (Exact match to user's uploaded screenshot) */
                    <motion.div
                      key="poster-view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 1.03 }}
                      transition={{ duration: 0.4 }}
                      onClick={handleStartPlay}
                      className="relative w-full h-full cursor-pointer select-none"
                    >
                      <img
                        src={posterImage}
                        alt="ClipsLab Media Showreel"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Dark Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 group-hover:opacity-75 transition-opacity" />

                      {/* Center Play Button with In/Out Pulse & Scale Animation */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.button
                          type="button"
                          aria-label="Play showreel in place"
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.94 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer bg-white text-[#121212] hover:bg-[#FF0054] hover:text-white"
                        >
                          <span className="absolute -inset-1 rounded-full bg-white/40 animate-ping opacity-30 pointer-events-none" />
                          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5 relative z-10" />
                        </motion.button>
                      </div>

                      {/* In-Video Bottom Controls Bar */}
                      <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between text-white transition-opacity">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button
                            type="button"
                            onClick={handleStartPlay}
                            className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                            aria-label="Play"
                          >
                            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
                          </button>

                          <button
                            type="button"
                            onClick={toggleMute}
                            className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                            aria-label={isMuted ? 'Unmute' : 'Mute'}
                          >
                            {isMuted ? (
                              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            )}
                          </button>

                          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider hidden sm:inline-block text-white/90 font-medium">
                            CLIPSLAB // SHOWREEL 2026
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleFullScreen}
                            className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                            aria-label="Open Fullscreen"
                            title="Expand to Fullscreen"
                          >
                            <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline font-bold">FULLSCREEN</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                ) : showreelVideoUrl ? (
              /* Native video player with custom controls */
              <motion.div
                key="native-player"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-full"
              >
                <video
                  ref={videoRef}
                  src={showreelVideoUrl}
                  poster={posterImage}
                  preload="metadata"
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Play Overlay Button */}
                {!isPlaying && (
                  <div
                    onClick={handleStartPlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[2px] transition-opacity cursor-pointer group-hover:bg-black/25"
                  >
                    <button
                      type="button"
                      aria-label="Play showreel"
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-2xl cursor-pointer bg-white text-[#121212] hover:bg-[#FF0054] hover:text-white"
                    >
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5" />
                    </button>
                  </div>
                )}

                {/* In-Video Bottom Controls Bar */}
                <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-3.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center justify-between text-white transition-opacity">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={isPlaying ? () => handleStopPlay() : handleStartPlay}
                      className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      ) : (
                        <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      )}
                    </button>

                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider hidden sm:inline-block text-white/80">
                      CLIPSLAB // SHOWREEL 2026
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleFullScreen}
                      className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                      aria-label="Open Fullscreen"
                      title="Expand to Fullscreen Cinema Mode"
                    >
                      <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">FULLSCREEN</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="p-8 text-center space-y-3">
                <Video className="w-12 h-12 mx-auto text-neutral-500 animate-pulse" />
                <p className="font-heading font-bold uppercase text-white text-base">
                  No Showreel Video Uploaded Yet
                </p>
                <p className="text-xs font-mono text-neutral-400 max-w-sm mx-auto">
                  Add your custom YouTube video link in the Administrator Dashboard to play here.
                </p>
              </div>
            )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      </div>
    </section>
  );
};
