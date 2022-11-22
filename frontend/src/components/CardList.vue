<template>
  <swiper class="swiper card_container" :options="swiperOption">
     <swiper-slide
        class="swiper-slide"
        v-for="movie in movies"
        :key="movie.id"
      >
        <CardListItem :movie="movie"/>
      </swiper-slide>
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide, scrollbar } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import CardListItem from "@/components/CardListItem"

export default {
  name: 'CardList',
  components: {
    CardListItem,
    Swiper,
    SwiperSlide,
    scrollbar
  },
  props: {
    movies: Array,
  },
  data() {
    return {
      swiperOption: { 
        slidesPerView: 2,
        spaceBetween: 0, 
        // loop: true, 
        mousewheel: true,
        navigation: { 
            nextEl: '.swiper-button-next', 
            prevEl: '.swiper-button-prev' 
        } ,
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar',
          // hide: true,
        },
        breakpoints: {
          '540': {
            slidesPerView: 3,
          },
          '780': {
            slidesPerView: 4,
          },
          '1020': {
            slidesPerView: 5,
          },
          '1260': {
            slidesPerView: 6,
          },
          '1500': {
            slidesPerView: 7,
          },
          '1740': {
            slidesPerView: 8,
          },
        }
      },
    }
  }
}
</script>

<style>

</style>