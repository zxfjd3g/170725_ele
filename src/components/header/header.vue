<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg" >
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">粥品香坊（回龙观）</span>
        </div>
        <div class="description">
          蜂鸟专送/38分钟送达
        </div>
        <div class="supports">
          <span class="icon guarantee" ></span>
          <span class="text">在线支付满28减5</span>
        </div>
        <div class="supports-counts">
          <span>5个</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-icon"></span>
      <span class="bulletin-text">粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。</span>
      <span class="icon-keyboard_arrow_right bulletin-arrow"></span>
    </div>
    <div class="bg">
      <img src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg" alt="">
    </div>
    <div class="mask">
      <div class="mask-wrapper">
        <div class="mask-content">
          <h1>晓飞猪蹄（西部硅谷）</h1>
          <div class="stars-wrapper">
            <div class="stars stars-48">
              <span class="star on"></span>
              <span class="star on"></span>
              <span class="star on"></span>
              <span class="star half"></span>
              <span class="star off"></span>
            </div>
          </div>
          <div class="info">
            <span class="line"></span>
            <span class="text">优惠信息</span>
            <span class="line"></span>
          </div>
          <div class="list">
            <ul>
              <li>
                <span class="icon special"></span>
                <span class="text">在线支付满28送晓飞张</span>
              </li>
              <li>
                <span class="icon decrease"></span>
                <span class="text">VC无限橙果汁全场8折</span>
              </li>
              <li>
                <span class="icon decrease"></span>
                <span class="text">单人精彩套餐</span>
              </li>
              <li>
                <span class="icon decrease"></span>
                <span class="text">该商家支持发票,请下单写好发票抬头</span>
              </li>
              <li>
                <span class="icon special"></span>
                <span class="text">已加入“外卖保”计划,食品安全保障</span>
              </li>
            </ul>
          </div>
          <div class="info">
            <span class="line"></span>
            <span class="text">商家公告</span>
            <span class="line"></span>
          </div>
          <div class="content">
            <p>粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。</p>
          </div>
        </div>
      </div>
      <div class="mask-footer">
        <span class="icon-close"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    position relative
    overflow hidden
    background rgba(7,17,27,.5)
    .content-wrapper
      position relative
      font-size 0
      margin 24px 12px 18px 24px
      .avatar
        display inline-block
        vertical-align top
        img
          width 64px
          height 64px
          border-radius 2px
      .content
        margin-left 16px
        display inline-block
        .title
          margin 2px 0 8px 0
          .brand
            margin-right 6px
            vertical-align top
            display inline-block
            width 30px
            height 18px
            background-repeat no-repeat
            background-size 100% 100%
            bg-image(brand)
          .name
            font-size 16px
            color rgb(255,255,255)
            font-weight bolder
            line-height 18px

        .description
          font-size 12px
          line-height 12px
          font-weight 200
          color rgb(255,255,255)
        .supports
          margin 10px 0 2px 0
          .icon
            margin-right 4px
            vertical-align top
            display inline-block
            width 12px
            height 12px
            background-repeat no-repeat
            background-size 100% 100%
            &.decrease
              bg-image(decrease_1)
            &.discount
              bg-image(discount_1)
            &.guarantee
              bg-image(guarantee_1)
            &.invoice
              bg-image(invoice_1)
            &.special
              bg-image(special_1)
          .text
            font-size 10px
            line-height 12px
            color rgb(255,255,255)
            font-weight 200
        .supports-counts
          font-size 10px
          position absolute
          right  0
          bottom -5px
          width 48px
          height 24px
          line-height 24px
          text-align center
          background pink
          border-radius 8px
          color rgb(255,255,255)
          font-weight 200
          background rgba(0,0,0,0.2)
          span
            line-height 12px


    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 26px 0 12px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      color rgb(255,255,255)
      background rgba(7,17,27,0.2)
      .bulletin-text
        font-size 10px
        font-weight 200
      .bulletin-icon
        margin-right 4px
        margin-top 9px
        float left
        width 22px
        height 12px
        background-repeat no-repeat
        background-size 100% 100%
        bg-image(bulletin)
      .bulletin-arrow
        position absolute
        right 12px
        bottom 4px

    .bg
      position absolute
      left 0
      right 0
      top 0
      bottom 0
      z-index -1
      filter blur(10px)
      img
        width 100%
        height 100%
    .mask
      position fixed
      z-index 99
      left 0
      top 0
      width 100%
      height 100%
      background rgba(7,17,27,.8)
      overflow auto
      .mask-wrapper
        clearFix()
        min-height 100%
        .mask-content
          overflow hidden
          padding-bottom 64px
          h1
            margin-top 64px
            font-size 16px
            line-height 16px
            font-weight 700
            color rgb(255,255,255)
            text-align center
          .stars-wrapper
            margin 16px 0 28px 0
            text-align center
            .stars
              display inline-block
              .star
                display inline-block
                background-size 100% 100%
                background-repeat no-repeat
              &.stars-48
                .star
                  width 20px
                  height 20px
                  margin-right 20px
                  &:last-child
                    margin-right 0px
                  &.on
                    bg-image("../stars/star48_on")
                  &.half
                    bg-image("../stars/star48_half")
                  &.off
                    bg-image("../stars/star48_off")
              &.stars-36
                .star
                  width 15px
                  height 15px
                  margin-right 15px
                  &:last-child
                    margin-right 0px
                  &.on
                    bg-image("../stars/star36_on")
                  &.half
                    bg-image("../stars/star36_half")
                  &.off
                    bg-image("../stars/star36_off")
              &.stars-24
                .star
                  width 10px
                  height 10px
                  margin-right 10px
                  &:last-child
                    margin-right 0px
                  &.on
                    bg-image("../stars/star24_on")
                  &.half
                    bg-image("../stars/star24_half")
                  &.off
                    bg-image("../stars/star24_off")


          .info
            width 80%
            margin 0 auto
            margin-bottom 24px
            display flex
            align-items center
            .text
              margin 0 12px 0 12px
              color rgb(255,255,255)
            .line
              flex 1
              width 0
              height 1px
              background rgba(255,255,255,0.2)
          .list
            margin 0 auto
            margin-bottom 28px
            width 80%
            font-size 12px
            line-height 12px
            font-weight 200
            color rgb(255,255,255)
            li
              margin-bottom 12px
              &:last-child
                margin-bottom 0px
              .icon
                vertical-align middle
                display inline-block
                width: 16px
                height 16px
                background-size 100% 100%
                background-repeat no-repeat
                &.decrease
                  bg-image(decrease_2)
                &.discount
                  bg-image(discount_2)
                &.guarantee
                  bg-image(guarantee_2)
                &.invoice
                  bg-image(invoice_2)
                &.special
                  bg-image(special_2)



          .content
            width 80%
            margin 0 auto
            p
              padding 0 12px
              font-size 12px
              line-height 24px
              color rgb(255,255,255)
              font-weight 200
      .mask-footer
        text-align center
        margin-top -64px
        span
          font-size 32px
          color rgba(255,255,255,.5)


</style>
