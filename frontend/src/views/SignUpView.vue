<template>
  <div class="form" id="loginform">
    <h1> Sign Up </h1>
    <form novalidate @submit.prevent="signUp">
      <p class="username">
        <label for="username">ID <span>*</span></label>
        <input class="input" required type="text" id="username" name="email" v-model="username"/>
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
      <p class="nickname">
        <label for="nickname">nickname <span>*</span></label>
        <input class="input" required type="text" id="nickname" name="nickname" v-model="nickname"/>
        <span class="validation error"> Please enter a valid id</span>
        <span class="validation req"> This field is required</span>
      </p>
      <p class="firstname">
        <label for="firstname">firstname</label>
        <input class="input" required type="text" id="firstname" name="firstname" v-model="firstname"/>
      </p>
      <p class="lastname">
        <label for="lastname">lastname </label>
        <input class="input" required type="text" id="lastname" name="lastname" v-model="lastname"/>
      </p>
      <p class="email">
        <label for="email">email</label>
        <input class="input" required type="email" id="email" name="email" pattern="@" v-model="email"/>
      </p>
      <!-- <p class="remember">
        <input class="checkbox" type="checkbox" id="remember" />
        <label for="remember"> Remember me</label>
      </p> -->
      <p class="login">
        <input type="submit" value="회원 가입 완료하기" />
      </p>
      <router-link :to="{ name: 'LogInView' }">  
        <!-- <p class="SignUp">
          <input type="submit" value="로그인" />
        </p> -->
      </router-link>
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
