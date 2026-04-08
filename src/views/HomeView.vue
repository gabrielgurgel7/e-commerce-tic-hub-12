<script lang="ts">
import { Category } from '@/model/category.model'
import { Product } from '@/model/product.model'
import { Cart } from '@/model/cart.model'
import ProductCard from '@/components/ProductCard.vue'
import PrimeButton from 'primevue/button'
import Card from 'primevue/card'
import InputNumber from 'primevue/inputnumber'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'

export default {
  setup() {
    const confirm = useConfirm()
    return { confirm }
  },
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

    confirmClearCart() {
      this.confirm.require({
        message: 'Tem certeza que deseja limpar o carrinho?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Cancelar',

        accept: () => {
          this.cart.list = []
        },
      })
    },
  },

  components: {
    ProductCard,
    PrimeButton,
    Card,
    InputNumber,
    ConfirmDialog,
  },
}
</script>

<template>
  <main class="p-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-item="addItem"
      />
    </div>
  </main>

  <div class="p-6">
    <Card class="p-6 mt-6 shadow-lg rounded-2xl">
      <template #title>
        <h1 class="text-xl font-bold">Carrinho</h1>
      </template>

      <template #content>
        <div v-if="cart.list.length === 0" class="text-center text-gray-500">
          <i class="pi pi-shopping-cart"></i>
          <p>Seu carrinho está vazio</p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="item in cart.list"
            :key="item.product.id"
            class="flex justify-between items-center"
          >
            <div>
              <p class="font-semibold">{{ item.product.name }}</p>
              <p class="text-sm text-gray-500">R$ {{ item.product.price }}</p>
            </div>

            <InputNumber
              :modelValue="item.quantity"
              showButtons
              buttonLayout="horizontal"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              @update:modelValue="
                (value) => {
                  if (value > item.quantity) addItem(item.product)
                  else removeItem(item.product)
                }
              "
            />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="mt-4">
          <p>Total de itens: {{ cart.getTotalItems() }}</p>
          <p class="font-bold">Total: {{ cart.formatPrice(cart.getTotalPrice()) }}</p>
          <PrimeButton
            label="Limpar Carrinho"
            icon="pi pi-trash"
            severity="danger"
            class="mt-4 w-full"
            @click="confirmClearCart"
          />
        </div>
      </template>
    </Card>
  </div>
  <ConfirmDialog />
</template>
