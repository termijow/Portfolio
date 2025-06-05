// postcss.config.mjs (preferido con "type": "module" en package.json)
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'tailwindcss': {}, // ¡CLAVE! Usa 'tailwindcss' directamente para v3
    'autoprefixer': {},
  },
};
export default config;