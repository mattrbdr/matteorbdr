<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    :title="page.certifications.title"
    :ui="{
      container: 'p-0! gap-4 sm:gap-4',
      wrapper: 'px-0!',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'mt-2'
    }"
  >
    <template #description>
      <div class="space-y-2.5">
        <div
          v-for="(cert, index) in page.certifications.items"
          :key="index"
          class="grid grid-cols-[4rem_minmax(0,1fr)] items-baseline gap-2 text-left text-sm sm:grid-cols-[5rem_minmax(0,1fr)]"
        >
          <span class="font-medium tabular-nums text-muted whitespace-nowrap">
            {{ cert.date }}
          </span>
          <p class="min-w-0 max-w-full text-wrap break-words leading-6 text-foreground">
            <span class="font-medium text-foreground">
              {{ cert.title }}
            </span>
            <span class="font-semibold text-foreground"> · </span>
            <span class="text-muted">
              {{ cert.issuer.name }}
            </span>
          </p>
        </div>
      </div>
    </template>
  </UPageSection>
</template>
