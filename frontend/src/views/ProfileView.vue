<template>
  <div>
    <div>
      <h1>{{ nickname }} 프로필</h1>
      <!-- <div><img :src="userImg" alt="내 사진"></div> -->
      <div><img :src="test" alt="내 사진"></div>
      <!-- <input type="file" name="" accept="image/*" id="" @change="getImageFile"> -->
      <BedgeGraph/>
      <button type="submit" @click="clickFollow">팔로우</button>
    </div>
      <button @click="toReview">좋아요한 영화</button> | 
      <button @click="toMovie">내가 쓴 리뷰</button>
    <div>
      <span
        v-for="movie in movies"
        :key="movie.id">
        <Card :movie="movie"/>
      </span>
    </div>
    <div>
      <span
        v-for="review in reviews"
        :key="review.id">
        <Card :review="review"/>
      </span>      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Card from '@/components/Card.vue'
import BedgeGraph from '@/components/BedgeGraph.vue'

const API_URL = 'http://127.0.0.1:8000'

export default {
name: 'FriendProfile',
components: {
    Card,
    BedgeGraph,
  },
data() {
  return {
    nickname: this.$store.state.nickname,
    // show: true,
    test: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy0HhhQ-N7_AmPj4ExJoue4xxXdMGcvXWfMrfC0XcDGg&s',
    show: true
  }
},
computed: {
  userImg() {
    return this.$store.state.userImg
  },
  movies() {
    return this.$store.state.usermovie
  },
  reviews() {
    return this.$store.state.userreviews
  },
  // show() {
  //   return false
  // },
},
methods: {
  toReview() {
    console.log(this.show)
    if (this.show) {
      this.show = false
    } else {
      this.show = true
    }
  },
  toMovie() {
    if (this.show) {
      this.show = true
    } else {
      this.show = true
    }
  },
  getfriend() {
    axios({
      method: 'get',
      url: `${API_URL}/accountsinfo/${this.$route.params.username}/`,
      
    })
      .then((res) => {
        this.info = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    },
  getUserMovie() {
    this.$store.dispatch('getUserMovie')
    },
  getUserReview() {
    this.$store.dispatch('getUserReview')
  }
},
created() {
  this.getfriend()
  this.getUserMovie()
},
}
</script>

<style>

</style>