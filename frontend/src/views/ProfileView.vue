<template>
  <div>
    <h1>프로필</h1>
    <img :src="userImg" alt="내사진">
    <input type="file" name="" accept="image/*" id="" @change="getImageFile">
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
  data() {
    return {
      userImg : this.$store.state.userImg
    }
  },
  
  computed : {
    userMovie() {
      return this.$store.state.userMovie
    },
    
  },
  created() {
    this.getUserMovie()
  },
  methods: {
    getUserMovie() {
      this.$store.dispatch('getUserMovie')
    },
    getImageFile(event) {
      this.userImg = event.target.files
    }
  },
}
</script>

<style>

</style>