<script setup lang="ts">
const { locale, t } = useTranslations()
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

const howIWorkLabel = computed(() => t('services.how_i_work'))
const missionTypesLabel = computed(() => t('services.mission_types'))
const targetAudienceLabel = computed(() => t('services.target_audience'))
const resultLabel = computed(() => t('services.result'))
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :ui="{ title: 'mx-0! text-left', description: 'mx-0! text-left', links: 'justify-start' }"
    >
      <template #links>
        <UButton
          v-if="page.links"
          :to="`mailto:${global.email}`"
          v-bind="page.links[0]"
        />
      </template>
    </UPageHero>

    <UPageSection
      v-if="page.intro"
      :ui="{ container: 'pt-0!' }"
    >
      <div class="prose prose-lg max-w-none" v-html="page.intro.replace(/\n/g, '<br>')" />
    </UPageSection>

    <UPageSection
      v-for="(section, index) in page.sections"
      :key="index"
      :ui="{ container: 'pt-0!' }"
    >
      <div class="space-y-6">
        <h2 class="text-2xl font-bold">{{ section.title }}</h2>
        <p class="text-muted">{{ section.description }}</p>
        <ul class="space-y-2">
          <li v-for="item in section.items" :key="item" class="flex items-start gap-2">
            <UIcon name="i-lucide-check" class="text-primary mt-1 flex-shrink-0" />
            <span>{{ item }}</span>
          </li>
        </ul>
        <p v-if="section.note" class="text-sm text-muted italic border-l-2 border-primary pl-4">
          {{ section.note }}
        </p>
      </div>
    </UPageSection>

    <UPageSection
      v-if="page.how_i_work"
      :title="howIWorkLabel"
      :ui="{ container: 'pt-0!' }"
    >
      <div class="prose prose-lg max-w-none" v-html="page.how_i_work.replace(/\n/g, '<br>')" />
    </UPageSection>

    <UPageSection
      v-if="page.mission_types"
      :title="missionTypesLabel"
      :ui="{ container: 'pt-0!' }"
    >
      <div class="grid md:grid-cols-2 gap-4">
        <UPageCard
          v-for="mission in page.mission_types"
          :key="mission.title"
          :title="mission.title"
          :description="mission.description"
          variant="subtle"
        />
      </div>
    </UPageSection>

    <UPageSection
      v-if="page.target_audience"
      :title="targetAudienceLabel"
      :ui="{ container: 'pt-0!' }"
    >
      <div class="prose prose-lg max-w-none" v-html="page.target_audience.replace(/\n/g, '<br>')" />
    </UPageSection>

    <UPageSection
      v-if="page.result"
      :title="resultLabel"
      :ui="{ container: 'pt-0!' }"
    >
      <div class="prose prose-lg max-w-none" v-html="page.result.replace(/\n/g, '<br>')" />
    </UPageSection>
  </UPage>
</template>