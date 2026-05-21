<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const { footer, global } = useAppConfig()
const { t } = useTranslations()

defineProps<{
  page: IndexCollectionItem
}>()

const availabilityLabel = computed(() => {
  return global.available ? t('availability.available') : t('availability.unavailable')
})
</script>

<template>
  <section class="w-full px-4 pb-12 pt-4 text-left sm:px-6 lg:px-0">
    <div class="space-y-4">
      <p class="text-xl font-medium leading-7 text-foreground sm:text-xl lg:text-2xl">
        {{ page.title }}
      </p>

      <p class="text-sm leading-7 text-muted sm:text-md lg:text-sm">
        {{ page.description }}
      </p>

      <div class="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-sm leading-6">
        <ULink
          v-if="page.hero.links && page.hero.links[0]"
          :to="page.hero.links[0].to"
          :target="page.hero.links[0].target"
          class="font-medium text-primary underline-offset-4 hover:underline"
        >
          {{ page.hero.links[0].label }}
        </ULink>

        <ULink
          v-if="global.available"
          :to="global.meetingLink"
          class="text-muted transition-colors hover:text-primary"
        >
          {{ availabilityLabel }}
        </ULink>

        <ULink
          v-for="(link, index) of footer?.links"
          :key="index"
          :to="link.to"
          :target="link.target"
          :aria-label="link['aria-label']"
          class="text-muted transition-colors hover:text-primary"
        >
          {{ link['aria-label'] }}
        </ULink>
      </div>
    </div>
  </section>
</template>
