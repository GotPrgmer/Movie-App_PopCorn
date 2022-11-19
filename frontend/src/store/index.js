import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'
import router from '@/router'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    // 영화 정보
    movieList: {
      totalMovie: ['영화1', '영화2', '전체영화'],
      popularMovie:['인기영화', '인기영화', '인기영화'],
    },
    // 유저 정보
    username: null,
    userLikes: null,
    token: null,

    userImg: '@/src/assets/logo.png',
    // 게임 정보
    
    
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    }
  },
  mutations: {
    GET_TOTAL_MOVIE(state, totalMovie) {
      state.movieList.totalMovie = totalMovie.splice(0, 10)
    },
    GET_POPULAR_MOVIE(state, popularMovie) {
      state.movieList.popularMovie = popularMovie.splice(11, 10)
    },
    GET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    GET_USER_LIKES(state, userLikes) {
      state.movieList.userLikes = userLikes
    },
    GET_ARTICLES(state, articles) {
      state.articles = articles
    },
    SAVE_TOKEN(state, res) {
      state.token = res.data.key
      state.username = res.config.data.username
      router.push({ name: 'MainView' })
    },
    LOGOUT(state) {
      localStorage.removeItem('User')
      state.token = null
      router.push({ name: 'MainView' })
    }
  },
  actions: {
    getTotalMovie(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/total_movie/`,
        // headers: {
        //   Authorization: `Token ${context.state.token}`
        // }
      })
        .then((res) => {
          context.commit('GET_TOTAL_MOVIE', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getPopularMovie(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/total_movie/`,
        // headers: {
        //   Authorization: `Token ${context.state.token}`
        // }
      })
        .then((res) => {
          context.commit('GET_POPULAR_MOVIE', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getUserInfo(context) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/written/${context.state.username}`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res) => {
          console.log(res)
          context.commit('GET_USER_INFO', res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getUserLikes(context) {
        axios({
          method: 'post',
          url: `${API_URL}/movies/like/${context.state.user_id}/`,
          headers: {
            Authorization: `Token ${context.state.token}`
          }
        })
          .then((res) => {
            context.commit('GET_USER_LIKES', res.data)
          })
          .catch((err) => {
            console.log(err)
          })
      },
    getArticles(context) {
      axios({
        method: 'get',
        url: `${API_URL}/reviews/`,
   //     headers: {
   //       Authorization: `Token ${context.state.token}`
   //     }
     })
        .then((res) => {
          // console.log(res, context)
          context.commit('GET_ARTICLES', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    signUp(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: payload.username,
          nickname: payload.nickname,
          password1: payload.password1,
          password2: payload.password2,
          // first_name: payload.firstname,
          // last_name: payload.lastname,
          // email: payload.email,
        }
      })
        .then((res) => {
          // console.log(res.data)
          context.commit('SAVE_TOKEN', res)
        })
        .catch((err) => {
          console.log(err)
          alert('형식이 잘못 되었습니다ㅠㅅㅠ')
        })
    },
    logIn(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username: payload.username,
          password: payload.password,
        }
      })
        .then((res) => {
          // console.log(res)
          context.commit('SAVE_TOKEN', res)
        })
        .catch((err) => {
          console.log(err)
          alert('존재하지 않는 정보입니다ㅜ0ㅜ')
        })
    },
    logOut(context) {
      context.commit('LOGOUT')
    },
  },
  modules: {
  }
})
