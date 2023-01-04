<script setup>
import { Button } from '@papanasi/vue';
import { useSettingsStore } from '~/stores';

const store = useSettingsStore();

const props = defineProps({ blok: Object });

const isSubscription = ref();
const checkoutRef = ref();
const checkoutSubscriptionRef = ref();
const id = ref(props.blok.id);
const idSubscription = ref(props.blok.id_subscription);
const items = ref([{ price: id.value, quantity: 1 }]);
const itemsSubscription = ref([{ price: idSubscription.value, quantity: 1 }]);
const publishableKey = ref(store.stripe_key);
const title = ref('');

const successURL = ref(`${window.location.protocol}//${window.location.host}/success`);
const cancelURL = ref(`${window.location.protocol}//${window.location.host}/error`);

function submit() {
  checkoutRef.value.redirectToCheckout();
}

function submitSubscription() {
  checkoutSubscriptionRef.value.redirectToCheckout();
}

function setValues() {
  isSubscription.value = props.blok.mode === 'subscription';
  title.value = `${props.blok.title} ${isSubscription.value ? props.blok.month_button : ''}`;
}

watch([() => props.blok.mode], () => {
  setValues();
});

setValues();
</script>

<template>
  <div v-show="!isSubscription && id" class="item">
    <stripe-checkout
      ref="checkoutRef"
      :mode="blok.mode"
      :pk="publishableKey"
      :line-items="items"
      :success-url="successURL"
      :cancel-url="cancelURL"
    />

    <Button :variant="blok.variant || 'basic'" @click="submit">{{ title }}</Button>
  </div>

  <div v-show="isSubscription && idSubscription" class="item">
    <stripe-checkout
      ref="checkoutSubscriptionRef"
      :mode="blok.mode"
      :pk="publishableKey"
      :line-items="itemsSubscription"
      :success-url="successURL"
      :cancel-url="cancelURL"
    />

    <Button :variant="blok.variant || 'basic'" @click="submitSubscription">{{ title }}</Button>
  </div>
</template>

<style scoped>
.item {
  margin-top: 1rem;
  margin-right: 1rem;
}
</style>
