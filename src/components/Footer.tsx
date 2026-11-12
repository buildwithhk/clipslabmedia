import React from 'react';
import { ArrowUpRight, Mail, Lock } from 'lucide-react';
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from './SocialIcons';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenProjectModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenProjectModal }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (target: string) => {
    const el = document.getElementById(`${target}-section`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      className={`pt-8 sm:pt-10 pb-8 sm:pb-10 border-t relative overflow-hidden transition-colors duration-200 ${
        isLight ? 'bg-[#F7F6F2] border-[#E2DDD5] text-[#121212]' : 'bg-[#080808] border-white/10 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-8 sm:pb-10 border-b border-[#E2DDD5] dark:border-white/10 items-start">
          
          {/* Col 1: Studio Wordmark & Philosophy (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border flex items-center justify-center bg-black ${
                  isLight ? 'border-[#E2DDD5]' : 'border-white/20'
                }`}
              >
                <img
                  src="/assets/clips-lab-logo.png"
                  alt="ClipsLab Media"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight uppercase block leading-none">
                  CLIPSLAB<span className="text-[#FF0054]">.</span>MEDIA
                </span>
                <span className={`text-[10px] font-mono tracking-widest uppercase block ${isLight ? 'text-[#6B665E]' : 'text-neutral-400'}`}>
                  HARSH KUMAR • AI FILMMAKING STUDIO
                </span>
              </div>
            </div>

            <p className={`text-sm sm:text-base leading-relaxed max-w-md ${isLight ? 'text-[#5E5A53]' : 'text-neutral-400'}`}>
              "Independent Creative Studio. Built around ideas, stories and visual experiences."
            </p>

            <div className="pt-1">
              <button
                onClick={onOpenProjectModal}
                className={`px-5 py-2.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
                  isLight
                    ? 'bg-[#121212] text-white hover:bg-[#262626]'
                    : 'bg-[#AAFF00] text-[#080808] hover:bg-[#B8FF1F]'
                }`}
              >
                <span>LET'S CREATE SOMETHING</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3 pt-1">
            <p className="font-heading font-bold text-xs uppercase tracking-widest text-[#FF0054]">
              Navigation
            </p>
            <ul className="space-y-2 text-xs font-mono uppercase tracking-wider">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`transition-colors cursor-pointer ${
                      isLight ? 'text-[#5E5A53] hover:text-[#121212]' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social Channels (3 cols) */}
          <div className="lg:col-span-3 space-y-3 pt-1">
            <p className="font-heading font-bold text-xs uppercase tracking-widest text-[#AAFF00] dark:text-[#AAFF00]">
              Social Channels
            </p>
            <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider">
              <li>
                <a
                  href="https://instagram.com/clipslab.media"
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-2 transition-colors ${
                    isLight ? 'text-[#5E5A53] hover:text-[#FF0054]' : 'text-neutral-400 hover:text-[#FF0054]'
                  }`}
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/clipslabmedia"
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-2 transition-colors ${
                    isLight ? 'text-[#5E5A53] hover:text-[#638AFF]' : 'text-neutral-400 hover:text-[#638AFF]'
                  }`}
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@harsh.aifmve?si=9m6ZnokUic9S8U4f"
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-2 transition-colors ${
                    isLight ? 'text-[#5E5A53] hover:text-red-500' : 'text-neutral-400 hover:text-red-500'
                  }`}
                >
                  <YoutubeIcon className="w-3.5 h-3.5" />
                  <span>YouTube</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-6 sm:pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p className={isLight ? 'text-[#7D766D]' : 'text-neutral-500'}>
            © 2026 ClipsLab Media. All Rights Reserved.
          </p>

          <p className="font-mono text-[11px] uppercase tracking-widest text-[#FF0054] font-bold text-center">
            "MADE WITH IMAGINATION. POWERED BY CREATIVITY."
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollToTop}
              className={`transition-colors uppercase tracking-wider text-[11px] cursor-pointer ${
                isLight ? 'text-[#5E5A53] hover:text-[#121212]' : 'text-neutral-400 hover:text-white'
              }`}
            >
              ↑ Back to Top
            </button>

            <span className="opacity-30">•</span>

            {/* Admin Login Pill in the bottom corner */}
            <button
              type="button"
              onClick={() => {
                onNavigate('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider border transition-all cursor-pointer ${
                isLight
                  ? 'border-[#E2DDD5] text-[#5E5A53] hover:text-[#121212] hover:border-black/40 bg-white shadow-sm'
                  : 'border-white/15 text-neutral-300 hover:text-white hover:border-white/40 bg-[#161616]'
              }`}
              title="Administrator Video Dashboard (Protected with ID & Password)"
            >
              <Lock className="w-3 h-3 text-[#FF0054]" />
              <span>Admin Login</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
