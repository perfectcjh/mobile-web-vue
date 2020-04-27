import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import 'lib-flexible'
import router from './router'
import store from './store'
import api from '@/api'
import uni from 'uni'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.config.productionTip = false

Vue.prototype.$api = api
Vue.prototype.$native = uni

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
