<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const props = defineProps<{
  page: IndexCollectionItem
}>()

const route = useRoute()
const isFr = route.path.startsWith('/fr')

const { data: posts } = await useAsyncData(`index-blogs-${isFr ? 'fr' : 'en'}`, () =>
  queryCollection(isFr ? 'blog_fr' : 'blog').order('date', 'DESC').limit(3).all()
)

const blogSectionTitle = computed(() => props.page?.blog?.title || (isFr ? 'Derniers articles' : 'Latest articles'))
const blogSectionDescription = computed(() => props.page?.blog?.description || (isFr ? 'Mes réflexions récentes' : 'Some of my recent thoughts'))

const formatDate = (dateString: string | Date) => {
  return new Date(dateString).toLocaleDateString(isFr ? 'fr-FR' : 'en-US', {
    year: 'numeric'
  })
}
</script>

<template>
  <section class="text-left">
    <header class="mb-4">
      <h2 class="text-xl font-medium text-foreground lg:text-2xl">
        {{ blogSectionTitle }}
      </h2>
      <p class="mt-2 text-sm text-muted">
        {{ blogSectionDescription }}
      </p>
    </header>

    <div class="divide-y divide-default/50">
      <ULink
        v-for="(post, index) in posts"
        :key="index"
        :to="post.path"
        class="group block py-4 first:pt-0"
      >
        <article class="grid grid-cols-[3.25rem_1fr] items-baseline gap-2 text-sm sm:grid-cols-[3.75rem_1fr]">
          <time class="font-medium tabular-nums text-muted">
            {{ formatDate(post.date) }}
          </time>
          <div>
            <h3 class="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
              {{ post.title }}
            </h3>
            <p class="mt-1 line-clamp-2 text-sm leading-6 text-muted">
              {{ post.description }}
            </p>
          </div>
        </article>
      </ULink>
    </div>
  </section>
</template>
