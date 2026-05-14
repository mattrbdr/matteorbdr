<script setup lang="ts">
const colorMode = useColorMode()
const { navLinks } = useNavLinks()

const color = computed(() =>
  colorMode.value === 'dark' ? '#020618' : 'white'
)

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [{ rel: 'icon', href: '/favicon.ico' }]
})

useSeoMeta({
  titleTemplate: '%s - Portfolio',
  twitterCard: 'summary_large_image'
})

const { data: files } = useLazyAsyncData('search-files', () =>
  Promise.all([queryCollectionSearchSections('blog')]).then(data => data.flat())
)

const { data: navigation } = useLazyAsyncData('search-nav', () =>
  Promise.all([queryCollectionNavigation('blog')]).then(data => data.flat())
)
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
      </UMain>
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        v-if="files && navigation"
        :files="files"
        :navigation="navigation"
        shortcut="meta_k"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
