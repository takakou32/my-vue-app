import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Main from '../components/Main.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/main', component: Main }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router