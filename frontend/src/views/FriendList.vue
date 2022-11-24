<template>
  <div class="flex flex-column justify-content-center align-items-center" style="min-width:700px; max-width:700px">
    <div style="min-height:250px">
      <p>내가 좋아하는 친구</p>
      <span>
        <FriendListItem v-for="follow in following" :key="follow.id" :follow="follow"/>
      </span>
    </div>
    <div style="min-height:250px">
      <p>나를 따르는 친구</p>
      <span>
        <FriendListItem v-for="follow in follower" :key="follow.id" :follow="follow"/>
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import FriendListItem from '@/components/FriendListItem'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'FriendList',
  components: {
    FriendListItem,
  },
  data() {
    return {
      following: null,
      follower: null,
    }
  },
  methods: {
    getFollowing() {
      axios({
      method: 'get',
      url: `${API_URL}/accountsinfo/following/${this.$route.params.username}/`,
      headers: {
        Authorization: `Token ${this.$store.state.token}`
      }
    })
      .then((res) => {
        this.following = res.data.followingusers
        // console.log('친구')
        // console.log(this.following)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getFollower() {
      axios({
      method: 'get',
      url: `${API_URL}/accountsinfo/follower/${this.$route.params.username}/`,
      headers: {
        Authorization: `Token ${this.$store.state.token}`
      }
    })
      .then((res) => {
        this.follower = res.data.followerusers
        // console.log(this.follower)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  created() {
    this.getFollower()
    this.getFollowing()
  }
}
</script>

<style>

</style>