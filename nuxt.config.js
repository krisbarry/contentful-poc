import pkg from './package'
// import fs from 'fs'
// import path from 'path'
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'

const contentConfig = require('./.content.json')

export default {
  mode: 'universal',

  /**
   * Environment variables
   */
  env: {
    CONTENT_API_ENDPOINT: contentConfig.API_ENDPOINT,
    CONTENT_PRODUCT_TYPE: contentConfig.PRODUCT_TYPE,
    GOOGLE_MAPS_API_KEY: 'AIzaSyC5BwUCfgdEW0mHOoDyNrYCF8UjTPqndp4',
    VUE_APP_I18N_LOCALE: 'en-US',
    VUE_APP_I18N_SUPPORTED_LOCALES: [{
      label: 'English',
      locale: 'en-US'
    },
    {
      label: 'En Español',
      locale: 'es-MX'
    }]
  },
  
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  *
  loading: { color: '#fff' },*/
  loading: { color: '#910129' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/app.styl',
    '@/assets/styles/global.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/google-maps',
    '@/plugins/vuetify'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // '@nuxtjs/axios', // doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/pwa'
  ],

  /*
  ** Axios module configuration
  *
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/styles/variables.styl']
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      transpile: [/^vue2-google-maps($|\/)/]
    }
  }/*,

  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.cert'))
    }
  }*/
}
