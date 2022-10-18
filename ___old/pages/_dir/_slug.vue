<template>
  <section>
    <component
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
      :is="story.content.component"
    />
  </section>
</template>

<script>
import {
  loadPageContent,
  onStoryBridgeChangedToPublishedRefreshPage,
  onStoryBridgeInputChangeUpdateContent
} from 'components-helpdev-storyblok/helpers/common-page.helper';

export default {
  data() {
    return {
      story: { content: {} }
    };
  },
  mounted() {
    onStoryBridgeInputChangeUpdateContent(this);
    onStoryBridgeChangedToPublishedRefreshPage(this);
  },
  async asyncData(context) {
    return loadPageContent(
      context,
      `${context.params.dir}/${context.params.slug}`
    );
  }
};
</script>
