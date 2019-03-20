/**
 * 分页插件
 * 欲用此插件，必先在使用此插件的模块上有一个updatePage函数,用来点击之后刷新页面
 * page:当前页
 * to_page:输入框的数据（到第几页）
 * allpage:总共多少页
 * @return {[type]} [description]
 */
;(function () {
    var plugin_01001 = function () {
    };

    plugin_01001.prototype = {
        init: function (view) {
            var me = this;
            var template = `<div class="nd-plugin-paging">
                                <span>共<span class="red">{{total}}</span>条记录</span>
                                <span>共<span class="red">{{allpage}}</span>页</span>
                                <span>当前第<span class="red">{{page}}</span>页</span>
                                <div class="to-first" x-class="{'can-not':'page==1'}">首页</div>
                                <div class="to-prev" x-class="{'can-not':'page==1'}">上一页</div>
                                <div class="to-next" x-class="{'can-not':'page==allpage'}">下一页</div>
                                <div class="to-last" x-class="{'can-not':'page==allpage'}">末页</div>
                                <span>转到:</span>
                                <input type="number" x-field="to_page">
                                <div class="go-to">GO</div>
                            </div>`;
            view.innerHTML = template;
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render: function (view) {
            new DD.Event({
                eventName: 'click',
                view: view.querySelector('.to-first'),
                handler: function (e, d, v) {
                    if (this.data.page !== 1) {
                        this.data.page = 1;
                        this.module.methodFactory.methods.updatePage.call(this);
                    }
                }
            });
            new DD.Event({
                eventName: 'click',
                view: view.querySelector('.to-last'),
                handler: function (e, d, v) {
                    if (this.data.page !== this.data.allpage) {
                        this.data.page = this.data.allpage;
                        this.module.methodFactory.methods.updatePage.call(this);
                    }
                }
            });
            new DD.Event({
                eventName: 'click',
                view: view.querySelector('.to-prev'),
                handler: function (e, d, v) {
                    if (this.data.page > 1) {
                        this.data.page--;
                        this.module.methodFactory.methods.updatePage.call(this);
                    }
                }
            });
            new DD.Event({
                eventName: 'click',
                view: view.querySelector('.to-next'),
                handler: function (e, d, v) {
                    if (this.data.page < this.data.allpage) {
                        this.data.page++;
                        this.module.methodFactory.methods.updatePage.call(this);
                    }
                }
            });
            new DD.Event({
                eventName: 'click',
                view: view.querySelector('.go-to'),
                handler: function (e, d, v) {
                    if (this.data.page !== this.data.to_page &&
                        this.data.to_page >= 1 &&
                        this.data.to_page <= this.data.allpage) {
                        this.data.page = this.data.to_page;
                        this.module.methodFactory.methods.updatePage.call(this);
                    }
                }
            });
        }
    }
    DD.Plugin.create('paging', plugin_01001);
}());
;(function () {
    var plugin_01001 = function () {
    };

    plugin_01001.prototype = {
        init: function (view) {
            var me = this;
            var template = `<div class="nd-plugin-paging">
                                <span>共<span class="red">{{total}}</span>条记录</span>
                                <span>共<span class="red">{{allpage}}</span>页</span>
                                <span>当前第<span class="red">{{page}}</span>页</span>
                                <div class="to-first" x-class="{'can-not':'page==1'}">首页</div>
                                <div class="to-prev" x-class="{'can-not':'page==1'}">上一页</div>
                                <div class="to-next" x-class="{'can-not':'page==allpage'}">下一页</div>
                                <div class="to-last" x-class="{'can-not':'page==allpage'}">末页</div>
                                <span>转到:</span>
                                <input type="number" x-field="to_page">
                                <div class="go-to">GO</div>
                            </div>`;
            view.innerHTML = template;
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render: function (view) {
            new DD.Event({
                eventName: 'click',
                view: view.querySelector('.to-first'),
                handler: function (e, d, v) {
                    if (this.data.page !== 1) {
                        this.data.page = 1;
                        this.module.methodFactory.methods.updatePage.call(this);
                    }
                }
            });
            new DD.Event({
                eventName: 'click',
                view: view.querySelector('.to-last'),
                handler: function (e, d, v) {
                    if (this.data.page !== this.data.allpage) {
                        this.data.page = this.data.allpage;
                        this.module.methodFactory.methods.updatePage.call(this);
                    }
                }
            });
            new DD.Event({
                eventName: 'click',
                view: view.querySelector('.to-prev'),
                handler: function (e, d, v) {
                    if (this.data.page > 1) {
                        this.data.page--;
                        this.module.methodFactory.methods.updatePage.call(this);
                    }
                }
            });
            new DD.Event({
                eventName: 'click',
                view: view.querySelector('.to-next'),
                handler: function (e, d, v) {
                    if (this.data.page < this.data.allpage) {
                        this.data.page++;
                        this.module.methodFactory.methods.updatePage.call(this);
                    }
                }
            });
            new DD.Event({
                eventName: 'click',
                view: view.querySelector('.go-to'),
                handler: function (e, d, v) {
                    if (this.data.page !== this.data.to_page &&
                        this.data.to_page >= 1 &&
                        this.data.to_page <= this.data.allpage) {
                        this.data.page = this.data.to_page;
                        this.module.methodFactory.methods.updatePage.call(this);
                    }
                }
            });
        }
    }
    if(!DD.Plugin.plugins['plugin_01001']){
    DD.Plugin.create('plugin_01001', plugin_01001);}
}());;;
;(function() {
    var plugin_02001 = function() {

    };
    plugin_02001.prototype.init = function(view) {
        var me = this;
        var template = `<div class='nd-plugin-buffering-box'>
                            <div class='mask'></div>
                            <div class='nd-plugin-buffering-loader'>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>`;
        view.innerHTML = template;
        var data = DD.attr(view, 'dataName') || 'data';
        //数据项名字
        view.$dataItem = data;
        //移除showItem
        view.removeAttribute('dataItem');
        //设置innerHTML
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    };

    plugin_02001.prototype.render = function(view) {
        var me = this;
        var data = view.$getData().data;
        if (!data) {
            return;
        }
        var module;
        if (!data.module) {
            module = view.$module;
        } else {
            module = data.module;
        }
        if (!module) {
            return;
        }
        setTimeout(delayRender, 0);

        function delayRender() {
            var data = view.$getData().data;
            var bufferingBox = document.querySelector(".nd-plugin-buffering-box");
            var par = view.querySelector(".nd-plugin-buffering-loader");
            var dom = [];
            var dom = Array.from(par.getElementsByTagName("div"));
            var small_time = data[view.$dataItem].animation_time / dom.length;
            dom.forEach(function(item, index) {
                DD.css(item, "animation-duration", data[view.$dataItem].animation_time + 's');
                DD.css(item, "animation-delay", small_time * index + 's');
                DD.css(item, "background-color", data[view.$dataItem].color);
                DD.css(item, "width", 2 * data[view.$dataItem].radius + 'px');
                DD.css(item, "height", 2 * data[view.$dataItem].radius + 'px');
            });
            var bufferingBoxParents = bufferingBox.parentNode.parentNode;
            var bufferingBoxWidth = document.defaultView.getComputedStyle(bufferingBoxParents, null).width;
            var bufferingBoxHeight = document.defaultView.getComputedStyle(bufferingBoxParents, null).height;
            DD.css(bufferingBox, 'width', bufferingBoxWidth);
            DD.css(bufferingBox, 'height', bufferingBoxHeight);
            var mask = document.querySelector(".mask");
            DD.css(mask, 'width', bufferingBoxWidth);
            DD.css(mask, 'height', bufferingBoxHeight);
        };
    }

    DD.Plugin.create("plugin_02001", plugin_02001);
}());;/**
 * create by xll on 2018/5/11.
 * 加载动画
 */
var plugin_02002 = function() {};
plugin_02002.prototype = {
    init: function(view) {
        var me = this;
        var template = `<div class="nd-plugin-loading-2" x-if="buffering_data.show">
                            <div class="spinner">
                                <div class="rect1"></div>
                                <div class="rect2"></div>
                                <div class="rect3"></div>
                                <div class="rect4"></div>
                                <div class="rect5"></div>
                            </div>
                        </div>`;
        view.innerHTML = template;
        var data = DD.attr(view, 'dataName') || 'data';
        //数据项名字
        view.$dataItem = data;
        //移除showItem
        view.removeAttribute('dataItem');
        //设置innerHTML
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    },
    render: function(view) {
        var me = this;
        var data = view.$getData().data;
        var height = parseInt(data[view.$dataItem].height);
        var width = parseInt(data[view.$dataItem].width);
        var color=data[view.$dataItem].color;
        setTimeout(function() {
            me.content = view.querySelector(".spinner");
            me.dom = Array.from(me.content.getElementsByTagName("div"));
            DD.css(me.content, "width", width + "px");
            DD.css(me.content, "height", height + "px");

            me.dom.forEach(function(i) {
                DD.css(i, "height", height + 'px');
                DD.css(i, "width", (width - 0.2 * width) / me.dom.length + 'px');

                DD.css(i,"background-color",color);
            })
        }, 0);
    }
};
DD.Plugin.create("plugin_02002", plugin_02002);;/**
 * create by xll on 2018/5/11.
 * 加载动画
 */
var plugin_02003 = function() {};
plugin_02003.prototype = {
    init: function(view) {
        var me = this;
        var template = `<div class="nd-plugin-buffering-box-3" x-if="buffering_data.show">
                                <div class="nd-plugin-buffering-imgbox">
                                    <div class="nd-plugin-buffering-leftbox">
                                        <div class="nd-plugin-buffering-left"></div>
                                    </div>
                                    <div class="nd-plugin-buffering-rightbox">
                                        <div class="nd-plugin-buffering-right"></div>
                                    </div>
                                </div>
                            </div>`;
        view.innerHTML = template;
        var data = DD.attr(view, 'dataName') || 'data';
        //数据项名字
        view.$dataItem = data;
        //移除showItem
        view.removeAttribute('dataItem');
        //设置innerHTML
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    },
    render: function(view) {
        var me = this;
        var data = view.$getData().data[view.$dataItem];
        setTimeout(function() {
            var box = view.querySelector('.nd-plugin-buffering-box-3');
            var pluginBox = box.parentNode.parentNode;
            var right = view.querySelector(".nd-plugin-buffering-right");
            var left = view.querySelector(".nd-plugin-buffering-left");
            var rightBox = view.querySelector(".nd-plugin-buffering-rightbox");
            var leftBox = view.querySelector(".nd-plugin-buffering-leftbox");
            var imgBox = view.querySelector('.nd-plugin-buffering-imgbox');
            var color = data.color_1;
            var time = parseInt(data.animation_time);
            if (time < 1)
                time = 2;

            DD.css(box, 'height', document.defaultView.getComputedStyle(pluginBox, null).height);
            DD.css(imgBox, 'width', data.size + 'px');
            DD.css(imgBox, 'height', data.size + 'px');
            DD.css(left, "animation-duration", time + "s");
            DD.css(left, "border-left-color", color);
            DD.css(left, "border-bottom-color", color);
            DD.css(left, 'width', data.size + 'px');
            DD.css(left, 'height', data.size + 'px');
            DD.css(leftBox, 'width', data.size / 2 + 'px');
            DD.css(leftBox, 'height', data.size + 'px');
            DD.css(rightBox, 'width', data.size / 2 + 'px');
            DD.css(rightBox, 'height', data.size + 'px');
            DD.css(rightBox, 'left', data.size / 2 + 'px');
            DD.css(right, 'width', data.size + 'px');
            DD.css(right, 'height', data.size + 'px');
            DD.css(right, 'margin-left', - data.size / 2 + 'px');
            DD.css(right, "animation-duration", time + "s");
            DD.css(right, "border-left-color", color);
            DD.css(right, "border-bottom-color", color);
        }, 0);
    }
};
DD.Plugin.create("plugin_02003", plugin_02003)
;(function(){
    var plugin_02004=function(){};
    plugin_02004.prototype={
        init:function(view){
            var template=`<div class="content" x-if="buffering_data.show">
                          <span class="my_span"></span>
                          <span class="my_span"></span>
                          <span class="my_span"></span>
                          <span class="my_span"></span>
                          <span class="my_span"></span>
                          </div>`;
             view.innerHTML=template;
            var data = DD.attr(view, 'dataName') || 'data';
            //数据项名字
            view.$dataItem = data;
            //移除showItem
            view.removeAttribute('dataItem');
            //设置innerHTML
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render:function(view){
            var me=this;
            var data=view.$getData().data;
            var color=data[view.$dataItem].color;
            var time=data[view.$dataItem].time;
            var height = parseInt(data[view.$dataItem].height);
            var width = parseInt(data[view.$dataItem].width);
            setTimeout(function(){
                var span=view.querySelectorAll(".my_span");
                var content = view.querySelector(".content");
                DD.css(content, "width", width + 'px');
                span.forEach(function(i,index){
                    DD.css(i,"animation-delay",index*time/4+'s');
                    DD.css(i,"background-color",color);
                    DD.css(i, "height", height + 'px');
                    DD.css(i, "width", ( 0.5 * width) / span.length + 'px');
                });
        },0);
        }
    };
    DD.Plugin.create("plugin_02004",plugin_02004);
})();;;
(function() {
    var plugin_02005 = function() {}
    plugin_02005.prototype = {
        init: function(view) {
            var template = `<div class="com-loading" x-if="buffering_data.show">
                                <div class="spinner">
                                    <div class="bounce1 small"></div>
                                    <div class="bounce2 small"></div>
                                    <div class="bounce3 small"></div>
                                </div>
                            </div>`;
            view.innerHTML = template;
            var data = DD.attr(view, 'dataName') || 'data';
            //数据项名字
            view.$dataItem = data;
            //移除showItem
            view.removeAttribute('dataItem');
            //设置innerHTML
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render: function(view) {
            var data=view.$getData().data;
            setTimeout(function(){
                var dom=view.querySelectorAll(".small");
                dom.forEach(function(i,index){
                    DD.css(i,"background-color",data[view.$dataItem].color);
                    DD.css(i,"width", 2 * data[view.$dataItem].radius + 'px');
                    DD.css(i,"height", 2 * data[view.$dataItem].radius + 'px');
                    DD.css(i,"animation-delay",(data[view.$dataItem].time/5)*index+'s');
                });
            },0)
        }
    };
    DD.Plugin.create("plugin_02005",plugin_02005);
})();;;(function() {
    var plugin_02006 = function() {

    };
    plugin_02006.prototype.init = function(view) {
        var me = this;
        var template = `<div class='nd-plugin-buffering-box-line'>
                            <div class='mask'></div>
                            <div class='nd-plugin-buffering-loader'>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>`;
        view.innerHTML = template;
        var data = DD.attr(view, 'dataName') || 'data';
        //数据项名字
        view.$dataItem = data;
        //移除showItem
        view.removeAttribute('dataItem');
        //设置innerHTML
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    };

    plugin_02006.prototype.render = function(view) {
        var me = this;
        var data = view.$getData().data;
        if (!data) {
            return;
        }
        var module;
        if (!data.module) {
            module = view.$module;
        } else {
            module = data.module;
        }
        if (!module) {
            return;
        }
        setTimeout(delayRender, 0);

        function delayRender() {
            var data = view.$getData().data;
            var bufferingBox = document.querySelector(".nd-plugin-buffering-box-line");
            var par = view.querySelector(".nd-plugin-buffering-loader");
            var dom = [];
            var dom = Array.from(par.getElementsByTagName("div"));
            var small_time = data[view.$dataItem].animation_time / dom.length;
            dom.forEach(function(item, index) {
                DD.css(item, "animation-duration", data[view.$dataItem].animation_time + 's');
                DD.css(item, "animation-delay", small_time * index + 's');
                DD.css(item, "background-color", data[view.$dataItem].color);
            });
            var bufferingBoxParents = bufferingBox.parentNode.parentNode;
            var bufferingBoxWidth = document.defaultView.getComputedStyle(bufferingBoxParents, null).width;
            var bufferingBoxHeight = document.defaultView.getComputedStyle(bufferingBoxParents, null).height;
            console.log(bufferingBoxParents);
            DD.css(bufferingBox, 'width', bufferingBoxWidth);
            DD.css(bufferingBox, 'height', bufferingBoxHeight);
            var mask = document.querySelector(".mask");
            DD.css(mask, 'width', bufferingBoxWidth);
            DD.css(mask, 'height', bufferingBoxHeight);
        };
    }

    DD.Plugin.create("plugin_02006", plugin_02006);
}());;//普通轮播图
;
(function() {
    var plugin_03001 = function() {};
    plugin_03001.prototype = {
        init: function(view) {
            var template = `<div class='content' x-model='carousel_data'">
                                <div class='show' x-class="{'translate':'translate'}">
                                    <img class='imgs' x-repeat='imgs' src="{{url}}">
                                </div>
                                <div class='span'>
                                    <span x-repeat='imgs' class='photo-span' x-show="$index!==0"></span>
                                </div>
                                <div class="left"><div class="img-content"></div></div>
                                <div class="right"><div class="img-content"></div></div>
                            </div>`;
            view.innerHTML = template;
            var data = DD.attr(view, 'dataName') || 'data';
            //数据项名字
            view.$dataItem = data;
            //移除showItem
            view.removeAttribute('dataItem');
            //设置innerHTML
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render: function(view) {
            var me = this;
            console.log(view.$getData())
            me.data = view.$getData().data[view.$dataItem].imgs;
            me.data.push(DD.clone(me.data[0]));
            me.color = view.$getData().data[view.$dataItem].check_color;
            //me.check_color=view.$getData().data.ca_photo;
            me.drawimage = function() {
                var me = this;
                DD.css(me.show, 'transform', 'translateX(' + me.translate + 'px)');
            };
            me.removespan = function() {
                var me = this;
                me.span.forEach(function(item) {
                    DD.css(item, 'background-color', '#ffffff');
                });
            }
            me.addspan = function() {
                if (me.span[me.index]) {
                    if (me.index === 0)
                        DD.css(me.span[me.data.length - 1], 'background-color', me.color);
                    else {
                        DD.css(me.span[me.index], 'background-color', me.color);
                    }
                }
            }
            me.moveLeft = function() {
                var me = this;
                me.translate -= me.imgwidth;
                if (me.index > me.data.length - 2) {
                    me.index = 0;
                    DD.css(me.show, 'left', -1 * me.translate - me.imgwidth + 'px');
                }
                me.index++;
            }
            me.moveright = function() {
                var me = this;
                me.translate += me.imgwidth;
                if (me.index === 0) {
                    me.index = me.data.length - 2;
                    DD.css(me.show, 'left', -1 * me.translate - me.imgwidth * (me.data.length - 2) + 'px');
                } else {
                    me.index--;
                }
            }
            me.updata = function() {
                clearInterval(window.timer_11);
                var my_time = 3000;
                if (window.data && window.data.time) {
                    my_time = window.data.time;
                }
                window.timer_11 = setInterval(function() {
                    me.doself(me.flag);
                }, my_time);
            };
            me.doself = function(flag) {
                var me = this;
                me.is_can = false;
                me.removespan();
                if (flag) {
                    me.moveright();
                } else {
                    me.moveLeft();
                }
                me.drawimage();
                me.addspan();
            };
            setTimeout(function() {
                view.addEventListener('transitionend', function() {
                    me.is_can = true;
                });
                me.is_can = false;
                me.span = view.querySelectorAll('.photo-span');
                me.imgs = view.querySelectorAll('.imgs');
                me.imgwidth = parseInt(DD.css(view.querySelector('.content'), 'width'));
                me.show = view.querySelector('.show');
                me.span_width = view.$getData().data[view.$dataItem].width;
                //true为左边滑动
                me.flag = true;
                if(view.$getData().data[view.$dataItem].right){
                    me.flag=false;
                }

                if(view.$getData().data[view.$dataItem].is_circle) {
                    me.span.forEach(function (item) {
                        DD.css(item, 'border-radius', "100%");
                        DD.css(item, 'width', me.span_width + 'px');
                        DD.css(item, 'height', me.span_width + 'px');
                    });
                }else {
                    me.span.forEach(function (item) {
                        DD.css(item, 'width', me.span_width + 'px');
                        DD.css(item, 'height', me.span_width + 'px');
                    });
                }
                DD.css(me.show, 'width', '' + me.imgwidth * me.data.length + 'px');
                me.index = 1;
                DD.css(me.show, 'left', -1 * me.index * me.imgwidth + 'px');
                //开始位移
                me.translate = 0;
                for (var i = 0; i < me.data.length; i++) {
                    DD.css(me.imgs[i], 'width', '' + me.imgwidth + 'px');
                }
                me.addspan();
                me.updata();
            }, 0);

            new DD.Event({
                eventName: 'mouseover',
                view: view.querySelector('.content'),
                handler: function (e, data, view) {
                    DD.css(document.querySelector('.left'),'display', 'block');
                    DD.css(document.querySelector('.right'),'display', 'block');
                }
            });
            new DD.Event({
                eventName: 'mouseout',
                view: view.querySelector('.content'),
                handler: function (e, data, view) {
                    DD.css(document.querySelector('.left'),'display', 'none');
                    DD.css(document.querySelector('.right'),'display', 'none');
                }
            });
            new DD.Event({
                eventName: 'swipeleft',
                view: view,
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        clearInterval(window.timer_11);
                        me.doself();
                        me.updata();
                    }
                }
            });
            new DD.Event({
                eventName: 'click',
                view: view.querySelector(".right"),
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        clearInterval(window.timer_11);
                        me.doself();
                        me.updata();
                    }
                }
            });
            new DD.Event({
                eventName: 'click',
                view: view.querySelector(".left"),
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        clearInterval(window.timer_11);
                        me.doself(1);
                        me.updata();
                    }
                }
            });
            new DD.Event({
                eventName: 'swiperight',
                view: view,
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        clearInterval(window.timer_11);
                        me.doself(1);
                        me.updata();
                    }
                }
            });
        }
    };
    DD.Plugin.create('plugin_03001', plugin_03001);
})();;;
(function() {
    var plugin_03002 = function() {};
    plugin_03002.prototype = {
        init: function(view) {
            var tem = `<figure class='carous' x-model='carousel_data'>
                            <img src="{{url}}" alt="图片" x-repeat='imgs' class='img-trans'>
                        </figure>
                        <div class="spancont">
                        <div class="span" x-model='carousel_data'>
                                <span class='inline-span' x-repeat='imgs' x-show="$index>1"></span>
                            </div>
                        </div><div class="left"><div class="img-content"></div></div>
                      <div class="right"><div class="img-content"></div></div>`;
            view.innerHTML = tem;
            var data = DD.attr(view, 'dataName') || 'data';
            //数据项名字
            view.$dataItem = data;
            //移除showItem
            view.removeAttribute('dataItem');
            //设置innerHTML
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render: function(view) {
            var me = this;
            me.imgs = view.$getData().data[view.$dataItem].imgs;
            me.imgs.push(DD.clone(me.imgs[0]));
            me.imgs.push(DD.clone(me.imgs[1]));
            me.check_color = view.$getData().data[view.$dataItem].check_color;
            me.removespan = function() {
                me.span.forEach(function(i) {
                    DD.css(i, 'background-color', '#FFFFFF');
                });
            };
            me.addspan = function() {
                var index = (me.imgs.length -me.count)% me.imgs.length;
                if (index < 0)
                    index += me.imgs.length;
                DD.css(me.span[index], 'background-color', me.check_color);
            };
            me.updata = function() {
                clearInterval(window.timer_12);
                me.is_can = false;
                window.timer_12 = setInterval(function() {
                    me.is_can = false;
                    me.count+=me.direct;
                    me.removespan();
                    me.addspan();
                    me.content.style.transform = 'rotateY(' + 2 * me.count * Math.PI / me.imgs.length + 'rad)'
                }, 5000);
            };
            //获取旋转的y轴距离
            me.getheight = function() {
                var r = Math.PI * 2;
                //rad求出一条边所占的角度
                var rad = r / me.imgs.length;
                me.rotateZ = me.imgw / (2 * Math.tan(rad / 2));
            }
            setTimeout(function() {
                window.addEventListener('transitionend', function() {
                    me.is_can = true;
                });
                me.is_can = false;
                me.count = 0;
                me.spans = view.querySelector('.span');
                me.content = view.querySelector('.carous');
                me.imgs = view.querySelectorAll('.img-trans');
                me.imgw = parseInt(DD.css(me.imgs[0], 'width'));
                me.span = view.querySelectorAll('.inline-span');
                me.span_width = view.$getData().data[view.$dataItem].width;
                me.span_is_circle = view.$getData().data[view.$dataItem].is_circle;
                if(me.span_is_circle) {
                    me.span.forEach(function (i) {
                        DD.css(i, 'width', me.span_width + 'px');
                        DD.css(i, 'height', me.span_width + 'px');
                        DD.css(i, 'border-radius', '100%');
                    });
                }else {
                    me.span.forEach(function (i) {
                        DD.css(i, 'width', me.span_width + 'px');
                        DD.css(i, 'height', me.span_width + 'px');
                    });
                }
                //1为left -1为right
                if(view.$getData().data[view.$dataItem].right){
                    me.direct=1;
                }
                me.direct=-1;
                var temp = (me.imgs.length) * 25;
                DD.css(me.spans, 'width', temp + 'px');
                //求出旋转中心点的z坐标
                me.getheight();
                me.content.style.transformOrigin = '50% 50% ' + -1 * me.rotateZ + 'px';
                //transform-origin属性规定了旋转的点
                me.imgs.forEach(function(item, index) {
                    //第一张是0不需要设置
                    if (index) {
                        item.style.transformOrigin = '50% 50% ' + -1 * me.rotateZ + 'px';
                    }
                    item.style.transform = 'rotateY(' + index * Math.PI * 2 / me.imgs.length + 'rad)'
                });
                me.removespan();
                me.addspan();
                me.updata();
            }, 0);
            new DD.Event({
                eventName: 'mouseover',
                view: view.querySelector('.carous'),
                handler: function (e, data, view) {
                    DD.css(document.querySelector('.left'),'display', 'block');
                    DD.css(document.querySelector('.right'),'display', 'block');
                }
            });
            new DD.Event({
                eventName: 'mouseout',
                view: view.querySelector('.carous'),
                handler: function (e, data, view) {
                    DD.css(document.querySelector('.left'),'display', 'none');
                    DD.css(document.querySelector('.right'),'display', 'none');
                }
            });
            new DD.Event({
                eventName: 'swipeleft',
                view: view,
                handler: function() {
                    if (me.is_can) {
                        clearInterval(window.timer_12);
                        me.is_can = false;
                        me.count--;
                        me.removespan();
                        me.addspan();
                        me.content.style.transform = 'rotateY(' + 2 * me.count * Math.PI / me.imgs.length + 'rad)';
                        me.updata();
                    }
                }
            });
            new DD.Event({
                eventName: 'click',
                view: view.querySelector(".right"),
                handler: function() {
                    if (me.is_can) {
                        clearInterval(window.timer_12);
                        me.is_can = false;
                        me.count--;
                        me.removespan();
                        me.addspan();
                        me.content.style.transform = 'rotateY(' + 2 * me.count * Math.PI / me.imgs.length + 'rad)';
                        me.updata();
                    }
                }
            });
            new DD.Event({
                eventName: 'swiperight',
                view: view,
                handler: function() {
                    if (me.is_can) {
                        clearInterval(window.timer_12);
                        me.is_can = false;
                        me.count++;
                        me.removespan();
                        me.addspan();
                        me.content.style.transform = 'rotateY(' + 2 * me.count * Math.PI / me.imgs.length + 'rad)';
                        me.updata();
                    }
                }
            });
            new DD.Event({
                eventName: 'click',
                view: view.querySelector(".left"),
                handler: function() {
                    if (me.is_can) {
                        clearInterval(window.timer_12);
                        me.is_can = false;
                        me.count++;
                        me.removespan();
                        me.addspan();
                        me.content.style.transform = 'rotateY(' + 2 * me.count * Math.PI / me.imgs.length + 'rad)';
                        me.updata();
                    }
                }
            });
        }
    };
    DD.Plugin.create('plugin_03002', plugin_03002);
})();;
(function() {
    plugin_03003 = function() {};
    plugin_03003.prototype = {
        init: function(view) {
            var tem = ` <div class='content' x-model='carousel_data'>
                          <div class="img-photo3">
                               <div  style="background-image: url('{{url}}');background-size:100% 100%" class='img' x-repeat='imgs'></div>
                          </div>
                          <div style="clear:both"></div>
                          <div class='span'>
                             <div class='span-cont'>
                                <span x-repeat='imgs' class='item-span' x-show="$index>1"></span>
                             </div>
                          </div>
                          <div class="left"><div class="img-content"></div></div>
                          <div class="right"><div class="img-content"></div></div>
                        </div>`
            view.innerHTML = tem;
            var data = DD.attr(view, 'dataName') || 'data';
            //数据项名字
            view.$dataItem = data;
            //移除showItem
            view.removeAttribute('dataItem');
            //设置innerHTML
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render: function(view) {
            var me = this;
            me.count = 0;
            //标记能够事件
            me.is_can = false;
            //由于有数组个translationend事件 用来标记
            me.time_count = 0;
            //更新页面
            me.direct=1;
            console.log(view.$getData());
            me.check_color = view.$getData().data[view.$dataItem].check_color;
            if(view.$getData().data[view.$dataItem].up){
                me.direct=-1;
            }
            me.updata = function() {
                clearInterval(window.timer_13);
                me.is_can = false;
                window.timer_13 = setInterval(function() {
                    me.is_can = false;
                    me.count+=me.direct;
                    me.removespan()
                    me.addspan();
                    me.tem.forEach(function(item, index) {
                        item.style.transform = 'rotateX(' + parseInt(360 / me.img_arr.length) * -1 * me.count + 'deg)';
                        item.style.transitionDelay = index * 0.3 + 's';
                    });
                }, 3000);
            };
            //改变span颜色
            me.addspan = function() {
                var me = this;
                var index = (me.count) % me.img_arr.length;
                if (index < 0) {
                    index += me.img_arr.length;
                }
                DD.css(me.span[index], 'background-color', me.check_color);
            }
            //去掉span颜色
            me.removespan = function() {
                var me = this;
                me.span.forEach(function(item) {
                    DD.css(item, 'background-color', '#FFFFFF');
                })
            }
            me.getheight = function() {
                var r = Math.PI * 2;
                var rad = r / me.img_arr.length;
                me.rotateZ = me.imgh / (2 * Math.tan(rad / 2));
            }
            //在渲染完毕开始执行
            setTimeout(function() {
                window.addEventListener('transitionend', function() {
                    me.time_count+=me.direct;
                    if (me.time_count === me.tem.length) {
                        me.is_can = true;
                        me.time_count = 0;
                    }
                });
                //span数组
                me.span = view.querySelectorAll('.item-span');
                me.spans = view.querySelector('.span-cont');
                var temp = me.span.length * 25;
                me.span_width = view.$getData().data[view.$dataItem].width;
                me.span_is_circle = view.$getData().data[view.$dataItem].is_circle;
                if(me.span_is_circle) {
                    me.span.forEach(function (i) {
                        DD.css(i, 'width', me.span_width + 'px');
                        DD.css(i, 'height', me.span_width + 'px');
                        DD.css(i, 'border-radius', '100%');
                    });
                }else {
                    me.span.forEach(function (i) {
                        DD.css(i, 'width', me.span_width + 'px');
                        DD.css(i, 'height', me.span_width + 'px');
                    });
                }
                //获取容器高度用来呈现3d效果
                me.imgh = parseInt(DD.css(view.querySelector('.content'), 'height'));
                //imgs下面的小数组
                me.tem = view.querySelectorAll(".img-photo3");
                //操作小数组下面的元素
                me.tem.forEach(function(item, index) {
                    me.img_arr = Array.from(item.getElementsByTagName('DIV'));
                    me.getheight();
                    me.img_arr.forEach(function(i, d, a) {
                        i.style.transform = 'rotateX(' + d * parseInt(360 / a.length) + 'deg) translateZ(' + me.rotateZ + 'px)';
                    });
                });
                //初始化第一个span
                me.addspan();
                //更新页面
                me.updata();
            }, 0);
            new DD.Event({
                eventName: 'mouseover',
                view: view.querySelector('.content'),
                handler: function (e, data, view) {
                    DD.css(document.querySelector('.left'),'display', 'block');
                    DD.css(document.querySelector('.right'),'display', 'block');
                }
            });
            new DD.Event({
                eventName: 'mouseout',
                view: view.querySelector('.content'),
                handler: function (e, data, view) {
                    DD.css(document.querySelector('.left'),'display', 'none');
                    DD.css(document.querySelector('.right'),'display', 'none');
                }
            });
            new DD.Event({
                eventName: 'swiperight',
                view: view,
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        clearInterval(window.timer_13);
                        me.removespan();
                        me.count--;
                        me.addspan();
                        me.tem.forEach(function(item, index) {
                            item.style.transform = 'rotateX(' + parseInt(360 / me.img_arr.length) * -1 * me.count + 'deg)';
                            item.style.transitionDelay = index * 0.3 + 's';
                        });
                        me.updata();
                    }
                }
            });
            new DD.Event({
                eventName: 'click',
                view: view.querySelector(".left"),
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        clearInterval(window.timer_13);
                        me.removespan();
                        me.count--;
                        me.addspan();
                        me.tem.forEach(function(item, index) {
                            item.style.transform = 'rotateX(' + parseInt(360 / me.img_arr.length) * -1 * me.count + 'deg)';
                            item.style.transitionDelay = index * 0.3 + 's';
                        });
                        me.updata();
                    }
                }
            });
            new DD.Event({
                eventName: 'swipeleft',
                view: view,
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        me.removespan();
                        clearInterval(window.timer_13);
                        me.count++;
                        me.removespan();
                        me.addspan();
                        me.tem.forEach(function(item, index) {
                            item.style.transform = 'rotateX(' + parseInt(360 / me.img_arr.length) * -1 * me.count + 'deg)';
                            item.style.transitionDelay = index * 0.3 + 's';
                        });
                        me.updata();
                    }
                }
            });
            new DD.Event({
                eventName: 'click',
                view: view.querySelector(".right"),
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        me.removespan();
                        clearInterval(window.timer_13);
                        me.count++;
                        me.removespan();
                        me.addspan();
                        me.tem.forEach(function(item, index) {
                            item.style.transform = 'rotateX(' + parseInt(360 / me.img_arr.length) * -1 * me.count + 'deg)';
                            item.style.transitionDelay = index * 0.3 + 's';
                        });
                        me.updata();
                    }
                }
            });
            // new DD.Event({
            //     eventName: 'mouseenter',
            //     view: view,
            //     handler: function() {
            //         clearInterval(window.timer_3);
            //     }
            // });
            // new DD.Event({
            //     eventName: 'mouseleave',
            //     view: view,
            //     handler: function() {
            //         me.updata();
            //     }
            // });
        }
    };
    DD.Plugin.create('plugin_03003', plugin_03003);
})();;
(function() {
    plugin_03004 = function() {};
    plugin_03004.prototype = {
        init: function(view) {
            var tem = ` <div class='content' x-model='carousel_data'>
                          <div class="img-photo" x-repeat="imgs">
                            <div src="{{url}}" alt='图片库' x-repeat='img_item' style="background-image: url('{{url}}');background-size:100% 100%" class='img'></div>
                          </div>
                          <div style="clear:both"></div>
                          <div class='spans'>
                             <div class='span-cont'>
                                <span x-repeat='imgs' class='item-span' style="width:{{width}}px;height:{{height}}px"></span>
                             </div>
                          </div>
                          <div class="left"><div class="img-content"></div></div>
                          <div class="right"><div class="img-content"></div></div>
                            </div>`;
            view.innerHTML = tem;
            var data = DD.attr(view, 'dataName') || 'data';
            //数据项名字
            view.$dataItem = data;
            //移除showItem
            view.removeAttribute('dataItem');
            //设置innerHTML
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render: function(view) {
            var me = this;
            me.count = 0;
            //标记能够事件
            me.is_can = false;
            //由于有数组个translationend事件 用来标记
            me.time_count = 0;
            me.check_color = view.$getData().data[view.$dataItem].check_color;
            //更新页面
            me.updata = function() {
                clearInterval(window.timer_14);
                me.is_can = false;
                window.timer_14 = setInterval(function() {
                    me.is_can = false;
                    me.count+=me.dx;
                    me.removespan();
                    me.addspan();
                    me.tem.forEach(function(item, index) {
                        item.style.transform = 'rotateX(' + parseInt(360 / me.tem.length) * -1 * me.count + 'deg)';
                        item.style.transitionDelay = index * 0.3 + 's';
                    });
                }, 3000);
            };
            //改变span颜色
            me.addspan = function() {
                var me = this;
                var index = (me.count) % me.tem.length;
                if (index < 0) {
                    index += me.tem.length;
                }
                DD.css(me.span[index], 'background-color', me.check_color);
            }
            //去掉span颜色
            me.removespan = function() {
                var me = this;
                me.span.forEach(function(item) {
                    DD.css(item, 'background-color', '#FFFFFF');
                })
            }
            //在渲染完毕开始执行dx为1是下滑
            me.dx=1;
            if(view.$getData().data[view.$dataItem].up){
                me.dx=-1;
            }

            setTimeout(function() {
                window.addEventListener('transitionend', function() {
                    me.time_count++;
                    if (me.time_count === me.tem.length) {
                        me.is_can = true;
                        me.time_count = 0;
                    }
                });
                //span数组
                me.span = view.querySelector('.span-cont').querySelectorAll('.item-span');
                //获取容器高度用来呈现3d效果
                me.imgh = parseInt(DD.css(view.querySelector('.content'), 'height'));
                //imgs下面的小数组
                me.tem = view.querySelectorAll(".img-photo");
                //操作小数组下面的元素
                me.tem.forEach(function(i) {
                    i.style.transitionDelay = i * 0.3 + 's';
                    var arr = Array.from(i.getElementsByTagName('DIV'));
                    arr.forEach(function(item, index) {
                        item.style.transform = 'rotateX(' + index * parseInt(360 / me.tem.length) + 'deg) translateZ(' + me.imgh / 2 + 'px)';

                    })
                });
                me.span_width = view.$getData().data[view.$dataItem].width;
                me.span_is_circle = view.$getData().data[view.$dataItem].is_circle;
                if(me.span_is_circle) {
                    me.span.forEach(function (i) {
                        DD.css(i, 'width', me.span_width + 'px');
                        DD.css(i, 'height', me.span_width + 'px');
                        DD.css(i, 'border-radius', '100%');
                    });
                }else {
                    me.span.forEach(function (i) {
                        DD.css(i, 'width', me.span_width + 'px');
                        DD.css(i, 'height', me.span_width + 'px');
                    });
                }
                //初始化第一个span
                me.addspan();
                //更新页面
                me.updata();
            }, 0);
            new DD.Event({
                eventName: 'mouseover',
                view: view.querySelector('.content'),
                handler: function (e, data, view) {
                    DD.css(document.querySelector('.left'),'display', 'block');
                    DD.css(document.querySelector('.right'),'display', 'block');
                }
            });
            new DD.Event({
                eventName: 'mouseout',
                view: view.querySelector('.content'),
                handler: function (e, data, view) {
                    DD.css(document.querySelector('.left'),'display', 'none');
                    DD.css(document.querySelector('.right'),'display', 'none');
                }
            });
            new DD.Event({
                eventName: 'swiperight',
                view: view,
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        clearInterval(window.timer_14);
                        me.removespan();
                        me.count--;
                        me.addspan();
                        me.tem.forEach(function(item, index) {
                            item.style.transform = 'rotateX(' + parseInt(360 / me.tem.length) * -1 * me.count + 'deg)';
                            item.style.transitionDelay = index * 0.3 + 's';
                        });
                        me.updata();
                    }
                }
            });
            new DD.Event({
                eventName: 'swipeleft',
                view: view,
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        me.removespan();
                        clearInterval(window.timer_14);
                        me.count++;
                        me.removespan();
                        me.addspan();
                        me.tem.forEach(function(item, index) {
                            item.style.transform = 'rotateX(' + parseInt(360 / me.tem.length) * -1 * me.count + 'deg)';
                            item.style.transitionDelay = index * 0.3 + 's';
                        });
                        me.updata();
                    }
                }
            });
            new DD.Event({
                eventName: 'click',
                view: view.querySelector(".right"),
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        me.removespan();
                        clearInterval(window.timer_14);
                        me.count++;
                        me.removespan();
                        me.addspan();
                        me.tem.forEach(function(item, index) {
                            item.style.transform = 'rotateX(' + parseInt(360 / me.tem.length) * -1 * me.count + 'deg)';
                            item.style.transitionDelay = index * 0.3 + 's';
                        });
                        me.updata();
                    }
                }
            });
            new DD.Event({
                eventName: 'click',
                view: view.querySelector(".left"),
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        clearInterval(window.timer_14);
                        me.removespan();
                        me.count--;
                        me.addspan();
                        me.tem.forEach(function(item, index) {
                            item.style.transform = 'rotateX(' + parseInt(360 / me.tem.length) * -1 * me.count + 'deg)';
                            item.style.transitionDelay = index * 0.3 + 's';
                        });
                        me.updata();
                    }
                }
            });
        }
    };
    DD.Plugin.create('plugin_03004', plugin_03004);
})();
DD.createModule({
    el: '#app',
    data: {
        histogram: {
            "title": "直方图",
            "legend": "",
            "marker": false,
            "titleColor": "#000000",
            "gridLine": 0,
            "gridLineColor": "#cccccc",
            "legends": [
                { "value": "", "text": "无" },
                { "value": "top", "text": "顶部" },
                { "value": "right", "text": "右侧" },
                { "value": "bottom", "text": "底部" }
            ],
            "lines": [
                { "value": 0, "text": "无" },
                { "value": 1, "text": "横向" },
                { "value": 2, "text": "纵向" },
                { "value": 3, "text": "全部" }
            ],
            "data": [{
                "title": "成都店",
                "datas": [
                    { "x": "1月", "y": 300 },
                    { "x": "2月", "y": 320 },
                    { "x": "3月", "y": 280 },
                    { "x": "4月", "y": 250 },
                    { "x": "5月", "y": 300 },
                    { "x": "6月", "y": 380 }
                ]
            }, {
                "title": "北京店",
                "datas": [
                    { "x": "1月", "y": 900 },
                    { "x": "2月", "y": 820 },
                    { "x": "3月", "y": 880 },
                    { "x": "4月", "y": 850 },
                    { "x": "5月", "y": 900 },
                    { "x": "6月", "y": 980 }
                ]
            }, {
                "title": "上海店",
                "datas": [
                    { "x": "1月", "y": 600 },
                    { "x": "2月", "y": 520 },
                    { "x": "3月", "y": 580 },
                    { "x": "4月", "y": 550 },
                    { "x": "5月", "y": 600 },
                    { "x": "6月", "y": 680 }
                ]
            }],
            addTitle: '',
            addData: ''
        },
    },
    methods: {
        changeTitleColor(e, data, view) {
            data.titleColor = e.target.value;
        },
        changeLegend(e, data, view) {
            data.legend = e.target.value;
        },
        changeLine(e, data) {
            data.gridLine = e.target.value;
        },
        changeLineColor(e, data) {
            data.gridLineColor = e.target.value;
        },
        addLineData(e, data) {
            var d = DD.clone(data.data);
            var o = {};
            var ad = data.addData.split(' ');
            var datas = [
                { "x": "1月" },
                { "x": "2月" },
                { "x": "3月" },
                { "x": "4月" },
                { "x": "5月" },
                { "x": "6月" }
            ]
            for(var i=0,l=6; i<l; i++) {
                datas[i].y = parseInt(ad[i], 10);
            }
            o.datas = datas;
            o.title = data.addTitle;
            d.push(o);
            data.data = d;
        }
    }
});
DD.createModule({
    el: '#app',
    data: {
        line: {
            "title": "折线图",
            "legend": "",
            "marker": false,
            "titleColor": "#000000",
            "gridLine": 0,
            "gridLineColor": "#cccccc",
            "legends": [
                { "value": "", "text": "无" },
                { "value": "top", "text": "顶部" },
                { "value": "right", "text": "右侧" },
                { "value": "bottom", "text": "底部" }
            ],
            "lines": [
                { "value": 0, "text": "无" },
                { "value": 1, "text": "横向" },
                { "value": 2, "text": "纵向" },
                { "value": 3, "text": "全部" }
            ],
            "data": [{
                "title": "成都店",
                "datas": [
                    { "x": "1月", "y": 300 },
                    { "x": "2月", "y": 320 },
                    { "x": "3月", "y": 280 },
                    { "x": "4月", "y": 250 },
                    { "x": "5月", "y": 300 },
                    { "x": "6月", "y": 380 }
                ]
            }, {
                "title": "北京店",
                "datas": [
                    { "x": "1月", "y": 900 },
                    { "x": "2月", "y": 820 },
                    { "x": "3月", "y": 880 },
                    { "x": "4月", "y": 850 },
                    { "x": "5月", "y": 900 },
                    { "x": "6月", "y": 980 }
                ]
            }, {
                "title": "上海店",
                "datas": [
                    { "x": "1月", "y": 600 },
                    { "x": "2月", "y": 520 },
                    { "x": "3月", "y": 580 },
                    { "x": "4月", "y": 550 },
                    { "x": "5月", "y": 600 },
                    { "x": "6月", "y": 680 }
                ]
            }],
            addTitle: '',
            addData: ''
        },
    },
});
DD.createModule({
    el: '#app',
    data: {
        pie:{
            "title":"饼状图",
            "legend":"",
            "titleColor":"#000000",
            "legend":"",
            "showPercent":true,
            "showText":true,
            "legends":[
                {"value":"","text":"无"},
                {"value":"top","text":"顶部"},
                {"value":"right","text":"右侧"},
                {"value":"bottom","text":"底部"}
            ],
            "data":[
                {"value":300,"title":"数据一"},
                {"value":800,"title":"数据二"},
                {"value":600,"title":"数据三"},
                {"value":100,"title":"数据四"},
                {"value":400,"title":"数据五"},
                {"value":450,"title":"数据六"}
            ],
            addTitle: '',
            addData: ''
        },
    },
    methods: {
        changeTitleColor(e, data, view) {
            data.titleColor = e.target.value;
        },
        changeLegend(e, data, view) {
            data.legend = e.target.value;
        },

        addPieData(e, data) {
            var cD = DD.clone(data.data);
            var d = {
                title: data.addTitle,
                value: parseInt(data.addData, 10)
            }
            cD.push(d);
            data.data = cD;
        }
    }
});
DD.createModule({
    el: '#app',
    data: {
        radar: {
            "title":"雷达图实例",
            "legend":"right",
            "marker":true,
            "titleColor":"#000000",
            "legends":[
                {"value":"","text":"无"},
                {"value":"top","text":"顶部"},
                {"value":"right","text":"右侧"},
                {"value":"bottom","text":"底部"}
            ],
            "radar": {
                "titles": ['顶点一', '顶点二', '顶点三', '顶点四', '顶点五', '顶点六'],
                "colors": ['#e6e6e6', '#f5f5f5'],
                "lineColor": "#ccc"
            },
            "data":[
                {
                    "title": '111',
                    "datas": [93, 55, 45, 78, 66, 45]
                },
                {
                    "title": '555',
                    "datas": [45, 79, 79, 88, 93, 67]
                }
            ],
            addTitle: '',
            addData: '',
            changeColors: ''
        }
    },
    methods: {
        changeTitleColor(e, data, view) {
            data.titleColor = e.target.value;
        },
        changeLegend(e, data, view) {
            data.legend = e.target.value;
        },
        changeRadarLineColor(e, data) {
            var radar = DD.clone(data.radar);
            radar.lineColor = e.target.value;
            data.radar = radar;
        },
        addRadarData(e, data) {
            var cD = DD.clone(data.data);
            var ads = data.addData.split(' ');
            for(var i=0,l=ads.length; i<l; i++) {
                ads[i] = parseFloat(ads[i], 10);
            }
            cD.push({
                title: data.addTitle,
                datas: ads
            })
            data.data = cD;
        },
        changeRadarColors(e, data) {
            var radar = DD.clone(data.radar);
            radar.colors = data.changeColors.split(' ');
            data.radar = radar;
        }
    }
});
DD.createModule({
    el: '#app',
    data: {
        scatter: {
            "title": "散点图",
            "legend": "",
            "marker": false,
            "titleColor": "#000000",
            "legend": "",
            "symbolSize": 8,
            "gridLine": 0,
            "gridLineColor": "#cccccc",
            "legends": [
                { "value": "", "text": "无" },
                { "value": "top", "text": "顶部" },
                { "value": "right", "text": "右侧" },
                { "value": "bottom", "text": "底部" }
            ],
            "lines": [
                { "value": 0, "text": "无" },
                { "value": 1, "text": "横向" },
                { "value": 2, "text": "纵向" },
                { "value": 3, "text": "全部" }
            ],
            "data": [{
                "title": "测试",
                "datas": [
                    {x: 10.0, y:8.04},
                    {x:8.0, y:6.95},
                    {x:13.0, y:7.58},
                    {x:9.0, y:8.81},
                    {x:11.0, y:8.33},
                    {x:14.0, y:9.96},
                    {x:6.0, y:7.24},
                    {x:4.0, y:4.26},
                    {x:12.0,y: 10.84},
                    {x:7.0, y:4.82},
                    {x:5.0, y:5.68}
                ],
                cs: ''
            }],
            addX: '',
            addY: ''
        },
    },
    methods: {
        changeTitleColor(e, data, view) {
            data.titleColor = e.target.value;
        },
        changeLegend(e, data, view) {
            data.legend = e.target.value;
        },
        changeLine(e, data) {
            data.gridLine = e.target.value;
        },
        changeLineColor(e, data) {
            data.gridLineColor = e.target.value;
        },
        changeSymbolSize(e, data) {
            data.symbolSize = parseInt(data.cs, 10);
        },
        addScatterData(e, data) {
            var cD = DD.clone(data.data);
            cD[0].datas.push({
                x: parseFloat(data.addX, 10),
                y: parseFloat(data.addY, 10)
            })
            data.data = cD;
        },
    }
});;
(function() {
    var plugin_04001 = function() {};
    plugin_04001.prototype = {
        init: function(view) {
            var template = `<div class="check-content">
                                <div class="check"></div>
                            </div>`;
            view.innerHTML = template;
            var data = DD.attr(view, 'dataName') || 'data';
            //数据项名字
            view.$dataItem = data;
            //移除showItem
            view.removeAttribute('dataItem');
            //设置innerHTML
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render: function(view) {
            var me = this;
            var data = view.$getData().data[view.$dataItem];
            setTimeout(function() {
                me.check = view.querySelector(".check");
                DD.css(me.check, 'width', data.size + 'px');
                DD.css(me.check, 'height', data.size + 'px');
                if(data.is_circle) {
                    DD.css(me.check, 'border-radius', '100%');
                }

                if (data.is_check) {
                    DD.css(me.check, "background-color", data.check_color);
                } else {
                    DD.css(me.check, "background-color", data.no_check_color);
                }
                new DD.Event({
                    view:me.check,
                    eventName:"click",
                    handler:function(){
                        data.is_check=!data.is_check;
                    }
                });
            }, 0);
        }
    }
    DD.Plugin.create("plugin_04001", plugin_04001);
})();;
(function() {
    var plugin_04002 = function() {};
    plugin_04002.prototype = {
        init: function(view) {
            var template = `<div class="check-one">
                                <div class="item" x-class="{'no-check':true}">
                                    <svg id="not-check-icon" class="fill" viewBox="0 0 24 24">
                                        <path id="_san_2032" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
                                    </svg>
                                    <svg id="check-icon" class="fill" viewBox="0 0 24 24">
                                        <path id="_san_2038" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                    </svg>
                                </div>
                            </div>`;
            view.innerHTML = template;
            var data = DD.attr(view, 'dataName') || 'data';
            //数据项名字
            view.$dataItem = data;
            //移除showItem
            view.removeAttribute('dataItem');
            //设置innerHTML
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render: function(view) {
            var data = view.$getData().data[view.$dataItem];
            setTimeout(function() {
                var checkTwo=view.querySelector(".check-one");
                var not_check = view.querySelector('#not-check-icon');
                var check = view.querySelector('#check-icon');
                DD.css(check, 'color', data.check_color);
                DD.css(not_check, 'color', data.no_check_color);
                DD.css(check, 'width', data.size + 'px');
                DD.css(check, 'height', data.size + 'px');
                DD.css(not_check, 'width', data.size + 'px');
                DD.css(not_check, 'height', data.size + 'px');
                if(data.is_check) {
                    DD.css(not_check, 'display', 'none');
                    DD.css(check, 'display', 'block');
                }else {
                    DD.css(not_check, 'display', 'block');
                    DD.css(check, 'display', 'none');
                }
                if(data)
                    new DD.Event({
                        view: checkTwo,
                        eventName: "click",
                        handler: function(e, d, v) {
                            var me = this;
                            data.is_check = !data.is_check;
                            if(data.is_check) {
                                DD.css(not_check, 'display', 'none');
                                DD.css(check, 'display', 'block');
                            }else {
                                DD.css(not_check, 'display', 'block');
                                DD.css(check, 'display', 'none');
                            }
                        }
                    });
            }, 0);
        }
    };
    DD.Plugin.create("plugin_04002", plugin_04002);
})();;
(function() {
    var plugin_04003 = function() {};
    plugin_04003.prototype = {
        init: function(view) {
            var template = `<div class="check-three">
                                <div class="check-icon" x-class="{'check':'yes_2'}">
                                    visibility_off
                                </div>
                                <div class="check-icon" x-class="{'no-check':'!yes_2'}">
                                    visibility
                                </div>
                            </div>`;
            view.innerHTML = template;
            var data = DD.attr(view, 'dataName') || 'data';
            //数据项名字
            view.$dataItem = data;
            //移除showItem
            view.removeAttribute('dataName');
            //设置innerHTML
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render: function(view) {
            var data = view.$getData().data[view.$dataItem];

            setTimeout(function() {
                var checkThree = view.querySelector(".check-three");
                var divs = view.querySelectorAll('.check-icon');
                DD.css(divs[0], 'color', data.check_color);
                DD.css(divs[1], 'color', data.no_check_color);
                if (data.is_check) {
                    DD.css(divs[0], 'visibility', 'visible');
                    DD.css(divs[1], 'visibility', 'hidden');
                } else {
                    DD.css(divs[0], 'visibility', 'hidden');
                    DD.css(divs[1], 'visibility', 'visible');
                }
                divs.forEach(function(item) {
                    DD.css(item, 'font-size', data.size + 'px');
                })
                new DD.Event({
                    view: checkThree,
                    eventName: "click",
                    handler: function(e, d, v) {
                        var me = this;
                        data.is_check = !data.is_check;
                        if (data.is_check) {
                            DD.css(v, 'color', data.check_color);
                        } else {
                            DD.css(v, 'color', data.no_check_color);
                        }
                    }
                });
            }, 0);
        }
    };
    DD.Plugin.create("plugin_04003", plugin_04003);
})();;
(function() {
    var plugin_04004 = function() {};
    plugin_04004.prototype = {
        init: function(view) {
            var template = `<div class="check-two">
                                <div class="check-icon">
                                    favorite
                                </div>
                                <div class="check-icon">
                                    favorite_border
                                </div>
                            </div>`;
            view.innerHTML = template;
            var data = DD.attr(view, 'dataName') || 'data';
            //数据项名字
            view.$dataItem = data;
            //移除showItem
            view.removeAttribute('dataItem');
            //设置innerHTML
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render: function(view) {
            var data = view.$getData().data[view.$dataItem];
            setTimeout(function() {
                var checkTwo=view.querySelector(".check-two");
                var divs = view.querySelectorAll('.check-icon');
                DD.css(divs[0], 'color', data.check_color);
                DD.css(divs[1], 'color', data.no_check_color);
                if(data.is_check) {
                    DD.css(divs[0], 'visibility', 'visible');
                    DD.css(divs[1], 'visibility', 'hidden');
                }else {
                    DD.css(divs[0], 'visibility', 'hidden');
                    DD.css(divs[1], 'visibility', 'visible');
                }
                divs.forEach(function (item) {
                    DD.css(item, 'font-size', data.size + 'px');
                })
                new DD.Event({
                    view: checkTwo,
                    eventName: "click",
                    handler: function(e, d, v) {
                        var me = this;
                        data.is_check = !data.is_check;
                        if(data.is_check) {
                            DD.css(v, 'color', data.check_color);
                        }else {
                            DD.css(v, 'color', data.no_check_color);
                        }
                    }
                });
            }, 0);
        }
    };
    DD.Plugin.create("plugin_04004", plugin_04004);
})();;
//渲染原因使mousemove卡顿
(function() {
    var plugin_05001 = function() {};
    plugin_05001.prototype = {
        init: function(view) {
            var template = `<div class="color-content" x-show="show">
                                <div class="content">
                                    <div class="top">
                                        <div class="color-jbe" ></div>
                                        <div class="color-w">
                                        <div class="color-b"></div>
                                        <div class="moveE" ondragstart="return false;"></div>
                                        <div class="small-item" ondragstart="return false;"></div>
                                        </div>
                                     </div>
                                            <div class="bottom">
                                                <div class="color-band">
                                                    <div class="point" style="left:{{left}}px" ondragstart="return false;"></div>
                                                </div>
                                                <div class="eventName"></div>
                                            </div>
                                            <div class="rgb">
                                                    <span class="name">r</span><input class="item" x-field="r" type="number">
                                                    <span class="name">g</span><input class="item"  x-field="g" type="number">
                                                    <span class="name">b</span><input class="item" x-field="b" type="number">
                                            </div>
                                             <div class="rgb">
                                                    <span class="name">H</span><input class="item" x-field="H" type="number">
                                                    <span class="name">s</span><input class="item"  x-field="s" type="number">
                                                    <span class="name">v</span><input class="item" x-field="v" type="number">
                                            </div>
                                             <div class="rgb">
                                                             <div e-click='sure' class="ensure">确定</div>
                                              </div>
                                        </div>
                                    </div>`;
            view.innerHTML = template;
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render: function(view) {
            var me = this;
            me.datas = view.$getData().data;
            me.one = me.datas.first;
            //每次渲染都会执行那么第一次执行完毕就可以不用执行了
            if (!me.one) {
                return;
            }
            me.datas.first = 0;
            me.rotate = 0;
            me.str = "";
            me.time = {
                new: 0,
            };
            var move = 1;
            var flag = 0;
            var flag_2 = 0;
            //直接改变是获取的值
            //而如果是对象的话就是获取引用
            //即可以实现双向和单项数据的绑定
            me.case = function() {
                DD.css(me.point, "left", me.datas.left + 'px');
                //度数
                me.rotate = me.datas.left / 180 * 360;
                me.datas.H = me.rotate;
                var mod = parseInt((me.datas.left + 1) / 30);
                var data = (me.datas.left - mod * 30) * 255 / 30 | 0;
                switch (mod) {
                    case 0:
                        me.str = "rgb(255," + data + ",0)";
                        me.datas.r = 255;
                        me.datas.g = data;
                        me.datas.b = 0;
                        break;
                    case 1:
                        me.str = "rgb(" + (255 - data) + ",255,0)";
                        me.datas.r = 255 - data;
                        me.datas.g = 255;
                        me.datas.b = 0;
                        break;
                    case 2:
                        me.str = "rgb(0,255," + data + ")";
                        me.datas.r = 0;
                        me.datas.g = 255;
                        me.datas.b = data;
                        break;
                    case 3:
                        me.str = "rgb(0," + (255 - data) + ",255)";
                        me.datas.r = 0;
                        me.datas.g = 255 - data;
                        me.datas.b = 255;
                        break;
                    case 4:
                        me.str = "rgb(" + data + ",0,255)";
                        me.datas.r = data;
                        me.datas.g = 0;
                        me.datas.b = 255;
                        break;
                    case 5:
                        me.str = "rgb(255,0," + (255 - data) + ")";
                        me.datas.r = 255;
                        me.datas.g = 0;
                        me.datas.b = 255 - data;
                        break;
                }
                DD.css(me.dom, "background", me.str);
            }
            me.moveitem = function() {
                DD.css(me.small, "left", me.x + 'px');
                DD.css(me.small, "top", me.y + 'px');
                var v = ((me.pery - me.y) / me.pery).toFixed(2) * 255 | 0;
                var s = ((me.x) / me.perx).toFixed(2);
                var f1 = parseInt((me.rotate + 1) / 60);
                var f = (me.rotate / 60 - f1);
                var p = (1 - s) * 255 | 0;
                var q = (1 - f * s) * 255 | 0;
                var t = (1 - (1 - f) * s) * 255 | 0;
                var str = "";
                switch (f1) {
                    case 0:
                        str = "rgb(" + v + "," + t + "," + p + ")";
                        me.datas.r = v;
                        me.datas.g = t;
                        me.datas.b = p;
                        break;
                    case 1:
                        str = "rgb(" + q + "," + v + "," + p + ")";
                        me.datas.r = q;
                        me.datas.g = v;
                        me.datas.b = p;
                        break;
                    case 2:
                        str = "rgb(" + p + "," + v + "," + t + ")";
                        me.datas.r = p;
                        me.datas.g = v;
                        me.datas.b = t;
                        break;
                    case 3:
                        str = "rgb(" + p + "," + q + "," + v + ")";
                        me.datas.r = p;
                        me.datas.g = q;
                        me.datas.b = v;
                        break;
                    case 4:
                        str = "rgb(" + t + "," + p + "," + v + ")";
                        me.datas.r = t;
                        me.datas.g = p;
                        me.datas.b = v;
                        break;
                    case 5:
                        str = "rgb(" + v + "," + p + "," + q + ")";
                        me.datas.r = v;
                        me.datas.g = p;
                        me.datas.b = q;
                        break;
                }
                me.datas.H = me.rotate;
                me.datas.s = s*255|0;
                me.datas.v = v;
            };
            setTimeout(function() {
                me.dom = view.querySelector(".color-jbe");
                me.point = view.querySelector(".point");
                me.bar = view.querySelector(".eventName");
                me.small = view.querySelector(".small-item");
                me.perx = parseInt(DD.css(me.dom, "width"));
                me.pery = parseInt(DD.css(me.dom, "height"));
                new DD.Event({
                    view: me.point,
                    eventName: 'mousedown',
                    nopopo: true,
                    handler: function(e, data, view) {
                        flag = 1;
                        first = 1;
                        move = 1;
                    }
                });
                new DD.Event({
                    view: view.querySelector(".color-content"),
                    eventName: 'mouseup',
                    nopopo: true,
                    handler: function(e, data, view) {
                        flag = 0;
                    }
                });
                new DD.Event({
                    view: me.bar,
                    eventName: 'mousemove',
                    nopopo: true,
                    handler: function(e, data, view) {
                        if (flag) {
                            if (!first) {
                                if (new Date().getTime() > me.time.new + 3000) {
                                    move = 0;
                                } else {
                                    move = 1;
                                }
                            }
                            if (move) {
                                me.first = 0;
                                me.datas.left = e.offsetX;
                                me.case();
                                me.time.new = new Date().getTime();
                            }
                        }
                    }
                });
                new DD.Event({
                    view: me.bar,
                    eventName: 'click',
                    nopopo: true,
                    handler: function(e, data, view) {
                        me.datas.left = e.offsetX;
                        me.case();
                        flag = 0;
                    }
                });
                new DD.Event({
                    view: view.querySelector(".moveE"),
                    eventName: "mousemove",
                    nopopo: true,
                    handler: function(e, data, view) {
                        if (flag_2) {
                            me.x = e.offsetX;
                            me.y = e.offsetY;
                            me.moveitem();
                        }
                    }
                });
                new DD.Event({
                    view: view.querySelector(".moveE"),
                    eventName: "mouseup",
                    nopopo: true,
                    handler: function(e, data, view) {
                        flag_2 = 0;
                    }
                });
                new DD.Event({
                    view: view.querySelector(".moveE"),
                    eventName: "click",
                    nopopo: true,
                    handler: function(e, data, view) {
                        me.x = e.offsetX;
                        me.y = e.offsetY;
                        me.moveitem();
                        flag_2 = 0;
                    }
                });
                new DD.Event({
                    view: view.querySelector(".small-item"),
                    eventName: "mousedown",
                    nopopo: true,
                    handler: function(e, data, view) {
                        flag_2 = 1;
                    }
                });
                new DD.Event({
                    view: view.querySelector(".small-item"),
                    eventName: "mouseup",
                    nopopo: true,
                    handler: function(e, data, view) {
                        flag_2 = 0;
                    }
                });
                new DD.Event({
                    view: view.querySelector(".ensure"),
                    eventName: "click",
                    nopopo: true,
                    handler: function(e, data, view) {
                        //颜色特殊处理一下
                        var change = function(num) {
                            var swicth = function(n) {
                                if (n > 9) {
                                    switch (n) {
                                        case 10:
                                            return "a";
                                            break;
                                        case 11:
                                            return "b";
                                            break;
                                        case 12:
                                            return "c";
                                            break;
                                        case 13:
                                            return "d";
                                            break;
                                        case 14:
                                            return "e";
                                            break;
                                        case 15:
                                            return "f";
                                            break;
                                    }
                                }
                                return n + "";
                            }
                            var x = swicth(parseInt(num / 16));
                            var y = swicth(num % 16);
                            return x+y;
                        }
                        data.show = false;
                        data.str = "#" + change(data.r) + "" + change(data.g) + "" + change(data.b) + "";
                    }
                });
            }, 0);
        },
    };
    DD.Plugin.create('plugin_05001', plugin_05001);
})();/**
 * 日期插件
 */

(function() {
    var plugin_06001 = function() {
    };

    plugin_06001.prototype.init = function(view) {
        var me = this;
        var template = `<div class="xDate" x-model='date_data'>
        <div class="xDate-input">
        <input type="text" name="" id='xDate-input'>
        </div>
        <div class="xDate-calendar" x-show='show'>
        <div class="xDate-date">
        <div class="xDate-header">
        <div class="xDate-btn fr" id='nextMonthBtn'>&gt;</div>
        <div class="xDate-btn fl" id='preMonthBtn'>&lt;</div>
        <div class="xDate-Date">{{year}}年{{month}}月<div id='goToToday' title='回到今日'></div></div>
        <div class="clear"></div>
        </div>
        <div class="xDate-body">
        <div class="xDate-table">
        <div class="xDate-week">
        <div class='xDate-day-header' x-repeat='xDate_day'>{{day}}</div>
        </div>
        <div class="xDate-week" x-repeat='xDate_week'>
        <div class='xDate-day' x-repeat='xDate_days' x-class="{'xDate-today':'today','xDate-no-this-month':'month===0||month===2'}">{{day}}</div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>`;
        view.innerHTML = template;
        var data = DD.attr(view, 'dataName') || 'data';
        //数据项名字
        view.$dataItem = data;
        //移除showItem
        view.removeAttribute('dataItem');
        //设置innerHTML
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    }

    plugin_06001.prototype.render = function(view) {
        var me = this;
        var data = view.$getData().data[view.$dataItem];
        if (!data) {
            return;
        }
        var module;
        if (!data.module) {
            module = view.$module;
        } else {
            module = data.module;
        }
        if (!module) {
            return;
        }
        setTimeout(delayRender, 500);
        var input = view.querySelector('#xDate-input');
        var setDateInfo = function(year, month, day) {
            var date;
            if (!month || !year) {
                date = new Date();
            } else {
                if (day) {
                    date = new Date(year, month - 1, day);
                } else {
                    date = new Date(year, month - 1, 1);
                }
            }
            var nowDate = new Date();
            var thisYear = nowDate.getFullYear();
            var thisMonth = nowDate.getMonth() + 1;
            var thisDate = nowDate.getDate();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var today = date.getDate();
            var firstDay = new Date(year, month - 1, 1);
            var lastDayOfLastMonth = new Date(year, month - 1, 0).getDate();
            var allDays = new Date(year, month, 0).getDate();
            var weeks = [
                [],
                [],
                [],
                [],
                [],
                []
            ];
            var index = 0;
            for (var i = 1; i <= firstDay.getDay(); i++) {
                weeks[0].push({ day: lastDayOfLastMonth - firstDay.getDay() + i, month: 0, today: false });
            }
            for (var j = 1; j <= allDays; j++) {
                var state = year === thisYear && month == thisMonth && j == thisDate;
                if (weeks[index].length < 7) {
                    weeks[index].push({ day: j, month: 1, today: state });
                } else {
                    weeks[++index].push({ day: j, month: 1, today: state });
                }
            }
            for (var k = 0; k < weeks.length; k++) {
                if (weeks[k] == '') {
                    weeks.splice(k, 1);
                }
            }
            var nextMonthDays = 7 - weeks[weeks.length - 1].length;
            for (var day = 1; day <= nextMonthDays; day++) {
                weeks[weeks.length - 1].push({ day: day, month: 2, today: false });
            }
            data.year = year;
            data.month = month;
            data.day = today;
            data.xDate_week = [];
            for (var k = 0; k < weeks.length; k++) {
                data.xDate_week.push({ xDate_days: weeks[k] });
            }
            if (data.day > allDays) {
                data.day = allDays;
            }
        };

        if (data.year === "" || data.month === "") {
            setDateInfo();
        }

        function delayRender() {
            var updateCSS = function() {
                me.days = view.getElementsByClassName('xDate-day');
                me.header = view.querySelector('.xDate-header');
                me.bg = view.querySelector('.xDate-body');
                DD.css(me.header, 'background', data.xDate_color.header_color);
                DD.css(me.bg, 'background', data.xDate_color.bg_color);
                for (var i = 0; i < me.days.length; i++) {
                    if (me.days[i].className.indexOf('xDate-no-this-month') === -1) {
                        DD.css(me.days[i], 'color', data.xDate_color.month_color);
                    } else {
                        DD.css(me.days[i], 'color', data.xDate_color.day_color);
                    }
                    if (me.days[i].className.indexOf('xDate-today') !== -1) {
                        DD.css(me.days[i], 'border-color', data.xDate_color.today_color);
                    }
                }
            };
            //变量提升写在这
            updateCSS();
            var preMonth = function() {
                if (data.month === 1) {
                    data.year--;
                    data.month = 12;
                } else {
                    data.month--;
                }
                setDateInfo(data.year, data.month);
                updateCSS();
            };

            var nextMonth = function() {
                if (data.month === 12) {
                    data.year++;
                    data.month = 1;
                } else {
                    data.month++;
                }
                setDateInfo(data.year, data.month);
                updateCSS();
            };

            var backToday = function() {
                var date = new Date();
                data.month = date.getMonth() + 1;
                data.year = date.getFullYear();
                data.day = date.getDate();
                setDateInfo(data.year, data.month, data.day);
                updateCSS();
            };

            var changeShowState = function() { //view 渲染速度过慢会导致updateCss报错
                data.show = !data.show;
                // if(data.show){
                //  setTimeout(updateCSS,100);
                // }
            };
            var chooseDay = function(e, d, v) {
                data.show = false;
                data.day = d.day;
                input.value = data.year + '/' + data.month + '/' + data.day;
            }
            if (data.show) {
                me.preBtn = view.querySelector('#preMonthBtn');
                me.nextBtn = view.querySelector('#nextMonthBtn');
                var days=view.getElementsByClassName('xDate-day');
                me.todayBtn = view.querySelector('#goToToday');

                new DD.Event({
                    eventName: 'click',
                    view: me.preBtn,
                    handler: preMonth
                })

                new DD.Event({
                    eventName: 'click',
                    view: me.nextBtn,
                    handler: nextMonth
                })

                new DD.Event({
                    eventName: 'click',
                    view: me.todayBtn,
                    handler: backToday
                })
                for (var i = 0; i < me.days.length; i++) {
                    new DD.Event({
                        eventName: 'click',
                        view: me.days[i],
                        handler: chooseDay
                    })
                }
            }

            new DD.Event({
                eventName: 'click',
                view: input,
                handler: changeShowState
            })
        }
    }
    DD.Plugin.create("plugin_06001", plugin_06001);
}());;/**
 * 选择框插件
 */

(function() {
    var plugin_06002 = function() {};
    plugin_06002.prototype.init = function(view) {
        var me = this;
        var template = "<div class='nd-plugin-select-box'><div class='quit-area'></div><div class='select-area'><div class='select-header'><div class='header-left' e-click='confirm'>取消</div><div class='header-middle'>选择日期</div><div class='header-right' e-click='confirm'>确定</div><div class='clear'></div></div><div class='select-content'><ul class='options'><li class='option' x-repeat='options'>{{date}}</li></ul><div class='nowOption'></div></div></div></div>"
        view.innerHTML = template;
        var data = DD.attr(view, 'dataName') || 'data';
        //数据项名字
        view.$dataItem = data;
        //移除showItem
        view.removeAttribute('dataItem');
        //设置innerHTML
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    };

    plugin_06002.prototype.render = function(view) {
        var me = this;
        var data = view.$getData().data[view.$dataItem];
        var canMove = false;
        var startX = 0,
            StartY = 0;
        var nowtranslateY = 0;
        if (!data) {
            return;
        }
        var module;
        if (!data.module) {
            module = view.$module;
        } else {
            module = data.module;
        }
        if (!module) {
            return;
        }
        setTimeout(delayRender, 0);

        var plugin = view.querySelector('.nd-plugin-select-box');
        var quit = view.querySelector('.quit-area');
        var select = view.querySelector('.select-area');
        var options = view.querySelector('.options');
        var nowOption = view.querySelector('.nowOption');
        DD.css(select, 'height', '300px');
        DD.css(select, "font-size", data.font_size + 'px');
        DD.css(nowOption, "background-color", data.select_color);
        DD.css(options, "color", data.font_color);
        if (!data.show) {
            DD.css(plugin, 'display', 'none');
        } else {
            DD.css(plugin, 'display', 'block');
        }

        function delayRender() {
            var hideSelect = function(e, d, v) {
                DD.css(select, 'height', '0px');
                DD.css(plugin, 'display', 'none');
                data.show = false;
            };
            var showSelect = function(e, d, v) {};

            new DD.Event({
                eventName: 'click',
                view: quit,
                handler: hideSelect
            });

            new DD.Event({
                eventName: 'click',
                view: select,
                handler: showSelect
            });

            new DD.Event({
                eventName: 'mousedown',
                view: options,
                handler: function(event) {
                    canMove = true;
                    var e = event || window.event;
                    if (DD.config.deviceType !== 1) {
                        startX = e.clientX;
                        startY = e.clientY;
                    } else {
                        startX = e.touches[0].clientX;
                        startY = e.touches[0].clientY;
                    }
                    nowtranslateY = DD.css(options, 'transform').replace(/[^0-9,.-]/g, '').split(',')[5];
                }
            })
            new DD.Event({
                eventName: 'mouseover',
                view: view,
                handler: function(event) {
                    var e = event || window.event;
                    if (canMove) {
                        var nowY;
                        if (DD.config.deviceType !== 1) {
                            nowY = e.clientY;
                        } else {
                            e.preventDefault();
                            nowY = e.touches[0].clientY;
                        }

                        var distance = (nowY - startY) + parseFloat(nowtranslateY);
                        if (distance < 0 && -distance > data.options.length * 30) {
                            distance = -(data.options.length * 30 - 15);
                        } else if (distance > 0 && distance > data.options.length * 30) {
                            distance = data.options.length * 30 + 15;
                        }
                        DD.css(options, "transform", 'translate(0,' + distance + 'px)');
                    }
                }
            })

            new DD.Event({
                eventName: 'mouseup',
                view: view,
                handler: function() {
                    setTimeout(function() {
                        if (canMove) {
                            nowtranslateY = DD.css(options, 'transform').replace(/[^0-9,.-]/g, '').split(',')[5];
                            var distance = Math.ceil(Math.abs(nowtranslateY) / 30) * -30 + 15;
                            DD.css(options, 'transform', 'translate(0,' + distance + 'px)');
                            data.nowDate = data.options[Math.ceil(Math.abs(nowtranslateY) / 30) - 1].date;
                            canMove = false;
                        }
                    }, 0);
                }
            })

        }
    }
    DD.createModule({
        name: 'm_plugin_show',
        el: '.show',
        onReceive: function(m, d) {
            var me = this;
            if (m === 'm_plugin_06002') {
                me.data.$set('nowDate', d.nowDate);
            }
        },
    });
    DD.Plugin.create('plugin_06002', plugin_06002);
}());;﻿/**
 * 分页插件
 * 欲用此插件，必先在使用此插件的模块上有一个updatePage函数,用来点击之后刷新页面
 * page:当前页
 * to_page:输入框的数据（到第几页）
 * allpage:总共多少页
 * @return {[type]} [description]
 */
;(function() {
    var Paging = function() {};

    Paging.prototype = {
        init: function(view) {
            var me = this;
            var template = `<div class="nd-plugin-paging">
                                <span>共<span class="red">{{total}}</span>条记录</span>
                                <span>共<span class="red">{{allpage}}</span>页</span>
                                <span>当前第<span class="red">{{page}}</span>页</span>
                                <div class="to-first" x-class="{'can-not':'page==1'}">首页</div>
                                <div class="to-prev" x-class="{'can-not':'page==1'}">上一页</div>
                                <div class="to-next" x-class="{'can-not':'page==allpage'}">下一页</div>
                                <div class="to-last" x-class="{'can-not':'page==allpage'}">末页</div>
                                <span>转到:</span>
                                <input type="number" x-field="to_page">
                                <div class="go-to">GO</div>
                            </div>`;
            view.innerHTML = template;
            DD.Compiler.compile(view,view.$module);
            view.$forceRender = true;
        },
        render:function(view){
            var data=view.$getData().data;
            if(data.total && data.row) {
                data.allpage = Math.ceil(data.total /data.row);
            }
            new DD.Event({
                eventName:'click',
                view:view.querySelector('.to-first'),
                handler:function(e,d,v){
                    if(this.data.page!==1){
                        this.data.page = 1;
                        this.module.methodFactory.methods.updatePage.call(this);
                    }
                }
            });
            new DD.Event({
                eventName:'click',
                view:view.querySelector('.to-last'),
                handler:function(e,d,v){
                    if(this.data.page!==this.data.allpage){
                        this.data.page = this.data.allpage;
                        this.module.methodFactory.methods.updatePage.call(this);
                    }
                }
            });
            new DD.Event({
                eventName:'click',
                view:view.querySelector('.to-prev'),
                handler:function(e,d,v){
                    if(this.data.page>1){
                        this.data.page--;
                        this.module.methodFactory.methods.updatePage.call(this);
                    }
                }
            });
            new DD.Event({
                eventName:'click',
                view:view.querySelector('.to-next'),
                handler:function(e,d,v){
                    if(this.data.page<this.data.allpage){
                        this.data.page++;
                        this.module.methodFactory.methods.updatePage.call(this);
                    }
                }
            });
            new DD.Event({
                eventName:'click',
                view:view.querySelector('.go-to'),
                handler:function(e,d,v){
                    if(this.data.page !== this.data.to_page&&
                        this.data.to_page>=1&&
                        this.data.to_page<=this.data.allpage){
                        this.data.page = this.data.to_page;
                        this.module.methodFactory.methods.updatePage.call(this);
                    }
                }
            });
        }
    }
    // DD.Plugin.create('paging', Paging);
}());;
/**
 * Created by xll on 2017/11/27.
 */
(function () {
    var plugin_07001 = function () {

    }

    plugin_07001.prototype.init = function (view) {
        var me = this;
        var template = `<div class="nd-plugin-collapse-box nd-plugin-slideimg-panel">
                            <div class="nd-plugin-collapse-heading">
                                
                            </div>
                            <div class="nd-plugin-collapse-content" >
                                <span class="nd-plugin-collapse-coninfo"></span>
                            </div>
                        </div>`;
        var data = DD.attr(view, 'dataName') || 'data';
        view.$dataName = data;
        view.innerHTML = template;
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    }

    plugin_07001.prototype.render = function (view) {
        var me = this;
        var data = view.$getData().data[view.$dataName];
        if(!data){
            return;
        }
        var module;
        if(!data.module){
            module = view.$module;
        }else {
            module = data.module;
        }
        if(!module){
            return;
        }
        setTimeout(delayRender, 0);
        function delayRender() {
            var collapseHead = document.querySelector(".nd-plugin-collapse-heading");
            var collapseCon = document.querySelector(".nd-plugin-collapse-content");
            var collapseConInfo = document.querySelector(".nd-plugin-collapse-coninfo");
            collapseHead.innerText = data.heading;
            collapseConInfo.innerText = data.content;
            var collapseConInfoHeight = parseInt(window.getComputedStyle(collapseConInfo, null).height) + parseInt(20) + 'px';
            if(data.isCollapse){
                DD.css(collapseCon, 'height', collapseConInfoHeight);
                DD.css(collapseHead, 'border-bottom', '1px solid #ddd');
            }else {
                DD.css(collapseCon, 'height', 0);
                DD.css(collapseHead, 'border-bottom', 'none');
            }
            DD.css(collapseHead, 'background-color', data.head_bg_color);
            DD.css(collapseCon, 'background-color', data.content_bg_color);
            DD.css(collapseHead, 'color', data.head_font_color);
            DD.css(collapseCon, 'color', data.content_font_color);
            DD.css(collapseHead, 'font-size', data.head_font_size + 'px');
            DD.css(collapseCon, 'font-size', data.content_font_size + 'px');
            var clickEvent = function (e,d,v) {
                if(data.isCollapse){
                    DD.css(collapseCon, 'height', 0);
                    setTimeout(function () {
                        DD.css(collapseHead, 'border-bottom', 'none');
                    }, 500);
                    data.isCollapse = false;
                }else {
                    data.isCollapse = true;
                    DD.css(collapseCon, 'height', collapseConInfoHeight);
                    DD.css(collapseHead, 'border-bottom', '1px solid #ddd');
                }
                DD.css(collapseCon, 'transition-property', 'height');
                DD.css(collapseCon, 'transition-duration', data.time+'s');
                DD.css(collapseCon, '-webkit-transition-property', 'height');
                DD.css(collapseCon, '-webkit-transition-duration', data.time+'s');
            }
            //点击事件
            new DD.Event({
                eventName:'click',
                view:collapseHead,
                handler:clickEvent
            });
        }
    }

    DD.Plugin.create("plugin_07001", plugin_07001);
}());
;;
(function() {
    var plugin_08001 = function() {};
    plugin_08001.prototype = {
        init: function(view) {
            var tem = `<div class='ct' style="position:relative; width:100%;height:100%">
                            <div class="small"></div>
                            <img src="{{urlsmall}}" class='small-img'>
                            <div class="magn"></div>
                        <div class="big"><img src="{{urlbig}}" class='big_img'></div></div>`
            view.innerHTML = tem;
            var data = DD.attr(view, 'dataName') || 'data';
            view.$dataName = data;
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
       render: function(view) {
            var me = this;
            var data = view.$getData().data[view.$dataName];
            me.getx = function(x) {
                var me = this;
                if (x <= me.width / 2) {
                    me.move_x = 0;
                    return;
                }
                if (x >= (me.width * me.radio - me.width / 2)) {
                    me.move_x = me.width * (me.radio - 1);
                    return;
                }
                me.move_x = x - me.width / 2;
            }
            me.gety = function(y) {
                var me = this;
                if (y <= me.height / 2) {
                    me.move_y = 0;
                    return;
                }
                if (y >= (me.height * me.radio - me.height / 2)) {
                    me.move_y = me.height * (me.radio - 1);
                    return;
                }
                me.move_y = y - me.height / 2;
            }
            me.move = function() {
                var me = this;
                DD.css(me.magn, 'left', me.move_x + 'px');
                DD.css(me.magn, 'top', me.move_y + 'px');
                DD.css(me.bigimg, 'left', -me.move_x * me.radio + 'px');
                DD.css(me.bigimg, 'top', -me.move_y * me.radio + 'px');
            }
            //渲染结束后开始执行
            setTimeout(function() {
                //比例系数
                me.radio = data.radio;
                me.move_y = 0;
                me.move_x = 0;
                me.bigimg = view.querySelector('.big_img');
                me.smallimg = view.querySelector('.small-img');
                DD.attr(me.bigimg, 'src', data.big_img);
                DD.attr(me.smallimg, 'src', data.small_img);
                //可以移动的小方块
                me.magn = view.querySelector('.magn');
                me.content_div = view.querySelector('.ct');
                var ct_height = parseInt(DD.css(me.content_div, "height"));
                var ct_width = parseInt(DD.css(me.content_div, "width"));
                DD.css(me.magn, "width", (ct_width / me.radio) + 'px');
                DD.css(me.magn, "background-color", data.mark_color);
                DD.css(me.magn, "opacity", data.mark_opacity);
                DD.css(me.magn, "height", (ct_height / me.radio) + 'px');
                DD.css(me.bigimg, "width", (ct_width * me.radio) + 'px');
                DD.css(me.bigimg, "height", (ct_height * me.radio) + 'px');
                me.height = parseInt(DD.css(me.magn, 'height'));
                me.width = parseInt(DD.css(me.magn, 'width'));
                me.big = view.querySelector('.big');
                new DD.Event({
                    eventName: 'mouseenter',
                    view: view.querySelector('.small'),
                    handler: function(e, data, view) {
                        DD.css(me.magn, 'visibility', 'visible');
                        DD.css(me.big, 'visibility', 'visible');
                    }
                });
                new DD.Event({
                    eventName: 'mouseleave',
                    view: view.querySelector('.small'),
                    handler: function(e, data, view) {
                        DD.css(me.magn, 'visibility', 'hidden');
                        DD.css(me.big, 'visibility', 'hidden');
                    }
                });
                new DD.Event({
                    eventName: 'mousemove',
                    view: view.querySelector('.small'),
                    handler: function(e, data, view) {
                        //获取鼠标位置
                        me.getx(e.offsetX);
                        me.gety(e.offsetY);
                        //移动
                        me.move();
                    }
                });
            }, 0);
        }
    };
    DD.Plugin.create('plugin_08001', plugin_08001);
})();;﻿/**
 * Created by xll on 2018/3/26.
 * input 输入自动补全
 */
/**
 * 分页插件
 * 欲用此插件，必先在使用此插件的模块上有一个updatePage函数,用来点击之后刷新页面
 * page:当前页
 * to_page:输入框的数据（到第几页）
 * allpage:总共多少页
 * @return {[type]} [description]
 */
;(function() {
    var plugin_10001 = function() {};

    plugin_10001.prototype = {
        init: function(view) {
            var me = this;
            var template = `<div class="nd-plugin-paging">
                                <span>共<span class="red total">{{total}}</span>条记录</span>
                                <span>共<span class="red allpage">{{allpage}}</span>页</span>
                                <span>当前第<span class="red page">{{page}}</span>页</span>
                                <div class="to-first" x-class="{'can-not':'page==1'}">首页</div>
                                <div class="to-prev" x-class="{'can-not':'page==1'}">上一页</div>
                                <div class="to-next" x-class="{'can-not':'page==allpage'}">下一页</div>
                                <div class="to-last" x-class="{'can-not':'page==allpage'}">末页</div>
                                <span>转到:</span>
                                <input type="number" x-field="to_page">
                                <div class="go-to">GO</div>
                            </div>`;
            view.innerHTML = template;
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render:function(view){
            var data = view.$getData().data;
            if(data.total && data.row) {
                data.allpage = Math.ceil(data.total /data.row);
            }
            setTimeout(delayRender, 0);
            function delayRender() {
                var red = document.querySelectorAll('.red');
                red.forEach(function (item) {
                    DD.css(item, 'color', data.page_color);
                })
                new DD.Event({
                    eventName:'click',
                    view:view.querySelector('.to-first'),
                    handler:function(e,d,v){
                        if(this.data.page!==1){
                            this.data.page = 1;
                            this.module.methodFactory.methods.updatePage.call(this);
                        }
                    }
                });
                new DD.Event({
                    eventName:'click',
                    view:view.querySelector('.to-last'),
                    handler:function(e,d,v){
                        if(this.data.page!==this.data.allpage){
                            this.data.page = this.data.allpage;
                            this.module.methodFactory.methods.updatePage.call(this);
                        }
                    }
                });
                new DD.Event({
                    eventName:'click',
                    view:view.querySelector('.to-prev'),
                    handler:function(e,d,v){
                        if(this.data.page>1){
                            this.data.page--;
                            this.module.methodFactory.methods.updatePage.call(this);
                        }
                    }
                });
                new DD.Event({
                    eventName:'click',
                    view:view.querySelector('.to-next'),
                    handler:function(e,d,v){
                        if(this.data.page<this.data.allpage){
                            this.data.page++;
                            this.module.methodFactory.methods.updatePage.call(this);
                        }
                    }
                });
                new DD.Event({
                    eventName:'click',
                    view:view.querySelector('.go-to'),
                    handler:function(e,d,v){
                        if(this.data.page !== this.data.to_page&&
                            this.data.to_page>=1&&
                            this.data.to_page<=this.data.allpage){
                            this.data.page = this.data.to_page;
                            this.module.methodFactory.methods.updatePage.call(this);
                        }
                    }
                });
            }

        }
    }
    DD.Plugin.create('plugin_10001', plugin_10001);
}());;/**
 * Created by xll on 2018/5/10.
 *
 * 分页插件
 * 欲用此插件，必先在使用此插件的模块上有一个updatePage函数,用来点击之后刷新页面
 * pre_page:当前页
 * go_page:输入框的数据（到第几页）
 * all_page:总共多少页
 * @return {[type]} [description]
 */
;(function() {
    var plugin_10002 = function() {};

    plugin_10002.prototype = {
        init: function(view) {
            var me = this;
            var template = `<div class="com-page" x-model="page">
                            <div class="com-go-pre"></div>
                            <div class="com-page-box">
                                <span class="com-page-item mar-left" x-repeat="page_rows" x-class="{'com-pre-page': 'page===pre_page'}" e-click="goPage">{{page}}</span>
                            </div>
                            <div class="com-go-next" e-click="goNext"></div>
                            <div class="com-go">
                                <span>前往</span>
                                <input type="text" x-field="go_page">
                                <span>页</span>
                                <button class="com-go-btn" e-click="goInputPage">GO</button>
                            </div>
                        </div>`;
            view.innerHTML = template;
            var data = DD.attr(view,'dataItem') || 'data';
            //数据项名字
            view.$dataItem = data;
            //移除showItem
            view.removeAttribute('dataItem');
            DD.Compiler.compile(view,view.$module);
            view.$forceRender = true;
        },
        render:function(view){
            var data = view.$getData().data[view.$dataItem];
            data_rows = [];
            var me=this;
            if(!data){
                return;
            }
            var module;
            if(!data.module){
                module = view.$module;
            }else {
                module = data.module;
            }
            if(!module){
                return;
            }
            if(data.one){
            if(data.all_page >= 0) {
                // 动态修改页码数组
                if(data.all_page > 7) {
                    data.page_rows = [];
                    for(var i = 1; i < 7; i ++) {
                        if(i === 6) {
                            data.page_rows.push({
                                page: '...',
                                pre_page: data.pre_page
                            });
                        }else {
                            data.page_rows.push({
                                page: i,
                                pre_page: data.pre_page
                            })
                        }
                    }
                    data.page_rows.push({
                        page: data.all_page,
                        pre_page: data.pre_page
                    })
                }else {
                    // 清空数据
                    data.page_rows = [];
                    for(var i = data.all_page; i > 0; i --) {
                        data.page_rows.push({
                            page: data.all_page - i + 1,
                            pre_page: data.pre_page
                        });
                    }
                }
            }}
            data.one=false;
            setTimeout(function () {
                var box = view.querySelectorAll(".com-page-item");
                // box.forEach(function(i) {
                //     if(parseInt(i.innerText) === data.pre_page) {
                //         DD.css(i, "background-color", data.pre_color);
                //     } else {
                //         DD.css(i, "color", data.word_color);
                //     }
                //
                // });
                /**
                 * 修改page_rows
                 * @param pre_page   当前页
                 * @param all_page   总页数
                 */
                function changePageRows(pre_page, all_page) {
                    if(pre_page <= 6) {
                        if(all_page <= 6) {
                            data.page_rows = [];
                            for(var i = all_page; i > 0; i --) {
                                data.page_rows.push({
                                    page: all_page - i + 1,
                                    pre_page: pre_page
                                });
                            }
                        }else {
                            data.page_rows = [
                                {
                                    page: 1,
                                    pre_page: pre_page
                                },{
                                    page: 2,
                                    pre_page: pre_page
                                },{
                                    page: 3,
                                    pre_page: pre_page
                                },{
                                    page: 4,
                                    pre_page: pre_page
                                },{
                                    page: 5,
                                    pre_page: pre_page
                                },{
                                    page: 6,
                                    pre_page: pre_page
                                },{
                                    page: '...',
                                    pre_page: pre_page
                                },{
                                    page: all_page,
                                    pre_page: pre_page
                                }
                            ]
                        }
                    }else if(pre_page > 6 && pre_page <= all_page - 5) {
                        data.page_rows = [
                            {
                                page: 1,
                                pre_page: pre_page
                            },{
                                page: '...',
                                pre_page: pre_page
                            },{
                                page: pre_page - 1,
                                pre_page: pre_page
                            },{
                                page: pre_page,
                                pre_page: pre_page
                            },{
                                page: pre_page + 1,
                                pre_page: pre_page
                            },{
                                page: pre_page + 2,
                                pre_page: pre_page
                            },{
                                page: '...',
                                pre_page: pre_page
                            },{
                                page: all_page,
                                pre_page: pre_page
                            }
                        ]
                    }else if(pre_page > all_page - 5) {
                        data.page_rows = [
                            {
                                page: 1,
                                pre_page: pre_page
                            },{
                                page: '...',
                                pre_page: pre_page
                            },{
                                page: all_page - 5,
                                pre_page: pre_page
                            },{
                                page: all_page - 4,
                                pre_page: pre_page
                            },{
                                page: all_page - 3,
                                pre_page: pre_page
                            },{
                                page: all_page - 2,
                                pre_page: pre_page
                            },{
                                page: all_page - 1,
                                pre_page: pre_page
                            },{
                                page: all_page,
                                pre_page: pre_page
                            }
                        ];
                    }
                }
                new DD.Event({
                    eventName:'click',
                    view:view.querySelector('.com-go-pre'),
                    handler:function(e,d,v){
                        var me = this;
                        if(data.pre_page === 1) {
                            return;
                        }
                        data.pre_page --;
                        changePageRows(data.pre_page, data.all_page);
                        // 请求数据
                        if(me.module.methodFactory.methods.updatePage){
                            me.module.methodFactory.methods.updatePage.call(this);
                        }
                        view.$forceRender = true;
                    }
                });
                new DD.Event({
                    eventName:'click',
                    view:view.querySelector('.com-go-next'),
                    handler:function(e,d,v){
                        var me = this;
                        if(data.pre_page === data.all_page) {
                            return;
                        }
                        data.pre_page ++;
                        changePageRows(data.pre_page, data.all_page);
                        if(me.module.methodFactory.methods.updatePage){
                            me.module.methodFactory.methods.updatePage.call(this);
                        }
                        view.$forceRender = true;
                    }
                });
                new DD.Event({
                    eventName:'click',
                    view:view.querySelector('.com-go-btn'),
                    handler:function(e,d,v){
                        var me = this;
                        if(parseInt(data.go_page) > data.all_page) {
                            return;
                        }
                        data.pre_page = parseInt(data.go_page);
                        changePageRows(data.pre_page, data.all_page);
                        // 请求数据
                        if(me.module.methodFactory.methods.updatePage){
                            me.module.methodFactory.methods.updatePage.call(this);
                        }
                        view.$forceRender = true;
                    }
                });
                var page_arr = view.querySelectorAll('.com-page-item');
                for(let i = 0; i < page_arr.length; i ++) {
                    new DD.Event({
                        eventName:'click',
                        view:page_arr[i],
                        handler:function(e,d,v){
                            if(d.page !== '...') {
                                data.pre_page = d.page;
                                changePageRows(data.pre_page, data.all_page);
                                if(me.module.methodFactory.methods.updatePage){
                                    me.module.methodFactory.methods.updatePage.call(this);
                                }
                                view.$forceRender = true;
                            }
                        }
                    });
                }
            },100)

        }
    }
    DD.Plugin.create('plugin_10002', plugin_10002);
}());;﻿/**
 * Created by xll on 2017/11/30.
 */
;
(function() {

    /**
     * 数据项配置说明
     * 参数dragProBar的取值为0~1或者是百分比,若是百分比，值为字符串
     * showStyle表示水平显示还是垂直显示
     */
    var plugin_11001 = function() {

    }

    plugin_11001.prototype.init = function(view) {
        var me = this;
        var template = `<div class="nd-plugin-dragprobar-box">
                            <div class="nd-plugin-dragprobar-total">
                                <span class="nd-plugin-dragprobar-percent"></span>
                                <span class="nd-plugin-dragprobar-btn"></span>
                            </div>
                        </div>`;
        DD.addClass(view, 'nd-plugin-dragprobar');
        //数据项名
        var data = DD.attr(view, 'process');
        view.$dataName = data;
        //显示样式
        var showStyle = DD.attr(view, 'showStyle');
        view.$showStyle = showStyle;

        view.$processBoxBg = DD.attr(view, 'processBoxBg');
        view.$percentColor = DD.attr(view, 'percentColor');
        view.$processBg = DD.attr(view, 'processBg');
        view.$dragBtnWidth = DD.attr(view, 'dragBtnWidth');
        view.$dragBtnColor = DD.attr(view, 'dragBtnColor');
        view.innerHTML = template;
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    }

    plugin_11001.prototype.render = function(view) {
        var me = this;
        var data = view.$getData().data;
        if (!data) {
            return;
        }
        var module;
        if (!data.module) {
            module = view.$module;
        } else {
            module = data.module;
        }
        if (!module) {
            return;
        }

        setTimeout(delayRender, 0);

        function delayRender() {
            var box = document.querySelector(".nd-plugin-dragprobar-box");
            DD.css(box, "background-color", "rgba(96,96,96,0.5)");
            var boxParents = box.parentNode.parentNode;
            var boxParentsStyle = window.getComputedStyle(boxParents, null);
            var percent = document.querySelector(".nd-plugin-dragprobar-percent");
            var btn = document.querySelector(".nd-plugin-dragprobar-btn");
            var total = document.querySelector(".nd-plugin-dragprobar-total");
            var totalWidth;
            var totalHeight;
            DD.css(box, "background-color", data[view.$processBoxBg]);
            DD.css(total, "background-color", data[view.$processBg]);
            DD.css(percent, "background-color", data[view.$percentColor]);
            DD.css(btn, 'width', data[view.$dragBtnWidth] + 'px');
            DD.css(btn, 'height', data[view.$dragBtnWidth] + 'px');
            DD.css(btn, 'margin-top', -(data[view.$dragBtnWidth] / 2 - 1) + 'px');
            DD.css(btn, 'margin-left', -(data[view.$dragBtnWidth] / 2 - 1) + 'px');
            DD.css(btn, 'background-color', data[view.$dragBtnColor]);
            if (data[view.$showStyle] === "vertical") {
                //设置总滑动条长宽
                DD.css(total, 'width', '2px');
                DD.css(total, 'height', boxParentsStyle.height);
                totalWidth = window.getComputedStyle(total, null).width;
                totalHeight = window.getComputedStyle(total, null).height;
                //设置percent的width
                DD.css(percent, 'width', '2px');
                //设置percent的height，top及btn的top
                if (data[view.$dataName]) {
                    if (typeof data[view.$dataName] === 'string') {
                        var percentNum = parseInt(data[view.$dataName].replace("%", ""));
                        if (percentNum >= 0 && percentNum <= 100) {
                            DD.css(percent, 'height', data[view.$dataName]);
                            DD.css(percent, 'top', (parseInt(100) - parseInt(percentNum)) + '%');
                            DD.css(btn, 'top', (parseInt(100) - parseInt(percentNum)) + '%');
                        } else {
                            alert("百分比取值为1%~100%");
                        }
                    } else {
                        if (data[view.$dataName] >= 0 && data[view.$dataName] <= 1) {
                            var percentHeight = data[view.$dataName] * 100 + '%';
                            DD.css(percent, 'height', percentHeight);
                            DD.css(percent, 'top', (parseFloat(1) - parseFloat(data[view.$dataName])) * 100 + '%');
                            DD.css(btn, 'top', (parseFloat(1) - parseFloat(data[view.$dataName])) * 100 + '%');
                        } else if (parseFloat(data[view.$dataName]) < 0 || parseFloat(data[view.$dataName]) > 1) {
                            alert("请输入正确的dragProBar值！");
                        }
                    }
                } else {
                    alert("找不到数据dragProBar！")
                }

            } else if (data[view.$showStyle] === 'horizontal') {
                DD.css(box, 'height', boxParentsStyle.height);
                //设置总滑动条长宽
                DD.css(total, 'width', boxParentsStyle.width);
                DD.css(total, 'height', '2px');
                totalWidth = window.getComputedStyle(total, null).width;
                totalHeight = window.getComputedStyle(total, null).height;
                //设置percent的width
                DD.css(percent, 'height', '2px');

                if (data[view.$dataName]) {
                    if (typeof data[view.$dataName] === 'string') {
                        var percentNum = parseInt(data[view.$dataName].replace("%", ""));
                        if (percentNum >= 0 && percentNum <= 100) {
                            DD.css(percent, 'width', data[view.$dataName]);
                            DD.css(btn, 'left', data[view.$dataName]);
                        } else {
                            alert("百分比取值为1%~100%");
                        }
                    } else {
                        if (data[view.$dataName] >= 0 && data[view.$dataName] <= 1) {
                            DD.css(percent, 'width', data[view.$dataName] * 100 + '%');
                            DD.css(btn, 'left', data[view.$dataName] * 100 + '%');
                        } else if (parseFloat(data[view.$dataName]) < 0 || parseFloat(data[view.$dataName]) > 1) {
                            alert("请输入正确的dragProBar值！");
                        }
                    }
                } else {
                    alert("找不到数据dragProBar！");
                }
            }
            new DD.Event({
                eventName: 'click',
                view: box,
                delg: true,
                capture: true,
                handler: function(e, data, v) {
                    var me = this;
                    if (e.target.className === 'nd-plugin-dragprobar-btn') {
                        return;
                    }
                    if(data[view.$showStyle] === 'horizontal') {
                        var box_width = parseInt(DD.css(box, 'width'));
                        data[view.$dataName] = e.offsetX / box_width;
                        DD.css(percent, "width", e.offsetX + 'px');
                        DD.css(btn, "left", e.offsetX + 'px');
                    }else if(data[view.$showStyle]  === 'vertical'){
                        var box_height = parseInt(DD.css(box, 'height'));
                        data[view.$dataName] = e.offsetY / box_height;
                        DD.css(percent, "top",e.offsetY + 'px');
                        DD.css(percent, "height", (1 - data[view.$dataName]) * box_height + 'px');
                        DD.css(btn, "top", e.offsetY + 'px');
                    }

                }
            });
        }
    }
    DD.Plugin.create('plugin_11001', plugin_11001);
}());;/**
 * Created by xll on 2017/11/28.
 */

(function() {
    /**
     * 数据项配置说明
     * 参数proBar的取值为0~1或者是百分比,若是百分比，值为字符串
     */
    var plugin_11002 = function() {

    }

    plugin_11002.prototype.init = function(view) {
        var me = this;
        var template = `<div class="nd-plugin-probar-box">
                            <div class="nd-plugin-probar-total">
                                <span class="nd-plugin-probar-pro"></span>
                                <span class="nd-plugin-probar-percent"></span>
                            </div>
                        </div>`;
        DD.addClass(view, 'nd-plugin-probar');
        var data = DD.attr(view, 'dataItem');
        var show = DD.attr(view, 'showItem');
        view.$dataName = data;
        view.$showItem = show;
        view.$processBgColor = DD.attr(view, 'processBgColor');
        view.$processPercentColor = DD.attr(view, 'processPercentColor');
        view.$processPercentNumColor = DD.attr(view, 'processPercentNumColor');
        view.innerHTML = template;
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    }

    plugin_11002.prototype.render = function(view) {
        var me = this;
        var data = view.$getData().data;
        if (!data) {
            return;
        }
        var module;
        if (!data.module) {
            module = view.$module;
        } else {
            module = data.module;
        }
        if (!module) {
            return;
        }
        setTimeout(delayRender, 0);

        function delayRender() {
            var total = view.querySelector(".nd-plugin-probar-total");
            var pro = view.querySelector(".nd-plugin-probar-pro");
            var percent = view.querySelector(".nd-plugin-probar-percent");
            DD.css(percent, "color", data[view.$processPercentNumColor]);
            DD.css(pro, "background-color", data[view.$processPercentColor]);
            DD.css(total, "background-color", data[view.$processBgColor]);
            var totalHeight = window.getComputedStyle(total, null).height;
            DD.css(pro, 'height', totalHeight);
            DD.css(percent, "line-height", totalHeight);
            DD.css(pro, 'border-radius', parseInt(totalHeight) / 1.5 + 'px');
            DD.css(total, 'border-radius', parseInt(totalHeight) / 1.5 + 'px');
            if (data[view.$showItem]) {
                //判断data[view.$dataName]是百分比还是小数
                if (typeof data[view.$dataName] === 'string') {
                    var percentNum = parseInt(data[view.$dataName].replace("%", ""));
                    if (percentNum >= 0 && percentNum <= 100) {
                        DD.css(pro, 'width', data[view.$dataName]);
                        percent.innerText = data[view.$dataName];
                        DD.css(percent, 'left', data[view.$dataName]);
                    } else {
                        alert("百分比取值为1%~100%");
                    }
                } else {
                    //判断小数是否在0~1范围
                    if (data[view.$dataName] >= 0 && data[view.$dataName] <= 1) {
                        DD.css(pro, 'width', data[view.$dataName] * 100 + '%');
                        percent.innerText = data[view.$dataName] * 100 + '%';
                        var percentRight = parseFloat(data[view.$dataName]) * 100 + '%';
                        DD.css(percent, 'left', percentRight);
                    } else if (data[view.$dataName] < 0 || data[view.$dataName] > 1) {
                        alert("请输入正确的proBar值！");
                    }
                }

            } else {
                if (typeof data[view.$dataName] === 'string') {
                    var percentNum = parseInt(data[view.$dataName].replace("%", ""));
                    if (percentNum >= 0 && percentNum <= 100) {
                        DD.css(pro, 'width', data[view.$dataName]);
                    } else {
                        alert("百分比取值为1%~100%");
                    }
                } else {
                    if (data[view.$dataName] >= 0 && data[view.$dataName] <= 1) {
                        DD.css(pro, 'width', data[view.$dataName] * 100 + '%');
                    } else if (data[view.$dataName] < 0 || data[view.$dataName] > 1) {
                        alert("请输入正确的proBar值！");
                    }
                }
            }
        }
    };

    DD.Plugin.create("plugin_11002", plugin_11002);
}());;;(function(){
    plugin_11003=function(){};
    plugin_11003.prototype={
        init:function(view){
            var template=`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="200" height="200" viewBox="0,0,200,200">{{r1}}{{r2}}{{proR}}
                <path d="M 100,100 m0,-{{proR}} a {{proR}},{{proR}},0,1,1,0,{{2*proR}}  a {{proR}},{{proR}},0,1,1,0,{{-2*proR}}" stroke={{process_all_color}} stroke-width="10" style="fill-opacity:0;"/>
                <path d="M 100,100 m0,-{{proR}} a {{proR}},{{proR}},0,1,1,0,{{2*proR}}  a {{proR}},{{proR}},0,1,1,0,{{-2*proR}}" stroke={{process_percent_color}} stroke-width="10" style="fill-opacity:0;stroke-dasharray:{{r1}}px,{{r2}}px;stroke-dashoffset:0px;transition: stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s, stroke-width 0.06s ease 0.3s;stroke-linecap:round"/>
            </svg>`;
    view.innerHTML=template;
        },
        render:function(view){}
    }
    DD.Plugin.create("plugin_11003",plugin_11003);
})();;(function(){
    var plugin_12004=function(){};
    plugin_12004.prototype={
        init:function(view){
            var template=`<div class="nd-plugin-list-1">
    <div x-repeat="list_one" class="list_one">{{value}}</div>
</div>
<div class="nd-plugin-list-2">
    <div x-repeat="list_two" class="list_two">
        <div class="list_i">{{value}}</div>{{name}}
    </div>
</div>
<div class="nd-plugin-list-3">
    <div x-repeat="list_three" class="list_three">
    <div class="list_i">{{value}}</div>
    </div>
</div>`;
            view.innerHTML=template;
            view.$forceRender=true;
        },
        render:function(view){
            var data=view.$getData().data;
            var color=[];
            color.push(data.color_1);
            color.push(data.color_2);
            color.push(data.color_3);
            setTimeout(function(){
                var dom=view.querySelectorAll(".list_one");
                var dom2=view.querySelectorAll(".list_two");
                var dom3=view.querySelectorAll(".list_three");
                dom.forEach(function(i,index,arr){
                    DD.css(i,"background-color",color[index]);
                    new DD.Event({
                        view:i,
                        eventName:'mouseenter',
                        handler:function(e,d,v){
                            var color=DD.css(v,"background-color");
                            color.substr(0,color.length-1);
                            color=color.substr(0,color.length-1)+',0.5)';
                            DD.css(v,"background-color",color);
                          }
                        });
                    new DD.Event({
                        view:i,
                        eventName:'mouseleave',
                        handler:function(e,d,v){
                            var color=DD.css(v,"background-color");
                            color=color.substr(0,color.length-6)+')';
                            DD.css(v,"background-color",color)
                          }
                        });
                    });
                dom2.forEach(function(i,index,arr){
                    DD.css(i,"background-color",color[index]);
                    new DD.Event({
                        view:i,
                        eventName:'mouseenter',
                        handler:function(e,d,v){
                            var color=DD.css(v,"background-color");
                            color.substr(0,color.length-1);
                            color=color.substr(0,color.length-1)+',0.5)';
                            DD.css(v,"background-color",color);
                          }
                        });
                    new DD.Event({
                        view:i,
                        eventName:'mouseleave',
                        handler:function(e,d,v){
                            var color=DD.css(v,"background-color");
                            color=color.substr(0,color.length-6)+')';
                            DD.css(v,"background-color",color)
                          }
                        });
                    });
                dom3.forEach(function(i,index,arr){
                    DD.css(i,"background-color",color[index]);
                    new DD.Event({
                        view:i,
                        eventName:'mouseenter',
                        handler:function(e,d,v){
                            var color=DD.css(v,"background-color");
                            color.substr(0,color.length-1);
                            //0.5这里可以调整哦
                            color=color.substr(0,color.length-1)+',0.5)';
                            DD.css(v,"background-color",color);
                          }
                        });
                    new DD.Event({
                        view:i,
                        eventName:'mouseleave',
                        handler:function(e,d,v){
                            var color=DD.css(v,"background-color");
                            color=color.substr(0,color.length-6)+')';
                            DD.css(v,"background-color",color)
                          }
                        });
                    });

            },0);
        }
    };
    DD.Plugin.create("plugin_12004",plugin_12004);
})();﻿/**
 * switcher
 */

(function () {
    var plugin_12001 = function () {

    };

    plugin_12001.prototype.init = function (view) {
        var me = this;
        var template = `<div class="nd-plugin-switcher-box">
            <div class="nd-plugin-switcher-btn"></div></div>`;
        DD.addClass(view, 'nd-plugin-switcher');
        var data = DD.attr(view, 'dataItem') || 'data';
        //数据项名字
        view.$dataItem = data;
        view.$switchStatus = DD.attr(view, 'switchStatus');
        view.$openColor = DD.attr(view, 'openColor');
        view.$closeColor = DD.attr(view, 'closeColor');
        view.$btnColor = DD.attr(view, 'btnColor');
        //移除showItem
        view.removeAttribute('dataItem');
        //设置innerHTML
        view.innerHTML = template;
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    }

    plugin_12001.prototype.render = function (view) {
        var me = this;
        var data = view.$getData().data;
        if (!data) {
            return;
        }
        var module;
        if (!data.module) {
            module = view.$module;
        } else {
            module = data.module;
        }
        if (!module) {
            return;
        }
        setTimeout(delayRender, 0);

        function delayRender() {
            //初始化设置switcher
            var switcherBox = view.querySelector(".nd-plugin-switcher-box");
            var switcherBtn = view.querySelector(".nd-plugin-switcher-btn");
            DD.css(switcherBtn, 'background-color', data[view.$btnColor]);
            var switcherBoxParent = switcherBox.parentNode.parentNode;
            var switcherBoxWidth = document.defaultView.getComputedStyle(switcherBoxParent, null).width;
            var switcherBoxHeight = document.defaultView.getComputedStyle(switcherBoxParent, null).height;
            DD.css(switcherBox, 'width', switcherBoxWidth);
            DD.css(switcherBox, 'height', switcherBoxHeight);
            DD.css(switcherBtn, 'width', switcherBoxHeight);
            DD.css(switcherBtn, 'height', switcherBoxHeight);
            DD.css(switcherBox, 'border-radius', switcherBoxHeight);
            var slideWidth = parseInt(document.defaultView.getComputedStyle(switcherBox, null).width) - parseInt(document.defaultView.getComputedStyle(switcherBtn, null).width);
            if (data.switcher) {
                DD.css(switcherBox, 'background-color', data[view.$openColor]);
                DD.css(switcherBtn, 'left', slideWidth + 2 + 'px');
            } else {
                DD.css(switcherBox, 'background-color', data[view.$closeColor]);
            }


            //点击事件
            var clickEvent = function (e, d, v) {
                if (data[view.$dataItem]) {
                    data[view.$dataItem] = false;
                    DD.css(switcherBox, 'background-color', data[view.$openColor]);
                    DD.css(switcherBtn, 'left', 0);
                } else {
                    data[view.$dataItem] = true;
                    DD.css(switcherBox, 'background-color', data[view.$closeColor]);
                    DD.css(switcherBtn, 'left', slideWidth + 2 + 'px');
                }
                DD.css(switcherBox, 'transition-property', 'border');
                DD.css(switcherBox, 'transition-duration', '400ms');
                DD.css(switcherBox, '-webkit-transition-property', 'border');
                DD.css(switcherBox, '-webkit-transition-duration', '400ms');
                DD.css(switcherBox, 'transition-property', 'box-shadow');
                DD.css(switcherBox, 'transition-duration', '400ms');
                DD.css(switcherBox, '-webkit-transition-property', 'box-shadow');
                DD.css(switcherBox, '-webkit-transition-duration', '400ms');
                DD.css(switcherBox, 'transition-property', 'background-color');
                DD.css(switcherBox, 'transition-duration', '1200ms');
                DD.css(switcherBox, '-webkit-transition-property', 'background-color');
                DD.css(switcherBox, '-webkit-transition-duration', '1200ms');

                DD.css(switcherBtn, 'transition-property', 'left');
                DD.css(switcherBtn, 'transition-duration', '500ms');
                DD.css(switcherBtn, '-webkit-transition-property', 'left');
                DD.css(switcherBtn, '-webkit-transition-duration', '500ms');
                DD.css(switcherBtn, '-moz-transition-property', 'left');
                DD.css(switcherBtn, '-moz-transition-duration', '500ms');
                DD.css(switcherBtn, '-o-transition-property', 'left');
                DD.css(switcherBtn, '-o-transition-duration', '500ms');
                view.$forceRender = true;
            }

            //添加按钮事件
            new DD.Event({
                eventName: 'click',
                view: view,
                handler: clickEvent
            });
        }
    }

    DD.Plugin.create("plugin_12001", plugin_12001);
}());;/**
 * NEON TEXT TOGGLE
 */

(function () {
    var plugin_12002 = function () {

    };
    plugin_12002.prototype.init = function (view) {
        var me = this;
        var template =
            `<div class='nd-plugin-switcher-box'><div class='nd-plugin-switcher' id='on'>ON</div><div class='nd-plugin-switcher' id='off'>OFF</div></div>`;
        var dataValue = DD.attr(view, 'dataValue');
        view.$dataValue = dataValue;
        view.$bgColor = DD.attr(view, 'bgColor');
        view.$shadowColor = DD.attr(view, 'shadowColor');
        view.$btnColor = DD.attr(view, 'btnColor');
        view.removeAttribute('dataValue');
        view.innerHTML = template;
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    };
    plugin_12002.prototype.render = function (view) {
        var me = this;
        var data = view.$getData().data;
        if (!data) {
            return;
        }
        var module;
        if (!data.module) {
            module = view.$module;
        } else {
            module = data.module;
        }
        if (!module) {
            return;
        }
        setTimeout(function () {
            var data = view.$getData().data;
            var color_1 = data[view.$bgColor];
            var color_2 = data[view.$shadowColor];
            var color_3 = data[view.$shadowColor];
            var color_4 = data[view.$btnColor];
            var switcherON = view.querySelector("#on");
            var switcherOFF = view.querySelector("#off");
            var switcherBox = view.querySelector('.nd-plugin-switcher-box');
            DD.css(switcherBox, 'background', color_1);
            DD.css(switcherBox, 'padding', '0 20px');
            DD.css(switcherBox, 'width', '400px');
            DD.css(switcherBox, 'cursor', 'pointer');
            DD.css(switcherON, 'display', 'inline-block');
            DD.css(switcherON, 'transition', '220ms ease-in-out');
            DD.css(switcherOFF, 'transition', '220ms ease-in-out');
            DD.css(switcherON, 'margin-right', '20px');
            DD.css(switcherOFF, 'display', 'inline-block');
            DD.css(switcherBox, 'font-size', '100px');
            DD.css(switcherBox, 'color', color_2);
            DD.css(switcherBox, 'text-shadow', '0 0 90px transparent');
            DD.css(view, 'user-select', 'none');
            if (data.switcher) {
                DD.css(switcherOFF, 'color', color_1);
                DD.css(switcherON, 'color', color_4);
                DD.css(switcherON, 'text-shadow', '0 0 5px #fff,0 0 10px #fff,0 0 20px ' + color_2 + ',0 0 35px ' + color_2 + ',0 0 40px ' + color_2 + ',0 0 50px ' + color_2);
                DD.css(switcherOFF, 'text-shadow', 'none');
            } else {
                DD.css(switcherOFF, 'color', color_4);
                DD.css(switcherON, 'color', color_1);
                DD.css(switcherOFF, 'text-shadow', '0 0 5px #fff,0 0 10px #fff,0 0 20px ' + color_3 + ',0 0 35px ' + color_3 + ',0 0 40px ' + color_3 + ',0 0 50px ' + color_3);
                DD.css(switcherON, 'text-shadow', 'none');
            }
            var clickEvent = function (e, d, v) {
                if (data[view.$dataValue]) {
                    data[view.$dataValue] = false;
                    DD.css(switcherOFF, 'color', color_4);
                    DD.css(switcherON, 'color', color_1);
                    DD.css(switcherOFF, 'text-shadow', '0 0 5px #fff,0 0 10px #fff,0 0 20px ' + color_3 + ',0 0 35px ' + color_3 + ',0 0 40px ' + color_3 + ',0 0 50px ' + color_3);
                    DD.css(switcherON, 'text-shadow', 'none');

                } else {
                    data[view.$dataValue] = true;
                    DD.css(switcherOFF, 'color', color_1);
                    DD.css(switcherON, 'color', color_4);
                    DD.css(switcherON, 'text-shadow', '0 0 5px #fff,0 0 10px #fff,0 0 20px ' + color_2 + ',0 0 35px ' + color_2 + ',0 0 40px ' + color_2 + ',0 0 50px ' + color_2);
                    DD.css(switcherOFF, 'text-shadow', 'none');
                }
                view.$forceRender = true;
            };
            new DD.Event({
                eventName: 'click',
                view: view,
                handler: clickEvent
            });
        }, 0);
    };

    DD.Plugin.create('plugin_12002', plugin_12002);
}());;/**
 * 3D switcher
 */

(function(){

    var plugin_12003 = function() {};

    plugin_12003.prototype.init = function(view) {
        var me = this;
        var dataValue = DD.attr(view, 'dataValue');
        view.$dataValue = dataValue;
        view.removeAttribute('dataValue');
        var template = `<div class="nd-plugin-switcher-box" style="width{{width_d}}px"></div>`;
        view.innerHTML = template;
        view.$openColor = DD.attr(view, 'openColor');
        view.$closeColor = DD.attr(view, 'closeColor');
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    };
    plugin_12003.prototype.render = function(view) {
        var me = this;
        var data = view.$getData().data;
        if (!data) {
            return;
        }
        var module;
        if (!data.module) {
            module = view.$module;
        } else {
            module = data.module;
        }
        if (!module) {
            return;
        }
        setTimeout(delayRender, 0);

        function delayRender() {
            var switcherBox = view.querySelector(".nd-plugin-switcher-box");
            var switcherBtn = view.querySelector(".nd-plugin-switcher-btn");
            var check = view.querySelector(".check");
            var switcherBoxParent = switcherBox.parentNode.parentNode;
            var switcherBoxWidth = document.defaultView.getComputedStyle(switcherBoxParent, null).width;
            var switcherBoxHeight = document.defaultView.getComputedStyle(switcherBoxParent, null).height;
            DD.css(switcherBox, 'width', switcherBoxWidth);
            DD.css(switcherBox, 'height', switcherBoxHeight);
            DD.css(switcherBox, 'border-radius', switcherBoxHeight);
            var color1 = data[view.$closeColor];
            var color2 = data[view.$openColor];
            var box_width = data.width_d / 10;
            document.styleSheets[0].addRule('.nd-plugin-switcher-box::before', 'box-shadow:inset 0px 0px 0px ' + box_width / 2 + 'px ' + color1 + ',inset 0px 0px 0px 1000px #fff');
            document.styleSheets[0].addRule('.nd-plugin-switcher-box::after', 'background-color:' + color1);
            document.styleSheets[0].addRule('.checked::before', 'box-shadow:inset 0px 0px 0px ' + box_width / 2 + 'px ' + color2 + ',inset 0px 0px 0px 1000px #fff');
            document.styleSheets[0].addRule('.checked::after', 'background-color:' + color2);
            document.styleSheets[0].addRule('.checked::after', 'color:blue');
            if (data.switcher) {
                DD.css(switcherBox, 'box-shadow', '0 2px 5px 0px grey, 0 15px 20px 0px transparent');
                DD.addClass(switcherBox, 'checked');
            } else {
                DD.css(switcherBox, 'box-shadow', '0 5px 10px 0px #333, 0 15px 20px 0px #cccccc');
                DD.removeClass(switcherBox, 'checked');
            }
            DD.css(switcherBox, 'transition-property', 'box-shadow');
            DD.css(switcherBox, 'position', 'relative');
            DD.css(switcherBox, 'cursor', 'pointer');
            DD.css(switcherBox, 'transition', 'all 250ms ease-in');
            DD.css(switcherBox, '-webkit-transition-property', 'box-shadow');
            DD.css(switcherBox, '-webkit-transition', 'all 250ms ease-in');
            var clickEvent = function(e, d, v) {
                if (data[view.$dataValue]) {
                    data[view.$dataValue] = false;
                    DD.css(switcherBox, 'box-shadow', '0 2px 5px 0px grey, 0 15px 20px 0px transparent');
                    DD.removeClass(switcherBox, 'checked');
                } else {
                    data[view.$dataValue] = true;
                    DD.addClass(switcherBox, 'checked');
                    DD.css(switcherBox, 'box-shadow', '0 5px 10px 0px #333, 0 15px 20px 0px #cccccc');
                }
                view.$forceRender = true;
            };
            new DD.Event({
                eventName: 'click',
                view: view,
                handler: clickEvent
            });
        }
    }
    DD.Plugin.create('plugin_12003',plugin_12003);
}());;;(function() {
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
})();;;
(function() {
    var plugin_14001 = function(view) {
        view.$forceRender=true;

    };
    plugin_14001.prototype = {
        init: function(view) {},
        render: function(view) {
            var me = this;
            view.$getData().data.one=0;
            setTimeout(function(){
            me.datas = view.$getData().data;
            me.create = function(arr) {
                var s = "";
                var tem = `<div class="item" id="{{txt}}" x-repeat="arr" x-show="show">
                   <div class="ct">
                          <div   e-click="check" x-class="{'check':'click'}" class="input"></div>
                          <span class="txt" e-click="show">{{txt}}</span>
                   </div>\r\n`;
                arr.forEach(function(i, index, a) {
                    if (i.arr) {
                        s += me.create(i.arr);
                    }
                    tem += s;
                    s = "";
                });
                return tem + `</div>\r\n`;
            };
            var str = me.create(me.datas.arr);
            view.innerHTML = str;
            DD.Compiler.compile(view, view.$module);},0);
        }
    };
    DD.Plugin.create("plugin_14001", plugin_14001);
})();;