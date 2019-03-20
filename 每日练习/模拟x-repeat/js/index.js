;
(function() {
    var repeat = function() {
        var me = this;
        me.container = null;
        me.data = {
            data: [{ a: 1 }, { a: 2 }, { a: 3 },{a:4},{a:5}],
            methods: {
                test: function(e, d, v) {
                    console.log(e);
                    console.log(v);
                    console.log(d);
                }
            }
        };
        me.init();
    };
    repeat.prototype = {
        contructor: repeat,
        init: function() {
            var me = this;
            me.container = document.querySelector(".container");
            me.getData(me.data, me.container);
        },
        bindData: function() {
            var me = this;
            me.data.field = {};
            Obejct.keys(me.data).forEach(i => {
                me.data.field = me.data[i];
            });
        },
        getData: function(d, parent) {
            var me = this;
            var arr = [];
            var tem = [...parent.children];
            tem.forEach((i, index) => {
                var str = i.getAttribute("x-repeat");
                if (!str || !d[str]) {
                    return;
                }
                var event = [];
                var reg = /^e/g;
                [...i.attributes].forEach((it) => {
                    if (reg.test(it.nodeName)) {
                        event.push({
                            name: it.name.replace(/^e-/, ""),
                            value: it.nodeValue
                        });
                        i.removeAttribute(it.nodeName);
                    }
                });
                i.removeAttribute("x-repeat");
                d[str].forEach((it, index) => {
                    var dom = i.cloneNode(true);
                    event.forEach(is => {
                        dom.addEventListener(is.name, function(e) {
                            me.data.methods[is.value].call(me, e, d[str][index], dom)
                        }, false);
                    });
                    arr.push(dom);
                });
                arr.forEach((i, index) => {
                    parent.append(i);
                });
                parent.removeChild(i);
            });
        }
    };
    new repeat();
})()