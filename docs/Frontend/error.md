# 工作遇到的问题

## post请求错误500，服务端测试没问题，但ajax请求一直500,使用的是layui的form表单提交
折腾近一个小时，最后发现是ajax的data不需要用JSON.stringify()转。去掉后就ok了（难道ajax不是提交的json字符串吗？？打印出来明明是json对象，转成字符串反而提交不了了）
