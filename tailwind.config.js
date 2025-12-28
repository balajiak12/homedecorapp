/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        primary: {
          50: '#fef7f0',
          100: '#fdeee0',
          200: '#fbd9c1',
          300: '#f8be98',
          400: '#f4966d',
          500: '#f0703e',
          600: '#e1521f',
          700: '#bb3f16',
          800: '#953518',
          900: '#783016',
        },
        accent: {
          50: '#f5f7fa',
          100: '#e9eef5',
          200: '#ced9e8',
          300: '#a6bcd4',
          400: '#7799ba',
          500: '#567ba3',
          600: '#426289',
          700: '#37506f',
          800: '#31445d',
          900: '#2d3b4f',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

