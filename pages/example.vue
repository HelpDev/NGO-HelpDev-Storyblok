<script setup>
const story = await useAsyncStoryblok('example', { version: 'draft' });
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
