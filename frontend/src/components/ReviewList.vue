<template>
  <div class="article-list">
    <p>이 영화에 대한 리뷰들을 소개합니다</p>
    <ReviewListItem v-for="article in articles" :key="article.id" :article="article"/>
    <hr>
  </div>
</template>

<script>
// import axios from 'axios'
import ReviewListItem from '@/components/ReviewListItem'

// const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ReviewList',
  components: {
    ReviewListItem,
  },
  // data() {
  //   return {
  //     userLikedList: []
  //   }
  // },
  computed: {
    articles() {
      // console.log(this.$store.state.articles)
      return this.$store.state.articles
    }
  },
  // methods: {
    
  // },
  // mounted() {
  //   // console.log('마운티드')
  //   this.getUserLikedList()
  // },
}
</script>

<style>
</style>
