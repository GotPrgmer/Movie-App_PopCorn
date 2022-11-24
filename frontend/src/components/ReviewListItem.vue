<template>
  <article>
    <aside v-if="!isedit">
      <h1 class="popcorn-font" style="font-weight:bold;">{{ article?.review_title }}</h1>
      <h2 class="popcorn-font">{{ article?.review_content }}</h2>
      <router-link class="popcorn-font" :to="{ name: 'ProfileView', params: { username: username } }">{{ article?.username }}</router-link>
      <p class="popcorn-font">{{ updateDate }}</p>
      <!-- <a v-if="isLogin" class="review-like-button" @click="clickLikeBtn">
        <div :class="`review-like-heart ${articleId}`" ></div>
        <div class="likes" id="review-like-text">{{ likes }}</div>
      </a> -->
      <button v-if="isMyReview" @click="editReview">리뷰 수정 | </button> 
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
      articles: this.$store.state.articles,
      // username: this.article.username,

      // likes: this.article.like_users.length,
      isClicked: false,
      userLikedList: [],

      isMyReview: (this.article.username === this.$store.state.username) ? true : flase,
      isedit: false,
    }
  },
  computed: {
    isLogin() {
      // console.log(this.$store.state.username)
      return this.$store.getters.isLogin
    },
    username() {
      return this.article.username
    },
    updateDate() {
      return this.timeForToday(this.article.updated_at)
    }
  },
  methods: {
    // clickLikeBtn(event) {
    //   const heart = event.target.children[0]
    //   if (this.isClicked) {
    //     // 버튼 컬러 변환 좋아요 > 취소
    //     heart.removeAttribute('id');
    //     this.isClicked = false
    //     this.isClicked = !this.isClicked
    //     // 화면에 보여지는 데이터 변화
    //     this.likes -= 1

    //   } else {
    //     // 버튼 컬러 변환 취소 > 좋아요
    //     heart.setAttribute('id', 'heart')
    //     // document.querySelector('.review-like-button').id = 'button';
    //     this.isClicked = true
    //     // 화면에 보여지는 데이터 변화
    //     this.likes += 1
    //   }
    // },
    // getUserLikedList() {
    //   axios({
    //     method: 'get',
    //     url: `${API_URL}/articles/onepersonlike/${this.$store.state.username}/`,
    //     headers: {
    //       Authorization: `Token ${this.$store.state.token}`
    //     }
    //   })
    //     .then((res) => {
    //       for (const review of res.data.like_reviews) {
    //         this.userLikedList.push(review.id)
    //       }
    //       console.log('유저가 좋아요한 리뷰들 가져옴')
    //       console.log(this.userLikedList)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    //   },
    // isLiked() {
    //   const reviewId = this.article.id
    //   const likes = this.userLikedList
    //   if (likes.includes(reviewId)) {
    //     console.log('좋아요한 게시물이다')
    //     this.isClicked = true
    //     const articleId = this.articleId
    //     const inom = document.querySelector(`${articleId}`)
    //     inom.setAttribute('id', 'heart')
    //   }
    // },
    editReview() {
      this.isedit = true
      // console.log(this.isedit)
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
            // console.log(this.$route.params.id)
          })
    },
    timeForToday(value) {
      const today = new Date();
      const timeValue = new Date(value);

      const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
      if (betweenTime < 1) return '방금전';
      if (betweenTime < 60) {
          return `${betweenTime}분전`;
      }

      const betweenTimeHour = Math.floor(betweenTime / 60);
      if (betweenTimeHour < 24) {
          return `${betweenTimeHour}시간전`;
      }

      const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
      if (betweenTimeDay < 365) {
          return `${betweenTimeDay}일전`;
      }

      return `${Math.floor(betweenTimeDay / 365)}년전`;
    },
  },
  created() {
    // this.getUserLikedList()
    // const nihao = document.querySelector(`${articleId}`)
    // console.log(nihao)
  },
  mounted() {
    // this.isLiked()
  },
  // watch: {
  //   likes() {
  //     axios({
  //       method: 'post',
  //       url: `${API_URL}/articles/clicklike/${this.$store.state.userId}/${this.article.id}/`,
  //       // data: { likes },
  //       headers: {
  //        Authorization: `Token ${this.$store.state.token}`
  //       },
  //     })
  //       .then((res) => {
  //         console.log('게시글 좋아요 성공')
  //         this.isLiked()
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //         console.log('게시글 좋아요 실패')
  //       })
  //   }
  // }
}
</script>

<style>
#heart {
  background-color: #EA5455;
}
.popcorn-font {
  font-family: 'PopcornFont';
}
</style>