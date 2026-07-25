<script setup lang="ts">
const { navLinks } = useNavLinks()

const {
  app: { baseURL }
} = useRuntimeConfig()

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: 'white' },
    {
      name: 'google-site-verification',
      content: 'wnmiyGVdyjMSM2G-RkwwStqdIrQ3c5HxkLtG58xaenk'
    }
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: `${baseURL}favicon.ico` }]
})

useSeoMeta({
  titleTemplate: '%s - Portfolio',
  twitterCard: 'summary_large_image'
})

const { data: files } = useLazyAsyncData('search-files', () =>
  Promise.all([queryCollectionSearchSections('blog')]).then(data =>
    data.flat()
  )
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
