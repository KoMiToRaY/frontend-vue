<script setup lang="ts">
import { computed } from 'vue'
import { useFetchRestaurants } from '~/composables/restaurants'
import { useRestaurantRating } from '~/composables/useRestaurantRating'

const { data: restaurants, isError, isLoading } = useFetchRestaurants()

// ref exposé par RatingFilter
const ratingFilter = ref(0)

// restaurants filtrés
const filteredRestaurants = computed(() => {
  if (!restaurants.value) return []
  if (ratingFilter.value === 0) return restaurants.value

  return restaurants.value.filter(r => {
    const { average } = useRestaurantRating(r)
    return (average.value ?? 0) >= ratingFilter.value
  })
})
</script>

<template>
  <div>
    <RatingFilter v-model="ratingFilter" />

    <div v-if="isLoading">Loading...</div>
    <LoadingError v-else-if="isError" />

    <div v-else class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <RestaurantCard
        v-for="restaurant in filteredRestaurants"
        :key="restaurant.id"
        :restaurant="restaurant"
      />
    </div>
  </div>
</template>
