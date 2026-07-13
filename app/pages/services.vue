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

const faqTitle = isFr ? 'Questions fréquentes' : 'Common questions'

const emailLink = computed(() => page.value?.links?.[1]?.to || 'mailto:matteorbdr@icloud.com')
const emailLabel = computed(() => {
  if (page.value?.links?.[1]?.label) return page.value.links[1].label
  return isFr ? 'M\'écrire' : 'Email me'
})
</script>

<template>
  <UPage v-if="page">
    <section class="px-4 pt-12 pb-6 sm:px-6 lg:px-0 sm:pt-16 sm:pb-8">
      <div class="max-w-xl space-y-3">
        <h1 class="whitespace-pre-line text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          {{ page.hero_tagline }}
        </h1>
        <p
          v-if="page.hero_text"
          class="text-sm leading-6 text-muted sm:text-base"
        >
          {{ page.hero_text }}
        </p>
        <ULink
          :to="global.meetingLink"
          class="inline-block text-sm font-medium text-primary underline-offset-4 hover:underline pt-2"
        >
          {{ page.links?.[0]?.label || (isFr ? 'Discutons' : "Let's talk") }}
        </ULink>
      </div>
    </section>

    <section class="mt-12 px-4 sm:px-6 lg:px-0">
      <div class="space-y-8">
        <article
          v-for="offering in page.offerings"
          :key="offering.title"
          class="rounded-xl border border-default/5 bg-elevated/10 p-6 sm:p-8"
        >
          <span class="text-xs font-medium text-muted">
            {{ offering.subtitle }}
          </span>

          <h2 class="mt-1.5 text-2xl leading-tight text-foreground">
            {{ offering.title }}
          </h2>

          <p class="mt-3 text-sm leading-6 text-muted">
            {{ offering.description }}
          </p>

          <div
            v-if="offering.pricing"
            class="mt-4 rounded-lg border border-default/10 bg-elevated/20 px-4 py-3"
          >
            <div class="text-sm font-medium text-foreground">
              {{ offering.pricing }}
            </div>
          </div>

          <div
            v-if="offering.items?.length"
            class="sr-only"
          >
            <ul>
              <li
                v-for="item in offering.items"
                :key="item.label"
              >
                {{ item.label }}: {{ item.content }}
              </li>
            </ul>
          </div>
          <p
            v-if="offering.good_for"
            class="sr-only"
          >
            {{ offering.good_for }}
          </p>
        </article>
      </div>
    </section>

    <section class="mt-16 rounded-xl border border-default/50 bg-elevated/30 px-6 py-8 sm:px-8 lg:px-0">
      <div class="flex items-start gap-3">
        <span class="i-lucide-sparkles mt-0.5 size-5 shrink-0 text-primary" />
        <p class="text-sm leading-7 text-muted">
          {{ page.ai_note }}
        </p>
      </div>
    </section>

    <section
      v-if="page.faq?.length"
      class="mt-16 px-4 sm:px-6 lg:px-0"
    >
      <h2 class="text-xl font-medium text-foreground mb-6 lg:text-2xl">
        {{ faqTitle }}
      </h2>
      <UAccordion
        :items="page.faq"
        :ui="{
          item: 'border-b border-default/10 last:border-b-0',
          trigger: 'py-3 text-sm text-muted hover:text-foreground transition-colors font-normal',
          body: 'text-sm text-muted/70 pb-4 leading-6',
          trailingIcon: 'size-4 text-muted/40 group-data-[state=open]:text-muted/70'
        }"
      >
        <template #body="{ item }">
          {{ item.content }}
        </template>
      </UAccordion>
    </section>

    <section class="mt-16 border-t border-default/50 px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-0">
      <p class="text-balance text-lg leading-7 text-foreground sm:text-xl">
        {{ page.cta_bottom_text }}
      </p>
      <ULink
        :to="emailLink"
        class="mt-6 inline-block font-medium text-primary underline-offset-4 hover:underline"
      >
        {{ emailLabel }}
      </ULink>
    </section>
  </UPage>
</template>
