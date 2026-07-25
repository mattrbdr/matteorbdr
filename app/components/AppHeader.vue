<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const props = defineProps<{
  links: NavigationMenuItem[]
}>()

const { t } = useTranslations()
const route = useRoute()

const translatedLinks = computed(() => {
  return (
    props?.links?.map((link) => {
      // If the path starts with /fr, prefix the link's `to` path with `/fr`
      const toPath = route.path.startsWith('/fr')
        ? `/fr${link.to === '/' ? '' : link.to}`
        : link.to

      return {
        ...link,
        to: toPath || '/',
        label: link.label ? t(link.label as string) : link.label
      }
    }) || []
  )
})
</script>

<template>
  <header
    class="w-full flex flex-col gap-5 pb-4 mb-4 select-none px-4 sm:px-6 lg:px-0"
  >
    <!-- Brand Name and Toggles -->
    <div class="flex items-center justify-between w-full">
      <NuxtLink
        :to="route.path.startsWith('/fr') ? '/fr' : '/'"
        class="text-sm font-semibold text-foreground transition-opacity hover:opacity-85"
      >
        Mattéo
      </NuxtLink>

      <!-- Right-aligned clean controls -->
      <div class="flex items-center gap-1">
        <LanguageSwitcher />
      </div>
    </div>

    <!-- Navigation links -->
    <nav class="flex flex-wrap gap-x-6 gap-y-2 text-sm">
      <NuxtLink
        v-for="(link, index) in translatedLinks"
        :key="index"
        :to="link.to"
        class="font-semibold transition-colors text-neutral-500 hover:text-primary lowercase"
        active-class="!font-bold !text-primary"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </header>
</template>
