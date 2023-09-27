// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  pages: true,
  components:true,
  imports: {
    autoImport: true
  },
  app: {
    buildAssetsDir: "_nuxt",
    head: {
      title: "오진서 개인 개발",
      htmlAttrs: { lang: "ko" },
      charset: "utf-8",
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png"
        },
      ],
      // script: [
      //   // 다음 주소 검색 API
      //   {
      //     src: '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
      //   },
      // ],
      // meta: [
      //   { name: "naver-site-verification", content: "7f04ab4961f4b0cf1dc072f3723b7d7dbed697f1" },
      //   { name: "google-site-verification", content: "H9vxQOyx3XKqAor7eFviU76PnbdVduCAw6NhTcOYF-Y" },
      // ]
    },
  },
  css: [
    // "@progress/kendo-theme-default/dist/all.css",
    // "~/assets/styles/app.scss",
    // "~/assets/styles/all.css",
    // "~/assets/styles/style.css",
    // "~/assets/styles/admin.css",
    // "vuetify/lib/styles/main.sass"
  ],
  modules: [
    "@pinia/nuxt",
    '@pinia-plugin-persistedstate/nuxt',
    "@invictus.codes/nuxt-vuetify",
    // "nuxt-gtag",
    // '@nuxt/image',
  ],
  nitro: {
    compressPublicAssets: true,
    devProxy: {
    }
  },
  vuetify: {
    vuetifyOptions: {},
    moduleOptions: {
      treeshaking: true,
      useIconCDN: true,
      autoImport: true,
    },
  },
  vite: {
  },
  // optimization: {
  //   treeShake: {

  //   }
  // }
  // treeShake: { client: { myPackage: ['useServerOnlyComposable'] } }
  devtools: { enabled: true }
});



