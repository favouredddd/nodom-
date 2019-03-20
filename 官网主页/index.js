//from雷创科技
//write in 2018 6 22
window.data={
    //粒子碰撞后回来的速度
    speed:0.04,
    //图片的src属性
    src:'home.png',
    //填充每一个小粒子的长和宽
    size:'',
    //粒子上升的速度如[2,4]是一个数组 只含2项目 第一个为最小速度 第二个为最大速度 带线啊哦
    item_speed:[],
};
;(function() {
    var partical = {
        canvasct:document.querySelector('.canvasct'),
        canvas1: document.querySelector('.canvas'),
        canvas2: document.createElement('canvas'),
        partical: [],
        partical_len: '',
        height: '',
        width: '',
        offset_w: '',
        offset_h: '',
        loaded: false,
        src: 'home.png',
        img: new Image(),
        count1: 0,
        size: 4,
        speed:'',
        item_speed:'',
        init: function() {
            var me = this;
            me.css_set();
            me.config();
            me.canvas1.width = me.width;
            me.canvas1.height = me.height;
            me.canvas1 = me.canvas1.getContext('2d');
            if (!me.loaded) {
                var me = this;
                me.img.src = me.src;
                me.img.onload = function() {
                    me.offset_h = (me.height - me.img.height) / 2;
                    me.offset_w = (me.width - me.img.width) / 2;
                    me.getpoint();
                }
                me.loaded = false;
            } else {
                me.overdraw();
            }
        },
        //配置一些在插件中更改的样式
        config:function(){
            var me=this;
            me.src=window.data.src||'home.png';
            me.size=window.data.size||4;
            me.speed=window.data.speed||0.02;
            if(window.data&&window.data.item_speed){
                window.data.item_speed.sort(function(a,b){return a-b});
            }
            me.item_speed=window.data.item_speed||[2,6];
        },
        overdraw: function() {
            var me = this;
            me.canvas1.clearRect(0, 0, me.width, me.height);
            me.canvas1.drawImage(me.img, 0, 0, me.img.width, me.img.height, me.offset_w, me.offset_h, me.img.width, me.img.height);
        },
        css_set: function() {
            var me = this;
            me.height = window.innerWidth > 1000 ? window.innerHeight - 80 : window.innerHeight - 80;
            me.width = window.innerWidth;
            me.canvasct.style.height=me.height+'px';
            me.canvasct.style.width=me.width+'px';
        },
        getpoint: function() {
            var me = this;
            me.canvas2 = document.createElement('canvas');
            me.canvas2.height = me.height;
            me.canvas2.width = me.width;
            me.canvas2 = me.canvas2.getContext('2d');
            //可选2个参数
            me.canvas2.drawImage(me.img, 0, 0, me.img.width, me.img.height, 0, 0, me.img.width, me.img.height);
            var data = me.canvas2.getImageData(0, 0, me.img.width, me.img.height).data;
            var jump = 4;
            for (var i = 0; i < me.img.width; i += jump) {
                for (var j = 0; j < me.img.height; j += jump) {
                    var index = (i * me.img.width) * 4 + j * 4;
                    if (data[index] === 0 && data[index + 1] === 0 && data[index + 2] === 0) {
                        continue;
                    }
                    var color = 'rgba(' + data[index] + ',' + data[index + 1] + ',' + data[index + 2] + ',' + data[index + 3] + ')';
                    me.birthpatical(i, j, color);
                }
            }
            me.partical_len = me.partical.length;
            me.drawpatical();
            console.log(me.partical.len);
        },
        birthpatical: function(i, j, c) {
            var me = this;
            //x起始的x坐标
            var y = me.height;
            var x = me.width / 2 - Math.random() * 20 - 10;
            //取整开始的粒子不能太整齐
            var dwindex = ~~(Math.random() * 100);
            //粒子的初始的速度
            var speed = Math.random() * Math.sqrt(dwindex) * me.width / 500;
            if (speed < 2) {
                speed = 2 + Math.random() * 4;
            }
            if (speed > 6) {
                speed = 6;
            }
            me.partical.push({
                top: 0,
                x: x,
                y: y,
                endx: me.offset_w + j,
                endy: me.offset_h + i,
                speed: speed,
                //y和x方向的比值系数正负代表方向
                dx: y / ((me.offset_w + j) - x),
                //速度变化的值
                dspe: Math.random(),
                //防止太过整齐
                dwindex: dwindex,
                //颜色
                color: c,
                //先上去再下来
                down: false,
                //完成的标记位
                finished: false
            });
        },
        drawpatical: function() {
            var me = this;
            me.canvas1.clearRect(0, 0, me.width, me.height);
            me.partical.forEach(function(item, index, arr) {
                if (item.dwindex > me.count1)
                    return;
                if (item.finished) {
                    item.x = item.endx;
                    item.y = item.endy;
                    me.drawrect.call(me,item);
                    return;
                }
                if (!item.down) {
                    item.x -= item.speed / item.dx;
                    item.y -= item.speed;
                    me.drawrect.call(me,item);
                    if (item.y < item.top) {
                        item.x = item.endx;
                        item.down = true;
                    }
                } else {
                	item.speed+=me.speed;
                    item.y += item.speed;
                    item.x = item.endx;
                    me.drawrect.call(me,item);
                    if (item.y >= item.endy) {
                        item.finished = true;
                        me.partical_len--;
                    }
                }
            });
            me.count1++;
            if (me.partical_len > 0) {
                window.requestAnimationFrame(me.drawpatical.bind(me));
            } else {
                me.overdraw();
            }
        },
        drawrect:function(item){
        	var me=this;
        	var size=me.size; 
        	 me.canvas1.fillStyle = item.color;
             me.canvas1.fillRect(item.x - size / 2, item.y - size / 2, size, size);
        }
    }
    window.partical = partical;
    DD.createModule({
		el:'.top',
		onBeforeFirstRender:function(){
		},
		data:{
			menu:[{
				name:'插件',
                router:'/list'
			},{
				name:'捐助',
                route:'/give'
			},{
				name:'联系',
                route:'/connection'
			}]
		}
	});
	// setTimeout(function(){
	// 	 partical.init();
	// 	},0)
})();
(function(){
    var page;
    var canvasct;
    var particles=[];
    var moveCount;
    var startx;
    var starty;
    var canvas;
    var canvas1;
    var imglogo;
    var loaded=false;
    function init(){
        page = document.querySelector('.page-home');
        var height = window.innerWidth>1000?window.innerHeight - 80:window.innerHeight-60;
        canvasct = page.querySelector('.canvasct');
        canvasct.style.width = window.innerWidth + 'px';
        canvasct.style.height = height + 'px';
        canvas = page.querySelector('canvas');
        canvas.width = window.innerWidth;
        canvas.height = height;
        if(!loaded){
            imglogo = new Image();
            imglogo.src = 'home.png';
            imglogo.onload = function(){
                load(); 
                loaded = true;
            }       
        }else{
            if(imglogo.width>window.innerWidth-20){
                var scale = imglogo.width/imglogo.height;
                width = window.innerWidth-20;
                height = width/scale;
            }else{
                width = imglogo.width;
                height = imglogo.height;
            }
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.drawImage(imglogo,0,0,imglogo.width,imglogo.height,startx,starty,width,height);
        }
    }

    
    function load(){
        canvas1 = document.createElement('canvas');
        var ctx1 = canvas1.getContext('2d');
        //鎶妉ogo
        var width,height;
        if(imglogo.width>window.innerWidth-20){
            var scale = imglogo.width/imglogo.height;
            width = window.innerWidth-20;
            height = width/scale;
        }else{
            width = imglogo.width;
            height = imglogo.height;
        }
        startx = (canvas.width-width)/2;
        starty = (canvas.height-height - 60)/2;
        
        canvas1.width =  width;
        canvas1.height = height;
        ctx1.drawImage(imglogo,0,0,imglogo.width,imglogo.height,0,0,width,height);
        
        var imgData=ctx1.getImageData(0,0,width,height);
        var pointJump;
        if(window.innerWidth>1000){
            pointJump = 4;
        }else{
            pointJump = 2;
        }
        var data = imgData.data;
        
        for(var ii=0;ii<height;ii+=pointJump){
            for(var jj=0;jj<width;jj+=pointJump){
                var index = ii*4*width + 4*jj;
                //鍏ㄤ负0鐨勭偣涓嶅鐞�
                if(data[index] === 0 && data[index+1] === 0 && data[index+2] ===0){
                    continue;
                }
                genParticle(canvas,ii,jj,data[index],data[index+1],data[index+2],data[index+3]);
            }
        }
        moveCount = particles.length;
        drawLoop();
    }

    function genParticle(canvas,row,col,r,g,b,a){
        var x = (canvas.width*Math.random())|0;
        var y = 0/*canvas.height*Math.random()*/;
        var x = canvas.width/2+(Math.random()*20-10);
        var y = canvas.height;
        // var y = canvas.height/2;
        var c = 'rgba(' + r + ',' + g + ',' + b + ',' + a*.5 + ')';
        var dindex = (Math.random()*100)|0;
        var speed = Math.random() * Math.sqrt(dindex) * canvas.width/500;

        var dy = row-y;
        if(speed<1){
            speed = 1+Math.random()*5;
        }else if(speed>6){
            speed = 6;
        }
        
        var ty1 = 0;//Math.random() * 20;
        var o = {
            x:x,
            y:y,
            dy:dy,
            tx:col+startx,
            ty:row+starty,
            ty1:ty1,
            dindex:dindex,  //缁樺埗index
            xl:(ty1-y)/(col+startx-x),
            speed:speed,
            dspeed:Math.random()*2,
            color:c
        }
        particles.push(o);
    }

    var drawIndex = 0;

    function drawLoop(){
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,canvas.width,canvas.height);
        var size = 0.004*window.innerWidth;
        if(size > 4){
            size = 4;
        }else if(size < 2){
            size = 2;
        }
        var jnum = (particles.length/5)|0;
        particles.forEach(function(p){
            if(p.dindex>drawIndex){
                return;
            }
            
            if(p.finished){
                ctx.fillStyle=p.color;
                ctx.fillRect(p.tx-size/2,p.ty-size/2,size,size);
                return;
            }

            if(!p.down){
                var sp = p.speed;
                p.y -= sp;
                p.x -= sp/p.xl;
                if(p.y <= p.ty1){
                    p.x = p.tx;
                    p.down = true;
                }   
            }else{
                var sp = p.dspeed;
                p.dspeed+= 0.02
                p.y += sp;
                if(p.y>=p.ty){
                    p.y = p.ty;
                    moveCount--;
                    p.finished = true;
                }
            }
            ctx.fillStyle=p.color;
            ctx.fillRect(p.x-size/2,p.y-size/2,size,size);
        });
        drawIndex++;
        if(moveCount > 0){
            requestAnimationFrame(drawLoop);
        }else{
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.drawImage(imglogo,0,0,imglogo.width,imglogo.height,startx,starty,canvas1.width,canvas1.height);
            canvas1 = null;
            particles = null;
        }
    }

    window.PageHome = {
        init:init
    }
    setTimeout(function(){
        window.PageHome.init();
    }, 500,false);
}());