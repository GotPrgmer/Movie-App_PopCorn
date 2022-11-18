<template>
  <div>
    <p>게임 결과</p>
    <p>내 답 {{useranswer}}</p>
    <p>정답 {{answer}}</p>
    <router-link :to="{ name: 'GameActorView' }">다시하기</router-link>
  </div>
</template>

<script>
export default {
  name: 'GameResultView',
  props: {
    useranswer: Array,
    answer: Array,
  },
}
</script>

<style>

</style>