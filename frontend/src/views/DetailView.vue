<template>
  <div>
    <article>
      <h1>Detail</h1>
      <img :src="`https://image.tmdb.org/t/p/w500/${movie?.posterpath}`" :alt="movie.title">
      <p>영화 제목 : {{ movie?.movietitle }}</p>
      <a class="button" @click="clickLikeBtn"><span class="heart" ></span></a>
      <p>평점 : {{ movie?.rate }}</p>
      <p>줄거리 : {{ movie?.overview }}</p>
      <p>개봉일 : {{ movie?.released_date }}</p>
      <hr>
    </article>

    <button 
      v-if="isLogin && !isCreate"
      @click="createMethod" 
    >리뷰 작성하기</button>
    <button 
      v-if="!isLogin && !isCreate" 
      @click="createMethod"
    >로그인하고 리뷰 쓰기</button>
    <button
      v-if="isCreate"
      @click="createMethod">
      리뷰 보기
    </button>

    <aside v-if="isCreate">
      <CreateView :movie="movie"/>
    </aside>
    <aside v-if="!isCreate">
      <ArticleView :movieId="movie.id"/>
    </aside>
    <aside>
      <VideoList/>
    </aside>

  </div>
</template>

<script>
import axios from 'axios'
import ArticleView from '@/views/ArticleView'
import CreateView from '@/views/CreateView'
import VideoList from '@/components/VideoList'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'DetailView',
  components: {
    ArticleView,
    VideoList,
    CreateView,
  },
  data() {
    return {
      isCreate: false,
      isClicked: false,
      movie: {},
    }
  },
  computed: {
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
        document.querySelector('.heart').removeAttribute('id');
        document.querySelector('.button').removeAttribute('id');
        this.isClicked = false
      } else {
        document.querySelector('.heart').id = 'heart';
        document.querySelector('.button').id = 'button';
        this.isClicked = true
      }
    },
    getMovieDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/total_movie/${this.$route.params.id}/`
      })
        .then((res) => {
          this.movie = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created() {
    this.getMovieDetail()
  },
}
</script>

<style>
#heart {
  background-color: #EA5455;
}

</style>