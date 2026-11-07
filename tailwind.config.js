/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#174A35',
          dark: '#0f3224',
          light: '#236b4e',
          50: '#f0f7f3',
          100: '#dceee4',
          500: '#174A35',
          900: '#0a2218',
        },
        olive: {
          DEFAULT: '#668C55',
          light: '#7fa86b',
          dark: '#4f6d41',
          50: '#f4f7f2',
          100: '#e5eedf',
          500: '#668C55',
        },
        beige: {
          DEFAULT: '#F2EBDD',
          light: '#f9f6f0',
          dark: '#ded3be',
        },
        surface: '#FFFFFF',
        canvas: '#F7F9F6',
        ink: {
          DEFAULT: '#26352C',
          muted: '#52665b',
          subtle: '#7d9487',
          light: '#a6b8ad',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
