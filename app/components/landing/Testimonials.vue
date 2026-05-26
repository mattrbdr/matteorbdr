<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    :ui="{
      container: 'px-4 sm:px-6 lg:px-0 pt-0!'
    }"
  >
    <UCarousel
      v-slot="{ item }"
      :items="page.testimonials"
      :autoplay="{ delay: 5000 }"
      loop
      dots
      class="mt-8"
      :ui="{
        viewport: '-mx-4 sm:-mx-6 lg:-mx-0',
        item: 'basis-full',
        dots: 'mt-10 gap-2'
      }"
    >
      <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center">
        <p class="relative text-base sm:text-lg leading-relaxed text-pretty before:content-[open-quote] before:text-5xl sm:before:text-6xl before:leading-none before:text-dimmed/20 before:block before:mb-4">
          {{ item.quote }}
        </p>
        <div class="mt-8">
          <p class="text-sm font-medium">
            {{ item.author.name }}
          </p>
          <p
            v-if="item.author.description"
            class="text-xs text-muted mt-1"
          >
            {{ item.author.description }}
          </p>
        </div>
      </div>
    </UCarousel>
  </UPageSection>
</template>
