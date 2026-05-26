export default defineAppConfig({
  global: {
    picture: {
      dark: '/mattrbdr2.webp',
      light: '/mattrbdr2.webp',
      alt: 'Mattéo'
    },
    meetingLink: 'https://cal.com/matteorbdr/discovery-meeting',
    email: 'matteorbdr@icloud.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'primary',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-0',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description:
          'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    },
    navigation: {
      links: [
        { label: 'nav.home', to: '/' },
        { label: 'nav.projects', to: '/projects' },
        { label: 'nav.blog', to: '/blog' },
        { label: 'nav.services', to: '/services' },
        { label: 'nav.contact', to: '/contact' }
      ]
    }
  },
  footer: {
    credits: `Construit avec ♥ par Mattéo`,
    colorMode: false,
    links: [
      {
        'icon': 'i-simple-icons-linkedin',
        'to': 'https://www.linkedin.com/in/matteorbdr',
        'target': '_blank',
        'aria-label': 'LinkedIn'
      },
      {
        'icon': 'i-simple-icons-instagram',
        'to': 'https://w.instagram.com/matteorbdr/',
        'target': '_blank',
        'aria-label': 'Instagram'
      },
      {
        'icon': 'i-simple-icons-github',
        'to': 'https://github.com/mattrbdr/',
        'target': '_blank',
        'aria-label': 'GitHub'
      }
    ]
  }
})
