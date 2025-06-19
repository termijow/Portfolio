// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
content: [
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Cubre src/app/page.tsx
  './src/app/globals.css',
],
  theme: {
    extend: {
      screens: {
        'xxs': '360px', 
        'xs': '480px',  
        // sm, md, lg, xl, 2xl (ya vienen por defecto)
      },
      colors: {
        'brand-black': '#0A0A0A', // Negro principal (fondo)
        'brand-red': '#E50914',   // Rojo de acento
        'brand-white': '#F5F5F5', // Blanco para detalles y texto
        // Puedes añadir más tonos si los necesitas, ej. un gris oscuro para texto secundario
        // 'brand-gray': '#333333',
      },
      fontFamily: {
        // Aquí defines los alias para tus familias de fuentes
        // 'sans' es la fuente por defecto para el cuerpo del texto
        sans: ['Open Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
        // 'heading' para los encabezados
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
        // Si quieres una fuente específica con estilo Bauhaus muy marcado
        // bauhaus: ['Bebas Neue', 'ui-sans-serif', /* ... más fallbacks */],
      },
      // Aquí puedes extender otras propiedades de Tailwind si lo necesitas
      // ej. borderRadius, spacing, keyframes para animaciones, etc.
    },
  },
  plugins: [
    // Aquí puedes añadir plugins de Tailwind si los usas
    // ej. require('@tailwindcss/typography'), require('@tailwindcss/forms')
  ],
};

export default config;