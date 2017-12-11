<template>
  <div>
    <div>
      手机号: <input type="text" v-model="phone"><br>
      验证码: <input type="text" v-model="code">
      <button @click="sendCode">发送验证码</button><br>
      <button @click="login">登陆</button>
      <hr>
      <p>登陆状态: {{status}}</p>
    </div>

    <ele-header></ele-header>

    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import axios from 'axios'
  import header from './components/header/header.vue'
  export default {

    data () {
      return {
        phone: '',
        code: '',
        status: '未登陆'
      }
    },
    methods: {
      sendCode() {
        const url = `/api/sendcode?phone=${this.phone}`
        axios.get(url).then(response => {
          console.log('sendcode result ', response.data)
        })
      },

      login() {
        axios.post('/api/login', {phone: this.phone, code: this.code}).then(response => {
          console.log('login result ', response.data)
          const result = response.data
          if (result.code == 0) {
            const user = result.data
            this.status = `登陆成功: ${user.phone}`
          } else {
            this.status = `登陆失败, 请输入正确的手机号和验证码`
          }
        })
      }
    },

    mounted () {
      // 发送ajax请求获取seller并更新状态
      this.$store.dispatch('reqSeller')

      // 使用vue-reource发ajax请求express模拟的接口
      /*this.$http.get('/api/seller')
        .then(response => {
          const result = response.data
          console.log('vue-reource ', result)
        })*/
      // 使用axios发ajax请求mockjs模拟的接口
     /* axios.get('/api2/seller')
        .then(response => {
          const result = response.data
          console.log('axios ', result)
        })*/
    },

    components: {
      'ele-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  .tab
    display flex
    height 40px
    line-height 40px
    border-1px(rgba(7,17,27,.1))
    .tab-item
      width 0
      flex 1
      text-align center
      & > a
        font-size 14px
        color rgb(77,85,93)
        display block
        &.active
          color rgb(240,20,20)
</style>
