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
      fade
      class="mt-8"
      :ui="{
        item: 'basis-full',
        dots: 'mt-8 gap-2'
      }"
    >
      <div class="h-full">
        <div class="flex flex-col h-full rounded-xl border border-default/5 bg-elevated/60 p-6 sm:p-8">
          <p class="text-sm leading-relaxed text-pretty grow">
            {{ item.quote }}
          </p>
          <div class="mt-6 pt-4 border-t border-default/5">
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
