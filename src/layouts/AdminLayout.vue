<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white p-4">
      <h2 class="text-xl font-bold mb-4">Admin</h2>

      <nav class="flex flex-col gap-2">
        <router-link to="/admin/products">Produtos</router-link>
        <router-link to="/admin">Dashboard</router-link>
      </nav>
    </aside>

    <!-- Conteúdo -->
    <main class="flex-1 p-6 bg-gray-100">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AdminLayout',
})
</script>
