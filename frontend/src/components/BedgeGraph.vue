<template>
  <article class="bedge-graph">
      액션 <div class="progress-bar1">           
        <div class="progress"> </div>
      </div>
      범죄 <div class="progress-bar2">           
        <div class="progress"> </div>
      </div>
      스릴러 <div class="progress-bar3">           
        <div class="progress"> </div>
      </div>
    </article>
</template>

<script>
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