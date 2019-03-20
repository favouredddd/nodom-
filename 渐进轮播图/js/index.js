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
    var carousel = function() {
        var me = this;
        me.imgs = [];
        me.spans = [];
        me.container = null;
        me.imgContainer = null;
        me.scale = 0.85;
        me.wrap = [];
        me.d = 0;
        me.index = 0;
        me.timer=null;
        me.flag=true;
        me.init();
    }
    carousel.prototype = {
        constructor: carousel,
        init: function() {
            var me = this;
            me.container = document.querySelector(".container");
            me.spans=[...me.container.querySelectorAll("span")];
            me.width = parseInt(window.getComputedStyle(me.container).width);
            me.imgContainer = me.container.querySelector(".imgContainer");
            document.addEventListener("visibilitychange",function(){
            	if(document.hidden){
            		clearInterval(me.timer);
            	}else{
            		me.setTimer();
            	}
            },false);
            me.imgContainer.addEventListener("transitionend", function(e) {
            	if(e.target!==me.imgContainer)
            		return ;
            	me.flag=true;
                me.imgContainer.classList.remove("transform");
                me.wrap.forEach(i => {
                    i.classList.remove("transform");
                });
                if (me.d <=(me.wrap.length-4) * -1 * me.width / 2 - 1 * me.width * 1.5 / 2&&!me.right) {
                    me.d = -1 * me.width * 1.5 / 2;
                    me.index = 0;
                    me.wrap[2].style.transform = 'scale(1.15)';
                    me.imgContainer.style.transform = "translateX(" + me.d + "px)";
                }
                if(me.d>=-1 * me.width * 1.5 / 2+me.width/2){
                	me.d = (me.wrap.length-5) * -1 * me.width / 2 - 1 * me.width * 1.5 / 2;
                    me.index = 4;
                    me.wrap[6].style.transform = 'scale(1.15)';
                    me.imgContainer.style.transform = "translateX(" + me.d + "px)";
                }
                me.updataSpan();
            }, false);
            new swipe(me.container,{
            	left:me.goLeft.bind(me),
            	right:me.goRight.bind(me)
            });
            me.wrap = [...me.container.querySelectorAll(".wrap")];
            me.imgContainer.style.width = me.width * me.wrap.length + 'px';
            me.wrap.forEach(i => {
                i.style.width = me.width / 2 + 'px';
            });
            me.d = -1 * me.width * 1.5 / 2;
            me.imgContainer.style.transform = "translateX(" + me.d + "px)";
            me.wrap.forEach(i => {
                i.style.transform = "scale(" + me.scale + ")";
            });
            me.spans[0].classList.add("check");
            me.wrap[me.index + 2].style.transform = "scale(" + (2 - me.scale) + ")";
            me.setTimer();
        },
        goLeft:function(){
        	var me=this;
        	if(!me.flag)
        		return ;
        	me.flag=false;
        	clearInterval(me.timer);
        	var tem=me.right;
        	me.moveRight();
        	me.right=tem;
        	me.setTimer();
        },
         goRight:function(){
        	var me=this;
        	if(!me.flag)
        		return ;
        	me.flag=false;
        	clearInterval(me.timer);
        	var tem=me.right;
        	me.moveLeft();
        	me.right=tem;
        	me.setTimer();
        },
        setTimer: function() {
            var me = this;
            me.timer=setInterval(me.moveRight.bind(me), 3000);
        },
        moveRight: function() {
            var me = this;
            me.flag=false;
            me.imgContainer.classList.add("transform");
            me.d += -1 * me.width / 2;
            me.index += 1;
            me.right=false;
            me.wrap.forEach(i => {
                i.classList.add("transform");
                i.style.transform = "scale(" + me.scale + ")";
            });
            me.wrap[(me.index + 2) % me.wrap.length].style.transform = "scale(" + (2 - me.scale) + ")";
            me.imgContainer.style.transform = "translateX(" + me.d + "px)";
        },
        moveLeft:function(){
        	var me=this;
        	me.flag=false;
        	var me = this;
        	me.right=true;
            me.imgContainer.classList.add("transform");
            me.d += 1 * me.width / 2;
            me.index -= 1;
            me.wrap.forEach(i => {
                i.classList.add("transform");
                i.style.transform = "scale(" + me.scale + ")";
            });
            if(me.index<=-2){
            	me.index=me.index+me.wrap.length;
            }
            me.wrap[(me.index + 2) % me.wrap.length].style.transform = "scale("  + (2 - me.scale) + ")";
            me.imgContainer.style.transform = "translateX(" + me.d + "px)";
        },
        updataSpan:function(){
        	var me=this;
        	me.spans.forEach(i=>{
        		i.classList.remove("check");
        	});
        	me.spans[me.index].classList.add("check");
        }
    };
    new carousel();
})()