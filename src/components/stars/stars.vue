<template>
  <div class="stars" :class="'stars-'+size">
    <span class="star" v-for="(sc, index) in starClasses" :key="index" :class="sc"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const CLASS_ON = 'on'
  const CLASS_HALF = 'half'
  const CLASS_OFF = 'off'

  export default {
    props: {
      score: Number,
      size: Number
    },

    /*
    3.4: 3 + 0 + 2
    3.5: 3 + 1 + 1
     */
    computed: {
      starClasses () {
        const scs = []
        const {score} = this
        // 向scs中添加n个CLASS_ON
        const scoreInteger = Math.floor(score)
        for (let i = 0; i < scoreInteger; i++) {
          scs.push(CLASS_ON)
        }
        // 向scs中添加0/1个CLASS_HALF
        if(score*10-scoreInteger*10>=5) {
          scs.push(CLASS_HALF)
        }
        // 向scs中添加n个CLASS_OFF
        while(scs.length<5) {
          scs.push(CLASS_OFF)
        }

        return scs
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
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
        margin-right 10px
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
        margin-right 8px
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
        margin-right 5px
        &:last-child
          margin-right 0px
        &.on
          bg-image("../stars/star24_on")
        &.half
          bg-image("../stars/star24_half")
        &.off
          bg-image("../stars/star24_off")


</style>
