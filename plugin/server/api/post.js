var express = require('express');
var fs = require('fs');
var mysql = require('mysql');
var model = require('../db');
var routers_post = express.Router();
routers_post.post("/", function (req, res) {
    var param = {
        key: req.body.key,
        value: req.body.value
    };
    var connection = mysql.createConnection(model.mysql);
    connection.connect(function (err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("c");
    var params = [param.key, param.value];
    var sql = "select * from manager where user_logn=? and word=?";
    connection.query(sql, params, (err, result) => {
        if (err) {
            res.send({result: false});
            console.log(err)
            return;
        }
        if (result.length) {
            res.send({result: true});
            return ;
        }else{
            res.send({result: false});
        }
    });
    connection.end();
});
module.exports = routers_post;