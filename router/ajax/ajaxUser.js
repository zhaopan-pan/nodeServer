
/**
 * 用户数据请求相关
 */
const express = require('express');
const router = express.Router();
const userSql = require("../../src/service/userSql");
//获取用户列表
router.post('/getUserList', function (req, res, next) {
    userSql.getUserList(req.body,function (cb) {
        console.log(cb);
        res.send(cb)
    });
});


//添加用户
router.post('/addUser', function (req, res, next) {
    userSql.insertUserInfo(req.body,function (cb) {
        console.log(cb);
        res.send(cb)
    });
});


//删除用户
router.post('/deleteUser', function (req, res, next) {
    userSql.deleteUser(req.body,function (cb) {
        console.log(cb);
        res.send(cb)
    });
});

//修改用户
router.post('/updateUserInfo', function (req, res, next) {
    userSql.updateUserInfo(req.body,function (cb) {
        console.log(cb);
        res.send(cb)
    });
});

module.exports = router; 