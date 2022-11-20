<template>
  <div>
    <p>제목 : {{ article?.review_title }}</p>
    <p>내용 : {{ article?.review_content }}</p>
    <p>마지막 수정 : {{ article?.updated_at }}</p>
    <p>좋아요 수 : {{ article?.like_users.length }}</p>
    <!-- <p>작성자 : {{ article.user }}</p> -->
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
