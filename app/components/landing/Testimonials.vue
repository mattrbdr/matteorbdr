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
        dots: 'mt-8 gap-2'
      }"
    >
      <div class="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div class="relative rounded-xl border border-default/5 bg-elevated/30 p-6 sm:p-8 lg:p-10">
          <svg
            class="absolute top-4 left-4 sm:top-6 sm:left-6 w-8 h-8 sm:w-10 sm:h-10 text-dimmed/30"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
          </svg>
          <p class="text-sm sm:text-base lg:text-lg leading-relaxed text-pretty mt-4 sm:mt-6">
            {{ item.quote }}
          </p>
          <div class="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-default/5">
            <p class="text-sm font-medium">
              {{ item.author.name }}
            </p>
            <p
              v-if="item.author.description"
              class="text-xs text-muted mt-0.5"
            >
              {{ item.author.description }}
            </p>
          </div>
        </div>
      </div>
    </UCarousel>
  </UPageSection>
</template>
