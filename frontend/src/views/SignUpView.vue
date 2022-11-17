<template>
  <div>
    <h1>Sign Up Page</h1>
    <form @submit.prevent="signUp">
      <label for="username"> 아이디 : </label>
      <input type="text" id="username" v-model="username"><br>

      <label for="nickname"> 닉네임 : </label>
      <input type="text" id="nickname" v-model="nickname"><br>
      <label for="firstname"> 성 : </label>
      <input type="text" id="firstname" v-model="firstname"><br>
      <label for="lastname"> 성을 제외한 이름 : </label>
      <input type="text" id="lastname" v-model="lastname"><br>

      <label for="password1"> 비밀번호 : </label>
      <input type="password" id="password1" v-model="password1"><br>
      <label for="password2"> 비밀번호 확인 : </label>
      <input type="password" id="password2" v-model="password2">

      <label for="email"> 이메일 : </label>
      <input type="text" id="email" v-model="email"><br>
      
      <input type="submit" value="SignUp">
    </form>
    <router-link :to="{ name: 'LogInView' }">로그인</router-link>
  </div>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username: null,
      nickname: null,
      firstname: null,
      lastname: null,
      password1: null,
      password2: null,
      email: null,
    }
  },
  methods: {
    signUp() {
      const username = this.username
      const nickname = this.nickname
      const firstname = this.firstname
      const lastname = this.lastname
      const password1 = this.password1
      const password2 = this.password2
      const email = this.email

      const payload = {
        username,
        nickname,
        firstname,
        lastname,
        password1,
        password2,
        email
      }
      this.$store.dispatch('signUp', payload)
    }
  }
}
</script>
