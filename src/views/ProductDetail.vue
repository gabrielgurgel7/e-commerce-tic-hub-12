<template>
  <div class="p-6">
    <Card>
      <template #title>
        {{ product.name }}
      </template>

      <template #content>
        <p class="mb-4">Preço: R$ {{ product.price }}</p>

        <Button label="Adicionar ao carrinho" @click="addToCart" />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'

type Product = {
  id: number
  name: string
  price: number
}

const route = useRoute()

const products: Product[] = [
  { id: 1, name: 'Notebook', price: 3500 },
  { id: 2, name: 'Smartphone', price: 2000 },
  { id: 3, name: 'Headphone', price: 500 },
]

const product = products.find((p) => p.id === Number(route.params.id))!

const addToCart = () => {
  alert('Produto adicionado ao carrinho!')
}
</script>
