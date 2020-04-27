import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: '',
    redirect: '/home'
  },
  {
    path: '/',
    name: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/Home.vue')
  },
  {
    path: '/taskDetailMap',
    name: 'TaskDetailMap',
    component: () => import('../views/task/TaskDetailMap.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
