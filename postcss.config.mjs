// postcss.config.mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // Para Tailwind v4
    autoprefixer: {},
  },
};

export default config;