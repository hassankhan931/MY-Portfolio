// const { section } = require('framer-motion/client');

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   darkMode: 'class',
//   theme: {
//     extend: {
//       colors: {
//         // Your brand and design system colors
//         primary: '#4361ee',
//         'primary-dark': '#3a0ca3',
//         'primary-light': '#4895ef',
//         secondary: '#f72585',
//         'accent-1': '#7209b7',
//         'accent-2': '#4cc9f0',
//         'accent-3': '#f8961e',
//         dark: '#0a0a0a',
//         darker: '#171717',
//         light: '#fafafa',
//         lighter: '#ffffff',
//         gray: '#6b7280',
//         'light-gray': '#e5e7eb',
//         'dark-gray': '#374151',
//         'footer-bg': '#1e293b',
//         'dark-footer-bg': '#020617',

//         // 💡 Custom pastel background sections
//         section1: '#fce7f3',  // Home
//         section2: '#f3e8ff',  // About
//         section3: '#e0f6ea',  // Skills
//         section4: '#ffece6',  // Projects
//         section5: '#d8f5f1',  // React Projects
//         section6: '#dbeafe',  // Contact + Footer
//         section7 :'#03000a',
//       },

//       boxShadow: {
//         sm: '0 2px 6px rgba(0,0,0,0.08)',
//         md: '0 8px 20px rgba(0,0,0,0.12)',
//         lg: '0 15px 30px rgba(0,0,0,0.15)',
//       },

//       transitionProperty: {
//         all: 'all',
//       },
//       transitionDuration: {
//         300: '300ms',
//       },
//       transitionTimingFunction: {
//         'cubic-bezier': 'cubic-bezier(0.16,1,0.3,1)',
//       },

//       keyframes: {
//         fadeIn: {
//           from: { opacity: '0' },
//           to: { opacity: '1' },
//         },
//         fadeInDown: {
//           from: { opacity: '0', transform: 'translateY(-20px)' },
//           to: { opacity: '1', transform: 'translateY(0)' },
//         },
//         skillTagSlideUp: {
//           from: { opacity: '0', transform: 'translate(-50%,20px)' },
//           to: { opacity: '1', transform: 'translate(-50%,0)' },
//         },
//       },

//       animation: {
//         fadeIn: 'fadeIn 1s ease-out',
//         fadeInDown: 'fadeInDown 1s ease-out',
//         skillTagSlideUp: 'skillTagSlideUp 0.5s ease-out forwards',
//       },
//     },
//   },
//   plugins: [],
// }

const { section } = require('framer-motion/client');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Your brand and design system colors
        primary: '#4361ee',
        'primary-dark': '#3a0ca3',
        'primary-light': '#4895ef',
        secondary: '#f72585',
        'accent-1': '#7209b7',
        'accent-2': '#4cc9f0',
        'accent-3': '#f8961e',
        dark: '#0a0a0a',
        darker: '#171717',
        light: '#fafafa',
        lighter: '#ffffff',
        gray: '#6b7280',
        'light-gray': '#e5e7eb',
        'dark-gray': '#374151',
        'footer-bg': '#1e293b',
        'dark-footer-bg': '#020617',

        // Custom pastel background sections
        section1: '#fce7f3',  // Home
        section2: '#f3e8ff',  // About
        section3: '#e0f6ea',  // Skills
        section4: '#ffece6',  // Projects
        section5: '#d8f5f1',  // React Projects
        section6: '#dbeafe',  // Contact + Footer
        section7: '#03000a',
      },

      boxShadow: {
        sm: '0 2px 6px rgba(0,0,0,0.08)',
        md: '0 8px 20px rgba(0,0,0,0.12)',
        lg: '0 15px 30px rgba(0,0,0,0.15)',
        'gradient-glow': '0 0 15px rgba(67, 97, 238, 0.3)',
      },

      transitionProperty: {
        all: 'all',
      },
      transitionDuration: {
        300: '300ms',
        500: '500ms',
      },
      transitionTimingFunction: {
        'cubic-bezier': 'cubic-bezier(0.16,1,0.3,1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        skillTagSlideUp: {
          from: { opacity: '0', transform: 'translate(-50%,20px)' },
          to: { opacity: '1', transform: 'translate(-50%,0)' },
        },
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },

      animation: {
        fadeIn: 'fadeIn 1s ease-out',
        fadeInDown: 'fadeInDown 1s ease-out',
        skillTagSlideUp: 'skillTagSlideUp 0.5s ease-out forwards',
        gradient: 'gradient 6s ease infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-fast': 'gradient 3s ease infinite',
      },

      backgroundSize: {
        '200%': '200%',
        '300%': '300%',
      },
    },
  },
  plugins: [],
}
