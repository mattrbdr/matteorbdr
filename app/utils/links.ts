import type { NavigationMenuItem } from '@nuxt/ui'

export const useNavLinks = () => {
  const route = useRoute()
  const isFr = route.path.startsWith('/fr')

  const navLinks: NavigationMenuItem[] = [
    {
      label: isFr ? 'Accueil' : 'Home',
      icon: 'i-lucide-home',
      to: isFr ? '/fr' : '/'
    },
    {
      label: isFr ? 'Projets' : 'Projects',
      icon: 'i-lucide-folder',
      to: isFr ? '/fr/projects' : '/projects'
    },
    {
      label: isFr ? 'Blog' : 'Blog',
      icon: 'i-lucide-file-text',
      to: isFr ? '/fr/blog' : '/blog'
    },
    {
      label: isFr ? 'Interviews' : 'Speaking',
      icon: 'i-lucide-mic',
      to: isFr ? '/fr/speaking' : '/speaking'
    },
    {
      label: isFr ? 'À propos' : 'About',
      icon: 'i-lucide-user',
      to: isFr ? '/fr/about' : '/about'
    }
  ]

  return { navLinks }
}
