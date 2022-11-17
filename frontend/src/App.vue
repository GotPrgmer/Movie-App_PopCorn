<template>
  <div id="app">
    <nav>
      <router-link :to="{ name: 'MainView' }"><img src="../src/assets/logo-nav.png" alt="홈으로"></router-link>
      <span> 검색 </span> | 
      <router-link :to="{ name: 'ProfileView' }">프로필 사진 </router-link> | 
      <router-link :to="{ name: 'ArticleView' }">전체 게시판</router-link> | 
      <router-link :to="{ name: 'SignUpView' }">Sign Up</router-link> | 
      <router-link :to="{ name: 'LogInView' }">Log In</router-link> | 
      <button @click="logOut">Log Out</button>

      
    
    </nav>

    <router-view/>
  </div>
</template>

<script>
import "./assets/css/index.scss"

export default {
  name: 'App',
  computed:{
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
  methods: {
    logOut() {
      if (this.isLogin === true) {
        //로그아웃???
        // this.$store.dispatch('logOut')
        this.$router.push({ name: 'MainView'})
      } else {
        alert('로그인')
        this.$router.push({ name: 'LogInView'})
      }
    }
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #E0A21C;
    }
  }
}

</style>

