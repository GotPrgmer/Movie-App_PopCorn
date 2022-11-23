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
    userImg: null,

    // 익명의 정보
    firendInfo: null,
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
      state.movieList.popularMovie = popularMovie
    },
    GET_USER_INFO(state, userInfo) {
      // console.log(userInfo.profile_image)
      state.userId = userInfo.id
      state.nickname = userInfo.nickname
      state.userImg = userInfo.profile_image     
      router.push({ name: 'MainView' })
    },
    GET_FRIEND_INFO(state, friendinfo) {
      state.firendInfo = friendinfo
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
    GET_USER_LIKES(state, userLikes) {
      state.movieList.userLikes = userLikes
    },
    SAVE_TOKEN(state, res) {
      state.token = res.data.key
      // console.log(res)
      // state.username = JSON.parse(res.config.data).username

      // console.log(state.username)
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
    // getUserMovie(context, username) {
    //   axios({
    //     method: 'get',
    //     url: `${API_URL}/movies/like/${username}/`,
    //     headers: {
    //       Authorization: `Token ${context.state.token}`
    //     }
    //   })
    //     .then((res) => {
    //       // console.log(res.data.userlike)
    //       context.commit('GET_USER_MOVIE', res.data.userlike)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //       console.log('좋아요한 영화들')
    //     })
    // },
    // getUserReview(context, username) {
    //   axios({
    //     method: 'get',
    //     url: `${API_URL}/accountsinfo/written/${username}/`,
    //     headers: {
    //       Authorization: `Token ${context.state.token}`
    //     }
    //   })
    //     .then((res) => {
    //       context.commit('GET_USER_REVIEW', res.data.user_reviews)
    //       console.log(res.data.user_reviews)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //       console.log('내 리뷰들 실패')
    //     })
    // },
    getFriendInfo(context, username) {
      axios({
        method: 'get',
        url: `${API_URL}/accountsinfo/${username}/`,
      })
        .then((res) => {
          // console.log('친구 정보 가져옴')
          context.commit('GET_FRIEND_INFO', res.data)
          // console.log(context.state.firendInfo)
          // console.log(this.info.nickname)
        })
        .catch((err) => {
          console.log(err)
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
          context.commit('GET_ARTICLES', res.data)
          // console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
          console.log('게시글에러')
        })
    },
    async signUp(context, payload) {
      console.log(payload)
      const formData = new FormData();
            
      formData.append('username', payload.username);
      formData.append('nickname', payload.nickname);
      formData.append('password1', payload.password1);
      formData.append('password2', payload.password2);
      formData.append('profile_image', payload.profileimg);
      // formData.append('first_name', payload.firstname);
      // formData.append('last_name', payload.lastname);
      // formData.append('email', payload.email);

      await axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,

        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData
      }
      )
      // first_name: payload.firstname,
          // last_name: payload.lastname,
          // email: payload.email

      // axios
      //         .post(`${API_URL}/accounts/signup/`,
      //             formData,
      //             {
      //                 headers: {"Content-Type": "multipart/form-data"}, 
      //                 withCredentials: true
      //             }
      //         )

        .then((res) => {
          // console.log(res.data)
          context.state.username = payload.username
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
          context.state.username = payload.username
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
