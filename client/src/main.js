// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueLocalStorage from 'vue-localstorage'
import store from './store/index'
import ElementUI from 'element-ui';
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueLocalStorage)

/* eslint-disable no-new */
require('./components')
window.axios = axios
window.axios.defaults.baseURL = 'http://192.168.33.10:3333'
window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
