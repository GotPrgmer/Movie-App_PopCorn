<template>
  <div>
    <p>제목 : {{ article.title }}</p>
    <p>작성자 : {{ article.username }}</p>
    <router-link
      :to="{ name: 'DetailView', params: { id: article.id } }">
      [Detail]
    </router-link>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'ReviewListItem',
  props: {
    article: Object,
  }
}
</script>

<style>

</style>
