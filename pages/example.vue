<script setup>
const story = await useStoryblok("example", { version: "draft" });
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
