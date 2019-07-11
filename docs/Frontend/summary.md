# 时间
4.23-7.10

# 工作内容
## 新系统
### 讲义配送调度系统
- （http://suzhou.xdf.cn/zhuanti/jiaowu2019/index.html ）(admin/1234)
- 背景
    - 分发讲义防止讲义浪费，控制讲义流程，出问题责任人明确，讲义数据分析。
- 负责内容
  - 讲义配送（导入excel）
  - 讲义警报（每隔5秒检查下讲义是否充足）
  - 讲义调度（申请调度和同意拒绝别人的调度）
- 特色
  - 使用了xlsx插件来导入excel表格并传json数据到后端。
  - 封装了excel转json工具

## 旧系统维护
### 巡更系统
- （http://pxsuzhou.xdf.cn/）
- 负责内容
  - 巡更点基础数据增删改查
  - 巡更记录的增删改查
  - 接口json数据导出为excel（各校区值班手机巡检合格率反馈表，不合格情况汇总表，获取每月各校区各值班人巡检不合格详情列表）
- 特色
  - 封装了json转excel工具

### 新东方课酬（绩效）查询平台
- （http://10.124.9.160:8086/）（admin/0000,张锐/0000,计曹晨/0000,李方朝/0000）
- 数据的添加和维护

### 优能一对一系统
- (http://ynsuzhou.xdf.cn/)（admin/1234,023950/123456,zhongxiaoou@xdf.cn/123456）

### 优能一对一系统手机端
- (http://suzhou.xdf.cn/zhuanti/iphoneOne2One2019)（admin/1234,023950/123456,zhongxiaoou@xdf.cn/123456）
- 修改登录功能和刷新问题
- 修改之前的问题

### 学生信息管理系统（http://stsuzhou.xdf.cn/Login/IndexAdmin）（用户名：admin 密码：0000）
- 修改了一些显示

## 专题页面
### 端午节发放福利问卷调查
- （http://suzhou.xdf.cn/zhuanti/Welfare/index.html）
- 背景
  - 人力部门一直使用问卷星做福利发放问卷调查，但是有些人没有交工会费，问卷星不能筛选没有交工会费的人，所以需要我们自己做一个能筛选是否在工会名单里的页面。
- 功能
  - 登录验证是否在工会名单
  - 问卷

### 暑假班选课筛选页
- （http://suzhou.xdf.cn/zhuanti/xdfcls2019/index.html）
- 功能
  - xml数据做成表格并分组显示
  - 筛选功能