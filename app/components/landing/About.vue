<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const props = defineProps<{
  page: IndexCollectionItem
}>()

const route = useRoute()
const isFr = route.path.startsWith('/fr')

const aboutTitle = computed(() => props.page?.about?.title || 'About me')
const aboutDescription = computed(() => props.page?.about?.description || (isFr ? 'Description par défaut' : 'Default description'))
</script>

<template>
  <UPageSection
    :title="aboutTitle"
    :description="aboutDescription"
    :ui="{
      container: 'p-0!',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-3 text-sm sm:text-md lg:text-sm text-muted'
    }"
  />
</template>

<style scoped>

</style>
