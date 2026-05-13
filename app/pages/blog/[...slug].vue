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
  <UMain class="mt-20">
    <UContainer class="max-w-3xl mx-auto">
      <ULink
        to="/blog"
        class="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors mb-6"
      >
        <UIcon name="lucide:chevron-left" />
        {{ backLabel }}
      </ULink>

      <div class="text-center mb-8">
        <div class="flex items-center justify-center gap-2 text-sm text-muted mb-4">
          <span
            v-if="categoryLabel"
            class="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
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

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4 leading-tight">
          {{ page?.title }}
        </h1>

        <p class="text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
          {{ page?.description }}
        </p>
      </div>

      <img
        v-if="page?.image"
        :src="page.image"
        :alt="page.title || ''"
        class="w-full h-[400px] sm:h-[500px] object-cover object-center rounded-xl mb-12"
      />

      <div>
        <ContentRenderer
          v-if="page?.body"
          :value="page"
          class="prose prose-lg dark:prose-invert max-w-none
                 prose-headings:font-semibold prose-headings:tracking-tight
                 prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                 prose-img:rounded-xl prose-img:shadow-lg"
        />
      </div>

      <div class="border-t border-[var(--ui-border)] pt-8 mt-12 mb-8">
        <BlogShareButtons
          :title="page?.title || ''"
          :url="articleUrl"
        />
      </div>

      <div class="border-t border-[var(--ui-border)] pt-8 pb-16">
        <div class="flex items-center justify-center gap-3 mb-4">
          <img
            v-if="page?.author?.avatar"
            :src="typeof page.author.avatar === 'string' ? page.author.avatar : page.author.avatar.src"
            :alt="typeof page.author.avatar === 'string' ? page.author.name : page.author.avatar.alt"
            class="size-10 rounded-full object-cover"
          />
          <div class="text-center">
            <p class="text-sm font-medium">{{ page?.author?.name }}</p>
            <p v-if="page?.author?.description" class="text-xs text-muted">{{ page.author.description }}</p>
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