<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { products } from '@/data/products'
import { useCartStore } from '@/stores/cart'
import { useToast } from 'primevue/usetoast'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Rating from 'primevue/rating'
import InputText from 'primevue/inputtext'
import SelectButton from 'primevue/selectbutton'
import Toast from 'primevue/toast'
import Tag from 'primevue/tag'

const router = useRouter()
const cart = useCartStore()
const toast = useToast()

const search = ref('')
const selectedCategory = ref('Todos')

const categories = computed(() => ['Todos', ...new Set(products.map((p) => p.category))])

const filtered = computed(() => {
  return products.filter((p) => {
    const matchCat = selectedCategory.value === 'Todos' || p.category === selectedCategory.value
    const matchSearch = p.name.toLowerCase().includes(search.value.toLowerCase())
    return matchCat && matchSearch
  })
})

function formatPrice(val: number) {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function addToCart(p: (typeof products)[0]) {
  cart.addItem({ id: p.id, name: p.name, price: p.price, image: p.image })
  toast.add({
    severity: 'success',
    summary: 'Adicionado!',
    detail: `${p.name} no carrinho.`,
    life: 2500,
  })
}
</script>

<template>
  <Toast />
  <div class="home-view">
    <!-- Hero -->
    <div class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Tecnologia que <span class="hero-accent">inspira</span></h1>
        <p class="hero-sub">Os melhores produtos tech com entrega rápida e garantia estendida.</p>
      </div>
    </div>

    <!-- Filtros -->
    <div class="filters">
      <InputText v-model="search" placeholder="Buscar produto..." class="search-input" />
      <SelectButton v-model="selectedCategory" :options="categories" />
    </div>

    <!-- Grid de produtos -->
    <div class="product-grid">
      <Card
        v-for="product in filtered"
        :key="product.id"
        class="product-card"
        @click="router.push({ name: 'product-detail', params: { id: product.id } })"
      >
        <template #header>
          <div class="card-img-wrap">
            <img :src="product.image" :alt="product.name" class="card-img" />
            <Tag :value="product.category" class="card-category" />
            <Tag
              v-if="product.stock <= 10"
              value="Últimas unidades"
              severity="warn"
              class="card-stock"
            />
          </div>
        </template>
        <template #content>
          <h3 class="product-name">{{ product.name }}</h3>
          <Rating :modelValue="product.rating" readonly :cancel="false" class="product-rating" />
          <p class="product-price">{{ formatPrice(product.price) }}</p>
        </template>
        <template #footer>
          <div class="card-footer" @click.stop>
            <Button
              label="Ver detalhes"
              icon="pi pi-eye"
              severity="secondary"
              size="small"
              @click="router.push({ name: 'product-detail', params: { id: product.id } })"
            />
            <Button
              icon="pi pi-cart-plus"
              severity="primary"
              size="small"
              @click="addToCart(product)"
              v-tooltip.top="'Adicionar ao carrinho'"
            />
          </div>
        </template>
      </Card>
    </div>

    <p v-if="filtered.length === 0" class="empty-state">Nenhum produto encontrado.</p>
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hero {
  background: linear-gradient(
    135deg,
    var(--p-primary-600, #4f46e5) 0%,
    var(--p-primary-400, #818cf8) 100%
  );
  border-radius: 16px;
  padding: 3rem 2.5rem;
  color: white;
}

.hero-title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 800;
  margin: 0 0 0.5rem;
}

.hero-accent {
  opacity: 0.85;
  text-decoration: underline wavy rgba(255, 255, 255, 0.5);
}
.hero-sub {
  font-size: 1.05rem;
  opacity: 0.9;
  margin: 0;
}

.filters {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.search-input {
  width: 260px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.product-card {
  cursor: pointer;
  transition:
    transform 0.18s,
    box-shadow 0.18s;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.card-img-wrap {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-category {
  position: absolute;
  top: 10px;
  left: 10px;
}

.card-stock {
  position: absolute;
  top: 10px;
  right: 10px;
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  line-height: 1.3;
}

.product-rating {
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--p-primary-color);
  margin: 0;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.empty-state {
  text-align: center;
  color: var(--p-text-muted-color);
  padding: 3rem;
}
</style>
