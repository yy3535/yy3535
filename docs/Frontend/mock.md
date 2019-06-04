# vue-cli项目中使用mock.js

## 安装
```cmd
cnpm install mockjs axios --save
```
## 配置文件
```js
// mock.js
// 获取mock对象
const Mock = require('mockjs') 
// 随机生成各种数据
const Random = Mock.Random 
// 如果需要基础域名
const domain = 'http://mockjs.com/api' 
// 设置返回状态码
const code = 200 // 返回的状态码

import warning from './warning'

// 随机生成文章数据
const getArticleList = req => {
  // 请求体，用于获取参数
  console.log(req) 
  let articleList = []
  for (let i = 0; i < 10; i++) {
    let article = {
      // 随机生成标题(长度为10-25)
      title: Random.csentence(10, 25), 
      // 随机生成图片(大小250x250)
      icon: Random.dataImage('250x250', '文章icon'), 
      // 随机生成名字
      author: Random.cname(), 
      // 随机生成日期(年月日 + 时间)
      date: Random.date() + ' ' + Random.time() 
    }
    articleList.push(article)
  }
  return {
    code,
    articleList
  }
}

// 请求地址，类型，接口函数（url可以使用以下两种方法）
// url为字符串(需要完全匹配请求的url，只要引入了mock，优先使用mock)
Mock.mock(`${domain}/getArticleList`, 'get', getArticleList);
// url为正则表达式(匹配即可进入接口)
Mock.mock(/\/Warning\/Warning/,'get',warning.warning);
```
```js
// warning.js
export default {
    warning: (request) => {
        const { region } = JSON.parse(request.body)
        let result={
            IsSuccess:true,
            Message:'查询成功',
            List:[]
        }
        return result
    }
}
```

## 引入数据
```js
// main.js
import Mock from './mock'
import axios from 'axios'
// 如果配置的url是字符串，最后的请求url需和配置文件中相同
axios.defaults.baseURL = 'http://mockjs.com/api'
Vue.prototype.$http = axios
```

## 使用
```js
this.$http.get("/getArticleList").then(res => {
  console.log(res);
});
```

## 注意
- code101错误
  - 传的参数不一一对应，解构时出错。
```js
npm install mockjs axios --save
```

```js
// mock.js
const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
const code = 200 // 返回的状态码

// 随机生成文章数据
const postData = req => {

  console.log(req) // 请求体，用于获取参数

  let posts = [] // 用于存放文章数据的数组

  for (let i = 0; i < 10; i++) {
    let post = {
      title: Random.csentence(10, 25), // 随机生成长度为10-25的标题
      icon: Random.dataImage('250x250', '文章icon'), // 随机生成大小为250x250的图片链接
      author: Random.cname(), // 随机生成名字
      date: Random.date() + ' ' + Random.time() // 随机生成年月日 + 时间
    }

    posts.push(post)
  }

  // 返回状态码和文章数据posts
  return {
    code,
    posts
  }
}

// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/posts`, 'get', postData);
```

```js
// main.js
import Mock from './mock' // 刚刚手写的mock.js文件
import axios from 'axios' // axios http请求库

axios.defaults.baseURL = 'http://mockjs.com/api' // 设置默认请求的url
Vue.prototype.$http = axios
```

```js
// 组件
this.$http.get("/posts").then(res => {
  console.log(res);
});
```
