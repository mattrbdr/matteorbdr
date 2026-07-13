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
    <section class="px-4 pt-12 pb-6 sm:px-6 lg:px-0 sm:pt-16 sm:pb-8">
      <div class="max-w-xl space-y-3">
        <h1 class="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          {{ page.title }}
        </h1>
        <p
          v-if="page.description"
          class="text-sm leading-6 text-muted sm:text-base"
        >
          {{ page.description }}
        </p>
      </div>
    </section>
    <UPageSection
      :ui="{
        container: 'pt-0! px-4 sm:px-6 lg:px-0'
      }"
    >
      <MDC
        :value="page.content"
        class="prose max-w-none
               prose-headings:font-medium prose-headings:tracking-tight
               prose-p:leading-7 prose-p:text-muted"
      />
    </UPageSection>
  </UPage>
</template>
