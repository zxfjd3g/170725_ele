import Mock from 'mockjs'
import data from './data.json'

// 通过mockjs向外暴露3个接口
Mock.mock('/api2/goods', {code: 0, data: data.goods})
Mock.mock('/api2/ratings', {code: 0, data: data.ratings})
Mock.mock('/api2/seller', {code: 0, data: data.seller})

// export default ???  不用向外暴露什么

// 当前模块只需要被执行一次, 接口就可以访问了
console.log('执行mockServer...')