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

const selectedTags = ref<string[]>([])
const selectedTechnologies = ref<string[]>([])
const selectedStatus = ref('')

const allTags = computed(() => {
  if (!projects.value) return []
  const tags = new Set<string>()
  projects.value.forEach((p: any) => p.tags?.forEach((t: string) => tags.add(t)))
  return Array.from(tags).sort()
})

const allTechnologies = computed(() => {
  if (!projects.value) return []
  const techs = new Set<string>()
  projects.value.forEach((p: any) => p.technologies?.forEach((t: string) => techs.add(t)))
  return Array.from(techs).sort()
})

const statusOptions = computed(() => [
  { label: locale.value === 'fr' ? 'Tous les statuts' : 'All statuses', value: '' },
  { label: locale.value === 'fr' ? 'En cours' : 'In progress', value: 'in_progress' },
  { label: locale.value === 'fr' ? 'Terminé' : 'Completed', value: 'completed' },
  { label: locale.value === 'fr' ? 'Archivé' : 'Archived', value: 'archived' }
])

const filteredProjects = computed(() => {
  if (!projects.value) return []
  const statusOrder: Record<string, number> = { in_progress: 0, completed: 1, archived: 2 }
  return projects.value
    .filter((project: any) => {
      const matchTag = selectedTags.value.length === 0 || project.tags?.some((t: string) => selectedTags.value.includes(t))
      const matchTech = selectedTechnologies.value.length === 0 || project.technologies?.some((t: string) => selectedTechnologies.value.includes(t))
      const matchStatus = !selectedStatus.value || project.status === selectedStatus.value
      return matchTag && matchTech && matchStatus
    })
    .sort((a: any, b: any) => {
      const orderA = statusOrder[a.status] ?? 2
      const orderB = statusOrder[b.status] ?? 2
      if (orderA !== orderB) return orderA - orderB
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
})

const hasActiveFilters = computed(() => selectedTags.value.length > 0 || selectedTechnologies.value.length > 0 || selectedStatus.value !== '')

const toggleTag = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag)
  } else {
    selectedTags.value.push(tag)
  }
}

const toggleTechnology = (tech: string) => {
  if (selectedTechnologies.value.includes(tech)) {
    selectedTechnologies.value = selectedTechnologies.value.filter(t => t !== tech)
  } else {
    selectedTechnologies.value.push(tech)
  }
}

const clearFilters = () => {
  selectedTags.value = []
  selectedTechnologies.value = []
  selectedStatus.value = ''
}

const statusLabel = (status: string) => {
  if (locale.value === 'fr') {
    return status === 'in_progress' ? 'En cours' : status === 'completed' ? 'Terminé' : 'Archivé'
  }
  return status === 'in_progress' ? 'In progress' : status === 'completed' ? 'Completed' : 'Archived'
}

const statusColor = (status: string) => {
  if (status === 'in_progress') return 'text-green-600 dark:text-green-400'
  if (status === 'completed') return 'text-blue-600 dark:text-blue-400'
  return 'text-muted'
}

const statusDot = (status: string) => {
  if (status === 'in_progress') return 'bg-green-500'
  if (status === 'completed') return 'bg-blue-500'
  return 'bg-gray-400'
}

const filterByTag = (tag: string) => {
  if (!selectedTags.value.includes(tag)) {
    selectedTags.value = [...selectedTags.value, tag]
  }
}

const filterByTech = (tech: string) => {
  if (!selectedTechnologies.value.includes(tech)) {
    selectedTechnologies.value = [...selectedTechnologies.value, tech]
  }
}

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
const technologiesLabel = computed(() => locale.value === 'fr' ? 'Technologies' : 'Technologies')
const detailsLabel = computed(() => locale.value === 'fr' ? 'Voir' : 'View')
const noProjectsLabel = computed(() => locale.value === 'fr' ? 'Aucun projet trouvé' : 'No projects found')
const clearLabel = computed(() => locale.value === 'fr' ? 'Tout voir' : 'Show all')
const filterByTagLabel = computed(() => locale.value === 'fr' ? 'Catégorie' : 'Category')
const statusFilterLabel = computed(() => locale.value === 'fr' ? 'Statut' : 'Status')
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :ui="{
        container: 'py-8 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-0',
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
        container: 'pt-0! px-4 sm:px-6 lg:px-0'
      }"
    >
      <div class="mb-6 space-y-2.5 border-b border-default/30 pb-4">
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="text-xs font-medium text-muted">{{ statusFilterLabel }}</span>
            <select
              v-model="selectedStatus"
              class="rounded-lg border border-default/30 bg-default px-2.5 py-1 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer"
            >
              <option
                v-for="opt in statusOptions"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
          </div>
          <button
            v-if="hasActiveFilters"
            class="text-xs text-muted/50 hover:text-primary transition-colors"
            @click="clearFilters"
          >
            {{ clearLabel }}
          </button>
        </div>

        <div
          v-if="allTags.length"
          class="flex flex-wrap items-center gap-2"
        >
          <span class="text-xs font-medium text-muted">{{ filterByTagLabel }}</span>
          <div class="flex flex-wrap gap-1.5">
            <UButton
              v-for="tag in allTags"
              :key="tag"
              :label="tag"
              size="xs"
              :variant="selectedTags.includes(tag) ? 'solid' : 'soft'"
              :color="selectedTags.includes(tag) ? 'primary' : 'neutral'"
              @click="toggleTag(tag)"
            />
          </div>
        </div>

        <div
          v-if="allTechnologies.length"
          class="flex flex-wrap items-center gap-2"
        >
          <span class="text-xs font-medium text-muted">{{ technologiesLabel }}</span>
          <div class="flex flex-wrap gap-1.5">
            <UButton
              v-for="tech in allTechnologies"
              :key="tech"
              :label="tech"
              size="xs"
              :variant="selectedTechnologies.includes(tech) ? 'solid' : 'soft'"
              :color="selectedTechnologies.includes(tech) ? 'primary' : 'neutral'"
              @click="toggleTechnology(tech)"
            />
          </div>
        </div>
      </div>

      <div class="divide-y divide-default/50">
        <div
          v-for="project in filteredProjects"
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
              <div class="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                <button
                  v-for="tag in project.tags.slice(0, 4)"
                  :key="tag"
                  class="text-xs text-muted hover:text-primary transition-colors"
                  :class="{ 'text-primary': selectedTags.includes(tag) }"
                  @click.stop="filterByTag(tag)"
                >
                  {{ tag }}
                </button>
              </div>
              <div
                v-if="project.technologies?.length"
                class="mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5"
              >
                <button
                  v-for="tech in project.technologies.slice(0, 3)"
                  :key="tech"
                  class="text-[11px] text-muted/60 hover:text-primary/80 transition-colors"
                  :class="{ 'text-primary/80': selectedTechnologies.includes(tech) }"
                  @click.stop="filterByTech(tech)"
                >
                  {{ tech }}
                </button>
              </div>
            </div>
            <span class="text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
              {{ detailsLabel }}
            </span>
          </div>
        </div>
        <div
          v-if="filteredProjects.length === 0"
          class="py-8 text-center text-sm text-muted"
        >
          {{ noProjectsLabel }}
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
          <div
            v-if="selectedProject?.status"
            class="flex items-center gap-2"
          >
            <span
              class="size-2 rounded-full"
              :class="statusDot(selectedProject.status)"
            />
            <span
              class="text-sm font-bold"
              :class="statusColor(selectedProject.status)"
            >{{ statusLabel(selectedProject.status) }}</span>
          </div>
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
          <div v-if="selectedProject?.technologies?.length">
            <span class="text-sm font-medium mb-2 block">{{ technologiesLabel }}</span>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in selectedProject.technologies"
                :key="tech"
                class="text-sm text-muted"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex gap-3">
          <UButton
            v-if="selectedProject?.url"
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
          <div
            v-if="selectedProject?.status"
            class="flex items-center gap-2"
          >
            <span
              class="size-2 rounded-full"
              :class="statusDot(selectedProject.status)"
            />
            <span
              class="text-sm font-bold"
              :class="statusColor(selectedProject.status)"
            >{{ statusLabel(selectedProject.status) }}</span>
          </div>
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
          <div v-if="selectedProject?.technologies?.length">
            <span class="text-sm font-medium mb-2 block">{{ technologiesLabel }}</span>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in selectedProject.technologies"
                :key="tech"
                class="text-sm text-muted"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          <div class="flex gap-3 pt-4">
            <UButton
              v-if="selectedProject?.url"
              :label="viewLiveLabel"
              :to="selectedProject.url"
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
        </div>
      </template>
    </UDrawer>
  </UPage>
</template>
