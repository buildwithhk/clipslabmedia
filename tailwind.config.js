/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
      },
      colors: {
        brand: {
          offwhite: '#F7F6F2',     // Primary Warm White / Ivory
          sand: '#EFECE6',         // Secondary warm neutral surface
          paper: '#FFFFFF',        // Crisp white card surface
          dark: '#121212',         // Deep charcoal black for typography
          charcoal: '#222222',     // Secondary dark
          muted: '#66625B',        // Muted grey typography
          border: '#E4DFD5',       // Warm hairline border
          lime: '#AAFF00',         // Subtle electric lime accent
          pink: '#FF0054',         // Hot pink highlight
          purple: '#240046',       // Deep midnight violet
          amber: '#FF9E00',        // Warm sunset amber
        },
        teevra: {
          lime: '#AAFF00',
          yellow: '#EEF23A',
          coral: '#FFA670',
          blue: '#638AFF',
          dark: '#080808',
          surface: '#141414',
          card: '#181818',
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"DM Sans"', 'sans-serif'],
        heading: ['"Space Grotesk"', '"DM Sans"', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-pink': '0 0 25px rgba(255, 0, 84, 0.35)',
        'glow-lime': '0 0 30px rgba(170, 255, 0, 0.25)',
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card-lift': '0 12px 30px rgba(0, 0, 0, 0.06)',
        'film': '0 20px 50px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}
