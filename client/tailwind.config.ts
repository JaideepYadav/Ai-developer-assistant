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
          50: '#eef6ff',
          100: '#d9ebff',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af'
        }
      },
      boxShadow: {
        card: '0 18px 45px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: [forms]
} satisfies Config;
