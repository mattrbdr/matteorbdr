<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <section>
    <div class="space-y-6">
      <div
        v-for="(item, index) in page.testimonials"
        :key="index"
        class="flex flex-col rounded-xl border border-default/5 bg-elevated/60 p-6 sm:p-8"
      >
        <p class="text-sm leading-relaxed text-pretty">
          {{ item.quote }}
        </p>
        <div class="mt-4 pt-4 border-t border-default/5">
          <p class="text-sm font-medium">
            {{ item.author.name }}
          </p>
          <p
            v-if="item.author.description"
            class="text-xs text-muted mt-0.5"
          >
            {{ item.author.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
