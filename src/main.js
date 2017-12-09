import Vue from 'vue'
import VueResource from 'vue-resource'  // 主要用在vue1.x版本
import store from './store'
import App from './App.vue'
import router from './router'
import "./common/stylus/index.styl"
import './filters'
import './mock/mockServer'

Vue.use(VueResource)  // 所有的组件对象都多了一个属性: $http

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
