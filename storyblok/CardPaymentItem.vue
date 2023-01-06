<script setup>
import { Button } from '@papanasi/vue';
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import { useSettingsStore } from '~/stores';

const store = useSettingsStore();
const router = useRouter();

const props = defineProps({ blok: Object });

const isSubscription = ref();
const checkoutRef = ref();
const checkoutSubscriptionRef = ref();
const id = ref();
const idSubscription = ref();
const items = ref();
const itemsSubscription = ref();
const publishableKey = ref(store.stripe_key);
const title = ref('');

const successURL = ref(`${window.location.protocol}//${window.location.host}/success`);
const cancelURL = ref(`${window.location.protocol}//${window.location.host}/error`);

async function submit() {
  id.value = props.blok.id;
  items.value = [{ price: id.value, quantity: 1 }];

  await nextTick();
  checkoutRef.value.redirectToCheckout();
}

async function submitSubscription() {
  idSubscription.value = props.blok.id_subscription;
  itemsSubscription.value = [{ price: idSubscription.value, quantity: 1 }];

  await nextTick();
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
  <div :class="`item ${!isSubscription ? 'is-visible' : ''}`">
    <stripe-checkout
      v-if="id"
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :line-items="items"
      :success-url="successURL"
      :cancel-url="cancelURL"
    />

    <Button :variant="blok.variant || 'basic'" @click="submit">{{ title }}</Button>
  </div>

  <div :class="`item ${isSubscription ? 'is-visible' : ''}`">
    <ClientOnly fallback-tag="span" fallback="Loading comments...">
      <stripe-checkout
        v-if="idSubscription"
        ref="checkoutSubscriptionRef"
        mode="subscription"
        :pk="publishableKey"
        :line-items="itemsSubscription"
        :success-url="successURL"
        :cancel-url="cancelURL"
      />
    </ClientOnly>

    <Button :variant="blok.variant || 'basic'" @click="submitSubscription">{{ title }}</Button>
  </div>
</template>

<style scoped>
.item {
  margin-top: 1rem;
  margin-right: 1rem;
  display: none;

  &.is-visible {
    display: block;
  }
}
</style>
