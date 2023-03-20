# git

## 参考文档
  - [阮一峰：常用命令清单](https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
  - [git book](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE)


## 新建代码库

- 在当前目录新建一个Git代码库
$ git init

- 新建一个目录，将其初始化为Git代码库
$ git init [project-name]

- 下载一个项目和它的整个代码历史
$ git clone [url]

## 二、配置
Git的设置文件为.gitconfig，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置）。


- 显示当前的Git配置
$ git config --list

- 编辑Git配置文件
$ git config -e [--global]

- 设置提交代码时的用户信息
$ git config [--global] user.name "[name]"
$ git config [--global] user.email "[email address]"
## 三、增加/删除文件

- 添加指定文件到暂存区
$ git add [file1] [file2] ...

- 添加指定目录到暂存区，包括子目录
$ git add [dir]

- 添加当前目录的所有文件到暂存区
$ git add .

- 添加每个变化前，都会要求确认
- 对于同一个文件的多处变化，可以实现分次提交
$ git add -p

- 删除工作区文件，并且将这次删除放入暂存区
$ git rm [file1] [file2] ...

- 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file]

- 改名文件，并且将这个改名放入暂存区
$ git mv [file-original] [file-renamed]

## 四、代码提交

- 提交暂存区到仓库区
$ git commit -m [message]

- 提交暂存区的指定文件到仓库区
$ git commit [file1] [file2] ... -m [message]

- 提交工作区自上次commit之后的变化，直接到仓库区
$ git commit -a

- 提交时显示所有diff信息
$ git commit -v

- 使用一次新的commit，替代上一次提交
- 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]

- 重做上一次commit，并包括指定文件的新变化
$ git commit --amend [file1] [file2] ...

## 五、分支

- 列出所有本地分支
$ git branch

- 列出所有远程分支
$ git branch -r

- 列出所有本地分支和远程分支
$ git branch -a

- 从远程某个分支拉取一个新分支
$ git checkout -b newbranch origin/oldbranchname

- 新建一个分支，但依然停留在当前分支
$ git branch [branch-name]

- 新建一个分支，并切换到该分支
$ git checkout -b [branch]

- 新建一个分支，指向指定commit
$ git branch [branch] [commit]

- 新建一个分支，与指定的远程分支建立追踪关系
$ git branch --track [branch] [remote-branch]

- 切换到指定分支，并更新工作区
$ git checkout [branch-name]

- 切换到上一个分支
$ git checkout -

- 建立追踪关系，在现有分支与指定的远程分支之间
$ git branch --set-upstream [branch] [remote-branch]

- 合并指定分支到当前分支
$ git merge [branch]

- 选择一个commit，合并进当前分支
$ git cherry-pick [commit]

- 删除分支
$ git branch -d [branch-name]

- 删除远程分支
$ git push origin --delete [branch-name]
$ git branch -dr [remote/branch]

## 六、标签

- 列出所有tag
$ git tag

- 新建一个tag在当前commit
$ git tag [tag]

- 新建一个tag在指定commit
$ git tag [tag] [commit]

- 删除本地tag
$ git tag -d [tag]

- 删除远程tag
$ git push origin :refs/tags/[tagName]

- 查看tag信息
$ git show [tag]

- 提交指定tag
$ git push [remote] [tag]

- 提交所有tag
$ git push [remote] --tags

- 新建一个分支，指向某个tag
$ git checkout -b [branch] [tag]

## 七、查看信息

- 显示有变更的文件
$ git status

- 显示当前分支的版本历史
$ git log

- 显示commit历史，以及每次commit发生变更的文件
$ git log --stat

- 搜索提交历史，根据关键词
$ git log -S [keyword]

- 显示某个commit之后的所有变动，每个commit占据一行
$ git log [tag] HEAD --pretty=format:%s

- 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
$ git log [tag] HEAD --grep feature

- 显示某个文件的版本历史，包括文件改名
$ git log --follow [file]
$ git whatchanged [file]

- 显示指定文件相关的每一次diff
$ git log -p [file]

- 显示过去5次提交
$ git log -5 --pretty --oneline

- 显示所有提交过的用户，按提交次数排序
$ git shortlog -sn

- 显示指定文件是什么人在什么时间修改过
$ git blame [file]

- 显示暂存区和工作区的差异
$ git diff

- 显示暂存区和上一个commit的差异
$ git diff --cached [file]

- 显示工作区与当前分支最新commit之间的差异
$ git diff HEAD

- 显示两次提交之间的差异
$ git diff [first-branch]...[second-branch]

- 显示今天你写了多少行代码
$ git diff --shortstat "@{0 day ago}"

- 显示某次提交的元数据和内容变化
$ git show [commit]

- 显示某次提交发生变化的文件
$ git show --name-only [commit]

- 显示某次提交时，某个文件的内容
$ git show [commit]:[filename]

- 显示当前分支的最近几次提交
$ git reflog

## 八、远程同步

- 下载远程仓库的所有变动
$ git fetch [remote]

- 修剪远程分支(删除被其它终端删除了的远程分支)
$ git remote prune origin

- 显示所有远程仓库
$ git remote -v

- 显示某个远程仓库的信息
$ git remote show [remote]

- 增加一个新的远程仓库，并命名
$ git remote add [shortname] [url]

- 取回远程仓库的变化，并与本地分支合并
$ git pull [remote] [branch]

- 上传本地指定分支到远程仓库
$ git push [remote] [branch]

- 强行推送当前分支到远程仓库，即使有冲突
$ git push [remote] --force

- 推送所有分支到远程仓库
$ git push [remote] --all

## 九、撤销
- 撤销上一个commit,但保留代码在暂存区，不撤销git add
git reset --soft HEAD^

- 恢复暂存区的指定文件到工作区
$ git checkout [file]

- 恢复某个commit的指定文件到暂存区和工作区
$ git checkout [commit] [file]

- 恢复暂存区的所有文件到工作区
$ git checkout .

- 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
$ git reset [file]

- 重置暂存区与工作区，与上一次commit保持一致
$ git reset --hard

- 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
$ git reset [commit]

- 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
$ git reset --hard [commit]

- 重置当前HEAD为指定commit，但保持暂存区和工作区不变
$ git reset --keep [commit]

- 新建一个commit，用来撤销指定commit
- 后者的所有变化都将被前者抵消，并且应用到当前分支
$ git revert [commit]

- 暂时将未提交的变化移除，稍后再移入
$ git stash
$ git stash save "save message" 备注名
$ git stash pop
$ git stash list
$ git stash apply stash@{$num} 应用某个存储,但不会把存储从存储列表中删除
$ git stash drop stash@{$num} 丢弃stash@{$num}存储，从列表中删除这个存储
$ git stash clear 删除所有缓存的stash

## 十、其他

- 生成一个可供发布的压缩包

$ git archive






## git flog
查找历史版本记录，方便回滚


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

mac host
/etc/hosts

## git ssh配置
1.检查是否已经有SSH Key。
```
$cd /.ssh
```
2.生成一个新的SSH。
```
$ ssh-keygen -t rsa -C "email@github.com" #github注册的邮箱
```
之后直接回车，不用填写东西。之后会让你输入密码（可以不输入密码，直接为空，这样更新代码不用每次输入 id_rsa 密码了）。然后就生成一个目录.ssh ，里面有两个文件：id_rsa , id_rsa.pub（id_rsa中保存的是私钥，id_rsa.pub中保存的是公钥）
3.按命令行提示找到公钥地址。跳转文件夹是访达菜单中的前往-前往文件夹，显示隐藏文件夹按`shift+command+.`。文件权限右击文件-显示简介-解锁-修改为只读。将公钥复制到github上。
4. `ssh -T git@github.com`测试，显示success则配置成功可以clone了
5. 显示`Permission denied(publickey)`，使用`ssh -vT git@github.com`来查看错误log，注意其中的查找公钥地址。将公钥复制到它查找的地址中即可。
