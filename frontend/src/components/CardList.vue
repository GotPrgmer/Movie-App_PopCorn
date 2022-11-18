<template>
  <div class="card_container">
    <CardListItem 
      v-for="movie in movies" :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script>
import CardListItem from "@/components/CardListItem"

export default {
  name: 'CardList',
  components: {
    CardListItem,
  },
  props: {
    movies: Array,
  },
}
</script>

<style>

</style>