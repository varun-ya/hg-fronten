import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'season': ['var(--font-season-mix)'],
        'matter': ['var(--font-matter)'],
      },
      colors: {
        hg: {
          bg: '#FFFFFF',
          sidebar: '#F9FAFB',
          border: '#E5E7EB',
          'border-soft': '#F3F4F6',
          primary: '#111827',
          secondary: '#6B7280',
          muted: '#9CA3AF',
          'active-bg': '#F0F0FF',
          'active-text': '#4F46E5',
          'accent-green': '#D1FAE5',
          'accent-blue': '#DBEAFE',
          'accent-orange': '#FEF3C7',
          'accent-purple': '#EDE9FE',
        }
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
export default config;
