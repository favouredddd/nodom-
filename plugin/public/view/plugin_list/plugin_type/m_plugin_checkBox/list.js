;
(function() {
	var data = {
		requires: [{
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/address/location_1/css/index.css'
		}],
		name: 'm_plugin_address',
		delayInit: true,
		data: {
			hasCreated: false,
			name: '地址'
		},
		modules: [{
			el: '.el-plugin-01001',
			name: 'm_plugin01001',
			data: {
				location_country: '重庆',
				popular_country: [{
					name: '北京'
				}, {
					name: '重庆'
				}, {
					name: '四川'
				}, {
					name: '江西'
				}, {
					name: '青海'
				}, {
					name: '重庆'
				}, {
					name: '江苏'
				}, {
					name: '天津'
				}, {
					name: '深圳'
				}, {
					name: '浙江'
				}, {
					name: '重庆'
				}, {
					name: '江苏'
				}, {
					name: '天津'
				}, {
					name: '深圳'
				}, {
					name: '浙江'
				}],
				small_div: {
					color_1: '#ffffff',
					color_2: '#66d9ef',
					color_3: '#457eb1',
					color_4: '#5a8dba'
				}
			}
		}],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_address/m_plugin_address.html'
	}
	DD.createModule(data)
})();;
(function() {
	var data = {

		delayInit: true,
		requires: [{
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/buffering/animation_1/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/buffering/animation_2/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/buffering/animation_3/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/buffering/animation_4/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/buffering/animation_5/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/buffering/animation_6/css/index.css'
		}],
		name: 'm_plugin_buffering',
		data: {
			hasCreated: false,
			name: '缓冲'
		},
		modules: [{
			el: '.el-plugin-02001',
			name: 'm_plugin02001',
			data: {
				buffering_data: {
					show: true,
					animation_time: 1,
					color: '#FF0000',
					radius: 5
				}
			}
		}, {
			el: '.el-plugin-02002',
			name: 'm_plugin02002',

			data: {
				buffering_data: {
					show: true,
					width: 40,
					height: 60,
					color: '#FDB702',
					animation_time: 1.2
				}
			}
		}, {
			el: '.el-plugin-02003',
			name: 'm_plugin02003',
			data: {
				buffering_data: {
					show: true,
					color_1: '#409EFF',
					animation_time: 3,
					size: 64
				}
			}
		}, {
			el: '.el-plugin-02004',
			name: 'm_plugin02004',
			data: {
				buffering_data: {
					show: true,
					color: '#00bfff',
					time: 0.8,
					width: 150,
					height: 70
				}
			}
		}, {
			el: '.el-plugin-02005',
			name: 'm_plugin02005',
			data: {
				name: '水滴动画',
				buffering_data: {
					color: '#363636',
					show: true,
					time: 2,
					radius: 5
				}
			}
		}, {
			el: '.el-plugin-02006',
			name: 'm_plugin02006',
			data: {
				buffering_data: {
					show: true,
					animation_time: 1,
					color: '#0000FF'
				}
			}
		}],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_buffering/m_plugin_buffering.html'
	}
	DD.createModule(data)
})();;
(function() {
	var data = {

		delayInit: true,
		requires: [{
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/carousel/carousel_3/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/css/carousel.css'
		}],
		name: 'm_plugin_carousel',
		data: {
			hasCreated: false,
			name: '轮播图'
		},
		modules: [{
			el: '.el-plugin-03001',
			name: 'm_plugin03001',
			onBeforeFirstRender() {
				this.data.carousel_data = {
					width: 10,
					check_color: '#ff0000',
					translate: false,
					imgs: [{
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/img/1.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/img/2.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/img/3.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/img/4.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/img/5.jpg'
					}],
					right: true,
					is_circle: true
				}
			},
			data: {
				name: '',
				carousel_data: {
					width: 10,
					check_color: '#ff0000',
					translate: false,
					imgs: [{
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/img/1.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/img/2.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/img/3.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/img/4.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/img/5.jpg'
					}],
					right: true,
					is_circle: true
				}
			}
		}, {
			el: '.el-plugin-03002',
			name: 'm_plugin03002',
			onBeforeFirstRender() {
				this.data.carousel_data = {
					width: 10,
					translate: false,
					imgs: [{
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/1.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/2.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/3.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/2.jpg'
					}],
					is_circle: false,
					right: false,
					check_color: '#00FF00'
				}
			},
			data: {
				width_data: '',
				name: '',
				carousel_data: {
					width: 10,
					translate: false,
					imgs: [{
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/1.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/2.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/3.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/2.jpg'
					}],
					is_circle: false,
					right: false,
					check_color: '#00FF00'
				}
			}
		}, {
			el: '.el-plugin-03003',
			name: 'm_plugin03003',
			onBeforeFirstRender() {
				this.data.carousel_data = {
					width: 10,
					translate: false,
					imgs: [{
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/1.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/2.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/3.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_3/img/2.jpg'
					}],
					is_circle: true,
					up: false,
					check_color: '#ff6800'
				}
			},
			data: {
				width_data: '',
				name: '',
				carousel_data: {
					width: 10,
					translate: false,
					imgs: [{
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/1.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/2.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/3.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_3/img/2.jpg'
					}],
					is_circle: true,
					up: false,
					check_color: '#ff6800'
				},
				dx: 1
			}
		}, {
			el: '.el-plugin-03004',
			name: 'm_plugin03004',
			onBeforeFirstRender() {
				this.data.carousel_data = {
					one: true,
					width: 10,
					translate: false,
					imgs: [{
						img_item: [{
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/4.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/8.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/12.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/16.jpg'
						}]
					}, {
						img_item: [{
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/3.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/7.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/11.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/15.jpg'
						}]
					}, {
						img_item: [{
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/2.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/6.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/10.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/14.jpg'
						}]
					}, {
						img_item: [{
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/1.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/5.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/9.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/13.jpg'
						}]
					}],
					is_circle: true,
					check_color: '#ffff00',
					up: true
				}
			},
			data: {
				base_url: '/plugin_set/public/view/plugin_download/carouse_4/img/',
				width_data: '',
				name: '',
				carousel_data: {
					one: true,
					width: 10,
					translate: false,
					imgs: [{
						img_item: [{
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/4.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/8.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/12.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/16.jpg'
						}]
					}, {
						img_item: [{
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/3.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/7.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/11.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/15.jpg'
						}]
					}, {
						img_item: [{
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/2.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/6.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/10.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/14.jpg'
						}]
					}, {
						img_item: [{
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/1.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/5.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/9.jpg'
						}, {
							url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/13.jpg'
						}]
					}],
					is_circle: true,
					check_color: '#ffff00',
					up: true
				},
				up: false,
				down: true
			}
		}, {
			el: '.el-plugin-03005',
			name: 'm_plugin03005',
			data: {
				carousel: {
					src1: '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner001.jpg',
					//默认采用GPU加速
					GPU: true,
					imgs: [{
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner001.jpg',
						link: '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner001.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner002.jpg',
						link: '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner002.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner003.jpg',
						link: '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner003.jpg'
					}, {
						url: '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner004.jpg',
						link: '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner004.jpg'
					}],
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

		}],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_carousel/m_plugin_carousel.html'
	}
	DD.createModule(data)
})();;
(function() {
	var data = {

		delayInit: true,
		requires: [{
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/chart/chart_1/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/chart/chart_2/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/chart/chart_3/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/chart/chart_4/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/chart/chart_5/css/index.css'
		}],
		name: 'm_plugin_chart',
		data: {
			hasCreated: false,
			name: '图表'
		},
		modules: [{
			el: '.el-plugin-15001',
			name: 'm_plugin15001',
			data: {
				histogram: {
					title: '直方图',
					legend: 'top',
					marker: false,
					titleColor: '#000000',
					gridLine: 0,
					gridLineColor: '#cccccc',
					legends: [{
						value: '',
						text: '无'
					}, {
						value: 'top',
						text: '顶部'
					}, {
						value: 'right',
						text: '右侧'
					}, {
						value: 'bottom',
						text: '底部'
					}],
					lines: [{
						value: 0,
						text: '无'
					}, {
						value: 1,
						text: '横向'
					}, {
						value: 2,
						text: '纵向'
					}, {
						value: 3,
						text: '全部'
					}],
					data: [{
						title: '成都店',
						datas: [{
							x: '1月',
							y: 300
						}, {
							x: '2月',
							y: 320
						}, {
							x: '3月',
							y: 280
						}, {
							x: '4月',
							y: 250
						}, {
							x: '5月',
							y: 300
						}, {
							x: '6月',
							y: 380
						}]
					}, {
						title: '北京店',
						datas: [{
							x: '1月',
							y: 900
						}, {
							x: '2月',
							y: 820
						}, {
							x: '3月',
							y: 880
						}, {
							x: '4月',
							y: 850
						}, {
							x: '5月',
							y: 900
						}, {
							x: '6月',
							y: 980
						}]
					}, {
						title: '上海店',
						datas: [{
							x: '1月',
							y: 600
						}, {
							x: '2月',
							y: 520
						}, {
							x: '3月',
							y: 580
						}, {
							x: '4月',
							y: 550
						}, {
							x: '5月',
							y: 600
						}, {
							x: '6月',
							y: 680
						}]
					}]
				}
			}
		}, {
			el: '.el-plugin-15002',
			name: 'm_plugin15002',

			data: {
				line: {
					title: '折线图',
					legend: '',
					marker: true,
					titleColor: '#000000',
					gridLine: 0,
					gridLineColor: '#cccccc',
					legends: [{
						value: '',
						text: '无'
					}, {
						value: 'top',
						text: '顶部'
					}, {
						value: 'right',
						text: '右侧'
					}, {
						value: 'bottom',
						text: '底部'
					}],
					lines: [{
						value: 0,
						text: '无'
					}, {
						value: 1,
						text: '横向'
					}, {
						value: 2,
						text: '纵向'
					}, {
						value: 3,
						text: '全部'
					}],
					data: [{
						title: '成都店',
						datas: [{
							x: '1月',
							y: 300
						}, {
							x: '2月',
							y: 320
						}, {
							x: '3月',
							y: 280
						}, {
							x: '4月',
							y: 250
						}, {
							x: '5月',
							y: 300
						}, {
							x: '6月',
							y: 380
						}]
					}, {
						title: '北京店',
						datas: [{
							x: '1月',
							y: 900
						}, {
							x: '2月',
							y: 820
						}, {
							x: '3月',
							y: 880
						}, {
							x: '4月',
							y: 850
						}, {
							x: '5月',
							y: 900
						}, {
							x: '6月',
							y: 980
						}]
					}, {
						title: '上海店',
						datas: [{
							x: '1月',
							y: 600
						}, {
							x: '2月',
							y: 520
						}, {
							x: '3月',
							y: 580
						}, {
							x: '4月',
							y: 550
						}, {
							x: '5月',
							y: 600
						}, {
							x: '6月',
							y: 680
						}]
					}]
				}
			}
		}, {
			el: '.el-plugin-15003',
			name: 'm_plugin15003',
			data: {
				pie: {
					title: '饼状图',
					legend: '',
					titleColor: '#000000',
					showPercent: true,
					showText: true,
					legends: [{
						value: '',
						text: '无'
					}, {
						value: 'top',
						text: '顶部'
					}, {
						value: 'right',
						text: '右侧'
					}, {
						value: 'bottom',
						text: '底部'
					}],
					data: [{
						value: 300,
						title: '数据一'
					}, {
						value: 800,
						title: '数据二'
					}, {
						value: 600,
						title: '数据三'
					}, {
						value: 100,
						title: '数据四'
					}, {
						value: 400,
						title: '数据五'
					}, {
						value: 450,
						title: '数据六'
					}]
				}
			}
		}, {
			el: '.el-plugin-15004',
			name: 'm_plugin15004',
			data: {
				radar: {
					title: '雷达图实例',
					legend: 'right',
					marker: true,
					titleColor: '#000000',
					legends: [{
						value: '',
						text: '无'
					}, {
						value: 'top',
						text: '顶部'
					}, {
						value: 'right',
						text: '右侧'
					}, {
						value: 'bottom',
						text: '底部'
					}],
					radar: {
						titles: ['顶点一', '顶点二', '顶点三', '顶点四', '顶点五', '顶点六'],
						colors: ['#e6e6e6', '#f5f5f5'],
						lineColor: '#ccc'
					},
					data: [{
						title: '111',
						datas: [93, 55, 45, 78, 66, 45]
					}, {
						title: '555',
						datas: [45, 79, 79, 88, 93, 67]
					}],
					addTitle: '',
					addData: '',
					changeColors: ''
				}
			}

		}, {
			el: '.el-plugin-15005',
			name: 'm_plugin15005',
			data: {
				scatter: {
					title: '散点图',
					legend: '',
					marker: false,
					titleColor: '#000000',
					symbolSize: 8,
					gridLine: 0,
					gridLineColor: '#cccccc',
					legends: [{
						value: '',
						text: '无'
					}, {
						value: 'top',
						text: '顶部'
					}, {
						value: 'right',
						text: '右侧'
					}, {
						value: 'bottom',
						text: '底部'
					}],
					lines: [{
						value: 0,
						text: '无'
					}, {
						value: 1,
						text: '横向'
					}, {
						value: 2,
						text: '纵向'
					}, {
						value: 3,
						text: '全部'
					}],
					data: [{
						title: '测试',
						datas: [{
							x: 10,
							y: 8.04
						}, {
							x: 8,
							y: 6.95
						}, {
							x: 13,
							y: 7.58
						}, {
							x: 9,
							y: 8.81
						}, {
							x: 11,
							y: 8.33
						}, {
							x: 14,
							y: 9.96
						}, {
							x: 6,
							y: 7.24
						}, {
							x: 4,
							y: 4.26
						}, {
							x: 12,
							y: 10.84
						}, {
							x: 7,
							y: 4.82
						}, {
							x: 5,
							y: 5.68
						}],
						cs: ''
					}],
					addX: '',
					addY: ''
				}
			}
		}],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_chart/m_plugin_chart.html'
	}
	DD.createModule(data)
})();;
(function() {
	var data = {
		delayInit: true,
		requires: [{
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/checkBox/checkbox_1/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/checkBox/checkbox_2/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/checkBox/checkbox_3/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/checkBox/checkbox_4/css/index.css'
		}],
		name: 'm_plugin_checkBox',
		data: {
			hasCreated: false,
			name: '选择框'
		},
		delayInit: true,
		modules: [{
			el: '.el-plugin-04001',
			name: 'm_plugin04001',
			data: {
				name: '普通选择框',
				check_data: {
					check_color: '#26a2ff',
					no_check_color: '#ffffff',
					empty_color: '#cccccc',
					is_check: true,
					is_circle: true,
					size: 20
				}
			}
		}, {
			el: '.el-plugin-04002',
			name: 'm_plugin04002',
			data: {
				name: 'check02',
				check_data: {
					check_color: '#26a2ff',
					no_check_color: '#aaaaaa',
					is_check: true,
					size: 30
				}
			}
		}, {
			el: '.el-plugin-04003',
			name: 'm_plugin04003',
			data: {
				name: 'check03',
				check_data: {
					check_color: '#26a2ff',
					no_check_color: '#000000',
					is_check: true,
					size: 30
				}
			}
		}, {
			el: '.el-plugin-04004',
			name: 'm_plugin04004',
			data: {
				name: 'check04',
				check_data: {
					check_color: '#26a2ff',
					no_check_color: '#aaaaaa',
					is_check: true,
					size: 30
				}
			}
		}],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_checkBox/m_plugin_checkBox.html'
	}
	DD.createModule(data)
})();
(function() {
	var data = {

		delayInit: true,
		requires: [{
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/colorPicker/colorPicker_1/css/index.css'
		}],
		name: 'm_plugin_colorPicker',
		delayInit: true,
		data: {
			hasCreated: false,
			name: '颜色选择'
		},
		modules: [{
			el: '.el-plugin-05001',
			name: 'm_plugin05001',
			data: {
				left: 0,
				first: 1,
				r: 255,
				g: 0,
				b: 0,
				H: 0,
				s: 255,
				v: 255,
				show: false,
				str: '#ff0000'
			}
		}],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_colorPicker/m_plugin_colorPicker.html'
	}
	DD.createModule(data)
})();
(function() {
	var data = {

		delayInit: true,
		requires: [{
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/dateInput/dateInput_1/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/dateInput/dateInput_2/css/index.css'
		}],
		name: 'm_plugin_dateInput',
		delayInit: true,
		data: {
			hasCreated: false,
			name: '日期选择'
		},
		modules: [{
			el: '.el-plugin-06001',
			name: 'm_plugin06001',
			data: {
				date_data: {
					year: '',
					month: '',
					day: '',
					show: false,
					xDate_color: {
						header_color: '#e6e6e6',
						bg_color: '#fff',
						day_color: '#555555',
						today_color: '#112233',
						month_color: '#333333'
					},
					xDate_day: [{
						day: '日'
					}, {
						day: '一'
					}, {
						day: '二'
					}, {
						day: '三'
					}, {
						day: '四'
					}, {
						day: '五'
					}, {
						day: '六'
					}],
					xDate_week: []
				}
			}
		}, {
			el: '.el-plugin-06002',
			name: 'm_plugin_06002',
			template: ``,
			methods: {
				confirm: function(e, d, v) {
					var me = this
					me.data.nowDate = me.data.nowDate
					me.data.show = false
				},
				cancel: function(e, d, v) {
					var me = this
					me.data.show = false
				},
				show: function() {
					var me = this
					me.data.show = true
				}
			},
			data: {
				nowDate: '周一',
				show: false,
				options: [{
					date: '周一'
				}, {
					date: '周二'
				}, {
					date: '周三'
				}, {
					date: '周四'
				}, {
					date: '周五'
				}, {
					date: '周六'
				}, {
					date: '周日'
				}],
				select_color: '#ffffff',
				font_color: '#000000',
				font_size: 12
			}
		}],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_dateInput/m_plugin_dateInput.html'
	}
	DD.createModule(data)
})();
(function() {
	var data = {

		delayInit: true,
		requires: [{
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/foldCollapse/foldCollapse_1/css/index.css'
		}],
		name: 'm_plugin_foldCollapse',
		data: {
			hasCreated: false,
			name: '折叠'
		},
		delayInit: true,
		modules: [{
			el: '.el-plugin-07001',
			name: 'm_plugin07001',
			data: {
				collapse_data: {
					time: 0.5,
					isCollapse: true,
					heading: '点击展开，再次点击折叠',
					content: 'NoDom提供了丰富的指令集，如x-repeat( 重复条目渲染 )、x-model(数据模型)、x-if/x-else(条件)、x-show(显示和隐藏)、x-route／x-router(路由)、 x-field(字段和双向绑定)、x-validity(字段验证)。 同时提供了自定义指令集，指令可以帮助简化模版，丰富渲染内容。',
					head_bg_color: '#f5f5f5',
					content_bg_color: '#FFFFFF',
					head_font_color: '#666666',
					content_font_color: '#999999',
					head_font_size: 16,
					content_font_size: 14
				}
			}
		}],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_foldCollapse/m_plugin_foldCollapse.html'
	}
	DD.createModule(data)
})();;
(function() {
	var data = {

		delayInit: true,
		requires: [{
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/imgShow/magn_1/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/imgShow/magn_2/css/index.css'
		}],
		name: 'm_plugin_imgShow',
		data: {
			hasCreated: false,
			name: '图片放大'
		},
		delayInit: true,
		modules: [{
			el: '.el-plugin-08001',
			name: 'm_plugin08001',
			data: {
				photo_to_big: {
					small_img: '/plugin_set/public/plugins/plugins_show/imgShow/magn_1/img/small.jpg',
					big_img: '/plugin_set/public/plugins/plugins_show/imgShow/magn_1/img/big.jpg',
					radio: 2,
					mark_color: '#666666',
					mark_opacity: '0.2'
				}
			}
		}, {
			el: ".el-plugin-08002",
			data: {
				magn: {
					init: false,
					imgs: [{
						"src": "/plugin_set/public/plugins/plugins_show/imgShow/magn_2/imgs/a1.png"
					}, {
						"src": "/plugin_set/public/plugins/plugins_show/imgShow/magn_2/imgs/a2.png"
					}, {
						"src": "/plugin_set/public/plugins/plugins_show/imgShow/magn_2/imgs/a3.png"
					}, {
						"src": "/plugin_set/public/plugins/plugins_show/imgShow/magn_2/imgs/a4.png"
					}],
					"src": "/plugin_set/public/plugins/plugins_show/imgShow/magn_2/imgs/a1.png",
					show: false,
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
						"src": "/plugin_set/public/plugins/plugins_show/imgShow/magn_2/imgs/a1.png",
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
		}],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_imgShow/m_plugin_imgShow.html'
	}
	DD.createModule(data)
})();
(function() {
	var data = {

		delayInit: true,
		requires: [],
		name: 'm_plugin_inputAuto',
		data: {
			hasCreated: false,
			name: '自动补全'
		},
		delayInit: true,
		modules: [{
			el: '.el-plugin-09001',
			name: 'm_plugin09001',
			requires: [{
				type: 'css',
				path: HTMLURL + '/plugin_download/inputAuto_1/css/index.css'
			}],
			data: {
				name: '自动补全',
				color: '#eeeeee',
				font_color: '#000000',
				one: 1,
				results: [],
				flag: false,
				now: 0,
				result: '',
				li: [{
					txt: 1,
					check: false
				}, {
					txt: 12,
					check: false
				}, {
					txt: 13,
					check: false
				}, {
					txt: 11,
					check: false
				}, {
					txt: 2,
					check: false
				}, {
					txt: 4,
					check: false
				}, {
					txt: 4,
					check: false
				}]
			},
			methods: {
				check(e, d, v) {
					var me = this
					me.data.results = []
					me.data.result = d.txt
					me.data.flag = false
					document.querySelector('.inputAuto').querySelector('input').value = me.data.result
				}
			}
		}],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_inputAuto/m_plugin_inputAuto.html'
	}
	DD.createModule(data)
})();
(function() {
	var data = {

		delayInit: true,
		requires: [{
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/paging/page_1/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/paging/page_2/css/index.css'
		}],
		name: 'm_plugin_paging',
		data: {
			name: '分页'
		},
		delayInit: true,
		modules: [{
			el: '.el-plugin-10001',
			name: 'm_plugin10001',
			data: {
				page: 1,
				row: 10,
				total: 50,
				to_page: 1,
				allpage: 3,
				page_color: '#FF0000'
			},
			methods: {
				updatePage() {
					alert("你点击了更新页面")
				}
			}
		}, {
			el: '.el-plugin-10002',
			name: 'm_plugin10002',
			data: {
				page: {
					pre_page: 1,
					go_page: 1,
					all_page: 16,
					page_rows: [],
					pre_color: '#5eaee3',
					word_color: '#999999',
					one: 1
				}
			}
		}],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_paging/m_plugin_paging.html'
	}
	DD.createModule(data)
})();
(function() {
	var data = {

		delayInit: true,
		requires: [{
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/progress/progress_1/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/progress/progress_2/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/progress/progress_3/css/index.css'
		}],
		name: 'm_plugin_progress',
		data: {
			hasCreated: false,
			name: '进度条'
		},
		delayInit: true,
		modules: [{
			el: '.el-plugin-11001',
			name: 'm_plugin11001',
			data: {
				drag_pro_bar_process: 0.4,
				show_style: 'horizontal',
				process_box_bg: 'rgba(96,96,96,0.5)',
				percent_color: '#ffffff',
				drag_btn_width: 10,
				process_bg: '#000',
				drag_btn_color: '#00ff00'
			}
		}, {
			el: '.el-plugin-11002',
			name: 'm_plugin11002',
			data: {
				proBar: 0.9,
				percent: true,
				process_percent_num_color: '#ffffff',
				process_percent_color: '#4A98FF',
				process_bg_color: '#DDDDDD'
			}
		}, {
			el: '.el-plugin-11003',
			name: 'm_plugin11003',
			data: {
				name: '圆环进度条',
				proBar: 0.9,
				r1: 56.54866776461628,
				r2: 565.4866776461628,
				proR: 90,
				percent: true,
				per: 1,
				process_all_color: '#f5f5f5',
				process_percent_num_color: '#ffffff',
				process_percent_color: '#4A98FF',
				process_bg_color: '#DDDDDD'
			}
		}],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_progress/m_plugin_progress.html'
	}
	DD.createModule(data)
})();
(function() {
	var data = {

		delayInit: true,
		requires: [{
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/switcher/button_1/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/switcher/switcher_1/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/switcher/switcher_2/css/index.css'
		}, {
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/switcher/switcher_3/css/index.css'
		}, {
			type: 'css',
			path: 'https://fonts.googleapis.com/icon?family=Material+Icons'
		}],
		name: 'm_plugin_switcher',
		data: {
			hasCreated: false,
			name: '开关'
		},
		delayInit: true,
		modules: [{
			el: '.el-plugin-12001',
			name: 'm_plugin12001',
			data: {
				switcher: true,
				open_color: '#4BD763',
				close_color: '#F9F9F9',
				btn_color: '#ffffff'
			}
		}, {
			el: '.el-plugin-12002',
			name: 'm_plugin12002',
			data: {
				switcher: false,
				bg_color: '#292827',
				shadow_color: '#FF9900',
				btn_color: '#FFFFFF'
			}
		}, {
			el: '.el-plugin-12003',
			name: 'm_plugin12003',

			data: {
				switcher: true,
				open_color: '#cccccc',
				close_color: '#ff9900'
			}
		}, {
			el: '.el-plugin-12004',
			name: 'm_plugin12004',

			data: {
				list_one: [{
					value: '危险'
				}, {
					value: '警告'
				}, {
					value: '成功'
				}],
				list_two: [{
					name: '删除',
					value: 'delete'
				}, {
					name: '编辑',
					value: 'edit'
				}, {
					name: '分享',
					value: 'share'
				}],
				list_three: [{
					value: 'keyboard_arrow_down'
				}, {
					value: 'keyboard_arrow_up'
				}, {
					value: 'keyboard_arrow_left'
				}],
				color_1: '#e53935',
				color_2: '#e53935',
				color_3: '#4caf50'
			}
		}],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_switcher/m_plugin_switcher.html'
	}
	DD.createModule(data)
})();
(function() {
	var data = {

		delayInit: true,
		requires: [{
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/table/table_1/css/index.css'
		}],
		name: 'm_plugin_table',
		data: {
			hasCreated: false,
			name: '表格'
		},
		delayInit: true,
		modules: [{
			el: '.el-plugin-13001',
			name: 'm_plugin13001',
			data: {
				aa: 1,
				d: [1, 2, 3],
				table: {
					show_reverse: false,
					check_all: false,
					thead: [{
						name: '姓名'
					}, {
						name: '年龄'
					}, {
						name: '身高'
					}, {
						name: '体重'
					}, {
						name: '学历'
					}, {
						name: '工作经历'
					}],
					reverse: [{
						name: '姓名',
						field: ''
					}, {
						name: '年龄',
						field: ''
					}, {
						name: '身高',
						field: ''
					}, {
						name: '体重',
						field: ''
					}, {
						name: '学历',
						field: ''
					}, {
						name: '工作经历',
						field: ''
					}],
					th: [{
						check: false,
						td: [{
							ct: '张三'
						}, {
							ct: 100
						}, {
							ct: '171'
						}, {
							ct: '53'
						}, {
							ct: '本科'
						}, {
							ct: '2年'
						}]
					}, {
						check: false,
						td: [{
							ct: '张三'
						}, {
							ct: 101
						}, {
							ct: '173'
						}, {
							ct: '53'
						}, {
							ct: '本科'
						}, {
							ct: '1年'
						}]
					}, {
						check: false,
						td: [{
							ct: '张三'
						}, {
							ct: 107
						}, {
							ct: '172'
						}, {
							ct: '53'
						}, {
							ct: '本科'
						}, {
							ct: '5年'
						}]
					}, {
						check: false,
						td: [{
							ct: '张三'
						}, {
							ct: 102
						}, {
							ct: '173'
						}, {
							ct: '53'
						}, {
							ct: '本科'
						}, {
							ct: '3年'
						}]
					}, {
						check: true,
						td: [{
							ct: '张三'
						}, {
							ct: 101
						}, {
							ct: '173'
						}, {
							ct: '53'
						}, {
							ct: '本科'
						}, {
							ct: '3年'
						}]
					}, {
						check: false,
						td: [{
							ct: '张三'
						}, {
							ct: 128
						}, {
							ct: '177'
						}, {
							ct: '53'
						}, {
							ct: '本科'
						}, {
							ct: '3年'
						}]
					}, {
						check: false,
						td: [{
							ct: '张三'
						}, {
							ct: 128
						}, {
							ct: '175'
						}, {
							ct: '53'
						}, {
							ct: '本科'
						}, {
							ct: '3年'
						}]
					}, {
						check: false,
						td: [{
							ct: '张三'
						}, {
							ct: 128
						}, {
							ct: '178'
						}, {
							ct: '53'
						}, {
							ct: '本科'
						}, {
							ct: '3年'
						}]
					}, {
						check: false,
						td: [{
							ct: '张三'
						}, {
							ct: 128
						}, {
							ct: '173'
						}, {
							ct: '53'
						}, {
							ct: '本科'
						}, {
							ct: '3年'
						}]
					}, {
						check: false,
						td: [{
							ct: '张三'
						}, {
							ct: 128
						}, {
							ct: '179'
						}, {
							ct: '53'
						}, {
							ct: '本科'
						}, {
							ct: '3年'
						}]
					}, {
						check: false,
						td: [{
							ct: '张三'
						}, {
							ct: 128
						}, {
							ct: '173'
						}, {
							ct: '53'
						}, {
							ct: '本科'
						}, {
							ct: '3年'
						}]
					}, {
						check: false,
						td: [{
							ct: '张三'
						}, {
							ct: 128
						}, {
							ct: '173'
						}, {
							ct: '53'
						}, {
							ct: '本科'
						}, {
							ct: '3年'
						}]
					}, {
						check: false,
						td: [{
							ct: '张三'
						}, {
							ct: 128
						}, {
							ct: '173'
						}, {
							ct: '53'
						}, {
							ct: '本科'
						}, {
							ct: '3年'
						}]
					}]
				}
			}
		}],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_table/m_plugin_table.html'
	}
	DD.createModule(data)
})();;
(function() {
	var data = {
		delayInit: true,
		requires: [{
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/tree/tree_1/css/index.css'
		}],
		name: 'm_plugin_tree',
		delayInit: true,
		data: {
			hasCreated: false,
			name: '菜单树'
		},
		modules: [{
			el: '.el-plugin-14001',
			name: 'm_plugin14001',
			data: {
				tree_data: {
					color_1: '#333333',
					color_2: '#1890ff',
					one: 1,
					arr: [{
						click: false,
						txt: 'parent-1',
						show: true,
						arr: [{
							click: false,
							txt: 'child-1',
							show: false,
							arr: [{
								click: false,
								txt: 'child-1-1',
								show: false
							}, {
								click: false,
								txt: 'child-1-2',
								show: false
							}]
						}, {
							click: false,
							txt: 'child-2',
							show: false
						}, {
							click: false,
							txt: 'child-3',
							show: false
						}, {
							click: false,
							txt: 'child-4',
							show: false
						}]
					}, {
						click: false,
						txt: 'parent-2',
						show: true
					}, {
						click: false,
						txt: 'parent-3',
						show: true
					}, {
						click: false,
						txt: 'parent-4',
						show: true
					}]
				}
			},
			onBeforeFirstRender() {
				var me = this
				me.data.tree_data.one = 1
			},
			methods: {
				show: function(e, d, v) {
					var me = this
					d.show = !d.show
				},
				sendPro: function(txt, data) {
					var me = this
					var tem = null
					data.forEach(i => {
						if (i.arr) {
							i.arr.forEach(it => {
								if (it.txt === txt) tem = i
								if (!tem) {
									tem = me.module.methodFactory.methods.sendPro.call(me, txt, i.arr)
								}
							})
						}
					})
					return tem
				},
				check: function(e, d, v) {
					var me = this
					console.log(me)
					d.click = !d.click
					if (!d.click && d.txt.indexOf('parent') === -1) {
						parent = me.module.methodFactory.methods.sendPro.call(me, d.txt, me.data.tree_data.arr)
						if (parent) {
							parent.click = false
						}
					}
					if (d.click && d.txt.indexOf('parent') === -1) {
						parent = me.module.methodFactory.methods.sendPro.call(me, d.txt, me.data.tree_data.arr)
						if (parent) {
							if (
								parent.arr.every(function(i) {
									return i.click
								})
							) {
								parent.click = true
							}
						}
					}
					me.module.methodFactory.methods.checkall.call(me, d)
				},
				checkall: function(d) {
					var me = this
					if (d.arr) {
						d.arr.forEach(function(i) {
							i.click = d.click
							if (i.arr) {
								me.module.methodFactory.methods.checkall.call(me, i)
							}
						})
					}
				}
			}
		}],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_tree/m_plugin_tree.html'
	}
	DD.createModule(data)
})()