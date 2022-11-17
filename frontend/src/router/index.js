import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '@/views/MainView'
// import ProfileView from '@/views/ProfileView'
// import ArticleView from '@/views/ArticleView'
// import CreateView from '@/views/CreateView'
import DetailView from '@/views/DetailView'
import SignUpView from '@/views/SignUpView'
import LogInView from '@/views/LogInView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainView',
    component: MainView
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/login',
    name: 'LogInView',
    component: LogInView
  },
  {
    path: '/article',
    name: 'ArticleView',
    component: () => import('@/views/ArticleView')
  },
  {
    path: '/actorgame',
    name: 'GameActorView',
    component: () => import('@/views/GameActorView')
  },
  
  // 로그인이 필요한 페이지
  {
    path: '/profile',
    name: 'ProfileView',
    component: () => import('@/views/ProfileView')
  },
  {
    path: '/create',
    name: 'CreateView',
    component: () => import('@/views/CreateView')
  },
  {
    path: '/:id',
    name: 'DetailView',
    component: DetailView,
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
