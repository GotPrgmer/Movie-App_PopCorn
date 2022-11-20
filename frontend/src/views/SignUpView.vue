<template>
  <div class="form" id="loginform">
    <h1> Sign Up </h1>
    <form @submit.prevent="signUp">
      <p class="username">
        <label for="username">ID <span>*</span></label>
        <input class="input" required type="text" id="username" name="email" v-model="username"/>
        <span class="validation error"> Please enter a valid id</span>
        <span class="validation req"> This field is required</span>
      </p>
      <p class="nickname">
        <label for="nickname">nickname <span>*</span></label>
        <input class="input" required type="text" id="nickname" name="nickname" v-model="nickname"/>
        <span class="validation error"> Please enter a valid id</span>
        <span class="validation req"> This field is required</span>
      </p>
      <p class="password">
        <label for="password1">Password 1 <span>*</span></label>
        <input class="input" required type="password" id="password1" name="password1" v-model="password1"/>
        <span class="validation req"> This field is required</span>
      </p>
      <p class="password">
        <label for="password2">password 2 <span>*</span></label>
        <input class="input" required type="password" id="password2" name="password2" v-model="password2"/>
        <span class="validation req"> This field is required</span>
      </p>
      <!-- <p class="firstname">
        <label for="firstname">firstname</label>
        <input class="input" type="text" id="firstname" name="firstname" v-model="firstname"/>
      </p>
      <p class="lastname">
        <label for="lastname">lastname </label>
        <input class="input" type="text" id="lastname" name="lastname" v-model="lastname"/>
      </p>
      <p class="email">
        <label for="email">email</label>
        <input class="input" type="email" id="email" name="email" pattern="@" v-model="email"/>
      </p> -->
      <p class="login">
        <input type="submit" value="회원 가입 완료하기" />
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username: null,
      nickname: null,
      password1: null,
      password2: null,
      // firstname: null,
      // lastname: null,
      // email: null,
    }
  },
  methods: {
    signUp() {
      const username = this.username
      const nickname = this.nickname
      const password1 = this.password1
      const password2 = this.password2
      // const firstname = this.firstname
      // const lastname = this.lastname
      // const email = this.email

      const payload = {
        username,
        nickname,
        password1,
        password2,
        // firstname,
        // lastname,
        // email
      }
      this.$store.dispatch('signUp', payload)
      this.$store.dispatch('getUserInfo', payload.username)
    }
  }
}
</script>
