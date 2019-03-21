;
(() => {
	class Magn {
		constructor() {
			let me = this;
		}
		init(view) {
			let template = `
<div class="wrap">
	<div class="img">
		<img src="{{src}}" >
	</div>
	<ul >
	   <li x-repeat="imgs">
	   <img src="{{src}}" e-click="changeSrc" >
	   </li>
	</ul>
</div>
<div class="leftWrap">
	<div class="magnWrap leftwrap" >
    <div class="eventMagn" >
		<img src="{{src}}" class="letfImage" >
	</div>

	</div>
	<div class="mask"></div>
</div>
<div class="eventWrap"></div>
<div class="rightWrap" x-model="right" style="top:{{top}}px;left:{{left}}px;width:{{wrap}}px;height:{{wrap}}px;opacity:{{opacity}}">
   <div class="imgWrap" >
   	<img src="{{src}}" class="rightImage">
   </div>
</div>`;
			view.innerHTML = template;
		}
		render(view) {
			let me = this;
			me.data = view.$getData().data;
			setTimeout(() => {
				me.startInit(view);
			}, 0)
		}
		startInit(view) {
			let me = this;
			me.mask = view.querySelector(".mask");
			me.leftcalc = view.querySelector(".leftWrap");
			me.eventWrap = view.querySelector(".eventWrap");
			me.leftImage = view.querySelector(".letfImage");
			me.letfWrap = view.querySelector(".leftwrap");
			me.rightImage = view.querySelector(".rightImage");
			me.rightWrap = view.querySelector(".rightWrap");
			me.initCss()
			me.changeCss();
		}
		initCss() {
			let me = this;
			let left = me.data.left;
			let right = me.data.right;
			let per = me.data.per;
			let x = parseInt(DD.css(me.leftcalc, "width"));
			left.img = x / per;
			left.wrap = x;
			right.fixWidth = x;
			right.img = x * per;
			right.wrap = x;
			right.left = x + 20;
			right.top = 0;
			right.fixLeft = x + 20;
		}
		changeCss() {
			let me = this;
			let x = me.data.x;
			let y = me.data.y;
			let per = me.data.per;
			let change = me.data.left.wrap / me.data.right.img;
			let left = x * per;
			let top = y * per;
			DD.css(me.letfWrap, "left", x + 'px');
			DD.css(me.letfWrap, "top", y + 'px');
			DD.css(me.leftImage, "left", -1 * x + 'px');
			DD.css(me.leftImage, "top", -1 * y + 'px');
			DD.css(me.rightImage, "left", -1 * left + 'px');
			DD.css(me.rightImage, "top", -1 * top + 'px');
			if (me.data.init)
				return;
			me.data.init = true;
			me.flag = true;
			me.funcStack = [];
			me.moveX = me.data.right.left - me.data.left.img;
			me.moveY = me.data.left.img / 2;
			console.log(me.moveX);
			new DD.Event({
				view: me.eventWrap,
				eventName: "mousemove",
				handler(e, d, v) {
					let temX = e.offsetX;
					let temY = e.offsetY;
					me.getXY(temX, temY);
				}
			});
			new DD.Event({
				view: me.eventWrap,
				eventName: "mouseenter",
				handler: () => {
					me.startEnter();
				}
			});
			new DD.Event({
				view: me.eventWrap,
				eventName: "mouseleave",
				handler: () => {
					me.startLeave()
				}
			});
			new DD.Event({
				view: me.eventWrap,
				eventName: "touchstart",
				handler(e, d, v) {
					me.startEnter();
				}
			});
			new DD.Event({
				view: me.eventWrap,
				eventName: "touchmove",
				handler(e, d, v) {
					let t = e.touches[0]
					me.getXY(t.clientX, t.clientY)
				}
			});
			new DD.Event({
				view: me.eventWrap,
				eventName: "touchend",
				handler(e, d, v) {
					me.startLeave()
				}
			});
		}
		startEnter() {
			let me = this;
			if (!me.flag) {
				me.funcStack.push(() => {
					me.Leave(0);
				});
				return;
			}
			me.Leave(0);
		}
		startLeave() {
			let me = this;
			if (!me.flag) {
				me.funcStack.push(() => {
					me.Enter(me.moveX);
				});
				return;
			}
			me.Enter(me.moveX);
		}
		Enter(d) {
			let me = this;
			let len = me.data.right.fixWidth;
			let all = me.data.right.fixLeft - me.data.left.img;
			me.flag = false;
			if (d > 0) {
				d -= 4;
				if (d <= 0) {
					d = 0;
				}
				me.data.right.top = (1 - d / all) * len / 2;
				me.data.right.left = d / all * all + me.data.left.img;
				me.data.right.wrap = d / all * len;
				me.data.right.opacity = d / all;
				window.requestAnimationFrame(() => {
					me.Enter(d);
				});
			} else {
				d = 0;
				me.flag = true;
				me.letfWrap.style.display = "none";
				me.mask.style.display = "none";
				// me.data.show=false;
				me.emit();
			}
		}
		Leave(d) {
			let me = this;
			let len = me.data.right.fixWidth;
			let all = me.data.right.fixLeft - me.data.left.img;
			me.flag = false;
			if (d < all) {
				d += 4;
				if (d >= all) {
					d = all;
				}
				me.data.right.top = (1 - d / all) * len / 2;
				me.data.right.left = d / all * all + me.data.left.img;
				me.data.right.wrap = d / all * len;
				me.data.right.opacity = d / all;
				window.requestAnimationFrame(() => {
					me.Leave(d);
				});
			} else {
				d = all;
				me.flag = true;
				me.letfWrap.style.display = "block";
				me.mask.style.display = "block";
				// me.data.show=true;
				me.emit();
			}
		}
		getXY(x, y) {
			let me = this;
			let ox, oy;
			let img = me.data.left.img;
			let wrap = me.data.left.wrap;
			ox = x - img / 2;
			oy = y - img / 2;
			if (x < img / 2) {
				ox = 0;
			}
			if (x > wrap - img / 2) {
				ox = wrap - img;
			}
			if (y < img / 2) {
				oy = 0;
			}
			if (y > wrap - img / 2) {
				oy = wrap - img;
			}
			me.data.x = ox;
			me.data.y = oy;
		}
		emit() {
			let me = this;
			if (me.funcStack.length) {
				window.requestAnimationFrame(() => {
					while (me.funcStack.length) {
						let f = me.funcStack.pop();
						f();
					}
				});
			}
		}
	}
	DD.Plugin.create("Magn", Magn);
	DD.createModule({
		el: ".el-model",
		require:[{type:"js",css:""}]
		data: {
			magn: {
				init: false,
				imgs: [{
					"src": "imgs/a1.png"
				}, {
					"src": "imgs/a2.png"
				}, {
					"src": "imgs/a3.png"
				}, {
					"src": "imgs/a4.png"
				}],
				"src": "imgs/a1.png",
				show:false,
				left: {
					img: 150,
					wrap: 300,
				},
				right: {
					opacity: 1,
					fixWidth: 300,
					img: 600,
					wrap: 300,
					left: 320,
					top: 0,
					fixLeft: 320,
					"src": "imgs/a1.png",
				},
				x: 0,
				y: 0,
				//只能初始化时修改
				per: 2
			}
		},
		onBeforeFirstRender() {},
		methods: {
			changeSrc(e, d, v) {
				let me = this;
				me.data.magn["src"] = d["src"],
					me.data.magn.right["src"] = d["src"]
			}
		}
	});
})()