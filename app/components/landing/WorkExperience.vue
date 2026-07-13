<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const props = defineProps<{
  page: IndexCollectionItem
}>()

const sortedExperiences = computed(() => {
  if (!props.page.experience?.items) return []
  const items = [...props.page.experience.items]
  items.sort((a, b) => {
    const yearA = parseInt(String(a.date).match(/\d{4}/)?.[0] || '0')
    const yearB = parseInt(String(b.date).match(/\d{4}/)?.[0] || '0')
    return yearA - yearB
  })
  return items
})

const formatYear = (date: string | Date) => {
  const match = String(date).match(/\d{4}/)
  return match?.[0] || String(date)
}
</script>

<template>
  <UPageSection
    :title="props.page.experience?.title"
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
          v-for="(experience, index) in sortedExperiences"
          :key="index"
          class="grid grid-cols-[3.25rem_minmax(0,1fr)] items-baseline gap-2 text-left text-sm sm:grid-cols-[3.75rem_minmax(0,1fr)]"
        >
          <span class="font-medium tabular-nums text-muted">
            {{ formatYear(experience.date) }}
          </span>
          <p class="min-w-0 max-w-full text-wrap break-words leading-6 text-foreground">
            {{ experience.position }}
            <template v-if="experience.company.url && experience.company.url !== '#'">
              <span class="font-semibold text-foreground"> · </span>
              <a
                :href="experience.company.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted transition-colors hover:text-primary"
              >
                {{ experience.company.name }}
              </a>
            </template>
            <template v-else>
              <span class="font-semibold text-foreground"> · </span>
              <span class="text-muted">
                {{ experience.company.name }}
              </span>
            </template>
          </p>
        </div>
      </div>
    </template>
  </UPageSection>
</template>
