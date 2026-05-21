<script setup lang="ts">
const { locale } = useTranslations()
const collection = computed(() => locale.value === 'fr' ? 'about_fr' : 'about')

const { data: page } = await useAsyncData(`about-${locale.value}`, () => {
  return queryCollection(collection.value).first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImage('Portfolio', { title, description })
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      orientation="horizontal"
      :ui="{
        container: 'py-8 sm:py-12 lg:py-14 lg:flex sm:flex-row items-center gap-8',
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        links: 'justify-start'
      }"
    >
      <img
        src="/mattrbdr2.webp"
        alt="Mattéo"
        class="size-28 rounded-md object-cover grayscale sm:size-32"
      >
    </UPageHero>
    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <MDC
        :value="page.content"
        unwrap="p"
        class="max-w-2xl text-sm sm:text-base leading-8 text-muted"
      />
      <div class="grid grid-cols-2 gap-3 py-10 sm:flex sm:flex-row sm:justify-start sm:gap-4">
        <PolaroidItem
          v-for="(image, index) in page.images"
          :key="index"
          :image="image"
          :index
        />
      </div>
    </UPageSection>
  </UPage>
</template>
