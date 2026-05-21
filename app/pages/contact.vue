<script setup lang="ts">
const { locale } = useTranslations()
const collection = computed(() => locale.value === 'fr' ? 'contact_fr' : 'contact')

const { data: page } = await useAsyncData(`contact-${locale.value}`, () => {
  return queryCollection(collection.value).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title, ogTitle: title, description, ogDescription: description
})

defineOgImage('Portfolio', { title, description })
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :ui="{
        container: 'py-8 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-0',
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        links: 'justify-start'
      }"
    />
    <UPageSection
      :ui="{
        container: 'pt-0! px-4 sm:px-6 lg:px-0'
      }"
    >
      <MDC
        :value="page.content"
        class="prose dark:prose-invert max-w-none
               prose-headings:font-medium prose-headings:tracking-tight
               prose-p:leading-7 prose-p:text-muted"
      />
    </UPageSection>
  </UPage>
</template>
