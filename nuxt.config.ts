// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt',
    '@nuxtjs/i18n'
  ],

  devtools: {
    enabled: false
  },

  css: ['~/assets/css/main.css'],

  tailwind: {
    darkMode: 'class'
  },

  app: {
    baseURL: '/matteorbdr/',
    head: {
      htmlAttrs: { class: 'dark' }
    }
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English' },
      { code: 'fr', language: 'fr-FR', name: 'Français' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    differentDomains: false,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  content: {
    experimental: {
      search: {
        indexed: true
      }
    }
  },

  compatibilityDate: '2024-11-01',

  future: {
    compatibilityVersion: 4
  },

  nitro: {
    prerender: {
      failOnError: false,
      crawlLinks: true,
      routes: [
        '/',
        '/blog',
        '/blog/welcome',
        '/projects',
        '/about',
        '/services',
        '/fr',
        '/fr/blog',
        '/fr/blog/welcome',
        '/fr/projects',
        '/fr/about',
        '/fr/services'
      ]
    },
    devStorage: {
      cache: {
        driver: 'memory'
      }
    }
  },

  experimental: {
    payloadExtraction: false
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  build: {
    chunkSizeWarningLimit: 1000
  },

  ogImage: {
    zeroRuntime: true
  }
})