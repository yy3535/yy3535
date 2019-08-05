# ASP.NET

## C\#

### 注意

- ''char
- ""string

## 路由

- visual studio编辑器中打开在某个页面，启动时会自动打开开着的那个页面

## Razor模板引擎

- 一种标记语法，用于将基于服务器的代码嵌入网页中
- 包含 Razor 的文件通常具有 .cshtml 文件扩展名。
- 由 Razor 标记、C# 和 HTML 组成
- 作用
  - 计算 `C#` 表达式，并将它们呈现在 HTML 输出中。

### 语法

- @后跟 Razor 保留关键字时，它会转换为 Razor 特定标记。
- 单个@把HTML转换为C#。
- @ 符号进行转义`@@Username`

#### 隐式 Razor 表达式

- 以 @ 开头，后跟 C# 代码
- 不能包含空格

```csharp
<p>@DateTime.Now</p>
<p>@DateTime.IsLeapYear(2016)</p>
```

- @{}
  - 代码块内的 C# 代码不会呈现
    - 代码块中的默认语言为 C#，不过，Razor 页面可以转换回 HTML
- @()
  - 表达式
- 全部使用C#语法

```csharp
<td rowspan="@(item.ClassTests.Count == 0 ? 1 : item.ClassTests.Count)">
    @{
        var name = "";
        var length=item.StuName.Length;
        if(length==2){
            name=item.StuName.Substring(0,1)+"*";
        }else if(length==3){
            name=item.StuName.Substring(0,1)+"*"+item.StuName.Substring(2);
        }else if(length==4){
            name=item.StuName.Substring(0,1)+"**"+item.StuName.Substring(3);
        }
    }
    @(item == null ? "无学生信息" : @name)
</td>
```
