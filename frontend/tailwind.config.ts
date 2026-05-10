import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: '#0b1017',
        panel: '#111923',
        accent: '#00ff8c',
        danger: '#ff3d6d',
        glow: '#2af598',
      },
      boxShadow: {
        glow: '0 0 32px rgba(0, 255, 140, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
