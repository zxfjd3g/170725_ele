import Vue from 'vue'
import VueResource from 'vue-resource'  // 主要用在vue1.x版本
import VueLazyload from 'vue-lazyload'
import VueScroller from 'vue-scroller'
import {Button} from 'mint-ui'
import store from './store'
import App from './App.vue'
import router from './router'
import "./common/stylus/index.styl"
import './filters'
import './mock/mockServer'
import loading from './common/imgs/loading.gif'

Vue.use(VueResource)  // 所有的组件对象都多了一个属性: $http
Vue.use(VueLazyload, {  // 内部自定义了一个指令lazy
  loading: loading
})
Vue.use(VueScroller)  // 内部定义了一个全局的组件scroller

// 注册全局组件标签
Vue.component(Button.name, Button)   // mt-button

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
