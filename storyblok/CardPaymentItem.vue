<script setup>
import { Button } from '@papanasi/vue';
import { useSettingsStore } from '~/stores';

const store = useSettingsStore();

const props = defineProps({ blok: Object });

const checkoutRef = ref();
const isSubscription = ref(false);
const id = ref(null);
const items = ref([]);
const publishableKey = ref(store.stripe_key);
const title = ref('');

const successURL = ref(`${window.location.protocol}//${window.location.host}/success`);
const cancelURL = ref(`${window.location.protocol}//${window.location.host}/error`);

function setValues() {
  isSubscription.value = props.blok.mode === 'subscription';
  id.value = isSubscription.value ? props.blok.id_subscription : props.blok.id;
  items.value = [{ price: id.value, quantity: 1 }];
  title.value = `${props.blok.title} ${isSubscription.value ? props.blok.month_button : ''}`;
}

function submit() {
  checkoutRef.value.redirectToCheckout();
}

watch([() => props.blok.mode], () => {
  setValues();
});

setValues();
</script>

<template>
  <div v-if="id" class="item">
    <stripe-checkout
      v-if="id"
      ref="checkoutRef"
      :mode="blok.mode"
      :pk="publishableKey"
      :line-items="items"
      :success-url="successURL"
      :cancel-url="cancelURL"
    />

    <Button :variant="blok.variant || 'basic'" @click="submit">{{ title }}</Button>
  </div>
</template>

<style scoped>
.item {
  margin-top: 1rem;
  margin-right: 1rem;
}
</style>
