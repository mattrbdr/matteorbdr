<script setup lang="ts">
const props = defineProps<{
  title: string
  url: string
}>()

const { t } = useTranslations()
const copied = ref(false)

const emailUrl = computed(() => {
  const subject = encodeURIComponent(props.title)
  const body = encodeURIComponent(props.url)
  return `mailto:?subject=${subject}&body=${body}`
})

const twitterUrl = computed(() => {
  const text = encodeURIComponent(props.title)
  const url = encodeURIComponent(props.url)
  return `https://twitter.com/intent/tweet?text=${text}&url=${url}`
})

const facebookUrl = computed(() => {
  const url = encodeURIComponent(props.url)
  return `https://www.facebook.com/sharer/sharer.php?u=${url}`
})

const copyLink = async () => {
  if (props.url && typeof navigator !== 'undefined') {
    await navigator.clipboard.writeText(props.url)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <span class="text-sm text-muted shrink-0">{{ t('share') }}</span>
    <UButton
      variant="ghost"
      size="sm"
      color="neutral"
      :label="t('share_twitter')"
      icon="i-lucide-twitter"
      :to="twitterUrl"
      target="_blank"
      class="shrink-0 rounded-md hover:bg-transparent hover:text-primary"
      aria-label="Share on X (Twitter)"
    />
    <UButton
      variant="ghost"
      size="sm"
      color="neutral"
      :label="t('share_email')"
      icon="i-lucide-mail"
      :to="emailUrl"
      class="shrink-0 rounded-md hover:bg-transparent hover:text-primary"
      aria-label="Share via Email"
    />
    <UButton
      variant="ghost"
      size="sm"
      color="neutral"
      icon="i-lucide-facebook"
      :to="facebookUrl"
      target="_blank"
      class="shrink-0 rounded-md hover:bg-transparent hover:text-primary"
      aria-label="Share on Facebook"
    />
    <UButton
      variant="ghost"
      size="sm"
      color="neutral"
      :label="copied ? t('copied') : t('copy_link')"
      :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
      class="shrink-0 rounded-md hover:bg-transparent hover:text-primary"
      @click="copyLink()"
    />
  </div>
</template>
