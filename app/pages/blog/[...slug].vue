<script setup lang="ts">
const { locale, t } = useTranslations()
const collection = computed(() => locale.value === 'fr' ? 'blog_fr' : 'blog')
const isFr = computed(() => locale.value === 'fr')

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () =>
  queryCollection(collection.value).path(route.path).first()
)
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })

const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings(collection.value, route.path, {
    fields: ['description']
  })
)

const title = computed(() => page.value?.seo?.title || page.value?.title || '')
const description = computed(() => page.value?.seo?.description || page.value?.description || '')

useSeoMeta({
  title: title.value,
  description: description.value,
  ogDescription: description.value,
  ogTitle: title.value
})

if (page.value?.image) {
  useSeoMeta({ ogImage: page.value.image })
} else {
  defineOgImage('Portfolio', {
    title: title.value,
    description: description.value,
    headline: 'Blog'
  })
}

const articleUrl = ref('')

onMounted(() => {
  articleUrl.value = window.location.href
})

const formatDate = (dateString: string | Date) => {
  return new Date(dateString).toLocaleDateString(isFr.value ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const backLabel = computed(() => t('back_to_blog'))
const categoryLabel = computed(() => page.value?.category || t('article'))
const minLabel = computed(() => t('min_read'))
</script>

<template>
  <UMain class="mt-10">
    <UContainer class="max-w-3xl">
      <ULink
        to="/blog"
        class="inline-flex items-center gap-1 text-sm text-muted hover:text-primary transition-colors mb-6"
      >
        <UIcon name="lucide:chevron-left" />
        {{ backLabel }}
      </ULink>

      <div class="mb-8">
        <div class="flex flex-wrap items-center gap-3 text-xs text-muted mb-4">
          <span
            v-if="categoryLabel"
            class="text-primary"
          >
            {{ categoryLabel }}
          </span>
          <span v-if="page?.date">
            {{ formatDate(page.date) }}
          </span>
          <span v-if="page?.minRead">
            {{ page.minRead }} {{ minLabel }}
          </span>
        </div>

        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-foreground mb-4 leading-tight text-left">
          {{ page?.title }}
        </h1>

        <p class="text-base sm:text-lg text-muted leading-8 text-left">
          {{ page?.description }}
        </p>
      </div>

      <img
        v-if="page?.image"
        :src="page.image"
        :alt="page.title || ''"
        class="w-full h-[260px] sm:h-[360px] object-cover object-center rounded-md mb-12 grayscale"
      >

      <div>
        <ContentRenderer
          v-if="page?.body"
          :value="page"
      class="prose max-w-none
             prose-headings:font-medium prose-headings:tracking-tight
                 prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                 prose-p:leading-8 prose-img:rounded-md prose-img:shadow-none"
        />
      </div>

      <div class="border-t border-default/50 pt-8 mt-12 mb-8">
        <BlogShareButtons
          :title="page?.title || ''"
          :url="articleUrl"
        />
      </div>

      <div class="border-t border-default/50 pt-8 pb-16">
        <div class="flex items-center gap-3">
          <img
            v-if="page?.author?.avatar"
            :src="typeof page.author.avatar === 'string' ? page.author.avatar : page.author.avatar.src"
            :alt="typeof page.author.avatar === 'string' ? page.author.name : page.author.avatar.alt"
            class="size-10 rounded-full object-cover shrink-0"
          >
          <div>
            <p class="text-sm font-medium">
              {{ page?.author?.name }}
            </p>
            <p
              v-if="page?.author?.description"
              class="text-xs text-muted"
            >
              {{ page.author.description }}
            </p>
          </div>
        </div>
      </div>

      <UContentSurround
        v-if="surround?.length"
        :surround="surround"
      />
    </UContainer>
  </UMain>
</template>
