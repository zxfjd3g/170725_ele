<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: totalCount}">
              <i class="icon-shopping_cart" :class="{highlight: totalCount}"></i></div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{seller.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass"><!--  enough not-enough-->
            {{payText}}
          </div>
        </div>
      </div>

      <div class="ball-container">
        <transition v-for="(ball, index) in balls"
                    :key="index"
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:after-enter="afterEnter"
                    :css="false">
          <div class="ball" v-show="ball.isShow">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>

      <transition name="slide">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <!--<span class="empty">清空</span>-->
            <mt-button type="primary" style="float: right" @click.native="clear">清空</mt-button>
          </div>

          <div class="list-content" ref="foods">
            <ul>
              <li class="food" v-for="(food, index) in cartFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price}}</span></div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
    </transition>

  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import BScroll from 'better-scroll'
  import {mapGetters, mapState} from 'vuex'
  import { MessageBox, Toast} from 'mint-ui'

  import cartcontrol from '../cartcontrol/cartcontrol.vue'

  export default {

    data() {
      return {
        isShow: false,
        balls: [
          {isShow: false},
          {isShow: false},
          {isShow: false},
          {isShow: false},
          {isShow: false},
          {isShow: false}
        ],
        droppingBalls: []   // 保存所有显示小球所对应的ball的数组
      }
    },

    mounted () {
      //订阅消息
      PubSub.subscribe('startDrop', (message, startEl) => {
        // 找出一个隐藏的小球, 将其显示
        const ball = this.balls.find(ball => !ball.isShow)
        if(ball) {
          ball.isShow = true
          // 保存startEl到对应的ball
          ball.startEl = startEl
          // 保存ball到droppingBalls
          this.droppingBalls.push(ball)
        }
      })
    },

    computed: {
      ...mapState(['seller']),
      ...mapGetters(['cartFoods', 'totalCount', 'totalPrice']),

      payClass() {
        return this.totalPrice - this.seller.minPrice >= 0 ? 'enough' : 'not-enough'
      },

      payText() {
        const minPrice = this.seller.minPrice
        const totalPrice = this.totalPrice
        if (totalPrice === 0) {
          return `￥${minPrice}元起送`
        } else if (totalPrice < minPrice) {
          return `还差￥${minPrice - totalPrice}元起送`
        } else {
          return '去结算'
        }
      },

      listShow () {
        const {totalCount, isShow} = this
        if(totalCount===0) {
          this.isShow = false
          return false
        }

        /*
        单例对象: 只有一个实例
            1. 在创建之前, 先判断是否已经存在, 只有不存在才创建
            2. 创建之后, 保存起来
         */
        if(isShow) {
          // this.$nextTick()
          console.log('new BScroll()')
          this.$nextTick(() => {
            // 如果不存在创建并保存
            if(!this.scroll) {
              this.scroll = new BScroll(this.$refs.foods, {
                click: true
              })
            } else {// 如果存在, 通知scroll刷新
              this.scroll.refresh()
            }
          })
        }


        return isShow
      }
    },

    methods: {

      clear () {
        MessageBox.confirm('确定清空吗?').then(
          action => {
            // 清空购物车
            this.$store.dispatch('clearCart', this.cartFoods)
            // 提示清空成功
            Toast({
              message: '清空成功',
              position: 'middle',
              duration: 1000
            })
          },
          action => {
            //不需要做什么
          }
        )
      },

      toggleShow () {
        this.isShow = !this.isShow
      },

      // 在开始显示动画之前调用, 指定起始时的样式状态
      beforeEnter (el) { // el是发生动画的ball div
        console.log('beforeEnter()')
        // 得到对应的ball
        const ball = this.droppingBalls.shift()
        const startEl = ball.startEl


        let offsetX = 0
        let offsetY = 0
        // 计算
        const elLeft = 32
        const elBootom = 22

        const rect = startEl.getBoundingClientRect()
        const startElLeft = rect.left
        const startElTop = rect.top

        offsetX = startElLeft-elLeft
        offsetY = -(window.innerHeight-startElTop-elBootom)

        el.style.transform = `translateY(${offsetY}px)`
        el.children[0].style.transform = `translateX(${offsetX}px)`

        // 保存ball到el
        el.ball = ball
      },
      // 在开始进入时调用, 指定结束时的样式状态
      enter (el) { // el是发生动画的ball div
        console.log('enter()')

        /*// 强制重排重绘
        const temp = el.clientHeight

        // 当前帧更新之后指定行: 否则会立即起效果
        this.$nextTick(() => {

        })*/
        setTimeout(() => {
          el.style.transform = 'translateX(0)'
          el.children[0].style.transform = 'translateY(0)'
        }, 10)
      },
      // 在进入动画结束时调用, 隐藏小球
      afterEnter (el) { // el是发生动画的ball div
        console.log('afterEnter()')
        // 找到对应的ball
        setTimeout(() => {
          el.ball.isShow = false
        }, 400)
      }
    },

    components: {
      cartcontrol
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform translateY(-100%)
      &.slide-enter-active, &.slide-leave-active
        transition transform .3s
      &.slide-enter, &.slide-leave-to
        transform translateY(0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
      background: rgba(7, 17, 27, 0)
</style>