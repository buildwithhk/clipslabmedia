import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Mail, Copy, Check } from 'lucide-react';
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from './SocialIcons';
import { useTheme } from '../context/ThemeContext';
import { PROJECT_TYPES, STUDIO_CONTACT_EMAIL } from '../config/contact';
import { useInquiryForm } from '../hooks/useInquiryForm';
import { InquiryErrorBanner } from './InquiryErrorBanner';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialPath?: string;
}

export const ContactFormModal: React.FC<ContactFormModalProps> = ({
  isOpen,
  onClose,
  initialService = '',
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const {
    name,
    setName,
    email,
    setEmail,
    company,
    setCompany,
    projectType,
    setProjectType,
    brief,
    setBrief,
    honeypot,
    setHoneypot,
    isSubmitting,
    isSubmitted,
    submittedName,
    errorMessage,
    resetSubmissionState,
    handleSubmit,
  } = useInquiryForm({
    source: 'Project Brief Modal',
    initialService,
    confettiOriginY: 0.6,
  });

  const [copiedEmail, setCopiedEmail] = useState(false);

  const directEmail = STUDIO_CONTACT_EMAIL;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      resetSubmissionState();
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-4 border flex flex-col transition-colors ${
          isLight
            ? 'bg-[#F7F6F2] text-[#121212] border-[#E2DDD5]'
            : 'bg-[#121212] text-white border-white/15'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-[#E2DDD5] dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF0054]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#5E5A53] dark:text-neutral-400">
              COLLABORATION BRIEF // CLIPSLAB MEDIA
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[80vh]">
          {isSubmitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#AAFF00] text-[#080808] flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="font-heading font-extrabold text-2xl uppercase tracking-tight">
                Brief Sent to Harsh Kumar
              </h3>
              <p className={`text-sm max-w-md mx-auto leading-relaxed ${isLight ? 'text-[#5E5A53]' : 'text-neutral-300'}`}>
                Thank you, <span className="font-bold">{submittedName}</span>. Harsh will review your project requirements and get in touch within 1 business day.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-full text-xs font-mono uppercase bg-[#121212] text-white dark:bg-[#AAFF00] dark:text-black cursor-pointer font-bold"
              >
                Close Window
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase tracking-tight">
                  LET'S CREATE SOMETHING<span className="text-[#FF0054]">.</span>
                </h3>
                <p className={`mt-1.5 text-xs sm:text-sm leading-relaxed ${isLight ? 'text-[#5E5A53]' : 'text-neutral-400'}`}>
                  Tell me about your product, brand or creative vision. Let's make something worth watching.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase mb-1 font-bold">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm font-sans rounded-xl border outline-none ${
                        isLight ? 'bg-white border-[#E2DDD5] focus:border-[#121212]' : 'bg-[#181818] border-white/10 text-white focus:border-[#AAFF00]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase mb-1 font-bold">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@brand.com"
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm font-sans rounded-xl border outline-none ${
                        isLight ? 'bg-white border-[#E2DDD5] focus:border-[#121212]' : 'bg-[#181818] border-white/10 text-white focus:border-[#AAFF00]'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase mb-1 font-bold">
                      Company / Brand <span className="font-normal text-[10px] lowercase">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Lumina Fragrances"
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm font-sans rounded-xl border outline-none ${
                        isLight ? 'bg-white border-[#E2DDD5] focus:border-[#121212]' : 'bg-[#181818] border-white/10 text-white focus:border-[#AAFF00]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase mb-1 font-bold">Project Type</label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm font-sans rounded-xl border outline-none ${
                        isLight ? 'bg-white border-[#E2DDD5] focus:border-[#121212]' : 'bg-[#181818] border-white/10 text-white focus:border-[#AAFF00]'
                      }`}
                    >
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase mb-1 font-bold">
                    Project Brief & Vision *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="Describe your product, desired visual tone, reference films, and timeline expectations..."
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm font-sans rounded-xl border outline-none ${
                      isLight ? 'bg-white border-[#E2DDD5] focus:border-[#121212]' : 'bg-[#181818] border-white/10 text-white focus:border-[#AAFF00]'
                    }`}
                  />
                </div>

                {errorMessage && (
                  <InquiryErrorBanner
                    message={errorMessage}
                    name={name}
                    email={email}
                    company={company}
                    projectType={projectType}
                    brief={brief}
                  />
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 px-6 rounded-full text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                    isLight
                      ? 'bg-[#121212] text-white hover:bg-[#262626] shadow-md'
                      : 'bg-[#AAFF00] text-[#080808] hover:bg-[#B8FF1F] shadow-glow-lime'
                  }`}
                >
                  {isSubmitting ? (
                    <span>Submitting Brief...</span>
                  ) : (
                    <>
                      <span>Send Project Brief to Harsh</span>
                      <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </form>

              {/* Direct Reach Strip */}
              <div className="mt-6 pt-5 border-t border-[#E2DDD5] dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#FF0054]" />
                  <span>{directEmail}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 hover:bg-neutral-200 dark:hover:bg-white/10 rounded cursor-pointer"
                    title="Copy email"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href="https://instagram.com/clipslab.media"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 hover:text-[#FF0054]"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/clipslabmedia"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 hover:text-[#638AFF]"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://youtube.com/@harsh.aifmve?si=9m6ZnokUic9S8U4f"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 hover:text-red-500"
                  >
                    <YoutubeIcon className="w-3.5 h-3.5" />
                    <span>YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
