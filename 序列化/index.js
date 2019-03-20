var obj = {
    a: 1,
    b: 2,
    d:{a:1,b:3}
}
//不拷贝原型链
obj.c = obj;
obj.d.c=obj.c;
var getList = function(obj) {
    var me = this;
    me.list = [];
    me.obj = me.copy(obj);
    me.deal();
}
getList.prototype = {
    constrctor: getList,
    copy(obj) {
        var me = this;
        if (typeof obj !== 'object')
            return obj
        var result = me.list.filter(i => i.v === obj);
        if (result.length) {
            return result[0].index;
        }
        me.list.push({ v: obj, index: me.list.length + '$crucle' });
        var re;
        var test = {}.toString.call(obj);
        if (test === '[object Object]') {
            re = {};
            Object.keys(obj).forEach(i => {
                re[i] = me.copy(obj[i]);
            });
            return re;
        }
        if (test === '[object Array]') {
            re = obj.map(i => {
                return me.copy(i);
            });
            return re;
        }
    },
    deal() {
        var me = this;
        me.list.forEach(i => {
            me.cut(i.v);
        });
    },
    cut(obj) {
        var me = this;
        var test = {}.toString.call(obj);
        if (test === '[object Array]') {
            obj.forEach(i => {
                if (me.doCut(i)) {
                    me.cut(i);
                } else {
                    return;
                }
            });
        }
        if (test === '[object Object]') {
            Object.keys(obj).forEach(i => {
                if (me.doCut(obj[i])) {
                    me.cut(obj[i]);
                } else {
                    return;
                }
            })
        }
    },
    doCut(obj) {
        var me = this;
        var result = me.list.filter(i => i.v === obj)
        if (result.length) {
            obj = result[0].index;
            return false;
        }
        return true;
    }
}
var result = new getList(obj);
result.list.forEach(i => {
    i.v = null;
});
var str = JSON.parse(JSON.stringify(result));
// console.log(str);
var getObj = function(obj) {
    var me = this;
    me.old = obj.list;
    me.list = [];
    me.getOld(obj.obj);
    me.list.forEach(i => {
        me.reverseOld(i.v);
    });
    return obj.obj;
}
getObj.prototype = {
    constructor: getObj,
    regexp:/crucle$/ig,
    getOld(obj) {
        var me = this;
        if (typeof obj !== "object")
            return;
        me.list.push({ index: me.list.length + '$crucle', v: obj });
        var test = {}.toString.call(obj);
        if (test === '[object Object]') {
            Object.keys(obj).forEach(i => {
                me.getOld(obj[i]);
            });
            return;
        }
        if (test === '[object Array]') {
            obj.forEach(i => {
                me.getOld(i);
            })
        }
    },
    reverseOld(obj) {
        var me = this;
        var test = {}.toString.call(obj);
        if (test==='[object Object]'){
        	Object.keys(obj).forEach(i=>{
        		var regexp=/crucle$/ig;
        		if(typeof obj[i]==='string'&&regexp.test(obj[i])){
        			var re=me.list.filter(j=>j.index===obj[i])[0];
        			obj[i]=re.v;
        			return ;
        		}else{
        			 if (typeof obj === 'object')
        			 	me.getOld(i);
        		}
        	})
        }
    }
}
var reverse=new getObj(str);
console.log(reverse)
module.exports={
    getList,
    getObj
}