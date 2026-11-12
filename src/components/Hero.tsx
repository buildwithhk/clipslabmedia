import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Play, Sparkles, Film, Smartphone, Compass, Megaphone, Box, TrendingUp, Lightbulb, Scissors, Layers } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
  onPlayShowreel?: () => void;
}

const ROTATING_WORDS = ['cinematic', 'visual', 'impossible', 'breathtaking', 'futuristic'];

export const Hero: React.FC<HeroProps> = ({
  onStartProject,
  onExploreWork,
  onPlayShowreel,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Rotating words dynamic sliding animation
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={`relative overflow-hidden pt-10 pb-10 sm:pt-14 sm:pb-14 lg:pt-16 lg:pb-16 border-b transition-colors duration-200 ${
        isLight
          ? 'bg-[#F7F6F2] text-[#121212] border-[#E2DDD5]'
          : 'bg-[#080808] text-white border-white/10'
      }`}
    >
      {/* Subtle Studio Grid Background */}
      <div className="absolute inset-0 bg-studio-grid opacity-60 pointer-events-none" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-radial-ambient pointer-events-none blur-3xl opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Header */}
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 text-center flex flex-col items-center">
          
          {/* Small Studio Tag */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border shadow-xs transition-colors max-w-full bg-white dark:bg-[#141414] border-[#E2DDD5] dark:border-white/10 mx-auto"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF0054] animate-pulse flex-shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase font-bold text-[#121212] dark:text-neutral-200">
              AI FILMMAKING & CREATIVE PRODUCTION STUDIO | INDIA
            </span>
          </motion.div>

          {/* Main Headline & Supporting Headline with Sliding In/Out Text in Middle Position */}
          <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] uppercase text-center flex flex-col items-center justify-center"
            >
              <span className="block">Turning Ideas Into</span>

              {/* Middle Position: Pink rotating script word */}
              <span className="block relative overflow-hidden my-1 sm:my-2.5 h-[1.2em] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING_WORDS[wordIndex]}
                    initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
                    animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: '-100%', opacity: 0, filter: 'blur(8px)' }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block font-editorial-serif italic font-normal lowercase tracking-normal text-[#FF0054] px-2 sm:px-4"
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>

              <span className="block">
                Experiences<span className="text-[#FF0054]">.</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs sm:text-sm md:text-base tracking-wider uppercase font-semibold text-[#5E5A53] dark:text-neutral-400 text-center"
            >
              — Where Creative Direction Meets AI Filmmaking —
            </motion.p>
          </div>

          {/* Studio What We Do Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-3xl mx-auto text-center text-balance ${
              isLight ? 'text-[#3E3A33]' : 'text-neutral-300'
            }`}
            style={{ textWrap: 'balance' }}
          >
            ClipsLab Media is an AI-powered creative studio producing cinematic brand films, product videos, advertisements and engaging social content.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onExploreWork}
              className={`w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer transition-shadow duration-300 shadow-md ${
                isLight
                  ? 'bg-[#121212] text-white hover:bg-[#262626]'
                  : 'bg-[#AAFF00] text-[#080808] hover:bg-[#B8FF1F] shadow-glow-lime'
              }`}
            >
              <span>EXPLORE OUR BEST AI ADS</span>
              <ArrowDown className="w-4 h-4 stroke-[2.5]" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartProject}
              className={`w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer transition-shadow duration-300 border ${
                isLight
                  ? 'bg-white text-[#121212] border-[#E2DDD5] hover:border-[#121212] hover:bg-[#F7F6F2] shadow-xs'
                  : 'bg-[#141414] text-white border-white/20 hover:border-white hover:bg-white/5'
              }`}
            >
              <span>LET'S COLLABORATE</span>
              <span className="w-2 h-2 rounded-full bg-[#FF0054] animate-pulse" />
            </motion.button>
          </motion.div>

        </div>

        {/* OUR CREATIVE SERVICES // FROM IDEA TO CINEMATIC CONTENT */}
        <div className="pt-10 sm:pt-12 mt-8 sm:mt-10 border-t border-[#E2DDD5] dark:border-white/10">
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-bold bg-white dark:bg-[#141414] border-[#E2DDD5] dark:border-white/10 mb-3 sm:mb-4 shadow-2xs">
              <span>OUR CREATIVE SERVICES</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] uppercase">
                From Idea to<br />
                <span className="font-editorial-serif italic font-normal lowercase tracking-normal text-[#FF0054]">
                  Cinematic Content
                </span>
                <span className="text-[#FF0054]">.</span>
              </h2>

              <div className="flex items-start gap-3 max-w-sm md:pt-1.5">
                <span className="text-[#FF0054] text-lg font-bold leading-none mt-0.5">▷</span>
                <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isLight ? 'text-[#5E5A53]' : 'text-neutral-400'}`}>
                  An end-to-end creative studio for AI film, brand advertising and social content.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            
            {/* Card 1: Brand Films */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-3xl border transition-all duration-300 hover:scale-[1.02] flex flex-col overflow-hidden group ${
                isLight
                  ? 'bg-white border-[#FF0054]/30 shadow-md ring-1 ring-[#FF0054]/20 hover:shadow-[0_12px_36px_rgba(255,0,84,0.18)]'
                  : 'bg-[#121212] border-[#FF0054]/40 shadow-lg ring-1 ring-[#FF0054]/30 hover:border-[#FF0054]'
              }`}
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                <img
                  src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1200&auto=format&fit=crop"
                  alt="Brand Films"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Subtle Brand Watermark matching mockup */}
                <div className="absolute top-3 right-3 text-right">
                  <span className="text-[10px] font-heading font-extrabold tracking-widest text-white/90 drop-shadow-md uppercase block">
                    MAAVE®
                  </span>
                  <span className="text-[7px] font-mono tracking-widest text-white/70 uppercase block">
                    SCENTED CANDLES
                  </span>
                </div>

                {/* Floating Icon Badge overlapping bottom edge */}
                <div className="absolute -bottom-3.5 left-4 z-10 w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF0054] to-[#FF3366] text-white flex items-center justify-center shadow-lg shadow-[#FF0054]/40 border-2 border-white dark:border-[#121212]">
                  <Film className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 pt-6 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <h3 className="font-heading font-extrabold text-base uppercase tracking-tight">
                    01 — Brand Films
                  </h3>
                  <p className={`text-xs mt-2 leading-relaxed font-sans ${isLight ? 'text-[#5E5A53]' : 'text-neutral-400'}`}>
                    Cinematic brand videos and advertisements that tell your story and make your brand stand out.
                  </p>
                </div>

                {/* Bottom Filter Pills */}
                <div className="pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border transition-colors ${
                    isLight ? 'bg-[#FAF9F6] border-[#E2DDD5] text-[#3E3A33]' : 'bg-[#181818] border-white/10 text-neutral-300'
                  }`}>
                    <Megaphone className="w-3 h-3 text-[#FF0054]" />
                    <span>Brand Ads</span>
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border transition-colors ${
                    isLight ? 'bg-[#FAF9F6] border-[#E2DDD5] text-[#3E3A33]' : 'bg-[#181818] border-white/10 text-neutral-300'
                  }`}>
                    <Play className="w-3 h-3 fill-current text-[#FF0054]" />
                    <span>Campaign Films</span>
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Product Films */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-3xl border transition-all duration-300 hover:scale-[1.02] flex flex-col overflow-hidden group ${
                isLight
                  ? 'bg-white border-[#E2DDD5] shadow-xs hover:border-[#121212] hover:shadow-md'
                  : 'bg-[#121212] border-white/10 hover:border-white/30'
              }`}
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                <img
                  src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200&auto=format&fit=crop"
                  alt="Product Films"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Floating Icon Badge */}
                <div className={`absolute -bottom-3.5 left-4 z-10 w-10 h-10 rounded-2xl flex items-center justify-center shadow-md border-2 ${
                  isLight ? 'bg-white text-[#FF0054] border-white' : 'bg-[#181818] text-[#FF0054] border-[#121212]'
                }`}>
                  <Box className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 pt-6 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <h3 className="font-heading font-extrabold text-base uppercase tracking-tight">
                    02 — Product Films
                  </h3>
                  <p className={`text-xs mt-2 leading-relaxed font-sans ${isLight ? 'text-[#5E5A53]' : 'text-neutral-400'}`}>
                    Stunning product videos that highlight details, showcase features and drive attention.
                  </p>
                </div>

                {/* Bottom Filter Pills */}
                <div className="pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border transition-colors ${
                    isLight ? 'bg-[#FAF9F6] border-[#E2DDD5] text-[#3E3A33]' : 'bg-[#181818] border-white/10 text-neutral-300'
                  }`}>
                    <Box className="w-3 h-3 text-[#FF0054]" />
                    <span>Product Videos</span>
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border transition-colors ${
                    isLight ? 'bg-[#FAF9F6] border-[#E2DDD5] text-[#3E3A33]' : 'bg-[#181818] border-white/10 text-neutral-300'
                  }`}>
                    <Sparkles className="w-3 h-3 text-[#FF0054]" />
                    <span>Launch Films</span>
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Social Content */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-3xl border transition-all duration-300 hover:scale-[1.02] flex flex-col overflow-hidden group ${
                isLight
                  ? 'bg-white border-[#E2DDD5] shadow-xs hover:border-[#121212] hover:shadow-md'
                  : 'bg-[#121212] border-white/10 hover:border-white/30'
              }`}
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                <img
                  src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1200&auto=format&fit=crop"
                  alt="Social Content"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Floating Icon Badge */}
                <div className={`absolute -bottom-3.5 left-4 z-10 w-10 h-10 rounded-2xl flex items-center justify-center shadow-md border-2 ${
                  isLight ? 'bg-white text-[#FF0054] border-white' : 'bg-[#181818] text-[#FF0054] border-[#121212]'
                }`}>
                  <Play className="w-4 h-4 fill-current ml-0.5 text-[#FF0054]" />
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 pt-6 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <h3 className="font-heading font-extrabold text-base uppercase tracking-tight">
                    03 — Social Content
                  </h3>
                  <p className={`text-xs mt-2 leading-relaxed font-sans ${isLight ? 'text-[#5E5A53]' : 'text-neutral-400'}`}>
                    Engaging Reels, Shorts and AI-powered videos designed to capture attention and grow brands.
                  </p>
                </div>

                {/* Bottom Filter Pills */}
                <div className="pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border transition-colors ${
                    isLight ? 'bg-[#FAF9F6] border-[#E2DDD5] text-[#3E3A33]' : 'bg-[#181818] border-white/10 text-neutral-300'
                  }`}>
                    <Smartphone className="w-3 h-3 text-[#FF0054]" />
                    <span>Reels & Shorts</span>
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border transition-colors ${
                    isLight ? 'bg-[#FAF9F6] border-[#E2DDD5] text-[#3E3A33]' : 'bg-[#181818] border-white/10 text-neutral-300'
                  }`}>
                    <TrendingUp className="w-3 h-3 text-[#FF0054]" />
                    <span>Social Campaigns</span>
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 4: Creative Direction */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-3xl border transition-all duration-300 hover:scale-[1.02] flex flex-col overflow-hidden group ${
                isLight
                  ? 'bg-white border-[#E2DDD5] shadow-xs hover:border-[#121212] hover:shadow-md'
                  : 'bg-[#121212] border-white/10 hover:border-white/30'
              }`}
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                <img
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop"
                  alt="Creative Direction"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Floating Icon Badge */}
                <div className={`absolute -bottom-3.5 left-4 z-10 w-10 h-10 rounded-2xl flex items-center justify-center shadow-md border-2 ${
                  isLight ? 'bg-white text-[#FF0054] border-white' : 'bg-[#181818] text-[#FF0054] border-[#121212]'
                }`}>
                  <Layers className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 pt-6 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <h3 className="font-heading font-extrabold text-base uppercase tracking-tight">
                    04 — Creative Direction
                  </h3>
                  <p className={`text-xs mt-2 leading-relaxed font-sans ${isLight ? 'text-[#5E5A53]' : 'text-neutral-400'}`}>
                    From concept to final edit, we handle storytelling, visual planning, AI production and professional editing.
                  </p>
                </div>

                {/* Bottom Filter Pills */}
                <div className="pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border transition-colors ${
                    isLight ? 'bg-[#FAF9F6] border-[#E2DDD5] text-[#3E3A33]' : 'bg-[#181818] border-white/10 text-neutral-300'
                  }`}>
                    <Lightbulb className="w-3 h-3 text-[#FF0054]" />
                    <span>Concept & Story</span>
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border transition-colors ${
                    isLight ? 'bg-[#FAF9F6] border-[#E2DDD5] text-[#3E3A33]' : 'bg-[#181818] border-white/10 text-neutral-300'
                  }`}>
                    <Scissors className="w-3 h-3 text-[#FF0054]" />
                    <span>Editing & Post</span>
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};
