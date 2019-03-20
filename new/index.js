// ;
// (function() {
//     var test = function() {
//         var tem = {};
//         tem.a = 1;
//         console.log(arguments);
//         return tem;
//     }
//     var r = new test(); //{a:1}
//     console.log(r);
//     console.log(r.__proto__ === test.prototype);
//     false;
//     test = function() {
//         var me = this;
//         me.a = 1;
//         return function() {}
//     }
//     r = new test();
//     console.log(r.__proto__ === test.prototype);
//     var myNew = function(handler) {
//         var tem = {};
//         tem.__proto__ = handler.prototype;
//         if (typeof handler.call(tem) !== "object" && handler.call(tem) !== "function")
//             return tem;
//         return handler.call(tem);
//     }
//     class a {
//         constructor(x, y) {
//             this.x = x;
//             this.y = y;
//         }
//         getXY() {
//             console.log(this.x, this.y);
//         }
//         static test() {
//             console.log(typeof this)
//         }
//     }
// })()
//
let arr = { 0: 1, 1: 2, 2: 3, length: 3 };
// arr[Symbol.iterator]=[][Symbol.iterator];
arr[Symbol.iterator] = function() {
    var tem = {
        index: 0,
    };
    //this指向的是arr
    var len = this.length;
    tem.next = function() {
        var r = {};
        //this指向tem,len形成了闭包
        //done是遍历器完成的标志物
        if (this.index < len) {
            r.value = arr[this.index++];
            r.done = false;
        } else {
            r.value = undefined,
                r.done = true;
        }
        return r;
    }
    return tem;
}
for (var i of arr) {
    console.log(i);
}