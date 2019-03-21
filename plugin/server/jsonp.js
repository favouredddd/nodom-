module.exports=function(req,res,next){
        console.log(req.url);
	let url=req.url;
        console.log(url);
	let index=url.indexOf("jsonp");
	if(index!==-1){
		let str=req.query.callback;
		let data="这是jsonp";
                res.setHeader("Content-Type","application/javascript");
		res.end(str+`("`+data+`")`);
	}else{
        next();}
}