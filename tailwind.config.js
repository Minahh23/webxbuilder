/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.ts',
    './src/**/*.html',
    './dist/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
        mono: ['menlo', 'monospace'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
}
