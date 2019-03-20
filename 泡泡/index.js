;
(function() {
    var model = {
        partical: [],
        width: undefined,
        height: undefined,
        dom: null,
        ctx: null,
        timer: null,
        init: function() {
            var me = this;
            clearInterval(me.timer);
            me.partical=[];
            me.width = window.innerWidth;
            me.height = window.innerHeight;
            me.dom = document.querySelector(".canvas");
            me.ctx = me.dom.getContext('2d');
            me.set();
            me.getData();
            me.updata();
        },
        set: function() {
            var me = this;
            me.dom.setAttribute("width", me.width);
            me.dom.setAttribute("height", me.height);
        },
        getData: function() {
            var me = this;
            for (var i = 0; i < 50; i++) {
                me.partical.push({
                    x: me.width / 2,
                    y: me.height / 2,
                    r: 10,
                    sx: (Math.random() * 100 * me.getDirect()) / 10 + 1 | 0,
                    sy: (Math.random() * 100 * me.getDirect()) / 10 + 1 | 0,
                    r1: Math.random() * 255 | 0,
                    g: Math.random() * 255 | 0,
                    b: Math.random() * 255 | 0,
                });
            }
        },
        updata: function() {
            var me = this;
            me.timer = setInterval(me.draw.bind(me), 20);
        },
        draw: function() {
            var me = this;
            me.ctx.clearRect(0, 0, me.width, me.height);
            me.partical.forEach(i => {
                i.x += i.sx;
                i.y += i.sy;
                i.sx *= i.x > me.width || i.x < 0 ? -1 : 1;
                i.sy *= i.y > me.height || i.y < 0 ? -1 : 1;
                i.sx += Math.random() * me.getDirect() * 0.1;
                i.sy += Math.random() * me.getDirect() * 0.1;
                me.ctx.beginPath();
                me.ctx.fillStyle = "rgb(" + i.r1 + "," + i.g + "," + i.b + ")";
                me.ctx.arc(i.x, i.y, i.r, 0, 360, false);
                me.ctx.fill();
                me.ctx.closePath();
            });
        },
        getDirect: function() {
            var me = this;
            var t = Math.random() * 1000;
            return t > 500 ? 1 : -1;
        }
    };
    model.init();
    window.onresize =model.init.bind(model);
    window.model = model;
})()