// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  dev: true,
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@pinia/nuxt',
  ],
})
