const generateStoryblokUrls = require('./nuxt.generate');
const token = process.env.STORYBLOK_TOKEN;

export default {
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'HelpDev - The #1 open source NGO',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Global CSS
   */
  css: [
    'node_modules/components-helpdev-storyblok/assets/css/tailwind-extra.css'
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    'node_modules/components-helpdev-storyblok/plugins/story-components',
    'node_modules/components-helpdev-storyblok/plugins/locale',
    'node_modules/components-helpdev-storyblok/plugins/common-stores',
    'node_modules/components-helpdev-storyblok/plugins/tailwind-components',
    'node_modules/components-helpdev-storyblok/plugins/composition-api.js',
    'node_modules/components-helpdev-storyblok/plugins/storyblok-rich-text-renderer.js'
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'nuxt-i18n',
    '@nuxtjs/svg',
    [
      'storyblok-nuxt',
      {
        accessToken: token,
        cacheProvider: 'memory'
      }
    ]
  ],
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  generate: generateStoryblokUrls(token),

  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English'
      },
      {
        code: 'es',
        name: 'Español'
      }
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'es',
      messages: {
        en: require('./assets/locales/en.json'),
        es: require('./assets/locales/es.json')
      }
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      onlyOnRoot: true // recommended
    }
  },
  googleFonts: {
    families: {
      'Work+Sans': true,
      'Montserrat ': [600, 700, 800, 900]
    }
  }
};
