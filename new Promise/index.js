;
(function() {
    var Ajax = function(config) {
        var me = this;
        switch (config.type) {
            case "post":
                me.post(config);
                break;
            case "get":
                me.get(config);
                break;
        }
    }
    Ajax.prototype = {
        constructor: Ajax,
        get: function(config) {
            var xml = new XMLHttpRequest();
            xml.onload = function() {
                if (xml.status === 200) {
                    config.callback("1212");
                }
            }
            xml.open("get", config.url);
            xml.send(null);
        },
        post: function(config) {
            var me = this;
            var xml = new XMLHttpRequest();
            var param = new FormData();
            Object.keys(config.params).forEach(i => {
                param.append(i, config.params[i]);
            });
            xml.onload = function() {
                if (xml.status === 200) {
                    config.callback("1212");
                }
            }
            xml.open("post", config.url);
            xml.send(param);
        }
    };
    var PROMISE = function(callback) {
        var me = this;
        me.result = [];
        me.total = 0;
        me.funcStack=[];
        Object.defineProperty(me, "flag", {
            set: function(v) {
                var me = this;
                if (v) {
                	me.funcStack.forEach(i=>{
                		 i.call(me,me.r);
                	});
                }
            }
        });
        var resolve = function(r) {
            me.r = r;
            me.flag = true;
        }
        var reject = function(r) {
            me.flag = false;
        }
        setTimeout(callback.bind(me, resolve.bind(me), reject.bind(me)), 0);
    };
    PROMISE.prototype.then = function(...callback) {
        var me = this;
        callback=Array.from(callback);
        me.funcStack=me.funcStack.concat(callback);
        return me;
    }
    PROMISE.all = function(arr) {
        console.log(arr instanceof Array)
        if (!(arr instanceof Array)) {
            throw (new Error("输入错误"));
            return;
        }
        var me = new PROMISE(function(r1, r2) {
            var me = this;
            count = 0;
            Object.defineProperty(me, "total", {
                set: function(v) {
                    if (count === arr.length) {
                        r1(me.result);
                    }
                }
            });
            arr.forEach(i => {
                i.then.call(i, function(r) {
                    me.result.push(r);
                    count += 1;
                    me.total = 1;
                });
            })
        });
        return me;
    }
    var t=Date.now();
    var tem = function() {
        var arr = [];
        for (let i = 1; i <=6; i += 1) {
            arr.push(new PROMISE(function(r1, r2) {
                var me = this;
                var img = new Image()
                img.onload = () => {
                    r1(i) 
                };
                img.src = "imgs/"+i+".jpg";
                document.querySelector(".wrap").append(img);
            }).then(function(r) {
            	console.log(r);
            }));
        }
        return arr;
    }
    PROMISE.all(tem()).then(function(r) {
    	console.log(Date.now()-t);
        console.log(r);
    });
})()