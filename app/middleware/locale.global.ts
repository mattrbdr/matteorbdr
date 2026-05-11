export default defineNuxtRouteMiddleware((to) => {
  const locale = useState('locale')
  
  if (to.path.startsWith('/fr')) {
    locale.value = 'fr'
  } else {
    locale.value = 'en'
  }
})