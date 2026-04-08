<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Checkout</h1>
    <p>Finalização da compra</p>

    <Button label="Finalizar Pedido" />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'

defineOptions({
  name: 'CheckoutView',
})
</script>
