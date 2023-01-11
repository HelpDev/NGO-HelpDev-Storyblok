import { apiPlugin } from '@storyblok/vue';
import { defaultLocale, locales } from './locales.helper';

const disabledSlugs = ['config'];

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
        ...pages.data.stories
          .filter((x) => !disabledSlugs.includes(x.slug))
          .map((x) => `/${locale === defaultLocale ? '' : locale + '/'}${x.slug}`)
      ];
    }

    return routes;
  };
}
