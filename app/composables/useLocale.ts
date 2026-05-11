export const usePageLocale = () => {
  const route = useRoute()
  const isFr = computed(() => route.path.startsWith('/fr'))
  return { isFr }
}