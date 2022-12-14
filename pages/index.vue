<script setup>
const story = await useAsyncStoryblok('index', { version: 'draft' });
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
