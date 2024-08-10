import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/Main.vue'
import MonthlyAttendance from '../components/MonthlyAttendance.vue'
import Login from '../components/Login.vue'

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: Login },
    { 
      path: '/main/:username', 
      name: 'main',
      component: Main,
      props: true,
      children: [
        { path: '', component: { template: '<p>ようこそ、メイン画面へ！</p>' } },
        { path: 'attendance', name: 'attendance', component: MonthlyAttendance, props: true }
      ]
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router