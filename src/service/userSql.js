const connection = require("./mysqlConfig.js");
const utilFun = require("../../public/javascript/libs/utilFun");




let userSql = {
	/**
	 * 获取用户列表
	 * @param {回调} cb 
	 */
	getUserList: function (parmars, cb) {
		console.log("==============");
		console.log(parmars);
		let getUserList = ""
		getUserList = "SELECT * FROM  user WHERE userName  LIKE ? OR phoneNumber LIKE ?";

		let select_params = new Array();
		if (parmars.isPrototypeOf("searchWord")) {
			select_params = ["%" + parmars.searchWord + "%", "%" + parmars.searchWord + "%"]
		} else {
			select_params = []
		}

		// connection.query(getUserList, [parmars.searchWord], function (error, results, fields) {
		connection.query(getUserList, select_params, function (error, results, fields) {
			console.log("--------------");
			console.log(results);
			console.log(typeof results);
			console.log(results.length);
			if (!error) {
				if (results.length==0) {
					cb(utilFun.dataStyle({ code: "-5", msg: "暂无数据" }))
				} else {
					cb(utilFun.dataStyle({ code: "1", msg: "查询成功" }, results))
				}
				// connection.end();
			} else {
				cb(utilFun.dataStyle({ code: "-5", msg: "查询失败" }, error))
				console.log("error:" + error);
			}
		})
	},

	/**
	 * 插入数据
	 * @param {插入数据} insertObj 
	 * @param {回调} cb 
	 */
	insertUserInfo: function (insertObj, cb) {
		console.log(insertObj);
		console.log((new Date().getTime().toString()).substring(6));
		const insertUserInfo = "INSERT INTO USER (userInfoId,userName,sex,age,phoneNumber,createTime) VALUES (?,?,?,?,?,?)";
		const insert_params = [(new Date().getTime().toString()).substring(6), insertObj.userName || "", insertObj.sex || "", insertObj.age || "", insertObj.phoneNumber || "", utilFun.coverDate('yyyy-MM-dd').toString() || ""]
		connection.query(insertUserInfo, insert_params, function (error, results, fields) {
			if (!error) {
				cb(utilFun.dataStyle({ code: "1", msg: "添加成功" }))
				// connection.end();
			} else {
				if (error.code = "ER_DUP_ENTRY") {
					cb(utilFun.dataStyle({ code: "-5", msg: "手机号已存在" }))
				}
				console.log("error:" + error.code);
			}
		})
	}

};
module.exports = userSql;