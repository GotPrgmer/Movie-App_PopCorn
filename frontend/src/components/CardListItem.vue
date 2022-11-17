<template>
  <div>

    <router-link :to="{ name: 'DetailView', params: { id: movie.id } }">
      <!-- 두 가지 article이 번갈아 보여진다 기본 : poster, 마우스호버 : info -->
      <article class="poster">
      <!-- <img :src="movie.posterpath" :alt="movie.title"> -->
      </article>
      <article class="info">
        <span>제목 {{ movie?.title }}</span>
        <span>평점 {{ movie?.rate }}</span>
      </article>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CardListItem',
  props: {
    movie: String,
  },
}
</script>

<style>

</style>