<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

const route = useRoute()
const isFr = route.path.startsWith('/fr')

const formatYear = (date: string | Date) => {
  const match = String(date).match(/\d{4}/)
  return match?.[0] || String(date)
}

const formatRole = (position: string) => {
  const normalized = position.toLowerCase()

  if (normalized.includes('openvalue') || normalized.includes('architect')) {
    return isFr ? 'créateur' : 'creator'
  }

  if (normalized.includes('founder') || normalized.includes('fondateur')) {
    return isFr ? 'fondateur' : 'founder'
  }

  if (normalized.includes('seizart') || normalized.includes('advisor') || normalized.includes('conseiller')) {
    return isFr ? 'conseiller' : 'business advisor'
  }

  return position
    .replace(/\s+(at|chez)$/i, '')
    .trim()
    .toLowerCase()
}
</script>

<template>
  <UPageSection
    :title="page.experience.title"
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
          v-for="(experience, index) in page.experience.items"
          :key="index"
          class="grid grid-cols-[3.25rem_minmax(0,1fr)] items-baseline gap-2 text-left text-sm sm:grid-cols-[3.75rem_minmax(0,1fr)]"
        >
          <span class="font-medium tabular-nums text-muted">
            {{ formatYear(experience.date) }}
          </span>
          <p class="min-w-0 max-w-full text-wrap break-words leading-6 text-foreground">
            {{ formatRole(experience.position) }}
            <span class="font-semibold text-foreground"> · </span>
            <a
              v-if="experience.company.url && experience.company.url !== '#'"
              :href="experience.company.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted transition-colors hover:text-primary"
            >
              {{ experience.company.name }}
            </a>
            <span
              v-else
              class="text-muted"
            >
              {{ experience.company.name }}
            </span>
          </p>
        </div>
      </div>
    </template>
  </UPageSection>
</template>
