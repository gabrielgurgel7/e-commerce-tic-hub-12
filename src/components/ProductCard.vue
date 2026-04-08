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
  <Card class="shadow-md rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300">
    <!-- Imagem -->
    <img src="https://via.placeholder.com/300x200" class="rounded-xl mb-4 w-full object-cover" />

    <!-- Título -->
    <template #title>
      <h2 class="text-lg font-bold">{{ product.name }}</h2>
    </template>

    <!-- Conteúdo -->
    <template #content>
      <p class="text-sm text-gray-500 mb-2">
        {{ product.category.name }}
      </p>

      <p class="text-xl font-bold text-green-600">R$ {{ product.price }}</p>
      <p class="line-through text-gray-400">R$ 2000</p>
      <p class="text-xl font-bold text-green-600">R$ {{ product.price }}</p>
    </template>

    <!-- Footer -->
    <template #footer>
      <PrimeButton
        label="Adicionar"
        icon="pi pi-shopping-cart"
        severity="primary"
        class="w-full rounded-xl"
        @click="add"
      />
    </template>
  </Card>
</template>
