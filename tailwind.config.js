/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#0F172A", // Slate 900
        accent: "#38BDF8",  // Sky 400
        secondary: "#8B5CF6", // Violet 500
        dark: {
          bg: "#030712",    // Gray 950 - Almost Black
          card: "rgba(15, 23, 42, 0.45)", // Semi-transparent Slate 900
          border: "rgba(255, 255, 255, 0.08)",
          glow: "rgba(56, 189, 248, 0.15)"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      animation: {
        'blob-float': 'blob-float 12s infinite alternate ease-in-out',
        'grid-drift': 'grid-drift 20s infinite linear',
        'pulse-glow': 'pulse-glow 3s infinite ease-in-out',
        'spin-slow': 'spin 20s infinite linear',
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'typewriter': 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite',
      },
      keyframes: {
        'blob-float': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.15)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'grid-drift': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(40px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.3', filter: 'drop-shadow(0 0 15px rgba(56, 189, 248, 0.2))' },
          '50%': { opacity: '0.7', filter: 'drop-shadow(0 0 25px rgba(139, 92, 246, 0.4))' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
