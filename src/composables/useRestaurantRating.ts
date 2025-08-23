// src/composables/useRestaurantRating.ts
import { computed } from 'vue'
import type { Restaurant } from '~/composables/restaurants'

export function useRestaurantRating(restaurant: Restaurant) {
  const average = computed(() => {
    const reviews = restaurant?.reviews ?? []
    if (reviews.length === 0) return 0
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  })

  const formatted = computed(() => {
    if (!average.value) return 'No reviews yet'
    // Arrondi propre : entier si .0, sinon 1 décimale
    const rounded =
      Number.isInteger(average.value) ? average.value : average.value.toFixed(1)
    return `${rounded}/5`
  })

  const count = computed(() => restaurant?.reviews?.length ?? 0)

  return { average, formatted, count }
}
