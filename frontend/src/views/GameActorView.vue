<template>
  <div>
    <img :src="imgUrl" alt="인물사진">
  </div>

</template>

<script>
export default {
  name: 'GameActorView',
  methods: {
    async getActorName () {
      const MOVIE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${$TMDB}&language=en-US&page=1`
      // let movieCd = ''
      // const ACTOR_URL = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${$KOREAN_MOVIE}&movieCd=${movieCd}`
      const ACTOR_IMAGE_URL = `https://openapi.naver.com/v1/search/movie/${$NAVER}`

      // const movieData = await axios.get(MOVIE_URL)
      // movieCd = movieData.id
      
      const actorData = await axios.get(ACTOR_IMAGE_URL)
      let imgUrl = ''
      imgUrl = actorData.actorimgurl
      return imgUrl
    },
  },
  create() {
    getActorName().then(res=> console.log(res))
  }
}

  
  // setTimeout(() => console.log(infos), 1000)
</script>

<style>

</style>