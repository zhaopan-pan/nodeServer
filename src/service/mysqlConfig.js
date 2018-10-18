//导入mysql加载模块
let mysql = require('mysql');

/**
 * 创建连接池
 */
let pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'nodetest'
});


/**
 * 封装连接池
 * @param {sql语句} sql 
 * @param {参数占位符} params 
 * @param {回调} callback 
 */
let connectionPool = function (sql,params,callback) {
	pool.getConnection(function (err, conn) {
		if (err) {
			callback(err, null, null);
		} else {
			conn.query(sql,params,function (qerr, vals, fields) {
				//释放连接
				pool.releaseConnection(conn);
				//事件驱动回调
				callback(qerr, vals, fields);
			});
		}
	});
};

//测试mysqlpool连接
pool.getConnection(function (err) {
	if (err) {
		console.log("error:" + err);
	} else {
		console.log("mysqlpool connect succecd！");

	}
})

module.exports = connectionPool;