/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F6F2',
        surface: '#FFFFFF',
        'surface-subtle': '#F2F0EB',
        'surface-elevated': '#FFFFFF',
        'border-custom': '#E5E3DE',
        'border-strong': '#D6D3CC',
        'primary-text': '#111111',
        'secondary-text': '#6B6B6B',
        'muted-text': '#8C8983',
        'accent-dark': '#18181B',
        'accent-charcoal': '#242426',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02)',
        'card': '0 2px 8px -2px rgba(17, 17, 17, 0.04), 0 8px 24px -4px rgba(17, 17, 17, 0.06)',
        'card-hover': '0 8px 30px -4px rgba(17, 17, 17, 0.08), 0 20px 40px -10px rgba(17, 17, 17, 0.08)',
        'elevated': '0 20px 50px -12px rgba(17, 17, 17, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
