<script setup lang="ts">
import { useFetchRestaurant } from '~/composables/restaurants';
import { useRestaurantRating } from '~/composables/useRestaurantRating';

const { params } = useRoute();
const { data: restaurant, isError } = useFetchRestaurant({ restaurantId: params.restaurantId });

// rating (null tant que restaurant n’est pas encore chargé)
const rating = computed(() =>
  restaurant.value ? useRestaurantRating(restaurant.value) : null,
);
</script>

<template>
  <VAlert v-if="isError" type="error" class="mt-4">
    Une erreur est survenue lors du chargement du restaurant.
    Vérifie ta connexion ou réessaie plus tard.
  </VAlert>

  <div v-else class="grid grid-cols-1 lg:grid-cols-[minmax(0,_1fr)_16rem] gap-6">
    <VCard v-if="restaurant">
      <VImg
        v-for="photo in restaurant.photos"
        :key="photo"
        :src="restaurant.photos[0]"
        height="250"
        cover
        gradient="to top, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      >
        <VCardTitle class="!text-4xl text-white">
          {{ restaurant.name }}
        </VCardTitle>

        <!-- Mean rating -->
        <div
          v-if="rating"
          class="mx-4 my-2 flex items-center gap-2 bg-black/50 rounded px-3 py-1 inline-flex"
        >
          <VRating
            :model-value="rating.average.value"
            half-increments
            readonly
            color="amber"
            size="20"
          />
          <span class="text-white font-medium mt-2">
            {{ rating.formatted }} ({{ rating.count }} avis)
          </span>
        </div>
      </VImg>

      <VCardText>
        <div class="grid grid-cols-2 gap-4">
          <RestaurantLocation :location="restaurant.location" />
          <KeyValue icon="mdi-phone">
            <p class="text-body-1">
              {{ restaurant.display_phone || restaurant.phone }}
            </p>
          </KeyValue>
        </div>
      </VCardText>
    </VCard>

    <aside v-if="restaurant">
      <ul class="pa-0">
        <RestaurantReview
          v-for="review in restaurant?.reviews || []"
          :key="review.id"
          :review="review"
        />
      </ul>
    </aside>
  </div>
</template>
