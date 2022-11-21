<template>
    <div class="" id="">
      <h1> 게시글 수정 </h1>
      <form @submit.prevent="EditReview">
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
  name: 'ReviewEdit',
    props: {
      article: Object,
    },
  data() {
    return {
      title: this.article.review_title,
      content: this.article.review_content
    }
  },
  methods: {
    EditReview() {
      // console.log(this.movie)
      const review_title = this.title
      const review_content = this.content
      const review_id = this.article.id
      if (!review_title) {
        alert('제목을 작성해주세요.')
        return
      } else if (!review_content) {
        alert('내용을 작성해주세요.')
        return
      } else {
        axios({
          method: 'put',
          url: `${API_URL}/movies/reviews/editordelete/${review_id}/`,
          data: {review_title, review_content},
          headers: {
            Authorization: `Token ${this.$store.state.token}`
          }
        })
          .then((res) => {
            this.$router.go({ name: 'DetailView', params: { id:this.$route.params.id } })
          })
          .catch((err) => {
            console.log(err)
            console.log('게시글 수정 실패')
            console.log(this.$route.params.id)
          })
      }
    }
  }
}
</script>
