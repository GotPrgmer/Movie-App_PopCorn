import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '@/views/MainView'
import DetailView from '@/views/DetailView'
import SignUpView from '@/views/SignUpView'
import LogInView from '@/views/LogInView'
import GameResultView from '@/views/GameResultView'
// import CardCard from '@/components/CardCard'
import GameView from '@/views/GameView'
import ProfileView from '@/views/ProfileView'

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
    component: LogInView,
    
  },  
  // 로그인이 필요한 페이지
  // 메뉴
  {
    path: '/movies/:id',
    name: 'DetailView',
    component: DetailView,
    props: true
  },
  {
    path: '/create/:id',
    name: 'CreateView',
    component: () => import('@/views/CreateView'),
    props: true
  },
  // 게임
  {
    path: '/game',
    name: 'GameView',
    component: GameView,
  },
  {
    path: '/game/actorgame',
    name: 'GameActorView',
    component: () => import('@/views/GameActorView')
  },
  {
    path: '/game/result',
    name: 'GameResultView',
    component: GameResultView,
    props: true
  },
  // 프로필
  {
    path: '/profile/:username',
    name: 'ProfileView',
    component: ProfileView,
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
