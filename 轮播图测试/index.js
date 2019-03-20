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
            if (event){
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
            if (t - me.sava.time[0] > 50) {
                me.sava.time[0] = me.sava.time[1];
                me.sava.time[1] = t;
                me.sava.site[0] = me.sava.site[1];
                me.sava.site[1] = {
                    x: e.touches[0].pageX,
                    y: e.touches[0].pageY,
                }
            }
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
                    me.event.left&&me.event.left();
                }
                if (dx > 0 && dr > 1) {
                    me.event.right&&me.event.right();
                }
                if (dy < 0 && dr < 1) {
                     me.event.up&&me.event.up();
                }
                if (dy > 0 && dr < 1) {
                    me.event.down&&me.event.down();
                }
            }
        }
    };
    //预先加载图片
    var imgArr = [];
    var imgSrc = [];
    var t=new Date().getTime();
    for (var i = 1; i <= 5; i += 1) {
        var tem = new Image();
        // tem.src = "imgs/" + i + ".jpg";
        // imgArr.push(tem);
        imgSrc.push("imgs/banner00" + i + ".jpg");
    }
    var come = [];
    var to = [];
    var birth = function(srcImg, arr, imgArr) {
        srcImg.forEach(i => {
            arr.push(new Promise(function(r1, r2) {
                var tem = new Image();
                imgArr.push(tem);
                tem.onload =r1.bind(null);
                tem.src = i;
            }));
        })
    }
   async function start(){
         birth(imgSrc, come, to);
         await Promise.all(come).then(function() {
            console.log("图片回来了");
        });
         // await new Promise(function(r1,r2){
         //    setTimeout(r1.bind(),3000);
         // });
          imgArr=to;
         new carousel();
    }
    var carousel = function() {
        var me = this;
        me.d = 0;
        me.speed = 10;
        me.index = 0;
        me.imgs = [];
        me.timer = null;
        me.flag = true;
        me.spans = []
        me.tem = null;
        me.left = true;
        me.init();
    };
    carousel.prototype = {
        constructor: carousel,
        stop: function() {
            var me = this;
            clearInterval(me.timer);
        },
        continue: function() {
            var me = this;
            me.setTimer();
        },
        init: function() {
            var me = this;
            me.container = document.querySelector(".container");
            me.carousel = document.querySelector(".carousel");
            me.spanContainer = me.carousel.querySelector(".spanContainer");
            me.spanContainer.addEventListener("click", function(e) {
                if (e.target.$index===undefined || me.index === e.target.$index)
                    return;
                if (!me.flag)
                    return;
                me.moveSpan(e.target.$index);
            }, false);
            me.width = parseInt(window.getComputedStyle(me.container).width);
            me.imgs = [...me.container.querySelectorAll("img")];
            var height=parseInt(window.getComputedStyle(me.imgs[0]).height);
            me.carousel.style.height=height+'px'
            me.spans = [...document.querySelectorAll("span")];
            me.spans.forEach((i, index) => {
                i.$index = index;
            });
            me.spans[0].classList.add("check");
            new swipe(me.carousel, {
                left: me.go.bind(me, 1),
                right: me.go.bind(me, -1)
            });
            //处理最小化窗口的时候
            document.addEventListener('visibilitychange', function() {
                var isHidden = document.hidden;
                if (isHidden) {
                    me.stop();
                } else {
                    me.continue();
                }
            });
            me.setTimer();
            // //使用完毕回收空间
            me.spanContainer=null;
            me.carousel=null;
        },
        moveSpan: function(index) {
            var me = this;
            clearInterval(me.timer);
            if (me.index > index) {
                me.index = (index + 1 + imgArr.length) % imgArr.length;
                me.moveLeft();
            } else {
                me.index = (index - 1 + imgArr.length) % imgArr.length;
                me.moveRight();
            }
            me.setTimer();
        },
        setTimer: function() {
            var me = this;
            me.timer = setInterval(me.moveRight.bind(me), 3000);
        },
        moveLeft: function() {
            var me = this;
            me.container.style.left = -me.width + "px";
            me.left = true;
            me.index = (me.index - 1 + imgArr.length) % imgArr.length;
            me.container.insertBefore(imgArr[me.index], me.imgs[0]);
            me.tem = imgArr[me.index];
            me.speed = Math.abs(me.speed);
            me.move(-1 * me.width / 2, 0);
        },
        moveRight: function() {
            var me = this;
            me.container.style.left = 0 + "px";
            me.left = false;
            me.index = (me.index + 1 + imgArr.length) % imgArr.length;
            me.container.appendChild(imgArr[me.index]);
            me.tem = imgArr[me.index];
            me.speed = Math.abs(me.speed) * -1;
            me.move(0, -1 * me.width / 2);
        },
        move: function(come, go) {
            var me = this;
            me.flag = false;
            if (me.left && come < 0) {
                come += me.speed;
                if (come > 0) {
                    come = 0;
                }
                me.container.style.left = come + 'px';
                window.requestAnimationFrame(me.move.bind(me, come, go));
                return;
            }
            if (!me.left && come > go) {
                come += me.speed;
                if (come < -1 * me.width / 2) {
                    come = -1 * me.width / 2;
                }
                me.container.style.left = come + 'px';
                window.requestAnimationFrame(me.move.bind(me, come, go));
                return;
            }
            me.flag = true;
            me.container.removeChild(me.imgs[0]);
            me.imgs[0] = me.tem;
            me.container.style.left = 0 + "px"
            me.updataSpan();
        },
        updataSpan: function() {
            var me = this;
            me.spans.forEach(i => {
                i.classList.remove("check");
            });
            me.spans[me.index].classList.add("check");
        },
        go: function(dx) {
            var me = this;
            if (!me.flag)
                return;
            me.flag = false;
            clearInterval(me.timer);
            if (dx === 1) {
                me.moveRight();
            } else {
                me.moveLeft();
            }
            me.setTimer();
        }
    };
    start();
})()