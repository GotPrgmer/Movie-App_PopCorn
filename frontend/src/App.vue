<template>
  <div id="app">
    <nav>
      <router-link :to="{ name: 'MainView' }"><img src="../src/assets/logo-nav.png" alt="홈으로"></router-link>
      <span> 검색  | </span>
      <router-link v-if="isLogin" :to="{ name: 'ProfileView' }">프로필 사진 |  </router-link>
      <router-link :to="{ name: 'ArticleView' }">전체 게시판 | </router-link>
      <router-link v-if="!isLogin" :to="{ name: 'SignUpView' }">Sign Up | </router-link>
      <router-link v-if="!isLogin" :to="{ name: 'LogInView' }">Log In | </router-link>
      <button v-if="isLogin" @click="logOut">Log Out</button>

      <!-- <body id="body" class="light-mode">
      <h1>Dark &amp; Light Mode Switcher</h1>
      
      <div class="btn-group btn-group-toggle mb-3">
        <button id="light" type="button" class="active btn pr-4 pl-4 border-0" onclick="toggleLight()">Light</button>
        <button id="dark" type="button" class="btn pr-4 pl-4 border-0" onclick="toggleDark()">Dark</button>   
      </div>
      
      <p>Press the button above to toggle.</p>
    </body> -->

    </nav>

    <router-view/>
  </div>
</template>

<script>
import "./assets/css/index.scss"

export default {
  name: 'App',
  data() {
    return {
      userInfo: null
    }
  },
  computed:{
    isLogin() {
      return this.$store.getters.isLogin
    },
    userName() {
      return this.$store.state.username
    }
  },
  methods: {
    logOut() {
      if (this.isLogin === true) {
        //로그아웃???
        this.$store.dispatch('logOut')
      } else {
        alert('로그인')
        this.$router.push({ name: 'LogInView'})
      }
    },
  }
//     toggleLight() {
//     var body = document.getElementById("body");
//     var currentClass = body.className;
//     body.className = currentClass == "dark-mode" ? "light-mode" : "light-mode";
//     },
//     toggleDark() {
//     var body = document.getElementById("body");
//     var currentClass = body.className;
//     body.className = currentClass == "light-mode" ? "dark-mode" : "dark-mode";
//     }
//   },
// $(".btn-group > .btn").click(function(){
//   $(".btn-group > .btn").removeClass("active");
//   $(this).addClass("active");
// });
}
</script>
<style>
</style>

