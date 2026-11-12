import React from 'react';
import { Hero } from '../components/Hero';
import { Showreel } from '../components/Showreel';
import { FeaturedWork } from '../components/FeaturedWork';
import { AboutFounder } from '../components/AboutFounder';
import { ContactSection } from '../components/ContactSection';
import { ProjectItem } from '../types';
import { usePortfolio } from '../context/PortfolioContext';

interface HomePageProps {
  onStartProject: () => void;
  onExploreWork: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onPlayVideo: (videoUrl: string, title: string, format?: '16:9' | '9:16') => void;
  onSelectService?: (serviceName: string) => void;
  onNavigateToWork: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartProject,
  onExploreWork,
  onSelectProject,
  onPlayVideo,
  onNavigateToWork,
}) => {
  const { showreelVideoUrl } = usePortfolio();

  return (
    <div className="w-full">
      {/* SECTION 2: HERO SECTION - WHAT WE DO */}
      <Hero
        onStartProject={onStartProject}
        onExploreWork={onExploreWork}
        onPlayShowreel={() =>
          onPlayVideo(
            showreelVideoUrl,
            'ClipsLab Media // Cinematic Visual Showreel'
          )
        }
      />

      {/* SECTION 3: FEATURED SHOWREEL */}
      <Showreel onOpenFullScreen={(url, title) => onPlayVideo(url, title)} />

      {/* SECTION 4: OUR BEST AI ADS / PORTFOLIO ARCHIVE */}
      <FeaturedWork
        onSelectProject={onSelectProject}
        onPlayVideo={onPlayVideo}
        onViewAllWork={onNavigateToWork}
      />

      {/* SECTION 5: ABOUT THE FOUNDER */}
      <AboutFounder
        onStartProject={onStartProject}
        onExploreWork={onExploreWork}
      />

      {/* SECTION 6: COLLABORATION / CONTACT */}
      <ContactSection />
    </div>
  );
};
