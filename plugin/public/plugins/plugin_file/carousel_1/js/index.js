
//普通轮播图
;
(function() {
    var Carousel = function() {};
    Carousel.prototype = {
        init: function(view) {
            var template = `<div class='content' x-model='carousel_data.ca_photo' style="width:{{width}}px;height:{{width/2}}px">
                                <div class='show' x-class="{'translate':'translate'}">
                                    <img class='imgs' x-repeat='imgs' src="{{url}}">
                                </div>
                                <div class='span'>
                                    <span x-repeat='span'  x-class="{'blight':'blight'}" class='photo-span' x-show="$index!==0" style="width:{{width}}px;height:{{height}}px"></span>
                                </div>
                               <div class="left"><div class="img-content"></div></div>
                              <div class="right"><div class="img-content"></div></div>
                            </div>`;
            view.$dataItem = DD.attr(view, "dataName");
            view.removeAttribute("dataName");
            view.innerHTML = template;
        },
        render: function(view) {
            var me = this;
            me.data = view.$getData().data.carousel_data.ca_photo.imgs;
            //me.check_color=view.$getData().data.ca_photo;
            me.drawimage = function() {
                var me = this;
                DD.css(me.show, 'transform', 'translateX(' + me.translate + 'px)');
            };
            me.removespan = function() {
                var me = this;
                me.span.forEach(function(item) {
                    DD.removeClass(item, 'is_check');
                });
            }
            me.addspan = function() {
                if (me.span[me.index]) {
                    if (me.index === 0)
                        DD.addClass(me.span[me.data.length - 1], 'is_check');
                    else {
                        DD.addClass(me.span[me.index], 'is_check');
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
                clearInterval(window.timer_1);
                var my_time = 3000;
                if (window.data && window.data.time) {
                    my_time = window.data.time;
                }
                window.timer_1 = setInterval(function() {
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
                //true为左边滑动
                me.flag = false;
                if(view.$getData().data.carousel_data.small_div.right){
                    me.flag=false
                }
                DD.css(me.show, 'width', me.imgwidth * me.data.length + 'px');
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
                eventName: 'swipeleft',
                view: view,
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        clearInterval(window.timer_1);
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
                        clearInterval(window.timer_1);
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
                        clearInterval(window.timer_1);
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
                        clearInterval(window.timer_1);
                        me.doself(1);
                        me.updata();
                    }
                }
            });
        }
    };
    DD.Plugin.create('carousel', Carousel);
    DD.createModule({
        el: '.el-photo',
        data: {
            carousel_data:{
                ca_photo: {
                    width: '',
                    check_color: '#ff6800',
                    translate: false,
                    imgs: [{ url: "img/1.jpg" }, { url: "img/2.jpg" }, { url: "img/3.jpg" }, { url: "img/4.jpg" }, { url: "img/5.jpg" }, { url: "img/1.jpg" }],
                    span: [{ blight: false, width: '', height: '' }, { blight: false, width: '', height: '' }, { blight: false, width: '', height: '' }, { blight: false, width: '', height: '' }, { blight: false, width: '', height: '' }, { blight: false, width: '', height: '' }],
                },
                small_div: {
                    check: '#ff6800',
                    no_check: '#ffffff',
                    width: '8',
                    height: '8',
                    time: 3,
                    left:false
                }
            }
        },
        onBeforeFirstRender:function(){
            var me=this;
            if(window.data){
                if(window.data.left){
                    me.data.carousel_data.small_div.left = window.data.left;
                }

                if(window.data.check_color) {
                    me.data.carousel_data.small_div.check_color = window.data.check_color;
                }

                if(window.data.no_check_color) {
                    me.data.carousel_data.small_div.no_check_color = window.data.no_check_color;
                }

                if(window.data.width) {
                    me.data.carousel_data.small_div.width = window.data.width;
                }
                if(window.data.height) {
                    me.data.carousel_data.small_div.height = window.data.height;
                }

            }
        }
    })
})()