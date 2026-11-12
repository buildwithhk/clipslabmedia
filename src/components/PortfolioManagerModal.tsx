import React, { useState } from 'react';
import { X, Plus, Trash2, ArrowUp, ArrowDown, Edit2, Upload, Check, Download, RotateCcw, Film, Smartphone, Monitor } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectCategory, ProjectItem, VideoFormat } from '../types';
import { useTheme } from '../context/ThemeContext';
import { parseVideoUrl } from '../utils/videoUtils';

interface PortfolioManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES: ProjectCategory[] = [
  'AI Commercials & Advertisements',
  'Product Films',
  'Cinematic Brand Films',
  'AI Filmmaking Experiments',
  'Short Films & Microdramas',
  'Social Media Creatives',
];

export const PortfolioManagerModal: React.FC<PortfolioManagerModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { projects, addProject, updateProject, deleteProject, moveProject, resetProjects, exportProjectsJSON, importProjectsJSON } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'manage' | 'add' | 'backup'>('manage');
  const [filterFormat, setFilterFormat] = useState<'all' | '16:9' | '9:16'>('all');
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [format, setFormat] = useState<VideoFormat>('16:9');
  const [category, setCategory] = useState<ProjectCategory>('AI Commercials & Advertisements');
  const [year, setYear] = useState('2026');
  const [shortDescription, setShortDescription] = useState('');
  const [creativeConcept, setCreativeConcept] = useState('');
  const [productionApproach, setProductionApproach] = useState('');
  const [toolsInput, setToolsInput] = useState('Kling AI, Google Flow, Adobe Premiere Pro');
  const [role, setRole] = useState('Founder, Creative Director & AI Filmmaker — Harsh Kumar');
  const [videoUrl, setVideoUrl] = useState('/assets/sample-reel.mp4');
  const [thumbnailUrl, setThumbnailUrl] = useState('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1400&auto=format&fit=crop');
  const [importText, setImportText] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3500);
  };

  const handleStartEdit = (proj: ProjectItem) => {
    setEditingProjectId(proj.id);
    setTitle(proj.title);
    setFormat(proj.format || (proj.aspectRatio === '9:16' || proj.aspectRatio === 'portrait' ? '9:16' : '16:9'));
    setCategory(proj.category);
    setYear(proj.year || '2026');
    setShortDescription(proj.shortDescription);
    setCreativeConcept(proj.creativeConcept || '');
    setProductionApproach(proj.productionApproach || '');
    setToolsInput(proj.toolsUsed.join(', '));
    setRole(proj.role || 'Founder, Creative Director & AI Filmmaker — Harsh Kumar');
    setVideoUrl(proj.fullVideoUrl || proj.videoPreviewUrl);
    setThumbnailUrl(proj.thumbnail);
    setActiveTab('add');
  };

  const handleResetForm = () => {
    setEditingProjectId(null);
    setTitle('');
    setFormat('16:9');
    setCategory('AI Commercials & Advertisements');
    setYear('2026');
    setShortDescription('');
    setCreativeConcept('');
    setProductionApproach('');
    setToolsInput('Kling AI, Google Flow, Adobe Premiere Pro');
    setRole('Founder, Creative Director & AI Filmmaker — Harsh Kumar');
    setVideoUrl('/assets/sample-reel.mp4');
    setThumbnailUrl('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1400&auto=format&fit=crop');
  };

  const handleVideoUrlChange = (val: string) => {
    setVideoUrl(val);
    const parsed = parseVideoUrl(val);
    if (parsed.type === 'youtube') {
      showNotification('YouTube URL detected! Will play via cinematic YouTube embed.');
      if (parsed.thumbnailUrl && (!thumbnailUrl || thumbnailUrl.includes('unsplash') || thumbnailUrl.includes('sample'))) {
        setThumbnailUrl(parsed.thumbnailUrl);
      }
    } else if (parsed.type === 'vimeo') {
      showNotification('Vimeo URL detected! Will play via Vimeo embed.');
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !shortDescription.trim()) {
      showNotification('Please fill in at least the Title and Short Description.');
      return;
    }

    const toolsUsed = toolsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingProjectId) {
      updateProject(editingProjectId, {
        title,
        format,
        aspectRatio: format,
        category,
        year,
        shortDescription,
        creativeConcept,
        productionApproach,
        toolsUsed,
        role,
        fullVideoUrl: videoUrl,
        videoPreviewUrl: videoUrl,
        thumbnail: thumbnailUrl,
      });
      showNotification(`Updated project: "${title}" (${format})`);
    } else {
      addProject({
        title,
        format,
        aspectRatio: format,
        category,
        year,
        shortDescription,
        creativeConcept,
        productionApproach,
        toolsUsed,
        role,
        fullVideoUrl: videoUrl,
        videoPreviewUrl: videoUrl,
        thumbnail: thumbnailUrl,
        featured: false,
      });
      showNotification(`Added new project: "${title}" (${format})`);
    }

    handleResetForm();
    setActiveTab('manage');
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setThumbnailUrl(reader.result);
          showNotification('Thumbnail image loaded from local file.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objUrl = URL.createObjectURL(file);
      setVideoUrl(objUrl);
      showNotification('Local video file selected for playback.');
    }
  };

  // Filtered projects for the Manage list
  const displayedProjects = filterFormat === 'all'
    ? projects
    : projects.filter((p) => {
        const itemFormat = p.format || (p.aspectRatio === '9:16' || p.aspectRatio === 'portrait' ? '9:16' : '16:9');
        return itemFormat === filterFormat;
      });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div
        className={`relative w-full max-w-4xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10 transition-colors ${
          isLight ? 'bg-[#F7F6F2] text-[#121212] border border-[#E2DDD5]' : 'bg-[#121212] text-white border border-white/15'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E2DDD5] dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Film className="w-5 h-5 text-[#FF0054]" />
            <div>
              <h2 className="font-heading font-extrabold text-base sm:text-lg uppercase tracking-tight">
                Portfolio Management System
              </h2>
              <p className="text-[10px] font-mono text-[#5E5A53] dark:text-neutral-400">
                Manage 16:9 Widescreen & 9:16 Vertical Video Formats
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full border border-[#E2DDD5] dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-white/10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center px-6 pt-3 border-b border-[#E2DDD5] dark:border-white/10 gap-4 text-xs font-mono uppercase">
          <button
            onClick={() => setActiveTab('manage')}
            className={`pb-2.5 border-b-2 font-bold cursor-pointer transition-colors ${
              activeTab === 'manage'
                ? isLight
                  ? 'border-[#121212] text-[#121212]'
                  : 'border-[#AAFF00] text-[#AAFF00]'
                : 'border-transparent text-[#5E5A53] dark:text-neutral-400'
            }`}
          >
            All Projects ({projects.length})
          </button>

          <button
            onClick={() => {
              handleResetForm();
              setActiveTab('add');
            }}
            className={`pb-2.5 border-b-2 font-bold cursor-pointer transition-colors ${
              activeTab === 'add'
                ? isLight
                  ? 'border-[#121212] text-[#121212]'
                  : 'border-[#AAFF00] text-[#AAFF00]'
                : 'border-transparent text-[#5E5A53] dark:text-neutral-400'
            }`}
          >
            {editingProjectId ? 'Edit Project' : '+ Add New Project'}
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`pb-2.5 border-b-2 font-bold cursor-pointer transition-colors ${
              activeTab === 'backup'
                ? isLight
                  ? 'border-[#121212] text-[#121212]'
                  : 'border-[#AAFF00] text-[#AAFF00]'
                : 'border-transparent text-[#5E5A53] dark:text-neutral-400'
            }`}
          >
            JSON Backup / Restore
          </button>
        </div>

        {/* Notification Pill */}
        {message && (
          <div className="bg-[#AAFF00] text-[#080808] px-4 py-2 text-xs font-mono font-bold text-center flex items-center justify-center gap-2">
            <Check className="w-3.5 h-3.5" />
            <span>{message}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">
          
          {/* TAB 1: ALL PROJECTS LIST & ORDERING */}
          {activeTab === 'manage' && (
            <div className="space-y-4">
              {/* Format Filter Bar within Management Modal */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2DDD5]/60 dark:border-white/10">
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-200/60 dark:bg-[#1C1C1C] border border-[#E2DDD5] dark:border-white/10 text-xs font-mono">
                  <button
                    onClick={() => setFilterFormat('9:16')}
                    className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                      filterFormat === '9:16'
                        ? isLight
                          ? 'bg-white text-black font-bold shadow-xs'
                          : 'bg-[#AAFF00] text-black font-bold'
                        : 'text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>9:16 Vertical</span>
                  </button>
                  <button
                    onClick={() => setFilterFormat('16:9')}
                    className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                      filterFormat === '16:9'
                        ? isLight
                          ? 'bg-white text-black font-bold shadow-xs'
                          : 'bg-[#AAFF00] text-black font-bold'
                        : 'text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>16:9 Widescreen</span>
                  </button>
                  <button
                    onClick={() => setFilterFormat('all')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      filterFormat === 'all'
                        ? isLight
                          ? 'bg-white text-black font-bold shadow-xs'
                          : 'bg-[#AAFF00] text-black font-bold'
                        : 'text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    All ({projects.length})
                  </button>
                </div>

                <button
                  onClick={() => {
                    handleResetForm();
                    setActiveTab('add');
                  }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-heading font-bold uppercase bg-[#121212] text-white dark:bg-[#AAFF00] dark:text-black flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3 h-3" />
                  <span>New Project</span>
                </button>
              </div>

              {/* Projects List */}
              <div className="space-y-2">
                {displayedProjects.map((proj, idx) => {
                  const projFormat = proj.format || (proj.aspectRatio === '9:16' || proj.aspectRatio === 'portrait' ? '9:16' : '16:9');
                  return (
                    <div
                      key={proj.id}
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                        isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#181818] border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Thumbnail with ratio indicator */}
                        <div className={`rounded-md overflow-hidden bg-neutral-800 flex-shrink-0 relative ${
                          projFormat === '9:16' ? 'w-10 h-14' : 'w-14 h-10'
                        }`}>
                          <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-heading font-bold text-sm truncate">{proj.title}</p>
                            <span className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded ${
                              projFormat === '9:16'
                                ? 'bg-[#FF0054] text-white'
                                : 'bg-[#121212] text-white dark:bg-white/20'
                            }`}>
                              {projFormat}
                            </span>
                          </div>
                          <p className="text-[11px] font-mono text-[#5E5A53] dark:text-neutral-400 truncate">
                            {proj.category} • {proj.year || '2026'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {/* Move Up */}
                        <button
                          onClick={() => moveProject(idx, idx - 1)}
                          disabled={idx === 0}
                          className="p-1.5 rounded border border-[#E2DDD5] dark:border-white/10 disabled:opacity-30 cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>

                        {/* Move Down */}
                        <button
                          onClick={() => moveProject(idx, idx + 1)}
                          disabled={idx === displayedProjects.length - 1}
                          className="p-1.5 rounded border border-[#E2DDD5] dark:border-white/10 disabled:opacity-30 cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => handleStartEdit(proj)}
                          className="p-1.5 rounded border border-[#E2DDD5] dark:border-white/10 hover:bg-[#FF0054] hover:text-white cursor-pointer"
                          title="Edit Project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete project "${proj.title}"?`)) {
                              deleteProject(proj.id);
                              showNotification('Project deleted.');
                            }
                          }}
                          className="p-1.5 rounded border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: ADD / EDIT FORM */}
          {activeTab === 'add' && (
            <form onSubmit={handleSaveProject} className="space-y-4">
              
              {/* Row 1: Title + Format Selector */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-7">
                  <label className="block text-xs font-mono uppercase mb-1 font-bold">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Celestial Essence Commercial"
                    className={`w-full px-3 py-2 text-xs font-mono rounded-lg border outline-none ${
                      isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#1C1C1C] border-white/15 text-white'
                    }`}
                  />
                </div>

                {/* Video Format (16:9 vs 9:16) */}
                <div className="md:col-span-5">
                  <label className="block text-xs font-mono uppercase mb-1 font-bold">
                    Video Format / Aspect Ratio *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormat('16:9')}
                      className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-mono font-bold transition-all cursor-pointer ${
                        format === '16:9'
                          ? isLight
                            ? 'bg-[#121212] text-white border-[#121212] shadow-sm'
                            : 'bg-[#AAFF00] text-[#080808] border-[#AAFF00]'
                          : 'bg-white dark:bg-[#1C1C1C] border-[#E2DDD5] dark:border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>16:9 Widescreen</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormat('9:16')}
                      className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-mono font-bold transition-all cursor-pointer ${
                        format === '9:16'
                          ? isLight
                            ? 'bg-[#121212] text-white border-[#121212] shadow-sm'
                            : 'bg-[#AAFF00] text-[#080808] border-[#AAFF00]'
                          : 'bg-white dark:bg-[#1C1C1C] border-[#E2DDD5] dark:border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>9:16 Vertical</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 2: Category + Year + Role */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6">
                  <label className="block text-xs font-mono uppercase mb-1 font-bold">Portfolio Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                    className={`w-full px-3 py-2 text-xs font-mono rounded-lg border outline-none ${
                      isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#1C1C1C] border-white/15 text-white'
                    }`}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-mono uppercase mb-1 font-bold">Year</label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="2026"
                    className={`w-full px-3 py-2 text-xs font-mono rounded-lg border outline-none ${
                      isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#1C1C1C] border-white/15 text-white'
                    }`}
                  />
                </div>

                <div className="md:col-span-4">
                  <label className="block text-xs font-mono uppercase mb-1 font-bold">My Role in Project</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Founder, Creative Director & AI Filmmaker — Harsh Kumar"
                    className={`w-full px-3 py-2 text-xs font-mono rounded-lg border outline-none ${
                      isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#1C1C1C] border-white/15 text-white'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase mb-1 font-bold">Short Description *</label>
                <input
                  type="text"
                  required
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="One sentence summary of the project..."
                  className={`w-full px-3 py-2 text-xs font-mono rounded-lg border outline-none ${
                    isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#1C1C1C] border-white/15 text-white'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase mb-1 font-bold">Creative Concept</label>
                  <textarea
                    rows={3}
                    value={creativeConcept}
                    onChange={(e) => setCreativeConcept(e.target.value)}
                    placeholder="Underlying idea, visual metaphors and inspiration..."
                    className={`w-full px-3 py-2 text-xs font-mono rounded-lg border outline-none ${
                      isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#1C1C1C] border-white/15 text-white'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase mb-1 font-bold">Production Approach</label>
                  <textarea
                    rows={3}
                    value={productionApproach}
                    onChange={(e) => setProductionApproach(e.target.value)}
                    placeholder="AI models used, camera motion and editing details..."
                    className={`w-full px-3 py-2 text-xs font-mono rounded-lg border outline-none ${
                      isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#1C1C1C] border-white/15 text-white'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase mb-1 font-bold">Tools and Models Used (Comma Separated)</label>
                <input
                  type="text"
                  value={toolsInput}
                  onChange={(e) => setToolsInput(e.target.value)}
                  placeholder="Kling AI, Google Flow, Seedance, Adobe Premiere Pro, ElevenLabs"
                  className={`w-full px-3 py-2 text-xs font-mono rounded-lg border outline-none ${
                    isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#1C1C1C] border-white/15 text-white'
                  }`}
                />
              </div>

              {/* Video & Thumbnail URLs or Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl border border-dashed border-[#E2DDD5] dark:border-white/15">
                <div>
                  <label className="block text-xs font-mono uppercase mb-1 font-bold">
                    Video URL (YouTube, Vimeo, or MP4) *
                  </label>
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => handleVideoUrlChange(e.target.value)}
                    placeholder="https://youtube.com/watch?v=... or /assets/video.mp4"
                    className={`w-full px-3 py-2 text-xs font-mono rounded-lg border outline-none mb-2 ${
                      isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#1C1C1C] border-white/15 text-white'
                    }`}
                  />
                  <label className="cursor-pointer text-[11px] font-mono flex items-center gap-1.5 text-[#FF0054] hover:underline">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload local video file</span>
                    <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase mb-1 font-bold">Thumbnail URL or Local File</label>
                  <input
                    type="text"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... or auto-filled"
                    className={`w-full px-3 py-2 text-xs font-mono rounded-lg border outline-none mb-2 ${
                      isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#1C1C1C] border-white/15 text-white'
                    }`}
                  />
                  <label className="cursor-pointer text-[11px] font-mono flex items-center gap-1.5 text-[#FF0054] hover:underline">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload local thumbnail image</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailUpload} />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    handleResetForm();
                    setActiveTab('manage');
                  }}
                  className="px-4 py-2 rounded-full text-xs font-mono uppercase border cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-heading font-bold uppercase bg-[#121212] text-white dark:bg-[#AAFF00] dark:text-black flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingProjectId ? 'Update Project' : 'Add Project to Portfolio'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: BACKUP / JSON RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-4 text-xs font-mono">
              <div>
                <p className="font-bold uppercase text-sm mb-1">Export Portfolio Data</p>
                <p className="text-[#5E5A53] dark:text-neutral-400 mb-2">
                  Copy this JSON to back up all your project descriptions, video links, formats, and order.
                </p>
                <textarea
                  readOnly
                  rows={6}
                  value={exportProjectsJSON()}
                  className={`w-full p-3 rounded-lg border font-mono text-[11px] outline-none ${
                    isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#1C1C1C] border-white/15 text-white'
                  }`}
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(exportProjectsJSON());
                    showNotification('Portfolio JSON copied to clipboard!');
                  }}
                  className="mt-2 px-4 py-2 rounded-full border border-[#E2DDD5] dark:border-white/10 uppercase font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Copy JSON to Clipboard</span>
                </button>
              </div>

              <div className="pt-4 border-t border-[#E2DDD5] dark:border-white/10">
                <p className="font-bold uppercase text-sm mb-1">Restore From JSON</p>
                <textarea
                  rows={4}
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Paste JSON array of projects here..."
                  className={`w-full p-3 rounded-lg border font-mono text-[11px] outline-none ${
                    isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#1C1C1C] border-white/15 text-white'
                  }`}
                />
                <button
                  onClick={() => {
                    if (importProjectsJSON(importText)) {
                      showNotification('Portfolio successfully imported and updated!');
                      setImportText('');
                      setActiveTab('manage');
                    } else {
                      showNotification('Invalid JSON format. Please verify the structure.');
                    }
                  }}
                  className="mt-2 px-4 py-2 rounded-full bg-[#121212] text-white dark:bg-[#AAFF00] dark:text-black uppercase font-bold cursor-pointer"
                >
                  Apply Imported JSON
                </button>
              </div>

              <div className="pt-4 border-t border-[#E2DDD5] dark:border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-bold uppercase text-red-500">Reset to Initial Default Portfolio</p>
                  <p className="text-[#5E5A53] dark:text-neutral-400">Restores all original sample spec films.</p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Reset all portfolio projects to factory defaults?')) {
                      resetProjects();
                      showNotification('Portfolio reset to default state.');
                      setActiveTab('manage');
                    }
                  }}
                  className="px-4 py-2 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white uppercase font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
