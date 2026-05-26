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
    <div class="relative mt-8">
      <div class="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-[var(--ui-bg)] to-transparent" />
      <div class="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 bg-gradient-to-r to-[var(--ui-bg)] from-transparent" />
      <UCarousel
        v-slot="{ item }"
        :items="page.testimonials"
        :autoplay="{ delay: 5000 }"
        loop
        dots
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
    </div>
  </UPageSection>
</template>
