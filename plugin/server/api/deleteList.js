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
	var key = req.query.session
	var sql = 'DELETE FROM LOGIN where session=?'
	var params = [key]
	connection.query(sql, params, function(err, result) {
		if (err) {
			res.send({ result: false })
			return
		}
		res.send({ result: true })
	})
	connection.end()
})
module.exports = routers
