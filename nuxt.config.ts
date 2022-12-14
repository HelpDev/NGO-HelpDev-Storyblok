// https://v3.nuxtjs.org/api/configuration/nuxt.config
const accessToken = process.env.STORYBLOK_TOKEN;

export default defineNuxtConfig({
  css: ["@papanasi/vue/papanasi.css", "~/assets/styles/app.css"],
  modules: ["@storyblok/nuxt"],
  storyblok: {
    accessToken,
  },
});
