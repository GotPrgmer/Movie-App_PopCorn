<template>
  <swiper class="swiper card_container" :options="swiperOption">
     <swiper-slide
        v-for="movie in movies" :key="movie.id">
        <CardListItem :movie="movie"/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    />
  </swiper>
</template>

<script>
import CardListItem from "@/components/CardListItem"
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: 'CardList',
  components: {
    CardListItem,
    Swiper,
    SwiperSlide
  },
  props: {
    movies: Array,
  },
  data() {
    return {
swiperOption: { 
    slidesPerView: 5, 
    spaceBetween: 10, 
    loop: true, 
    pagination: { 
        el: '.swiper-pagination', 
        clickable: true 
    }, 
    navigation: { 
        nextEl: '.swiper-button-next', 
        prevEl: '.swiper-button-prev' 
    } 
},
    }
  }
  
}

</script>

<style>

</style>