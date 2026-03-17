<script lang="ts">
import { Category } from './model/category.model'
import { Product } from './model/product.model'
import { Cart } from './model/cart.model'
import ProductCard from './card/ProductCard.vue'

export default {
  data() {
    const guitar = new Category(1, 'Instrumentos')
    const accessory = new Category(2, 'Acessórios')
    return {
      cart: new Cart(),
      products: [
        new Product(1, 'Guitarra Tagima', 1500, guitar),
        new Product(2, 'Violão Seizi', 800, guitar),
        new Product(3, 'Palheta Dunlop', 5, accessory),
      ],
    }
  },

  methods: {
    addItem(product: Product) {
      this.cart.addItem(product)
    },

    removeItem(product: Product) {
      this.cart.removeItem(product)
    },
  },

  components: { ProductCard },
}
</script>

<template>
  <main>
    <div v-for="product in products" :key="product.name">
      <ProductCard :product="product" @add-item="addItem" />
    </div>
  </main>

  <div>
    <h1>Carrinho</h1>

    <div v-for="item in cart.list" :key="item.product.id">
      {{ item.product.name }} x {{ item.quantity }}

      <button @click="addItem(item.product)">+</button>

      <button @click="removeItem(item.product)">-</button>
    </div>

    <p>
      Total de itens:
      {{ cart.getTotalItems() }}
    </p>

    <p>
      Preço final:
      {{ cart.formatPrice(cart.getTotalPrice()) }}
    </p>
  </div>
</template>
