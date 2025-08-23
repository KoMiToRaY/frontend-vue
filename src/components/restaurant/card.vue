<script setup lang="ts">
import { type Restaurant } from '~/composables/restaurants';
import { useRestaurantRating } from '~/composables/useRestaurantRating';

const props = defineProps<{
  restaurant: Restaurant
}>();

// Déstructuration directe → évite de manipuler l’objet rating complet
const { average, formatted, count } = useRestaurantRating(props.restaurant);
</script>

<template>
  <VCard>
    <VImg
      height="100"
      cover
      :src="restaurant?.photos?.[0]"
    />

    <VCardTitle>{{ restaurant.name }}</VCardTitle>

    <!-- Average rating -->
    <div
      v-if="average"
      class="mx-4 my-2 flex items-center gap-2"
    >
      <VRating
        :model-value="average"
        half-increments
        readonly
        color="amber"
        size="20"
      />
      <div class="leading-tight mt-2">
        <span class="font-semibold text-gray-800">
          {{ formatted }}
        </span>
        <span class="text-sm text-gray-500 ml-2">
          ({{ count }} reviews)
        </span>
      </div>
    </div>

    <div v-else class="mx-4 my-2 text-sm text-gray-500 italic">
      No reviews yet
    </div>

    <VCardText v-if="restaurant.location">
      <RestaurantLocation :location="restaurant.location" />
    </VCardText>

    <VCardActions class="mt-auto">
      <VBtn
        color="primary"
        variant="tonal"
        :to="`/restaurants/${restaurant.id}`"
      >
        See more
      </VBtn>
    </VCardActions>
  </VCard>
</template>
