<template>
  <div class="article-list">
    <p>이 영화에 대한 리뷰들을 소개합니다</p>
    {{articles}}
    <div v-if="articles">
      <ReviewListItem v-for="article in articles" :key="article.id" :article="article"/>
    </div>
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
  // props: {
  //   articles: Array
  // },
  data() {
    return {
      articles: this.$store.state.articles
      // userLikedList: []
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
