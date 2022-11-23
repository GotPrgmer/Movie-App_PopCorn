<template>
  <div class="column-box">
    <p id="profileRec">{{nickname}}님 환영합니다 </p>
    <img :src="`http://127.0.0.1:8000${userImg}`" alt="">
    <span class="bedge-box">
      <BedgeGraph/>
    </span>
  </div>
</template>

<script>
import BedgeGraph from '@/components/BedgeGraph'

export default {
  name: 'ProfilePreView',
  components: {
    BedgeGraph,
  },
  data() {
    return {
      nickname : this.$store.state.nickname,
      userImg : this.$store.state.userImg,
      userInfo: this.$store.state.userInfo,
      bedges: null,
    }
  },
  created() {
    // console.log(this.$store.state.userImg)
  }
}
</script>

<style>
.box {
  display: flex;
  /* flex-direction: row; */
  justify-content: center;
}
</style>