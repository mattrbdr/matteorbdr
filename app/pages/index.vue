<script setup lang="ts">
const { locale } = useTranslations()
const collection = computed(() => locale.value === 'fr' ? 'index_fr' : 'index')

const { data: page } = await useAsyncData(`index-${locale.value}`, () => {
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
  title, ogTitle: title, description, ogDescription: description,
  ogImage: '/og-image.png'
})
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page />
    <section class="px-4 sm:px-6 lg:px-0">
      <div class="grid gap-10 lg:grid-cols-2">
        <LandingAbout :page />
        <LandingWorkExperience :page />
      </div>
    </section>
    <section class="px-4 sm:px-6 lg:px-0">
      <LandingBlog :page />
    </section>
    <LandingTestimonials :page />
    <section class="px-4 sm:px-6 lg:px-0">
      <LandingFAQ :page />
    </section>
  </UPage>
</template>
