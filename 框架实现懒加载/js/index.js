;
(function() {
    DD.createModule({
        el: '.el-load',
        data: {
            img: [{ src: 'imgs/pre.png' }, { src: 'imgs/pre.png' }, { src: 'imgs/pre.png' }, { src: 'imgs/pre.png' }, { src: 'imgs/pre.png' }, { src: 'imgs/pre.png' }],
            wrap: [],
            data: [{ src: 'imgs/1.jpg' }, { src: 'imgs/2.jpg' }, { src: 'imgs/3.jpg' }, { src: 'imgs/4.jpg' }, { src: 'imgs/5.jpg' }, { src: 'imgs/6.jpg' }],
            index: 0,
            tem: 0,
            d: [],
            finish: false,
            height:0
        },
        onFirstRender: function() {
            var me = this;
            me.data.height=parseInt(DD.css(document.querySelector(".container"),"height"));

            me.module.methodFactory.methods.getDom.call(me);
            me.data.wrap.forEach(i => {
                me.data.d.push(me.module.methodFactory.methods.getTop.call(me, i));
            });
            me.module.methodFactory.methods.loadSrc.call(me);
        },
        methods: {
            loadSrc: function() {
                var me = this;
                me.data.d.forEach((i, index) => {
                    if (i < me.data.height) {
                        me.data.img[index].src = me.data.data[index].src;
                        me.data.index = index;
                    }
                });
            },
            getDom: function() {
                var me = this;
                me.data.wrap =[...document.querySelectorAll(".item")];
            },
            getTop: function(i) {
                var me = this;
                var parent = i.parentNode;
                var count = i.offsetTop;
                while (parent.className!== "container") {
                    if (DD.css(parent, "position") !== "static") {
                        count += parent.offsetTop;
                    }
                    parent = parent.parentNode;
                }
                return count;
            },
            myscroll: function(e, d, v) {
                var me = this;
                if (me.data.finish)
                    return;
                var tem = me.module.methodFactory.methods.judge.call(me, v.scrollTop);
                if (tem) {
                    me.module.methodFactory.methods.load.call(me, me.data.index, tem);
                }
            },
            load: function(come, go) {
                var me = this;
                if (go === me.data.wrap.length - 1)
                    me.data.finish = true;
                for (var i = come + 1; i <= go; i += 1) {
                    me.data.img[i].src = me.data.data[i].src;
                }
                me.data.index = go;
            },
            judge: function(d) {
                var me = this;
                if (me.data.finish)
                    return false;
                var tem = 0;
                me.data.d.forEach((i, index,arr) => {
                    if (me.data.d[index + 1]) {
                        if (i - me.data.height <= d && arr[index + 1] - me.data.height> d) {
                            tem = index;
                        }
                    }
                });
                if (d >= me.data.d[me.data.d.length - 1] -me.data.height) {
                    tem = me.data.d.length - 1;
                }
                if (tem <= me.data.index)
                    return false;
                return tem;
            },
        }
    });
})()