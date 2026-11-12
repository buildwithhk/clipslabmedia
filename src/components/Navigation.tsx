import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sun, Moon, Video } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenProjectModal: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  onOpenProjectModal,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
    { id: 'about', label: 'About' },
  ];

  const handleLinkClick = (target: string) => {
    setMobileMenuOpen(false);

    // If on homepage and section anchor exists, smooth scroll to it
    if (currentPage === 'home') {
      const sectionMap: Record<string, string> = {
        work: 'work-section',
        about: 'about-section',
        services: 'services-section',
        contact: 'contact-section',
      };
      const sectionId = sectionMap[target];
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
    }

    onNavigate(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Sticky Minimal Navigation */}
      <header className="sticky top-0 z-40 w-full px-3 sm:px-6 lg:px-8 py-3 sm:py-4 transition-all duration-300">
        <div
          className={`max-w-6xl mx-auto rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between transition-all duration-300 ${
            isLight
              ? isScrolled
                ? 'bg-[#F7F6F2]/90 backdrop-blur-xl border border-[#E2DDD5] shadow-sm text-[#121212]'
                : 'bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E2DDD5] text-[#121212]'
              : isScrolled
              ? 'bg-[#0E0E0E]/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.7)] text-white'
              : 'bg-[#141414]/85 backdrop-blur-md border border-white/10 text-white'
          }`}
        >
          {/* Brand Logo / Wordmark */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 group text-left focus:outline-none flex-shrink-0 cursor-pointer"
            aria-label="ClipsLab Media Home"
          >
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs bg-black ${
                isLight ? 'border-[#E2DDD5]' : 'border-white/20'
              }`}
            >
              <img
                src="/assets/clips-lab-logo.png"
                alt="ClipsLab Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <span
                className={`font-heading font-extrabold text-sm sm:text-base tracking-tight uppercase block leading-none ${
                  isLight ? 'text-[#121212]' : 'text-white'
                }`}
              >
                CLIPSLAB<span className="text-[#FF0054]">.</span>MEDIA
              </span>
              <span
                className={`text-[9px] font-mono tracking-widest uppercase block ${
                  isLight ? 'text-[#6B665E]' : 'text-neutral-400'
                }`}
              >
                AI FILMMAKING STUDIO
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links (Increased by 30% from Home to About) */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-[15px] lg:text-base font-mono uppercase tracking-wider font-semibold">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 transition-colors cursor-pointer ${
                    isActive
                      ? isLight
                        ? 'text-[#121212] font-bold'
                        : 'text-[#AAFF00] font-bold'
                      : isLight
                      ? 'text-[#5E5A53] hover:text-[#121212]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navActiveUnderline"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                        isLight ? 'bg-[#121212]' : 'bg-[#AAFF00]'
                      }`}
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                isLight
                  ? 'bg-white border-[#E2DDD5] text-[#121212] hover:bg-[#EFECE6]'
                  : 'bg-[#181818] border-white/10 text-white hover:bg-white/10'
              }`}
              title={isLight ? 'Switch to Dark Cinematic Theme' : 'Switch to Textured Ivory Theme'}
              aria-label="Toggle theme"
            >
              {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-[#AAFF00]" />}
            </button>

            {/* Prominent CTA */}
            <button
              onClick={onOpenProjectModal}
              className={`hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                isLight
                  ? 'bg-[#121212] text-white hover:bg-[#262626] shadow-sm hover:scale-[1.02]'
                  : 'bg-[#AAFF00] text-[#080808] hover:bg-[#B8FF1F] shadow-glow-lime hover:scale-[1.02]'
              }`}
            >
              <span>LET'S CREATE SOMETHING</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-full border transition-colors cursor-pointer ${
                isLight
                  ? 'bg-white border-[#E2DDD5] text-[#121212]'
                  : 'bg-[#181818] border-white/10 text-white'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div
            className={`fixed top-0 right-0 bottom-0 w-[82%] max-w-sm p-6 shadow-2xl flex flex-col justify-between transition-colors z-50 ${
              isLight ? 'bg-[#F7F6F2] text-[#121212] border-l border-[#E2DDD5]' : 'bg-[#0E0E0E] text-white border-l border-white/10'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E2DDD5]/60 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden border flex items-center justify-center bg-black border-[#E2DDD5] dark:border-white/20">
                    <img src="/assets/clips-lab-logo.png" alt="Logo" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <span className="font-heading font-extrabold text-sm uppercase tracking-tight">
                    CLIPSLAB<span className="text-[#FF0054]">.</span>MEDIA
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full border border-[#E2DDD5] dark:border-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-6 flex flex-col space-y-4 text-base font-mono uppercase tracking-wider">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-left py-2 px-3 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                      currentPage === link.id
                        ? isLight
                          ? 'bg-[#EFECE6] font-bold text-[#121212]'
                          : 'bg-white/10 font-bold text-[#AAFF00]'
                        : isLight
                        ? 'text-[#5E5A53] hover:text-[#121212]'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E2DDD5]/60 dark:border-white/10 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProjectModal();
                }}
                className={`w-full py-3.5 px-4 rounded-full text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer ${
                  isLight
                    ? 'bg-[#121212] text-white'
                    : 'bg-[#AAFF00] text-[#080808]'
                }`}
              >
                <span>LET'S CREATE SOMETHING</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
              <p className="text-[10px] font-mono text-center uppercase tracking-widest text-[#6B665E] dark:text-neutral-500">
                HARSH KUMAR • FOUNDER & AI FILMMAKER
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
