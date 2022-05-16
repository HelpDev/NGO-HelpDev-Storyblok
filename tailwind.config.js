/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Docs Nuxt: https://tailwindcss.nuxtjs.org/
 */

const defaultTheme = require('tailwindcss/defaultTheme');
const defaultHelpdevTheme = require('components-helpdev-storyblok/tailwind.config');

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // First add to nuxt config
        sans: ['Work Sans', ...defaultTheme.fontFamily.sans],
        serif: ['Montserrat', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: {
          '100': '#FFC8A3',
          '200': '#FFAF7A',
          '300': '#FF9752',
          '400': '#FF7E29',
          '500': '#FF6600',
          '600': '#C75000',
          '700': '#8F3900',
          '800': '#572300',
          '900': '#1F0C00'
        },
        social: defaultHelpdevTheme.theme.extend.colors.social
      },
      height: defaultHelpdevTheme.theme.extend.height
    }
  },
  variants: {},
  plugins: [...defaultHelpdevTheme.plugins],
  purge: defaultHelpdevTheme.purge
};
