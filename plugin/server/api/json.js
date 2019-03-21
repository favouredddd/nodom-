var mysql = require('mysql');
var model = require('../db');
var express = require('express');
var fs=require("fs");
var json = express.Router();
json.get("/", function(req, res, next) {
    var sql = 'select json_path from json where json_id=?';
    var json_name=req.query.name;
    var params = [json_name];
    fs.readFile("/home/node3/static/font.json","utf-8",(e,r)=>{
        console.log(r);
        res.send({
            result: true,
            font:JSON.parse(r)
        });
    });
});
module.exports=json;