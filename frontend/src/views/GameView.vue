<template>
  <div class="game-box d-flex flex-row" style="min-width:700px; max-width:700px">
    <router-link :to="{ name: 'GameActorView'}"><button class="choicegame"> 배우로 하겠느냐 </button></router-link>
    <img src="https://img2.quasarzone.com/editor/2022/05/04/dcb2188deacff2d9ac59cf66f272279e.jpeg" alt="">
    <router-link :to="{ name: 'GameSceneView'}"><button class="choicegame"> 제목으로 하겠느냐</button></router-link>
  </div>
</template>

<script>
export default {
  name: 'GameView',
  data() {
    return {
      showTitle: false,
      showActor: false,
    }
  },
  methods: {
    clickActor() {
      this.showTitle = false
      this.showActor = true
    },
    clickTitle() {
      this.showTitle = true
      this.showActor = false
    }
  }
}
</script>

<style>
/* .game-box {

} */
.choicegame{
  border: 4mm ridge rgba(211, 220, 50, .6);
  color: #2D4059;
  font-family: 'PopcornFont';
}
</style>