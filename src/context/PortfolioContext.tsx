import React, { createContext, useContext, useState } from 'react';
import { ProjectItem } from '../types';
import { INITIAL_PROJECTS } from '../data/projects';
import { getEffectiveThumbnail } from '../utils/videoUtils';

interface PortfolioContextType {
  projects: ProjectItem[];
  addProject: (newProject: Omit<ProjectItem, 'id' | 'slug'>) => void;
  updateProject: (id: string, updatedFields: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  moveProject: (currentIndex: number, targetIndex: number) => void;
  swapProjects: (idA: string, idB: string) => void;
  resetProjects: () => void;
  showreelVideoUrl: string;
  setShowreelVideoUrl: (url: string) => void;
  showreelThumbnail: string;
  setShowreelThumbnail: (url: string) => void;
  exportProjectsJSON: () => string;
  importProjectsJSON: (jsonStr: string) => boolean;
}

const STORAGE_KEY = 'clipslab_portfolio_projects_v3';
const SHOWREEL_VIDEO_KEY = 'clipslab_showreel_video_url_v2';
const SHOWREEL_THUMB_KEY = 'clipslab_showreel_thumb_url_v2';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item: any) => {
            const videoUrl = item.fullVideoUrl || item.videoPreviewUrl || '';
            return {
              ...item,
              format: item.format || (item.aspectRatio === '9:16' || item.aspectRatio === 'portrait' ? '9:16' : '16:9'),
              aspectRatio: item.format || item.aspectRatio || '16:9',
              thumbnail: getEffectiveThumbnail(videoUrl, item.thumbnail),
            };
          });
        }
      }
    } catch (e) {
      console.warn('Failed to parse portfolio from localStorage', e);
    }
    return INITIAL_PROJECTS.map((item) => {
      const videoUrl = item.fullVideoUrl || item.videoPreviewUrl || '';
      return {
        ...item,
        thumbnail: getEffectiveThumbnail(videoUrl, item.thumbnail),
      };
    });
  });

  const [showreelVideoUrl, setShowreelVideoUrlState] = useState<string>(() => {
    return localStorage.getItem(SHOWREEL_VIDEO_KEY) || '/assets/sample-reel.mp4';
  });

  const [showreelThumbnail, setShowreelThumbnailState] = useState<string>(() => {
    const savedThumb = localStorage.getItem(SHOWREEL_THUMB_KEY);
    const savedVideo = localStorage.getItem(SHOWREEL_VIDEO_KEY) || '/assets/sample-reel.mp4';
    return getEffectiveThumbnail(savedVideo, savedThumb || undefined);
  });

  const persistProjects = (nextProjects: ProjectItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProjects));
    } catch (e) {
      console.warn('Failed to save portfolio to localStorage', e);
    }
  };

  const setShowreelVideoUrl = (url: string) => {
    setShowreelVideoUrlState(url);
    try {
      localStorage.setItem(SHOWREEL_VIDEO_KEY, url);
    } catch (e) {
      console.warn(e);
    }
  };

  const setShowreelThumbnail = (url: string) => {
    setShowreelThumbnailState(url);
    try {
      localStorage.setItem(SHOWREEL_THUMB_KEY, url);
    } catch (e) {
      console.warn(e);
    }
  };

  const updateAndPersist = (updater: (prev: ProjectItem[]) => ProjectItem[]) => {
    setProjects((prev) => {
      const next = updater(prev);
      persistProjects(next);
      return next;
    });
  };

  const addProject = (newProjectData: Omit<ProjectItem, 'id' | 'slug'>) => {
    const id = `project-${Date.now()}`;
    const slug = newProjectData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newProject: ProjectItem = {
      ...newProjectData,
      id,
      slug: slug || id,
    };

    updateAndPersist((prev) => [newProject, ...prev]);
  };

  const updateProject = (id: string, updatedFields: Partial<ProjectItem>) => {
    updateAndPersist((prev) =>
      prev.map((proj) => {
        if (proj.id !== id) return proj;
        const merged = { ...proj, ...updatedFields };
        const videoUrl = merged.fullVideoUrl || merged.videoPreviewUrl || '';
        merged.thumbnail = getEffectiveThumbnail(videoUrl, merged.thumbnail);
        return merged;
      })
    );
  };

  const deleteProject = (id: string) => {
    updateAndPersist((prev) => prev.filter((proj) => proj.id !== id));
  };

  const moveProject = (currentIndex: number, targetIndex: number) => {
    updateAndPersist((prev) => {
      if (
        currentIndex < 0 ||
        currentIndex >= prev.length ||
        targetIndex < 0 ||
        targetIndex >= prev.length
      ) {
        return prev;
      }
      const updated = [...prev];
      const [moved] = updated.splice(currentIndex, 1);
      updated.splice(targetIndex, 0, moved);
      return updated;
    });
  };

  const swapProjects = (idA: string, idB: string) => {
    updateAndPersist((prev) => {
      const indexA = prev.findIndex((p) => p.id === idA);
      const indexB = prev.findIndex((p) => p.id === idB);
      if (indexA === -1 || indexB === -1) return prev;
      const updated = [...prev];
      const temp = updated[indexA];
      updated[indexA] = updated[indexB];
      updated[indexB] = temp;
      return updated;
    });
  };

  const resetProjects = () => {
    setProjects(INITIAL_PROJECTS);
    setShowreelVideoUrl('/assets/sample-reel.mp4');
    setShowreelThumbnail(
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1400&auto=format&fit=crop'
    );
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SHOWREEL_VIDEO_KEY);
      localStorage.removeItem(SHOWREEL_THUMB_KEY);
    } catch (e) {
      console.warn(e);
    }
  };

  const exportProjectsJSON = () => {
    return JSON.stringify(projects, null, 2);
  };

  const importProjectsJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].title) {
        setProjects(parsed);
        persistProjects(parsed);
        return true;
      }
    } catch (err) {
      console.error('Invalid JSON imported', err);
    }
    return false;
  };

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        moveProject,
        swapProjects,
        resetProjects,
        showreelVideoUrl,
        setShowreelVideoUrl,
        showreelThumbnail,
        setShowreelThumbnail,
        exportProjectsJSON,
        importProjectsJSON,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
