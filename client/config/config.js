import routersConfig from './router.config'
import pluginsConfig from './plugin.config'

export default {
  singular: true,

  plugins: pluginsConfig,

  routes: routersConfig,
  proxy: {
    '/dev': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true
    }
  }
}
