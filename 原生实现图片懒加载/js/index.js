;
(function() {
    var down = function() {
        var me = this;
        me.data = ["imgs/1.jpg", "imgs/2.jpg", "imgs/3.jpg", "imgs/4.jpg", "imgs/5.jpg", "imgs/6.jpg"];
        me.total = 0;
        me.scroll = 0;
        me.dom = [];
        me.domData = []
        me.init();
    }
    down.prototype = {
        contructor: down,
        init: function() {
            var me = this;
            me.getData();
            me.container=document.querySelector(".container")
            me.dom = [...document.querySelectorAll("img")];
            me.domData.forEach((i, index) => {
                if (i.value <= window.innerHeight) {
                    me.dom[index].src = me.data[index];
                    me.index = index;
                };
            });
            me.container.addEventListener("scroll", function(e) {
            	if(me.finish)
            		return ;
                var tem = me.judge(me.container.scrollTop);
                if (tem) {
                    me.load(me.index, tem);
                }
            }, false);
        },
        judge: function(d) {
            var me = this;
            if (me.finish)
                return false;
            var tem = 0;
            me.domData.forEach((i, index) => {
                if (me.domData[index + 1]) {
                    if (i.value - window.innerHeight <= d && me.domData[index + 1].value - window.innerHeight > d) {
                        tem = index;
                    }
                }
            });
            if (d >= me.domData[me.domData.length - 1].value - window.innerHeight) {
            	tem=me.domData.length-1;
            }
            if (tem <= me.index)
                return false;
            return tem;
        },
        load: function(come, go) {
            var me = this;
            if (go === me.dom.length - 1)
                me.finish = true;
            for (var i = come+1; i <= go; i += 1) {
                me.dom[i].src = me.data[i];
            }
            me.index=go;
        },
        getData: function() {
            var me = this;
            me.total = document.body.offsetHeight;
            me.dom = [...document.querySelectorAll(".img")];
            me.dom.forEach(i => {
                me.domData.push({ value: me.getTop(i) });
            });
        },
        getTop: function(dom) {
            var me = this;
            var parent = dom.parentNode;
            var count = dom.offsetTop;
            while (parent.tagName !== "BODY") {
                if (window.getComputedStyle(parent).position !== "static") {
                    count += parent.offsetTop;
                }
                parent = parent.parentNode;
            }
            return count;
        }
    };
    new down();
})()