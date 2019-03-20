;
(function() {
    var setFontSize = function() {
        var width = window.innerWidth;
        //设置页面最大宽度
        if (width > 600) {
            width = 600;
        }
        // 获取默认fontsize
        var fontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
        var x = width * 16 / (20 * fontSize);
        document.documentElement.style.fontSize = x + "px";
    }
    setFontSize();
    DD.createModule({
        el: '.el-wrap',
        data: {
            color: ["red", "green", "blue", "black", "blue", "yellow", "pink", "urple", "origin", "salmon", "silver", "winered"],
            dom: [],
            l: [
                [],
                [],
                [],
                []
            ],
            r: [],
            up: [
                [],
                [],
                [],
                []
            ],
            down: [],
            count: 0
        },
        onBeforeFirstRender: function() {
            var me = this;
            for (var i = 0; i < 16; i += 1) {
                me.data.dom.push({ txt: "", color: "tan" });
            }
            window.addEventListener("keydown", function(e) {
                me.module.methodFactory.methods.key.call(me, e.keyCode);
            }, false);
              me.module.methodFactory.methods.start.call(me);
        },
        onFirstRender:function(){
            var me=this;
             tem=document.querySelector(".itemContainer");
            new DD.Event({
                view:tem,
                eventName:'swipeleft',
                handler:me.module.methodFactory.methods.move.bind(me,me.data.l)
            });
              new DD.Event({
                view:tem,
                eventName:'swiperight',
                handler:me.module.methodFactory.methods.move.bind(me,me.data.r)
            });
                new DD.Event({
                view:tem,
                eventName:'swipeup',
                handler:me.module.methodFactory.methods.move.bind(me,me.data.up)
            });
                  new DD.Event({
                view:tem,
                eventName:'swipedown',
                handler:me.module.methodFactory.methods.move.bind(me,me.data.down)
            });
        },
        methods: {
            start: function() {
                var me = this;
                me.data.count = 0;
                me.module.methodFactory.methods.initData.call(me);
                me.data.dom.forEach((i,index) => {
                    i.txt = "";
                    i.color="tan";
                    i.$index=index;
                });
                me.module.methodFactory.methods.birth.call(me);
                me.module.methodFactory.methods.birth.call(me);
                me.module.methodFactory.methods.updata.call(me);
            },
            initData: function() {
                var me=this;
                me.data.$set("l",[[],[],[],[]]);
                me.data.$set("r",[]);
                me.data.$set("up",[[],[],[],[]]);
                me.data.$set("down",[]);
                me.data.dom.forEach((i, index) => {
                    var tem = index / 4 | 0;
                    me.data.l[tem][index % 4] = i;
                });
                me.data.l.forEach(i => {
                    var tem = i.slice(0).reverse();
                    me.data.r.push(tem)
                });
                me.data.l.forEach((i) => {
                    i.forEach((it, index) => {
                        me.data.up[index % 4].push(it);
                    })
                });
                me.data.up.forEach(i => {
                    var tem = i.slice(0).reverse();
                    me.data.down.push(tem);
                });
                console.log(me.data.dom[0]);
            },
            updata: function() {
                var me = this;
                me.data.dom.forEach(i => {
                    var str = i.txt;
                    if (str === "") {
                        i.color = "tan";
                    } else {
                        i.color = me.module.methodFactory.methods.getColor.call(me,parseInt(i.txt));
                    }
                });
            },
            birth: function() {
                var me = this;
                while (1) {
                    var tem = Math.random() * 16 | 0;
                    if (me.data.dom[tem].txt === "") {
                        me.data.dom[tem].txt = 2;
                        return;
                    }
                }
            },
            getColor: function(num) {
                var me = this;
                for (var i = 0; i < 20; i += 1) {
                    if (Math.pow(2, i) === num) {
                        return me.data.color[i - 1];
                    }
                }
            },
            deleSpace: function(arr) {
                arr.forEach(i => {
                    i.forEach((it, index) => {
                        if (index === 0)
                            return;
                        else {
                            var tem = index;
                            while (tem >= 1 && i[tem - 1].txt === "" && i[tem].txt !== "") {
                                i[tem - 1].txt = i[tem].txt;
                                i[tem].txt = "";
                                tem -= 1;
                            }
                        }
                    });
                });
            },
            concat: function(arr) {
                var me = this;
                arr.forEach(i => {
                    i.forEach((it, index) => {
                        if (index === 3)
                            return;
                        else {
                            if (i[index + 1].txt === it.txt && it.txt !== "") {
                                var tem = 2 * parseInt(it.txt);
                                it.txt = tem;
                                me.data.count += tem;
                                i[index + 1].txt = "";
                                return;
                            }
                        }
                    });
                });
            },
            key: function(k) {
                var me = this;
                switch (k) {
                    case 65:
                        me.module.methodFactory.methods.move.call(me,me.data.l);
                        break;
                    case 68:
                         me.module.methodFactory.methods.move.call(me,me.data.r);
                        break;
                    case 87:
                        me.module.methodFactory.methods.move.call(me,me.data.up);
                        break;
                    case 83:
                        me.module.methodFactory.methods.move.call(me,me.data.down);
                        break;
                }
            },
            move: function(arr) {
                var me = this;
                 me.module.methodFactory.methods.deleSpace.call(me,arr);
                 me.module.methodFactory.methods.concat.call(me,arr);
                 me.module.methodFactory.methods.deleSpace.call(me,arr);
                 me.module.methodFactory.methods.judge.call(me);
                 me.module.methodFactory.methods.updata.call(me);
            },
            judge: function() {
                var me = this;
                var resultEmpty = me.data.dom.some(i => {
                    return i.txt === "";
                });
                if (!resultEmpty) {
                    var resultSame =  me.module.methodFactory.methods.same.call(me);
                    if (!resultSame) {
                        alert("你输了");
                        return;
                    }
                } else {
                     me.module.methodFactory.methods.birth.call(me);
                }
            },
            same: function() {
                var me = this;
                var flag = 0;
                var factor= me.module.methodFactory.methods;
                if (factor.test.call(me,me.data.l) || factor.test.call(me,me.data.r)  || factor.test.call(me,me.data.down)  || factor.test.call(me,me.data.up))
                    flag = 1;
                return flag;
            },
            test: function(arr) {
                var flag = 0;
                arr.forEach(i => {
                    i.forEach((it, index) => {
                        if (index === 0)
                            return;
                        if (it.txt === i[index - 1].txt) {
                            flag = 1;
                        }
                    });
                });
                return flag
            }
        }
    });
})()