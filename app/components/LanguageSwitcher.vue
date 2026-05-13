<script setup lang="ts">
const route = useRoute()

const toggleLocale = () => {
  const currentPath = route.path
  if (currentPath.startsWith('/fr')) {
    navigateTo(currentPath.replace(/^\/fr/, '') || '/')
  } else {
    navigateTo(`/fr${currentPath}`)
  }
}
</script>

<template>
  <ClientOnly>
    <UButton
      aria-label="Switch language"
      :label="route.path.startsWith('/fr') ? 'EN' : 'FR'"
      color="neutral"
      variant="ghost"
      size="sm"
      class="rounded-full text-xs font-medium"
      @click="toggleLocale"
    />
    <template #fallback>
      <div class="size-4" />
    </template>
  </ClientOnly>
</template>