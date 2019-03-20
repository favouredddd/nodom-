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
    var tap = function(dom, e) {
        var me = this;
        dom.addEventListener("touchstart", function(e) { me.start.call(me, e) }, false);
        dom.addEventListener("touchmove", function(e) { me.move.call(me, e) }, false);
        dom.addEventListener("touchend", function(e) { me.end.call(me, e) }, false);
        me.e = e;
    };
    tap.prototype = {
        constructor: tap,
        start: function(e) {
            var me = this;
            me.sava = { x: e.touches[0].pageX, y: e.touches[0].pageY, t: Date.now() };
        },
        move: function(e) {
            var me = this;
            var dx = e.touches[0].pageX - me.sava.x;
            var dy = e.touches[0].pageY - me.sava.y;
            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                me.sava.move = true;
            }
        },
        end: function(e) {
            var me = this;
            if (me.sava.move || Date.now() - me.sava.t > 200) {
                return;
            }
            me.e();
        }
    };
    var swipe = function(dom, event) {
        var me = this;
        me.dom = null;
        me.sava = {
            time: [],
            site: [],
            old: {}
        };
        me.event = {
            left: function() {},
            up: function() {},
            down: function() {},
            right: function() {}
        };
        me.init(dom, event);
    };
    swipe.prototype = {
        constructor: swipe,
        init: function(dom, event) {
            var me = this;
            me.addFunc(dom);
            if (event) {
                Object.getOwnPropertyNames(event).forEach(i => {
                    me.event[i] = event[i];
                });
            }
        },
        addFunc: function(dom) {
            var me = this;
            me.dom = dom;
            me.dom.addEventListener("touchstart", function(e) {
                me.start(e);
            }, false);
            me.dom.addEventListener("touchmove", function(e) {
                me.move(e)
            }, false);
            me.dom.addEventListener("touchend", function(e) {
                me.end(e);
            }, false);
        },
        start: function(e) {
            var me = this;
            var t = Date.now();
            me.sava = {
                time: [],
                site: [],
                old: {}
            };
            me.sava.time.push(t);
            me.sava.time.push(t);
            me.sava.site.push({
                x: e.touches[0].pageX,
                y: e.touches[0].pageY,
            });
            me.sava.site.push({
                x: e.touches[0].pageX,
                y: e.touches[0].pageY,
            });
            me.sava.odl = {
                x: e.touches[0].pageX,
                y: e.touches[0].pageY,
            };
        },
        move: function(e) {
            var me = this;
            var t = Date.now();
            var btn = e.touches[0];
            if (t - me.sava.time[0] > 500) {
                me.sava.time[0] = me.sava.time[1];
                me.sava.time[1] = t;
                me.sava.site[0] = me.sava.site[1];
                me.sava.site[1] = {
                    x: btn.pageX,
                    y: btn.pageY,
                }
            }
            me.sava.old = {
                x: btn.pageX,
                y: btn.pageY,
            };
        },
        end: function(e) {
            var me = this;
            var index = 1;
            var t = Date.now();
            if (t < me.sava.time[1] + 30) {
                index = 0;
            }
            var dx = me.sava.old.x - me.sava.site[index].x;
            var dy = me.sava.old.y - me.sava.site[index].y;
            var s = dx * dx + dy * dy;
            if (s < 100 || t - me.sava.time[index] > 300)
                return;
            var dr = Math.abs(dx / dy);
            if (Math.sqrt(s) / (t - me.sava.time[index]) > 0.05) {
                if ((dy === 0 && dx < 0) || (dx < 0 && dr > 1)) {
                    me.event.left && me.event.left();
                }
                if ((dy === 0 && dx > 0) || (dx > 0 && dr > 1)) {
                    me.event.right && me.event.right();
                }
                if ((dx === 0 && dy > 0) || (dy < 0 && dr < 1)) {
                    me.event.up && me.event.up();
                }
                if ((dy < 0 && dx === 0) || (dy > 0 && dr < 1)) {
                    me.event.down && me.event.down();
                }
            }
        }
    };
    var myGame = function() {
        var me = this;
        me.color = ["red", "green", "blue", "black", "blue", "yellow", "pink", "urple", "origin", "salmon", "silver", "winered"];
        me.count = 0;
        me.dom = [];
        me.l = [
            [],
            [],
            [],
            []
        ];
        me.r = [];
        me.up = [
            [],
            [],
            [],
            []
        ];
        me.flag = false;
        me.down = [];
        me.container = null;
        me.number = null;
        me.reversebtn = null;
        me.init();
    };
    myGame.prototype = {
        contructor: myGame,
        init: function() {
            var me = this;
            me.container = document.querySelector(".itemContainer");
            me.number = document.querySelector(".number");
            me.reversebtn = document.querySelector(".reverse");
            me.createDom();
            me.start();
            window.addEventListener("keydown", function(e) {
                me.key(e.keyCode);
            }, false);
            me.reversebtn.addEventListener("click", me.start.bind(me), false);
            new swipe(window, {
                left: me.move.bind(me, me.l),
                right: me.move.bind(me, me.r),
                up: me.move.bind(me, me.up),
                down: me.move.bind(me, me.down),
            });
            new tap(window, function() {
                console.log(111);
            })
        },
        start: function() {
            var me = this;
            me.count = 0;
            me.initData();
            me.dom.forEach(i => {
                i.innerHTML = "";
            });
            me.birth();
            me.birth();
            me.updata();
        },
        createDom: function() {
            var me = this;
            var str = ""
            for (var i = 0; i < 16; i += 1) {
                str += `<div></div>`;
            }
            me.container.innerHTML = str;
        },
        initData: function() {
            var me = this;
            me.dom = [...me.container.querySelectorAll("div")];
            me.dom.forEach((i, index) => {
                var tem = index / 4 | 0;
                me.l[tem][index % 4] = i;
            });
            me.l.forEach(i => {
                var tem = i.slice(0).reverse();
                me.r.push(tem)
            });
            me.l.forEach((i) => {
                i.forEach((it, index) => {
                    me.up[index % 4].push(it);
                })
            });
            me.up.forEach(i => {
                var tem = i.slice(0).reverse();
                me.down.push(tem);
            });
        },
        birth: function() {
            var me = this;
            while (1) {
                var tem = Math.random() * 16 | 0;
                if (me.dom[tem].innerHTML === "") {
                    me.dom[tem].innerHTML = 2;
                    me.flag = false;
                    return;
                }
            }
        },
        updata: function() {
            var me = this;
            me.dom.forEach(i => {
                var str = i.innerHTML;
                if (str === "") {
                    i.style.backgroundColor = "tan";
                } else {
                    i.style.backgroundColor = me.getColor(parseInt(i.innerHTML));
                }
            });
            me.number.innerHTML = me.count;
        },
        getColor: function(num) {
            var me = this;
            for (var i = 0; i < 20; i += 1) {
                if (Math.pow(2, i) === num) {
                    return me.color[i - 1];
                }
            }
        },
        deleSpace: function(arr) {
            var me=this;
            arr.forEach(i => {
                i.forEach((it, index) => {
                    if (index === 0)
                        return;
                    else {
                        var tem = index;
                        while (tem >= 1 && i[tem - 1].innerHTML === "" && i[tem].innerHTML !== "") {
                            me.flag = true;
                            i[tem - 1].innerHTML = i[tem].innerHTML;
                            i[tem].innerHTML = "";
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
                        if (i[index + 1].innerHTML === it.innerHTML && it.innerHTML !== "") {
                            me.flag = true;
                            var tem = 2 * parseInt(it.innerHTML);
                            it.innerHTML = tem;
                            me.count += tem;
                            i[index + 1].innerHTML = "";
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
                    me.move(me.l);
                    break;
                case 68:
                    me.move(me.r);
                    break;
                case 87:
                    me.move(me.up);
                    break;
                case 83:
                    me.move(me.down);
                    break;
            }
        },
        move: function(arr) {
            var me = this;
            me.deleSpace(arr);
            me.concat(arr);
            me.deleSpace(arr);
            me.judge();
            me.updata();
        },
        judge: function() {
            var me = this;
            var resultEmpty = me.dom.some(i => {
                return i.innerHTML === "";
            });
            if (!resultEmpty) {
                var resultSame = me.same();
                if (!resultSame) {
                    alert("你输了");
                    return;
                }
            } else {
                if (me.flag) {
                    me.birth();
                }
            }
        },
        same: function() {
            var me = this;
            var flag = 0;
            if (me.test(me.l) || me.test(me.r) || me.test(me.up) || me.test(me.down))
                flag = 1;
            return flag;
        },
        test: function(arr) {
            var flag = 0;
            arr.forEach(i => {
                i.forEach((it, index) => {
                    if (index === 0)
                        return;
                    if (it.innerHTML === i[index - 1].innerHTML) {
                        flag = 1;
                    }
                });
            });
            return flag
        }
    };
    new myGame();
})()