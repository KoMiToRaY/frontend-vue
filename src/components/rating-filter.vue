<script setup lang="ts">
const ratingFilterItems = [
  { title: `all restaurants`, value: 0 },
  { title: `5 stars`, value: 5 },
  { title: `4 stars or more`, value: 4 },
  { title: `3 stars or more`, value: 3 },
  { title: `2 stars or more`, value: 2 },
  { title: `1 star or more`, value: 1 },
];

const modelValue = defineModel<number>({ default: 0 });
</script>

<template>
  <VCard variant="outlined">
    <VCardText>
      <div class="flex flex-wrap items-center justify-between gap-8">
        <strong>Filter the restaurants by ratings</strong>
        <VSelect
          v-model="modelValue"
          :items="ratingFilterItems"
          item-title="title"
          item-value="value"
          variant="solo"
          hide-details="auto"
          density="comfortable"
          class="max-w-[220px]"
        />
      </div>
    </VCardText>
  </VCard>
</template>
