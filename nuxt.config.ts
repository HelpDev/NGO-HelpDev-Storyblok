// https://v3.nuxtjs.org/api/configuration/nuxt.config
const accessToken = process.env.STORYBLOK_TOKEN;

export default defineNuxtConfig({
  css: ['@papanasi/vue/papanasi.css', '~/assets/styles/app.css'],
  modules: ['@storyblok/nuxt', '@nuxtjs/google-fonts', '@nuxtjs/i18n'],
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
        importFrom: './assets/styles/variables.css'
      }
    }
  },
  i18n: {
    strategy: 'prefix_except_default',
    locales: ['en', 'es'],
    defaultLocale: 'en'
  },
  googleFonts: {
    families: {
      Outfit: {
        wght: [300, 400, 700, 800]
      },
      'Noto+Sans': true
    }
  },
  generate: {
    routes: ['/es']
  }
});
