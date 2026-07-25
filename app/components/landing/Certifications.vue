<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <div
    v-if="page.certifications?.items?.length"
    class=""
  >
    <p class="text-xs text-muted">
      {{ page.certifications.title }}
      <span class="font-semibold text-foreground"> · </span>
      <span
        v-for="(cert, index) in page.certifications.items"
        :key="index"
      >
        {{ cert.issuer.name }}<span v-if="index < page.certifications.items.length - 1"><span class="text-muted/40"> · </span></span>
      </span>
    </p>
  </div>
</template>
