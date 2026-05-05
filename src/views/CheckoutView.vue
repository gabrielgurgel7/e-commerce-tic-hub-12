<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Divider from 'primevue/divider'
import Toast from 'primevue/toast'
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import Step from 'primevue/step'
import StepPanels from 'primevue/steppanels'
import StepPanel from 'primevue/steppanel'

const cart = useCartStore()
const auth = useAuthStore()
const router = useRouter()
const toast = useToast()

const activeStep = ref(1)

const form = ref({
  name: auth.user?.name ?? '',
  email: auth.user?.email ?? '',
  cep: '',
  address: '',
  card: '',
  cvv: '',
})

function formatPrice(val: number) {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function confirmOrder() {
  cart.clear()
  toast.add({
    severity: 'success',
    summary: '🎉 Pedido confirmado!',
    detail: 'Obrigado pela compra!',
    life: 4000,
  })
  setTimeout(() => router.push({ name: 'home' }), 2000)
}
</script>

<template>
  <Toast />
  <div class="checkout-view">
    <h1 class="page-title"><i class="pi pi-credit-card" /> Checkout</h1>

    <div class="checkout-grid">
      <!-- Stepper de checkout -->
      <div class="checkout-steps">
        <Stepper v-model:value="activeStep" linear>
          <StepList>
            <Step :value="1">Entrega</Step>
            <Step :value="2">Pagamento</Step>
            <Step :value="3">Confirmação</Step>
          </StepList>

          <StepPanels>
            <!-- Etapa 1: Entrega -->
            <StepPanel :value="1" v-slot="{ activateCallback }">
              <div class="step-content">
                <h3>Endereço de entrega</h3>
                <div class="form-row">
                  <label>Nome completo</label>
                  <InputText v-model="form.name" class="w-full" />
                </div>
                <div class="form-row">
                  <label>E-mail</label>
                  <InputText v-model="form.email" type="email" class="w-full" />
                </div>
                <div class="form-row">
                  <label>CEP</label>
                  <InputText v-model="form.cep" placeholder="00000-000" class="w-full" />
                </div>
                <div class="form-row">
                  <label>Endereço</label>
                  <InputText
                    v-model="form.address"
                    placeholder="Rua, número, bairro"
                    class="w-full"
                  />
                </div>
                <div class="step-actions">
                  <Button
                    label="Próximo"
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    @click="activateCallback(2)"
                  />
                </div>
              </div>
            </StepPanel>

            <!-- Etapa 2: Pagamento -->
            <StepPanel :value="2" v-slot="{ activateCallback }">
              <div class="step-content">
                <h3>Dados de pagamento</h3>
                <div class="mock-card">
                  <div class="mock-card-top">
                    <span>💳 Cartão de Crédito</span>
                    <span>VISA</span>
                  </div>
                  <InputText v-model="form.card" placeholder="0000 0000 0000 0000" class="w-full" />
                  <InputText v-model="form.cvv" placeholder="CVV" style="max-width: 100px" />
                </div>
                <div class="step-actions">
                  <Button label="Voltar" severity="secondary" @click="activateCallback(1)" />
                  <Button
                    label="Próximo"
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    @click="activateCallback(3)"
                  />
                </div>
              </div>
            </StepPanel>

            <!-- Etapa 3: Confirmação -->
            <StepPanel :value="3">
              <div class="step-content">
                <h3>Revisar pedido</h3>
                <div class="confirm-summary">
                  <div v-for="item in cart.items" :key="item.id" class="confirm-item">
                    <img :src="item.image" :alt="item.name" class="confirm-thumb" />
                    <span class="confirm-name">{{ item.name }} ×{{ item.quantity }}</span>
                    <span class="confirm-price">{{ formatPrice(item.price * item.quantity) }}</span>
                  </div>
                  <Divider />
                  <div class="confirm-total">
                    <strong>Total</strong>
                    <strong>{{ formatPrice(cart.totalPrice) }}</strong>
                  </div>
                </div>

                <div class="step-actions">
                  <Button
                    label="Confirmar Pedido"
                    icon="pi pi-check"
                    severity="success"
                    size="large"
                    @click="confirmOrder"
                  />
                </div>
              </div>
            </StepPanel>
          </StepPanels>
        </Stepper>
      </div>

      <!-- Resumo lateral -->
      <div class="order-sidebar">
        <h3 class="sidebar-title">Seu pedido</h3>
        <div v-for="item in cart.items" :key="item.id" class="order-item">
          <img :src="item.image" :alt="item.name" class="order-thumb" />
          <div class="order-item-info">
            <span class="order-item-name">{{ item.name }}</span>
            <span class="order-item-qty">×{{ item.quantity }}</span>
          </div>
          <span class="order-item-price">{{ formatPrice(item.price * item.quantity) }}</span>
        </div>
        <Divider />
        <div class="order-total">
          <span>Total</span>
          <span>{{ formatPrice(cart.totalPrice) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
}

.checkout-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  align-items: start;
}

@media (max-width: 840px) {
  .checkout-grid {
    grid-template-columns: 1fr;
  }
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
}
.step-content h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.form-row label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--p-text-muted-color);
}

.step-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.mock-card {
  background: var(--p-surface-ground);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mock-card-top {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 0.9rem;
}

.confirm-summary {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.confirm-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.confirm-thumb {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 6px;
}
.confirm-name {
  flex: 1;
  font-size: 0.875rem;
}
.confirm-price {
  font-weight: 600;
  font-size: 0.875rem;
}

.confirm-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
}

/* Sidebar */
.order-sidebar {
  background: var(--p-surface-card);
  border: 1px solid var(--p-surface-border);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sidebar-title {
  font-weight: 700;
  margin: 0 0 0.5rem;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.order-thumb {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
}
.order-item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.order-item-name {
  font-size: 0.8rem;
  font-weight: 500;
}
.order-item-qty {
  font-size: 0.75rem;
  color: var(--p-text-muted-color);
}
.order-item-price {
  font-size: 0.85rem;
  font-weight: 600;
}

.order-total {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1rem;
}
</style>
