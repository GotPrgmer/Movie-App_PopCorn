<template>
  <div>
    <p>아티클 페이지 랜딩</p>
    <ReviewList/>
  </div>
</template>

<script>
// import axios from 'axios'
import ReviewList from '@/components/ReviewList'

// const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ArticleView',
  components: {
    ReviewList,
  },
  data() {
    return {
      // movie: {},
      // articles: this.$store.state.articles
    }
  },
  props: {
    // movieId: Number,
  },
  computed:{
    // isLogin() {
    //   return this.$store.getters.isLogin
    // },
    // articles() {
    //   return this.$store.state.articles
    // }
  },
  methods: {
    getArticles() {
      if (this.isLogin === true) {
        this.$store.dispatch('getArticles', this.$route.params.id)
      }
    },
    // getMovieDetail() {
    //   axios({
    //     method: 'get',
    //     url: `${API_URL}/movies/total_movie/${this.$route.params.id}/`,
    //     // headers: {
    //     //     Authorization: `Token ${this.$store.state.token}`
    //     //   }
    //   })
    //     .then((res) => {
    //       this.movie = res.data
    //       this.getArticles()
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //       console.log('디테일 에러')
    //     })
    // }
  },
  created() {
    // this.getMovieDetail()
    this.getArticles()
  },
  }
</script>

<style>

</style>
