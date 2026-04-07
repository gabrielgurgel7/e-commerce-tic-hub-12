<script lang="ts">
import { Product } from '../model/product.model'
import Card from 'primevue/card'
import PrimeButton from 'primevue/button'
import type { PropType } from 'vue'

export default {
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  components: {
    Card,
    PrimeButton,
  },
  methods: {
    add() {
      this.$emit('add-item', this.product)
    },
  },
}
</script>

<template>
  <Card class="p-4 shadow-lg rounded-2xl">
    <template #title>
      <h2 class="text-lg font-bold">{{ product.name }}</h2>
    </template>

    <template #content>
      <p class="text-gray-600">R$ {{ product.price }}</p>
    </template>

    <template #footer>
      <PrimeButton
        label="Adicionar"
        icon="pi pi-shopping-cart"
        severity="primary"
        class="w-full rounded-xl"
      />
    </template>
  </Card>
</template>
