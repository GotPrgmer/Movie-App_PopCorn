<template>
  <div class="article-list">
    <p>이 영화에 대한 리뷰들을 소개합니다</p>
    <ReviewListItem v-for="article in articles" :key="article.id" :article="article"/>
    <hr>
  </div>
</template>

<script>
import ReviewListItem from '@/components/ReviewListItem'

export default {


  name: 'ReviewList',
  components: {
    ReviewListItem,
  },
  computed: {
    articles() {
      return this.$store.state.articles
    }
  }
}
</script>

<style>
</style>
