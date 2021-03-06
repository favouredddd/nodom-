;(function() {
    var plugin_13001 = function() {};
    plugin_13001.prototype = {
         init: function(view) {
            var tem = `<div class="common">
            <div class="left">
                <div class='item border-right add-btn'>新增</div>
                <div class='item border-right reverse-btn'>修改</div>
                <div class='item dele-btn'>删除</div>
            </div>
            <div class='right'>
                <div class='item search-btn'>查询</div>
                <div class='search'>
                    <input type="text" class="input" />
                </div>
            </div>
        </div>
        <div class="header" >
            <div class="head-cont">
                <div class='thead'>
                    <input class='input' type="checkbox" x-field='check_all' yes-value='true' no-value='false' />
                </div>
                <div x-repeat='thead' class='thead'>{{name}}</div>
            </div>
        </div>
        <div class="my-table">
            <div class="head-cont">
                <div class='rows'>
                    <input class="input" type="checkbox" x-field='check_all' yes-value='true' no-value='false' />
                </div>
                <div x-repeat='thead' class='rows'>{{name}}</div>
            </div>
            <div class="table">
                <div class="list" x-repeat='th' x-class="{'check':'check'}">
                    <div class='rows'>
                        <input class="input" type="checkbox" x-field='check' yes-value='true' no-value='false' />
                    </div>
                    <div class="rows" x-repeat='td'><span class="span">{{ct}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="addmmit">
            <div class="page">
                <div class='pre'>上一页</div>
                <div class='next'>下一页</div>
                <div class='go'>
                    <div class='ensure'>转到</div>
                    <input class='text' type="text" />
                </div>
            </div>
        </div>
        <div class="reverse" x-show="show_reverse">
            <div class="cont">
                <div class="head">编辑
                    <div class="dele"></div>
                </div>
                <div class="item" x-repeat=" reverse">
                    <div>{{name}}</div>
                    <input class="ipt" x-field="field" type="text" />
                </div>
                <div class="ensure">确定</div>
            </div>
        </div>`;
            view.innerHTML = tem;
        },
        render: function(view) {
            var me = this;
            me.datas = view.$getData().data;
            me.setwidth = function() {
                var me = this;
                me.dom1.forEach(function(item, index) {
                    DD.css(item, 'width', 100 / (me.data.thead.length + 1) + '%');
                    DD.css(item, 'padding', ' 2% 1%');
                    DD.css(item, 'fontSize', 12 + 'px');
                    DD.css(item, 'minWidth', 25 + 'px');
                    DD.css(item, 'cursor', 'pointer');
                    if (index % (me.data.thead.length + 1) !== 6) {
                        DD.css(item, 'border-right', '1px solid #ddd');
                    }
                });
                me.dom2.forEach(function(item, index) {
                    DD.css(item, 'width', 100 / (me.data.thead.length + 1) + '%');
                    DD.css(item, 'padding', ' 2% 1%');
                    DD.css(item, 'fontSize', 12 + 'px')
                    DD.css(item, 'boxSizing', "border-box")
                    DD.css(item, 'border-bottom', '1px solid #ddd')
                    if (index % (me.data.thead.length + 1) !== 6) {
                        DD.css(item, 'border-right', '1px solid #ddd');
                    }
                    //前期个为标题
                    if (index < me.data.thead.length + 1) {
                        DD.css(item, 'cursor', 'pointer');
                    }
                });
                DD.css(me.first_thead, "border", "1px solid #ddd");
                DD.css(me.header, "width", me.second_thead.offsetWidth + 'px');
                DD.css(me.header, "top", me.view.offsetTop + 'px');
            }
            setTimeout(function() {
                DD.css(view, "color", me.datas.color_1);
                var arr = Array.from(view.querySelector(".left").children);
                // arr.forEach(function(i) {
                //     DD.css(i, "background-color", me.datas.color_2);
                // })
                me.reverse = view.querySelector('.reverse');
                me.header = view.querySelector('.header');
                me.data = view.$getData().data;
                me.view = view.querySelector(".my-table");
                me.first_thead = view.querySelector(".head-cont");
                me.second_thead = me.view.querySelector('.head-cont');
                me.dom1 = me.first_thead.querySelectorAll('.thead');
                me.dom2 = view.querySelectorAll('.rows');
                me.setwidth();
                view.onresize = function() {
                    me.setwidth();
                }
                me.view.onscroll = function() {
                    me.setwidth();
                    if (me.view.scrollTop > me.second_thead.scrollHeight) {
                        DD.css(me.first_thead, "display", "block");
                    }
                    if (me.view.scrollTop <= me.second_thead.scrollHeight) {
                        DD.css(me.first_thead, "display", "none");
                    }
                };
                //搜索按钮
                new DD.Event({
                    eventName: 'click',
                    view: view.querySelector('.search-btn'),
                    handler: function(e, data, v) {
                        console.log(v.nextElementSibling.firstElementChild);
                        var tem = v.nextElementSibling.firstElementChild.value.replace(/ /ig, '');
                        var url = '';
                        var params = {
                            page: 1,
                            row: 15,
                        };
                        DD.request({
                            params: {
                                key: tem
                            },
                            url: "http://localhost:3000/api/search.action",
                            // successFunc: function(r) {
                            //     me.data.table.th = [];
                            //     r.rows.forEach(function(it, index, arr) {
                            //         me.data.table.th.push({
                            //             td: it,
                            //             check: false,
                            //         });
                            //     });
                            //     me.data.table.$set('th', me.data.table.th);
                            // }
                        });
                    }
                });
                //删除按钮
                new DD.Event({
                    eventName: 'click',
                    view: view.querySelector('.dele-btn'),
                    handler: function(e, data, view) {
                        for (var i = 0; i < me.data.th.length; i++) {
                            if (me.data.th[i].check === true || me.data.th[i].check === 'true') {
                                me.data.th.splice(i, 1);
                                i--;
                            }
                        }
                        me.data.check_all = false;
                    }
                });
                //修改按钮
                new DD.Event({
                    eventName: 'click',
                    view: view.querySelector('.reverse-btn'),
                    handler: function(e, data, view) {
                        var tem = null;
                        me.data.th.forEach(function(it, index, ar) {
                            if (it.check === true || it.check === 'true') {
                                tem = index;
                            }
                        });
                        if (!tem && tem !== 0) {
                            return;
                        }
                        me.data.th[tem].td.forEach(function(it, index) {
                            me.data.reverse[index].field = it.ct;
                        })
                        me.data.show_reverse = true;
                    }
                });
                //新增按钮
                new DD.Event({
                    eventName: 'click',
                    view: view.querySelector('.add-btn'),
                    handler: function(e, data, view) {
                        me.data.reverse.forEach(function(i) {
                            i.field = '';
                        });
                        me.data.show_reverse = true;
                    }
                });
                //新增加的确认按钮
                new DD.Event({
                    eventName: 'click',
                    view: me.reverse.querySelector('.ensure'),
                    handler: function(e, data, view) {
                        me.data.reverse.forEach(function(i) {
                            i.field = i.field + '';
                            i.field = i.field.replace(/ /ig, '');
                        });
                        me.data.show_reverse = false;
                    }
                });
                //新增加的退出按钮
                new DD.Event({
                    eventName: 'click',
                    view: me.reverse.querySelector('.dele'),
                    handler: function(e, data, view) {
                        me.data.reverse.forEach(function(i) {
                            i.field = '';
                        });
                        me.data.show_reverse = false;
                    }
                });
                //checkbox全选
                new DD.Event({
                    eventName: 'click',
                    view: me.second_thead,
                    handler: function(e, data, view) {
                        if (e.target.className === 'input') {
                            var bool = false;
                            if (me.data.check_all === 'false' || me.data.check_all === false)
                                bool = true;
                            me.data.th.forEach(function(i) {
                                i.check = bool;
                            });
                            return;
                        }
                        var key = e.target.innerHTML.replace(/ /g, '');
                        var index = 0;
                        me.data.thead.forEach(function(i, id, ar) {
                            if (i.name.trim() === key) {
                                index = id;
                            }
                        });
                        me.data.th.sort(function(a, b) {
                            return parseInt(a.td[index].ct) - parseInt(b.td[index].ct);
                        });
                        me.setwidth();
                    }
                });
                //checkbox全选
                new DD.Event({
                    eventName: 'click',
                    delg: true,
                    view: me.first_thead,
                    handler: function(e, data, view) {
                        me.view.scrollTop = 0;
                        if (e.target.className === 'input') {
                            var bool = false;
                            if (me.data.check_all === 'false' || me.data.check_all === false)
                                bool = true;
                            me.data.th.forEach(function(i) {
                                i.check = bool;
                            });
                            return;
                        }
                        var key = e.target.innerHTML.replace(/ /g, '');
                        var index = 0;
                        me.data.thead.forEach(function(i, id, ar) {
                            if (i.name.trim() === key) {
                                index = id;
                            }
                        });
                        me.data.th.sort(function(a, b) {
                            return parseInt(a.td[index].ct) - parseInt(b.td[index].ct);
                        });
                        me.setwidth();
                    }
                });
            }, 0);
        }
    };
    DD.Plugin.create('plugin_13001', plugin_13001);
})();