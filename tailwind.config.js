// tailwind.config.js (o .ts si lo conviertes a ESM con export default)
/** @type {import('tailwindcss').Config} */
module.exports = { // Si usas .ts y "type": "module", cambia a: export default { ... }
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Si tienes directorio pages
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // <-- DESCOMENTA O AÑADE ESTA LÍNEA
  ],
  theme: {
    extend: { // Mantenemos extend ya que parece funcionar en tu caso con v4
      colors: {
        'brand-black': '#0A0A0A',    // Tu negro principal
        'brand-red': '#E50914',      // Tu rojo principal
        'brand-white': '#F5F5F5',    // Tu blanco principal
        // Puedes añadir más colores personalizados aquí si los necesitas
      },
      fontFamily: {
        // Aquí vamos a definir tus fuentes para usarlas con clases de utilidad
        sans: ['Open Sans', 'Arial', 'Helvetica', 'sans-serif'], // Open Sans como principal, luego fallbacks
        heading: ['Montserrat', 'Arial', 'sans-serif'],      // Montserrat para títulos
        bauhaus: ['Bebas Neue', 'cursive'],                  // Tu fuente Bauhaus
      },
    },
  },
  plugins: [],
};