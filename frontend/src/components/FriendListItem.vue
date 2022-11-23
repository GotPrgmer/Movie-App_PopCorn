<template>
  <div id="followbox">
    <router-link :to="{ name: 'ProfileView', params: { username: follow } }">
    <h1>{{follow}}</h1>
    </router-link>
    <CardList :movies="movies"/>
  </div>
</template>

<script>import axios from 'axios'
import CardList from '@/components/CardList'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'FriendListItem',
  components: {
    CardList,
  },
  props: {
    follow: String,
  },
  data() {
    return {
      movies: []
    }
  },
  methods: {
    getUserMovie() {
      // console.log(this.follow)
      axios({
        method: 'get',
        url: `${API_URL}/movies/like/${this.follow}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then((res) => {
          // console.log(res.data)
          this.movies = res.data.userlike
          // console.log(this.movies)
        })
        .catch((err) => {
          console.log(err)
        })
      },
  },
  created() {
    this.getUserMovie()
  }
}
</script>

<style>
/* #followbox {
  height: 100px;
  width: 50px;
  position: relative;
} */
</style>