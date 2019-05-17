# 工作遇到的问题

## post请求错误500，服务端测试没问题，但ajax请求一直500
折腾近一个小时，最后发现是ajax的data不需要用JSON.stringify()转。去掉后就ok了
