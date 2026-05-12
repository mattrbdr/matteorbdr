<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    :title="page.experience.title"
    :ui="{
      container: 'p-0! gap-4 sm:gap-4',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'mt-2'
    }"
  >
    <template #description>
      <div class="flex flex-col divide-y divide-muted/30">
        <Motion
          v-for="(experience, index) in page.experience.items"
          :key="index"
          :initial="{ opacity: 0, transform: 'translateY(20px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.4 + 0.2 * index }"
          :in-view-options="{ once: true }"
          class="group py-3"
        >
          <div class="flex flex-col gap-1 text-left">
            <span class="text-xs text-muted">{{ experience.date }}</span>
            <span class="text-sm text-muted">{{ experience.position }} <span class="text-foreground">{{ experience.company.name }}</span></span>
          </div>
        </Motion>
      </div>
    </template>
  </UPageSection>
</template>

<style scoped>
.group :deep(span.text-foreground) {
  transition: opacity 0.2s;
}
.group:hover :deep(span.text-foreground) {
  opacity: 0.6;
}
</style>
