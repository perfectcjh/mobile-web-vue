import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import 'lib-flexible'
import router from './router'
import store from './store'
import api from '@/api'
import native from './module/native/native.js'
import uniNative from './module/native/uni-native'
import Vant from 'vant'
import 'vant/lib/index.css'
import Alert from '@/module/alert/alert.js'
import mixinUserInfo from '@/module/mixin/mixin-userinfo.js'

Vue.use(Vant)
Vue.mixin(mixinUserInfo)

Vue.config.productionTip = false

Vue.prototype.$api = api
Vue.prototype.$uniNative = uniNative
Vue.prototype.$native = native
Vue.prototype.$alert = Alert

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
