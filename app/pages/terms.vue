<script setup lang="ts">
const { locale } = useTranslations()
const collection = computed(() => locale.value === 'fr' ? 'legal_fr' : 'legal')

const { data: page } = await useAsyncData(`legal-${locale.value}`, () => {
  return queryCollection(collection.value).first()
})

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title, ogTitle: title, description, ogDescription: description
})

defineOgImage('Portfolio', { title, description })
</script>

<template>
  <div
    v-if="!page"
    class="px-4 py-12 text-center text-sm text-muted"
  >
    Loading…
  </div>
  <UPage v-else>
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
        class="prose max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-7 prose-p:text-muted"
      />
    </UPageSection>
  </UPage>
</template>
