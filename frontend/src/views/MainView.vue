<template>
  <div>
    <div>
      <h1>메인</h1>
    </div>
    <div>
      <router-link :to="{ name: 'ProfileView' }"> <ProfilePreview/> </router-link>
    </div>
    <article class="box">
      <router-link :to="{ name: 'GameActorView' }"> 취향을 찾아보자 </router-link>
      
    </article>
    <article>
      <CardList v-for="movies in movieList" :key="movies.id" :movies="movies"/>
    </article>
    
  </div>
</template>

<script>
import ProfilePreview from '@/components/ProfilePreview'
import CardList from '@/components/CardList'

export default {
  name: 'MainView',
  components: {
    ProfilePreview,
    CardList
  },
  computed: {
    movieList() {
      return this.$store.state.movieList
    }
  },
  created() {
    this.getMovies()
  },
  methods: {
    getMovies() {
      // this.$store.dispatch('getTotalMovie')
      // this.$store.dispatch('getPopularMovie')
    }
  },
}

</script>

<style>

</style>