export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Adminisantri',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'css', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i' },
    ],
    script: [
      { src: "/vendor/apexcharts/apexcharts.min.js"},
      { src: "/vendor/bootstrap/js/bootstrap.bundle.min.js"},
      { src: "/vendor/chart.js/chart.min.js"},
      { src: "/vendor/echarts/echarts.min.js"},
      { src: "/vendor/quill/quill.min.js"},
      { src: "/vendor/simple-datatables/simple-datatables.js"},
      { src: "/vendor/tinymce/tinymce.min.js"},
      { src: "/vendor/php-email-form/validate.js"},
      { src: "/js/main.js", body: true, async: true}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@assets/vendor/bootstrap/css/bootstrap.min.css',
    '@assets/vendor/bootstrap-icons/bootstrap-icons.css',
    '@assets/vendor/boxicons/css/boxicons.min.css',
    '@assets/vendor/quill/quill.snow.css',
    '@assets/vendor/quill/quill.bubble.css',
    '@assets/vendor/remixicon/remixicon.css',
    '@assets/vendor/simple-datatables/style.css',
    '@assets/css/style.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  axios: {
    baseURL: process.env.baseURL,
    credentials: false
  },

  auth: {
    redirect: {
      login: '/login',
      home: '/',
      logout: '/login',
      callback: false, // not used here in our case
    },
    strategies: {
      local: {
        token: {
          property: 'data.token',
          global: true,
        },
        user: {
          property: 'data',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/api/login', method: 'post' },
          user: { url: '/api/user', method: 'get' },
          logout: { url: '/api/logout', method: 'post' },
        }
      }
    }
  },

  router: {
    middleware: ['auth']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
