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
</script>

<template>
  <UPageSection
    :title="blogSectionTitle"
    :description="blogSectionDescription"
    :ui="{
      container: 'px-0 pt-0! sm:gap-6 lg:gap-8',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <UBlogPosts
      orientation="vertical"
      class="gap-4 lg:gap-y-4"
    >
      <div
        v-for="(post, index) in posts"
        :key="index"
        class="group"
      >
        <UBlogPost
          orientation="horizontal"
          variant="naked"
          v-bind="post"
          :to="post.path"
          :ui="{
            root: 'relative lg:items-start lg:flex ring-0 hover:ring-0',
            body: 'px-0!',
            header: 'hidden',
            author: 'hidden'
          }"
        >
          <template #footer>
            <UButton
              size="xs"
              variant="link"
              class="px-0 gap-0"
              label="Read Article"
            >
              <template #trailing>
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </template>
            </UButton>
          </template>
        </UBlogPost>
      </div>
    </UBlogPosts>
  </UPageSection>
</template>
