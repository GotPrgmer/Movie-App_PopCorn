import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '@/views/MainView'
// import ProfileView from '@/views/ProfileView'
// import ArticleView from '@/views/ArticleView'
// import CreateView from '@/views/CreateView'
import DetailView from '@/views/DetailView'
import SignUpView from '@/views/SignUpView'
import LogInView from '@/views/LogInView'
import GameResultView from '@/views/GameResultView'
import CardCard from '@/components/CardCard'
import GameView from '@/views/GameView'

Vue.use(VueRouter)

const routes = [
  {path: '/cardcard',
  name: 'CardCard',
  component: CardCard

  },
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
    component: LogInView,
    
  },
  {
    path: '/article',
    name: 'ArticleView',
    component: () => import('@/views/ArticleView')
  },
  
  // 로그인이 필요한 페이지
  {
    path: '/actorgame',
    name: 'GameActorView',
    component: () => import('@/views/GameActorView')
  },
  {
    path: '/game',
    name: 'GameView',
    component: GameView,
  },
  {
    path: '/game/result',
    name: 'GameResultView',
    component: GameResultView,
    props: true
  },
  {
    path: '/profile',
    name: 'ProfileView',
    component: () => import('@/views/ProfileView')
  },
  {
    path: '/create/:id',
    name: 'CreateView',
    component: () => import('@/views/CreateView'),
    props: true
  },
  {
    path: '/movies/:id',
    name: 'DetailView',
    component: DetailView,
    props: true
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/NotFound')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
