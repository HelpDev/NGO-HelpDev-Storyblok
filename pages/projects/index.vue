<template>
  <section>
    <div
      class="py-8 w-full text-center font-serif font-extrabold text-5xl bg-opacity-90 z-20"
    >
      <h2>{{ $t('projects.title') }}</h2>
    </div>

    <div class="flex mt-10 items-center justify-center">
      <div
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"
      >
        <div
          v-for="project in stories"
          :key="project._uid"
          class="relative bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl"
        >
          <div
            class=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-cover left-4 -top-6 w-16 h-16"
            :style="{ backgroundImage: `url(${getImage(project)})` }"
          ></div>
          <div class="mt-8">
            <p class="text-xl font-semibold my-2">{{ getTitle(project) }}</p>
            <div class="flex space-x-2 text-gray-400 text-sm">
              <p>{{ getSubtitle(project) }}</p>
            </div>
            <div class="flex space-x-2 text-gray-600 text-sm my-3">
              <nuxt-link class="hover:underline" :to="`/${project.full_slug}`">
                {{ $t('projects.view') }}
              </nuxt-link>
            </div>

            <div v-if="getImages(project)" class="border-t-2"></div>

            <div class="flex justify-between" v-if="getImages(project)">
              <div class="my-2">
                <p class="font-semibold text-base mb-2">
                  {{ $t('projects.pictures') }}
                </p>
                <div class="flex space-x-2">
                  <img
                    v-for="image in getImages(project)"
                    :key="image.filename"
                    :src="image.filename"
                    :a="image"
                    class="w-6 h-6 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { loadPageContentFromApi } from '~/helpers';

export default {
  data() {
    return {
      stories: []
    };
  },
  asyncData(context) {
    return loadPageContentFromApi(
      context,
      'cdn/stories',
      context.localePath('projects/')
    );
  },
  setup() {
    function getProperty(project, property) {
      const hero = project?.content?.hero;

      if (!hero || hero.length < 1) {
        return;
      }

      return hero[0][property];
    }

    function getImage(project) {
      return getProperty(project, 'image')?.filename;
    }

    function getTitle(project) {
      return getProperty(project, 'title');
    }

    function getSubtitle(project) {
      return getProperty(project, 'subtitle');
    }

    function getImages(project) {
      const body = project?.content?.body;
      const images = body.find(x => x?.images).images;

      return images;
    }

    return { getImage, getTitle, getSubtitle, getImages };
  }
};
</script>
