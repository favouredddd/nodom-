;
(function() {
    var complete = function(data) {
        var me = this;
        me.data = data;
        me.input = document.querySelector(".input");
        me.container = document.querySelector(".infor");
        me.wrap = document.querySelector(".input-wrap");
        me.li = [];
        me.result = [];
        me.now = 0;
        me.flag = 0;
        me.init();
    };
    complete.prototype = {
        init: function() {
            var me = this;
            me.input.addEventListener("input", function(e) {
                me.flag = 1;
            }, false);
            me.container.addEventListener("click", function(e) {
                me.select(e);
            }, false);
            window.addEventListener("keyup", function(e) {
                if (e.keyCode !== 40 && e.keyCode !== 13 && e.keyCode !== 38) {
                    if (me.flag) {
                        me.deal(me.input.value);
                    }
                    return;
                }
                if (!me.result.length || me.now < 0 || me.now >= me.li.length)
                    return;
                me.keyDown(e);
            }, );
        },
        deal: function(str) {
            var me = this;
            if (!str) {
                me.end();
                return;
            }
            me.now = 0;
            str = "^" + str;
            var judge = new RegExp(str, "i");
            me.result = [];
            me.data.forEach(i => {
                if (judge.test(i)) {
                    me.result.push(i);
                }
            });
            if (!me.result.length) {
                me.container.style.display = "none";
                return;
            }
            me.append();
        },
        append: function() {
            var me = this;
            me.container.innerHTML = undefined;
            var str = "";
            me.result.forEach((i, index) => {
                if (index == 0) {
                    str += "<li class='check'>" + i + "</li>";
                } else {
                    str += "<li>" + i + "</li>"
                }
            });
            me.container.innerHTML = str;
            me.container.style.display = "block";
            me.input.classList.add("border");
            me.li = [...document.querySelectorAll("li")];
            me.li.forEach((i, index) => {
                i.$field = me.result[index];
                i.$index = index;
            })
        },
        keyDown: function(e) {
            var me = this;
            if (e.keyCode === 13) {
                if (me.result.length) {
                    me.input.value = me.result[me.now];
                    me.end();
                }
                return;
            }
            if (e.keyCode === 40 && me.now < me.li.length - 1) {
                me.now += 1;
            }
            if (e.keyCode === 38 && me.now > 0) {
                me.now -= 1;
            }

            me.li.forEach(i => {
                i.classList.remove("check");
            });
            me.li[me.now].classList.add("check");
        },
        select: function(e) {
            var me = this;
            if (!e.target.$field)
                return;
            else {
                me.now = e.target.index;
                me.input.value = e.target.$field;
                me.end();
            }
        },
        end: function() {
            var me = this;
            me.flag = 0;
            me.container.style.display = "none";
            me.input.classList.remove("border");
        }
    };
    var my = new complete(["a", "b", "c", "aa", "aba"]);
})()