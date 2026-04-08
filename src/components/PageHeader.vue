<script setup lang="ts"></script>

<template>
  <div
    class="fixed w-full top-0 left-0 z-11 bg-palette-white flex items-center px-30.5 py-6 flex-row justify-between border-b border-palette-gray"
  >
    <RouterLink to="/" class="cursor-pointer"> </RouterLink>
    <nav class="flex flex-row justify-center gap-5">
      <RouterLink to="/products" class="text-palette-green hover:text-palette-orange uppercase">
        Home
      </RouterLink>
      <RouterLink to="/categories" class="text-palette-green hover:text-palette-orange uppercase">
        Carrinho
      </RouterLink>
      <RouterLink to="/about" class="text-palette-green hover:text-palette-orange uppercase">
        Admin
      </RouterLink>
    </nav>
    <div class="flex gap-5">
      <CartComponent />
    </div>
  </div>
</template>
