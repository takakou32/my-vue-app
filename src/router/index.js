import { createRouter, createWebHistory } from 'vue-router'
import Main from './components/Main.vue'
import MonthlyAttendance from './components/MonthlyAttendance.vue'
import Login from './components/Login.vue'

const routes = [
  { path: '/', component: Main },
  { path: '/attendance', component: MonthlyAttendance },
  { path: '/login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router