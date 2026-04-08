import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/HomeView.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Checkout from '../views/CheckoutView.vue'

import DefaultLayout from '../layouts/DefaultLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

import AdminProducts from '../views/admin/AdminProducts.vue'

// ✅ define antes
const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'home', component: Home },
      { path: 'product/:id', name: 'product', component: ProductDetail },
      { path: 'checkout', name: 'checkout', component: Checkout, meta: { requiresAuth: true } },
    ],
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAdmin: true },
    children: [{ path: '', component: AdminProducts }],
  },
]

// ✅ usa aqui
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

router.beforeEach((to) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  if (to.meta.requiresAuth && !user) return '/'
  if (to.meta.requiresAdmin && user?.role !== 'ADMIN') return '/'

  return true
})
