<template>
  <div>
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

</style>