<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputNumber from 'primevue/inputnumber'
import Divider from 'primevue/divider'

const cart = useCartStore()
const router = useRouter()

function formatPrice(val: number) {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
</script>

<template>
  <div class="cart-view">
    <h1 class="page-title"><i class="pi pi-shopping-cart" /> Carrinho</h1>

    <div v-if="cart.items.length === 0" class="empty-cart">
      <i class="pi pi-shopping-bag" style="font-size:3rem; opacity:0.3" />
      <p>Seu carrinho está vazio.</p>
      <Button label="Continuar comprando" icon="pi pi-arrow-left" @click="router.push({ name: 'home' })" />
    </div>

    <div v-else class="cart-layout">
      <DataTable :value="cart.items" class="cart-table">
        <Column header="Produto">
          <template #body="{ data }">
            <div class="cart-product">
              <img :src="data.image" :alt="data.name" class="cart-thumb" />
              <span class="cart-name">{{ data.name }}</span>
            </div>
          </template>
        </Column>

        <Column header="Preço unitário">
          <template #body="{ data }">{{ formatPrice(data.price) }}</template>
        </Column>

        <Column header="Quantidade">
          <template #body="{ data }">
            <InputNumber
              :modelValue="data.quantity"
              :min="1"
              showButtons
              buttonLayout="horizontal"
              @update:modelValue="val => cart.updateQuantity(data.id, val ?? 1)"
            />
          </template>
        </Column>

        <Column header="Subtotal">
          <template #body="{ data }">
            <strong>{{ formatPrice(data.price * data.quantity) }}</strong>
          </template>
        </Column>

        <Column header="">
          <template #body="{ data }">
            <Button icon="pi pi-trash" severity="danger" text @click="cart.removeItem(data.id)" />
          </template>
        </Column>
      </DataTable>

      <div class="cart-summary">
        <h3 class="summary-title">Resumo do Pedido</h3>
        <div class="summary-row">
          <span>Itens ({{ cart.totalItems }})</span>
          <span>{{ formatPrice(cart.totalPrice) }}</span>
        </div>
        <div class="summary-row">
          <span>Frete</span>
          <span class="free-ship">GRÁTIS</span>
        </div>
        <Divider />
        <div class="summary-row summary-total">
          <span>Total</span>
          <span>{{ formatPrice(cart.totalPrice) }}</span>
        </div>

        <Button
          label="Finalizar Compra"
          icon="pi pi-credit-card"
          size="large"
          class="checkout-btn"
          @click="router.push({ name: 'checkout' })"
        />
        <Button
          label="Continuar comprando"
          text
          size="small"
          @click="router.push({ name: 'home' })"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-view { display: flex; flex-direction: column; gap: 1.5rem; }
.page-title { font-size: 1.75rem; font-weight: 700; display: flex; align-items: center; gap: 0.5rem; margin: 0; }

.empty-cart {
  display: flex; flex-direction: column; align-items: center;
  gap: 1rem; padding: 4rem; text-align: center;
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2rem;
  align-items: start;
}

@media (max-width: 900px) { .cart-layout { grid-template-columns: 1fr; } }

.cart-product { display: flex; align-items: center; gap: 0.75rem; }
.cart-thumb { width: 56px; height: 56px; object-fit: cover; border-radius: 8px; }
.cart-name { font-weight: 500; }

.cart-summary {
  background: var(--p-surface-card);
  border: 1px solid var(--p-surface-border);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.summary-title { font-weight: 700; font-size: 1.1rem; margin: 0 0 0.5rem; }

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--p-text-muted-color);
}

.free-ship { color: var(--p-green-500); font-weight: 600; }

.summary-total {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--p-text-color);
}

.checkout-btn { width: 100%; justify-content: center; margin-top: 0.5rem; }
</style>
