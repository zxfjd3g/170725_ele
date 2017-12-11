import Vue from 'vue'
import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_SELLER,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART_FOODS
} from './types'

export default {
  [RECEIVE_GOODS] (state, {goods}) {
    state.goods = goods
  },

  [RECEIVE_RATINGS] (state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_SELLER] (state, {seller}) {
    state.seller = seller
  },

  [INCREMENT_FOOD_COUNT] (state, {food}) {
    if(food.count) {
      food.count++
    } else {
      // food.count = 1  // 给对象添加新的属性 (没有数据绑定)
      Vue.set(food, 'count', 1)
    }
  },

  [DECREMENT_FOOD_COUNT] (state, {food}) {
    if(food.count) {
      food.count--
    }
  },

  [CLEAR_CART_FOODS] (state, {cartFoods}) {
    cartFoods.forEach(food => food.count=0)
  }
}