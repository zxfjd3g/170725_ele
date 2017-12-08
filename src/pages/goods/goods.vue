<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <!--current: 需要动态确认第几个li的class有current     currentIndex-->
          <li class="menu-item" v-for="(good, index) in goods"
              :key="index" :class="{current: index===currentIndex}" @click="clickMenuItem(index)">
            <span class="text border-1px">
              <span class="icon" :class="supportsClasses[good.type]" v-if="good.type>=0"></span>
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="food-list food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item border-1px" v-for="(food, index) in good.foods">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue'

  export default {

    data() {
      return {
        supportsClasses: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        scrollY: 0,  //代表右侧列表滑动的Y轴坐标
        tops: [] // 代表右侧所有分类li的top组件的数组
      }
    },

    mounted() {
      this.$store.dispatch('reqGoods', () => {// 数据已获取, 状态已更新
        this.$nextTick(() => { // 界面更新后回调
          this._initScroll()
          this._initTops()
        })
      })
      
    },

    methods: {
      _initScroll () {
        new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, { // 配置对象
          probeType: 2, // 2代表只有手指滑动时才触发 3代表只要是滑动就会触发
          click: true
        })
        // 绑定滚动的监听
        this.foodsScroll.on('scroll', (event) => {
          console.log(event.y)
          // 更新scrollY
          this.scrollY = Math.abs(event.y)
        })

        // 绑定滑动结束的监听
        this.foodsScroll.on('scrollEnd', (event) => {
          console.log('scrollEnd', event.y)
          this.scrollY = Math.abs(event.y)
        })
      },

      _initTops () {
        const tops = []

        let top = 0
        tops.push(top)
        const lis = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        for (var i = 0,length=lis.length; i<length;  i++) {
          var li = lis[i]
          top += li.clientHeight
          tops.push(top)
        }

        // 更新状态
        this.tops = tops
      },

      clickMenuItem (index) {
        console.log('clickMenuItem()', index)
        this.scrollY = this.tops[index]
        this.foodsScroll.scrollTo(0, -this.tops[index], 500)
      }
    },

    computed: {
      ...mapState(['goods']),

      currentIndex () {
        const {scrollY, tops} = this
        // 根据scrollY在tops中找到一个对应的下标
        // scrollY>=top && scrollY<nextTop
        return tops.findIndex((top, index) => scrollY>=top && scrollY<tops[index+1])
      }
    },

    components: {
      cartcontrol
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>