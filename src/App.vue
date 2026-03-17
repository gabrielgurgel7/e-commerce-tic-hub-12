<script lang="ts">
import { Product } from './model/product.model'
import ProductCard from './card/ProductCard.vue'
import { Cart } from './model/cart.model'
export default {
  data() {
    return {
      cart: new Cart(),
      products: [
        new Product('Guitarra Tagima', 'Guitarra stratocaste com 24 casas', 1500, 0.05),
        new Product('Violão Seizi', 'Violão modelo mini', 800, 0.05),
      ],
    }
  },
  methods: {
    addItem(product: Product) {
      const existItem = this.cart.list.some((item) => item.product.title === product.title)
      if (existItem) {
        this.cart.list.map((item) => {
          if (item.product.title === product.title) {
            return {
              product: item.product,
              quantity: item.quantity + 1,
            }
          }
        })
        this.cart.total += 1
      } else {
        this.cart.list.push({ product, quantity: 1 })
        this.cart.total += 1
      }
    },
    decItem() {
      this.cart.total -= 1
    },
  },
  components: { ProductCard },
}
</script>

<template>
  <main>
    <div v-for="product in products">
      <ProductCard :product="product" @on-click="addItem" />
    </div>
  </main>
  <div>
    <h1>Carrinho</h1>
    <div v-for="item in cart.list">
      <h1>{{ item.product.title }}</h1>
      <p>{{ item.quantity }}</p>
    </div>
    <p>Total:{{ cart.total }}</p>
  </div>
</template>
