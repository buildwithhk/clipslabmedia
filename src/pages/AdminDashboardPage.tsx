import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { parseVideoUrl, getEffectiveThumbnail } from '../utils/videoUtils';
import { VideoFormat, ProjectCategory, ProjectItem } from '../types';
import {
  Video,
  Play,
  Save,
  Trash2,
  Plus,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Check,
  AlertCircle,
  ExternalLink,
  Copy,
  RotateCcw,
  Film,
  Smartphone,
  Monitor,
  Sparkles,
  Link2,
  Layers,
  Settings,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  ShieldAlert,
  ShieldCheck,
  Edit3,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';

interface AdminDashboardPageProps {
  onExit: () => void;
  onPlayVideo: (videoUrl: string, title: string, format?: '16:9' | '9:16') => void;
}

const CATEGORIES: ProjectCategory[] = [
  'AI Commercials & Advertisements',
  'Product Films',
  'Cinematic Brand Films',
  'AI Filmmaking Experiments',
  'Short Films & Microdramas',
  'Social Media Creatives',
];

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onExit,
  onPlayVideo,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const {
    projects,
    updateProject,
    deleteProject,
    moveProject,
    swapProjects,
    addProject,
    resetProjects,
    showreelVideoUrl,
    setShowreelVideoUrl,
    showreelThumbnail,
    setShowreelThumbnail,
    exportProjectsJSON,
    syncToServer,
    isSyncing,
    lastSyncedAt,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'all' | 'showreel' | 'vertical' | 'widescreen' | 'add' | 'export'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Showreel edit state
  const [tempShowreelUrl, setTempShowreelUrl] = useState(showreelVideoUrl);
  const [tempShowreelThumb, setTempShowreelThumb] = useState(showreelThumbnail);

  // New Video Form state
  const [newTitle, setNewTitle] = useState('');
  const [newFormat, setNewFormat] = useState<VideoFormat>('9:16');
  const [newCategory, setNewCategory] = useState<ProjectCategory>('AI Commercials & Advertisements');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newThumbnail, setNewThumbnail] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // Per-project editing video URLs, Titles, and Thumbnails
  const [editingUrls, setEditingUrls] = useState<Record<string, string>>({});
  const [editingTitles, setEditingTitles] = useState<Record<string, string>>({});
  const [editingThumbs, setEditingThumbs] = useState<Record<string, string>>({});
  const [copiedCode, setCopiedCode] = useState(false);

  // Administrator Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return (
      sessionStorage.getItem('clipslab_admin_auth') === 'true' ||
      localStorage.getItem('clipslab_admin_auth') === 'true'
    );
  });
  const [loginUserId, setLoginUserId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Security Credentials Update Modal State
  const [isCredsModalOpen, setIsCredsModalOpen] = useState(false);
  const [newUserId, setNewUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const validIds = ['admin', 'harsh', 'clipslab'];
    const customUid = localStorage.getItem('clipslab_admin_uid');
    if (customUid) {
      validIds.push(customUid.toLowerCase());
    }

    const savedPassword = localStorage.getItem('clipslab_admin_pwd') || 'clipslab2026';

    const inputId = loginUserId.trim().toLowerCase();
    const inputPwd = loginPassword.trim();

    if (!validIds.includes(inputId) || inputPwd !== savedPassword) {
      setLoginError('Invalid User ID or Password. Please try again.');
      return;
    }

    if (rememberMe) {
      localStorage.setItem('clipslab_admin_auth', 'true');
    } else {
      sessionStorage.setItem('clipslab_admin_auth', 'true');
    }
    setIsAuthenticated(true);
    setToastMessage('🔓 Administrator access unlocked. Welcome, Harsh!');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogout = () => {
    localStorage.removeItem('clipslab_admin_auth');
    sessionStorage.removeItem('clipslab_admin_auth');
    setIsAuthenticated(false);
    onExit();
  };

  const handleSaveNewCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) {
      showToast('⚠️ Password cannot be empty.');
      return;
    }
    if (newUserId.trim()) {
      localStorage.setItem('clipslab_admin_uid', newUserId.trim().toLowerCase());
    }
    localStorage.setItem('clipslab_admin_pwd', newPassword.trim());
    setIsCredsModalOpen(false);
    showToast('✅ Administrator credentials updated successfully!');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Get current editing URL for project, or fallback to saved project URL
  const getProjectUrl = (proj: ProjectItem) => {
    if (editingUrls[proj.id] !== undefined) {
      return editingUrls[proj.id];
    }
    return proj.fullVideoUrl || proj.videoPreviewUrl || '';
  };

  const handleUrlInputChange = (id: string, val: string) => {
    setEditingUrls((prev) => ({ ...prev, [id]: val }));
    const parsed = parseVideoUrl(val);
    if (parsed.type === 'youtube' && parsed.videoId) {
      const currentThumb = editingThumbs[id] !== undefined ? editingThumbs[id] : (projects.find((p) => p.id === id)?.thumbnail || '');
      // If not a manually uploaded base64 image from website, automatically fetch YouTube thumbnail
      if (!currentThumb.startsWith('data:image')) {
        const ytThumb = `https://img.youtube.com/vi/${parsed.videoId}/hqdefault.jpg`;
        setEditingThumbs((prev) => ({ ...prev, [id]: ytThumb }));
      }
    }
  };

  // Get current editing Title for project, or fallback to saved project title
  const getProjectTitle = (proj: ProjectItem) => {
    if (editingTitles[proj.id] !== undefined) {
      return editingTitles[proj.id];
    }
    return proj.title || '';
  };

  const handleTitleInputChange = (id: string, val: string) => {
    setEditingTitles((prev) => ({ ...prev, [id]: val }));
  };

  // Get current editing Thumbnail for project, or fallback to saved project thumbnail (auto-resolving YouTube if not manually uploaded)
  const getProjectThumbnail = (proj: ProjectItem) => {
    if (editingThumbs[proj.id] !== undefined) {
      return editingThumbs[proj.id];
    }
    const currentUrl = editingUrls[proj.id] !== undefined ? editingUrls[proj.id] : (proj.fullVideoUrl || proj.videoPreviewUrl || '');
    return getEffectiveThumbnail(currentUrl, proj.thumbnail);
  };

  const handleThumbChange = (id: string, val: string) => {
    setEditingThumbs((prev) => ({ ...prev, [id]: val }));
  };

  // Client-side image upload helper with Canvas optimization to prevent quota issues
  const handleImageFileUpload = (file: File, callback: (base64Url: string) => void) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('⚠️ Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      showToast('⚠️ Image file is too large (max 25MB).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const rawResult = e.target?.result as string;
      if (!rawResult) return;

      const img = new window.Image();
      img.onload = () => {
        const maxDim = 1280;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const optimized = canvas.toDataURL('image/jpeg', 0.85);
          callback(optimized);
        } else {
          callback(rawResult);
        }
      };
      img.onerror = () => {
        callback(rawResult);
      };
      img.src = rawResult;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProject = async (proj: ProjectItem) => {
    const url = (editingUrls[proj.id] !== undefined ? editingUrls[proj.id] : proj.fullVideoUrl || proj.videoPreviewUrl || '').trim();
    const title = (editingTitles[proj.id] !== undefined ? editingTitles[proj.id] : proj.title || '').trim();
    let thumb = (editingThumbs[proj.id] !== undefined ? editingThumbs[proj.id] : proj.thumbnail || '').trim();

    if (!title) {
      showToast('⚠️ Video title / name cannot be empty');
      return;
    }

    if (!url) {
      showToast('⚠️ Please enter a valid video or YouTube URL');
      return;
    }

    // Automatically resolve effective thumbnail if not manually uploaded via website
    thumb = getEffectiveThumbnail(url, thumb);

    const updatedFields: Partial<ProjectItem> = {
      title,
      fullVideoUrl: url,
      videoPreviewUrl: url,
      thumbnail: thumb,
    };

    const newSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    if (newSlug) {
      updatedFields.slug = newSlug;
    }

    updateProject(proj.id, updatedFields);

    const updatedProjects = projects.map((p) => {
      if (p.id !== proj.id) return p;
      return { ...p, ...updatedFields };
    });

    showToast('💾 Saving live to website...');
    const ok = await syncToServer(showreelVideoUrl, showreelThumbnail, updatedProjects);
    if (ok) {
      showToast(`🚀 Saved "${title}" live to website for all visitors!`);
    } else {
      showToast(`✅ Saved changes & thumbnail for "${title}"!`);
    }
  };

  // Backward compatibility alias
  const handleSaveProjectVideoUrl = handleSaveProject;

  const handleSaveShowreel = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = tempShowreelUrl.trim();
    if (!url) {
      showToast('⚠️ Please enter a valid video URL for the Showreel');
      return;
    }

    setShowreelVideoUrl(url);

    let thumb = tempShowreelThumb.trim();
    thumb = getEffectiveThumbnail(url, thumb);
    setShowreelThumbnail(thumb);
    setTempShowreelThumb(thumb);

    showToast('💾 Saving live to website...');
    const ok = await syncToServer(url, thumb, projects);
    if (ok) {
      showToast('🚀 Showreel video updated live on website for all visitors!');
    } else {
      showToast('✅ Featured Showreel video & thumbnail updated successfully!');
    }
  };

  const handleCreateNewVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newVideoUrl.trim()) {
      showToast('⚠️ Title and Video URL are required');
      return;
    }

    let thumb = newThumbnail.trim();
    thumb = getEffectiveThumbnail(newVideoUrl.trim(), thumb);

    const id = `project-${Date.now()}`;
    const slug = newTitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const newProjItem: ProjectItem = {
      id,
      slug: slug || id,
      title: newTitle.trim(),
      format: newFormat,
      aspectRatio: newFormat,
      category: newCategory,
      year: new Date().getFullYear().toString(),
      shortDescription: newDescription.trim() || `Cinematic ${newFormat} production by ClipsLab Media.`,
      creativeConcept: 'Engineered through AI filmmaking pipelines with custom creative direction.',
      productionApproach: 'Neural rendering with surgical editorial pacing in Premiere Pro.',
      toolsUsed: ['Kling AI', 'Google Flow', 'Adobe Premiere Pro'],
      role: 'Founder, Creative Director & AI Filmmaker — Harsh Kumar',
      fullVideoUrl: newVideoUrl.trim(),
      videoPreviewUrl: newVideoUrl.trim(),
      thumbnail: thumb,
      featured: true,
      accentColor: newFormat === '9:16' ? '#FF0054' : '#AAFF00',
    };

    addProject(newProjItem);
    const nextList = [newProjItem, ...projects];
    syncToServer(showreelVideoUrl, showreelThumbnail, nextList);

    showToast(`🎉 Added new ${newFormat} video: "${newTitle}"!`);
    setNewTitle('');
    setNewVideoUrl('');
    setNewThumbnail('');
    setNewDescription('');
    setActiveTab(newFormat === '9:16' ? 'vertical' : 'widescreen');
  };

  const handleCopyCode = () => {
    const json = exportProjectsJSON();
    navigator.clipboard.writeText(json);
    setCopiedCode(true);
    showToast('📋 Copied full project configuration to clipboard!');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const verticalProjects = projects.filter(
    (p) => (p.format || (p.aspectRatio === '9:16' || p.aspectRatio === 'portrait' ? '9:16' : '16:9')) === '9:16'
  );
  const widescreenProjects = projects.filter(
    (p) => (p.format || (p.aspectRatio === '9:16' || p.aspectRatio === 'portrait' ? '9:16' : '16:9')) === '16:9'
  );

  const displayedProjects =
    activeTab === 'vertical'
      ? verticalProjects
      : activeTab === 'widescreen'
      ? widescreenProjects
      : projects;

  const handleMoveProject = (projId: string, direction: 'up' | 'down') => {
    const currentIdx = displayedProjects.findIndex((p) => p.id === projId);
    if (currentIdx === -1) return;
    const targetIdx = direction === 'up' ? currentIdx - 1 : currentIdx + 1;
    if (targetIdx < 0 || targetIdx >= displayedProjects.length) return;
    const targetProj = displayedProjects[targetIdx];
    swapProjects(projId, targetProj.id);
    const title = getProjectTitle(displayedProjects[currentIdx]);
    showToast(`↕️ Moved "${title}" ${direction === 'up' ? 'up' : 'down'}`);
  };

  if (!isAuthenticated) {
    return (
      <div
        className={`min-h-[85vh] py-16 px-4 flex items-center justify-center transition-colors duration-200 ${
          isLight ? 'bg-[#F7F6F2] text-[#121212]' : 'bg-[#080808] text-white'
        }`}
      >
        <div className="w-full max-w-md">
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-2xl transition-colors ${
              isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#121212] border-white/10'
            }`}
          >
            {/* Top Security Pill */}
            <div className="flex items-center justify-between mb-6">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-bold border ${
                  isLight
                    ? 'bg-[#F7F6F2] border-[#E2DDD5] text-[#121212]'
                    : 'bg-[#181818] border-white/10 text-[#AAFF00]'
                }`}
              >
                <Lock className="w-3 h-3 text-[#FF0054]" />
                <span>RESTRICTED ACCESS</span>
              </div>
              <span className="text-[10px] font-mono text-[#FF0054] font-bold">LEVEL 1 AUTH</span>
            </div>

            {/* Title & Description */}
            <div className="mb-6">
              <h2 className="font-heading font-extrabold text-2xl uppercase tracking-tight">
                STUDIO VIDEO CONTROL<span className="text-[#FF0054]">.</span>
              </h2>
              <p className={`mt-1.5 text-xs font-mono leading-relaxed ${isLight ? 'text-[#5E5A53]' : 'text-neutral-400'}`}>
                Enter administrator credentials to replace YouTube links, showreels, and portfolio videos.
              </p>
            </div>

            {/* Error Message if any */}
            {loginError && (
              <div className="mb-5 p-3 rounded-xl bg-[#FF0054]/10 border border-[#FF0054]/30 text-[#FF0054] text-xs font-mono flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-bold mb-1.5">
                  Administrator User ID
                </label>
                <input
                  type="text"
                  value={loginUserId}
                  onChange={(e) => setLoginUserId(e.target.value)}
                  placeholder="e.g. admin or harsh"
                  required
                  autoFocus
                  className={`w-full px-4 py-2.5 rounded-xl text-xs font-mono border outline-none transition-colors ${
                    isLight
                      ? 'bg-[#F7F6F2] border-[#E2DDD5] focus:border-[#121212]'
                      : 'bg-[#1A1A1A] border-white/10 text-white focus:border-[#AAFF00]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-bold mb-1.5">
                  Access Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className={`w-full pl-4 pr-11 py-2.5 rounded-xl text-xs font-mono border outline-none transition-colors ${
                      isLight
                        ? 'bg-[#F7F6F2] border-[#E2DDD5] focus:border-[#121212]'
                        : 'bg-[#1A1A1A] border-white/10 text-white focus:border-[#AAFF00]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs font-mono cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#E2DDD5] dark:border-white/20 text-[#FF0054] focus:ring-0 cursor-pointer"
                  />
                  <span className={isLight ? 'text-[#5E5A53]' : 'text-neutral-400'}>Remember session</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-full text-xs font-heading font-bold uppercase tracking-wider bg-[#FF0054] text-white hover:bg-[#e0004a] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#FF0054]/25 cursor-pointer"
              >
                <Unlock className="w-4 h-4 stroke-[2.5]" />
                <span>Unlock Video Dashboard</span>
              </button>

              <button
                type="button"
                onClick={onExit}
                className={`w-full py-2.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                  isLight
                    ? 'border-[#E2DDD5] text-[#5E5A53] hover:text-[#121212] hover:bg-[#F7F6F2]'
                    : 'border-white/10 text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Website</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-8 sm:py-12 transition-colors duration-200 ${
        isLight ? 'bg-[#F7F6F2] text-[#121212]' : 'bg-[#080808] text-white'
      }`}
    >
      {/* Top Floating Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 max-w-md p-4 rounded-2xl shadow-2xl bg-[#121212] text-white border border-[#AAFF00] flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-[#AAFF00] flex-shrink-0" />
          <span className="text-xs sm:text-sm font-mono">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-[#E2DDD5] dark:border-white/10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#AAFF00] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-bold text-[#FF0054]">
                STUDIO CONTROL PANEL // VIDEO CONTENT MANAGER
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl uppercase tracking-tight">
              VIDEO DASHBOARD<span className="text-[#FF0054]">.</span>
            </h1>
            <p className={`mt-1 text-xs sm:text-sm font-mono ${isLight ? 'text-[#5E5A53]' : 'text-neutral-400'}`}>
              Replace, add, or remove YouTube links from every video section on ClipsLab Media.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Live Server Sync Button */}
            <button
              onClick={async () => {
                showToast('💾 Syncing all video links live to website...');
                const ok = await syncToServer();
                if (ok) {
                  showToast('🚀 Live website updated with all video changes!');
                } else {
                  showToast('⚠️ Changes saved locally (server sync fallback).');
                }
              }}
              disabled={isSyncing}
              className={`px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all flex items-center gap-2 cursor-pointer ${
                isSyncing
                  ? 'bg-neutral-500/10 border-neutral-500/30 text-neutral-400'
                  : 'bg-[#AAFF00]/10 border-[#AAFF00]/50 text-[#AAFF00] hover:bg-[#AAFF00]/20'
              }`}
              title="Push all video links and showreel directly to the live website"
            >
              <span className="w-2 h-2 rounded-full bg-[#AAFF00] animate-pulse" />
              <span>{isSyncing ? 'Syncing...' : 'Live Sync'}</span>
            </button>

            <button
              onClick={() => setActiveTab('add')}
              className="px-5 py-2.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider bg-[#FF0054] text-white hover:bg-[#e0004a] transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add New Video</span>
            </button>

            {/* Security / Change Credentials Button */}
            <button
              onClick={() => {
                setNewUserId(localStorage.getItem('clipslab_admin_uid') || 'admin');
                setNewPassword(localStorage.getItem('clipslab_admin_pwd') || 'clipslab2026');
                setIsCredsModalOpen(true);
              }}
              className={`px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all flex items-center gap-1.5 cursor-pointer ${
                isLight
                  ? 'bg-white border-[#E2DDD5] text-[#121212] hover:bg-[#EFECE6]'
                  : 'bg-[#141414] border-white/15 text-neutral-300 hover:text-white'
              }`}
              title="Change Administrator Credentials"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#AAFF00]" />
              <span>Security</span>
            </button>

            {/* Log Out Button */}
            <button
              onClick={handleLogout}
              className={`px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all flex items-center gap-1.5 cursor-pointer text-red-500 hover:bg-red-500/10 ${
                isLight ? 'border-[#E2DDD5] bg-white' : 'border-white/15 bg-[#141414]'
              }`}
              title="Log Out of Administrator Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>

            <button
              onClick={onExit}
              className={`px-5 py-2.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider border transition-all flex items-center gap-2 cursor-pointer ${
                isLight
                  ? 'bg-white border-[#E2DDD5] text-[#121212] hover:bg-[#EFECE6]'
                  : 'bg-[#141414] border-white/15 text-white hover:bg-white/10'
              }`}
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Back to Website</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className={`p-4 rounded-2xl border ${isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#121212] border-white/10'}`}>
            <span className="text-[10px] font-mono uppercase text-[#7D766D] dark:text-neutral-400 block mb-1">
              Featured Showreel
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF0054]" />
              <span className="font-heading font-bold text-sm uppercase truncate">
                {parseVideoUrl(showreelVideoUrl).type === 'youtube' ? 'YouTube Active' : 'Active Reel'}
              </span>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border ${isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#121212] border-white/10'}`}>
            <span className="text-[10px] font-mono uppercase text-[#7D766D] dark:text-neutral-400 block mb-1">
              9:16 Vertical Videos
            </span>
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#FF0054]" />
              <span className="font-heading font-bold text-lg">{verticalProjects.length} Videos</span>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border ${isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#121212] border-white/10'}`}>
            <span className="text-[10px] font-mono uppercase text-[#7D766D] dark:text-neutral-400 block mb-1">
              16:9 Cinema Videos
            </span>
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-[#AAFF00]" />
              <span className="font-heading font-bold text-lg">{widescreenProjects.length} Videos</span>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border ${isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#121212] border-white/10'}`}>
            <span className="text-[10px] font-mono uppercase text-[#7D766D] dark:text-neutral-400 block mb-1">
              Total Portfolio Videos
            </span>
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-[#638AFF]" />
              <span className="font-heading font-bold text-lg">{projects.length} Videos</span>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-[#E2DDD5] dark:border-white/10">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'all'
                ? isLight
                  ? 'bg-[#121212] text-white shadow-md'
                  : 'bg-[#AAFF00] text-[#080808] shadow-glow-lime'
                : 'text-[#5E5A53] hover:text-[#121212] dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Video Ads ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('vertical')}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'vertical'
                ? isLight
                  ? 'bg-[#121212] text-white shadow-md'
                  : 'bg-[#AAFF00] text-[#080808] shadow-glow-lime'
                : 'text-[#5E5A53] hover:text-[#121212] dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-[#FF0054]" />
            <span>9:16 Vertical ({verticalProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('widescreen')}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'widescreen'
                ? isLight
                  ? 'bg-[#121212] text-white shadow-md'
                  : 'bg-[#AAFF00] text-[#080808] shadow-glow-lime'
                : 'text-[#5E5A53] hover:text-[#121212] dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-[#AAFF00]" />
            <span>16:9 Widescreen ({widescreenProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('showreel')}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'showreel'
                ? isLight
                  ? 'bg-[#121212] text-white shadow-md'
                  : 'bg-[#AAFF00] text-[#080808] shadow-glow-lime'
                : 'text-[#5E5A53] hover:text-[#121212] dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Featured Showreel</span>
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'add'
                ? isLight
                  ? 'bg-[#121212] text-white shadow-md'
                  : 'bg-[#AAFF00] text-[#080808] shadow-glow-lime'
                : 'text-[#5E5A53] hover:text-[#121212] dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add New</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold tracking-wider transition-all cursor-pointer flex items-center gap-2 ml-auto ${
              activeTab === 'export'
                ? isLight
                  ? 'bg-[#121212] text-white shadow-md'
                  : 'bg-[#AAFF00] text-[#080808] shadow-glow-lime'
                : 'text-[#5E5A53] hover:text-[#121212] dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Backup & Export</span>
          </button>
        </div>

        {/* TAB 1, 2, 3: PROJECT VIDEOS LIST (All, Vertical, Widescreen) */}
        {(activeTab === 'all' || activeTab === 'vertical' || activeTab === 'widescreen') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-extrabold text-xl uppercase tracking-tight">
                  {activeTab === 'vertical'
                    ? '9:16 Vertical Video Ads & Reels'
                    : activeTab === 'widescreen'
                    ? '16:9 Widescreen Commercials & Films'
                    : 'All Video Sections & Ads'}
                </h2>
                <p className="text-xs font-mono text-[#5E5A53] dark:text-neutral-400 mt-1">
                  Edit video title / name, paste any YouTube link or MP4 URL, and click "Save Changes" to update across your website.
                </p>
              </div>

              <span className="text-xs font-mono px-3 py-1 rounded-full bg-black/5 dark:bg-white/10">
                {displayedProjects.length} items
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {displayedProjects.map((proj, idx) => {
                const isVertical = proj.format === '9:16' || proj.aspectRatio === '9:16' || proj.aspectRatio === 'portrait';
                const currentUrl = getProjectUrl(proj);
                const currentTitle = getProjectTitle(proj);
                const currentThumb = getProjectThumbnail(proj);
                const parsed = parseVideoUrl(currentUrl);

                return (
                  <div
                    key={proj.id}
                    className={`p-5 sm:p-6 rounded-3xl border transition-all ${
                      isLight
                        ? 'bg-white border-[#E2DDD5] shadow-xs hover:border-[#121212]'
                        : 'bg-[#121212] border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                      
                      {/* Video Thumbnail with Hover Play Button & Manual Upload */}
                      <div className="flex-shrink-0 flex flex-col items-center gap-2 w-full sm:w-48">
                        <div className="relative w-full rounded-2xl overflow-hidden bg-black border border-[#E2DDD5] dark:border-white/10 group aspect-video sm:aspect-auto sm:h-28">
                          <img
                            src={currentThumb}
                            alt={currentTitle}
                            onError={(e) => {
                              if (parsed.type === 'youtube' && parsed.videoId) {
                                e.currentTarget.src = `https://img.youtube.com/vi/${parsed.videoId}/hqdefault.jpg`;
                              }
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => onPlayVideo(currentUrl, currentTitle, isVertical ? '9:16' : '16:9')}
                              className="w-10 h-10 rounded-full bg-[#AAFF00] text-black flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform cursor-pointer"
                              title="Test Play Video"
                            >
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            </button>
                          </div>

                          <span
                            className={`absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-mono uppercase font-bold text-white ${
                              isVertical ? 'bg-[#FF0054]' : 'bg-black/80'
                            }`}
                          >
                            {isVertical ? '9:16' : '16:9'}
                          </span>
                        </div>

                        {/* Manual Upload Thumbnail Button on Preview */}
                        <label className="w-full py-1.5 px-3 rounded-xl text-[10px] font-mono uppercase tracking-wider font-bold border border-dashed border-[#E2DDD5] dark:border-white/20 hover:border-[#FF0054] dark:hover:border-[#AAFF00] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-center cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-xs">
                          <Upload className="w-3 h-3 text-[#FF0054]" />
                          <span>Upload Thumbnail</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageFileUpload(file, (dataUrl) => {
                                  handleThumbChange(proj.id, dataUrl);
                                  showToast(`🖼️ Thumbnail uploaded! Click "Save Changes" to apply.`);
                                });
                              }
                            }}
                          />
                        </label>
                      </div>

                      {/* Video Details & Quick Title/Link/Thumbnail Editor */}
                      <div className="flex-grow w-full space-y-3">
                        {/* Top Category Badge & Action Buttons */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF0054] font-bold">
                              {proj.category}
                            </span>
                            <span className="text-[10px] font-mono text-[#7D766D] dark:text-neutral-400">
                              • {isVertical ? '9:16 Vertical Reel' : '16:9 Cinema Ad'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {/* Reorder Buttons */}
                            <button
                              type="button"
                              onClick={() => handleMoveProject(proj.id, 'up')}
                              disabled={idx === 0}
                              className="p-1.5 rounded-lg border border-[#E2DDD5] dark:border-white/10 disabled:opacity-20 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors"
                              title="Move Up"
                              aria-label="Move Up"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveProject(proj.id, 'down')}
                              disabled={idx === displayedProjects.length - 1}
                              className="p-1.5 rounded-lg border border-[#E2DDD5] dark:border-white/10 disabled:opacity-20 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors"
                              title="Move Down"
                              aria-label="Move Down"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete Button with In-App Confirmation (Works in all browsers without window.confirm blocking) */}
                            {confirmDeleteId === proj.id ? (
                              <div className="flex items-center gap-1 bg-red-500/10 border border-red-500/40 rounded-lg p-0.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    deleteProject(proj.id);
                                    setConfirmDeleteId(null);
                                    showToast(`🗑️ Removed "${currentTitle}" from portfolio`);
                                  }}
                                  className="px-2 py-1 rounded bg-red-500 text-white text-[10px] font-mono font-bold hover:bg-red-600 cursor-pointer shadow-xs"
                                  title="Confirm delete"
                                >
                                  Delete?
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteId(null)}
                                  className="px-1.5 py-1 rounded text-neutral-400 hover:text-white text-[10px] font-mono cursor-pointer"
                                  title="Cancel"
                                >
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(proj.id)}
                                className="p-1.5 rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/10 cursor-pointer transition-colors"
                                title="Delete Video"
                                aria-label="Delete Video"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Editable Video Title / Name Input */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-[#7D766D] dark:text-neutral-400 font-bold flex items-center gap-1.5">
                              <Edit3 className="w-3 h-3 text-[#FF0054]" />
                              <span>Video Title / Name</span>
                            </label>
                            <span className="text-[10px] font-mono text-[#7D766D] dark:text-neutral-400">
                              (Click to edit title)
                            </span>
                          </div>
                          <div className="relative">
                            <input
                              type="text"
                              value={currentTitle}
                              onChange={(e) => handleTitleInputChange(proj.id, e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveProject(proj);
                              }}
                              placeholder="e.g. AETHEL LUMINA: ZERO-GRAVITY ESSENCE"
                              className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm font-heading font-extrabold uppercase border transition-all ${
                                isLight
                                  ? 'bg-[#F7F6F2] border-[#E2DDD5] text-black focus:border-[#121212] focus:bg-white'
                                  : 'bg-[#181818] border-white/15 text-white focus:border-[#AAFF00] focus:bg-[#202020]'
                              }`}
                            />
                          </div>
                        </div>

                        {/* YouTube / Video URL Input Bar */}
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-[#7D766D] dark:text-neutral-400 font-bold mb-1">
                            Video Link (YouTube URL or MP4)
                          </label>
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <div className="relative flex-grow">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                                <Link2 className="w-4 h-4" />
                              </div>
                              <input
                                type="text"
                                value={currentUrl}
                                onChange={(e) => handleUrlInputChange(proj.id, e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSaveProject(proj);
                                }}
                                placeholder="Paste YouTube Link (e.g. https://www.youtube.com/watch?v=... or shorts)"
                                className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs font-mono border transition-all ${
                                  isLight
                                    ? 'bg-[#F7F6F2] border-[#E2DDD5] text-black focus:border-[#121212] focus:bg-white'
                                    : 'bg-[#181818] border-white/15 text-white focus:border-[#AAFF00] focus:bg-[#202020]'
                                }`}
                              />
                            </div>

                            <button
                              onClick={() => handleSaveProject(proj)}
                              className="px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider bg-[#121212] text-white dark:bg-[#AAFF00] dark:text-black flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-90 transition-opacity shadow-sm flex-shrink-0"
                            >
                              <Save className="w-3.5 h-3.5 stroke-[2.5]" />
                              <span>Save Changes</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => onPlayVideo(currentUrl, currentTitle, isVertical ? '9:16' : '16:9')}
                              className={`px-3 py-2 rounded-xl text-xs font-mono uppercase border transition-colors flex items-center justify-center gap-1 cursor-pointer flex-shrink-0 ${
                                isLight
                                  ? 'bg-white border-[#E2DDD5] hover:bg-[#EFECE6]'
                                  : 'bg-[#161616] border-white/15 hover:bg-white/10'
                              }`}
                              title="Preview video inside player"
                            >
                              <Play className="w-3 h-3 text-[#FF0054]" />
                              <span>Preview</span>
                            </button>
                          </div>
                        </div>

                        {/* Custom Thumbnail Image Input & Manual Upload Bar */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-[#7D766D] dark:text-neutral-400 font-bold flex items-center gap-1.5">
                              <ImageIcon className="w-3 h-3 text-[#AAFF00]" />
                              <span>Custom Thumbnail / Poster Image</span>
                            </label>
                            {editingThumbs[proj.id] && (
                              <span className="text-[10px] font-mono text-emerald-500 font-bold flex items-center gap-1">
                                ✓ Custom image ready (Click Save Changes)
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="relative flex-grow">
                              <input
                                type="text"
                                value={currentThumb}
                                onChange={(e) => handleThumbChange(proj.id, e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSaveProject(proj);
                                }}
                                placeholder="Paste image URL (https://...) or upload image"
                                className={`w-full px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                                  isLight
                                    ? 'bg-[#F7F6F2] border-[#E2DDD5] text-black focus:border-[#121212] focus:bg-white'
                                    : 'bg-[#181818] border-white/15 text-white focus:border-[#AAFF00] focus:bg-[#202020]'
                                }`}
                              />
                            </div>

                            <label className="px-3 py-1.5 rounded-xl text-xs font-mono uppercase font-bold border border-[#E2DDD5] dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-1.5 cursor-pointer flex-shrink-0 transition-colors">
                              <Upload className="w-3.5 h-3.5 text-[#FF0054]" />
                              <span>Upload File</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleImageFileUpload(file, (dataUrl) => {
                                      handleThumbChange(proj.id, dataUrl);
                                      showToast(`🖼️ Thumbnail uploaded! Click "Save Changes" to apply.`);
                                    });
                                  }
                                }}
                              />
                            </label>

                            {parsed.type === 'youtube' && parsed.videoId && (
                              <button
                                type="button"
                                onClick={() => {
                                  const ytThumb = `https://img.youtube.com/vi/${parsed.videoId}/hqdefault.jpg`;
                                  handleThumbChange(proj.id, ytThumb);
                                  showToast(`🎯 Fetched YouTube video thumbnail! Click "Save Changes" to apply.`);
                                }}
                                className="px-3 py-1.5 rounded-xl text-xs font-mono uppercase font-bold border border-red-500/25 text-red-500 hover:bg-red-500/10 flex items-center gap-1.5 cursor-pointer flex-shrink-0 transition-colors"
                                title="Fetch YouTube video thumbnail (first frame or custom upload)"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Fetch YouTube Thumbnail</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* YouTube detection status badge */}
                        <div className="flex items-center gap-2 text-[10px] font-mono">
                          {parsed.type === 'youtube' ? (
                            <span className="text-red-500 font-bold flex items-center gap-1">
                              ● YouTube Video Detected (ID: {parsed.videoId}) — Plays smoothly via embed player
                            </span>
                          ) : parsed.type === 'vimeo' ? (
                            <span className="text-blue-400 font-bold flex items-center gap-1">
                              ● Vimeo Video Detected
                            </span>
                          ) : (
                            <span className="text-[#5E5A53] dark:text-neutral-400">
                              Native / MP4 Video File
                            </span>
                          )}
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: FEATURED SHOWREEL EDITOR */}
        {activeTab === 'showreel' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-b pb-4 border-[#E2DDD5] dark:border-white/10">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF0054]">
                HERO & SHOWCASE
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase tracking-tight mt-1">
                Featured Showreel Video ("Visuals That Speak")
              </h2>
              <p className="text-xs font-mono text-[#5E5A53] dark:text-neutral-400 mt-1">
                This video is showcased in the full-width player right below the hero section.
              </p>
            </div>

            {/* Current Showreel Live Preview */}
            <div className={`p-6 rounded-3xl border ${isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#141414] border-white/10'}`}>
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black mb-6 border border-white/10">
                <img
                  src={tempShowreelThumb || showreelThumbnail}
                  alt="Showreel Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={() => onPlayVideo(tempShowreelUrl || showreelVideoUrl, 'Featured Showreel', '16:9')}
                    className="w-14 h-14 rounded-full bg-[#AAFF00] text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSaveShowreel} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase font-bold tracking-wider mb-2">
                    YouTube Video URL for Showreel
                  </label>
                  <input
                    type="text"
                    value={tempShowreelUrl}
                    onChange={(e) => {
                      setTempShowreelUrl(e.target.value);
                      const p = parseVideoUrl(e.target.value);
                      if (p.type === 'youtube' && p.thumbnailUrl) {
                        setTempShowreelThumb(p.thumbnailUrl);
                      }
                    }}
                    placeholder="e.g. https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/..."
                    className={`w-full px-4 py-3 rounded-xl text-xs font-mono border ${
                      isLight
                        ? 'bg-[#F7F6F2] border-[#E2DDD5] text-black focus:border-[#121212]'
                        : 'bg-[#181818] border-white/15 text-white focus:border-[#AAFF00]'
                    }`}
                  />
                  <p className="text-[11px] font-mono text-[#5E5A53] dark:text-neutral-400 mt-1">
                    Accepts standard YouTube links, Shorts, Vimeo, or direct .mp4 files.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-mono uppercase font-bold tracking-wider">
                      Custom Poster / Thumbnail Image
                    </label>
                    <span className="text-[11px] font-mono text-[#5E5A53] dark:text-neutral-400">
                      Upload from computer or paste image URL
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                        <Link2 className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={tempShowreelThumb}
                        onChange={(e) => setTempShowreelThumb(e.target.value)}
                        placeholder="Paste image URL (https://...) or click Upload File"
                        className={`w-full pl-9 pr-3 py-3 rounded-xl text-xs font-mono border ${
                          isLight
                            ? 'bg-[#F7F6F2] border-[#E2DDD5] text-black focus:border-[#121212]'
                            : 'bg-[#181818] border-white/15 text-white focus:border-[#AAFF00]'
                        }`}
                      />
                    </div>

                    <label className="px-5 py-3 rounded-xl text-xs font-heading font-bold uppercase tracking-wider bg-[#FF0054] text-white hover:bg-[#e0004a] flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all flex-shrink-0">
                      <Upload className="w-4 h-4 stroke-[2.5]" />
                      <span>Upload Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageFileUpload(file, (dataUrl) => {
                              setTempShowreelThumb(dataUrl);
                              showToast('🖼️ Poster image uploaded! Click "Save Showreel Link" to apply.');
                            });
                          }
                        }}
                      />
                    </label>

                    {parseVideoUrl(tempShowreelUrl).type === 'youtube' && parseVideoUrl(tempShowreelUrl).videoId && (
                      <button
                        type="button"
                        onClick={() => {
                          const p = parseVideoUrl(tempShowreelUrl);
                          if (p.videoId) {
                            const ytThumb = `https://img.youtube.com/vi/${p.videoId}/hqdefault.jpg`;
                            setTempShowreelThumb(ytThumb);
                            showToast(`🎯 Fetched YouTube video thumbnail for Showreel!`);
                          }
                        }}
                        className="px-4 py-3 rounded-xl text-xs font-mono uppercase font-bold border border-red-500/25 text-red-500 hover:bg-red-500/10 flex items-center gap-1.5 cursor-pointer shadow-sm transition-all flex-shrink-0"
                        title="Fetch YouTube video thumbnail"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Fetch from YouTube</span>
                      </button>
                    )}
                  </div>

                  {tempShowreelThumb && (
                    <div className="mt-3 flex items-center gap-3">
                      <div className="w-20 h-12 rounded-lg overflow-hidden border border-[#E2DDD5] dark:border-white/10 bg-black flex-shrink-0">
                        <img src={tempShowreelThumb} alt="Showreel poster preview" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[11px] font-mono text-emerald-500 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Custom Poster Image Ready
                      </span>
                      <button
                        type="button"
                        onClick={() => setTempShowreelThumb('')}
                        className="text-[10px] font-mono text-red-500 underline ml-auto cursor-pointer"
                      >
                        Reset to Default
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full text-xs font-heading font-bold uppercase tracking-wider bg-[#FF0054] text-white hover:bg-[#e0004a] flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Save className="w-4 h-4 stroke-[2.5]" />
                    <span>Save Showreel Link</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onPlayVideo(tempShowreelUrl || showreelVideoUrl, 'Featured Showreel', '16:9')}
                    className={`px-5 py-3 rounded-full text-xs font-heading font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${
                      isLight
                        ? 'bg-white border-[#E2DDD5] hover:bg-[#EFECE6]'
                        : 'bg-[#161616] border-white/15 hover:bg-white/10'
                    }`}
                  >
                    Test Play
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 5: ADD NEW VIDEO FORM */}
        {activeTab === 'add' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border-b pb-4 border-[#E2DDD5] dark:border-white/10">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF0054]">
                EXPAND PORTFOLIO
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase tracking-tight mt-1">
                Add New Video Ad to Portfolio
              </h2>
              <p className="text-xs font-mono text-[#5E5A53] dark:text-neutral-400 mt-1">
                Add a 9:16 vertical reel or a 16:9 cinematic widescreen commercial using any YouTube link.
              </p>
            </div>

            <form onSubmit={handleCreateNewVideo} className={`p-6 sm:p-8 rounded-3xl border space-y-5 ${
              isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#141414] border-white/10'
            }`}>
              
              <div>
                <label className="block text-xs font-mono uppercase font-bold tracking-wider mb-2">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Nike Cyberpunk: Zero Gravity Ad"
                  className={`w-full px-4 py-3 rounded-xl text-xs font-mono border ${
                    isLight ? 'bg-[#F7F6F2] border-[#E2DDD5] text-black' : 'bg-[#181818] border-white/15 text-white'
                  }`}
                />
              </div>

              {/* Format Switcher: 9:16 vs 16:9 */}
              <div>
                <label className="block text-xs font-mono uppercase font-bold tracking-wider mb-2">
                  Video Format *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewFormat('9:16')}
                    className={`p-3.5 rounded-2xl border text-xs font-mono uppercase font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      newFormat === '9:16'
                        ? 'bg-[#FF0054] text-white border-[#FF0054] shadow-md'
                        : isLight
                        ? 'bg-[#F7F6F2] border-[#E2DDD5]'
                        : 'bg-[#181818] border-white/10 text-neutral-400'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>9:16 Vertical Reel</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewFormat('16:9')}
                    className={`p-3.5 rounded-2xl border text-xs font-mono uppercase font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      newFormat === '16:9'
                        ? 'bg-[#121212] text-white dark:bg-[#AAFF00] dark:text-black border-transparent shadow-md'
                        : isLight
                        ? 'bg-[#F7F6F2] border-[#E2DDD5]'
                        : 'bg-[#181818] border-white/10 text-neutral-400'
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                    <span>16:9 Cinema Widescreen</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase font-bold tracking-wider mb-2">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as ProjectCategory)}
                  className={`w-full px-4 py-3 rounded-xl text-xs font-mono border ${
                    isLight ? 'bg-[#F7F6F2] border-[#E2DDD5] text-black' : 'bg-[#181818] border-white/15 text-white'
                  }`}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase font-bold tracking-wider mb-2">
                  YouTube / Video URL *
                </label>
                <input
                  type="text"
                  required
                  value={newVideoUrl}
                  onChange={(e) => {
                    setNewVideoUrl(e.target.value);
                    const p = parseVideoUrl(e.target.value);
                    if (p.type === 'youtube' && p.thumbnailUrl && !newThumbnail) {
                      setNewThumbnail(p.thumbnailUrl);
                    }
                  }}
                  placeholder="https://www.youtube.com/watch?v=... or https://youtube.com/shorts/..."
                  className={`w-full px-4 py-3 rounded-xl text-xs font-mono border ${
                    isLight ? 'bg-[#F7F6F2] border-[#E2DDD5] text-black' : 'bg-[#181818] border-white/15 text-white'
                  }`}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-mono uppercase font-bold tracking-wider">
                    Thumbnail Image (Auto-fetched from YouTube or Upload)
                  </label>
                  <span className="text-[11px] font-mono text-[#5E5A53] dark:text-neutral-400">
                    Upload from computer or paste image URL
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      value={newThumbnail}
                      onChange={(e) => setNewThumbnail(e.target.value)}
                      placeholder="https://... or click Upload Image"
                      className={`w-full px-4 py-3 rounded-xl text-xs font-mono border ${
                        isLight ? 'bg-[#F7F6F2] border-[#E2DDD5] text-black' : 'bg-[#181818] border-white/15 text-white'
                      }`}
                    />
                  </div>

                  <label className="px-5 py-3 rounded-xl text-xs font-heading font-bold uppercase tracking-wider bg-[#121212] text-white dark:bg-[#AAFF00] dark:text-black hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all flex-shrink-0">
                    <Upload className="w-4 h-4 stroke-[2.5]" />
                    <span>Upload Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageFileUpload(file, (dataUrl) => {
                            setNewThumbnail(dataUrl);
                            showToast('🖼️ Custom thumbnail image loaded!');
                          });
                        }
                      }}
                    />
                  </label>
                </div>

                {newThumbnail && (
                  <div className="mt-3 flex items-center gap-3">
                    <div className="w-20 h-12 rounded-lg overflow-hidden border border-[#E2DDD5] dark:border-white/10 bg-black flex-shrink-0">
                      <img src={newThumbnail} alt="Thumbnail preview" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[11px] font-mono text-emerald-500 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Thumbnail Image Loaded
                    </span>
                    <button
                      type="button"
                      onClick={() => setNewThumbnail('')}
                      className="text-[10px] font-mono text-red-500 underline ml-auto cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase font-bold tracking-wider mb-2">
                  Short Description
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="A cinematic story exploring luxury aesthetics, micro fluid simulations, and high retention pacing..."
                  className={`w-full px-4 py-3 rounded-xl text-xs font-mono border ${
                    isLight ? 'bg-[#F7F6F2] border-[#E2DDD5] text-black' : 'bg-[#181818] border-white/15 text-white'
                  }`}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full text-xs font-heading font-bold uppercase tracking-wider bg-[#FF0054] text-white hover:bg-[#e0004a] flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Publish New Video to Website</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TAB 6: BACKUP & EXPORT */}
        {activeTab === 'export' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border-b pb-4 border-[#E2DDD5] dark:border-white/10">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF0054]">
                STORAGE & BACKUP
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase tracking-tight mt-1">
                Data Persistence & Permanent Code Export
              </h2>
              <p className="text-xs font-mono text-[#5E5A53] dark:text-neutral-400 mt-1">
                Your video links are automatically saved in browser storage. You can also copy your projects as JSON to update `projects.ts` permanently.
              </p>
            </div>

            <div className={`p-6 rounded-3xl border space-y-4 ${
              isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#141414] border-white/10'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-sm uppercase">
                  Export Projects Configuration
                </span>
                <button
                  onClick={handleCopyCode}
                  className="px-4 py-2 rounded-xl text-xs font-mono uppercase bg-[#121212] text-white dark:bg-[#AAFF00] dark:text-black flex items-center gap-1.5 cursor-pointer font-bold"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy JSON'}</span>
                </button>
              </div>

              <textarea
                readOnly
                value={exportProjectsJSON()}
                rows={10}
                className={`w-full p-3 rounded-xl text-[11px] font-mono border select-all ${
                  isLight ? 'bg-[#F7F6F2] border-[#E2DDD5] text-black' : 'bg-[#181818] border-white/15 text-neutral-300'
                }`}
              />

              <div className="pt-4 border-t border-[#E2DDD5] dark:border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-sm uppercase text-red-500">
                    Reset Portfolio
                  </h4>
                  <p className="text-xs font-mono text-[#5E5A53] dark:text-neutral-400">
                    Revert all video links and showcase projects back to default factory settings.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to reset all projects and showreel to default?')) {
                      resetProjects();
                      showToast('🔄 Portfolio reset to original defaults');
                    }
                  }}
                  className="px-4 py-2 rounded-full text-xs font-mono uppercase border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                >
                  Reset Defaults
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Change Admin Credentials Modal */}
      {isCredsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div
            className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl transition-colors ${
              isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#141414] border-white/20'
            }`}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2DDD5] dark:border-white/10">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#AAFF00]" />
                <span className="font-heading font-bold text-sm uppercase">Change Administrator Login</span>
              </div>
              <button
                type="button"
                onClick={() => setIsCredsModalOpen(false)}
                className="text-xs font-mono text-neutral-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNewCredentials} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase font-bold mb-1">
                  New Administrator User ID
                </label>
                <input
                  type="text"
                  value={newUserId}
                  onChange={(e) => setNewUserId(e.target.value)}
                  placeholder="e.g. admin or harsh"
                  required
                  className={`w-full px-3 py-2 text-xs font-mono rounded-lg border outline-none ${
                    isLight ? 'bg-[#F7F6F2] border-[#E2DDD5]' : 'bg-[#1E1E1E] border-white/10 text-white'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase font-bold mb-1">
                  New Password
                </label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  className={`w-full px-3 py-2 text-xs font-mono rounded-lg border outline-none ${
                    isLight ? 'bg-[#F7F6F2] border-[#E2DDD5]' : 'bg-[#1E1E1E] border-white/10 text-white'
                  }`}
                />
                <p className="mt-1 text-[10px] font-mono text-neutral-400">
                  Credentials are saved locally in your browser storage.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCredsModalOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-mono uppercase border cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full text-xs font-heading font-bold uppercase bg-[#FF0054] text-white hover:bg-[#e0004a] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Credentials</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};