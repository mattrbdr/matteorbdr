<script setup lang="ts">
defineProps<{
  image: {
    src: string
    alt: string
  }
  index: number
}>()
</script>

<template>
  <div
    class="flex flex-col gap-2"
  >
    <img
      :src="image.src"
      :alt="image.alt"
      class="aspect-square w-full max-w-36 rounded-md object-cover grayscale transition duration-300 hover:grayscale-0 sm:w-32"
    >
    <span class="text-xs text-muted">
      {{ image.alt }}
    </span>
  </div>
</template>
