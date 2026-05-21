<script setup lang="ts">
const { locale, t } = useTranslations()
const pageCollection = computed(() => locale.value === 'fr' ? 'projects_page_fr' : 'projects_page')
const projectsCollection = computed(() => locale.value === 'fr' ? 'projects_fr' : 'projects')

const { data: page } = await useAsyncData(`projects-page-${locale.value}`, () => {
  return queryCollection(pageCollection.value).first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { data: projects } = await useAsyncData(`projects-${locale.value}`, () => {
  return queryCollection(projectsCollection.value).all()
})

const { global } = useAppConfig()

const selectedProject = ref<any>(null)
const drawerOpen = ref(false)
const modalOpen = ref(false)

const openProject = (project: any) => {
  selectedProject.value = project
  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
    modalOpen.value = true
  } else {
    drawerOpen.value = true
  }
}

const closeDrawer = () => {
  drawerOpen.value = false
  selectedProject.value = null
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

const viewLiveLabel = computed(() => t('view_live'))
const viewGithubLabel = computed(() => t('view_github'))
const tagsLabel = computed(() => t('technologies'))
const detailsLabel = computed(() => locale.value === 'fr' ? 'Voir' : 'View')
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
    >
      <template #links>
        <div
          v-if="page.links"
          class="flex items-center gap-2"
        >
          <UButton
            :label="page.links[0]?.label"
            :to="global.meetingLink"
            v-bind="page.links[0]"
            variant="link"
            class="px-0"
          />
          <UButton
            :to="`mailto:${global.email}`"
            v-bind="page.links[1]"
            variant="link"
            color="neutral"
            class="px-0 text-muted hover:text-primary"
          />
        </div>
      </template>
    </UPageHero>

    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <div class="divide-y divide-default/50">
        <div
          v-for="project in projects"
          :key="project.title"
          class="group cursor-pointer py-5 first:pt-0"
          @click="openProject(project)"
        >
          <div class="flex flex-col gap-2 sm:grid sm:grid-cols-[6rem_1fr_auto] sm:items-baseline sm:gap-6">
            <span class="text-xs text-muted">{{ new Date(project.date).getFullYear() }}</span>
            <div>
              <h3 class="text-base font-medium text-foreground transition-colors group-hover:text-primary">
                {{ project.title }}
              </h3>
              <p class="mt-2 max-w-2xl text-sm leading-7 text-muted">
                {{ project.description }}
              </p>
              <div class="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                <span
                  v-for="tag in project.tags.slice(0, 4)"
                  :key="tag"
                  class="text-xs text-muted"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <span class="text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
              {{ detailsLabel }}
            </span>
          </div>
        </div>
      </div>
    </UPageSection>

    <UModal
      v-model:open="modalOpen"
      :title="selectedProject?.title"
    >
      <template #body>
        <div
          v-if="selectedProject"
          class="space-y-4"
        >
          <p class="text-muted">
            {{ selectedProject.description }}
          </p>
          <div>
            <span class="text-sm font-medium mb-2 block">{{ tagsLabel }}</span>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in selectedProject.tags"
                :key="tag"
                class="text-sm text-muted"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex gap-3">
          <UButton
            :label="viewLiveLabel"
            :to="selectedProject?.url"
            target="_blank"
            icon="i-lucide-external-link"
            variant="link"
            class="px-0"
          />
          <UButton
            v-if="selectedProject?.github"
            :label="viewGithubLabel"
            :to="selectedProject.github"
            target="_blank"
            variant="link"
            color="neutral"
            class="px-0 text-muted hover:text-primary"
            icon="i-lucide-github"
          />
        </div>
      </template>
    </UModal>

    <UDrawer
      v-model:open="drawerOpen"
      direction="bottom"
    >
      <template #body>
        <div
          v-if="selectedProject"
          class="space-y-4"
        >
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold">
              {{ selectedProject.title }}
            </h2>
            <UButton
              variant="ghost"
              size="sm"
              icon="i-lucide-x"
              @click="closeDrawer"
            />
          </div>
          <p class="text-muted">
            {{ selectedProject.description }}
          </p>
          <div>
            <span class="text-sm font-medium mb-2 block">{{ tagsLabel }}</span>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in selectedProject.tags"
                :key="tag"
                class="text-sm text-muted"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <div class="flex gap-3 pt-4">
            <UButton
              :label="viewLiveLabel"
              :to="selectedProject.url"
              target="_blank"
              icon="i-lucide-external-link"
              variant="link"
              class="px-0"
            />
            <UButton
              v-if="selectedProject.github"
              :label="viewGithubLabel"
              :to="selectedProject.github"
              target="_blank"
              variant="link"
              color="neutral"
              class="px-0 text-muted hover:text-primary"
              icon="i-lucide-github"
            />
          </div>
        </div>
      </template>
    </UDrawer>
  </UPage>
</template>
