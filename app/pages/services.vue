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

const serviceIcons: Record<string, string> = {
  'Web Systems Modernization': 'i-lucide-sparkles',
  'Automation & Technology Intelligence': 'i-lucide-zap',
  'Custom Complete Projects': 'i-lucide-rocket',
  'Technical Clarification & Architecture': 'i-lucide-layout-template',
  'Modernisation de systèmes web': 'i-lucide-sparkles',
  'Automatisation et intelligence technologique': 'i-lucide-zap',
  'Projets complets sur mesure': 'i-lucide-rocket',
  'Clarification et architecture technique': 'i-lucide-layout-template'
}
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :ui="{
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
        />
      </template>
    </UPageHero>

    <template v-if="page.sections?.length">
      <UPageSection
        v-for="section in page.sections"
        :key="section.title"
        :ui="{
          container: 'pt-0!',
          title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium'
        }"
      >
        <UPageHeader
          :title="section.title"
          :description="section.description"
          :ui="{
            title: 'text-xl font-semibold mb-2',
            description: 'text-base text-muted mb-4'
          }"
        >
          <template #icon>
            <div class="p-2 rounded-lg bg-primary/10 text-primary">
              <UIcon
                :name="serviceIcons[section.title] || 'i-lucide-wrench'"
                class="size-5"
              />
            </div>
          </template>
        </UPageHeader>

        <div class="grid md:grid-cols-2 gap-6 mt-4">
          <div>
            <ul class="space-y-2">
              <li
                v-for="item in section.items"
                :key="item"
                class="flex items-start gap-2 text-sm"
              >
                <UIcon
                  name="i-lucide-check"
                  class="text-primary mt-0.5 flex-shrink-0 size-4"
                />
                <span class="text-muted">{{ item }}</span>
              </li>
            </ul>
          </div>
          <div
            v-if="section.note"
            class="md:text-right"
          >
            <p class="text-sm text-muted italic">
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
      <div class="flex flex-wrap gap-3 justify-center">
        <UButton
          v-for="link in page.links.slice(1)"
          :key="link.label"
          size="sm"
          v-bind="link"
        />
      </div>
    </UPageSection>
  </UPage>
</template>
