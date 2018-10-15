//导入mysql加载模块
let mysql = require('mysql');


let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'nodetest'
});


//测试getUserList
connection.connect(function(err){
	if(err){
		console.log("error:"+err);
	}else{
		console.log("mysql connect succecd！");

	}
})



module.exports=connection;