/*
发送ajax请求的模块
 */
import axios from 'axios'
export function getGoods() {
  return axios.get('/api/goods')  // 返回一个promise对象
}

export function getRatings() {
  return axios.get('/api/ratings')
}


export function getSeller() {
  return axios.get('/api/seller')
}