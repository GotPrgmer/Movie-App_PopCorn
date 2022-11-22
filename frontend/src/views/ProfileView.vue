<template>
  <div>
    <div>
      <h1>{{ nickname }} 프로필</h1>
      <!-- <div><img :src="userImg" alt="내 사진"></div> -->
      <div><img :src="test" alt="내 사진"></div>
      <!-- <input type="file" name="" accept="image/*" id="" @change="getImageFile"> -->
      <BedgeGraph/>
      <button v-if="!isMyProfile" type="submit" @click="clickFollow">팔로우</button>
      <button v-if="isMyProfile" type="submit" >친구</button>
    </div>
      <button @click="toReview">영화</button> | 
      <button @click="toMovie">리뷰</button>
      <article v-if="show">
        <CardList :movies="movies"/>
      </article>
      <article v-if="!show">
        <ReviewListItem v-for="review in reviews" :key="review.id" :article="review"/>
    </article>  
  </div>
</template>

<script>
import axios from 'axios'
import Card from '@/components/Card.vue'
import CardList from '@/components/CardList.vue'
import ReviewListItem from '@/components/ReviewListItem'
import BedgeGraph from '@/components/BedgeGraph.vue'

const API_URL = 'http://127.0.0.1:8000'

export default {
name: 'FriendProfile',
components: {
    Card,
    BedgeGraph,
    CardList,
    ReviewListItem,
  },
data() {
  return {
    nickname: this.$store.state.nickname,
    // show: true,
    test: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy0HhhQ-N7_AmPj4ExJoue4xxXdMGcvXWfMrfC0XcDGg&s',
    show: true,
    isMyProfile: (this.$route.params.username === this.$store.state.username) ? true : flase,
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
      this.show = true
      console.log(this.reviews)
  },
  toMovie() {
      this.show = false
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
    console.log(this.reviews)
  },
  clickFollow() {
    // axios({
    //   method: 'put',
    //   url: `${API_URL}/accountsinfo/${this.$route.params.username}/`,
    // })
    //   .then((res) => {
    //     console.log(res.data)
    //     console.log('팔로우 성공')
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     console.log('팔로우 에러')
    //   })
  }
},
created() {
  this.getfriend()
  this.getUserMovie()
  this.getUserReview()
},
}
</script>

<style>

</style>