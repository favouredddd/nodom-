var express = require('express')
var session = require('express-session')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var fs = require('fs')
var deleteList = require('./server/api/deleteList')
var index = require('./server/index')
var down = require('./server/api/down')
var imgs = require('./server/api/imgs')
var post = require('./server/token')
var json = require('./server/api/json')
var callback = require('./server/api/callback')
var mydba = require('./server/api/login')
var getClientIp = require('./server/api/getIp')
var getList = require('./server/api/getList')
var upload = require('./server/api/upload');
let jsonp=require("./server/jsonp.js");
// var route=require("./server/api/route");
var app = express()
//post中间模块
// app.use()
//跨域使用模块
app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'X-Requested-With')
	// res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	// req.session.url=req.path;
	next()
})
var multer = require('connect-multiparty')
var muli = multer()
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').__express)
app.set('view engine', 'html')
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(muli)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
	session({
		secret: 'hhhh',
		resave: true,
		saveUninitialized: true,
		cookie: { maxAge: 1000 * 60 * 60 }
	})
)
app.use('/plugin_set/public', express.static(path.join(__dirname, 'public')))
//get获取数据
app.use('/', index)
app.use('/api/down', down)
app.use('/api/get_list', getList)
app.use('/api/imgs', imgs)
app.use('/api/upload', upload)
app.use('/api/json', json)
//post获取数据
app.use('/api/post', post)
app.use('/api/deleteList', deleteList)
app.use('/api/callback', callback)
app.use('/api/record', require('./server/api/record'))
// catch 404 and forward to error handler
var re
var ip
app.use(jsonp);
app.use(function(req, res, next) {
	re = req.url
	ip = getClientIp(req)
	var sess = req.session
	re = decodeURI(re)
	if (re.indexOf('favicon') !== -1 || /\{/.test(re)) {
		res.render('404.html')
		res.end()
		return
	}
	if ((re.indexOf('www') !== -1 && re.indexOf('route') === -1) || re.indexOf('php') !== -1) {
		console.log(re.indexOf('www'), re.indexOf('route'), re.indexOf('php'))
		res.render('404.html')
		res.end()
		return
	}
	if (/\{\{.+?\}\}/g.test(re)) {
		res.status(404)
		res.end()
		return
	}
	if (!sess.logn) {
		sess.name = Math.random() + 'a'
		sess.logn = true
		sess.count = 1
		mydba.add({
			ip: ip,
			count: sess.count,
			session: sess.name,
			path: re,
			callback: function() {
				if (re === '/route') re = '/route/home'
				fs.readFile(__dirname + '/server/api/result.json', function(e, d) {
					var arr = JSON.parse(d)
					if (!/\{/.test(re)) {
						arr.push({ name: sess.name, path: re, result: /\{/.test(re) })
					}
					fs.writeFile(__dirname + '/server/api/result.json', JSON.stringify(arr), { flag: 'w' }, function() {
						res.render('index')
					})
				})
			}
		})
	} else {
		sess.count += 1
		mydba.update({
			ip: ip,
			count: sess.count,
			path: re,
			session: sess.name,
			callback: function() {
				fs.readFile(__dirname + '/server/api/result.json', function(e, d) {
					if (e) {
						return
					}
					var arr = JSON.parse(d)
					var name = sess.name
					arr.forEach(i => {
						if (i.name === name && !/\{/.test(re)) i.path = re
					})
					fs.writeFile(__dirname + '/server/api/result.json', JSON.stringify(arr), { flag: 'w' }, function(
						e,
						d
					) {
						res.render('index')
					})
				})
			}
		})
	}
})
// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}
	// render the error page
	res.status(err.status || 500)
	res.send('error')
})
app.listen(80, () => {
	console.log('start server')
})
