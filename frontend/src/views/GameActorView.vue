<template>
  <div>
    <label v-if="!isFinished" class="rounded mx-auto d-block m-3" for="userinput"><img class="actor" :src="`${answer.imgurl}`" alt="인물사진"></label><br>
    <button v-if="!isStarted && !isFinished" class="startGameBtn" @click="startGame">시작하기</button>
    <input v-if="!isFinished && isStarted" class="userinput" type="text" id="userinput" v-model="userinput" @keyup.enter="pressEnter" placeholder="이 배우의 이름은?">
    <router-link v-if="isFinished" :to="{ name: 'GameActorView' }">다시 하기</router-link><br>
    <router-link v-if="isFinished" :to="{ name: 'GameResultView', params: { useranswer: useranswer, answer: actor} }">결과 보기</router-link>
  </div>

</template>

<script>
import _ from 'lodash'

export default {
  name: 'GameActorView',
  data() {
    return {
      isFinished: false,
      isStarted: false,
      timerFlag: null,
      num : 0,
      userinput: '',
      useranswer: [],
      answer : {
        actor: [],
        imgurl: 'https://steamuserimages-a.akamaihd.net/ugc/1281786203421688972/2E1A37012CBC1C1C3637027BB280C879C00AC455/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
      },
      actorGame: [
        {'톰홀랜드': 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQp7XNv6HleTfZwfX7nSAAOEM3Dntv26l7EICMisSls6G65kv_YNX9j87ORQ1TZhZTP'},
        {'베네딕트 컴버배치': 'https://mblogthumb-phinf.pstatic.net/MjAxNjEwMjRfMTI3/MDAxNDc3Mjk2NDU3NDIz.YA0rOi2VwNaC_Hk1AYEG4to3HLx1XrbbNdkOJ58a08Qg.B1a3VbbLc2_S8YxsAcKQNnVhYL-DYZunbiQ9095JNJsg.JPEG.cine_play/e6bbc2075c4c11d19a7114afbf57ed2b.jpg?type=w800'},
        {'류승범':'https://cdn.huffingtonpost.kr/news/photo/201910/88448_166326.png'},
        {'키아누 리브스':'http://www.sputnik.kr/article_img/202102/article_1612845194.jpg'},
        {'다니엘 래드클리프':'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Daniel_Radcliffe_SDCC_2014.jpg/215px-Daniel_Radcliffe_SDCC_2014.jpg'},
        {'김향기':'http://www.sisaweek.com/news/photo/201901/117779_102086_427.jpg'},
        {'키이라 나이틀리':'http://res.heraldm.com/content/image/2013/05/05/20130505000207_0.jpg'},
        {'강하늘':'https://upload.wikimedia.org/wikipedia/commons/a/a5/210507_%EA%B0%95%ED%95%98%EB%8A%98.jpg'},
        {'손예진':'http://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/02/10/e6bf53d0-9f79-4c6f-a0a5-44db671cfeac.jpg'},
        {'레이첼맥아담스':'https://cdn.topstarnews.net/news/photo/201810/509910_172687_97.jpg'},
      ],
    }
  },
  methods: {
    selectAcotr() {
      const pickOne = _.sample(this.actorGame)
      const actor = Object.keys(pickOne)[0]
      this.answer.actor.push(actor)
      this.answer.imgurl = pickOne[actor]
      this.actorGame.splice(this.actorGame.indexOf(actor), 1)
      this.num += 1
      console.log(this.answer.actor)
      console.log(this.actorGame)
    },
    fiveSecond() {
      this.timerFlag = setInterval(this.selectAcotr, 4000)
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
      this.useranswer.push(this.userinput)
      this.userinput = ''
      if (newNum >= 5) {
        clearInterval(this.timerFlag)
        this.num = 0
        this.isFinished = true
        console.log(this.useranswer)
        console.log(this.answer.actor)
      }
    }
  }
      // const genre = this.gameinfo
      // console.log(genre)
      // const actions = genre.[0]
      // const crime = genre.[1]
      // const fantasy = genre.[2]
      // const music = genre.[3]
      // const romance = genre.[4]
      //     this.actorImg = _.sampleSize(actorgame, 6)
        // },
    // async getActorName () {
    //   const TMDB = process.env.TMDB
    //   const YOUTUBE = process.env.YOUTUBE
    //   const NAVER = process.env.NAVER

    //   const MOVIE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB}&language=en-US&page=1`
    //   // let movieCd = ''
    //   // const ACTOR_URL = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${$KOREAN_MOVIE}&movieCd=${movieCd}`
    //   const ACTOR_IMAGE_URL = `https://openapi.naver.com/v1/search/movie/${NAVER}`

    //   // const movieData = await axios.get(MOVIE_URL)
    //   // movieCd = movieData.id
      
    //   const actorData = await axios.get(ACTOR_IMAGE_URL)
    //   let imgUrl = ''
    //   imgUrl = actorData.actorimgurl
    //   return imgUrl
    // },
  // computed: {
  //   gameinfo() {
  //     console.log(this.$store.state.actorGame)
  //     return this.$store.state.actorGame
  //   },
  // },
  // mounted() {
    // console.log(gameinfo)
    // getActorName().then(res=> console.log(res))
  // }
}

  
  // setTimeout(() => console.log(infos), 1000)
</script>

<style>

</style>