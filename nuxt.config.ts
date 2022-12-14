// https://v3.nuxtjs.org/api/configuration/nuxt.config
const accessToken = process.env.STORYBLOK_TOKEN;

export default defineNuxtConfig({
  css: ['@papanasi/vue/papanasi.css', '~/assets/styles/app.css'],
  modules: ['@storyblok/nuxt'],
  storyblok: {
    accessToken
  },
  postcss: {
    plugins: {
      'postcss-at-rules-variables': {},
      'postcss-import': {},
      'postcss-calc': { preserve: false },
      'postcss-nested': {},
      'postcss-each': {},
      'postcss-mixins': {},
      autoprefixer: {},
      'postcss-discard-comments': {},
      'postcss-custom-media': {
        importFrom: './styles/variables.css'
      }
    }
  }
});
