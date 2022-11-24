<template>
  <article class="bedge-graph mx-1">
    <div class="q-pa-md">
        <div class="progress">
          <button id="collapseid1" data-bs-target="#collapseExample1" data-bs-toggle="collapse"
            class="progress-bar" role="progressbar" aria-label="Segment two" :style="`width: ${score1}%`" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">
              <div class="ms-2 genre-name">{{ genre1 }}</div>
            </button>
          <button id="collapseid2" data-bs-target="#collapseExample2" data-bs-toggle="collapse"
            class="progress-bar bg-success" role="progressbar" aria-label="Segment two" :style="`width: ${score2}%`" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">
              <div class="ms-2 genre-name">{{ genre2 }}</div>
            </button>
          <button id="collapseid3" data-bs-target="#collapseExample3" data-bs-toggle="collapse"
            class="progress-bar bg-warning" role="progressbar" aria-label="Segment two" :style="`width: ${score3}%`" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">
              <div class="ms-2 genre-name">{{ genre3 }}</div>
            </button>
        </div>
    </div>

    <div class="collapse m-1" id="collapseExample1">
      <div class="card card-body">
        장르1 영화 넣을 거임
      </div>
    </div>
    <div class="collapse m-1" id="collapseExample2">
      <div class="card card-body">
        장르2 영화 넣을 거임
      </div>
    </div>
    <div class="collapse m-1" id="collapseExample3">
      <div class="card card-body">
        장르3 영화 넣을 거임
      </div>
    </div>
  </article>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'BedgeGraph',
  data() {
    return {
      scores: {},
      scoreTop3: {},
      genre1 : '드라마',
      genre2 : '액션' ,
      genre3 : '멜로' ,
      score1: 50,
      score2: 40,
      score3: 10,

    }
  },
  methods: {
    moveGraph() {
      let t = 0
      bar.style.width = 0
      const barAnimation = setInterval(() => {
        bar.style.width =  t + '%'
        t++ >= totalMinwon && clearInterval(barAnimation)
      }, 10)
    },
    getGenreScore() {
    axios({
      method: 'get',
      url: `${API_URL}/accountsinfo/scores/${this.$route.params.username}/`,
      headers: {
        Authorization: `Token ${this.$store.state.token}`
      }
    })
      .then((res) => {
        // console.log('내점수', res.data.score)
        this.scores = res.data.score
        this.scoreToGraph()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    scoreToGraph() {
      const scoreNum = []
      for (const score in this.scores) {
        scoreNum.push(this.scores[score])
      }
      scoreNum.sort((a, b) => b - a);
      console.log('sortNum', scoreNum);
        // const scoreSort = scoreNum.sort()
      for ( let i = 1; i < 5; i++ ) {
        const num = scoreNum.slice(0)
        for (const score in this.scores) {
          if (num === this.scores[score]) {
            this.scoreTop3.push({score:num})
          }
        }
      console.log('answer', this.scoreTop3)
      }
    }
  },
  created() {
    this.getGenreScore()
  },
  setup () {
    return {
      ratingModel: ref(4),
      ratingColors: [ 'light-green-3', 'light-green-6', 'green', 'green-9', 'green-10' ]
    }
  }
}
</script>

<style>

.progress-bar1 {
    width: 250px;
    height: 15px;
    background-color: #dedede;
    font-weight: 600;
    font-size: .8rem;
    margin: 2px;
}

.progress-bar1 .progress {
    width: 36%;  
    height: 15px;
    padding: 0;
    text-align: center;
    background-color: #EA5455;
    color: #111;
}
.progress-bar2 {
    width: 250px;
    height: 15px;
    background-color: #dedede;
    font-weight: 600;
    font-size: .8rem;
    margin: 2px;
}

.progress-bar2 .progress {
    width: 72%;  
    height: 15px;
    padding: 0;
    text-align: center;
    background-color: #E0A21C;
    color: #111;
}
.progress-bar3 {
    width: 250px;
    height: 15px;
    background-color: #dedede;
    font-weight: 600;
    font-size: .8rem;
    margin: 2px;
}

.progress-bar3 .progress {
    width: 50%;  
    height: 15px;
    padding: 0;
    text-align: center;
    background-color: #2D4059;
    color: #111;
}
</style>