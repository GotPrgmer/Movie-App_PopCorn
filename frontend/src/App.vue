<template>
  <div id="app">
    <nav id="navbar">
      <div id="bubbleWrapper">
        <!-- <router-link :to="{ name: 'MainView' }"><div id="bubble1" class="bubble"><span class="icon"><i class="fas fa-home"></i></span></div></router-link>
        <div id="bubble2" class="bubble"><span class="icon"><i class="fa fa-search"></i></span></div>
          <div id="bubble3" class="bubble" @click="clickProfile"><span class="icon"><i class="fas fa-user"></i></span></div>
        
        <div v-if="isLogin" id="bubble4" class="bubble"><span class="icon"><i class="fa fa-trash-o"></i></span></div>
        <div v-if="!isLogin" id="bubble4" class="bubble"><span class="icon"><i class="fa fa-mouse-pointer"></i></span></div>
      </div>
      <div id="menuWrapper"> -->
        <!-- 홈 -->
        <router-link :to="{ name: 'MainView' }">
          <div id="menu1" class="menuElement" @click="move('1', '50px', '#ffcc80')"><i class="fas fa-home"></i></div>
        </router-link>
        <!-- 검색 -->
        <div id="menu2" class="menuElement" @click="move('2', '150px', '#81d4fa')"><i class="fa fa-search"></i></div>
        <!-- 로그인 여부에 따라 회원가입, 프로필 -->
        <router-link v-if="!isLogin" :to="{ name: 'SignUpView' }">
          <div id="menu3" class="menuElement" @click="move('3', '250px', '#c5e1a5')"><i class="fas fa-user"></i></div>
        </router-link>
        <div id="menu3" v-if="isLogin" class="menuElement"  @click="[clickProfile(), move('3', '250px', '#c5e1a5')]"><i class="fas fa-user"></i></div>
        <!-- 로그인 여부에 따라 로그인, 로그아웃 -->
        <div id="menu4" class="menuElement" v-if="isLogin" @click="logOut"><i class="fa fa-trash"></i></div>
        <router-link v-if="!isLogin" :to="{ name: 'LogInView' }">
          <div id="menu4" class="menuElement" @click="move('4', '350px', '#ce93d8')"><i class="fa fa-mouse-pointer"></i></div>
        </router-link>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import "./assets/css/index.scss"
import gsap from "gsap"

export default {
  name: 'App',
  data() {
    return {
      username : this.$store.state.username
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
    move(id, position, color) {
      var tl = gsap.timeline();
      // tl.to("#bgBubble", {duration: 0.15, bottom: "-30px", ease: "ease-out"}, 0)
      tl.to("#bubble1", {duration: 0.1, y: "-150%", boxShadow: 'none', ease: "ease-out",}, 0)
        .to("#bubble2", {duration: 0.1, y: "-150%", boxShadow: 'none', ease: "ease-out",}, 0)
        .to("#bubble3", {duration: 0.1, y: "-150%", boxShadow: 'none', ease: "ease-out",}, 0)
        .to("#bubble4", {duration: 0.1, y: "-150%", boxShadow: 'none', ease: "ease-out",}, 0)
        .to(".icon", {duration: 0.05, opacity: 0, ease: "ease-out",}, 0)
        // .to("#bgBubble", {duration: 0.2, left: position, ease: "ease-in-out"}, 0.1)
        // .to("#bgBubble", {duration: 0.15, bottom: "-50px", ease: "ease-out"}, '-=0.2')
        .to(`#bubble${id}`, {duration: 0.15, y: "0%", opacity: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', ease: "ease-out"}, '-=0.1')
        .to(`#bubble${id}> span`, {duration: 0.15, y: "0%", opacity: 0.7, ease: "ease-out"}, '-=0.1')
        .to("#navbarContainer", {duration: 0.3, backgroundColor: color, ease: "ease-in-out"}, 0)
        // .to("#bg", {duration: 0.3, backgroundColor: color, ease: "ease-in-out"}, 0)
        // .to("#bgBubble", {duration: 0.3, backgroundColor: color, ease: "ease-in-out"}, 0)
    },
    clickProfile() {
      this.$router.push({ name: 'ProfileView', params: { username: this.$store.state.username } })
    }
  }
}
</script>
<style>
#app {
  overflow-y: scroll;
  -ms-overflow-style: none;
  height:100vh;
  scrollbar-width: none; 
}
#app::-webkit-scrollbar {
  display: none;
}
</style>

