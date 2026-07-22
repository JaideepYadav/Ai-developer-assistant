import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        surface: '#f8fafc',
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857'
        }
      },
      boxShadow: {
        card: '0 18px 45px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: [forms]
} satisfies Config;
