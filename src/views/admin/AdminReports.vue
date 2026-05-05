<script setup lang="ts">
import { salesData, products } from '@/data/products'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'

const totalRevenue = salesData.reduce((s, d) => s + d.revenue, 0)
const totalOrders = salesData.reduce((s, d) => s + d.orders, 0)
const topProducts = [...products].sort((a, b) => b.sales - a.sales).slice(0, 5)

function formatPrice(val: number) {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function barWidth(val: number, max: number) {
  return `${(val / max) * 100}%`
}

const maxRevenue = Math.max(...salesData.map((d) => d.revenue))
</script>

<template>
  <div class="admin-reports">
    <div class="section-header">
      <h1 class="section-title">Relatórios de Vendas</h1>
      <p class="section-sub">Visão geral do desempenho</p>
    </div>

    <!-- KPIs -->
    <div class="kpi-row">
      <div class="kpi-card kpi-revenue">
        <p class="kpi-label">Receita Total</p>
        <p class="kpi-value">{{ formatPrice(totalRevenue) }}</p>
        <p class="kpi-delta">▲ 18% vs mês anterior</p>
      </div>
      <div class="kpi-card kpi-orders">
        <p class="kpi-label">Total de Pedidos</p>
        <p class="kpi-value">{{ totalOrders }}</p>
        <p class="kpi-delta">▲ 12% vs mês anterior</p>
      </div>
      <div class="kpi-card kpi-avg">
        <p class="kpi-label">Ticket Médio</p>
        <p class="kpi-value">{{ formatPrice(totalRevenue / totalOrders) }}</p>
        <p class="kpi-delta">▲ 5% vs mês anterior</p>
      </div>
    </div>

    <!-- Revenue chart (CSS bars) -->
    <div class="chart-card">
      <h3 class="chart-title">Receita por Mês</h3>
      <div class="bar-chart">
        <div v-for="item in salesData" :key="item.month" class="bar-group">
          <span class="bar-value">{{ formatPrice(item.revenue) }}</span>
          <div class="bar-track">
            <div class="bar-fill" :style="{ height: barWidth(item.revenue, maxRevenue) }" />
          </div>
          <span class="bar-label">{{ item.month }}</span>
        </div>
      </div>
    </div>

    <!-- Top products table -->
    <div class="table-section">
      <h3 class="chart-title">Top 5 Produtos</h3>
      <DataTable :value="topProducts" stripedRows>
        <Column header="Produto">
          <template #body="{ data }">
            <div class="prod-cell">
              <img :src="data.image" :alt="data.name" class="prod-thumb" />
              <span>{{ data.name }}</span>
            </div>
          </template>
        </Column>
        <Column field="category" header="Categoria">
          <template #body="{ data }"><Tag :value="data.category" /></template>
        </Column>
        <Column header="Receita">
          <template #body="{ data }">{{ formatPrice(data.price * data.sales) }}</template>
        </Column>
        <Column field="sales" header="Vendas" sortable />
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
.admin-reports {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.section-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
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
  margin: 0;
}

.kpi-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.kpi-card {
  background: #1e1e2e;
  border: 1px solid #2d2d3d;
  border-radius: 12px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
}

.kpi-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
}

.kpi-revenue::before {
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
}
.kpi-orders::before {
  background: linear-gradient(90deg, #10b981, #06d6a0);
}
.kpi-avg::before {
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
}

.kpi-label {
  font-size: 0.75rem;
  color: #64748b;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0 0 0.5rem;
}
.kpi-value {
  font-size: 1.75rem;
  font-weight: 800;
  color: #f1f5f9;
  margin: 0 0 0.25rem;
}
.kpi-delta {
  font-size: 0.75rem;
  color: #10b981;
  margin: 0;
}

/* Bar chart */
.chart-card {
  background: #1e1e2e;
  border: 1px solid #2d2d3d;
  border-radius: 12px;
  padding: 1.5rem;
}

.chart-title {
  font-size: 1rem;
  font-weight: 600;
  color: #e2e8f0;
  margin: 0 0 1.5rem;
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  height: 180px;
}

.bar-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  height: 100%;
}

.bar-value {
  font-size: 0.6rem;
  color: #64748b;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  flex-shrink: 0;
}

.bar-track {
  flex: 1;
  width: 100%;
  background: #2d2d3d;
  border-radius: 6px 6px 0 0;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.bar-fill {
  width: 100%;
  background: linear-gradient(180deg, #6366f1, #8b5cf6);
  border-radius: 6px 6px 0 0;
  transition: height 0.6s ease;
  min-height: 4px;
}

.bar-label {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
}

.table-section {
  background: #1e1e2e;
  border: 1px solid #2d2d3d;
  border-radius: 12px;
  padding: 1.5rem;
}

.prod-cell {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.prod-thumb {
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 6px;
}
</style>
