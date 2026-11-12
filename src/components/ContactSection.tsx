import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, ArrowUpRight, Copy, Check } from 'lucide-react';
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from './SocialIcons';
import { useTheme } from '../context/ThemeContext';
import { PROJECT_TYPES, STUDIO_CONTACT_EMAIL } from '../config/contact';
import { useInquiryForm } from '../hooks/useInquiryForm';
import { InquiryErrorBanner } from './InquiryErrorBanner';

export const ContactSection: React.FC = () => {
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
    source: 'Contact Section',
    confettiOriginY: 0.7,
  });

  const [copiedEmail, setCopiedEmail] = useState(false);

  const directEmail = STUDIO_CONTACT_EMAIL;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section
      id="contact-section"
      className={`py-8 sm:py-10 lg:py-12 border-b transition-colors duration-200 relative ${
        isLight ? 'bg-[#EFECE6] border-[#E2DDD5] text-[#121212]' : 'bg-[#0A0A0A] border-white/10 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-6">
          <div>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-bold mb-3 sm:mb-4 border ${
                isLight
                  ? 'bg-[#FFFFFF] border-[#E2DDD5] text-[#121212]'
                  : 'bg-[#161616] border-white/10 text-[#AAFF00]'
              }`}
            >
              <span>INITIATE COLLABORATION</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] uppercase flex flex-col items-start">
              <span>HAVE AN IDEA?</span>
              <span className="font-editorial-serif italic font-normal lowercase tracking-normal text-[#FF0054] my-0.5 sm:my-1">
                let's bring it
              </span>
              <span>
                to life<span className="text-[#FF0054]">.</span>
              </span>
            </h2>
          </div>

          <p
            className={`max-w-md text-xs sm:text-sm md:text-base leading-relaxed ${
              isLight ? 'text-[#5E5A53]' : 'text-neutral-400'
            }`}
          >
            Whether you're a brand looking for cinematic content, an agency seeking creative production support, or a founder with an interesting idea, let's create something worth watching.
          </p>
        </div>

        {/* 2-Column Grid: Form + Direct Links (Height-aligned on both sides) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Functional Brief Form */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              className={`p-6 sm:p-8 rounded-3xl border shadow-film transition-colors flex-1 flex flex-col justify-between ${
                isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#121212] border-white/10'
              }`}
            >
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 my-auto">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#AAFF00] text-[#080808] flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl uppercase tracking-tight">
                    Brief Received!
                  </h3>
                  <p className={`text-sm max-w-md mx-auto leading-relaxed ${isLight ? 'text-[#5E5A53]' : 'text-neutral-300'}`}>
                    Thank you, <span className="font-bold">{submittedName}</span>. Harsh will review your project brief and respond within 1 business day with creative direction ideas and scope estimation.
                  </p>
                  <button
                    onClick={resetSubmissionState}
                    className="mt-4 px-6 py-2.5 rounded-full text-xs font-mono uppercase border border-[#E2DDD5] dark:border-white/10 hover:border-[#121212] cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
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
                  <div className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-mono uppercase mb-1.5 font-bold">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          className={`w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-sans rounded-xl border outline-none transition-colors ${
                            isLight
                              ? 'bg-[#F7F6F2] border-[#E2DDD5] focus:border-[#121212]'
                              : 'bg-[#181818] border-white/10 text-white focus:border-[#AAFF00]'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase mb-1.5 font-bold">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@brand.com"
                          className={`w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-sans rounded-xl border outline-none transition-colors ${
                            isLight
                              ? 'bg-[#F7F6F2] border-[#E2DDD5] focus:border-[#121212]'
                              : 'bg-[#181818] border-white/10 text-white focus:border-[#AAFF00]'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-mono uppercase mb-1.5 font-bold">
                          Company / Brand <span className="text-[10px] font-normal lowercase">(optional)</span>
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="e.g. Lumina Studios"
                          className={`w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-sans rounded-xl border outline-none transition-colors ${
                            isLight
                              ? 'bg-[#F7F6F2] border-[#E2DDD5] focus:border-[#121212]'
                              : 'bg-[#181818] border-white/10 text-white focus:border-[#AAFF00]'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase mb-1.5 font-bold">
                          Project Type
                        </label>
                        <select
                          value={projectType}
                          onChange={(e) => setProjectType(e.target.value)}
                          className={`w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-sans rounded-xl border outline-none transition-colors ${
                            isLight
                              ? 'bg-[#F7F6F2] border-[#E2DDD5] focus:border-[#121212]'
                              : 'bg-[#181818] border-white/10 text-white focus:border-[#AAFF00]'
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
                      <label className="block text-xs font-mono uppercase mb-1.5 font-bold">
                        Project Brief & Visual Vision *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={brief}
                        onChange={(e) => setBrief(e.target.value)}
                        placeholder="Tell me about your product or brand idea, desired visual mood, reference films, and timeline expectations..."
                        className={`w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-sans rounded-xl border outline-none transition-colors resize-none ${
                          isLight
                            ? 'bg-[#F7F6F2] border-[#E2DDD5] focus:border-[#121212]'
                            : 'bg-[#181818] border-white/10 text-white focus:border-[#AAFF00]'
                        }`}
                      />
                    </div>
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
                    className={`w-full py-3.5 px-6 rounded-full text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all mt-3 disabled:opacity-60 disabled:cursor-not-allowed ${
                      isLight
                        ? 'bg-[#121212] text-white hover:bg-[#262626] shadow-md'
                        : 'bg-[#AAFF00] text-[#080808] hover:bg-[#B8FF1F] shadow-glow-lime'
                    }`}
                  >
                    {isSubmitting ? (
                      <span>Submitting Brief...</span>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Founder Contacts (Height-aligned with Left Form Card) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            
            {/* Direct Email Card */}
            <div
              className={`p-6 sm:p-7 rounded-3xl border transition-colors flex flex-col justify-between ${
                isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#141414] border-white/10'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#FF0054]/10 text-[#FF0054] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[#5E5A53] dark:text-neutral-400 font-bold">
                    Direct Email
                  </p>
                  <p className="font-heading font-bold text-base sm:text-lg">
                    {directEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1.5">
                <a
                  href={`mailto:${directEmail}`}
                  className={`flex-1 py-2.5 px-4 rounded-full text-xs font-mono uppercase font-bold text-center border transition-all ${
                    isLight
                      ? 'bg-[#121212] text-white hover:bg-[#262626] shadow-xs'
                      : 'bg-[#AAFF00] text-[#080808] hover:bg-[#B8FF1F]'
                  }`}
                >
                  Send Direct Email
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-full border border-[#E2DDD5] dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer transition-colors"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Social Channels */}
            <div
              className={`p-6 sm:p-7 rounded-3xl border transition-colors flex-1 flex flex-col justify-between ${
                isLight ? 'bg-white border-[#E2DDD5]' : 'bg-[#141414] border-white/10'
              }`}
            >
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#5E5A53] dark:text-neutral-400 mb-3.5 font-bold">
                  Creative Director Channels
                </p>

                <div className="space-y-2.5">
                  <a
                    href="https://instagram.com/clipslab.media"
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-colors ${
                      isLight ? 'bg-[#F7F6F2] border-[#E2DDD5] hover:border-[#121212]' : 'bg-[#181818] border-white/10 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <InstagramIcon className="w-4 h-4 text-[#FF0054]" />
                      <span className="text-xs font-mono uppercase font-bold">Instagram</span>
                    </div>
                    <span className="text-xs font-mono text-[#5E5A53] dark:text-neutral-400 flex items-center gap-1">
                      @clipslab.media
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </a>

                  <a
                    href="https://linkedin.com/in/clipslabmedia"
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-colors ${
                      isLight ? 'bg-[#F7F6F2] border-[#E2DDD5] hover:border-[#121212]' : 'bg-[#181818] border-white/10 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <LinkedinIcon className="w-4 h-4 text-[#638AFF]" />
                      <span className="text-xs font-mono uppercase font-bold">LinkedIn</span>
                    </div>
                    <span className="text-xs font-mono text-[#5E5A53] dark:text-neutral-400 flex items-center gap-1">
                      in/clipslabmedia
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </a>

                  <a
                    href="https://youtube.com/@harsh.aifmve?si=9m6ZnokUic9S8U4f"
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-colors ${
                      isLight ? 'bg-[#F7F6F2] border-[#E2DDD5] hover:border-[#121212]' : 'bg-[#181818] border-white/10 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <YoutubeIcon className="w-4 h-4 text-red-500" />
                      <span className="text-xs font-mono uppercase font-bold">YouTube</span>
                    </div>
                    <span className="text-xs font-mono text-[#5E5A53] dark:text-neutral-400 flex items-center gap-1">
                      @harsh.aifmve
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
