<script setup lang="ts">
import type { NuxtError } from '#app'

const { navLinks } = useNavLinks()

const props = defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

const route = useRoute()
const isFr = computed(() => route.path.startsWith('/fr'))

const homePath = computed(() => isFr.value ? '/fr' : '/')
const blogPath = computed(() => isFr.value ? '/fr/blog' : '/blog')

const title = computed(() => {
  if (props.error.statusCode === 404) {
    return isFr.value ? 'Page introuvable' : 'Page not found'
  }

  return isFr.value ? 'Quelque chose a cassé' : 'Something broke'
})

const description = computed(() => {
  if (props.error.statusCode === 404) {
    return isFr.value
      ? 'Cette page n\u2019existe pas ou a ete deplacee.'
      : 'This page does not exist or may have moved.'
  }

  return isFr.value
    ? 'La page n\u2019a pas pu etre chargee correctement.'
    : 'The page could not be loaded correctly.'
})

const homeLabel = computed(() => isFr.value ? 'Retour a l\u2019accueil' : 'Back home')
const blogLabel = computed(() => isFr.value ? 'Lire le blog' : 'Read the blog')

useHead({
  htmlAttrs: {
    lang: isFr.value ? 'fr' : 'en'
  }
})

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
})

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData('navigation', () => {
    return Promise.all([
      queryCollectionNavigation('blog')
    ])
  }, {
    transform: data => data.flat()
  }),
  useLazyAsyncData('search', () => {
    return Promise.all([
      queryCollectionSearchSections('blog')
    ])
  }, {
    server: false,
    transform: data => data.flat()
  })
])
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-0">
    <AppHeader :links="navLinks" />

    <UMain class="min-h-[45vh] px-4 sm:px-6 lg:px-0">
      <section class="py-16 text-left sm:py-20">
        <p class="text-sm font-medium tabular-nums text-primary">
          {{ error.statusCode || 500 }}
        </p>

        <h1 class="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
          {{ title }}
        </h1>

        <p class="mt-4 max-w-xl text-sm leading-7 text-muted">
          {{ description }}
        </p>

        <div class="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <ULink
            :to="homePath"
            class="font-medium text-primary underline-offset-4 hover:underline"
            @click="clearError({ redirect: homePath })"
          >
            {{ homeLabel }}
          </ULink>

          <ULink
            :to="blogPath"
            class="text-muted transition-colors hover:text-primary"
            @click="clearError({ redirect: blogPath })"
          >
            {{ blogLabel }}
          </ULink>
        </div>
      </section>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        shortcut="meta_k"
        :navigation="navigation"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>

    <UToaster />
  </div>
</template>
