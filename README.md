# 项目相关问题(重要)
## 1. 初始化显示时出错
     Cannot read property '0' of undefined"
     Cannot read property 'avatar' of null"
    原因: 初始化数据对象为{}, 模板中使用了3层的表达式
    解决: 使用v-if, 只有真正有数据进才显示

## 2. 在组件中, 非组件的回调函数中更新状态, 界面不变化
    原因: 非组件的回调函数中的this不是组件对象
    解决: 使用箭头函数定义回调函数    
 
## 3. 创建好BScroll对象, 样式都生成了, 就是不能滑动
    原因: 创建BScroll对象时, 列表没有显示(状态已经更新, 但列表更新是异步的)
    解决: 在列表更新之后才创建BScroll对象: this.$nextTick(() => {创建BScroll对象})

## 4. 更新状态数据, 对应的界面不变化
    原因: 一般方法给一个已有绑定的对象中添加一个新的属性, 这个属性没有数据绑定
    解决: this.$set(obj, 'xxx', value)才有数据绑定
          Vue.set(obj, 'xxx', value)才有数据绑定

## 5. 点击添加购物项, 会1次添加多个
    原因: 创建了多个BScroll对象来管理同一个DOM元素
    解决: 只创建一个BScroll对象 
    扩展: 单例对象: 
        创建前, 先判断是否已经存在, 只有不存在才创建
        创建后, 保存创建的对象
        
## 6. 点击添加购物项时, 同时还打开食物详情
    原因: 外部元素也响应了点击事件, 因为事件有冒泡
    解决: 停止事件冒泡 @click.stop="xxx"

## 7. 如果从其它路由切换过来显示没有问题, 如果直接刷新当前路由就报错
    原因: 两种访问的方式, 创建组件对象时, 传给组件对象的数据不一样
    解决: 在初始化, 判断只有有数据时才创建Scroll对象    ---从其它路由跳转过来
          监视数据的变化, 当数据变化时创建Scroll对象    ---在当前路由上刷新

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
    使用vuex管理food的count
    transition动画
    
## 3. shopcart组件
    BScroll的创建和刷新
    
# day05
## 1. food组件
    父组件中调用子组件的方法: this.$refs.child.fn()
    列表的过滤显示: 计算属性-->arr.filter()-->
    
## 2. ratingselect组件
    父子组件通信: vue自定义事件机制
        绑定事件监听: 父组件中, 通过子组件标签 @xxx='fn'
        分发事件: 子组件中, this.$emit('xxx', data)
        
## 3. ratings组件
    多个组件重复的代码如何简化: minxin技术
        在minxins中定义包含相同组件配置代码的对象
        在多个组件中通过mixins配置引入定义在minxins中的代码
        
## 4. seller组件    
    异常问题的分析
    数据监视
    
## 5. vue插件
    1). vue-lazyload: 图片懒加载
        npm install --save vue-lazyload
        import VueLazyload from 'vue-lazyload'
        import loading from './common/imgs/loading.gif'
        Vue.use(VueLazyload, {
          loading
        }) // 内部会自定义一个全局指令 lazy来实现图片懒加载
        <img v-lazy="food.image">
    2). vue-scroller: 界面滑动
        npm install --save vue-scroller@2.2.1
        import VueScroller from 'vue-scroller'
        Vue.use(VueScroller)
        <scroller>列表div</scroller>

# day05
## 1. 小球动画
    1). 在页面定义6个小球的div, 并实现6个小球循环使用 (比每次创建一个新的div效率要高)
    2). 利用vue中transition的钩子(生命周期回调函数)函数去控制动画(动画的起始是动态的, 通过样式无法指定)
    3). 小球是两个嵌套的div组成(x轴与y轴的动画效果是不一样的)
    4). 组件(父子或兄弟)间通信
        PubSubJS(消息订阅与发布/全局事件总线)
    5). 强制重排与重绘
        https://www.cnblogs.com/zichi/p/4720000.html

## 2. vue UI库使用: mint-ui/element-ui/iview
    引入mint-ui
    实现按需自动打包使用的组件和样式
    组件的分类
        标签组件
        函数组件

## 3. 路由组件缓存与懒加载
    路由组件缓存: 
        <keep-alive><router-view/></keep-alive>
    懒加载: 
        import goods from '../pages/goods/goods.vue'
        const goods = () => import('../pages/goods/goods.vue')
        
## 3. 百度地图API
    注册账号
    进入控制台创建一个虚拟应用--> 得到AK
    利用DEMO和类参考来实现自己的功能
    
## 4. 短信验证登陆功能
    1). 注册/登陆容联的账号
        ACCOUNT SID：8aaf070855b647ab0155b9f80994058a
        AUTH TOKEN：aa8aa679414e49df8908ea5b3d043c24
        Rest URL(生产)：https://app.cloopen.com:8883
        AppID(默认)：8aaf070855b647ab0155b9f809f90590
    2). 添加测试号码: 
        至少要有一个是你自己的
    3). 后台应用
        接口1: 处理发送验证的请求
            地址: http://localhost:3000/sendcode
            路由回调中:
               1. 获取请求中手机号: phone
               2. 生成一个随机数据验证码: code
               3. 向容联的接口发请求, 传phone和code, 并向前台返回数据: {code:0}
               4. 当容联的请求返回后, 如果成功, 保存phone和code: users[phone] = code
        接口2: 处理登陆请求
            地址: http://localhost:3000/login
               1. 获取请求中手机号: phone和输入的验证码: code
               2. 读取phone对应的code: users[phone], 与输入的验证码code进行比较
               3. 如果不同, 返回一个响应标识登陆失败
               4. 根据phone去数据库集合中查询对应的数据, 如果没有保存, 返回一个标识登陆成功的响应
    4). 前台应用
        地址: http://localhost:8081   相对于后台是跨域
        利用proxy(代理)解决跨域的问题:
            proxyTable: {
              '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
			      '^/api': '/'
			    }
              }
            }
        请求发送验证码: 
            axios.get(`/api/sendcode?phone=${this.phone}`).then(response => {
              alert(response.data.code) // 0
            })
        请求登陆:
            axios.post('/api/login', {phone: this.phone, code: this.code}).then(response => {
              const result = response.data
              if (result.code == 0) {
                const user = result.data
                alert(`登陆成功: ${user.phone}`)
              } else {
                alert(`登陆失败, 请输入正确的手机号和验证码`)
              }
            })
