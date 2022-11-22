<!-- views/CreateView.vue -->

<template>
  <div>
    <h1>{{ movie.movietitle }}</h1>
    <form @submit.prevent="createArticle">
      <label for="title">제목 : </label>
      <input type="text" id="title" v-model.trim="title"><br>
      <label for="content">내용 : </label>
      <textarea id="content" cols="30" rows="10" v-model="content"></textarea><br>
      <input type="submit" id="yellow-box">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CreateView',
  props: {
    movie: Object,
  },
  data() {
    return {
      title: null,
      content: null,
      movieId : this.movie.id,
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
  },
  methods: {
    createArticle() {
      // console.log(this.movie)
      const review_title = this.title
      const review_content = this.content
      const movieId = this.movieId
      if (!review_title) {
        alert('제목을 작성해주세요.')
        return
      } else if (!review_content) {
        alert('내용을 작성해주세요.')
        return
      } else {
        axios({
          method: 'post',
          url: `${API_URL}/movies/reviews/${movieId}/`,
          data: {review_title, review_content},
          headers: {
            Authorization: `Token ${this.$store.state.token}`
          }
        })
          .then((res) => {
            
            this.$router.go({ name: 'DetailView', params: { id: movieId } })
            
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  },
  created() {
    if (!this.$store.getters.isLogin) {
      this.$router.push({ name: 'LogInView'})
    }
  }
}
</script>

<style>

</style>
