// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  },
  // plugins: [
  //   require('flowbite/plugin')
  // ],
  devServer: { port: 5000 },
  devtools: { enabled: true },
  modules: ['@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    '@pinia/nuxt', // needed
    '@pinia-plugin-persistedstate/nuxt',],
})
