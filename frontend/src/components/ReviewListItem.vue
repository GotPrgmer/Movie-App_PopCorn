<template>
  <article>

    <aside v-if="!isedit">
      <p>제목 : {{ article?.review_title }}</p>
      <p>내용 : {{ article?.review_content }}</p>
      <p>글쓴이 : {{ article?.username }}</p>
      <p>마지막 수정 : {{ article?.updated_at }}</p>
      <a v-if="isLogin" class="review-like-button" @click="clickLikeBtn">
        <div :class="`review-like-heart ${articleId}`" ></div>
        <div class="likes" id="review-like-text">{{ likes }}</div>
      </a>
      <button v-if="isMyReview" @click="editReview">리뷰 수정</button>
      <button v-if="isMyReview" @click="deleteReview">리뷰 삭제</button>
    </aside>

    <aside v-if="isedit">
      <ReviewEdit :article="article"/>
    </aside>

    <hr>
  </article>
</template>

<script>
import axios from 'axios'
import ReviewEdit from '@/components/ReviewEdit'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ReviewListItem',
  components: {
    ReviewEdit,
  },
  props: {
    article: Object,
  },
  data() {
    return {
      articleId : this.article.id,

      likes: this.article.like_users.length,
      isClicked: false,
      userLikedList: [],

      isMyReview: (this.article.username === this.$store.state.username) ? true : flase,
      isedit: false,
    }
  },
  computed: {
    isLogin() {
      console.log(this.article)
      return this.$store.getters.isLogin
    },
  },
  methods: {
    clickLikeBtn(event) {
      const heart = event.target.children[0]
      if (this.isClicked) {
        // 버튼 컬러 변환 좋아요 > 취소
        heart.removeAttribute('id');
        this.isClicked = false
        this.isClicked = !this.isClicked
        // 화면에 보여지는 데이터 변화
        this.likes -= 1

      } else {
        // 버튼 컬러 변환 취소 > 좋아요
        heart.setAttribute('id', 'heart')
        // document.querySelector('.review-like-button').id = 'button';
        this.isClicked = true
        // 화면에 보여지는 데이터 변화
        this.likes += 1
      }
    },
    getUserLikedList() {
      axios({
        method: 'get',
        url: `${API_URL}/articles/onepersonlike/${this.$store.state.username}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then((res) => {
          for (const review of res.data.like_reviews) {
            this.userLikedList.push(review.id)
          }
          console.log('유저가 좋아요한 리뷰들 가져옴')
          console.log(this.userLikedList)
        })
        .catch((err) => {
          console.log(err)
        })
      },
    isLiked() {
      const reviewId = this.article.id
      const likes = this.userLikedList
      if (likes.includes(reviewId)) {
        console.log('좋아요한 게시물이다')
        this.isClicked = true
        const articleId = this.articleId
        const inom = document.querySelector(`${articleId}`)
        inom.setAttribute('id', 'heart')
      }
    },
    editReview() {
      this.isedit = true
      console.log(this.isedit)
    },
    deleteReview() {
      const review_id = this.article.id
      axios({
          method: 'delete',
          url: `${API_URL}/movies/reviews/editordelete/${review_id}/`,
          // data: {review_title, review_content},
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
    },
  },
  created() {
    this.getUserLikedList()
    const nihao = document.querySelector(`${articleId}`)
    console.log(nihao)
  },
  mounted() {
    this.isLiked()
  },
  watch: {
    likes() {
      axios({
        method: 'post',
        url: `${API_URL}/articles/clicklike/${this.$store.state.userId}/${this.article.id}/`,
        // data: { likes },
        headers: {
         Authorization: `Token ${this.$store.state.token}`
        },
      })
        .then((res) => {
          console.log('게시글 좋아요 성공')
          this.isLiked()
        })
        .catch((err) => {
          console.log(err)
          console.log('게시글 좋아요 실패')
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