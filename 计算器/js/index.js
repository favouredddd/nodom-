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
    };
    setFontSize();
    var caculate = function() {
        var me = this;
        me.priority = [{ char: "+", ord: 1 }, { char: "-", ord: 1 }, { char: "/", ord: 2 }, { char: "*", ord: 2 }, { char: '(', ord: 0 }, { char: ')', ord: 100 }]
        me.infix = [];
        me.suffix = [];
        me.wrap = null;
        me.display = null;
        me.Ui = ["+", "-", "*", "/", "(", ")", "c", "="];
        me.result = [];
        me.init();
    };
    caculate.prototype = {
        constructor: caculate,
        init: function() {
            var me = this;
            me.setUi();
        },
        setUi: function() {
            var me = this;
            me.wrap = document.querySelector(".list");
            me.display = document.querySelector(".textarea");
            me.wrap.addEventListener("click", function(e) {
                if (e.target.className === "list")
                    return;
                var str = e.target.innerHTML;
                var tem = me.result[me.result.length - 1];
                if (!str) {
                    return;
                }
                if (!me.result.length && (me.judge(str) || str === "(")) {
                    if (me.judge(str)) {
                        me.result.push(parseInt(str));
                    } else {
                        me.result.push(str);
                    }
                    me.upDate();
                    return;
                }
                if (!me.result.length && !me.judge(str))
                    return;
                //清除符号
                if (str === "c") {
                    me.end();
                    me.display.innerHTML = "";
                    return;
                }
                //是数字
                if (me.judge(str)) {
                    me.dealDate(str);
                    me.upDate();
                    return;
                } //右括号
                if (str === ')') {
                    if (me.judge(tem)||me.getCount()) {
                        me.result.push(str);
                        me.upDate();
                        return;
                    }
                }
                //左括号
                if (str === "(") {
                    if (me.judge(tem) || tem === ")")
                        return;
                    else {
                        me.result.push(str);
                        me.upDate();
                        return;
                    }
                }
                if (str === "+" || str === "-" || str === "*" || str === "/") {
                    if (me.judge(tem) || tem === ")") {
                        me.result.push(str);
                        me.upDate();
                        return;
                    }
                }
                if (str === "=") {
                      if(me.judge(tem)||tem===")")
                        me.deal();
                }
            }, false);
            var tem = [];
            for (var i = 0; i < 10; i += 1) {
                tem.push(i);
            }
            var str = "";
            me.Ui = tem.concat(me.Ui);
            me.Ui.forEach((i, index) => {
                var tem = "item";
                if (index > 9)
                    tem = "symbol";
                if(index>15)
                    tem="ensure"
                str += `<div class="${tem}">${i}</div>`;
            });
            me.wrap.innerHTML = str;
        },
        deal: function() {
            var me = this;
            me.getInfix();
            me.getSuffix();
        },
        getInfix: function() {
            var me = this;
            //r1为数字
            //r2为运算符堆栈
            var r1 = [];
            var r2 = [];
            console.log(me.result);
            me.result.forEach(i => {
                if (me.judge(i)) {
                    r1.push(i);
                } else {
                    if (!r2.length) {
                        r2.push(i);
                    } else {
                        var tem = r2[r2.length - 1];
                        if (i === "(") {
                            r2.push(i);
                            return;
                        }
                        if (i === ")") {
                            r1.push(tem);
                            r2.pop();
                            tem = r2[r2.length - 1];
                            while (tem !== "(") {
                                r1.push(tem);
                                r2.pop();
                                tem = r2[r2.length - 1];
                            }
                            r2.pop();
                            return;
                        }
                        while (r2.length && me.getPri(i, tem)) {
                            r1.push(tem);
                            r2.pop();
                            if (r2.length) {
                                tem = r2[r2.length - 1];
                            } else {
                                break;
                            }
                        }
                        r2.push(i);
                    }
                }
            });
            r2 = r2.reverse();
            r1 = r1.concat(r2);
            me.infix = r1;
        },
        getSuffix: function() {
            var me = this;
            var r = [];
            me.infix.forEach(i => {
                if (me.judge(i)) {
                    r.push(i);
                } else {
                    var r1 = r.pop();
                    var r2 = r.pop();
                    r.push(me.getResult(r1, r2, i));
                }
            });
            me.display.innerHTML = r[0];
            me.end();
            me.result.push(r[0]);
            console.log(me.result);
        },
        upDate: function() {
            var me = this;
            var str = "";
            me.result.forEach(i => {
                str += i;
            });
            me.display.innerHTML = str;
        },
        dealDate: function(str) {
            var me = this;
            var tem = me.result
            if (me.judge(tem[tem.length - 1])) {
                tem[tem.length - 1] = parseInt(tem[tem.length - 1]) * 10 + parseInt(str);
                return;
            }
            if (tem[tem.length - 1] !== ")") {
                tem.push(parseInt(str));
            }
        },
        judge: function(str) {
            var me = this;
            if (str === 0 || str === "0")
                return true;
            if (!str)
                return false;
            for (var i = 10; i < me.Ui.length; i += 1) {
                if (str === me.Ui[i])
                    return false;
            }
            return true;
        },
        getPri: function(r1, r2) {
            var me = this;
            var tem1 = me.priority.filter(i => {
                return i.char === r1;
            });
            var tem2 = me.priority.filter(i => {
                return i.char === r2;
            });
            if (tem1[0].ord <= tem2[0].ord)
                return 1;
            return 0;
        },
        getResult: function(r1, r2, char) {
            var me = this;
            if (char === "/" && r1 === 0) {
                return 1;
                throw ("除数不能为0")
            }
            switch (char) {
                case "*":
                    return r2 * r1;
                case '/':
                    return r2 / r1;
                case '+':
                    return r2 + r1;
                case '-':
                    return r2 - r1;
            }
        },
        end: function() {
            var me = this;
            me.result = [];
            me.infix = [];
            me.suffix = [];
        },
        getCount:function(){
            var me=this;
            var r1=0,r2=0;
            me.result.forEach(i=>{
                if(i==="("){
                    r1+=1;
                }
                if(i===")"){
                    r2+=1;
                }
            });
            return r2<r1;
        }
    };
    new caculate();
})()

function isIntNum(val) {
    var regPos = /^\d+$/; // 非负整数
    var regNeg = /^\-[1-9][0-9]*$/; // 负整数
    if (regPos.test(val) || regNeg.test(val)) {
        return true;
    } else {
        return false;
    }
}
console.log(isIntNum(112))