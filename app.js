const http = require("http");
const reqUrl = require("url");
const path = require("path");
var bodyParser = require('body-parser');

const express = require('express');
//全局安装后还是找不到express --version，就安装express-generator

const app = express()

// '127.0.0.1'表明只有本机可访问
const hostname = '127.0.0.1';
const port = 3000;

//默认为views应用程序根目录中的目录
app.set('views', path.join(__dirname, 'view'));

//设置要使用Pug模板引擎
app.set('view engine', 'ejs');



app.use(bodyParser.json()); // for parsing application/json
// 用来解析 request 中 body的 urlencoded字符 只支持utf-8的编码的字符,也支持自动的解析gzip和 zlib。
//返回的对象是一个键值对  当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded



app.use('/static/', express.static('public'));


//注册请求中间件
const ajaxUser = require("./router/ajax/ajaxUser");
const user = require("./router/web/user");
app.use("/user/ajaxUser", ajaxUser);
app.use("", user)

// 创建一个 HTTP 服务器
const srv = http.createServer(app).listen(port, hostname);
console.log("server run in "+port);
// 123456
// sdfgsdg

//当前模块的目录名
// console.log(__dirname);
// console.log(path.dirname(__filename));
// //当前模块的文件名（处理后的绝对路径）
// console.log(__filename);
// //使用平台特定的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。
// console.log(path.join(__dirname, 'view'));
// //将路径或路径片段的序列解析为绝对路径。
// console.log(path.resolve(__dirname, './view'));