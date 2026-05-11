<script setup lang="ts">
const route = useRoute()
const locale = useState('locale')

const switchLocale = () => {
  const currentLang = route.path.startsWith('/fr') ? 'fr' : 'en'
  const newLang = currentLang === 'en' ? 'fr' : 'en'
  
  if (newLang === 'fr') {
    navigateTo(`/fr${route.path === '/' ? '' : route.path}`)
  } else {
    const newPath = route.path.replace(/^\/fr/, '')
    navigateTo(newPath || '/')
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
      @click="switchLocale"
    />
    <template #fallback>
      <div class="size-4" />
    </template>
  </ClientOnly>
</template>