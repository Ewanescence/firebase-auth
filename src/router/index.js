import { createRouter, createWebHistory } from 'vue-router'

// Required imports
import store from '../store'
import { auth } from '../firebase'

// Routes options declarations
const routeOptions = [
  { path: '/', name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', meta: { requiresAuth: true }}, // requiresAuth asks to the user to be connected
  { path: '/login', name: 'Login', meta: { unallowedAuth: true }}, // unallowedAuth blocks the connected user
  { path: '/signup', name: 'Signup', meta: { unallowedAuth: true }},
]

// Importing every component for each RoutesOptions declared
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
  // if a connected user tries to go to [signup, login] pages, he's redirected to his own space
  if (to.matched.some(record => record.meta.unallowedAuth) && auth.currentUser) {
    next('/dashboard')
    return
  }
  // we're waiting that the user (user or null) is fetched then we redirect the user if he's not connected
  if (to.matched.some(record => record.meta.requiresAuth) && !store.state.user && store.state.fetched) {
    next('/login')
    return;
  }
  next();
}) 

export default router
