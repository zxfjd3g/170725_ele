# 项目相关问题
## 1. 问题1: 
      Cannot read property '0' of undefined"
      Cannot read property 'avatar' of null"
    原因: 初始化数据对象为{}, 模板中使用了3层的表达式
    解决: 使用v-if, 只有真正有数据进才显示

## 2. Cannot read property '$refs' of undefined
    原因: 非组件的回调函数中的this不是组件对象
    解决: 使用箭头函数定义回调函数    
 
## 3. 状态对象中的属性数据更新了, 但界面不更新   
    原因: 新添加的属性没有数据绑定, 即使数据变化了, 也不可能更新界面
    解决: Vue.set(obj, key, value) // 这样key就是响应式的
    
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
    store/index | state | mutations | actions | getters | types
## 2. header动态组件
    动态请求后台获取数据
        api/index: 包含发送ajax请求的代码(不读取响应数据, 只是返回一个promise对象)
        store/actions: 调用api发送ajax请求获取响应数据, 更新状态
        在组件的mounted(): 通过this.$store.dispatch(actionName)触发action调用, ajax请求获取数据
        在组件中: 利用mapState映射state中的seller数据成计算属性, 在模板中直接使用seller
    过渡动画
## 3. stars组件
    组件的作用
        复用
        简化
    vue组件编写的流程
        创建对应的文件夹和vue文件
        分析并定义出组件的props/state
        使用vue组件: 写标签, 并指定标签属性
        vue文件的实现
    在模板中需要的数据, 从哪取
        data
        props
        computed    

# day04
## 1. goods组件
    动态展现列表数据
    基本滑动
    点击左侧列表项, 右侧滑动到对应位置
    滑动右侧列表, 左侧同步更新
    
## 2. cartcontrol组件

## 3. shopcart组件