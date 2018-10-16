
/**
 * 用户数据请求相关
 */
const express = require('express');
const router = express.Router();
const userSql = require("../../src/service/userSql");
//获取用户列表
router.post('/getUserList', function (req, res, next) {
    console.log(req.body);
    userSql.getUserList(function (cb) {
        console.log(cb);
        res.send(cb)
    });
});


//获取用户列表
router.post('/addUser', function (req, res, next) {
    console.log(req.body);
    userSql.insertUserInfo(req.body,function (cb) {
        console.log(cb);
        res.send(cb)
    });
});

module.exports = router; 