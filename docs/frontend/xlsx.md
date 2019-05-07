# xlsx

## 安装
npm install xlsx

## 导入
import XLSX from 'xlsx';

## 使用


XLSX.read(data, read_opts) attempts to parse data.
let reader = new FileReader();
reader.readAsBinaryString(file);
reader.onload=function(e){
    let data = e.target.result;
    let sheet = XLSX.read(data, { type: "binary" }).Sheets.Sheet1;
}

### type	expected input
"base64"	string: Base64 encoding of the file
"binary"	string: binary string (byte n is data.charCodeAt(n))
"string"	string: JS string (characters interpreted as UTF8)
"buffer"	nodejs Buffer
"array"	array: array of 8-bit unsigned int (byte n is data[n])
"file"	string: path of file that will be read (nodejs only)


### 单元格对象

|v|原始值（有关详细信息，请参阅数据类型部分）|
|w|格式化文本（如果适用）|
|t|type：b布尔值，e错误，n数字，d日期，s文本，z存根|
|f|单元格公式编码为A1样式的字符串（如果适用），如果公式是数组公式，则F范围的封闭数组（如果适用）|
|r|富文本编码（如果适用）|
|h|富文本的HTML呈现（如果适用）|
|c|与单元格相关的评论|
|l|cell超链接对象（.Target保存链接，.Tooltip是工具提示）|
|s|单元格的样式/主题（如果适用）|
