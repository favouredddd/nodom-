;(function(){
	DD.createModule({
		el:'.el-svg-1',
		data:{
			r1:'',
			r2:'',
			per:0,
			r:80,
			color_1:'#f5f5f5',
			color_2:'#108ee9',
			show:true,
			t:0.1
		},
		onBeforeFirstRender:function(){
			var me=this;
			me.data.r1=me.data.r*Math.PI*2*me.data.per/100;
			me.data.r2=me.data.r*Math.PI*2;
			me.data.timer=setInterval(function(){
				me.data.t=0.1;
				if(me.data.per==100){
					me.data.t=0;
					me.data.per=0;
				    me.data.r1=me.data.r*Math.PI*2*me.data.per/100;
				    return ;
				}
				me.data.per+=2;
				me.data.r1=me.data.r*Math.PI*2*me.data.per/100;
			},50);
		},
		methods:{
			add:function(){
				var me=this;
				me.data.per+=me.data.per>9?0:1;
				me.data.r1=me.data.per/10*Math.PI*2*me.data.r;
				console.log(me.data.r1);
			},
			dele:function(){
				var me=this;
				me.data.per-=me.data.per<1?0:1;
				me.data.r1=me.data.per/10*Math.PI*2*me.data.r;
			}
		}
	})
})()