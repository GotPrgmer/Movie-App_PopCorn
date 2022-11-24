<template>
  <div class="form" id="loginform">
    <h1> Sign Up </h1>
    <form novalidate @submit.prevent="signUp">
      <p class="username">
        <label for="username">ID <span>*</span></label>
        <input class="input" required type="text" id="username" name="username" v-model="username"/>
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
        <input class="input" required type="password" id="password2" name="password2" v-model="password2" />
        <span class="validation req"> This field is required</span>
      </p>
      <p class="profileimg">
        <label for="profileimg">profile image </label>
        <input
          class="file" id="profileimg" name="profileimg"
          type="file" @change="previewFile()" ref="profileimg" accept="image/*">
        <!-- <span><img src="" height="200" alt="이미지 미리보기"></span> -->
      </p>
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
      profileimg: null,
      // checkimg: null,
    }
  },
  methods: {
    signUp() {
      const username = this.username
      const nickname = this.nickname
      const password1 = this.password1
      const password2 = this.password2
      const profileimg = this.profileimg
      
      let payload = {}
      if (profileimg) {
        payload = {
          username,
          nickname,
          password1,
          password2,
          profileimg,
        }
      } else {
        payload = {
          username,
          nickname,
          password1,
          password2,
        }
      }
      this.$store.dispatch('signUp', payload)
      .then((res) => {
            this.$store.dispatch('getUserInfo', this.username)
            console.log(this.$store.state.username)
            console.log(this.$store.state.nickname)
          })
    },
    previewFile() {
      // 1. axios 요청 보낼 데이터
      this.profileimg = this.$refs.profileimg.files[0]
      console.log(this.$refs.profileimg.files[0])
      // 2. 이미지 미리보기
  //     const preview = document.querySelector('img');
  //     const file = document.querySelector('input[type=file]').files[0];
  //     const reader = new FileReader();
  //     reader.addEventListener(
  //       'load',
  //       function () {
  //         preview.src = reader.result;
  //       },
  //       false
  //     );

  //     if (file) {
  //       reader.readAsDataURL(file);
  //     }
  //   },
  //   resize() {
  //     canvas.width = '50px';
  //     canvas.height = '50px';
  //     canvas.getContext("2d").drawImage(image, 0, 0, 50, 50);
  //     const dataUrl = canvas.toDataURL("image/jpeg");
  //     return dataURItoBlob(dataUrl);
    }
  }
}
</script>