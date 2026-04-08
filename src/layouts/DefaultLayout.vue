<template>
  <div>
    <!-- Header -->
    <Menubar :model="items" class="mb-4">
      <template #item="{ item, props }">
        <router-link v-bind="props.action" :to="item.to">
          {{ item.label }}
        </router-link>
      </template>
    </Menubar>

    <!-- Conteúdo -->
    <main class="p-6">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Menubar from 'primevue/menubar'

defineOptions({
  name: 'DefaultLayout',
})

const items = [
  { label: 'Home', to: '/' },
  { label: 'Carrinho', to: '/checkout' },
  { label: 'Admin', to: '/admin' },
]
</script>
