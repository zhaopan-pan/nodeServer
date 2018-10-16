const connection = require("./mysqlConfig.js");
const utilFun = require("../../public/javascript/libs/utilFun");




let userSql = {
	//获取用户列表
	getUserList: function (cb) {
		const getUserList = "SELECT * FROM  user WHERE USERINFOID"
		connection.query(getUserList, function (error, results, fields) {
			if (!error) {
				cb(utilFun.dataStyle({code:"1",msg:"查询成功"}, results))
				// connection.end();
			} else {
				cb(utilFun.dataStyle({code:"-5",msg:"查询失败"}, error))
				console.log("error:" + error);
			}
		})
	},

	//插入数据
	insertUserInfo: function (insertObj, cb) {
		console.log("-----------");
		console.log(utilFun.coverDate('yyyy-MM-dd').toString());
		console.log(new Date().getTime().toString());
		const insertUserInfo = "INSERT INTO USER (userInfoId,userName,sex,age,phoneNumber,createTime) VLUERS ()";
		const insert_params = [new Date().getTime().toString(), insertObj.userName || "", insertObj.sex || "", insertObj.age || "", insertObj.phoneNumber || "", utilFun.coverDate('yyyy-MM-dd').toString() || ""]
		connection.query(insertUserInfo, insert_params, function (error, results, fields) {
			if (!error) {
				cb(utilFun.dataStyle({code:"1",msg:"添加成功"}))
				connection.end();
			} else {
				cb(utilFun.dataStyle({code:"-5",msg:"添加失败"}, error))
				console.log("error:" + error);
			}
		})
	}

};
module.exports = userSql;