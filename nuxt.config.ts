// https://v3.nuxtjs.org/api/configuration/nuxt.config
const token = process.env.STORYBLOK_TOKEN;

export default defineNuxtConfig({
  modules: [["@storyblok/nuxt", { accessToken: token }]],
});
