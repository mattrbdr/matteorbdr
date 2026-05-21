import type { NavigationMenuItem } from '@nuxt/ui'

export const useNavLinks = () => {
  const navLinks: NavigationMenuItem[] = [
    {
      label: 'nav.home',
      icon: 'i-lucide-home',
      to: '/'
    },
    {
      label: 'nav.services',
      icon: 'i-lucide-wrench',
      to: '/services'
    },
    {
      label: 'nav.projects',
      icon: 'i-lucide-folder',
      to: '/projects'
    },
    {
      label: 'nav.blog',
      icon: 'i-lucide-file-text',
      to: '/blog'
    },
    {
      label: 'nav.about',
      icon: 'i-lucide-user',
      to: '/about'
    }
  ]

  return { navLinks }
}
