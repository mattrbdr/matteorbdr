<script setup lang="ts">
const { t, locale } = useTranslations()
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
      <span>{{ t('footer.built_with') }}</span>
      <span class="mx-2 text-muted/50">·</span>
      <NuxtLink
        :to="locale === 'fr' ? '/fr/terms' : '/terms'"
        class="text-muted transition-colors hover:text-primary"
      >
        {{ t('footer.legal') }}
      </NuxtLink>
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
