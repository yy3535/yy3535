# 新东方信管部-系统工程师
[[toc]]
## 工作内容
## 系统
### 优能一对一系统
- 背景
- (http://ynsuzhou.xdf.cn/)（admin/1234,023950/123456,zhongxiaoou@xdf.cn/123456）
- 本地服务器(admin/1234,023950/123456)
- XSS攻击防御库：DOMPurify
  
### 优能一对一系统手机端
- (http://suzhou.xdf.cn/zhuanti/iphoneOne2One2019)（admin/1234,023950/123456,zhongxiaoou@xdf.cn/123456）
- 10.124.14.193:1853
:::warning 负责内容
- 登录功能，用cookie和sessionStorage优化，刷新vuex数据消失功能优化
:::

- 后端配置了跨域后，登录接口跨域，其它接口不跨域。然后前端设置代理后解决了。
- 常用的包统一一处import问题需要解决
- 富文本内容不能直接v-html显示出来，安全问题。`<img src="x" onerror="alert()"/>`

### 学生信息管理系统
- （http://stsuzhou.xdf.cn/Login/IndexAdmin）（用户名：admin 密码：0000）
:::warning 负责内容
- 修改了一些显示,分享页面数据功能修改
- 特色
  - Razor模板引擎
:::
### 新东方课酬（绩效）查询平台
![课酬平台](./img/dollarsSystem.jpg)
- （http://10.124.9.160:8086/）（admin/0000,张锐/0000,计曹晨/0000,李方朝/0000）
:::warning 负责内容
- 数据的添加和维护，layui table多级表头
- 点击定位，返回顶部
- 点击隐藏其他无关紧要的，返回顶部后全部显示

:::
- 特色
  - layui table多级表头
```css
/*layui 多级表头样式问题*/
.layui-table thead th {
    background-color: #f2f2f2 !important;
}
.layui-table tbody tr:hover{
    background-color:#fff !important;
}
.layui-table td, .layui-table th{
    position:static !important;
}
```
### 讲义配送调度系统
- （http://suzhou.xdf.cn/zhuanti/jiaowu2019/index.html ）(admin/1234)
- 背景
    - 分发讲义防止讲义浪费，控制讲义流程，出问题责任人明确，讲义数据分析。
:::warning 负责内容
  - 讲义配送（导入excel）
  - 讲义警报（每隔5秒检查下讲义是否充足）
  - 讲义调度（申请调度和同意拒绝别人的调度）
:::
- 特色
  - 使用了xlsx插件来导入excel表格并传json数据到后端。
  - 封装了excel转json工具
- 问题
  - 调用store里的方法，含有异步方法的，调用的时候也要await。
  - created方法失效：因为里面已经加了created方法，在最后。。。
  - mock数据无法使用，报错code101，改了各种地方没有用，新建项目测试可用。后来下载几个svn版本对比分析，因为之前可以用。最后发现是mock解析传进来的参数时参数名字不对。在某一版的时候后端的登录参数名称改了，参数重写后可以用了。
  - 一次演示系统会议。教务部门说需要测试地址，同事说周三再给，然后他们说不行，再两周就要培训了。然后我说可以布自己服务器。下午就给他们
  - 请求头添加token
  - 加验证码
  - 移动端app
### 巡更系统
- （http://suzhou.xdf.cn/zhuanti/xungengscanner/）(zhoumeng11/1234)
:::warning 负责内容
  - 巡更点基础数据增删改查
  - 巡更记录的增删改查
  - 接口json数据导出为excel（各校区值班手机巡检合格率反馈表，不合格情况汇总表，获取每月各校区各值班人巡检不合格详情列表）
:::
- 特色
  - 封装了json转excel工具
  - 适用插件vue-qr生成二维码


## 专题页面
- 问题
  - 人人秀(rrxiu.net)免费H5页面制作工具
  - 自己做了一个信管开发部所有项目的整合网页。（南昌：http://xk722.cn/）
  - 所有静态文件都放在苏州自己的服务器上
  - node做的后端数据接口
### qq群添加
- 10.124.14.193:1857
- 图片居中问题，居然用给父元素添加padding解决了。。。所有方法都无效。。
### 小学托福报名单页
- rem自适应

### 端午节发放福利问卷调查
- （http://suzhou.xdf.cn/zhuanti/Welfare/index.html）
- 背景
  - 人力部门一直使用问卷星做福利发放问卷调查，但是有些人没有交工会费，问卷星不能筛选没有交工会费的人，所以需要我们自己做一个能筛选是否在工会名单里的页面。
  - 因为集团的服务器我们是不能操作的，这个页面打算放在集团的专题上面。头问我能不能纯前端操作服务器上的excel文件，提交礼物需求，查了半个小时发现不可行，然后我询问是否可以使用LeanCloud之类的后端服务，又问能把后端放我们自己的服务器上吗，询问了跨域已解决，最终决定前端放在总部云办公的服务器上，后端放在苏州学校自己的服务器上。
:::warning 功能
  - 登录验证是否在工会名单
  - 问卷
:::
- 技术栈
  - jq
    - 因为是需要上传到集团系统的文件，不清楚vue是否会出未知问题，需求又比较紧急，最多两天时间完成，所以选了直接下载下来的模板用的jq
  - layui
    - 因为使用的jq，又有两处表单提交，所以用了layui
- 问题
  - post请求错误500，服务端测试没问题，但ajax请求一直500,使用的是layui的form表单提交
    - 折腾近一个小时，最后发现是ajax的data不需要用JSON.stringify()转。去掉后就ok了（难道ajax不是提交的json字符串吗？？打印出来明明是json对象，转成字符串反而提交不了了）
  - 前后端分离，前端发送请求，cookies后端接受不到
    - 不用vue等框架，无法前端路由
  - cookies里能不能存放明文用户名
    - 最终放了明文用户名，并且在页面做了用户未登录跳转，先验证是否登陆，再显示出DOM.
  - 安全问题
    - 因为我判断用户已提交是用的display:none将表单隐藏，如果有人直接在浏览器修改css，就能修改数据了（前提是知道密码，表单页面验证了是否有cookies，没有就跳转回登陆页。）
    - XSS攻击，没有防御，可能是需要后端做的》
  - 提交成功页面在qq浏览器和ios的浏览器中会返回到表单页面并且不会刷新的问题
    - 把location.href="xxx"改成了location.replace("xxx")，避免了返回到表单页面，只会返回到登录页面。
### 暑假班选课筛选页
- （http://suzhou.xdf.cn/zhuanti/xdfcls2019/index.html）
- 背景
  - 比较紧急，花费一天
:::warning 功能
  - xml数据做成表格并分组显示
  - 筛选功能
:::
- 技术栈
  - 使用jquery，自己写的筛选下拉框组件
  - 纯手写H5页面
- 问题
  - http-server启动服务以便能够用ajax获取数据？？？
  - 看专题wx支付页面，转成自己的作品。




## 本机IP
10.124.14.193

## 接口文档管理
showdoc