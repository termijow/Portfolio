// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/globals.css', // Bueno tenerlo para @apply
  ],
  theme: {
    extend: {
      colors: {
        myblue: '#0000FF', // Nuestro color de prueba
      },
    },
  },
  plugins: [],
};
export default config;