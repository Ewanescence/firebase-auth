import { auth } from '../firebase'
import store from '../store'
import { createRouter, createWebHistory } from 'vue-router'

const routeOptions = [
  { path: '/', name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', meta: { requiresAuth: true }},
  { path: '/login', name: 'Login', meta: { unallowedAuth: true }},
  { path: '/signup', name: 'Signup', meta: { unallowedAuth: true }},
]

const routes = routeOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/views/${route.name}View.vue`)
  }
})

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.unallowedAuth) && auth.currentUser) {
    next('/dashboard')
    return
  }
  if (to.matched.some(record => record.meta.requiresAuth) && !store.state.user && store.state.fetched) {
    next('/login')
    return;
  }
  next();
}) 

export default router
