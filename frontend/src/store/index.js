import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'
import router from '@/router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    // 영화 정보
    //GET_TOTAL_MOVIE
    movieList: {
      totalMovie: ['영화1', '영화2', '전체영화'],
      popularMovie:['인기영화', '인기영화', '인기영화'],
    },

    // 유저 정보
    //GET_USER_INFO
    username: null,
    userId: null,
    nickname: null,
    //SAVE_TOKEN, LOGOUT
    token: null,
    //GET_USER_LIKES
    userLikes: null,
    userImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy0HhhQ-N7_AmPj4ExJoue4xxXdMGcvXWfMrfC0XcDGg&s',
    usermovie: [],
    userreviews: [],
    // 리뷰 정보
    //GET_ARTICLES
    articles: null,
    
    // 게임 정보
    
    
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    },
  },
  mutations: {
    GET_TOTAL_MOVIE(state, totalMovie) {
      state.movieList.totalMovie = totalMovie
    },
    GET_POPULAR_MOVIE(state, popularMovie) {
      state.movieList.popularMovie = popularMovie.splice(11, 10)
    },
    GET_USER_INFO(state, userInfo) {
      state.userId = userInfo.id
      state.nickname = userInfo.nickname
    },
    GET_USER_LIKES(state, userLikes) {
      state.movieList.userLikes = userLikes
    },
    GET_USER_MOVIE(state, usermovie) {
      state.usermovie = usermovie
    },
    GET_USER_REVIEW(state, reviews) {
      state.userreviews = reviews
    },
    GET_ARTICLES(state, articles) {
      state.articles = articles
    },
    SAVE_TOKEN(state, res) {
      state.token = res.data.key
      console.log(state.token)
      state.username = JSON.parse(res.config.data).username
      // console.log(state.username)
      router.push({ name: 'MainView' })
    },
    LOGOUT(state) {
      localStorage.removeItem('User')
      state.token = null
      state.username = null
      state.userId = null
      state.nickname = null
      state.userLikes = null
      state.userImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy0HhhQ-N7_AmPj4ExJoue4xxXdMGcvXWfMrfC0XcDGg&s'
      router.push({ name: 'MainView' }).catch(()=>{}) // 메인뷰인 채로 로그아웃하면 redirection오류가 생기는데 .catch로 무시했음
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
    getUserInfo(context, username) {
      axios({
        method: 'get',
        url: `${API_URL}/accountsinfo/${username}/`,
        // headers: {
        //   Authorization: `Token ${context.state.token}`
        // }
      })
        .then((res) => {
          // console.log(res)
          context.commit('GET_USER_INFO', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getUserMovie(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/like/${context.state.username}/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res) => {
          // console.log(res.data.userlike)
          context.commit('GET_USER_MOVIE', res.data.userlike)
        })
        .catch((err) => {
          console.log(err)
          console.log('좋아요한 영화들')
        })
    },
    getUserReview(context) {
      axios({
        method: 'get',
        url: `${API_URL}accountsinfo/written/${context.state.username}/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res) => {
          context.commit('GET_USER_REVIEW', res.data.user_reviews)
        })
        .catch((err) => {
          console.log(err)
          console.log('내 리뷰들 실패')
        })
    },
    // getUserLikes(context) {
    //     axios({
    //       method: 'post',
    //       url: `${API_URL}/movies/like/${context.state.user_id}/`,
    //       headers: {
    //         Authorization: `Token ${context.state.token}`
    //       }
    //     })
    //       .then((res) => {
    //         context.commit('GET_USER_LIKES', res.data)
    //       })
    //       .catch((err) => {
    //         console.log(err)
    //       })
    //   },
    getArticles(context, movieId) {
      // console.log(movieId)
      axios({
        method: 'get',
        url: `${API_URL}/movies/reviews/${movieId}/`,
        // data: {
        //   movieId
        // }
        headers: {
          Authorization: `Token ${context.state.token}`
        },
     })
        .then((res) => {
          // console.log(res.data)
          context.commit('GET_ARTICLES', res.data)
        })
        .catch((err) => {
          console.log(err)
          console.log('게시글에러')
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
          // profile_image: payload.profileimg
        }
      })
        .then((res) => {
          // console.log(res.data)
          context.commit('SAVE_TOKEN', res)
          context.dispatch('getUserInfo', payload.username)
        })
        .catch((err) => {
          console.log(err)
          const Swal = require('sweetalert2')
          Swal.fire({
            title: '받아줄 수 없다',
            text: ' ',
            width: 600,
            padding: 'em',
            color: '#fff',
            className: "alert-text",
            background: '#fff url(https://media.tenor.com/2roX3uxz_68AAAAM/cat-space.gif)',
            backdrop:`
              rgba(0,0,123,0.4)
              url("")
              left top
              no-repeat
            `
          })
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
          // console.log(JSON.parse(res.config.data).username)
          context.commit('SAVE_TOKEN', res)
          context.dispatch('getUserInfo', payload.username)
        })
        .catch((err) => {
          console.log(err)
          const Swal = require('sweetalert2')
          Swal.fire({
            title: '누구세요?',
            text: ' ',
            width: 600,
            padding: 'em',
            color: '#fff',
            className: "alert-text",
            background: '#fff url(https://media.tenor.com/2roX3uxz_68AAAAM/cat-space.gif)',
            backdrop:`
              rgba(0,0,123,0.4)
              url("")
              left top
              no-repeat
            `
          })
        })
    },
    logOut(context) {
      context.commit('LOGOUT')
    },
  },
  modules: {
  }
})
