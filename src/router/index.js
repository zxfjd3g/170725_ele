import Vue from 'vue'
import VueRouter from 'vue-router'
// import goods from '../pages/goods/goods.vue'
// import ratings from '../pages/ratings/ratings.vue'
// import seller from '../pages/seller/seller.vue'

/*
1. 将路由组件单独打包
2. 只有需要组件时才会从后台请求组件对应的包
 */
const goods = () => import('../pages/goods/goods.vue')
const ratings = () => import('../pages/ratings/ratings.vue')
const seller = () => import('../pages/seller/seller.vue')


Vue.use(VueRouter)

export default new VueRouter({
  // linkExactActiveClass:"xfz",
  linkActiveClass:"active",
  routes: [
    {
      path: '/',
      'redirect': '/goods'
    },
    {
      path: '/goods',
      component: goods  // 返回组件的函数
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/seller',
      component: seller
    },

  ]
})
