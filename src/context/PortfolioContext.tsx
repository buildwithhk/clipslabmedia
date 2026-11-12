import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { ProjectItem } from '../types';
import { INITIAL_PROJECTS } from '../data/projects';
import { getEffectiveThumbnail } from '../utils/videoUtils';
import { GOOGLE_SCRIPT_URL } from '../config/contact';

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
  syncToServer: (
    customShowreelUrl?: string,
    customShowreelThumb?: string,
    customProjects?: ProjectItem[]
  ) => Promise<boolean>;
  isSyncing: boolean;
  lastSyncedAt: string | null;
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

  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);

  // Keep fresh references for async sync operations
  const projectsRef = useRef(projects);
  const showreelVideoUrlRef = useRef(showreelVideoUrl);
  const showreelThumbRef = useRef(showreelThumbnail);

  useEffect(() => {
    projectsRef.current = projects;
  }, [projects]);

  useEffect(() => {
    showreelVideoUrlRef.current = showreelVideoUrl;
  }, [showreelVideoUrl]);

  useEffect(() => {
    showreelThumbRef.current = showreelThumbnail;
  }, [showreelThumbnail]);

  // Fetch live videos from server on initial website mount
  useEffect(() => {
    let isMounted = true;

    const fetchLiveVideos = async () => {
      try {
        const response = await fetch('/api/videos.php', { cache: 'no-store' });
        if (!response.ok) return;

        const data = await response.json();
        if (!isMounted || !data || data.status !== 'success') return;

        if (data.showreelVideoUrl && typeof data.showreelVideoUrl === 'string') {
          setShowreelVideoUrlState(data.showreelVideoUrl);
          localStorage.setItem(SHOWREEL_VIDEO_KEY, data.showreelVideoUrl);
        }

        if (data.showreelThumbnail && typeof data.showreelThumbnail === 'string') {
          setShowreelThumbnailState(data.showreelThumbnail);
          localStorage.setItem(SHOWREEL_THUMB_KEY, data.showreelThumbnail);
        }

        if (Array.isArray(data.projects) && data.projects.length > 0) {
          const mapped = data.projects.map((item: any) => {
            const videoUrl = item.fullVideoUrl || item.videoPreviewUrl || '';
            return {
              ...item,
              format: item.format || (item.aspectRatio === '9:16' || item.aspectRatio === 'portrait' ? '9:16' : '16:9'),
              aspectRatio: item.format || item.aspectRatio || '16:9',
              thumbnail: getEffectiveThumbnail(videoUrl, item.thumbnail),
            };
          });
          setProjects(mapped);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
        }

        setLastSyncedAt(new Date().toLocaleTimeString());
      } catch {
        // Fallback silently to localStorage / INITIAL_PROJECTS when running locally without PHP
      }
    };

    fetchLiveVideos();

    return () => {
      isMounted = false;
    };
  }, []);

  const syncToServer = async (
    customShowreelUrl?: string,
    customShowreelThumb?: string,
    customProjects?: ProjectItem[]
  ): Promise<boolean> => {
    const urlToSave = customShowreelUrl !== undefined ? customShowreelUrl : showreelVideoUrlRef.current;
    const thumbToSave = customShowreelThumb !== undefined ? customShowreelThumb : showreelThumbRef.current;
    const projectsToSave = customProjects !== undefined ? customProjects : projectsRef.current;

    setIsSyncing(true);
    let success = false;

    try {
      const response = await fetch('/api/videos.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          showreelVideoUrl: urlToSave,
          showreelThumbnail: thumbToSave,
          projects: projectsToSave,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result && result.status === 'success') {
          success = true;
          setLastSyncedAt(new Date().toLocaleTimeString());
        }
      }
    } catch (err) {
      console.warn('Sync to /api/videos.php failed (expected in local dev mode):', err);
    }

    // Secondary Cloud Backup: Google Apps Script Webhook (if configured)
    if (GOOGLE_SCRIPT_URL) {
      try {
        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            action: 'savePortfolio',
            showreelVideoUrl: urlToSave,
            showreelThumbnail: thumbToSave,
            projects: projectsToSave,
          }),
        }).catch(() => {});
      } catch {}
    }

    setIsSyncing(false);
    return success;
  };

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
        syncToServer,
        isSyncing,
        lastSyncedAt,
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
