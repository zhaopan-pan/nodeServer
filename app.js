const http = require("http");
const reqUrl = require("url");
const path = require("path");
var bodyParser = require('body-parser');
//引入文件读写模块fs
var fs = require('fs');
const express = require('express');
const userSql = require("./src/service/userSql.js");

const app = express()

// '127.0.0.1'表明只有本机可访问
const hostname = '127.0.0.1';
const port = 3000;

//默认为views应用程序根目录中的目录
app.set('views', path.join(__dirname, 'view'));
//设置要使用Pug模板引擎
app.set('view engine', 'ejs');



app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded



app.use('/static', express.static('public'));


//注册请求中间件
const ajaxUser = require("./router/ajax/ajaxUser");
const user = require("./router/web/user");
app.use("/user/ajaxUser", ajaxUser);
app.use("/", user)

// 创建一个 HTTP 服务器
const srv = http.createServer(app).listen(port, hostname);


// master

