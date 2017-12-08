export default {
  cartFoods (state) {
    const foods = []
    state.goods.forEach(good => {
      good.foods.forEach(food => {
        if(food.count) {
          foods.push(food)
        }
      })
    })
    return foods
  },

  totalCount (state, getters) {

    return getters.cartFoods.reduce((preTotal, food) => preTotal+food.count, 0)
  },

  totalPrice (state, getters) {
    return getters.cartFoods.reduce((preTotal, food) => preTotal+food.count*food.price, 0)
  }
}