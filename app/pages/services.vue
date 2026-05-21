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
const isFr = locale.value === 'fr'

const emailLink = computed(() => page.value?.links?.[1]?.to || 'mailto:matteorbdr@icloud.com')
const emailLabel = computed(() => {
  if (page.value?.links?.[1]?.label) return page.value.links[1].label
  return isFr ? 'M\'écrire' : 'Email me'
})
</script>

<template>
  <UPage v-if="page">
    <section class="px-4 pt-8 sm:px-6 lg:px-0 lg:pt-12">
      <div class="space-y-4">
        <p class="whitespace-pre-line text-balance text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl font-serif">
          {{ page.hero_tagline }}
        </p>
        <p class="mt-6 text-balance leading-7 text-muted sm:text-base">
          {{ page.hero_text }}
        </p>
        <UButton
          :to="global.meetingLink"
          size="lg"
          class="mt-8"
        >
          {{ page.links?.[0]?.label || (isFr ? 'Discutons' : "Let's talk") }}
        </UButton>
      </div>
    </section>

    <section class="mt-20 space-y-6 px-4 sm:px-6 lg:px-0 sm:mt-28">
      <UCard
        v-for="offering in page.offerings"
        :key="offering.title"
        variant="soft"
      >
        <template #header>
          <span class="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {{ offering.subtitle }}
          </span>
        </template>

        <template #title>
          {{ offering.title }}
        </template>

        <p class="text-sm leading-6 text-muted">
          {{ offering.description }}
        </p>

        <ul class="mt-6 space-y-2">
          <li
            v-for="item in offering.items"
            :key="item"
            class="flex items-start gap-2 text-sm leading-6 text-muted"
          >
            <span class="mt-[7px] inline-block size-1 shrink-0 rounded-full bg-foreground/30" />
            {{ item }}
          </li>
        </ul>

        <div class="mt-6 flex items-center gap-1.5 text-xs text-muted">
          <span class="i-lucide-info size-3.5 shrink-0" />
          {{ offering.good_for }}
        </div>

        <template #footer>
          <div class="text-sm font-medium text-foreground">
            {{ offering.pricing }}
          </div>
        </template>
      </UCard>
    </section>

    <section class="mt-16 rounded-xl border border-default/50 bg-elevated/30 px-6 py-8 sm:px-8 lg:px-0">
      <div class="flex items-start gap-3">
        <span class="i-lucide-sparkles mt-0.5 size-5 shrink-0 text-primary" />
        <p class="text-sm leading-7 text-muted">
          {{ page.ai_note }}
        </p>
      </div>
    </section>

    <section class="mt-16 border-t border-default/50 px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-0">
      <p class="text-balance text-lg leading-7 text-foreground sm:text-xl">
        {{ page.cta_bottom_text }}
      </p>
      <UButton
        :to="emailLink"
        variant="outline"
        size="lg"
        class="mt-6"
      >
        {{ emailLabel }}
      </UButton>
    </section>
  </UPage>
</template>
