<template>
  <article class="bedge-graph mx-1">
    <div class="q-pa-md">
        <div class="progress">
          <button id="collapseid1" data-bs-target="#collapseExample1" data-bs-toggle="collapse"
            class="progress-bar" role="progressbar" aria-label="Segment two" :style="`width: ${score1/total*100}%`" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">
              <div class="ms-2 genre-name">{{ genre1 }}</div>
            </button>
          <button id="collapseid2" data-bs-target="#collapseExample2" data-bs-toggle="collapse"
            class="progress-bar bg-success" role="progressbar" aria-label="Segment two" :style="`width: ${score2/total*100}%`" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">
              <div class="ms-2 genre-name">{{ genre2 }}</div>
            </button>
          <button id="collapseid3" data-bs-target="#collapseExample3" data-bs-toggle="collapse"
            class="progress-bar bg-warning" role="progressbar" aria-label="Segment two" :style="`width: ${score3/total*100}%`" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">
              <div class="ms-2 genre-name">{{ genre3 }}</div>
            </button>
        </div>
    </div>
    <div class="collapse m-1" id="collapseExample1">
      <div class="card card-body">
        <CardList :movies="mymovies[0]"/>
      </div>
    </div>
    <div class="collapse m-1" id="collapseExample2">
      <div class="card card-body">
        <CardList :movies="mymovies[1]"/>
      </div>
    </div>
    <div class="collapse m-1" id="collapseExample3">
      <div class="card card-body">
        <CardList :movies="mymovies[2]"/>
      </div>
    </div>
  </article>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import CardList from '@/components/CardList'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'BedgeGraph',
  components: {
    CardList,
  },
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
      total: 0,
      genres:[],
      genre:{
        '모험':12,
        '판타지':14,
        '애니메이션':16,
        '드라마':18,
        '공포':27,
        '액션':28,
        '코미디':35,
        '역사':36,
        '서부':37,
        '스릴러':53,
        '범죄':80,
        '다큐멘터리':99,
        'SF':878,
        '미스터리':9648,
        '음악':10402,
        '로맨스':10749,
        '가족':10751,
        '전쟁':10752,
        'TV 영화':10770,
      },
      movies:[],
      mymovies: [],
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
    getGenreMovie() {
      for (var i = 0; i < this.genres.length; i++){
        axios({
      method: 'get',
      url: `${API_URL}/movies/bygenre/${this.genre[this.genres[i]]}/`,
      headers: {
        Authorization: `Token ${this.$store.state.token}`
      }
    })
      .then((res) => {
        this.mymovies.push(res.data)
        this.$store.dispatch('saveGenreMovie', this.mymovies[0])
        // console.log('내점수', res.data.score)
        // console.log(res.data,'영화불러오기 성공')
      })
      .catch((err) => {
        console.log(err)
        // console.log(this.scores,'점수 불러오기 실패')
      })
      }
    },
    getGenreScore() {
    axios({
      method: 'get',
      url: `${API_URL}/accountsinfo/scores/${this.$store.state.username}/`,
      headers: {
        Authorization: `Token ${this.$store.state.token}`
      }
    })
      .then((res) => {
        // console.log('내점수', res.data.score)
        this.scores = res.data.score
        console.log(this.scores)

        const sorted_scores = Object.fromEntries(
        Object.entries(this.scores).sort(([,a],[,b]) => parseInt(a) > parseInt(b)? -1: 1 )
        );
        this.scores = sorted_scores
        console.log(Object.values(sorted_scores),'점수')
        this.score1 = Object.values(sorted_scores)[0]
        this.score2 = Object.values(sorted_scores)[1]
        this.score3 = Object.values(sorted_scores)[2]
        console.log(typeof(this.score1))
        
        this.total = this.score1 + this.score2 + this.score3
        console.log(Object.keys(this.scores).slice(0,3))
        this.genres = Object.keys(this.scores).slice(0,3)
        console.log(this.genres,'내 장르 불러오기 성공')
        this.getGenreMovie()
      })
      .catch((err) => {
        console.log(err)
                console.log(this.scores,'점수 불러오기 실패')

      })
    },
    
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