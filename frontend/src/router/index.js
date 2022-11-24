import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '@/views/MainView'
import DetailView from '@/views/DetailView'
import SignUpView from '@/views/SignUpView'
import LogInView from '@/views/LogInView'
import GameResultView from '@/views/GameResultView'
import FriendList from '@/views/FriendList'
import GameView from '@/views/GameView'
import ProfileView from '@/views/ProfileView'
import CardCard from '@/components/CardCard'
// import Store from '@/store/index/Store'

Vue.use(VueRouter)
// const isLogin = Store.getters.isLogin

const routes = [
  {
    path: '/cardcard',
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
    component: SignUpView,
    // beforeEnter(to, from, next) {
    //   console.log(Vue)
    //   if (isLogin) {
    //     next({ name: 'MainView' })
    //   } else {
    //     next()
    //   }
    // }
  },
  {
    path: '/login',
    name: 'LogInView',
    component: LogInView,
    // beforeEnter(to, from, next) {
    //   if (isLogin) {
    //     next({ name: 'MainView' })
    //   } else {
    //     next()
    //   }
    // }
  },  
  // 로그인이 필요한 페이지
  // 메뉴
  {
    path: '/movies/:id',
    name: 'DetailView',
    component: DetailView,
    props: true,
    // beforeEnter(to, from, next) {
    //   if (!isLogin) {
    //     next({ name: 'LogInView' })
    //   } else {
    //     next()
    //   }
    // }
  },
  {
    path: '/create/:id',
    name: 'CreateView',
    component: () => import('@/views/CreateView'),
    props: true,
    // beforeEnter(to, from, next) {
    //   if (!isLogin) {
    //     next({ name: 'LogInView' })
    //   } else {
    //     next()
    //   }
    // }
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
    path: '/game/scenegame',
    name: 'GameSceneView',
    component: () => import('@/views/GameSceneView')
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
    props: true,
    // beforeEnter(to, from, next) {
    //   if (!isLogin) {
    //     next({ name: 'LogInView' })
    //   } else {
    //     next()
    //   }
    // }
  },
  {
    path: '/profile/:username/friends',
    name: 'FriendList',
    component: FriendList,
    props: true,
    // beforeEnter(to, from, next) {
    //   if (!isLogin) {
    //     next({ name: 'LogInView' })
    //   } else {
    //     next()
    //   }
    // }
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
