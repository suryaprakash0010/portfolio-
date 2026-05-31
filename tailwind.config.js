/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        'void-soft': '#0a0a0f',
        neon: {
          blue: '#3b82f6',
          cyan: '#22d3ee',
          purple: '#a855f7',
          violet: '#7c3aed',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Fluid display sizes for the brutalist hero type.
        'display': 'clamp(2.75rem, 9vw, 8rem)',
        'display-sm': 'clamp(2rem, 6vw, 4rem)',
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 40%, #a855f7 100%)',
        'grid-faint':
          'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.55)',
        'neon-glow': '0 0 40px -8px rgba(59, 130, 246, 0.5)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.06)' },
        },
        'border-spin': {
          to: { transform: 'rotate(360deg)' },
        },
        'text-shimmer': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
        marquee: 'marquee 28s linear infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'border-spin': 'border-spin 6s linear infinite',
        'text-shimmer': 'text-shimmer 6s ease-in-out infinite',
        'gradient-x': 'gradient-x 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
