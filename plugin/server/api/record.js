var express = require('express')
var routers = express.Router()
var fs = require('fs')
routers.get('/', function(req, res, next) {
	var me = this
	var result = req.query.type
	var strs = '类型:' + req.query.type + '\r\n' + '时间' + '\r\n' + '    '
	req.query.time = JSON.parse(req.query.time)
	req.query.time.forEach(i => {
		strs += '  ' + i
	})
	var str = fs.readFileSync(__dirname + '/record.txt', 'utf-8')
	str += '\r\n' + strs
	fs.writeFileSync(__dirname + '/record.txt', str)
	res.send({ true: true })
})
module.exports = routers
