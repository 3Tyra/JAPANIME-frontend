/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        anime: ['"Bangers"', 'cursive'], // added custom anime font
      },
      animation: {
        'slide-in': 'slideIn 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',  // added slide-in-right
        'pulse-outline': 'pulseOutline 2s ease-in-out infinite',
        'zoom-bg': 'zoomBg 20s ease-in-out infinite',
        'slide-down': 'slideDown 0.6s ease-out',
        'tilt': 'tilt 4s ease-in-out infinite',
        'pulse-shadow': 'pulseShadow 4s ease-in-out infinite',
      },
      keyframes: {
        slideIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(100px)',  // slide in from right
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        pulseOutline: {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(255, 20, 147, 0)',
          },
          '50%': {
            boxShadow: '0 0 12px 6px rgba(255, 20, 147, 0.6)',
          },
        },
        zoomBg: {
          '0%, 100%': { backgroundSize: '100%' },
          '50%': { backgroundSize: '110%' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        tilt: {
          '0%, 100%': { transform: 'rotate(2deg)' },
          '50%': { transform: 'rotate(-2deg)' },
        },
        pulseShadow: {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(255, 20, 147, 0)',
          },
          '50%': {
            boxShadow: '0 0 25px 10px rgba(255, 20, 147, 0.5)',
          },
        },
      },
    },
  },
  plugins: [],
};
