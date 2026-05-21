<script setup lang="ts">
const { locale } = useTranslations()
const collection = computed(() => locale.value === 'fr' ? 'services_fr' : 'services')

const { data: page } = await useAsyncData(`services-${locale.value}`, () => {
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

const { global } = useAppConfig()
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :ui="{
        container: 'py-8 sm:py-12 lg:py-14',
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        links: 'justify-start'
      }"
    >
      <template #links>
        <UButton
          v-if="page.links"
          :to="global.meetingLink"
          v-bind="page.links[0]"
          variant="link"
          class="px-0"
        />
      </template>
    </UPageHero>

    <template v-if="page.sections?.length">
      <UPageSection
        v-for="section in page.sections"
        :key="section.title"
        :ui="{
          container: 'pt-0! gap-4',
          title: 'text-left text-lg sm:text-xl font-medium'
        }"
      >
        <UPageHeader
          :title="section.title"
          :description="section.description"
          :ui="{
            root: 'border-t border-default/50 pt-5',
            title: 'text-lg font-medium mb-2',
            description: 'text-sm sm:text-base leading-7 text-muted mb-4'
          }"
        />

        <div class="grid gap-4 md:grid-cols-[1fr_16rem] md:gap-8">
          <div>
            <ul class="space-y-2.5">
              <li
                v-for="item in section.items"
                :key="item"
                class="text-sm leading-7 text-muted"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div
            v-if="section.note"
            class="md:text-right"
          >
            <p class="text-sm leading-7 text-muted">
              {{ section.note }}
            </p>
          </div>
        </div>
      </UPageSection>
    </template>

    <UPageSection
      v-if="page.links?.length > 1"
      :ui="{ container: 'pt-4!' }"
    >
      <div class="flex flex-wrap gap-3">
        <UButton
          v-for="link in page.links.slice(1)"
          :key="link.label"
          size="sm"
          v-bind="link"
          variant="link"
          class="px-0"
        />
      </div>
    </UPageSection>
  </UPage>
</template>
