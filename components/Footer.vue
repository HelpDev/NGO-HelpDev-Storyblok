<script setup>
import { Column, Container, Row } from '@papanasi/vue';
import { useSettingsStore } from '~/stores';

const { locale, locales, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const store = useSettingsStore();

const title = ref(store.footer_title);
const subtitle = ref(store.footer_subtitle);
const thanks = ref(store.footer_thanks);
const social = ref(store.social);

watchEffect(() => {
  title.value = store.footer_title;
  subtitle.value = store.footer_subtitle;
  thanks.value = store.footer_thanks;
  social.value = store.social;
});

function updateLocale(locale) {
  setLocale(locale);
}

const iconTemplate = (icon) => {
  return `https://raw.githubusercontent.com/gilbarbara/logos/master/logos/${icon}.svg`;
};

const otherLocales = computed(() => locales.value.filter((x) => x.code !== locale.value));
</script>

<template>
  <Container :fluid="true" class="footer">
    <Container class="footer__container">
      <Row basic="column" s="row">
        <Column class="footer__column" basic="fill" :s="8">
          <h4 class="footer__title">{{ title }}</h4>
          <h5 class="footer__subtitle">{{ subtitle }}</h5>

          <ul v-if="social" class="footer__actions">
            <li v-for="element in social" :key="element._uid">
              <NuxtLink
                class="footer__link"
                :target="element.link.target"
                :to="
                  element.link.cached_url.includes('index')
                    ? element.link.cached_url.replace('index', locale === 'en' ? '/' : '')
                    : element.link.cached_url
                "
              >
                <img
                  class="footer__social"
                  :src="iconTemplate(element.icon)"
                  :alt="store.title"
                  width="50"
                  height="26"
                />
              </NuxtLink>
            </li>
          </ul>

          <div class="footer__languages">
            <NuxtLink
              v-for="language in otherLocales"
              :key="language.code"
              class="footer__language"
              :to="switchLocalePath(language.code)"
              @click="updateLocale(language.code)"
              >{{ language.name }}</NuxtLink
            >
          </div>
        </Column>

        <Column class="footer__column" basic="fill" :s="4">
          <h4 class="footer__title footer__title--thanks">{{ thanks }}</h4>
          <NuxtLink to="https://helpdev.org" target="_blank">
            <img
              class="footer__logo"
              src="~/assets/images/helpdev.png"
              :alt="store.title"
              width="150"
              height="25.315"
            />
          </NuxtLink>
          <NuxtLink to="https://www.storyblok.com/" target="_blank">
            <img
              class="footer__logo"
              src="~/assets/images/storyblok.png"
              :alt="store.title"
              width="150"
              height="25.315"
            />
          </NuxtLink>
        </Column>
      </Row>
    </Container>
  </Container>
</template>

<style scoped>
.footer {
  padding: 0 1rem 1.25rem 1rem;
  margin-top: 3vw;
  background-color: var(--color-primary-normal);

  &__container {
    margin: 0 auto;
    color: var(--color-basic-brightest);
  }

  &__column {
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
  }

  &__title {
    display: block;
    margin: 0;
    font-family: var(--font-family-heading);
    font-size: var(--font-size-l);
    font-weight: var(--font-weight-bold);

    @media (--breakpoint-s) {
      font-size: var(--font-size-xl);
    }

    @media (--breakpoint-m) {
      max-width: 35rem;
    }

    &--thanks {
      padding-bottom: 1rem;
    }
  }

  &__subtitle {
    display: block;
    max-width: 80%;
    padding-top: 0.5rem;
    margin: 0;
    font-size: var(--font-size-s);
    line-height: calc(var(--font-size-s) * 1.5);
    color: var(--color-basic-brightest);
    opacity: 0.8;

    @media (--breakpoint-s) {
      font-size: var(--font-size-m);
      font-weight: var(--font-weight-light);
      line-height: calc(var(--font-size-m) * 1.5);
    }

    @media (--breakpoint-m) {
      max-width: 40rem;
    }
  }

  &__logo {
    max-width: 6rem;
    height: auto;

    @media (--breakpoint-s) {
      max-width: 9rem;
    }
  }

  &__actions {
    display: flex;
    padding: 0;
    margin: 0;
    margin-top: 1rem;
    list-style: none;
  }

  &__link {
    --size: 2rem;
    display: inline-flex;
    align-content: center;
    justify-content: center;
    width: var(--size);
    height: var(--size);
    margin-right: 0.15rem;

    background-color: var(--color-basic-brightest);
    border: 2px solid var(--color-primary-normal);
    border-radius: 100%;
    transition: border-color var(--transition-duration-normal);

    @media (--breakpoint-s) {
      --size: 2.25rem;
      margin-right: 0.25rem;
    }

    &:hover,
    &:active {
      text-decoration: none;
      border-color: var(--color-basic-brightest);
    }
  }

  &__social {
    max-width: 1rem;
    height: auto;

    @media (--breakpoint-s) {
      max-width: 1.25rem;
    }
  }

  &__languages {
    padding-top: 0.75rem;
    font-size: var(--font-size-s);
    font-weight: var(--font-weight-bold);
  }

  &__language {
    margin-right: 0.25rem;
    color: var(--color-basic-brightest);
    border-bottom: 2px solid transparent;
    transition: border-color var(--transition-duration-normal);

    &:hover,
    &:active {
      text-decoration: none;
      border-bottom-color: var(--color-basic-brightest);
    }
  }
}
</style>
