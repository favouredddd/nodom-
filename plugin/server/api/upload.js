var express = require('express');
var fs=require('fs');
var imgPath="/home/node/upload/";
var upload = express.Router();
upload.use("/", function(req, res) {
    var reg=/\.(gif|jpg|jpeg|png|gif|jpg|png)$/gi;
    var files=req.files;
    var len= Object.keys(files).length;
    Object.keys(files).forEach(i=>{
        fs.rename(files[i].path,imgPath+files[i].originalFilename,(r)=>{
            len--;
            if(len===0){
                res.send({result:true});
            }
        });
    })
});
module.exports=upload;