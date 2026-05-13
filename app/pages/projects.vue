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

const closeModal = () => {
  modalOpen.value = false
  selectedProject.value = null
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
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :ui="{
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
          />
          <UButton
            :to="`mailto:${global.email}`"
            v-bind="page.links[1]"
          />
        </div>
      </template>
    </UPageHero>

    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="project in projects"
          :key="project.title"
          class="group cursor-pointer border border-[var(--ui-border)] rounded-lg p-4 hover:bg-[var(--ui-bg-elevated)] transition-colors"
          @click="openProject(project)"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-muted">{{ new Date(project.date).getFullYear() }}</span>
            <UIcon
              name="i-lucide-arrow-right"
              class="size-4 text-muted group-hover:text-foreground transition-colors"
            />
          </div>
          <h3 class="font-medium mb-1">{{ project.title }}</h3>
          <p class="text-sm text-muted line-clamp-2">{{ project.description }}</p>
        </div>
      </div>
    </UPageSection>

    <UModal
      v-model:open="modalOpen"
      :title="selectedProject?.title"
    >
      <template #body>
        <div v-if="selectedProject" class="space-y-4">
          <p class="text-muted">{{ selectedProject.description }}</p>
          <div>
            <span class="text-sm font-medium mb-2 block">{{ tagsLabel }}</span>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in selectedProject.tags"
                :key="tag"
                class="px-3 py-1 bg-[var(--ui-bg)] text-sm rounded-md"
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
          />
          <UButton
            v-if="selectedProject?.github"
            :label="viewGithubLabel"
            :to="selectedProject.github"
            target="_blank"
            variant="outline"
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
        <div v-if="selectedProject" class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold">{{ selectedProject.title }}</h2>
            <UButton
              variant="ghost"
              size="sm"
              icon="i-lucide-x"
              @click="closeDrawer"
            />
          </div>
          <p class="text-muted">{{ selectedProject.description }}</p>
          <div>
            <span class="text-sm font-medium mb-2 block">{{ tagsLabel }}</span>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in selectedProject.tags"
                :key="tag"
                class="px-3 py-1 bg-[var(--ui-bg)] text-sm rounded-md"
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
            />
            <UButton
              v-if="selectedProject.github"
              :label="viewGithubLabel"
              :to="selectedProject.github"
              target="_blank"
              variant="outline"
              icon="i-lucide-github"
            />
          </div>
        </div>
      </template>
    </UDrawer>
  </UPage>
</template>