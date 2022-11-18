import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
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
    userInfo: null,
    userMovie: '영화 급구',
    token: null,

    userImg: '@/src/assets/logo.png',
    // 게임 정보
    
    SceneGame: {
      '액션': {'닥터스트레인지': 'https://post-phinf.pstatic.net/MjAyMTEwMTlfODMg/MDAxNjM0NjQ3NDUwOTYw.Ep0m2_gsFyag_fGvIDd1AS0_vBvIuYlE6vMxPVgORMkg.Val06EXFMkks7PQgLUlC_hqaW6Y1nDFNzexsThqMyLUg.JPEG/D5PT1I0VUAEBKUh.jpg?type=w1200',
              '아저씨': 'https://t1.daumcdn.net/cfile/tistory/27058C495807710C2C',
            },
      '범죄': {'부당거래':'https://ac-p2.namu.la/4a/4a4bd7e0e004703f99fcdedf50324b57d6f7e78b442608382db5af42d07ac66b.jpg?type=orig',
              '범죄도시':'http://jjal.today/data/file/gallery/thumb-1028612757_EiCnUqNj_19f8311425a2092cf569af3c76c2d74dbea6a072_640x515.jpg',
            },
      '판타지': {'해리포터':'https://mblogthumb-phinf.pstatic.net/MjAxOTExMjBfNTkg/MDAxNTc0MjEzNDQyNDA5.GI1CsHkJZxp9YXvBm8Bf9LuTdF9DORiugheHtpXny50g.JjLFHu0DJVmFIqS6Wn12aXB49iXMvL8sJb3LTIjObDsg.JPEG.qqolp9/KakaoTalk_20191120_102805606_18.jpg?type=w800',
              '반지의제왕':'https://mblogthumb-phinf.pstatic.net/MjAxOTAyMjNfMyAg/MDAxNTUwOTA5MjMzOTQx.k-nc1xuWaYGR_e2QtRLr3BFWr6Ue1wf2JAupXmas64Qg.rTVVPYyKEnW7c9j6-IgUxja7vIYLuuXj6X9qkjyFfu8g.JPEG.orbi11/%EB%B0%98%EC%A7%80%EC%9D%98%EC%A0%9C%EC%99%95%EC%99%95%EC%9D%98%EA%B7%80%ED%99%98_(%ED%99%95%EC%9E%A5%ED%8C%90)_(%EC%86%8C%EC%9E%A5-%ED%99%95%EC%9E%A5%ED%8C%90FHD)_DTO_FHD_0012288698ms.jpg?type=w800',
            },
      '음악': {'보헤미안랩소디':'https://d3kxs6kpbh59hp.cloudfront.net/community/COMMUNITY/8cc9d3ab61384ee4a9a6d8cebec684a6/8a7882ff9ced4de6b2644fad052658c3_1610126703.jpeg',
              '싱스트리트':'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/2j9V/image/YtOZ6Ndv66Pu0Rgat4WUQ9FshMo.JPG',
            },
      '로맨스': {'이프온리':'https://mblogthumb-phinf.pstatic.net/MjAxODEyMDFfNjQg/MDAxNTQzNjU1NjQ3MzI1.sNJyT4K3KrjoiK8hOLX3XYoqhe903FzJ661fLX4HxvMg.FSHRshrSpIC_0f3GeOB_cGmaVUAPJOhaMa1IJYiXL9Ig.JPEG.jin_a_zzang/KakaoTalk_20181126_153708099.jpg?type=w800',
              '남자가사랑할때':'https://t1.daumcdn.net/cfile/tistory/2166AE4E5849926901',
            },
    },
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
      state.movieList.popularMovie = popularMovie.splice(11, 21)
    },
    GET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    // GET_USER_MOVIE(state, userMovie) {
    //   state.movieList.userMovie = userMovie
    // },
  //   GET_ARTICLES(state, articles) {
  //     state.articles = articles
  //   },
    SAVE_TOKEN(state, token) {
      state.token = token
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
        method: 'get',
        url: `${API_URL}/accounts/user`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res) => {
          context.commit('GET_USER_INFO', res.data)
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
  //  //     headers: {
  //  //       Authorization: `Token ${context.state.token}`
  //  //     }
  //  //   })
    //     .then((res) => {
    //       // console.log(res, context)
    //       context.commit('GET_ARTICLES', res.data)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    signUp(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: payload.username,
          password1: payload.password1,
          password2: payload.password2,
          nickname: payload.nickname,
          first_name: payload.firstname,
          last_name: payload.lastname,
          email: payload.email,
        }
      })
        .then((res) => {
          // console.log(res)
          context.commit('SAVE_TOKEN', res.data.key)
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
          context.commit('SAVE_TOKEN', res.data.key)
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
