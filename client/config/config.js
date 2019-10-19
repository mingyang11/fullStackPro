import routersConfig from './router.config'
import pluginsConfig from './plugin.config'

export default {
  singular: true,

  plugins: pluginsConfig,

  routes: routersConfig,
  proxy: {
    '/api/v2': {
      target: 'http://127.0.0.1:7002',
      changeOrigin: true
    }
  }
}
