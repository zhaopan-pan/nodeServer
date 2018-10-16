const http = require("http");
const reqUrl = require("url");
const app=require("./app.js");



// '127.0.0.1'表明只有本机可访问
const hostname = '127.0.0.1';
const port = 3000;


// 创建一个 HTTP 服务器
const server = http.createServer(app
    // (req, res) => {
    // let method = req.method;
    // let url = reqUrl.parse(req.url);

    // app.use("/static", express.static(path.join(__dirname, 'public')));


    // if (url.pathname == "/index") {

    // 	fs.readFile("./view/index.html", 'utf-8', function (err, data) {
    // 		if (!err) {
    // 			res.writeHead(200, { 'Content-Type': 'text/html' });

    // 			userSql.getUserList(function (cb) {
    // 				console.log(cb);
    // 			});

    // 			res.end(data);
    // 		} else {
    // 			console.log(err);
    // 			return;

    // 		}
    // 	});
    // } else {
    // 	res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    // 	res.write('404,您访问的页面不存在');
    // }

// }

).listen(port, hostname);

server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
    // getToken();
}