# git

## gitignore
根目录中创建.gitignore
- /TODO     # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO

> 创建.gitignore方法
1. 先创建gitignore.txt
2. 打开命令行，到gitignore.txt目录下输入ren gitignore.txt .gitignore，修改成功

## git上传 403错误
github上面个人邮箱需要重新认证，认证完就可以上传了。

## git clone 源码地址 (文件夹名称)(可选)
拷贝源码进入某文件夹(可选)

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

## 创建分支
git checkout -b xxx

## 查看分支
git branch

## 切换分支
clone完源码后，在源码目录下，执行以下，即可切换。代码改动后没有提交是无法切换的。
```js
git checkout master
git checkout dev
```

## git创建网站
1. 注册账号

2. 创建一个新仓库，名称必须为：username.github.io，username是你的github用户名。

   ![图片](https://images.cnblogs.com/cnblogs_com/camille666/1124936/o_create_repo.png)

3. 把该仓库克隆到本地，新建index.html,js,css,img。本地浏览后，git提交代码到仓库。

   即可访问<https://zhugeshuiying.github.io/>

## git 放弃本地修改，强行拉取更新(慎用)
```js
git fetch --all
git reset --hard origin/master
git pull //可以省略
```

## git reset --hard恢复操作
```js
// 所有commit过的操作，最后commit的在最上面0的位置上
git reflog
// 恢复commmit的文件
git reset --hard 98abc5a
```

## 下载某个版本
git log 查看版本号
git checkout b74be8e78ff*****0a15d04967（版本号）

## git提交时出现non-fast-forward冲突
- 原因
  - git仓库已有部分代码，不允许直接代码覆盖
- 方式
  - 强制用本地代码覆盖git仓库内容
    - git push -f
  - 先把git的东西fetch到本地然后merge再commit push上去
    - git fetch
    - git merge(输完去文件中解决冲突)
    - git add .
    - git commit -m -a
    - git push origin master


## npm install 出现 ChromeDriver installation failed Error with http(s) request: Error: read ETIMEDOUT
- 执行 npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver


## git下载缓慢解决办法
- 更改hosts文件
1. 查询网站的IP地址，进入![dns](http://tool.chinaz.com/dns)，输入 `github.com`，选择一个TTL值较小的IP地址，比如，我们选择图中美国的192.30.253.113；

2. 打开电脑的 `C:\Windows\System32\drivers\etc` 目录，找到hosts文件:这里有两个hosts文件，用记事本打开上面的那个进行编辑。在文件末追加 192.30.253.113 github.com，并采用相同的方式追加并采用相同的方式追加151.101.109.194  github.global.ssl.fastly.Net  注意：前面没有“#”号！

3. 刷新DNS缓存，在Windows命令行中输入：`ipconfig /flushdns`


4. 再重新输入`git clone https://github.com/opencv/opencv_contrib/`,可以看到下载速度得到明显提升,相应的文件也很快下载完毕。