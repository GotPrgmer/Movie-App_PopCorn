<template>
  <swiper-slide class="card_item">

    <router-link 
      :to="{ name: 'DetailView', params: { id: movie.id, movie: movie } }"
      @mouseover="mouseOverCard" @mouseleave="mouseLeaveCard"
    >
      <!-- 두 가지 article이 번갈아 보여진다 기본 : poster, 마우스호버 : info -->
      <article class="poster">
      <img class="posterimg" :src="`https://image.tmdb.org/t/p/w500/${movie.posterpath}`" :alt="movie.title">
      </article>

      <article class="info hide_on_bush">
        <span>{{ movie?.movietitle }}</span>
        <span>{{ movie?.rate }}</span>
      </article>

    </router-link>
  </swiper-slide>
</template>

<script>
 
export default {
  name: 'CardListItem',
  props: {
    movie: Object,
  },
  methods: {
    // mouseOverCard() {
    //   const poster = document.querySelector('.poster')
    //   const info = document.querySelector('.info')
    //   poster.classList.add('hide_on_bush')
    //   info.classList.remove('hide_on_bush')
    // },
    // mouseLeaveCard() {
    //   const poster = document.querySelector('.poster')
    //   const info = document.querySelector('.info')
    //   poster.classList.remove('hide_on_bush')
    //   info.classList.add('hide_on_bush')
    // },
  },
  // mounted() {
    
  // }
}
</script>
<style>

</style>