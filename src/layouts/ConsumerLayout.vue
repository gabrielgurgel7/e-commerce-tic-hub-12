<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Breadcrumb from 'primevue/breadcrumb'
import Button from 'primevue/button'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const sidebarItems = [
  { label: 'Produtos', icon: 'pi pi-box', to: '/admin/produtos' },
  { label: 'Relatórios', icon: 'pi pi-chart-bar', to: '/admin/relatorios' },
  { label: 'Voltar à Loja', icon: 'pi pi-arrow-left', to: '/' },
]

const breadcrumbHome = { icon: 'pi pi-home', command: () => router.push('/admin') }
const breadcrumbItems = computed(() => {
  const crumbs = []
  if (route.meta.breadcrumb) {
    crumbs.push({ label: route.meta.breadcrumb as string })
  }
  return crumbs
})
</script>

<template>
  <div class="admin-shell">
    <!-- ── Sidebar ── -->
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <span class="sidebar-logo">⚡</span>
        <div>
          <p class="sidebar-title">TechStore</p>
          <p class="sidebar-sub">Painel Admin</p>
        </div>
      </div>

      <nav class="sidebar-nav">
        <router-link
          v-for="item in sidebarItems"
          :key="item.to"
          :to="item.to"
          class="sidebar-item"
          active-class="sidebar-item--active"
        >
          <i :class="item.icon" />
          <span>{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="sidebar-user">
        <div class="sidebar-user-info">
          <i class="pi pi-user" />
          <div>
            <p class="sidebar-user-name">{{ auth.user?.name }}</p>
            <p class="sidebar-user-role">{{ auth.user?.role }}</p>
          </div>
        </div>
        <Button
          icon="pi pi-sign-out"
          severity="secondary"
          text
          rounded
          @click="
            auth.logout()
            router.push('/')
          "
          v-tooltip="'Sair'"
        />
      </div>
    </aside>

    <!-- ── Main content ── -->
    <div class="admin-content">
      <!-- Topbar -->
      <header class="admin-topbar">
        <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" class="admin-breadcrumb" />
        <div class="topbar-right">
          <span class="topbar-time">{{
            new Date().toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
            })
          }}</span>
        </div>
      </header>

      <!-- Page -->
      <main class="admin-main">
        <router-view v-slot="{ Component }">
          <transition name="slide-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-shell {
  display: flex;
  min-height: 100vh;
  background: #0f0f14;
  color: #e2e8f0;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

/* ── Sidebar ── */
.admin-sidebar {
  width: 240px;
  flex-shrink: 0;
  background: #16161e;
  border-right: 1px solid #2d2d3d;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1.5rem 1.5rem;
  border-bottom: 1px solid #2d2d3d;
  margin-bottom: 1rem;
}

.sidebar-logo {
  font-size: 1.75rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.sidebar-title {
  font-weight: 700;
  font-size: 1rem;
  color: #f1f5f9;
  margin: 0;
}

.sidebar-sub {
  font-size: 0.7rem;
  color: #6366f1;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 0;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0 0.75rem;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.15s ease;
}

.sidebar-item:hover {
  background: #1e1e2e;
  color: #e2e8f0;
}

.sidebar-item--active {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
  color: #818cf8;
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.sidebar-user {
  padding: 1rem 1.25rem 0;
  border-top: 1px solid #2d2d3d;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar-user-info {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
}

.sidebar-user-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: #e2e8f0;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-user-role {
  font-size: 0.65rem;
  color: #6366f1;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin: 0;
}

/* ── Main ── */
.admin-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.admin-topbar {
  height: 56px;
  background: #16161e;
  border-bottom: 1px solid #2d2d3d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
}

.admin-breadcrumb {
  background: transparent;
  border: none;
  padding: 0;
}

:deep(.p-breadcrumb) {
  background: transparent !important;
  border: none !important;
}

:deep(.p-breadcrumb-list li .p-breadcrumb-item-link) {
  color: #94a3b8;
}

:deep(.p-breadcrumb-list li:last-child .p-breadcrumb-item-link) {
  color: #818cf8;
}

.topbar-time {
  font-size: 0.8rem;
  color: #64748b;
  text-transform: capitalize;
}

.admin-main {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

/* Transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(12px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}
</style>
