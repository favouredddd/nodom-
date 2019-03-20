// var func = function(a) {
//     this.a = {
//         test: function() {
//             console.log("test");
//         }
//     };
//     this.b = function() {
//         console.log(111);
//     }
//     this.c=a||5;
// }
// var func = new func(2.2);
// console.log(func.c);
// var item = "test";
// flag = 0;
// for (var k in func) {
//     if (func.hasOwnProperty(k)) {
//         if (k === "test") {
//             func[k]();
//             flag = 1;
//         }
//     }
// }
// if (!flag) {
//     var obj = func.a;
//     for (var k in obj) {
//         if (obj.hasOwnProperty(k)) {
//             if (k === "test") {
//                 obj[k]();
//                 alert();
//             }
//         }
//     }
// }
// let [x,y]=[1,2];
// console.log(x);
// console.log(y);
// let {a,a:b,c}={a:1,c:2};
// console.log(a);
// console.log(b);
// let x;
// ({x}={x:1})
// console.log(x);
// var x=1,y=2;
// function s(x,y){
// 	arguments[0]=2;
// 	arguments[1]=5;
// 	x=0;
// 	y=1;
// 	console.log(arguments)
// 	return x+y;
// }
// console.log(s(x,y));
// var func={
// 	a:function(){
// 		var b=(a)=>{return {a:a}};
// 		console.log(b(2));
// 		console.log(1);
// 	}
// }
// func.a();
// console.log(Array.of(3));
// var obj={
// 	"a":1,
// 	 b:2
// }
// console.log(obj["b"]);
// var set=[1,2,3,4,3];
// for (key of new Set(set).keys())
// {
// 	console.log(key);
// }
// var map=new Map([
// 	["a",1],[{b:1},2]
// 	]);
// console.log(map); 
// console.log([...map]);
// var promise=new Promise(function(r1,r2){
// 	r2(new Promise(function(a,b){
// 		var me=this;
// 		setTimeout(function(){
// 			me.b;
// 		},200);
// 	}))
// });
// promise.then(function(r){
// 	console.log(1);
// },function(r){
// 	console.log(2);
// });
;
(function() {
    // class a{
    // 	constructor(a,b){
    // 		this.a=a;
    // 		this.b=b;
    // 	}
    // }
    // class b extends a{
    // 	constructor(a,b,c){
    // 		super(a,b);
    // 		this.c=c;
    // 	}
    // }
    // console.log(new b(1,2,3).__proto__===b.prototype);
    // b.prototype.a=121;
    // console.log(new b(1,2,3).__proto__);
    // var copy = {
    //       obj: new WeakMap(),
    //       copy: function(obj) {
    //           var me = this;
    //           if (typeof obj === "function") {
    //               // var tem=new Function(`return ${obj.toString()};`)();
    //               var tem=eval(`(function(){return ${obj.toString()}})()`);
    //               tem.prototype=me.copy(obj.prototype);
    //               tem.prototype.constructor=tem;
    //           }
    //           if (typeof obj !== "object") {
    //               return obj;
    //           }
    //           if (typeof obj === "object") {
    //               var r;
    //               if (me.obj.get(obj)) {
    //                   return {};
    //               }
    //                if (!obj) {
    //                   return null;
    //               }
    //               me.obj.set(obj, Symbol());
    //               var flag = {}.toString.call(obj);
    //               if (flag.indexOf("Object") + 1) {
    //                   r = {};
    //                   Object.getOwnPropertyNames(obj).forEach(i => {
    //                       r[i] = me.copy(obj[i]);
    //                   });
    //               }
    //               if (flag.indexOf("Array") + 1) {
    //                   r = [];
    //                   obj.forEach((i, index, arr) => {
    //                       r[index] = me.copy(i);
    //                   });
    //               }
    //               if (flag.indexOf("HTML") + 1) {
    //                   r = obj.cloneNode(true);
    //               }
    //               return r;
    //           }
    //       }
    //   };
    var copyf = function() {
        var me = this;
        me.obj = new WeakMap();
    }
    copyf.prototype = {
        copy: function(obj) {
            var me = this;
            if (typeof obj === "function") {
                // var tem=new Function(`return ${obj.toString()};`)();
                var tem = eval(`(function(){return ${obj.toString()}})()`);
                tem.prototype = me.copy(obj.prototype);
                tem.prototype.constructor = tem;
            }
            if (typeof obj !== "object") {
                return obj;
            }
            if (typeof obj === "object") {
                var r;
                if (me.obj.get(obj)) {
                    return {};
                }
                if (!obj) {
                    return null;
                }
                me.obj.set(obj, Symbol());
                var flag = {}.toString.call(obj);
                if (flag.indexOf("Object") + 1) {
                    r = {};
                    Object.getOwnPropertyNames(obj).forEach(i => {
                        r[i] = me.copy(obj[i]);
                    });
                }
                if (flag.indexOf("Array") + 1) {
                    r = [];
                    obj.forEach((i, index, arr) => {
                        r[index] = me.copy(i);
                    });
                }
                if (flag.indexOf("HTML") + 1) {
                    r = obj.cloneNode(true);
                }
                if(flag.indexOf("Set")+1){
                	return new Set(Array.from(obj));
                }
                return r;
            }
        },
        constructor: copyf
    };
    var obj = { a: 1, b: { a: 1, b: 2, c: 31 }, c: [1, 2, 3,{a:1}],h:new Set([1,2])};
    var obj1 = { a: 1, b: { c: 3 }, c: [2, 3, 4] ,d:"",f:null,g:[1,2,3,4,5,6],h:new Set([1,2,3,4])};
    //只合并数组和{}
    var merge = function(obj, obj1) {
        if (typeof obj1 !== "object" || typeof obj !== 'object')
            return obj1;
        //复制第一个元素
        var r = new copyf().copy(obj);
        var flag = {}.toString.call(obj);
        var flag1 = {}.toString.call(obj1);
        if (flag.indexOf("Object") + 1 && flag1.indexOf("Object") + 1) {
            Object.getOwnPropertyNames(obj1).forEach(function(i) {
            	if(obj[i]){
                r[i] = merge(obj[i], obj1[i]);}
                else{
                	r[i]=new copyf().copy(obj1[i]);
                }
            });
        }
        if (flag.indexOf("Array") + 1 && flag1.indexOf("Array") + 1) {
            r=new copyf().copy(Array.from(new Set(obj.concat(obj1))));
        }
        if(flag.indexOf("Set")+1&&flag1.indexOf("Set")+1){
        	r=new copyf().copy(new Set(Array.from(obj).concat(Array.from(obj1))));
        }
        return r;
    }
    let tem = merge(obj, obj1);
    console.log(tem);
})()