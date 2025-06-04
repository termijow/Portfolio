// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Añadí .js, .jsx, .mdx por si acaso
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/globals.css', // Importante: Asegúrate de que Tailwind "vea" tu globals.css si usas @apply
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