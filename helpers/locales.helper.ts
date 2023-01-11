export const locales = [
  {
    code: 'en',
    name: 'English'
  },
  {
    code: 'es',
    name: 'Español'
  }
];

export const defaultLocale = locales[0].code;

const otherLocales = locales.filter((x) => x.code !== defaultLocale).map((x) => x.code);

export const otherLocalesRoutes = otherLocales.map((x) => `/${x}`);
