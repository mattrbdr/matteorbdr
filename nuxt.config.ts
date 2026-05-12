// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt'
  ],

  devtools: {
    enabled: false
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
      database: false
    }
  },

  compatibilityDate: '2024-11-01',

  future: {
    compatibilityVersion: 4
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
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