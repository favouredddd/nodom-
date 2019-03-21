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
	var sql = 'select * from LOGIN'
	var params = []
	var page = req.query.page
	var row = req.query.row
	connection.query(sql, params, function(err, result) {
		if (!result.length) {
			res.send({ result: false })
			return
		}
		var all = result.length
		var arr = []
		var index = page * row
		if (index > result.length) index = result.length
		arr = result.slice((page - 1) * row, index)
		res.send({ result: arr, all: all })
	})
	connection.end()
})
module.exports = routers
