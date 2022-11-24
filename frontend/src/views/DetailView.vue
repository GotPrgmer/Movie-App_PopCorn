<template>
  <div>
    <img class="backdropImg" :src="`https://image.tmdb.org/t/p/original/${movie?.backdrop}`" :alt="movie.title">
    <article class="movie-detail">
      <div style="d-flex flex-row">
        <h1 class="movie-title">{{ movie?.movietitle }}</h1>
        <a class="movie-like-button" v-if="isLogin" @click="clickLikeBtn">
          <div class="heart" ></div>
          <div class="likes">{{ likes }}</div>
        </a>

      </div>
      <p>평점 : {{ movie?.rate }}</p>
      <p>줄거리 : {{ movie?.overview }}</p>
      <p>개봉일 : {{ movie?.released_date }}</p>
      <p>감독 : {{ movie?.director }}</p>
      <p v-if="actors.length">
        출연진 : <span > {{actors}}
        </span>
        </p>
      <hr>
      <button  id="yellow-box"
        v-if="(isLogin && !isCreate)"
        @click="createMethod" 
      >리뷰 작성하기</button>
      <button  id="yellow-box"
        v-if="!isLogin && !isCreate" 
        @click="createMethod"
      >로그인하고 리뷰 쓰기</button>
      <button id="yellow-box"
        v-if="isCreate"
        @click="createMethod">
        리뷰 보기
      </button>

      <aside v-if="isCreate">
        <CreateView :movie="movie"/>
      </aside>
        <!-- <ArticleView v-if="isLogin" :movieId="movie.id"/> -->
      <aside v-if="!isCreate">
        <ReviewListItem v-for="review in articles" :key="review.id" :article="review"/>
      </aside>
    </article>

    <!-- <aside>
      <VideoList/>
    </aside> -->

  </div>
</template>

<script>
import axios from 'axios'
// import ArticleView from '@/views/ArticleView'
import CreateView from '@/views/CreateView'
import VideoList from '@/components/VideoList'
import ReviewListItem from '@/components/ReviewListItem'


const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'DetailView',
  components: {
    // ArticleView,
    VideoList,
    CreateView,
    ReviewListItem
  },
  data() {
    return {
      isCreate: false,
      isClicked: false,
      movie: {},
      actors: [],
      likes: 0,
      // reviews: null,
    }
  },
  computed: {
    articles() {
      return this.$store.state.articles
    },
    isLogin() {
      return this.$store.getters.isLogin
    },
  },
  methods: {
    createMethod() {
      if (this.isCreate) {
        this.isCreate = false
      } else {
        this.isCreate = true
      }
    },
    clickLikeBtn() {
      if (this.isClicked) {
        // 버튼 컬러 변환 좋아요 > 취소
        document.querySelector('.heart').removeAttribute('id');
        // document.querySelector('.movie-like-button').removeAttribute('id');
        this.isClicked = false
        this.likes -= 1
        // DB 변경 요청
        axios({
          method: 'post',
          url: `${API_URL}/movies/clicklike/${this.$store.state.userId}/${this.$route.params.id}/`,
          // data: { likes },
          headers: {
          Authorization: `Token ${this.$store.state.token}`
          },
        })
          .then((res) => {
            console.log('좋아요 요청 성공')
          })
          .catch((err) => {
            console.log(err)
            console.log('좋아요 요청 실패')
          })
      } else {
        // 버튼 컬러 변환 취소 > 좋아요
        document.querySelector('.heart').id = 'heart';
        // document.querySelector('.movie-like-button').id = 'button';
        this.isClicked = true
        this.likes += 1
        // DB 변경 요청
        axios({
          method: 'post',
          url: `${API_URL}/movies/clicklike/${this.$store.state.userId}/${this.$route.params.id}/`,
          // data: { likes },
          headers: {
          Authorization: `Token ${this.$store.state.token}`
          },
        })
          .then((res) => {
            console.log('성공')
          })
          .catch((err) => {
            console.log(err)
            console.log('실패')
          })
      }
    },
    getMovieDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/total_movie/${this.$route.params.id}/`,
        
      })
        .then((res) => {
          this.movie = res.data
          this.actors = this.movie.actors
          console.log(this.actors)
          console.log('hi')
          this.likes = this.movie.userslike.length
          console.log(this.likes,'likes')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getArticles() {
      if (this.isLogin === true) {
        this.$store.dispatch('getArticles', this.$route.params.id)
      }
    },
    getLikes() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/manylikemovie/${this.$route.params.id}/`,
      })
        .then((res) => {
          // console.log(res.data.userslike) // 리스트
          const likesList = res.data.userslike
          this.likes = likesList.length
          for ( const user of likesList ) {
            if ( user.username === this.$store.state.username ) {
              document.querySelector('.heart').id = 'heart';
              // document.querySelector('.movie-like-button').id = 'button';
              this.isClicked = true
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created() {
    console.log('되고있음')
    this.getMovieDetail()
    this.getArticles()
    this.getLikes()
    console.log(this.$store.state.username)
  },
}
</script>

<style>
#heart {
  background-color: #EA5455;
}
.backdropImg{
  background-attachment: fixed;
}
</style>