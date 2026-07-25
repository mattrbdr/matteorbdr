<script setup lang="ts">
const { locale } = useTranslations()
const isFr = locale.value === 'fr'
const collection = isFr ? 'projects_fr' : 'projects'

const { data: allProjects } = useAsyncData(`all-projects-${locale.value}`, () =>
  queryCollection(collection).all()
)

const projects = computed(() => {
  if (!allProjects.value) return []
  return allProjects.value
    .filter((p: any) => p.featured === true)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const title = isFr ? 'Projets sélectionnés' : 'Selected work'
</script>

<template>
  <section
    v-if="projects.length > 0"
    class="text-left"
  >
    <header class="mb-4">
      <h2 class="text-xl font-bold text-foreground lg:text-2xl">
        {{ title }}
      </h2>
    </header>

    <div class="divide-y divide-default/50">
      <a
        v-for="project in projects"
        :key="project.title"
        :href="project.url || '#'"
        :target="project.url ? '_blank' : undefined"
        rel="noopener noreferrer"
        :aria-label="(isFr ? 'Voir le projet' : 'View project') + ': ' + project.title"
        class="group grid grid-cols-[3rem_1fr] items-baseline gap-3 py-3 text-sm first:pt-0"
      >
        <span class="font-medium tabular-nums text-muted text-sm">
          {{ new Date(project.date).getFullYear() }}
        </span>
        <div>
          <span class="text-foreground transition-colors group-hover:text-primary font-medium">
            {{ project.title }}
          </span>
          <p class="text-muted leading-6">
            {{ project.description }}
          </p>
        </div>
      </a>
    </div>
  </section>
</template>
