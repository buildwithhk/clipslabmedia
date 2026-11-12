import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { useTheme } from '../context/ThemeContext';

export const ContactPage: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div
      className={`w-full transition-colors duration-200 pt-4 sm:pt-8 pb-12 sm:pb-14 ${
        isLight ? 'bg-[#F7F6F2] text-[#121212]' : 'bg-[#080808] text-white'
      }`}
    >
      <ContactSection />
    </div>
  );
};
