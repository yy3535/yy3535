# Nginx
- 轻量级HTTP服务器，事件驱动的异步非阻塞处理方式，具有极好的IO性能，用于服务端的反向代理和负载均衡
- 静态服务首选nginx

## 搭建安装
```md
<!-- 环境 -->
yum -y install gcc gcc-c++ autoconf pcre pcre-devel make automake openssl openssl-devel
yum -y install wget httpd-tools vim
<!-- 配置nginx源地址 -->
<!-- 创建nginx源配置文件，修改目录centos和7 -->
vi /etc/yum.repos.d/nginx.repo
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/7/$basearch/gpgcheck=0
enabled=1
<!-- 编辑好文件后安装 -->
yum install nginx -y
```

## 基本配置
```md
<!-- 查询nginx安装目录 -->
rpm -q nginx
<!-- 启动服务 -->
systemctl start nginx
<!-- 查看端口号 -->
ps -ef | grep nginx
netstat -lnp 80
<!-- 关闭服务 -->
systemctl stop nginx
<!-- 修改配置文件 -->
cd /etc/nginx/
cat nginx.conf
```
- 外网ip来访问页面
















