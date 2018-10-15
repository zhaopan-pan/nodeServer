const connection =require("./mysqlConfig.js");


let userSql={
	
	getUserList:function(obj,cb){
	const getUserList="SELECT * FROM  user WHERE USERINFOID=?"
	//获取user列表数据
	connection.query(getUserList,obj.id,function(error, results, fields){
	if(!error){
	cb(results);
	connection.end();
		}else{
		console.log("error:"+error);
		}
	 })
	};
	
		insertUserInfo:function(insertObj,cb){
			if(insertObj){
				
			}
	const insertUserInfo="INSERT INTO USER 
	(userInfoId,userName,insertObj.sex||"",age,phoneNumber,createTime,updataTime) 
	VLUERS 
	(insertObj.userInfoId||"",insertObj.userName||"",insertObj.sex||"",insertObj.age||"",insertObj.phoneNumber||"",insertObj.createTime||"",insertObj.updataTime||"")"

	connection.query(insertUserInfo,id,function(error, results, fields){
	if(!error){
	cb(results);
	connection.end();
		}else{
		console.log("error:"+error);
		}
	 })
	}

};
module.exports=userSql;