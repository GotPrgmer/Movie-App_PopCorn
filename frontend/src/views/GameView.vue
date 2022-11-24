<template>
  <div class="game-box" style="min-width:700px; max-width:700px">
    게임을 시작하지
    <GameActorView/>
  </div>
</template>

<script>
import GameActorView from '@/views/GameActorView'
export default {
  name: 'GameView',
  components: {
    GameActorView,
  }
}
</script>

<style>
/* .game-box {

} */
</style>