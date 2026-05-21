<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <UFooter
    class="z-10 mt-10 bg-transparent border-t border-default/40"
    :ui="{
      root: 'py-5',
      left: 'text-muted text-xs',
      right: 'gap-1'
    }"
  >
    <template #left>
      {{ footer.credits }}
    </template>

    <template #right>
      <template v-if="footer?.links">
        <UButton
          v-for="(link, index) of footer?.links"
          :key="index"
          v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
          class="rounded-md text-muted hover:bg-transparent hover:text-primary"
        />
      </template>
      <LanguageSwitcher />
    </template>
  </UFooter>
</template>
