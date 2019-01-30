var express = require('express');
var router = express.Router();
//引入文件读写模块fs
var fs = require('fs');
var stream = require('stream');
const assert = require('assert');

router.get('', function(req, res, next) {

    // 从某字符设备创建一个流。
    var  readFile = fs.createReadStream('./router/web/test.js');
    var  writeFile = fs.createWriteStream('./router/web/write.js');//创建可写入流
    // writeFile.write(readFile);
    // writeFile.end("222");
    writeFile.on('pipe', (src) => {
        console.error('有数据正通过管道流入写入器');
        assert.equal(src, readFile);
    })
    readFile.pipe(writeFile);
    // console.log(readFile);
    res.render('index',
        {
            title:	'首页',

        }
    );
});

module.exports = router;