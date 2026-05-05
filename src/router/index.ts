import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Layouts
import ConsumerLayout from '@/layouts/ConsumerLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// Consumer Views
import HomeView from '@/views/consumer/HomeView.vue'
import ProductDetailView from '@/views/consumer/ProductDetailView.vue'
import CartView from '@/views/consumer/CartView.vue'
import CheckoutView from '@/views/consumer/CheckoutView.vue'

// Admin Views
import AdminProductsView from '@/views/admin/AdminProductsView.vue'
import AdminReportsView from '@/views/admin/AdminReportsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ── Consumer area ──────────────────────────────────────────
    {
      path: '/',
      component: ConsumerLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
          meta: { breadcrumb: 'Home' },
        },
        {
          path: 'produto/:id',
          name: 'product-detail',
          component: ProductDetailView,
          meta: { breadcrumb: 'Produto' },
        },
        {
          path: 'carrinho',
          name: 'cart',
          component: CartView,
          meta: { breadcrumb: 'Carrinho' },
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: CheckoutView,
          meta: { requiresAuth: true, breadcrumb: 'Checkout' },
        },
      ],
    },

    // ── Admin area ─────────────────────────────────────────────
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: '',
          redirect: '/admin/produtos',
        },
        {
          path: 'produtos',
          name: 'admin-products',
          component: AdminProductsView,
          meta: { breadcrumb: 'Produtos' },
        },
        {
          path: 'relatorios',
          name: 'admin-reports',
          component: AdminReportsView,
          meta: { breadcrumb: 'Relatórios' },
        },
      ],
    },

    // ── Catch-all ──────────────────────────────────────────────
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

// ── Navigation Guards ──────────────────────────────────────────
router.beforeEach((to) => {
  const auth = useAuthStore()

  // Guard: Checkout → requer autenticação
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return {
      name: 'home',
      query: { redirect: to.fullPath, authRequired: 'true' },
    }
  }

  // Guard: Admin → requer role ADMIN
  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return { name: 'home', query: { forbidden: 'true' } }
  }
})

export default router
