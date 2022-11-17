import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import router from '@/router'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    movieList: {
      totalMovie: ['영화1', '영화2', '전체영화'],
      popularMovie:['인기영화', '인기영화', '인기영화'],
    },
    userMovie: [],
    token: null,
  },
  getters: {
  //   isLogin(state) {
  //     return state.token ? true : false
  //   }
  },
  mutations: {
    GET_TOTAL_MOVIE(state, totalMovie) {
      state.movieList.totalMovie = totalMovie
    },
    GET_POPULAR_MOVIE(state, popularMovie) {
      state.movieList.popularMovie = popularMovie
    },
    // GET_USER_MOVIE(state, userMovie) {
    //   state.movieList.userMovie = userMovie
    // },
  //   GET_ARTICLES(state, articles) {
  //     state.articles = articles
  //   },
    SAVE_TOKEN(state, token) {
      state.token = token
      // router.push({ name: 'ArticleView' })
    },

  },
  actions: {
    getTotalMovie(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/total_movie/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
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
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res) => {
          context.commit('GET_POPULAR_MOVIE', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // getUserMovie(context) {
      //   axios({
      //     method: 'get',
      //     url: `${API_URL}/user_movie/`,
      //     headers: {
      //       Authorization: `Token ${context.state.token}`
      //     }
      //   })
      //     .then((res) => {
      //       context.commit('GET_USER_MOVIE', res.data)
      //     })
      //     .catch((err) => {
      //       console.log(err)
      //     })
      // },
    // getArticles(context) {
    //   axios({
    //     method: 'get',
    //     url: `${API_URL}/reviews/`,
    //     headers: {
    //       Authorization: `Token ${context.state.token}`
    //     }
    //   })
    //     .then((res) => {
    //       // console.log(res, context)
    //       context.commit('GET_ARTICLES', res.data)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    // signUp(context, payload) {
    //   axios({
    //     method: 'post',
    //     url: `${API_URL}/accounts/signup/`,
    //     data: {
    //       username: payload.username,
    //       password1: payload.password1,
    //       password2: payload.password2,
    //     }
    //   })
    //     .then((res) => {
    //       // console.log(res)
    //       context.commit('SAVE_TOKEN', res.data.key)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    // logIn(context, payload) {
    //   axios({
    //     method: 'post',
    //     url: `${API_URL}/accounts/login/`,
    //     data: {
    //       username: payload.username,
    //       password: payload.password,
    //     }
    //   })
    //     .then((res) => {
    //       context.commit('SAVE_TOKEN', res.data.key)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // }
  },
  modules: {
  }
})
