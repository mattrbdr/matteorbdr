// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    // '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  tailwind: {
    darkMode: 'class'
  },

  app: {
    head: {
      htmlAttrs: { class: 'dark' }
    }
  },

  content: {
    experimental: {
      sqliteConnector: 'native'
    }
  },

  compatibilityDate: '2024-11-01',

  nitro: {
    static: true,
    prerender: {
      crawlLinks: true,
      routes: ['/']
    },
    devStorage: {
      'cache:nuxt:payload': { driver: 'memory' }
    }
  },
  future: {
    compatibilityVersion: 4
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  ogImage: {
    zeroRuntime: true
  }
})