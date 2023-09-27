// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  pages: true,
  components:true,
  imports: {
    autoImport: true
  },
  devtools: { enabled: true }
})
