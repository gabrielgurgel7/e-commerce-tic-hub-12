<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const products = [
  { id: 1, name: 'Guitarra', price: 1500 },
  { id: 2, name: 'Violão', price: 800 },
]
</script>

<template>
  <DataTable :value="products">
    <Column field="name" header="Nome" />
    <Column field="price" header="Preço" />
  </DataTable>
</template>
