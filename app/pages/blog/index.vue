<script setup lang="ts">
const { locale } = useTranslations()
const pagesCollection = computed(() => locale.value === 'fr' ? 'blog_page_fr' : 'blog_page')
const blogCollection = computed(() => locale.value === 'fr' ? 'blog_fr' : 'blog')

const { data: page } = await useAsyncData(`blog-page-${locale.value}`, () => {
  return queryCollection(pagesCollection.value).first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}
const { data: posts } = await useAsyncData(`blogs-${locale.value}`, () =>
  queryCollection(blogCollection.value).order('date', 'DESC').all()
)
if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'blogs posts not found',
    fatal: true
  })
}

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImage('Portfolio', { title, description })

const formatDate = (dateString: string | Date) => {
  return new Date(dateString).toLocaleDateString(locale.value === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :ui="{
        container: 'py-8 sm:py-12 lg:py-14',
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        links: 'justify-start'
      }"
    />
    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <div class="divide-y divide-default/50">
        <ULink
          v-for="(post, index) in posts"
          :key="index"
          :to="post.path"
          class="group block py-5 first:pt-0"
        >
          <div class="flex flex-col gap-2 sm:grid sm:grid-cols-[9rem_1fr] sm:gap-6">
            <span class="text-xs text-muted">{{ formatDate(post.date) }}</span>
            <div>
              <h2 class="text-base font-medium text-foreground transition-colors group-hover:text-primary">
                {{ post.title }}
              </h2>
              <p class="mt-2 max-w-2xl text-sm leading-7 text-muted">
                {{ post.description }}
              </p>
            </div>
          </div>
        </ULink>
      </div>
    </UPageSection>
  </UPage>
</template>
