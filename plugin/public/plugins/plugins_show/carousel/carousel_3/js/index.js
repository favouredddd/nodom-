;
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
                                <span x-repeat='imgs' class='item-spans'></span>
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
                me.span = view.querySelectorAll('.item-spans');
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
})()