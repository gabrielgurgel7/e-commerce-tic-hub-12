<script setup lang="ts">
import { ref, computed } from 'vue'
import { products } from '@/data/products'
import type { Product } from '@/data/products'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import InputText from 'primevue/inputtext'
import Rating from 'primevue/rating'
import { useConfirm } from 'primevue/useconfirm'
import ConfirmDialog from 'primevue/confirmdialog'

const confirm = useConfirm()
const search = ref('')
const productList = ref<Product[]>([...products])

const filtered = computed(() =>
  productList.value.filter(
    (p) =>
      p.name.toLowerCase().includes(search.value.toLowerCase()) ||
      p.category.toLowerCase().includes(search.value.toLowerCase()),
  ),
)

function formatPrice(val: number) {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function confirmDelete(product: Product) {
  confirm.require({
    message: `Remover "${product.name}" do catálogo?`,
    header: 'Confirmar remoção',
    icon: 'pi pi-exclamation-triangle',
    acceptSeverity: 'danger',
    accept: () => {
      productList.value = productList.value.filter((p) => p.id !== product.id)
    },
  })
}
</script>

<template>
  <ConfirmDialog />
  <div class="admin-products">
    <div class="section-header">
      <div>
        <h1 class="section-title">Produtos</h1>
        <p class="section-sub">Gerencie o catálogo da loja</p>
      </div>
      <Button label="Novo produto" icon="pi pi-plus" size="small" />
    </div>

    <!-- Stats cards -->
    <div class="stats-row">
      <div class="stat-card">
        <i class="pi pi-box stat-icon" style="color: #6366f1" />
        <div>
          <p class="stat-value">{{ productList.length }}</p>
          <p class="stat-label">Total de produtos</p>
        </div>
      </div>
      <div class="stat-card">
        <i class="pi pi-tag stat-icon" style="color: #10b981" />
        <div>
          <p class="stat-value">{{ new Set(productList.map((p) => p.category)).size }}</p>
          <p class="stat-label">Categorias</p>
        </div>
      </div>
      <div class="stat-card">
        <i class="pi pi-exclamation-circle stat-icon" style="color: #f59e0b" />
        <div>
          <p class="stat-value">{{ productList.filter((p) => p.stock <= 10).length }}</p>
          <p class="stat-label">Estoque baixo</p>
        </div>
      </div>
      <div class="stat-card">
        <i class="pi pi-chart-line stat-icon" style="color: #ec4899" />
        <div>
          <p class="stat-value">{{ productList.reduce((s, p) => s + p.sales, 0) }}</p>
          <p class="stat-label">Total vendido</p>
        </div>
      </div>
    </div>

    <!-- Search -->
    <div class="table-toolbar">
      <InputText
        v-model="search"
        placeholder="Buscar produto ou categoria..."
        class="search-input"
      />
      <span class="result-count">{{ filtered.length }} resultado(s)</span>
    </div>

    <!-- DataTable -->
    <DataTable
      :value="filtered"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20]"
      stripedRows
      class="products-table"
      tableStyle="min-width: 60rem"
    >
      <Column header="Produto" style="min-width: 220px">
        <template #body="{ data }">
          <div class="product-cell">
            <img :src="data.image" :alt="data.name" class="product-thumb" />
            <div>
              <p class="product-cell-name">{{ data.name }}</p>
              <p class="product-cell-id">#{{ data.id }}</p>
            </div>
          </div>
        </template>
      </Column>

      <Column field="category" header="Categoria">
        <template #body="{ data }">
          <Tag :value="data.category" />
        </template>
      </Column>

      <Column header="Preço">
        <template #body="{ data }">{{ formatPrice(data.price) }}</template>
      </Column>

      <Column header="Estoque">
        <template #body="{ data }">
          <Tag :value="data.stock + ' un.'" :severity="data.stock <= 10 ? 'warn' : 'success'" />
        </template>
      </Column>

      <Column header="Avaliação">
        <template #body="{ data }">
          <Rating :modelValue="data.rating" readonly :cancel="false" />
        </template>
      </Column>

      <Column header="Vendas" field="sales" sortable />

      <Column header="Ações">
        <template #body="{ data }">
          <div class="action-btns">
            <Button icon="pi pi-pencil" size="small" text rounded />
            <Button
              icon="pi pi-trash"
              size="small"
              text
              rounded
              severity="danger"
              @click="confirmDelete(data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
.admin-products {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0;
}
.section-sub {
  font-size: 0.85rem;
  color: #64748b;
  margin: 0.25rem 0 0;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: #1e1e2e;
  border: 1px solid #2d2d3d;
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  font-size: 1.75rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0;
}
.stat-label {
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
}

.table-toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-input {
  width: 280px;
}
.result-count {
  font-size: 0.8rem;
  color: #64748b;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.product-thumb {
  width: 44px;
  height: 44px;
  object-fit: cover;
  border-radius: 6px;
}
.product-cell-name {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
  color: #e2e8f0;
}
.product-cell-id {
  font-size: 0.7rem;
  color: #64748b;
  margin: 0;
}

.action-btns {
  display: flex;
  gap: 0.25rem;
}
</style>
