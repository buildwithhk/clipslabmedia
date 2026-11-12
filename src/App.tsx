import React, { useState, useEffect } from 'react';
import { useTheme } from './context/ThemeContext';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { WorkPage } from './pages/WorkPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ProjectModal } from './components/ProjectModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { ContactFormModal } from './components/ContactFormModal';
import { ProjectItem } from './types';
import { ArrowUp } from 'lucide-react';

function AppContent() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { projects } = usePortfolio();

  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Video player state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState('');
  const [activeVideoTitle, setActiveVideoTitle] = useState('');
  const [activeVideoFormat, setActiveVideoFormat] = useState<'16:9' | '9:16'>('16:9');

  // Contact form modal state
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactInitialService, setContactInitialService] = useState('');

  // Back to top visibility
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Sync with browser URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'services', 'work', 'about', 'contact', 'admin', 'dashboard'].includes(hash)) {
        setCurrentPage(hash === 'dashboard' ? 'admin' : hash);
      } else if (hash.startsWith('work/')) {
        const slug = hash.replace('work/', '');
        const found = projects.find((p) => p.slug === slug || p.id === slug);
        if (found) {
          setSelectedProject(found);
          setCurrentPage('work');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [projects]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut to open Admin Login from anywhere: Alt + A or Ctrl + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.altKey && e.key.toLowerCase() === 'a') ||
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a')
      ) {
        e.preventDefault();
        navigateTo('admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenVideo = (videoUrl: string, title: string, format: '16:9' | '9:16' = '16:9') => {
    setActiveVideoUrl(videoUrl);
    setActiveVideoTitle(title);
    setActiveVideoFormat(format);
    setIsVideoModalOpen(true);
  };

  const handleOpenProjectIntake = (serviceName: string = '') => {
    setContactInitialService(serviceName);
    setIsContactModalOpen(true);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans antialiased transition-colors duration-200 relative ${
        isLight
          ? 'bg-[#F7F6F2] text-[#121212] selection:bg-[#121212] selection:text-white'
          : 'bg-[#080808] text-white selection:bg-[#AAFF00] selection:text-[#080808]'
      }`}
    >
      {/* GLOBAL NAVIGATION */}
      <Navigation
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenProjectModal={() => handleOpenProjectIntake('')}
      />

      {/* MAIN VIEWPORT ROUTER */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage
            onStartProject={() => handleOpenProjectIntake('')}
            onExploreWork={() => {
              const el = document.getElementById('work-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                navigateTo('work');
              }
            }}
            onSelectProject={(project) => setSelectedProject(project)}
            onPlayVideo={handleOpenVideo}
            onSelectService={(serviceName) => handleOpenProjectIntake(serviceName)}
            onNavigateToWork={() => navigateTo('work')}
          />
        )}

        {currentPage === 'work' && (
          <WorkPage
            onSelectProject={(project) => setSelectedProject(project)}
            onPlayVideo={handleOpenVideo}
            onStartProject={() => handleOpenProjectIntake('')}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onStartProject={() => handleOpenProjectIntake('')}
            onExploreWork={() => navigateTo('work')}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onStartProject={(serviceName) => handleOpenProjectIntake(serviceName || '')}
          />
        )}

        {currentPage === 'contact' && <ContactPage />}

        {currentPage === 'admin' && (
          <AdminDashboardPage
            onExit={() => navigateTo('home')}
            onPlayVideo={handleOpenVideo}
          />
        )}
      </main>

      {/* GLOBAL FOOTER */}
      <Footer
        onNavigate={navigateTo}
        onOpenProjectModal={() => handleOpenProjectIntake('')}
      />

      {/* Case Study Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onStartSimilarProject={(title) => handleOpenProjectIntake(`Similar to ${title}`)}
        onPlayFullVideo={handleOpenVideo}
      />

      {/* Full-Screen Video Player Modal */}
      <VideoPlayerModal
        isOpen={isVideoModalOpen}
        videoUrl={activeVideoUrl}
        title={activeVideoTitle}
        format={activeVideoFormat}
        onClose={() => setIsVideoModalOpen(false)}
      />

      {/* High-Conversion Lead Intake Modal */}
      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        initialService={contactInitialService}
      />

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 p-2.5 sm:p-3 rounded-full hover:scale-110 transition-all duration-300 cursor-pointer shadow-xl ${
            isLight
              ? 'bg-[#121212] text-white shadow-md'
              : 'bg-[#AAFF00] text-[#080808] shadow-glow-lime'
          }`}
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
}

export function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}

export default App;
