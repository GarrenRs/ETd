/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3c6382',
          light: '#60a3bc',
          dark: '#0a3d62',
        },
        secondary: {
          DEFAULT: '#1e3799',
          light: '#4a69bd',
          dark: '#0c2461',
        },
      },
    },
  },
  plugins: [],
}
