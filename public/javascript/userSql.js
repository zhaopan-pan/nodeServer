const connection = require("./mysqlConfig.js");

Date.prototype.format = function (format) {
	var o = {
		"M+": this.getMonth() + 1, //month
		"d+": this.getDate(),    //day
		"h+": this.getHours(),   //hour
		"m+": this.getMinutes(), //minute
		"s+": this.getSeconds(), //second
		"q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
		"S": this.getMilliseconds() //millisecond
	}
	if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
		(this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o) if (new RegExp("(" + k + ")").test(format))
		format = format.replace(RegExp.$1,
			RegExp.$1.length == 1 ? o[k] :
				("00" + o[k]).substr(("" + o[k]).length));
	return format;
}



let userSql = {

	getUserList: function (obj, cb) {
		const getUserList = "SELECT * FROM  user WHERE USERINFOID=?"
		//��ȡuser�б�����
		connection.query(getUserList, obj.id, function (error, results, fields) {
			if (!error) {
				cb(results);
				connection.end();
			} else {
				console.log("error:" + error);
			}
		})
	},

	//插入数据
	insertUserInfo: function (insertObj, cb) {
		if (insertObj) {

		}

		const insertUserInfo = "INSERT INTO USER (userInfoId,userName,sex,age,phoneNumber,createTime) VLUERS ()";
		const insert_params = [insertObj.userInfoId || "", insertObj.userName || "", insertObj.sex || "", insertObj.age || "", insertObj.phoneNumber || "", (new Date()).format('yyyy-MM-dd') || ""]

		connection.query(insertUserInfo, insert_params, function (error, results, fields) {
			if (!error) {
				cb(results);
				connection.end();
			} else {
				console.log("error:" + error);
			}
		})
	}

};
module.exports = userSql;