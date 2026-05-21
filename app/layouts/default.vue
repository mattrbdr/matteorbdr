<script setup lang="ts">
const { navLinks } = useNavLinks()
</script>

<template>
  <div>
    <UContainer class="max-w-3xl pt-8 sm:pt-10">
      <AppHeader :links="navLinks" />
      <slot />
      <AppFooter />
    </UContainer>
  </div>
</template>
