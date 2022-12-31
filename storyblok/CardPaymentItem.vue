<script setup>
import { Button } from '@papanasi/vue';
import { StripeCheckout } from '@vue-stripe/vue-stripe';

const storyblokApi = useStoryblokApi();

// Move to global store
const { data } = await storyblokApi.get('cdn/stories/config', {
  version: 'draft',
  resolve_links: 'url'
});

const props = defineProps({ blok: Object });

const checkoutRef = ref();
const isSubscription = ref(props.blok.mode === 'subscription');
const id = ref(isSubscription.value ? props.blok.id_subscription : props.blok.id);
const items = [{ price: id.value, quantity: 1 }];
const publishableKey = ref(data.story.content.stripe_key);

const successURL = ref(`${window.location.protocol}//${window.location.host}/success`);
const cancelURL = ref(`${window.location.protocol}//${window.location.host}/error`);

function submit() {
  checkoutRef.value.redirectToCheckout();
}
</script>

<template>
  <div v-if="id" class="item">
    <stripe-checkout
      ref="checkoutRef"
      :mode="blok.mode"
      :pk="publishableKey"
      :line-items="items"
      :success-url="successURL"
      :cancel-url="cancelURL"
    />

    <Button :variant="blok.variant || 'basic'" @click="submit"
      >{{ blok.title }} {{ isSubscription ? blok.month_button : '' }}</Button
    >
  </div>
</template>

<style scoped>
.item {
}
</style>
