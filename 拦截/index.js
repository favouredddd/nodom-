// let arr = [1, 2, 3];
// let proArr = new Proxy(arr, {
//     get: function(x, y, z) {
//         if (parseInt(y) < 0) {
//             y = x.length + parseInt(y) + '';
//         }
//         return Reflect.get(x, y, z);
//     }
// });
// // console.log(proArr[-1]);
// var list = function(v) {
//     var funstack = [];
//     var tem = new Proxy({}, {
//         get: function(obj, key, to) {
//             if (key !== "get") {
//                 funstack.push(window[key]);
//                 return to;
//             } else {
//                 return funstack.reduce((i, j, a) => {
//                     return j(i);
//                 }, v);
//             }
//         }
//     });
//     return tem;
// }
// var double = n => n * 2;
// var pow = n => n * n;
// console.log(list(3).double.pow.get);
// const dom = new Proxy({}, {
//     get: function(t, k) {
//         return function(attr = {}, ...children) {
//             var el = document.createElement(k);
//             for (i of Object.keys(attr)) {
//                 el.setAttribute(i, attr[i]);
//             }
//             for (j of children) {
//                 if (typeof children === "string") {
//                     j = document.createTextNode(i);
//                 }
//                 el.append(j);
//             }
//             return el;
//         }
//     }
// });
// var tem = dom.div({}, dom.a({ href: 'https://www.baidu.com' }, "dad"));
// document.body.append(tem);
// var fun = function() {
//     console.log(1);
// }
// var proxy = new Proxy(fun, {
//     apply: function(x, y, z) {
//         console.log(...z);
//     },
//     construct:function(t,a){
//     	console.log(12);
//     	return function(x){
//     		console.log(x);
//     	}
//     }
// });
// proxy(1, 2, 3);
// var tem=new proxy(1,2);
// tem(1);
// Array.prototype.concat = function(...arr) {
//     var me = this;
//     var tem = [];
//     tem = me.slice(0);
//     for (var i of arr) {
//         tem.push(i);
//     }
//     return tem;
// }
// var t = [1, 2, 3];
// var r = t.concat(1, 2);
// console.log(r);
// Array.prototype.slice = function(start, end) {
//     var tem = [];
//     if (arguments.length === 1) {
//         start = (start + this.length) % this.length;
//         for (var i = start; i < this.length; i += 1) {
//             tem.push(this[i]);
//         }
//     }
//     if (arguments.length >= 2) {
//         start = (start + this.length) % this.length;
//         end = (end + this.length) % this.length;
//         if (end < start) {
//             return [];
//         }
//         for (var i = start; i < end; i += 1) {
//             tem.push(this[i]);
//         }
//     }
//     return tem;
// }
// console.log(t.slice(-2, -1));
var str="adada";
console.log(str.substr(-1,2));
String.prototype.substr=function(){
     var tem="";
    if(arguments.length===0)
        return this.split("").join("");
    if(arguments[0]>=this.length)
        return tem;
    if(arguments.length===1&&arguments[0]<this.length){
        arguments[0]=(this.length+arguments[0])%this.length;
        for(var i=arguments[0];i<this.length;i+=1){
            tem+=this[i];
        }
        return tem;
    }
    if(arguments.length===2){
        if(arguments[1]<=0)
            return tem;
        else{
            arguments[0]=(arguments[0]+this.length)%this.length;
            var end=arguments[0]+arguments[1]>this.length?this.length:arguments[0]+arguments[1];
            for(var i=arguments[0];i<end;i+=1){
                tem+=this[i];
            }
            return tem;
        }
    }
}
console.log(str.substr(-1,2));
var myload=function(arr){
    var me=this;
    me.src=arr||[];
    me.start();
}
// var myPromise = function(callback) {
//     var me = this;
//     me.flag = 0;
//     me.no=false;
//     me.thenarr = [];
//     setTimeout(callback.bind(me, function(r) {
//         me.result = r;
//         me.flag = 1;
//     }, function() {
//         me.flag = -1;
//     }), 0);
// }
// myPromise.prototype = {
//     constructor: myPromise,
//     then: function(callback) {
//         var me = this;
//         callback.call(me, me.result);
//     }
// };
// var tem = new myPromise(function(r1, r2) {
//     setTimeout(r1.bind(this, "1211212"), 2000);
// });
// var t = tem;
// tem.then = new Proxy(tem.then, {
//     apply: function(t, k, args) {
//         var me = this;
//         if (!tem.no) {
//             tem.thenarr=args[0];
//             return;
//         }
//         return Reflect.apply(...arguments);
//     }
// });
// Object.defineProperty(tem, "flag", {
//     set: function(v) {
//         t[v] = v;
//         tem.no = true;
//         tem.then(tem.thenarr);
//     }
// })
// tem.then(function(r) {
//     console.log(r);
// })
// tem.then = function(callback) {
//     callback(me.result);
//     console.log(me.result);
// }
// Object.defineProperty(tem,"flag",{
// 	set:function(){
// 		var me=this;
// 		me.then(function(r){
// 			console.log(r);
// 		});
// 	},
// 	get:function(){
// 		return 1;
// 	}
// });