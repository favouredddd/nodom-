;
(function() {
    var r = DD.createModule({
        el: '.el-plugin',
        data: {
            li: [
                { txt: "a" }, { txt: "b" }, { txt: "c" }, { txt: "aa" }, { txt: "aba" }
            ],
            results: [{ txt: 1 }],
            result: "",
            now: 0,
            flag:false
        },
        onBeforeFirstRender: function() {
            var me = this;
            window.addEventListener("keyup", function(e){me.module.methodFactory.methods.keyDown.call(me,e)}, false);
        },
        methods: {
            start: function(e, d, v) {
                var me = this;
                me.data.result = v.value;
                me.data.flag = true;
                if(!me.data.flag){
                    me.data.results=[];
                    return ;
                }
                me.data.view=v;
                me.module.methodFactory.methods.updata.call(me);
            },
            updata: function() {
                var me = this;
                var str = "^" + me.data.result;
                var judge = RegExp(str, "i");
                me.data.results = [];
                me.data.li.forEach(i => {
                    if (judge.test(i.txt)) {
                        me.data.results.push({ txt: i.txt, check: false });
                    }
                });
                if(!me.data.results.length){
                    me.data.flag=false;
                    return ;
                }
                me.data.results[0].check = true;
                me.data.$set("results", me.data.results);
                me.data.now = 0;
            },
            keyDown: function(e) {
                var me=this;
                if (!me.data.flag)
                    return;
                if (e.keyCode === 38 || e.keyCode === 40) {
                    me.data.results[me.data.now].check = false;
                    if (e.keyCode === 38 && me.data.now>0) {
                        me.data.now -= 1;
                    }
                    if (e.keyCode === 40 && me.data.now < me.data.results.length - 1) {
                        me.data.now += 1;
                    }
                    me.data.results[me.data.now].check = true;
                }
                if(e.keyCode===13){
                    me.data.flag=false;
                    me.data.results.forEach(i=>{
                        if(i.check){
                            me.data.all=i.txt;
                        }
                    });
                    me.data.view.value=me.data.all;
                }
            },
            check:function(e,d,v){
                var me=this;
                me.data.all=d.txt;
                me.data.flag=false;
                me.data.view.value=me.data.all;
            }
        }
    });
})()