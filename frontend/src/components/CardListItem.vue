<template>
  <div>

    <router-link :to="{ name: 'DetailView', params: { id: movie.id, movie: movie } }">
      <!-- 두 가지 article이 번갈아 보여진다 기본 : poster, 마우스호버 : info -->
      <article class="poster">
      <img :src="`https://image.tmdb.org/t/p/w500/${movie.posterpath}`" :alt="movie.title">
      </article>
      <article class="info">
        <span>제목 {{ movie?.movietitle }}</span>
        <span>평점 {{ movie?.rate }}</span>
        <span>{{ movie?.posterpath }}</span>
      </article>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CardListItem',
  props: {
    movie: Object,
  },
}
</script>

<style>

</style>