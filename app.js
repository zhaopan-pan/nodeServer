const http =require("http");
const reqUrl =require("url");
const userSql =require("./public/javascript/userSql.js");
//引入文件读写模块fs
var fs = require('fs');




// '127.0.0.1'表明只有本机可访问
const hostname = '127.0.0.1';
const port = 3000;

// 创建一个 HTTP 服务器
const srv = http.createServer( (req, res) => {
  let method=req.method;
  let url=reqUrl.parse(req.url);
  

  if(url.pathname=="/index.html"){
	
	  fs.readFile("./index.html",'utf-8',function(err,data){
		  if(!err){
			res.writeHead(200, { 'Content-Type':'text/html' });
		
			console.log(userSql.getUserList(20181015,function(cb){
				console.log(cb);
			}));
	
			res.end(data);
	  }else{
		  console.log(err);
		  return;
	
	  }
	  });
  }else{
	  	   res.writeHead(404, { 'Content-Type':'text/html; charset=utf-8'});
           res.write('404,您访问的页面不存在'); 
  }
  
  

  
}).listen(port,hostname);

