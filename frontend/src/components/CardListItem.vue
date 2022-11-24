<template>
  <router-link
    class="poster-content" 
    :to="{ name: 'DetailView', params: { id: movie.id } }">
    <div class="poster-card">
        <div class="poster-front" :style="cardBgImage">
        </div>
        <div class="poster-back" :style="cardBgImage">
          <div>
            <p class="poster-header">{{ movie?.movietitle }}</p>
            <!-- <p class="poster-content">{{ movie?.rate }}</p> -->
          </div>
        </div>
    </div>
  </router-link>
</template>
<!--<img :src="`https://image.tmdb.org/t/p/w500/${movie.posterpath}`" :alt="movie.title">-->
<script>
 
export default {
  name: 'CardListItem',
  props: {
    movie: Object,
  },
  computed: {
    cardBgImage() {
      return {
        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${this.movie.posterpath})`
      }
    }
  },
}

</script>
<style>

</style>