;(function() {
	var data = {
		delayInit: true,
		requires: [
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/carousel/carousel_3/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/css/index.css' }
		],
		name: 'm_plugin_carousel',
		data: { hasCreated: false, name: '轮播图' },
		modules: [
			{
				el: '.el-plugin-03001',
				name: 'm_plugin03001',
				data: {
					name: '',
					carousel_data: {
						width: 10,
						check_color: '#ff0000',
						translate: false,
						imgs: [
							{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/img/1.jpg' },
							{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/img/2.jpg' },
							{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/img/3.jpg' },
							{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/img/4.jpg' },
							{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/img/5.jpg' }
						],
						right: true,
						is_circle: true
					}
				}
			},
			{
				el: '.el-plugin-03002',
				name: 'm_plugin03002',
				data: {
					width_data: '',
					name: '',
					carousel_data: {
						width: 10,
						translate: false,
						imgs: [
							{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/1.jpg' },
							{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/2.jpg' },
							{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/3.jpg' },
							{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/2.jpg' }
						],
						is_circle: false,
						right: false,
						check_color: '#00FF00'
					}
				}
			},
			{
				el: '.el-plugin-03003',
				name: 'm_plugin03003',
				data: {
					width_data: '',
					name: '',
					carousel_data: {
						width: 10,
						translate: false,
						imgs: [
							{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/1.jpg' },
							{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/2.jpg' },
							{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/3.jpg' },
							{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_3/img/2.jpg' }
						],
						is_circle: true,
						up: false,
						check_color: '#ff6800'
					},
					dx: 1
				}
			},
			{
				el: '.el-plugin-03004',
				name: 'm_plugin03004',
				data: {
					base_url: '/plugin_set/public/view/plugin_download/carouse_4/img/',
					width_data: '',
					name: '',
					carousel_data: {
						one: true,
						width: 10,
						translate: false,
						imgs: [
							{
								img_item: [
									{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/4.jpg' },
									{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/8.jpg' },
									{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/12.jpg' },
									{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/16.jpg' }
								]
							},
							{
								img_item: [
									{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/3.jpg' },
									{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/7.jpg' },
									{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/11.jpg' },
									{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/15.jpg' }
								]
							},
							{
								img_item: [
									{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/2.jpg' },
									{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/6.jpg' },
									{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/10.jpg' },
									{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/14.jpg' }
								]
							},
							{
								img_item: [
									{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/1.jpg' },
									{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/5.jpg' },
									{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/9.jpg' },
									{ url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/13.jpg' }
								]
							}
						],
						is_circle: true,
						check_color: '#ffff00',
						up: true
					},
					up: false,
					down: true
				}
			},
			{
				el: '.el-plugin-03005',
				name: 'm_plugin03005',
				data: {
					carousel: {
						src1: '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner001.jpg',
						//默认采用GPU加速
						GPU: true,
						imgs: [
							{
								url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner001.jpg',
								link: '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner001.jpg'
							},
							{
								url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner002.jpg',
								link: '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner002.jpg'
							},
							{
								url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner003.jpg',
								link: '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner003.jpg'
							},
							{
								url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner004.jpg',
								link: '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner004.jpg'
							}
						],
						//开始的index src1要对应imgs修改
						index: 2,
						//滑动完成之后的标志物
						flag: false,
						//每次移动的距离一般不改变
						d: 0,
						//轮播方向
						left: true,
						//轮播速度不能太慢
						speed: 10,
						//初始化标志物
						init: true,
						//滑动手势之后的function name 在methods里面定义
						event: {
							right: 'right',
							left: 'left'
						}
					},
					dddd: 1111
				},
				methods: {
					right() {
						// console.log(1111);
					},
					left() {
						// console.log(22222);
					}
				},
				onBeforeFirstRender() {
					var me = this.data.carousel
					me.index = (me.index % me.imgs.length + me.imgs.length) % me.imgs.length
					me.src1 = me.imgs[me.index].url;
					console.log(this, 111)
				},
				onFirstRender() {}
			}
		],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_carousel/m_plugin_carousel.html'
	}
	DD.createModule(data)
})()
