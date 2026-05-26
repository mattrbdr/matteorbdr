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
        <ULink
          :to="global.meetingLink"
          class="mt-8 inline-block font-medium text-primary underline-offset-4 hover:underline"
        >
          {{ page.links?.[0]?.label || (isFr ? 'Discutons' : "Let's talk") }}
        </ULink>
      </div>
    </section>

    <section class="mt-20 px-4 sm:px-6 lg:px-0 sm:mt-28">
      <div class="space-y-12">
        <article
          v-for="offering in page.offerings"
          :key="offering.title"
          class="rounded-xl border border-default/5 bg-elevated/10 p-6 sm:p-8"
        >
          <span class="text-xs font-medium text-muted">
            {{ offering.subtitle }}
          </span>

          <h2 class="mt-1.5 font-serif text-2xl leading-tight text-foreground">
            {{ offering.title }}
          </h2>

          <div class="mt-8 grid gap-6 lg:grid-cols-2">
            <p class="text-sm leading-6 text-muted">
              {{ offering.description }}
            </p>

            <div class="rounded-lg border border-default/10 bg-elevated/20 px-4 py-3">
              <div class="text-sm font-medium text-foreground">
                {{ offering.pricing }}
              </div>
              <p
                v-if="offering.good_for"
                class="mt-1 text-xs text-muted/60 leading-5"
              >
                {{ offering.good_for }}
              </p>
            </div>
          </div>

          <UAccordion
            :items="offering.items"
            type="multiple"
            :unmount-on-hide="false"
            class="mt-8"
            :ui="{
              item: 'border-0 border-b border-default/10 last:border-b-0',
              trigger: 'py-2.5 text-sm text-muted hover:text-foreground transition-colors font-normal',
              body: 'text-sm text-muted/70 pb-4 leading-6',
              trailingIcon: 'size-4 text-muted/40 group-data-[state=open]:text-muted/70'
            }"
          >
            <template #body="{ item }">
              {{ item.content }}
            </template>
          </UAccordion>
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
