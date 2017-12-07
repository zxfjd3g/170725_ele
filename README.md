# 项目相关问题
## 1. 问题1: 
      Cannot read property '0' of undefined"
      Cannot read property 'avatar' of null"
    原因: 初始化数据对象为{}, 模板中使用了3层的表达式
    解决: 使用v-if, 只有真正有数据进才显示
    
    
    
# day01
## 1. 项目开发准备
    如何描述项目: 整体功能 / 功能模块 / 主体技术 / 开发模式
    技术选型: 数据展现与交互 / 前后台交互 / 模块化 / 组件化 / 工程化 / css预编译器 / 滑动
    接口相关概念: 接口 / 接口文档 / 对(调/测)接口 / 前后台分离 / mock数据(接口)
    项目的编码测试与打包发布

## 2. 搭建项目骨架
    vue-cli
    vue
    webpack
    es6
    eslint
    vue-router
    stylus
    
## 3. mock数据(接口)
    理解前后台分离
    设计json数据
        结构: 类型/名称
        value
    如何提供mock接口
        express: 可以使用浏览器/postman测试, 但只能提供静态数据, 打包发布不能访问了
        mockjs: 只能通过编码测试访问, 但可以提供动态随机数据, 打包发布还可以访问
    编码ajax请求mock接口
        vue-resource
        axios

# day02
## 1. header静态组件
    使用stylus根据标注图编写移动端布局
    图标字体
    1px像素边框
    stiky footer(粘连)布局
    2x与3x图
    flex布局
    
# day03
## 1. 使用vuex
## 2. header动态组件
## 3. star组件