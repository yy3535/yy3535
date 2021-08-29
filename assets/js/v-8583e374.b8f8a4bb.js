"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3083],{1540:(n,a,s)=>{s.r(a),s.d(a,{data:()=>e});const e={key:"v-8583e374",path:"/frontend/markdown.html",title:"markdown",lang:"en-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"语法",slug:"语法",children:[]},{level:2,title:"预览和编辑器",slug:"预览和编辑器",children:[]},{level:2,title:"mermaid",slug:"mermaid",children:[{level:3,title:"图形",slug:"图形",children:[]},{level:3,title:"节点和形状",slug:"节点和形状",children:[]},{level:3,title:"节点之间的连接",slug:"节点之间的连接",children:[]},{level:3,title:"子图",slug:"子图",children:[]},{level:3,title:"样式链接",slug:"样式链接",children:[]},{level:3,title:"对fontawesome的基本支持",slug:"对fontawesome的基本支持",children:[]}]}],filePathRelative:"frontend/markdown.md",git:{updatedTime:1629449373e3,contributors:[]}}},693:(n,a,s)=>{s.r(a),s.d(a,{default:()=>l});const e=(0,s(6252).uE)('<h1 id="markdown" tabindex="-1"><a class="header-anchor" href="#markdown" aria-hidden="true">#</a> markdown</h1><h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法</h2><p>1.标题</p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 一级标题</span>\n<span class="token title important"><span class="token punctuation">##</span> 二级标题</span>\n<span class="token title important"><span class="token punctuation">###</span> 三级标题</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>2.列表</p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code><span class="token list punctuation">-</span> 1\n<span class="token list punctuation">-</span> 2\n<span class="token list punctuation">-</span> 3\n<span class="token list punctuation">1.</span> 列表1\n<span class="token list punctuation">2.</span> 列表2\n<span class="token list punctuation">3.</span> 列表3\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>3.引用</p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code><span class="token blockquote punctuation">&gt;</span> 这是一个引用\n<span class="token blockquote punctuation">&gt;&gt;</span> 二级引用\n<span class="token blockquote punctuation">&gt;&gt;&gt;</span> 三级引用\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>4.分割线</p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code><span class="token hr punctuation">---</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>5.链接</p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code><span class="token url">[<span class="token content">链接1</span>](<span class="token url">www.baidu.com</span>)</span>\n[链接2]:www.baidu.com\n这是链接：<span class="token url">[<span class="token content">链接2</span>][<span class="token variable">链接1</span>]</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>6.图片</p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code><span class="token url"><span class="token operator">!</span>[<span class="token content">图片1</span>](<span class="token url">https://www......gif</span>)</span>\n<span class="token url"><span class="token operator">!</span>[<span class="token content">图片1</span>](<span class="token url">./xxx.png</span>)</span>\n[图片2]:https://www......jpg\n这是图片：<span class="token url"><span class="token operator">!</span>[<span class="token content">图片1</span>][<span class="token variable">图片2</span>]</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>7.代码框</p><ul><li>所有的html标签标签必须用代码框框起来，少的用单行，多的用多行，否则都会报错。</li></ul><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code>单行：\n\t<span class="token code-snippet code keyword">`&lt;p&gt;…&lt;/p&gt;`</span>\n多行：\n\t```js/md/php等语言\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>…<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n\t```\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>8.字体强调</p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code><span class="token italic"><span class="token punctuation">*</span><span class="token content">倾斜</span><span class="token punctuation">*</span></span>\n<span class="token bold"><span class="token punctuation">**</span><span class="token content">加粗</span><span class="token punctuation">**</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>9.删除线</p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code><span class="token strike"><span class="token punctuation">~~</span><span class="token content">删除</span><span class="token punctuation">~~</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>10.表格</p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code><span class="token table"><span class="token table-header-row"><span class="token punctuation">|</span><span class="token table-header important"> 左对齐标题 </span><span class="token punctuation">|</span><span class="token table-header important"> 右对齐标题 </span><span class="token punctuation">|</span><span class="token table-header important"> 居中对齐标题 </span><span class="token punctuation">|</span>\n</span><span class="token table-line"><span class="token punctuation">|</span> <span class="token punctuation">:------</span><span class="token punctuation">|</span> <span class="token punctuation">------:</span> <span class="token punctuation">|</span> <span class="token punctuation">:------:</span> <span class="token punctuation">|</span>\n</span><span class="token table-data-rows"><span class="token punctuation">|</span><span class="token table-data"> 短文本 </span><span class="token punctuation">|</span><span class="token table-data"> 中等文本 </span><span class="token punctuation">|</span><span class="token table-data"> 稍微长一点的文本 </span><span class="token punctuation">|</span>\n<span class="token punctuation">|</span><span class="token table-data"> 稍微长一点的文本 </span><span class="token punctuation">|</span><span class="token table-data"> 短文本 </span><span class="token punctuation">|</span><span class="token table-data"> 中等文本 </span><span class="token punctuation">|</span>\n</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>11.转义</p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code>/\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>12.目录</p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code>[[toc]]\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>13.目录结构</p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code>root\n├─── public.js\n│   ├── common.js\n\t├── layout.js\n└─── util.js\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>14.水平分割线 使用一个单独行里的三个或以上 *、- 来生产一条水平分割线，它们之间可以有空格</p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code><span class="token hr punctuation">***</span>\n\n<span class="token hr punctuation">-----</span>\n\n<span class="token hr punctuation">- - -</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>15.嵌入 HTML 对于那些没有办法用 Markdown 语法来对应的 HTML 标签，直接使用 HTML 来写就好了。</p><h2 id="预览和编辑器" tabindex="-1"><a class="header-anchor" href="#预览和编辑器" aria-hidden="true">#</a> 预览和编辑器</h2><p><code>typora</code><code>vscode</code><code>vuepress</code></p><h2 id="mermaid" tabindex="-1"><a class="header-anchor" href="#mermaid" aria-hidden="true">#</a> mermaid</h2><h3 id="图形" tabindex="-1"><a class="header-anchor" href="#图形" aria-hidden="true">#</a> 图形</h3><p>//该语句声明了一个新图形和图形布局的方向。</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>graph <span class="token constant">TD</span>\n开始 <span class="token operator">--</span><span class="token operator">&gt;</span> 结束\n方向是：\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul><li>TB - 从上到下</li><li>BT - 从下到上</li><li>RL - 从右到左</li><li>LR - 从左到右</li><li>TD - 与TB相同</li></ul><p>image</p><h3 id="节点和形状" tabindex="-1"><a class="header-anchor" href="#节点和形状" aria-hidden="true">#</a> 节点和形状</h3><ol><li>节点</li></ol><p>默认节点就是默认的内容</p><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code>graph LR\n\tstart\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>image</p><ol><li>带有文本的节点</li></ol><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code>graph LR\n\tstart[开始]\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>image</p><ol start="2"><li>具有圆边的节点</li></ol><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code>graph LR\n\tstart(开始)\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>image 3. 圆形的节点</p><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code>graph LR\n\tstart((开始))\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>image 4. 非对称形状的节点</p><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code>graph LR\n    start&gt;开始]\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>image 5. 菱形节点</p><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code>graph LR\n    start{开始}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>image</p><h3 id="节点之间的连接" tabindex="-1"><a class="header-anchor" href="#节点之间的连接" aria-hidden="true">#</a> 节点之间的连接</h3><ol><li>带箭头的连接</li></ol><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code>graph LR\n  A --&gt; B\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>image 2. 没有箭头的连接</p><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code>graph LR\n  A --- B\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>image</p><ol start="3"><li>连接上的文字</li></ol><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code>graph LR\n  A-- 连接上的文字 ---B\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>或者</p><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code>graph LR\n    A---|连接上的文字|B\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>image</p><ol start="4"><li>带箭头和文字的连接</li></ol><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code>graph LR\n    A--&gt;|带箭头和文字的连接|B\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>或者</p><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code>graph LR\n    A-- 带箭头和文字的连接 --&gt;B\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>image</p><ol><li>虚线连接</li></ol><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code>graph LR\n   A-.-&gt;B\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>image</p><ol><li>带文字的虚线连接</li></ol><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code>graph LR\n   A-. 带文字的虚线连接 .-&gt; B\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>image</p><ol><li>粗连接</li></ol><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code>graph LR\n   A ==&gt; B\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>image</p><ol><li>带文本的粗连接</li></ol><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code>graph LR\n   A == 带文本的粗连接 ==&gt; B\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>image</p><ol><li>破坏语法的特殊字符 可以将文本放在引号内以便渲染更麻烦的字符</li></ol><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code>graph LR\n    id1[&quot;破坏语法的特殊字符!&quot;]\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>image （10） 实体代码转义字符</p><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code> graph LR\n        A[&quot;这里有个引号#quot;&quot;] --&gt;B[&quot;特殊字符:#9829;&quot;]\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>image</p><h3 id="子图" tabindex="-1"><a class="header-anchor" href="#子图" aria-hidden="true">#</a> 子图</h3><p>语法：</p><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code>subgraph title\n    graph definition\nend\ngraph TB\n    c1--&gt;a2\n    subgraph one\n    a1--&gt;a2\n    end\n    subgraph two\n    b1--&gt;b2\n    end\n    subgraph three\n    c1--&gt;c2\n    end\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>image</p><h3 id="样式链接" tabindex="-1"><a class="header-anchor" href="#样式链接" aria-hidden="true">#</a> 样式链接</h3><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code>graph LR\n    id1(Start)--&gt;id2(Stop)\n    style id1 fill:#f9f,stroke:#333,stroke-width:4px\n    style id2 fill:#ccf,stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>image</p><h3 id="对fontawesome的基本支持" tabindex="-1"><a class="header-anchor" href="#对fontawesome的基本支持" aria-hidden="true">#</a> 对fontawesome的基本支持</h3><p>图标通过语法fa：#icon class name＃来获取</p><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code>graph TD\n    B[&quot;fa:fa-twitter 和平&quot;]\n    B--&gt;C[fa:fa-ban 禁止]\n    B--&gt;D(fa:fa-spinner);\n    B--&gt;E(A fa:fa-camera-retro 也许?);\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>',100),l={render:function(n,a){return e}}}}]);