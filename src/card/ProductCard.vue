<template>
  <article>
    <h2>{{ product?.name }}</h2>

    <p>Categoria: {{ product?.category.title }}</p>

    <p>R$ {{ product?.price.toFixed(2) }}</p>

    <button @click="addItem(product!)">Adicionar</button>
  </article>
</template>

<script lang="ts">
import { Product } from '@/model/product.model'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<Product>,
    },
  },

  emits: ['add-item'],

  methods: {
    addItem(product: Product) {
      this.$emit('add-item', product)
    },
  },
})
</script>
