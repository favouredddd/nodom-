var jwt = require('jsonwebtoken')
var model = require('./db')
var mysql = require('mysql')
var express = require('express')
var routers = express.Router()
var getToken = (req, res) => {
	var param = {
		key: req.body.key,
		value: req.body.value
	}
	var connection = mysql.createConnection(model.mysql)
	connection.connect(function(err) {
		if (err) {
			console.log(err)
		}
	})
	var params = [param.key, param.value]
	var sql = 'select mykey from manager where user_logn=? and word=?'
	connection.query(sql, params, function(err, result) {
		if (err || !result.length) {
			res.send({ result: false })
			return
		} else {
			var token = jwt.sign({ param: params[0] }, result[0].mykey, { expiresIn: 60 * 60 * 1 })
			res.send({
				result: true,
				token: token
			})
		}
	})
	connection.end()
}
routers.post('/', function(req, res, next) {
	getToken(req, res)
})
module.exports = routers
