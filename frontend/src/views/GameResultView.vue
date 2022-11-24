<template>
  <div class="d-flex flex-column justify-content-center align-items-center" style="display:relative min-width:700px; max-width:700px">
    <p class="mt-5"> 게임 결과</p>
    <hr>
    <div class="d-flex flex-row">
      <div class="m-5" style="min-width:150px;">
        <p>내 답</p>
        <hr>
        <div>
          <p v-for="name in useranswer" :key="name.id">{{ name }}</p>
        </div>
      </div>

      <div class="m-5" style="min-width:150px;">
        <p>정답</p>
        <hr>
        <div>
          <p v-for="actor in answer" :key="actor.id">{{actor}}</p>
        </div>
      </div>
    </div>

    <router-link :to="{ name: 'GameView' }" id="yellow-box">다시하기</router-link>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'GameResultView',
  props: {
    useranswer: Array,
    answer: Array,
  },
  data() {
    return {
      scores: {}
    }
  },
  methods: {
    getGenreScore() {
    axios({
      method: 'get',
      url: `${API_URL}/accountsinfo/scores/${this.$store.state.username}/`,
      headers: {
        Authorization: `Token ${this.$store.state.token}`
      }
    })
      .then((res) => {
        this.scores = res.data.score
        this.scoreCal()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    scoreCal() {
      const action = ['톰홀랜드', '스파이더맨', '닥터 스트레인지', '베네딕트 컴버배치', '오이형']
      const crime = ['류승범, 키아누 리브스']
      const fantasy = ['다니엘 래드클리프', '해리포터', '김향기']
      const music = ['강하늘', '키이라 나이틀리']
      const romance = ['손예진', '레이첼 맥아담스']
      for ( const name in this.useranswer ) {
        console.log(name)
        if ( this.answer.includes(name) ) {
          if (action.includes(name)) {
            this.scores['액션'] += 1
          } else if (crime.includes(name)) {
            this.scores['범죄'] += 1
          } else if (fantasy.includes(name)) {
            this.scores['판타지'] += 1
          } else if (music.includes(name)) {
            this.scores['음악'] += 1
          } else if (romance.includes(name)) {
            this.scores['로맨스'] += 1
          }
        }
      } this.editScores()
    },
    editScores() {
      axios({
        method: 'put',
        url: `${API_URL}/accountsinfo/scores/${this.$store.state.username}/`,
        data: this.scores,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then((res) => {
          // this.$router.go({ name: 'DetailView', params: { id:this.$route.params.id } })
          console.log('점수 수정 성공')
        })
        .catch((err) => {
          console.log(err)
          console.log('점수 수정 실패')
        })
    },
  },
  created() {
    this.getGenreScore()
  }
}
</script>

<style>

</style>