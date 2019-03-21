var mysql = require('mysql')
var model = require('../db')
var express = require('express')
var routers = express.Router()
routers.get('/', function(req, res, next) {
	var connection = mysql.createConnection(model.mysql)
	connection.connect(function(err) {
		if (err) {
			console.log(err)
		}
	})
	var key = req.query.key
	var value = req.query.value

	var sql = 'select * from manager where user_logn=? and word=?'
	var params = [key, value]
	connection.query(sql, params, function(err, result) {
		if (!result.length) {
			res.send({ result: false })
			return
		}
		res.send({ result: true })
	})
	connection.end()
})
module.exports = routers
