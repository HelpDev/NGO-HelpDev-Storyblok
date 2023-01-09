<script setup>
const storyblokApi = useStoryblokApi();
const { slug } = useRoute().params;
const { locale } = useI18n();

const resolveRelations = ['popular-articles.articles'];
const url = slug && slug.length > 0 ? slug.join('/') : 'index';

const { data } = await useAsyncData(
  `${locale.value}-${url}`,
  async () =>
    await storyblokApi.get(`cdn/stories/${url}`, {
      version: 'draft',
      language: locale.value,
      resolve_relations: resolveRelations
    })
);

const story = useState(`${locale.value}-${url}-story`, () => data.value.data.story);

const pageName = ref(url);

onMounted(() => {
  if (story.value && story.value.id) {
    useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory), {
      resolveRelations
    });
  }
});
</script>

<template>
  <main :class="`page page--${pageName}`">
    <StoryblokComponent v-if="story" :blok="story.content" />
  </main>
</template>

<style scoped>
.page {
  padding-top: calc(var(--header-height-min) * 1.15);

  @media (--breakpoint-s) {
    padding-top: var(--header-height);
  }

  &--index {
    padding-top: 0;
  }
}
</style>
