;
(() => {
    var src = [
        { url: "imgs/banner001.jpg" },
        { url: "imgs/banner002.jpg" },
        { url: "imgs/banner003.jpg" },
        { url: "imgs/banner004.jpg" },
        { url: "imgs/banner005.jpg" }
    ];
    var img = [];
    var getImg = (index) => {
        return new Promise((r1, r2) => {
            var imgs = new Image();
            imgs.onload = () => {
                img[index] = imgs;
                r1();
            }
            imgs.src = src[index].url
        });
    };
    DD.createModule({
        el: ".el-pluagin",
        require: [{ type: 'css', url: "carousel.css" }],
        data: {
            carousel: {
                src1: "imgs/banner001.jpg",
                imgs: [
                    { url: "imgs/banner001.jpg" },
                    { url: "imgs/banner002.jpg" },
                    { url: "imgs/banner003.jpg" },
                    { url: "imgs/banner004.jpg" },
                    { url: "imgs/banner005.jpg" },
                ],
                index: 0,
                flag: true,
                d: 0,
                left: 0,
                speed: 0.4
            }
        },
        methods: {
            turn(e) {
                var me = this.data.carousel;
                var key = parseInt(e.target.getAttribute("index"));
                if (key === undefined || key === me.index) {
                    return;
                }
                if (!me.flag)
                    return;
                me.flag = false;
                clearInterval(me.timer);
                if (key > me.index) {
                    this.module.methodFactory.methods.move.call(this, true, key - 1);
                } else {
                    this.module.methodFactory.methods.move.call(this, false, key + 1);
                }
                this.module.methodFactory.methods.setTime.call(this);
            },
            create() {
                var me = this;
                me.data.carousel.tem = img[1];
                me.data.carousel.span = [...document.querySelector(".el-carousel").querySelectorAll("span")]
                me.data.carousel.span[0].classList.add("check");
                me.module.methodFactory.methods.setTime.call(me);
                window.addEventListener("visibilitychange", () => {
                    if (document.hidden) { 
                    	clearInterval(me.data.carousel.timer); } else {
                        me.module.methodFactory.methods.setTime.call(me);
                    }
                }, false);
            },
            setTime() {
                var me = this;
                me.data.carousel.flag = true;
                me.data.carousel.timer = setInterval(me.module.methodFactory.methods.move.bind(me, me.data.carousel.left), 3000);
            },
            move(flag = false, index) {
                var me = this.data.carousel;
                if (index || index === 0) {
                    me.index = index;
                }
                if (flag) {
                    me.d = 0;
                    me.tem = img[(me.index + 1) % img.length];
                    setTimeout(()=>{me.dom.appendChild(me.tem);
                    this.module.methodFactory.methods.moveLeft.call(this, 0);},0);
                    return;
                } else {
                    me.tem = img[(me.index - 1 + src.length) % src.length]
                    setTimeout(()=>{
                    me.dom.insertBefore(me.tem, me.img);
                    me.d = -18;
                    this.module.methodFactory.methods.moveRight.call(this, -18);},0);
                    return;
                }
            },
            moveLeft(d) {
                var me = this.data.carousel;
                me.flag = false;
                if (d > -18) {
                    me.d -= me.speed;
                    d -= me.speed;
                    window.requestAnimationFrame(this.module.methodFactory.methods.moveLeft.bind(this, me.d));
                } else {
                	//防止闪烁
                    setTimeout(() => {
                        me.index = (me.index + 1) % src.length;
                        this.module.methodFactory.methods.updateSpan.call(this);
                    }, 0);
                }
            },
            moveRight(d) {
                var me = this.data.carousel;
                me.flag = false;
                if (d < 0) {
                    me.d += me.speed;
                    d += me.speed;
                    window.requestAnimationFrame(this.module.methodFactory.methods.moveRight.bind(this, me.d));
                } else {
                    me.index = (me.index - 1 + src.length) % src.length;
                    this.module.methodFactory.methods.updateSpan.call(this);
                }
            },
            updateSpan() {
                var me = this.data.carousel;
                me.span.forEach(i => {
                    i.classList.remove("check");
                });
                me.span[me.index].classList.add("check");
                me.dom.removeChild(me.img);
                me.img = me.tem;
                me.d = 0;
                me.flag = true;
            },
            goLeft() {
                var me = this.data.carousel;
                if (!me.flag)
                    return;
                clearInterval(me.timer);
                me.flag = false;
                this.module.methodFactory.methods.move.call(this, false);
                this.module.methodFactory.methods.setTime.call(this);
            },
            goRight() {
                var me = this.data.carousel;
                if (!me.flag)
                    return;
                clearInterval(me.timer);
                me.flag = false;
                this.module.methodFactory.methods.move.call(this, true);
                this.module.methodFactory.methods.setTime.call(this);
            }
        },
        onFirstRender() {
            var me = this;
            Promise.all(src.map((i, index) => {
                return getImg(index);
            })).then(() => {
                me.data.carousel.srcs = img;
                me.data.carousel.img = document.querySelector(".myCarousel");
                me.data.carousel.dom = document.querySelector(".wrap");
                me.module.methodFactory.methods.create.call(me);
            })
        }
    });
})()