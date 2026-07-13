<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <section class="w-full px-4 pt-4 text-left sm:px-6 lg:px-0">
    <div class="max-w-xl space-y-3 whitespace-pre-line text-balance">
      <p class="text-base leading-relaxed text-foreground sm:text-base lg:text-lg">
        {{ page.title }}
      </p>
    </div>
  </section>
</template>
