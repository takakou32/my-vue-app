import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/Main.vue'
import MonthlyAttendance from '../components/MonthlyAttendance.vue'
import Login from '../components/Login.vue'

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/main', component: Main },
    { path: '/attendance', component: MonthlyAttendance }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router