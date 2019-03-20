;
(function() {
    var myBord = function() {
        var me = this;
        me.input = [];
        me.result = [];
        me.index = 0;
        me.special = null;
        me.start();
    };
    myBord.prototype = {
        constructor: myBord,
        start: function() {
            var me = this;
            me.wrap = document.querySelector(".wrap");
            me.special = me.wrap.querySelector(".special");
            me.input = [...me.wrap.querySelectorAll(".input")];
            me.input.forEach((i, index) => {
                i.addEventListener("focus", function(e) {
                	this.blur();
                }, false);
            });
            window.addEventListener("keydown", function(e) {
                me.keyDown(e.keyCode);
            });
            me.width = parseInt(window.getComputedStyle(me.special).width);
            me.update();
        },
        focus: function() {
            var me = this;
            me.update();
        },
        update: function() {
            var me = this;
            if (me.index < 6) {
                me.special.style.left = me.index * me.width + 'px';
            }else{
            	 me.special.style.display ="none";
            }
            for (var i = 0; i < 6; i += 1) {
                me.input[i].value = "";
            }
            me.result.forEach((i, index) => {
                me.input[index].value = "*";
            });
        },
        keyDown: function(char) {
            var me = this;
            if (char === 8) {
            	me.special.style.display ="block";
                if (me.result.length) {
                    me.result.pop();
                    me.index -= 1;
                }
                me.update();
                return;
            }
            if (me.result.length <6&&((char>=48&&char<=57)||(char>=96&&char<=105))) {
                me.result.push(char);
                me.index += 1;
                me.update();
                return;
            }
            if(me.result.length==6){
            	me.update();
            }
        }
    };
    new myBord();
})()