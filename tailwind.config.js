/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['Manrope', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono:  ['"DM Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Editorial palette: warm ink base, cream type, a single lime signal.
        ink:   { DEFAULT: '#11120f', 2: '#181914', 3: '#22231d' },
        cream: { DEFAULT: '#e8e2d7', dim: '#9a968c' },
        paper: { DEFAULT: '#e6e1d6', ink: '#11120f', dim: '#5c5a52' },
        lime:  { DEFAULT: '#d3ff43', deep: '#b8e021' },
        olive: '#4e5f1e',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        pulse:   'pulse 2.4s ease-in-out infinite',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-33.333%)' } },
      },
    },
  },
  plugins: [],
}
