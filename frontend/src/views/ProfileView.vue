<template>
  <div class="column-box">
    <h1>{{ this.info.nickname }}님 프로필</h1>
    <div v-if="info?.profile_image"><img :src="`http://127.0.0.1:8000${info.profile_image}`" alt="내 사진"></div>
    <!-- <input type="file" name="" accept="image/*" id="" @change="getImageFile"> -->
    
    <span class="bedge-box">
      <BedgeGraph/>
    </span>

    <div class="followbtn">
      <button v-if="!isMyProfile && !isFollowing" class="yellow-box" @click="clickFollow">팔로우</button>
      <button v-if="!isMyProfile && isFollowing" class="yellow-box" @click="clickFollow">팔로우 취소</button>
    </div>

    <router-link v-if="isMyProfile" :to="{ name: 'FriendList', params: { username: username } }">
      <p>
        <input type="submit" value="친구들 영화 구경하기" />
      </p>
    </router-link>

    <div>
    <button @click="toMovie">영화</button> | 
    <button @click="toReview">리뷰</button>
    </div>

    <article v-if="show">
      <CardList :movies="movies"/>
    </article>
    <article v-if="!show">
      <ReviewListItem v-for="review in reviews" :key="review.id" :article="review"/>
    </article>

    <article v-if="show">
      <p>좋아하는 영화를 모아보세요</p>
    </article>  
    <article v-if="!show">
      <p>리뷰를 남겨보세요</p>
    </article>  
  </div>
</template>

<script>
import axios from 'axios'
import CardList from '@/components/CardList.vue'
import ReviewListItem from '@/components/ReviewListItem'
import BedgeGraph from '@/components/BedgeGraph.vue'
import FriendList from '@/views/FriendList.vue'

const API_URL = 'http://127.0.0.1:8000'

export default {
name: 'ProfileView',
components: {
    BedgeGraph,
    CardList,
    ReviewListItem,
    FriendList,
  },
data() {
  return {
    username: this.$route.params.username,
    test: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy0HhhQ-N7_AmPj4ExJoue4xxXdMGcvXWfMrfC0XcDGg&s',
    show: true,
    isMyProfile: (this.$route.params.username === this.$store.state.username) ? true : false,
    isFollowing: false,
    profileImg: null,
    movies: null,
    reviews: null,
  }
},
computed: {
  isMovies() {
    return this.$store.state.usermovie.length
  },
  isReviews() {
    return this.$store.state.userreviews.length
  },
  userImg() {
    return this.$store.state.userImg
  },
  info() {
    return this.$store.state.firendInfo
  }
},
methods: {
  toMovie() {
    this.show = true
  },
  toReview() {
    this.show = false
  },
  getfriend() {
    this.$store.dispatch('getFriendInfo', this.$route.params.username)
    },
  getUserMovie() {
    axios({
      method: 'get',
      url: `${API_URL}/movies/like/${this.$route.params.username}/`,
      headers: {
        Authorization: `Token ${this.$store.state.token}`
      }
    })
      .then((res) => {
        this.movies = res.data.userlike
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getUserReview() {
    axios({
      method: 'get',
      url: `${API_URL}/accountsinfo/written/${this.$route.params.username}/`,
      headers: {
        Authorization: `Token ${this.$store.state.token}`
      }
    })
      .then((res) => {
        this.reviews = res.data.user_reviews
      })
      .catch((err) => {
        console.log(err)
        console.log('내 리뷰들 실패')
      })
  },
  clickFollow() {
    if (this.isFollowing) {
      this.isFollowing = false
    } else {
      this.isFollowing = true
    }
    axios({
      method: 'post',
      url: `${API_URL}/accountsinfo/follow/${this.$store.state.username}/${this.info.id}/`,
      headers: {
        Authorization: `Token ${this.$store.state.token}`
      }
    })
      .then((res) => {
        console.log(res.data)
        console.log('팔로우 성공')
      })
      .catch((err) => {
        console.log(err)
        console.log('팔로우 에러')
      })
  },
  getFollowing() {
    axios({
      method: 'get',
      url: `${API_URL}/accountsinfo/following/${this.$store.state.username}/`,
      headers: {
        Authorization: `Token ${this.$store.state.token}`
      }
    })
      .then((res) => {
        console.log(res.data.followingusers)
        const followings = res.data.followingusers
        if (followings.includes(this.$route.params.username)) {
          this.isFollowing = true
        }
      })
      .catch((err) => {
        console.log(err)
        console.log('팔로우 에러')
      })
  }
},
created() {
  this.getfriend()
  this.getUserMovie()
  this.getUserReview()
  this.getFollowing()
},
}
</script>

<style>

</style>