import {getGoods, getRatings, getSeller} from '../api'
import {RECEIVE_GOODS, RECEIVE_RATINGS, RECEIVE_SELLER} from './types'
// import * as api from '../api'

const RESULT_OK = 0
export default {

  reqGoods ({commit}, callback) {
    // 发ajax请求, 获取数据
    getGoods().then(response => {
      const result = response.data // {code: 0, data: goods}
      if(result.code===RESULT_OK) {
        const goods = result.data
        // 更新状态
        commit(RECEIVE_GOODS, {goods})

        // 数据得到并更新了对应的状态, 通知调用者
        callback && callback()
      }
    })
  },

  reqRatings ({commit}) {
    getRatings().then(response => {
      const result = response.data // {code: 0, data: goods}
      if(result.code===RESULT_OK) {
        const ratings = result.data
        // 更新状态
        commit(RECEIVE_RATINGS, {ratings})
      }
    })
  },

  reqSeller ({commit}) {
    getSeller().then(response => {
      const result = response.data // {code: 0, data: goods}
      if(result.code===RESULT_OK) {
        const seller = result.data
        seller.score = 3.5
        // 更新状态
        commit(RECEIVE_SELLER, {seller})
      }
    })
  }
}