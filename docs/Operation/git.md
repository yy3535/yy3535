# git

## gitignore
根目录中创建.gitignore
- /TODO     # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO

> 创建.gitignore方法
1. 先创建gitignore.txt
2. 打开命令行，到gitignore.txt目录下输入ren gitignore.txt .gitignore，修改成功

## git上传 403错误
github上面个人邮箱需要重新认证，认证完就可以上传了。

## git add 文件名/.

## git commit -m '注释' -a
从本地到版本区，跳过暂存区

## git push origin master
添加到github上

## git pull
将本分支的远程代码更新到本地

## git status
查看现在本地文件的状态

## git flog
查找历史版本记录，方便回滚

## git remote
查看远程仓库的名称

## git remote -v
查看远程仓库的地址

## git创建网站
1. 注册账号

2. 创建一个新仓库，名称必须为：username.github.io，username是你的github用户名。

   ![图片](https://images.cnblogs.com/cnblogs_com/camille666/1124936/o_create_repo.png)

3. 把该仓库克隆到本地，新建index.html,js,css,img。本地浏览后，git提交代码到仓库。

   即可访问<https://zhugeshuiying.github.io/>

## git 放弃本地修改，强行拉取更新

git fetch --all
git reset --hard origin/master
git pull //可以省略




