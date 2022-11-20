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
            <p class="poster-content">{{ movie?.rate }}</p>
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
  // mounted() {
  //   this.width = this.$refs.card.offsetWidth;
  //   this.height = this.$refs.card.offsetHeight;
  // },
  // //props: ['dataImage'],
  // data: () => ({
  //   width: 0,
  //   height: 0,
  //   mouseX: 0,
  //   mouseY: 0,
  //   mouseLeaveDelay: null
  // }),
  computed: {
  //   mousePX() {
  //     return this.mouseX / this.width;
  //   },
  //   mousePY() {
  //     return this.mouseY / this.height;
  //   },
  //   cardStyle() {
  //     const rX = this.mousePX * 30;
  //     const rY = this.mousePY * -30;
  //     return {
  //       transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
  //     };
  //   },
  //   cardBgTransform() {
  //     const tX = this.mousePX * -40;
  //     const tY = this.mousePY * -40;
  //     return {
  //       transform: `translateX(${tX}px) translateY(${tY}px)`
  //     }
  //   },
    cardBgImage() {
      return {
        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${this.movie.posterpath})`
      }
    }
  },
  methods: {
    // handleMouseMove(e) {
    //   this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width/2;
    //   this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height/2;
    // },
    // handleMouseEnter() {
    //   clearTimeout(this.mouseLeaveDelay);
    // },
    // handleMouseLeave() {
    //   this.mouseLeaveDelay = setTimeout(()=>{
    //     this.mouseX = 0;
    //     this.mouseY = 0;
    //   }, 1000);
    // }
  }

}
  // methods: {
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
  //},
  // mounted() {
    
  // }

</script>
<style>

</style>