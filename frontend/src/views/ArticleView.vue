<template>
  <div>
    <h1>Article Page</h1>
    <router-link :to="{ name: 'CreateView' }">[Create]</router-link>
    <ReviewList/>
    <hr>
  </div>
</template>

<script>
import ReviewList from '@/components/ReviewList'

export default {
  name: 'ArticleView',
  components: {
    ReviewList,
  },
  computed:{
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
  // created() {
  //   this.getArticles()
  // },
  methods: {
    getArticles() {
      if (this.isLogin === true) {
        this.$store.dispatch('getArticles')
      } else {
        alert('로그인')
        this.$router.push({ name: 'LogInView'})
      }

    }
  }
}
</script>

<style>

</style>
