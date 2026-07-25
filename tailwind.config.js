/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Single accent: Electric Indigo — not AI-purple, not generic blue
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // Neutral palette: zinc (cool-grey), consistent family
        zinc: {
          50:  '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight:   '-0.02em',
        snug:    '-0.01em',
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-out',
        'slide-up':   'slideUp 0.5s cubic-bezier(0.16,1,0.3,1)',
        'scale-in':   'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1)',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(16px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        scaleIn: { '0%': { transform: 'scale(0.96)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
      },
      boxShadow: {
        // Tinted shadows — not generic black
        'indigo-sm':  '0 2px 8px rgba(99,102,241,0.15)',
        'indigo-md':  '0 4px 24px rgba(99,102,241,0.2)',
        'indigo-lg':  '0 8px 48px rgba(99,102,241,0.25)',
        'card':       '0 4px 24px rgba(0,0,0,0.06)',
        'card-dark':  '0 4px 24px rgba(0,0,0,0.3)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}
