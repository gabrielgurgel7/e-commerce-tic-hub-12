<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from '@/data/products'
import { useCartStore } from '@/stores/cart'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import Rating from 'primevue/rating'
import Tag from 'primevue/tag'
import InputNumber from 'primevue/inputnumber'
import Toast from 'primevue/toast'
import Divider from 'primevue/divider'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const toast = useToast()

const product = computed(() => products.find((p) => p.id === Number(route.params.id)))
const qty = ref(1)

function formatPrice(val: number) {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function addToCart() {
  if (!product.value) return
  for (let i = 0; i < qty.value; i++) {
    cart.addItem({
      id: product.value.id,
      name: product.value.name,
      price: product.value.price,
      image: product.value.image,
    })
  }
  toast.add({
    severity: 'success',
    summary: 'Adicionado!',
    detail: `${qty.value}x ${product.value.name}`,
    life: 2500,
  })
}
</script>

<template>
  <Toast />
  <div v-if="product" class="detail-view">
    <Button label="Voltar" icon="pi pi-arrow-left" text @click="router.back()" class="back-btn" />

    <div class="detail-grid">
      <!-- Imagem -->
      <div class="detail-img-wrap">
        <img :src="product.image" :alt="product.name" class="detail-img" />
        <Tag
          v-if="product.stock <= 10"
          :value="`Apenas ${product.stock} em estoque`"
          severity="warn"
          class="stock-tag"
        />
      </div>

      <!-- Info -->
      <div class="detail-info">
        <Tag :value="product.category" class="mb-2" />
        <h1 class="detail-name">{{ product.name }}</h1>

        <div class="detail-rating">
          <Rating :modelValue="product.rating" readonly :cancel="false" />
          <span class="rating-label">{{ product.rating }} · {{ product.sales }} vendidos</span>
        </div>

        <p class="detail-price">{{ formatPrice(product.price) }}</p>

        <Divider />

        <p class="detail-desc">{{ product.description }}</p>

        <Divider />

        <div class="detail-actions">
          <div class="qty-wrap">
            <label class="qty-label">Quantidade</label>
            <InputNumber
              v-model="qty"
              :min="1"
              :max="product.stock"
              showButtons
              buttonLayout="horizontal"
            />
          </div>

          <div class="action-btns">
            <Button
              label="Adicionar ao Carrinho"
              icon="pi pi-cart-plus"
              size="large"
              @click="addToCart"
            />
            <Button
              label="Ir para o Checkout"
              icon="pi pi-credit-card"
              severity="success"
              size="large"
              @click="
                addToCart()
                router.push({ name: 'checkout' })
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <i class="pi pi-exclamation-triangle" style="font-size: 3rem; color: var(--p-yellow-400)" />
    <p>Produto não encontrado.</p>
    <Button label="Voltar à Home" @click="router.push({ name: 'home' })" />
  </div>
</template>

<style scoped>
.detail-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.back-btn {
  align-self: flex-start;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

@media (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
}

.detail-img-wrap {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  max-height: 480px;
}

.detail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stock-tag {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-name {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  margin: 0.25rem 0;
  line-height: 1.2;
}

.detail-rating {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.rating-label {
  font-size: 0.875rem;
  color: var(--p-text-muted-color);
}

.detail-price {
  font-size: 2rem;
  font-weight: 800;
  color: var(--p-primary-color);
  margin: 0.5rem 0;
}

.detail-desc {
  color: var(--p-text-muted-color);
  line-height: 1.7;
  margin: 0;
}

.detail-actions {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.qty-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.qty-label {
  font-size: 0.875rem;
  font-weight: 600;
}

.action-btns {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem;
  text-align: center;
}
</style>
