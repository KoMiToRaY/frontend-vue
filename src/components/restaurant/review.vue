<script setup lang="ts">
import { type Review } from '~/composables/restaurants';

defineProps<{
  review: Review
}>();
</script>

<template>
  <VCard class="va-company-review mb-5" tag="li">
    <VCardText>
      <!-- Rating -->
      <VRating
        :model-value="review.rating"
        readonly
        half-increments
        color="amber"
        size="20"
        class="mb-2"
      />

      <!-- Review text -->
      <p class="text-gray-700 whitespace-pre-line">
        {{ review.text }}
      </p>
    </VCardText>
  </VCard>
</template>
