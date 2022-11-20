<template>
    <div class="form" id="loginform">
      <h1> Login </h1>
      <form novalidate @submit.prevent="logIn" >
        <p class="email">
          <label for="email">ID <span>*</span></label>
          <input class="input" required type="text" id="email" name="email" v-model="username"/>
          <span class="validation error"> Please enter a valid id</span>
          <span class="validation req"> This field is required</span>
        </p>
        <p class="password">
          <label for="password">Password <span>*</span></label>
          <input class="input" required type="password" id="password" name="password" v-model="password"/>
          <span class="validation req"> This field is required</span>
        </p>
        <!-- <p class="remember">
          <input class="checkbox" type="checkbox" id="remember" />
          <label for="remember"> Remember me</label>
        </p> -->
        <p class="login">
          <input type="submit" value="로그인하기" />
        </p>
        <router-link :to="{ name: 'SignUpView' }">  
          <p class="login">
            <input type="submit" value="회원가입" />
          </p>
        </router-link>
      </form>
    </div>
</template>

<script>
export default {
  name: 'LogInView',
  data() {
    return {
      username: null,
      password: null,
      formIsValid : true,
    }
  },
  methods: {
    logIn() {
      const username = this.username
      const password = this.password

      const payload = {
        username,
        password,
      }
      this.$store.dispatch('logIn', payload)
      this.$store.dispatch('getUserInfo', payload.username)
    }
  },
    // validateThisField (field) {
    //   if (field.required && field.value === '') {
    //     field.classList.add('required');
    //     this.formIsValid = false;
    //   }
    //   if (field.pattern
    //       && !(new RegExp(field.pattern).exec(field.value) !== null) ) {
    //     field.classList.add('invalid');
    //     this.formIsValid = false;
    //   }
    // },
    // logIn() {
    //   const fields = form.querySelectorAll('input')
    // 	Array.prototype.forEach.call(this.fields, validateThisField);
    //   	// also have a global state on the form
    // 	if (!this.formIsValid) {
    //     const form = document.getElementById('loginform')
    //     form.classList.remove('errors');
    //         setTimeout(function() {form.classList.add('errors');}, 0)
    //   } else {
    //     const username = this.username
    //     const password = this.password

    //     const payload = {
    //       username,
    //       password,
    //     }
    //     this.$store.dispatch('logIn', payload)
    //   }
    // },
    //  focusInput(e) {
    // 	e.target.classList.remove('required');
    // 	e.target.classList.remove('invalid');
    // },
    // blurInput(e) {
    //   e.target.classList.remove('required');
    // 	e.target.classList.remove('invalid');
    // 	validateThisField(e.target);
    // },
  // },
}
</script>
