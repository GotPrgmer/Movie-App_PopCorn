<template>
  <div>
    <ReviewList v-if="isLogin"/>
  </div>
</template>

<script>
import axios from 'axios'
import ReviewList from '@/components/ReviewList'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ArticleView',
  components: {
    ReviewList,
  },
  data() {
    return {
      movie: {}
    }
  },
  props: {
    movieId: Number,
  },
  computed:{
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
  methods: {
    getArticles() {
      if (this.isLogin === true) {
        const movieId = this.movie.id
      // console.log(movieId)
        this.$store.dispatch('getArticles', movieId)
      // } else {
      //   alert('로그인')
      //   this.$router.push({ name: 'LogInView'})
      }
    },
    getMovieDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/total_movie/${this.$route.params.id}/`,
        // headers: {
        //     Authorization: `Token ${this.$store.state.token}`
        //   }
      })
        .then((res) => {
          this.movie = res.data
          this.getArticles()
        })
        .catch((err) => {
          console.log(err)
          console.log('디테일 에러')
        })
    }
  },
  created() {
    this.getMovieDetail()
  },
  }
</script>

<style>

</style>
