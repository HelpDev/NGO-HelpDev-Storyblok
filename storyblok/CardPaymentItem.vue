<script setup>
import { Button } from '@papanasi/vue';
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import { useSettingsStore } from '~/stores';

const store = useSettingsStore();
const router = useRouter();

const props = defineProps({ blok: Object });

const isSubscription = ref();
const checkoutRef = ref();
const id = ref();
const items = ref();
const publishableKey = ref(store.stripe_key);
const title = ref('');

const successURL = ref(`${window.location.protocol}//${window.location.host}/success`);
const cancelURL = ref(`${window.location.protocol}//${window.location.host}/error`);

async function submit() {
  if (props.blok.customlink) {
    window.location.href = props.blok.customlink;
    return;
  }

  id.value = isSubscription.value ? props.blok.id_subscription : props.blok.id;
  items.value = [{ price: id.value, quantity: 1 }];

  await nextTick();
  checkoutRef.value.redirectToCheckout();
}

function setValues() {
  isSubscription.value = props.blok.mode === 'subscription';
  title.value = `${props.blok.title} ${isSubscription.value && !props.blok.customlink ? props.blok.month_button : ''}`;
}

watch([() => props.blok.mode], () => {
  setValues();
});

setValues();
</script>

<template>
  <div class="item">
    <stripe-checkout
      v-if="id && !blok.customlink"
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
  margin-right: 1rem;
}
</style>
