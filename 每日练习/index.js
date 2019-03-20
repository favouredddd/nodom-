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
            var t = new Date();
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
            var t = new Date();
            // if (t - me.sava.time[0] > 50) {
            //     me.sava.time[0] = me.sava.time[1];
            //     me.sava.time[1] = t;
            //     me.sava.site[0] = me.sava.site[1];
            //     me.sava.site[1] = {
            //         x: e.touches[0].pageX,
            //         y: e.touches[0].pageY,
            //     }
            // }
            me.sava.old = {
                x: e.touches[0].pageX,
                y: e.touches[0].pageY,
            };
        },
        end: function(e) {
            var me = this;
            var index = 0;
            if (new Date() > me.sava.time[1] + 30) {
                index = 1;
            }
            var dx = me.sava.old.x - me.sava.site[index].x;
            var dy = me.sava.old.y - me.sava.site[index].y;
            var s = dx * dx + dy * dy;
            if (s < 100 || new Date() - me.sava.time[index] > 300)
                return;
            var dr = Math.abs(dx / dy);

            if (Math.sqrt(s) / (new Date() - me.sava.time[index]) > 0.05) {
                if (dx < 0 && dr > 1) {
                    if (me.event.left) {
                        me.event.left();
                    }
                }
                if (dx > 0 && dr > 1) {
                    if (me.event.right) {
                        me.event.right();
                    }
                }
                if (dy < 0 && dr < 1) {
                    if (me.event.up) {
                        me.event.up();
                    }
                }
                if (dy > 0 && dr < 1) {
                    if (me.event.down) {
                        me.event.down();
                    }
                }
            }
        }
    };
    var carousel = function() {
        var me = this;
        me.container = null;
        me.imgContainer = null;
        me.imgs = [];
        me.spans = [];
        me.d = 0;
        me.index = 0;
        me.width = 0;
        me.heigt = 0;
        me.right = true;
        me.speed = 0;
        me.timer = null;
        flag = true;
        me.init();
    }
    carousel.prototype = {
        constructor: carousel,
        stop: function() {
            var me = this;
            clearInterval(me.timer);
        },
        continue: function() {
            var me = this;
            me.setTime();
        },
        init: function() {
            var me = this;
            me.container = document.querySelector(".container");
            me.imgContainer = me.container.querySelector(".imgContainer");
            me.width = parseInt(window.getComputedStyle(me.container).width);
            me.imgs = [...me.imgContainer.querySelectorAll("img")];
            me.spans = [...me.container.querySelectorAll("span")];
            document.addEventListener('visibilitychange', function() {
                var isHidden = document.hidden;
                if (isHidden) {
                    me.stop();
                } else {
                    me.continue();
                }
            });
            new swipe(me.container, { left: me.moveLeft.bind(me), right: me.moveRight.bind(me) });
            me.imgs.forEach(i => {
                i.style.width = me.width + 'px';
            });
            me.imgContainer.style.width = me.imgs.length * me.width + 'px';
            me.imgContainer.style.transform = "translateX(" + -1 * me.width + "px)";
            me.speed = -1 * me.width / 10 | 0;
            me.d = me.width * -1;
            me.spans[0].classList.add("check");
            me.spans.forEach((i, index) => {
                i.$index = index;
            });
            me.setTime();
            me.index = 0;
            document.querySelector(".spanContainer").addEventListener("click", function(e) {
                if (e.target.$index === undefined)
                    return;
                else {
                    me.selectMove(e.target.$index);
                }
            }, false);
        },
        setTime: function() {
            var me = this;
            me.timer = setInterval(me.move.bind(me), 3000);
        },
        move: function() {
            var me = this;
            var tem = me.right ? me.width * -1 : me.width;
            me.speed = Math.abs(me.speed);
            if (me.right) {
                me.speed = -1 * Math.abs(me.speed);
            }
            me.updata(me.d, me.d + tem);
        },
        moveLeft: function() {
            var me = this;
            if (!me.flag)
                return;
            clearInterval(me.timer);
            me.speed = Math.abs(me.speed) * -1;
            me.updata(me.d, me.d - me.width);
            me.setTime();
        },
        moveRight: function() {
            var me = this;
            if (!me.flag)
                return;
            clearInterval(me.timer);
            me.speed = Math.abs(me.speed);
            me.updata(me.d, me.d + me.width);
            me.setTime();
        },
        selectMove: function(index) {
            var me = this;
            if (index === me.index || !me.flag)
                return;
            me.flag = false;
            clearInterval(me.timer);
            var tem = Math.abs(index - me.index);
            if (index > me.index) {
                me.speed = -1 * Math.abs(me.speed) * tem;
                me.updata(me.d, me.d - tem * me.width);
            }
            if (index < me.index) {
                me.speed = Math.abs(me.speed) * tem;
                me.updata(me.d, me.d + tem * me.width);
            }
            me.speed = me.speed / tem;
            me.setTime();
        },
        updata: function(come, go) {
            var me = this;
            me.flag = false;
            if ((me.speed < 0 && come > go) || (me.speed > 0 && come < go)) {
                come += me.speed;
                if ((me.speed < 0 && come <= go) || (me.speed > 0 && come >= go)) {
                    come = go;
                }
                me.imgContainer.style.transform = "translateX(" + come + "px)";
                window.requestAnimationFrame(me.updata.bind(me, come, go));
            } else {
                me.d = go;
                me.imgContainer.style.transform = "translateX(" + come + "px)";
                if (me.d > -1 * me.width) {
                    me.d = -1 * (me.imgs.length - 2) * me.width;
                    me.imgContainer.style.transform = "translateX(" + (me.imgs.length - 2) * me.width * -1 + 'px)';

                }
                if (me.d < (me.imgs.length - 2) * me.width * -1) {
                    me.d = -1 * me.width;
                    me.imgContainer.style.transform = "translateX(" + -1 * me.width + ')px';

                }
                me.spans.forEach(i => {
                    i.classList.remove("check");
                });
                me.spans[Math.abs(me.d) / me.width - 1].classList.add("check");
                me.index = Math.abs(me.d) / me.width - 1;
                me.flag = true;
            }
        }
    }
    new carousel();
})()