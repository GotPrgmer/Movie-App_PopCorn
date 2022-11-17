<template>
  <div>
    <article>
      <h1>Detail</h1>
      <img :src="`https://image.tmdb.org/t/p/w500/${movie.posterpath}`" :alt="movie.title">
      <p>영화 제목 : {{ movie?.movie_title }}</p>
      <p>평점 : {{ movie?.rate }}</p>
      <p>줄거리 : {{ movie?.overview }}</p>
      <p>개봉일 : {{ movie?.released_data }}</p>
      <hr>
    </article>
    <aside>
      <ReviewList/>
    </aside>
    <aside>
      <VideoList/>
    </aside>

  </div>
</template>

<script>
// import axios from 'axios'
import ReviewList from '@/components/ReviewList'
import VideoList from '@/components/VideoList'

// const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'DetailView',
  components: {
    ReviewList,
    VideoList,
  },
  props: {
    movie: Object,
  },
  // data() {
  //   return {
  //     movie: null,
  //   }
  // },
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
}
</script>
