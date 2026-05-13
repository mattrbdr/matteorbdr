const messages = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      blog: 'Blog',
      about: 'About',
      services: 'Services'
    },
    availability: {
      available: 'Available for new projects',
      unavailable: 'Not available at the moment'
    },
    share: 'Share',
    copy_link: 'Copy link',
    copied: 'Copied!',
    share_email: 'Share via Email',
    share_twitter: 'X (Twitter)',
    share_facebook: 'Facebook',
    view_live: 'View Live',
    view_github: 'GitHub',
    view_project: 'View Project',
    technologies: 'Technologies',
    year: 'Year',
    min_read: 'min read',
    back_to_blog: 'Blog',
    article: 'Article',
    footer_credits: '© 2026 Mattéo',
    services: {
      how_i_work: 'How I work',
      mission_types: 'Mission Types',
      target_audience: 'Target Audience',
      result: 'Expected Result'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      projects: 'Projets',
      blog: 'Blog',
      about: 'À propos',
      services: 'Services'
    },
    availability: {
      available: 'Disponible pour de nouveaux projets',
      unavailable: 'Non disponible actuellement'
    },
    share: 'Partager',
    copy_link: 'Copier le lien',
    copied: 'Copié !',
    share_email: 'Envoyer par email',
    share_twitter: 'X (Twitter)',
    share_facebook: 'Facebook',
    view_live: 'Voir en ligne',
    view_github: 'GitHub',
    view_project: 'Voir le projet',
    technologies: 'Technologies',
    year: 'Année',
    min_read: 'min de lecture',
    back_to_blog: 'Blog',
    article: 'Article',
    footer_credits: '© 2026 Mattéo',
    services: {
      how_i_work: 'Ma façon de travailler',
      mission_types: 'Types de missions',
      target_audience: 'Pour qui',
      result: 'Résultat attendu'
    }
  }
}

export const useTranslations = () => {
  const route = useRoute()
  const locale = computed(() => route.path.startsWith('/fr') ? 'fr' : 'en')
  
  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = messages[locale.value]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key
      }
    }
    
    return typeof value === 'string' ? value : key
  }
  
  return { t, locale }
}