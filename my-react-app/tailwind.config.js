/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Zomato Brand
        primary: '#E23744',
        'primary-dark': '#CB202D',
        'primary-light': '#FEEBEC',
        'primary-container': '#db313f',

        // Surfaces
        background: '#FCFAF8',
        surface: '#FFFFFF',
        'surface-alt': '#F8F8F8',
        'surface-container': '#F0EDED',
        'surface-container-low': '#F6F3F2',
        'surface-container-high': '#EAE7E7',
        'surface-variant': '#E5E2E1',
        'surface-dim': '#DCD9D9',

        // On-surface
        'on-surface': '#1B1B1B',
        'on-surface-variant': '#5B403F',
        'on-primary': '#FFFFFF',

        // Semantic
        rating: '#24963F',
        'rating-light': '#E6F7EC',
        gold: '#E5C158',
        'gold-light': '#FFF8E1',

        // Outline
        outline: '#8F6F6E',
        'outline-variant': '#E4BEBC',

        // Error
        error: '#BA1A1A',
        'error-container': '#FFdad6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['48px', { lineHeight: '56px', fontWeight: '700', letterSpacing: '-0.02em' }],
        'headline-lg': ['32px', { lineHeight: '40px', fontWeight: '600', letterSpacing: '-0.01em' }],
        'headline-md': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'title-lg': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'label-lg': ['14px', { lineHeight: '20px', fontWeight: '600', letterSpacing: '0.01em' }],
        'label-sm': ['12px', { lineHeight: '16px', fontWeight: '500', letterSpacing: '0.02em' }],
      },
      spacing: {
        'xs': '8px',
        'sm': '16px',
        'md': '24px',
        'lg': '32px',
        'xl': '48px',
        'gutter': '20px',
        'margin': '40px',
        'container': '1280px',
        'sidebar': '320px',
        'navbar': '80px',
      },
      borderRadius: {
        'card': '12px',
        'btn': '12px',
        'chip': '8px',
        'pill': '9999px',
        'sm': '4px',
        'DEFAULT': '8px',
        'lg': '12px',
        'xl': '16px',
        'full': '9999px',
      },
      boxShadow: {
        'card': '0px 4px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0px 8px 24px rgba(0, 0, 0, 0.12)',
        'nav': '0px 2px 8px rgba(0, 0, 0, 0.06)',
        'modal': '0px 16px 48px rgba(0, 0, 0, 0.16)',
        'focus-red': '0px 4px 12px rgba(226, 55, 68, 0.15)',
      },
      maxWidth: {
        'container': '1280px',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'pulse-dot': 'pulse-dot 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
