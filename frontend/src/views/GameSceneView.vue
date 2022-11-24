<template>
  <div class="d-flex flex-column justify-content-center align-items-center" style="display:relative min-width:700px; max-width:700px">
    <label v-if="!isFinished" class="rounded mx-auto d-block m-3" for="userinput"><img class="game-actor-img" :src="`${answer.imgurl}`" alt="영화사진"></label><br>
    <button v-if="!isStarted && !isFinished" class="startGameBtn yb-replace" @click="startGame" id="yellow-box">시작하기</button>
    <div>
      <input v-if="!isFinished && isStarted" class="userinput yb-replace" type="text" id="userinput" v-model="userinput" @keyup.enter="pressEnter" placeholder="이 영화의 이름은?">
      <router-link v-if="isFinished" :to="{ name: 'GameView' }" class="yb-replace" id="yellow-box">다시 하기</router-link><br>
    </div>
    <router-link v-if="isFinished" :to="{ name: 'GameResultView', params: { useranswer: useranswer, answer: answer.actor} }" class="yb-replace" id="yellow-box">결과 보기</router-link>
  </div>
</template>

<script>
export default {
  name: 'GameSceneView',
  data() {
    return {
      isFinished: false,
      isStarted: false,
      userinput: '',
      useranswer: [],

      timerFlag: null,
      num : 0,

      answer : {
        actor: [],
        imgurl: 'https://play-lh.googleusercontent.com/P8sv01I532Z8t-dEPPflDfEXqahZkYCSbKtvlpcs9ZJgHP8rLBvYTf54sTz1FtIVrCs'
      },
      sceneGame: [
        {'닥터 스트레인지': 'https://post-phinf.pstatic.net/MjAyMTEwMTlfODMg/MDAxNjM0NjQ3NDUwOTYw.Ep0m2_gsFyag_fGvIDd1AS0_vBvIuYlE6vMxPVgORMkg.Val06EXFMkks7PQgLUlC_hqaW6Y1nDFNzexsThqMyLUg.JPEG/D5PT1I0VUAEBKUh.jpg?type=w1200'},
        {'아저씨': 'https://t1.daumcdn.net/cfile/tistory/27058C495807710C2C'},
        {'부당거래':'https://ac-p2.namu.la/4a/4a4bd7e0e004703f99fcdedf50324b57d6f7e78b442608382db5af42d07ac66b.jpg?type=orig'},
        {'범죄 도시':'http://jjal.today/data/file/gallery/thumb-1028612757_EiCnUqNj_19f8311425a2092cf569af3c76c2d74dbea6a072_640x515.jpg'},
        {'해리포터':'https://mblogthumb-phinf.pstatic.net/MjAxOTExMjBfNTkg/MDAxNTc0MjEzNDQyNDA5.GI1CsHkJZxp9YXvBm8Bf9LuTdF9DORiugheHtpXny50g.JjLFHu0DJVmFIqS6Wn12aXB49iXMvL8sJb3LTIjObDsg.JPEG.qqolp9/KakaoTalk_20191120_102805606_18.jpg?type=w800'},
        {'반지의 제왕':'https://mblogthumb-phinf.pstatic.net/MjAxOTAyMjNfMyAg/MDAxNTUwOTA5MjMzOTQx.k-nc1xuWaYGR_e2QtRLr3BFWr6Ue1wf2JAupXmas64Qg.rTVVPYyKEnW7c9j6-IgUxja7vIYLuuXj6X9qkjyFfu8g.JPEG.orbi11/%EB%B0%98%EC%A7%80%EC%9D%98%EC%A0%9C%EC%99%95%EC%99%95%EC%9D%98%EA%B7%80%ED%99%98_(%ED%99%95%EC%9E%A5%ED%8C%90)_(%EC%86%8C%EC%9E%A5-%ED%99%95%EC%9E%A5%ED%8C%90FHD)_DTO_FHD_0012288698ms.jpg?type=w800'},
        {'보헤미안 랩소디':'https://d3kxs6kpbh59hp.cloudfront.net/community/COMMUNITY/8cc9d3ab61384ee4a9a6d8cebec684a6/8a7882ff9ced4de6b2644fad052658c3_1610126703.jpeg'},
        {'싱 스트리트':'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/2j9V/image/YtOZ6Ndv66Pu0Rgat4WUQ9FshMo.JPG'},
        {'이프 온리':'https://mblogthumb-phinf.pstatic.net/MjAxODEyMDFfNjQg/MDAxNTQzNjU1NjQ3MzI1.sNJyT4K3KrjoiK8hOLX3XYoqhe903FzJ661fLX4HxvMg.FSHRshrSpIC_0f3GeOB_cGmaVUAPJOhaMa1IJYiXL9Ig.JPEG.jin_a_zzang/KakaoTalk_20181126_153708099.jpg?type=w800'},
        {'남자가 사랑할 때':'https://t1.daumcdn.net/cfile/tistory/2166AE4E5849926901'}
      ]
    }
  },
  methods: {
    selectAcotr() {
      const pickOne = this.sceneGame.pop()
      const actor = Object.keys(pickOne)[0]
      this.answer.actor.push(actor)
      this.answer.imgurl = pickOne[actor]
    },
    fiveSecond() {
      this.timerFlag = setInterval(this.timer, 1000)
    },
    timer() {
      this.num++
    },
    startGame() {
      this.isStarted = true
      this.fiveSecond()
    },
    pressEnter(event) {
      this.useranswer.push(event.target.value)
      event.target.value = ''
      this.userinput = ''
    }
  },
  watch: {
    num(newNum) {
      // console.log('매초', this.num)

      if ( [1, 5, 9, 13, 17].includes(newNum) ) {
        // console.log('들어있따', this.num)
        this.userinput = ''
        this.selectAcotr()
      }
      if (newNum > 20) {
        clearInterval(this.timerFlag)
        this.num = 0
        this.isFinished = true
        this.useranswer.push(this.userinput)
        this.userinput = ''
      }
    }
  }
}
</script>

<style>
.game-actor-img {
  max-width: 600px;
  max-height: 500px;
  background-size: contain;
  /* overflow: hidden; */
  border-radius: 10%;
}
.yb-replace {
  display: absolute;
  top:600px;
  height: 30px;
}
</style>