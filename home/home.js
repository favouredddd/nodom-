;
(function() {
    var partical = function(wrap) {
        var me = this;
        me.init(wrap);
    }
    partical.prototype = {
        init(wrap) {
            var me = this;
            me.wrap = wrap;
            me.canvas = me.wrap.querySelector("#canvas");
            me.config();
            me.img = new Image();
            me.partical = [];
            me.img.onload = function() {
                me.offsetX = (me.width - me.img.width) / 2;
                me.offsetY = (me.height - me.img.height) / 2;
                me.start();
            }
            me.img.src = "home.png";
        },
        config() {
            var me = this;
            me.height = window.innerHeight - 80;
            me.width = window.innerWidth;
            me.size = me.width > 500 ? 4 : 2;
            me.wrap.style.width = me.width + "px";
            me.wrap.style.height = me.height + "px";
            me.wrap.style.position = "relative";
            me.wrap.style.overflow = 'hidden';
            me.canvas.setAttribute("width", me.width);
            me.canvas.setAttribute("height", me.height);
            me.ctx = me.canvas.getContext("2d");
            me.jump = 4;
            me.count = 0;
        },
        start() {
            var me = this;
            me.getRect();
        },
        getRect() {
            var me = this;
            me.ctx.drawImage(me.img, 0, 0, me.img.width, me.img.height, 0, 0, me.img.width, me.img.height);
            // return ;
            var data = me.ctx.getImageData(0, 0, me.img.width, me.img.height).data;
            for (var i = 0; i < me.img.height; i += me.jump) {
                for (var j = 0; j < me.img.width; j += me.jump) {
                    var index = i * me.img.width * 4 + j * 4;
                    if (data[index] === 0 && data[index + 1] === 0 && data[index + 2] === 0) {
                        continue;
                    }
                    var color = `rgba(${data[index]},${data[index+1]},${data[index+2]},${data[index+3]})`
                    me.birth( j, i, color);
                }
            }
            me.particalLen = me.partical.length;
            me.draw();
        },
        birth(x, y, color) {
            var me = this;
            var dwindex = ~~(Math.random() * 100);
            var speed = Math.random() * Math.sqrt(dwindex) * me.width / 500;
            if (speed < 2) {
                speed = 2 + Math.random() * 4;
            }
            if (speed > 6) {
                speed = 6;
            }
            var sx = me.width / 2 + (1 - Math.random(2)) * 10;
            var sy = me.height;
            me.partical.push({
                x: sx,
                y: sy,
                endx: x + me.offsetX,
                endy: y + me.offsetY,
                color: color,
                Sy: speed,
                Sx: speed * ((me.offsetX + x) - sx) / sy,
                count: Math.random() * 100 | 0,
                down: false,
                finish: false
            });
        },
        draw() {
            var me = this;
            me.finish = 0;
            me.ctx.clearRect(0, 0, me.width, me.height);
            me.partical.forEach(i => {
                if (i.count > me.count)
                    return;
                if (i.finish) {
                    i.x=i.endx;
                    i.y=i.endy;
                    me.drawItem(i);
                    me.finish += 1;
                    return;
                }
                if (!i.down) {
                    i.y -= i.Sy;
                    i.x += i.Sx;
                    me.drawItem(i)
                    if (i.y <= 0) {
                        i.down = true;
                    }
                    return;
                } else {
                    i.x =i.endx;
                    i.y += i.Sy;
                    me.drawItem(i)
                    if (i.y >= i.endy) {
                        i.finish = true;
                    }
                }
            });
            me.count += 1;
            if (me.finish === me.particalLen) {
                me.overDraw();
            } else {
                window.requestAnimationFrame(me.draw.bind(me));
            }
        },
        drawItem(i) {
            var me = this;
            me.ctx.fillStyle = i.color;
            me.ctx.fillRect(i.x-(me.size/2), i.y-(me.size/2), me.size, me.size);
        },
        overDraw() {
            var me = this;
            me.ctx.clearRect(0,0,me.width,me.height)
            me.ctx.beginPath();
            me.ctx.drawImage(me.img, 0, 0, me.img.width, me.img.height, me.offsetX, me.offsetY, me.img.width, me.img.height);
            me.ctx.closePath();
        }
    }
    new partical(document.querySelector(".canvas"));
})()