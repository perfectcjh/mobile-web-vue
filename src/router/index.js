import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: '',
    redirect: '/index'
  },
  {
    path: '/',
    name: '',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/index/index.vue')
  },
  {
    path: '/rootTabbar',
    name: 'RootTabbar',
    component: () => import('../views/root/RootTabbar.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/Home.vue')
  },
  {
    path: '/userCenter',
    name: 'UserCenter',
    component: () => import('../views/user/UserCenter.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('../views/user/Setting.vue')
  },
  {
    path: '/taskDetailWait',
    name: 'TaskDetailWait',
    component: () => import('../views/task/TaskDetailWait.vue')
  },
  {
    path: '/taskDetail',
    name: 'TaskDetail',
    component: () => import('../views/task/TaskDetail.vue')
  },
  {
    path: '/taskUploadPhoto',
    name: 'TaskUploadPhoto',
    component: () => import('../views/task/TaskUploadPhoto.vue')
  },
  {
    path: '/taskCheckFinish',
    name: 'TaskCheckFinish',
    component: () => import('../views/task/TaskCheckFinish.vue')
  },
  {
    path: '/signature',
    name: 'Signature',
    component: () => import('../views/task/Signature.vue')
  },
  {
    path: '/taskDetailMap',
    name: 'TaskDetailMap',
    component: () => import('../views/taskmap/TaskDetailMap.vue')
  },
  {
    path: '/taskDetailMapApp',
    name: 'TaskDetailMapApp',
    component: () => import('../views/taskmap/TaskDetailMapApp.vue')
  },
  {
    path: '/userAuth',
    name: 'UserAuth',
    component: () => import('../views/authentication/UserAuth.vue')
  },
  {
    path: '/carList',
    name: 'CarList',
    component: () => import('../views/car/CarList.vue')
  },
  {
    path: '/carAuth',
    name: 'CarAuth',
    component: () => import('../views/authentication/CarAuth.vue')
  },
  {
    path: '/searchBank',
    name: 'SearchBank',
    component: () => import('../views/search/SearchBank.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
