import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS_DATA } from '../data/faqs';
import { useTheme } from '../context/ThemeContext';

export const FAQSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      className={`py-10 sm:py-14 lg:py-16 border-b transition-colors duration-200 relative ${
        isLight ? 'bg-[#F0EDE7] border-[#E5E0D8] text-[#171717]' : 'bg-[#0a0a0a] border-white/10 text-white'
      }`}
      id="faq-section"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold mb-4 border ${
              isLight ? 'bg-white border-[#E5E0D8] text-[#390099]' : 'bg-[#161616] border-white/10 text-[#AAFF00]'
            }`}
          >
            <span>FAQ & CLARITY</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] uppercase mb-4">
            FREQUENTLY ASKED<br />
            <span
              className={`font-editorial-serif italic font-normal lowercase ${
                isLight ? 'text-[#FF0054]' : 'text-[#AAFF00]'
              }`}
            >
              questions.
            </span>
          </h2>
          <p className={`text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed ${isLight ? 'text-[#6E6860]' : 'text-neutral-400'}`}>
            Everything you need to know about our AI filmmaking workflows, campaign deliverables, and production timelines.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl border overflow-hidden transition-all duration-200 ${
                  isLight
                    ? 'bg-white border-[#E5E0D8]'
                    : 'bg-[#121212] border-white/10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-3 sm:gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-heading font-bold text-base sm:text-lg lg:text-xl transition-colors leading-snug ${
                      isLight
                        ? 'text-[#171717] hover:text-[#390099]'
                        : 'text-white hover:text-[#AAFF00]'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen
                        ? isLight
                          ? 'bg-[#390099] text-white'
                          : 'bg-[#AAFF00] text-[#080808]'
                        : isLight
                        ? 'bg-[#F0EDE7] text-[#6E6860] border border-[#E5E0D8]'
                        : 'bg-[#181818] text-neutral-400 border border-white/10'
                    }`}
                  >
                    {isOpen ? <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" /> : <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    className={`px-4 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm md:text-base leading-relaxed border-t ${
                      isLight
                        ? 'text-[#4A453E] border-[#E5E0D8]'
                        : 'text-neutral-300 border-white/5'
                    }`}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
