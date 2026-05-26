<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const props = defineProps<{
  page: IndexCollectionItem
}>()

const route = useRoute()
const isFr = route.path.startsWith('/fr')

const aboutTitle = computed(() => props.page?.about?.title || 'About me')
const aboutDescription = computed(() => props.page?.about?.description || (isFr ? 'Description par défaut' : 'Default description'))
const musicLabel = computed(() => isFr ? 'Écouter ma playlist Apple Music' : 'Listen to my Apple Music playlist')
const musicUrl = 'https://music.apple.com/fr/playlist/not-today/pl.u-Ymb0ELgtg8ygdyq?l=en'
</script>

<template>
  <div>
    <UPageSection
      :title="aboutTitle"
      :description="aboutDescription"
      :ui="{
        container: 'p-0!',
        wrapper: 'px-0!',
        title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
        description: 'text-left mt-3 text-sm sm:text-md lg:text-sm text-muted whitespace-pre-line'
      }"
    />
    <a
      :href="musicUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-1.5 mt-4 text-xs text-muted hover:text-primary transition-colors"
    >
      {{ musicLabel }}
      <svg
        class="w-3 h-3"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line
          x1="10"
          y1="14"
          x2="21"
          y2="3"
        />
      </svg>
    </a>
  </div>
</template>
