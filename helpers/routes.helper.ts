import { apiPlugin } from '@storyblok/vue';
import { defaultLocale, locales } from './locales.helper';

export function getRoutes(accessToken: string) {
  return async () => {
    const { storyblokApi } = apiPlugin({ apiOptions: { accessToken } });

    let routes: string[] = [];

    for (const locale of locales.map((x) => x.code)) {
      const pages = await storyblokApi.get(`cdn/stories`, {
        version: 'published',
        language: locale,
        per_page: 100,
        page: 1
      });

      routes = [
        ...routes,
        ...pages.data.stories.map((story) => `/${locale === defaultLocale ? '' : locale + '/'}${story.slug}`)
      ];
    }

    return routes;
  };
}
