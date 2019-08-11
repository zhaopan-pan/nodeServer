var express = require('express');
var router = express.Router();
//引入文件读写模块fs
var fs = require('fs');
var stream = require('stream');
const assert = require('assert');

router.get('', function (req, res, next) {

    // 从某字符设备创建一个流。
    var readFile = fs.createReadStream('./router/web/test.js');
    //创建可写入流
    var writeFile = fs.createWriteStream('./router/web/write.js');
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
            title: '首页',

        }
    );
});


router.get('/tsl1', function (req, res, next) {


    res.render('ts/tsL1',
        {
            title: 'ts',

        }
    );
});
router.get('/test', function (req, res, next) {


    res.render('test',
        {
            title: 'test',

        }
    );
});
router.get('/reptileIndex', function (req, res, next) {


    request('http://www.jd.com', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);
            res.json({
                cat: $('.cate_menu_item').length
            });
        }
    })


    res.render('reptile/reptileIndex',
        {
            title: 'reptile',

        }
    );
});
module.exports = router;