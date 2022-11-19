<template>
  <div>
    <h1>프로필</h1>
    <div><img :src="userInfo.userimg" alt="내 사진"></div>
    <input type="file" name="" accept="image/*" id="" @change="getImageFile">
    <p>그래프 {{userInfo?.bedge}}</p>
    <p>안녕/ 난 지니쓰</p>
    <button @click="clickFollow">팔로우</button>
    <router-link></router-link>
    <CardList
      :movie="userMovie"
    />
  </div>
</template>

<script>
import CardList from '@/components/CardList.vue'
export default {
  name: 'ProfileView',
  components: {
    CardList,
  },
  // data() {
  //   return {
  //     userImg : '@/src/assets/logo.png'
  //   }
  // },
  computed : {
    userInfo() {
      return this.$store.state.userInfo
    },
    userImg() {
      return this.$store.state.userImg
    },
    userMovie() {
      return this.$store.state.userMovie
    },
    
  },
  created() {
    this.getUserInfo()
    this.getUserLikes()
  },
  methods: {
    getUserInfo() {
      this.$store.dispatch('getUserInfo')
    },
    getUserLikes() {
      this.$store.dispatch('getUserMovie')
    },
    getImageFile(event) {
      console.log(event)
      // this.$store.dispatch('getImageFile', event)
    },
    clickFollow() {
      
    }
  },
}
</script>

<style>

</style>