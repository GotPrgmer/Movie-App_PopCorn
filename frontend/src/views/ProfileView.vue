<template>
  <div>
    <div>
      <h1>{{ this.info.nickname }}님 프로필</h1>
      <!-- <h1>ㅎ하이</h1> -->
      <!-- <div><img src="test" alt="내 사진"></div> -->
      <div v-if="info?.profile_image"><img :src="`http://127.0.0.1:8000${info.profile_image}`" alt="내 사진"></div>
      <!-- <input type="file" name="" accept="image/*" id="" @change="getImageFile"> -->
      <BedgeGraph/>
      <button v-if="!isMyProfile" type="submit" @click="clickFollow">팔로우</button>
      <button v-if="isMyProfile" type="submit" >친구</button>
    </div>
    <button @click="toMovie">영화</button> | 
    <button @click="toReview">리뷰</button>
    <article >
      <!-- <p>{{movie}}</p> -->
      <CardList v-if="show" :movies="movies"/>
      <!-- <CardList :movies="movies"/> -->
    </article>

    <article v-if="!show">
      <div>
      <ReviewListItem v-for="review in reviews" :key="review.id" :article="review"/>
      </div>
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
// import Card from '@/components/Card.vue'
import CardList from '@/components/CardList.vue'
import ReviewListItem from '@/components/ReviewListItem'
import BedgeGraph from '@/components/BedgeGraph.vue'

const API_URL = 'http://127.0.0.1:8000'

export default {
name: 'ProfileView',
components: {
    // Card,
    BedgeGraph,
    CardList,
    ReviewListItem,
  },
data() {
  return {
    owner: this.$route.params.username,
    test: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy0HhhQ-N7_AmPj4ExJoue4xxXdMGcvXWfMrfC0XcDGg&s',
    show: true,
    isMyProfile: (this.$route.params.username === this.$store.state.username) ? true : false,
    profileImg: null,
    // info : null,
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
  // movies() {
  //   return this.movie
  // },
  // reviews() {
  //   return this.review
  // },
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
    console.log('ddd')
    axios({
      method: 'get',
      url: `${API_URL}/movies/like/${this.$route.params.username}/`,
      headers: {
        Authorization: `Token ${this.$store.state.token}`
      }
    })
      .then((res) => {
        console.log(this.$route.params.username)
        this.movies = res.data.userlike
        console.log(this.movies)
        // console.log(this.movies)
        console.log('내영화')
      })
      .catch((err) => {
        console.log(err)
        console.log('좋아요한 영화들')
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
        console.log('내리뷰')
      })
      .catch((err) => {
        console.log(err)
        console.log('내 리뷰들 실패')
      })
  },
  clickFollow() {
    axios({
      method: 'post',
      url: `${API_URL}/accountsinfo/follow/${this.$route.params.username}/`,
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
  // getUserImg() {
  //   axios({
  //     method: 'get',
  //     url: `${API_URL}/${this.info.profile_image}`,
  //   })
  //     .then((res) => {
  //       console.log(res.data)
  //       console.log('팔로우 성공')
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       console.log('팔로우 에러')
  //     })
  // }
},
created() {
  // console.log(this.$route.params.username)
  this.getfriend()
  console.log(this.$store.state.friendInfo)
  this.getUserMovie()
  this.getUserReview()
  console.log(this.movies,'영화')
  console.log(this.reviews,'리뷰')
},
// watch: {
//   movie(){
//     this.movies()
//     console.log(this.movies)
// },
//   review() {
//     this.reviews()
//   }
// }
}
</script>

<style>

</style>