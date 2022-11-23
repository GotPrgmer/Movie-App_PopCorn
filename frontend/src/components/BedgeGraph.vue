<template>
  <article class="bedge-graph">
      <div class="q-pa-md">
        뱃지입니다
          <div class="progress">
            <button class="progress-bar"  data-bs-toggle="collapse" aria-expanded="false" aria-controls="collapseExample" href="#collapseExample1"
              role="progressbar button" aria-label="Segment one" style="width: 15%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">액션</button>
            <button  data-bs-target="#collapseExample2" data-bs-toggle="collapse"
              class="progress-bar bg-success" role="progressbar" aria-label="Segment two" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">범죄</button>
            <button  data-bs-target="#collapseExample3" data-bs-toggle="collapse"
              class="progress-bar bg-warning" role="progressbar" aria-label="Segment two" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">스릴러</button>
          </div>
      </div>

      <div class="collapse" id="collapseExample1">
        <div class="card card-body">
          장르1 영화 넣을 거임
        </div>
      </div>
      <div class="collapse" id="collapseExample2">
        <div class="card card-body">
          장르2 영화 넣을 거임
        </div>
      </div>
      <div class="collapse" id="collapseExample3">
        <div class="card card-body">
          장르3 영화 넣을 거임
        </div>
      </div>
      뱃지입니다
    </article>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'BedgeGraph',
  methods: {
    moveGraph() {
      let t = 0
      bar.style.width = 0
      const barAnimation = setInterval(() => {
        bar.style.width =  t + '%'
        t++ >= totalMinwon && clearInterval(barAnimation)
      }, 10)
    }
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