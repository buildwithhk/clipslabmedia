import React, { useRef, useState, useEffect } from 'react';
import { parseVideoUrl } from '../utils/videoUtils';
import { AlertCircle, ExternalLink, RotateCcw, Play } from 'lucide-react';

interface UniversalVideoPlayerProps {
  videoUrl: string;
  title?: string;
  poster?: string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onError?: () => void;
}

export const UniversalVideoPlayer: React.FC<UniversalVideoPlayerProps> = ({
  videoUrl,
  title = 'ClipsLab Media Reel',
  poster,
  autoPlay = false,
  controls = true,
  loop = true,
  muted = false,
  className = 'w-full h-full',
  onPlay,
  onPause,
  onError,
}) => {
  const [hasError, setHasError] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(videoUrl);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setCurrentUrl(videoUrl);
    setHasError(false);
  }, [videoUrl]);

  const parsed = parseVideoUrl(currentUrl, autoPlay);

  // If it's YouTube or Vimeo, render an iframe player
  if (parsed.isEmbed && parsed.embedUrl) {
    return (
      <div className={`relative w-full h-full bg-black ${className}`}>
        <iframe
          src={parsed.embedUrl}
          title={title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  // If error occurred with native video
  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white space-y-3 bg-[#0d0d0d]">
        <AlertCircle className="w-8 h-8 text-[#FF0054]" />
        <p className="font-heading font-bold text-base sm:text-lg">
          Unable to Play Direct Video
        </p>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed">
          The video link <span className="font-mono text-neutral-300 break-all">{currentUrl}</span> could not be loaded as a direct video stream.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setHasError(false);
            }}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry Playback</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setCurrentUrl('/assets/sample-reel.mp4');
              setHasError(false);
            }}
            className="px-4 py-2 rounded-full bg-[#AAFF00] text-[#080808] hover:bg-[#B8FF1F] text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Load Default Studio Reel</span>
          </button>
        </div>
      </div>
    );
  }

  // HTML5 native video player for MP4, WebM, blob, local files
  return (
    <video
      ref={videoRef}
      src={currentUrl}
      poster={poster}
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline
      className={`${className} object-contain bg-black`}
      onPlay={onPlay}
      onPause={onPause}
      onError={() => {
        setHasError(true);
        if (onError) onError();
      }}
    />
  );
};
