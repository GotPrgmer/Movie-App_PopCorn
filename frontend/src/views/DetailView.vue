<template>
  <div>
    <article>
      <h1>Detail</h1>
      <img :src="`https://image.tmdb.org/t/p/w500/${movie.posterpath}`" :alt="movie.title">
      <p>영화 제목 : {{ movie?.movietitle }}</p>
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
      <ArticleView :movie="movie"/>
    </aside>
    <aside>
      <VideoList/>
    </aside>

  </div>
</template>

<script>
// import axios from 'axios'
import ArticleView from '@/views/ArticleView'
import CreateView from '@/views/CreateView'
import VideoList from '@/components/VideoList'

// const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'DetailView',
  components: {
    ArticleView,
    VideoList,
    CreateView,
  },
  props: {
    movie: Object,
  },
  data() {
    return {
      isCreate: false
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
    }
  }
}
  // created() {
  //   this.getMovieDetail()
  //   console.log(movie)
  // },
  // methods: {
  //   getMovieDetail() {
  //     axios({
  //       method: 'get',
  //       url: `${API_URL}/movies/total_movie/${this.$route.params}/`
  //     })
  //       .then((res) => {
  //         console.log(res)
  //         this.movie = res.data
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   }
  // }
</script>
