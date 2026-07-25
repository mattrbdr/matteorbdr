<script setup lang="ts">
const { locale } = useTranslations()
const collection = computed(() => locale.value === 'fr' ? 'contact_fr' : 'contact')

const { data: page } = await useAsyncData(`contact-${locale.value}`, () => {
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
    <section class="px-4 pt-4 pb-6 sm:px-6 lg:px-0 sm:pt-6 sm:pb-8">
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
        class="prose max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-p:leading-7 prose-p:text-muted"
      />
    </UPageSection>
  </UPage>
</template>
