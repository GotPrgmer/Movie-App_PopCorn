<template>
  <div>
    <div>
      <router-link v-if="isLogin" :to="{ name: 'ProfileView', params: { username: username } }"> <ProfilePreview/> </router-link>
    </div>
    <article class="bannerBox">
      <img id="banner-img" :src="`https://image.tmdb.org/t/p/original/${bannerImg}`">
      <router-link v-if="isLogin" :to="{ name: 'GameView' }" id="profileReco"> 취향을 찾아보자 </router-link>
      <router-link v-if="!isLogin" :to="{ name: 'LogInView' }" id="profileReco"><h1>회원이 되어 함께 취향을 찾아봐요!</h1></router-link>      
    </article>
    <!-- <span class="minititle">캬라멜 팝콘의 추천 영화</span> -->
    <article class="movieBox" v-for="movies in movieList" :key="movies.id">
      <CardList :movies="movies"/>
    </article>
  </div>
</template>

<script>
import _ from 'lodash'
import ProfilePreview from '@/components/ProfilePreview'
import CardList from '@/components/CardList'

export default {
  name: 'MainView',
  components: {
    ProfilePreview,
    CardList,
  },
  data() {
    return {
      bannerImg: null,
      movieListTitle: ['캬라멜 팝콘의 추천 영화', '현재 상영작', '내 친구들이 좋아하는 영화']
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
    movieList() {
      return this.$store.state.movieList
    },
    username() {
      return this.$store.state.username
    },
    
  },
  methods: {
    getMovies() {
      this.$store.dispatch('getTotalMovie')
      this.$store.dispatch('getPopularMovie')
      console.log(this.$store.state.movieList)
    },
    getBannerImg() {
      const firstList = _.sample(this.movieList)
      const secondList = _.sample(firstList)
      this.bannerImg = secondList.posterpath
      console.log(this.bannerImg)
      const bannerBox = document.querySelector('.bannerBox')
      bannerBox.style.backgroundImage = `url('https://image.tmdb.org/t/p/w1280/${secondList.posterpath}')`
    }
  },
  created() {
    this.getMovies()
    this.getBannerImg()
  },
  
}

</script>

<style>

</style>