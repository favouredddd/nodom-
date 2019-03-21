var fs = require("fs");
// var str=fs.readFileSync("C://Users/love/Desktop/ddd.json","utf-8");
// var  tem1=JSON.parse(str);
// var str = fs.readFileSync("C://Users/love/Desktop/countries_1990_2015.csv", "utf-8");
// var clo = str.split("\r\n");
// var key = ["GDP (current US$)", "Population  total", "Surface area (sq. km)", "Labor force  total", "Rural population"];
// var r=[];
// var list = [0, 5, 12, 9, 3];
// list.forEach((i, index) => {
//     var tem = {};
//     tem.name = key[index];
//     for(var z=1990;z<=2015;z+=1){
//     	tem[z+'']=0;
//     }
//     for (var z = 1 + i * 215;z<1+(i+1)*215;z += 1) {
//     	var temArr=clo[z].split(",");
//         for (var j = 4; j <= 29; j += 1) {
//         	if(temArr[j].indexOf("..")!==-1){
//         		temArr[j]=0;
//         	}
//         	tem[(1986+j)+'']+=parseFloat(temArr[j]);
//         }
//     }
//     r.push(tem);
// });
// var dataJson=r;
// var reStr=JSON.stringify(dataJson);
// fs.writeFileSync("C://Users/love/Desktop/json/dataResult.json",reStr);
var json=fs.readFileSync("C://Users/love/Desktop/dataResult.json","utf-8");
var tem=JSON.parse(json);
tem.forEach(i=>{
    var total=0;
    for(var j=1990;j<=2015;j+=1){
        total+=i[j+""];
    }
    i["per"]=parseFloat(total/26);
});
tem.sort((a,b)=>{
    return a.total-b.total;
});
console.log({}.toString.call(tem));
var str=JSON.stringify(tem);
fs.writeFileSync("C://Users/love/Desktop/dataResult.json",str);