import { defineStore } from 'pinia';

// type Settings = {
//   menu: any;
//   actions: any;
//   title: string;
//   description: string;
//   stripe_key: string;
//   social: any;
//   footer_title: any;
//   footer_subtitle: any;
//   footer_thanks: any;
// };

export const useSettingsStore = defineStore<string, any>('settings', {
  state: () => ({
    menu: null,
    actions: null,
    title: null,
    description: null,
    stripe_key: null,
    footer_title: null,
    footer_subtitle: null,
    footer_thanks: null,
    social: null
  }),
  actions: {
    update(settings: any) {
      this.menu = settings.menu;
      this.actions = settings.actions;
      this.title = settings.title;
      this.description = settings.description;
      this.social = settings.social;
      this.footer_title = settings.footer_title;
      this.footer_subtitle = settings.footer_subtitle;
      this.footer_thanks = settings.footer_thanks;
      this.stripe_key = settings.stripe_key;
    }
  }
});
