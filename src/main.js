import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './mock/mockServer'

new Vue({
  el: '#app',
  render: h => h(App),
  router
})