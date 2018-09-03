// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueBus from 'vue-bus'
import axios from 'axios'
import iView from 'iview'
import './global/initProject.js'
import './global/setting.js'
// import '../static/css/animate.css'
import 'iview/dist/styles/iview.css'
import '../static/css/reset.css'
import '../static/css/ol.css'
import '../static/less/modal.less'
import 'common/less/reset.less'

Vue.use(iView)
Vue.use(VueBus)
Vue.prototype.$ajax = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
