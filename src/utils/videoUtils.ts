export type VideoType = 'youtube' | 'vimeo' | 'native';

export interface ParsedVideoInfo {
  type: VideoType;
  isEmbed: boolean;
  embedUrl: string;
  originalUrl: string;
  videoId?: string;
  thumbnailUrl?: string;
}

/**
 * Parses any video URL (YouTube, Vimeo, or direct file like MP4/WebM)
 * and returns the appropriate embed or stream format.
 */
export function parseVideoUrl(url: string, autoPlay: boolean = true): ParsedVideoInfo {
  if (!url || typeof url !== 'string') {
    return {
      type: 'native',
      isEmbed: false,
      embedUrl: '',
      originalUrl: '',
    };
  }

  const trimmed = url.trim();

  // 1. YouTube Matcher
  // Matches:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://www.youtube.com/shorts/VIDEO_ID
  // - https://www.youtube.com/embed/VIDEO_ID
  // - https://m.youtube.com/watch?v=VIDEO_ID
  // - https://youtube.com/live/VIDEO_ID
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const ytMatch = trimmed.match(youtubeRegex);
  const isRawId = /^[a-zA-Z0-9_-]{11}$/.test(trimmed);

  if (ytMatch || isRawId) {
    const videoId = ytMatch ? ytMatch[1] : trimmed;
    const playParam = autoPlay ? 'autoplay=1&' : '';
    const embedUrl = `https://www.youtube.com/embed/${videoId}?${playParam}rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
    return {
      type: 'youtube',
      isEmbed: true,
      embedUrl,
      originalUrl: trimmed,
      videoId,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    };
  }

  // 2. Vimeo Matcher
  // Matches:
  // - https://vimeo.com/123456789
  // - https://player.vimeo.com/video/123456789
  const vimeoRegex = /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)|player\.vimeo\.com\/video\/(\d+))/i;
  const vimeoMatch = trimmed.match(vimeoRegex);
  const vimeoId = vimeoMatch?.[3] || vimeoMatch?.[4];

  if (vimeoId) {
    const playParam = autoPlay ? 'autoplay=1&' : '';
    const embedUrl = `https://player.vimeo.com/video/${vimeoId}?${playParam}title=0&byline=0&portrait=0`;
    return {
      type: 'vimeo',
      isEmbed: true,
      embedUrl,
      originalUrl: trimmed,
      videoId: vimeoId,
    };
  }

  // 3. Direct Native Video File (MP4, WebM, blob, local asset, etc.)
  return {
    type: 'native',
    isEmbed: false,
    embedUrl: trimmed,
    originalUrl: trimmed,
  };
}

/**
 * Resolves the effective thumbnail for any video.
 * Rule:
 * 1. If an image was manually uploaded from the website (Base64 data:image URL), keep it.
 * 2. If the video is a YouTube video (including Shorts), automatically pick the YouTube thumbnail
 *    (hqdefault.jpg or 0.jpg which represents the first frame or custom uploaded thumbnail on YouTube).
 * 3. Otherwise return the provided thumbnail or fallback placeholder.
 */
export function getEffectiveThumbnail(
  videoUrl?: string,
  thumbnail?: string
): string {
  // 1. Manually uploaded image from website's file upload option
  if (thumbnail && thumbnail.startsWith('data:image')) {
    return thumbnail;
  }

  // 2. YouTube Video (watch, shorts, embed, youtu.be, live)
  if (videoUrl) {
    const parsed = parseVideoUrl(videoUrl);
    if (parsed.type === 'youtube' && parsed.videoId) {
      return `https://img.youtube.com/vi/${parsed.videoId}/hqdefault.jpg`;
    }
  }

  // 3. Fallback to existing thumbnail if valid
  if (thumbnail && thumbnail.trim()) {
    return thumbnail.trim();
  }

  return 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1400&auto=format&fit=crop';
}
