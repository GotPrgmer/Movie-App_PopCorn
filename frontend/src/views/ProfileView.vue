<template>
  <div>
    <h1>프로필</h1>
    <p>프로필 사진</p>
    <p>그래프</p>
    <p>소개글</p>
    <p>follow 버튼</p>
    <CardList :movies="movies"/>
  </div>
</template>

<script>
import CardList from '@/components/CardList.vue'
export default {
  name: 'ProfileView',
  components: {
    CardList,
  },
  computed : {
    userMovie() {
      return this.$store.state.userMovie
    }
  },
  created() {
    this.getUserMovie()
  },
  methods: {
    getUserMovie() {
      this.$store.dispatch('getUserMovie')
    }
  },
}
</script>

<style>

</style>