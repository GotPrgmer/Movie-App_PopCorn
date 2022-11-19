<template>
  <div>
    <div>
      <h1>메인</h1>
    </div>
    <!-- <div>
      {{userInfo}}
    </div> -->
    <div >
      <router-link v-if="isLogin" :to="{ name: 'ProfileView' }"> <ProfilePreview/> </router-link>
    </div>
    <article class="box">
      <router-link v-if="isLogin" :to="{ name: 'GameActorView' }"> 취향을 찾아보자 </router-link>
      <router-link v-if="!isLogin" :to="{ name: 'LogInView' }"> 회원이 되어 함께 취향을 찾아봐요! </router-link>
      
    </article>
    <article>
      <CardList v-for="movies in movieList" :key="movies.id" :movies="movies"/>
    </article>
    <article>
      <CardCard/>
    </article>
  </div>
</template>

<script>
import ProfilePreview from '@/components/ProfilePreview'
import CardList from '@/components/CardList'
import CardCard from '@/components/CardCard'

export default {
  name: 'MainView',
  components: {
    ProfilePreview,
    CardList,
    CardCard
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
    movieList() {
      return this.$store.state.movieList
    },
    // userInfo() {
    //   return this.$store.getters.isUserInfo
    // }
  },
  created() {
    this.getMovies()
    // this.getUserInfo()
  },
  methods: {
    getMovies() {
      this.$store.dispatch('getTotalMovie')
      this.$store.dispatch('getPopularMovie')
    },
    // getUserInfo() {
    //   if (this.isLogin === true) {
    //     this.$store.dispatch('getUserInfo')
    //   }
    // }
  },
}

</script>

<style>

</style>