(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{181:function(t,e,a){"use strict";a.r(e);var r=a(0),n=Object(r.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("h1",{attrs:{id:"xlsx"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#xlsx","aria-hidden":"true"}},[t._v("#")]),t._v(" xlsx")]),t._v(" "),a("h2",{attrs:{id:"安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装","aria-hidden":"true"}},[t._v("#")]),t._v(" 安装")]),t._v(" "),a("p",[t._v("npm install xlsx")]),t._v(" "),a("h2",{attrs:{id:"导入"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#导入","aria-hidden":"true"}},[t._v("#")]),t._v(" 导入")]),t._v(" "),a("p",[t._v("import XLSX from 'xlsx';")]),t._v(" "),a("h2",{attrs:{id:"使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用","aria-hidden":"true"}},[t._v("#")]),t._v(" 使用")]),t._v(" "),a("p",[t._v('XLSX.read(data, read_opts) attempts to parse data.\nlet reader = new FileReader();\nreader.readAsBinaryString(file);\nreader.onload=function(e){\nlet data = e.target.result;\nlet sheet = XLSX.read(data, { type: "binary" }).Sheets.Sheet1;\n}')]),t._v(" "),a("h3",{attrs:{id:"typeexpected-input"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#typeexpected-input","aria-hidden":"true"}},[t._v("#")]),t._v(" type\texpected input")]),t._v(" "),a("p",[t._v('"base64"\tstring: Base64 encoding of the file\n"binary"\tstring: binary string (byte n is data.charCodeAt(n))\n"string"\tstring: JS string (characters interpreted as UTF8)\n"buffer"\tnodejs Buffer\n"array"\tarray: array of 8-bit unsigned int (byte n is data[n])\n"file"\tstring: path of file that will be read (nodejs only)')]),t._v(" "),a("h3",{attrs:{id:"单元格对象"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#单元格对象","aria-hidden":"true"}},[t._v("#")]),t._v(" 单元格对象")]),t._v(" "),a("p",[t._v("|v|原始值（有关详细信息，请参阅数据类型部分）|\n|w|格式化文本（如果适用）|\n|t|type：b布尔值，e错误，n数字，d日期，s文本，z存根|\n|f|单元格公式编码为A1样式的字符串（如果适用），如果公式是数组公式，则F范围的封闭数组（如果适用）|\n|r|富文本编码（如果适用）|\n|h|富文本的HTML呈现（如果适用）|\n|c|与单元格相关的评论|\n|l|cell超链接对象（.Target保存链接，.Tooltip是工具提示）|\n|s|单元格的样式/主题（如果适用）|")])])}],!1,null,null,null);e.default=n.exports}}]);