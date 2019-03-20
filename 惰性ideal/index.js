;
(function() {
    var load = function() {
        var me = this;
        me.wrap = document.querySelector(".wrap");
        me.imgContainer = me.wrap.querySelector(".img");
        me.display = me.imgContainer.querySelector(".display");
        me.init();
    };
    load.prototype = {
        constructor: load,
        init: function() {
            var me = this;
            var width = parseInt(window.getComputedStyle(me.imgContainer).width);
            var height = parseInt(window.getComputedStyle(me.imgContainer).height);
            var Top = me.getTop(window, me.imgContainer);
            me.display.style.backgroundSize = width + 'px ' + height + 'px';
            window.addEventListener("scroll", function(e) {
            	console.log(document.documentElement.scrollTop+100 - Top);
                me.dealImage(document.documentElement.scrollTop+100 -Top, width, height);
            }, false);
        },
        getTop: function(wrap, node) {
            var tem = node.offsetTop;
            var nodeP = node.parentNode;
            while (nodeP.tagName !== "BODY") {
                tem += nodeP.offsetTop;
                nodeP = nodeP.parentNode;
            }
            return tem;
        },
        dealImage: function(v, w, h) {
            var me = this;
            me.display.style.width = v * 10 + 'px';
            me.display.style.height = v * 10 + 'px';
            if (v * 10 >h) {
                me.display.style.top=(h-(v * 10))/2+ 'px';
                me.display.style.left=(h-(v * 10))/2 + 'px';
                me.display.style.backgroundPosition = (v * 10-h)/2+'px '+(v * 10-h)/2+'px';
            }else{
            	  me.display.style.top='0px';
                me.display.style.left='0px';
                me.display.style.backgroundPosition ="0px 0px";
            }
        }
    };
    new load();
})()