module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Thaddé Méneur',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Portfolio of digital designer Thaddé Méneur' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.5.1/pixi.min.js' }
    ],
    link: [
      { rel: 'icon', sizes:'32x32', type: 'image/png', href: '/favicon-32x32.png' },
      { rel: 'icon', sizes:'96x96', type: 'image/png', href: '/favicon-96x96.png' },
      { rel: 'icon', sizes:'16x16', type: 'image/png', href: '/favicon-16x16.png' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: false,
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  env: {
    baseURL: (process.env.NODE_ENV === 'production' ? 'http//thaddemeneur.com' : 'http://localhost:3000')
  },
  css: [
    // SCSS file in the project
    '@/assets/scss/main.scss'
  ],
  plugins: [
    { src: '~plugins/ga.js', ssr: false }
  ]
}
