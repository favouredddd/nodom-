var mysql = require('mysql');
var model = require('../db');
//连接
var getDate=function(){
    var t=new Date()
    return t.getFullYear()+':'+(t.getMonth()+1)+':'+t.getDate()+':'+t.getHours()+':'+t.getMinutes()+':'+t.getSeconds();
}
var add = function(config) {
    var connection = mysql.createConnection(model.mysql);
    connection.connect(function(err) {
        if (err) {
            console.log(err);
        }
    });
    var params=[config.session,config.path,getDate(),config.ip,config.count];
    var sqlstr="INSERT INTO LOGIN(session,path,time,ip,count) VALUES(?,?,?,?,?)";
    connection.query(sqlstr,params,(err,result)=>{
    	if(err)
    		console.log(err)
    	config.callback();
    });
    connection.end();
}
var update = function(config) {
    var connection = mysql.createConnection(model.mysql);
    console.log(config,"update");
    connection.connect(function(err) {
        if (err) {
            console.log(err);
        }
    });
    var params=[config.path,getDate(),config.count,config.session];
    var sql="UPDATE LOGIN SET path = ?,time = ?,count=? WHERE session = ?";
    connection.query(sql,params,(err,result)=>{
    	if(err)
    		console.log(err)
    	config.callback();
    });
    connection.end();
}
module.exports={add:add,update:update};