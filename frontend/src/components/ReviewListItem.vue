<template>
  <div>
    <p>제목 : {{ article?.review_title }}</p>
    <a v-if="isLogin" class="review-like-button" @click="clickLikeBtn">
        <div class="review-like-heart" ></div>
        <div class="likes" id="review-like-text">{{ likes }}</div>
      </a>
    <p>내용 : {{ article?.review_content }}</p>
    <p>마지막 수정 : {{ article?.updated_at }}</p>
    <p>좋아요 수 : {{ article?.like_users.length }}</p>
    <!-- <p>작성자 : {{ article.user }}</p> -->
    <hr>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ReviewListItem',
  props: {
    article: Object,
  },
  data() {
    return {
      isClicked: false,
      likes: this.article.like_users.length
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
  },
  methods: {
    clickLikeBtn() {
      if (this.isClicked) {
        // 버튼 컬러 변환 좋아요 > 취소
        document.querySelector('.review-like-heart').removeAttribute('id');
        document.querySelector('.review-like-button').removeAttribute('id');
        this.isClicked = false
        // 화면에 보여지는 데이터 변화
        this.likes -= 1

      } else {
        // 버튼 컬러 변환 취소 > 좋아요
        document.querySelector('.review-like-heart').id = 'heart';
        document.querySelector('.review-like-button').id = 'button';
        this.isClicked = true
        // 화면에 보여지는 데이터 변화
        this.likes += 1
      }
    },
  },
  watch: {
    likes(likes) {
      // console.log(likes)
      axios({
        method: 'get',
        url: `${API_URL}/movies/total_movie/`,
        // headers: {
        //  Authorization: `Token ${context.state.token}`
        // },
      })
        .then((res) => {
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
#heart {
  background-color: #EA5455;
}
</style>
