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

useSeoMeta({
  title: 'Mattéo — Developer & Web Architect',
  ogTitle: 'Mattéo — Developer & Web Architect',
  description: 'I help simplify, modernize and optimize web systems, turning ideas and existing products into reliable, effective solutions. For consults, audits and custom builds.',
  ogDescription: 'I help simplify, modernize and optimize web systems, turning ideas and existing products into reliable, effective solutions. For consults, audits and custom builds.',
  ogImage: '/og-image.png'
})
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page />
    <UPageSection
      :ui="{
        container: 'pt-0! px-0 lg:grid lg:grid-cols-2 lg:gap-8',
        wrapper: 'px-4 sm:px-6 lg:px-0'
      }"
    >
      <LandingAbout :page />
      <LandingWorkExperience :page />
    </UPageSection>
    <LandingBlog :page />
    <LandingTestimonials :page />
    <LandingFAQ :page />
  </UPage>
</template>
