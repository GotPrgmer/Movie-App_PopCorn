<template>
  <div>
    <h1>Article Page</h1>
    <router-link v-if="isLogin" :to="{ name: 'CreateView' }">[Create]</router-link>
    <router-link v-if="!isLogin" :to="{ name: 'LogInView' }">로그인하고 리뷰 쓰기</router-link>
    <ReviewList/>
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
      // if (this.isLogin === true) {
      this.$store.dispatch('getArticles')
      // } else {
        // alert('로그인')
        // this.$router.push({ name: 'LogInView'})
      // }

    }
  }
}
</script>

<style>

</style>
