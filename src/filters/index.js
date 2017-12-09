import moment from 'moment'
import Vue from 'vue'

/*
自定义过滤器模块
 */
Vue.filter('dateString', function (value, format) {

  return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
})