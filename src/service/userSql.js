const connectionPool = require("./mysqlConfig.js");
const utilFun = require("../../public/javascript/libs/utilFun");



let userSql = {
	/**
	 * 获取用户列表
	 * @param {回调} cb 
	 */
	getUserList: function (parmars, cb) {
		console.log("==============");
		console.log(parmars);
		let getUserList = "";
		getUserList = "SELECT * FROM  user WHERE userName  LIKE ? OR phoneNumber LIKE ?";
		let select_params = new Array();
		if (!parmars.searchWord == "") {
			select_params = ["%" + parmars.searchWord + "%", "%" + parmars.searchWord + "%"]
		} else {
			select_params = ["%" + "%", "%" + "%"];
		};
		console.log(select_params);
		// connection.query(getUserList, [parmars.searchWord], function (error, results, fields) {
		connectionPool(getUserList, select_params, function (error, results, fields) {
			console.log("--------------");
			console.log(results);
			if (!error) {
				console.log(results.length);
				if (results.length == 0) {
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
	 * 删除单条
	 * @param {参数} parmars 
	 * @param {回调} cb 
	 */
	deleteUser: function (parmars, cb) {
		console.log(parmars);
		let getUserList = "";
		getUserList = "DELETE FROM `user` WHERE userInfoId =?";
		let select_params = new Array();
		if (parmars.userInfoId) {
			select_params = [parmars.userInfoId]
		} else {
			console.log("缺少userid");
			return;
		}
		console.log(select_params);
		connectionPool(getUserList, select_params, function (error, results, fields) {
			console.log(results);
			if (!error) {
				cb(utilFun.dataStyle({ code: "1", msg: "操作成功" }))
				// connection.end();
			} else {
				cb(utilFun.dataStyle({ code: "-5", msg: "操作失败" }, error))
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
		const insert_params = [(new Date().getTime().toString()).substring(6), 
			insertObj.userName || "", insertObj.sex || "", insertObj.age || "", insertObj.phoneNumber || "", utilFun.coverDate('yyyy-MM-dd hh:mm:ss').toString() || ""]
		connectionPool(insertUserInfo, insert_params, function (error, results, fields) {
			if (!error) {
				console.log(results);
				cb(utilFun.dataStyle({ code: "1", msg: "添加成功" }))
				// connection.end();
			} else {
				if (error.code = "ER_DUP_ENTRY") {
					cb(utilFun.dataStyle({ code: "-5", msg: "手机号已存在" }));
				}
				console.log("error:" + error.code);
			}
		})
	},


	updateUserInfo: function (params, cb) {
		console.log(params);
		const userInfoId = params.dataId;
		const userName = params.userName;
		const phoneNumber = params.phoneNumber;
		const sex = params.sex;
		const age = params.age;
		// const sql = "UPDATE `user` set userName='" + userName + "',sex='" + sex + "',phoneNumber='" +phoneNumber+ "',updateTime='" + (utilFun.coverDate('yyyy-MM-dd').toString())+"' WHERE userInfoId=" + userInfoId + "";
		let sqlParams = "";
		try {
			if (sex && !age) {
				sqlParams = "userName='" + userName + "',sex='" + sex + "',phoneNumber='" + phoneNumber + "',updateTime='" + (utilFun.coverDate('yyyy-MM-dd hh:mm:ss').toString()) + "'";
			} else if (!sex && age) {
				sqlParams = "userName='" + userName + "',age='" + age + "',phoneNumber='" + phoneNumber + "',updateTime='" + (utilFun.coverDate('yyyy-MM-dd hh:mm:ss').toString()) + "'";
			}
		} catch (error) {
			console.log(error);
		}
		const sql = "UPDATE `user` set " + sqlParams + " WHERE userInfoId=" + userInfoId + "";
		console.log("======================");
		connectionPool(sql, function (error, results, fields) {
			if (!error) {
				console.log(results);
				cb(utilFun.dataStyle({ code: "1", msg: "修改成功" }))
				// connection.end();
			} else {
				if (error.code = "ER_DUP_ENTRY") {
					cb(utilFun.dataStyle({ code: "-5", msg: "手机号已存在" }));
				}
				console.log("error:" + error);
			}
		})
	}

};
module.exports = userSql;