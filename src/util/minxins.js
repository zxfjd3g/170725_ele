export const ratingMixin = {
  data () {
    return {
      onlyContent: true,
      selectType: 2  // 2: 全部  1: 吐槽  0: 推荐
    }
  },

  methods: {
    toggleOnlyContent() {
      this.onlyContent = !this.onlyContent
      // 刷新滚动
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },

    setSelectType(selectType) {
      this.selectType = selectType
      // 刷新滚动
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },

  computed: {
    filterRatings() {
      const ratings = this.ratings || this.food.ratings

      if (!ratings) {  // 当没有指定数据时, 返回一个空数组
        return []
      }

      const {onlyContent, selectType} = this
      return ratings.filter(rating => {
        /*
        onlyContent: true/false   对应的数据: rating.text
        selectType: 0/1/2         对应的数据: rating.rateType  0/1
         */
        // 条件1: 如果onlyContent为false, 对文本没有要求, 如果onlyContent为true, 文本必须有内容
        !onlyContent || rating.text.length > 0
        // 条件2: 如果selectType为2, 对rateType没有要求, 如果selectType为0/1, rateType必须与selectType相等
        selectType === 2 || selectType === rating.rateType
        return (!onlyContent || rating.text.length > 0) && (selectType === 2 || selectType === rating.rateType)
      })
    }
  }
}


