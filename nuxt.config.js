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
      { src: "/vendors/js/vendor.bundle.base.js", body: true, async: true},
      { src: "/vendors/chart.js/chart.min.js"},
      { src: "/vendors/bootstrap-datepicker/bootstrap-datepicker.min.js"},
      { src: "/vendors/progressbar.js/progressbar.min.js"},
      { src: "/js/off-canvas.js"},
      { src: "/js/hoverable-collapse.js"},
      { src: "/js/template.js"},
      { src: "/js/settings.js"},
      { src: "/js/todolist.js"},
      { src: "/js/jquery.cookie.js"},
      { src: "/js/dashboard.js", body: true, async: true},
      { src: "/js/Chart.roundedBarCharts.js"}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@assets/vendors/feather/feather.css',
    '@assets/vendors/mdi/css/materialdesignicons.min.css',
    '@assets/vendors/ti-icons/css/themify-icons.css',
    '@assets/vendors/typicons/typicons.css',
    '@assets/vendors/simple-line-icons/css/simple-line-icons.css',
    '@assets/vendors/css/vendor.bundle.base.css',
    // '@assets/vendors/datatables.net-bs4/dataTables.bootstrap4.css',
    '@assets/js/select.dataTables.min.css',
    '@assets/css/vertical-layout-light/style.css'
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
    '@nuxtjs/auth-next',
    'vue-sweetalert2/nuxt'
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
