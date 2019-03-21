;(function() {
	var Buffering = function() {}
	Buffering.prototype.init = function(view) {
		var me = this
		var template = `<div class='nd-plugin-buffering-box' style="margin:0 auto">
                            <div class='mask'></div>
                            <div class='nd-plugin-buffering-loader'>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>`
		view.$dataItem = DD.attr(view, 'dataName') || 'data'
		view.innerHTML = template
		view.removeAttribute('dataName')
		DD.Compiler.compile(view, view.$module)
		view.$forceRender = true
	}

	Buffering.prototype.render = function(view) {
		var me = this
		var data = view.$getData().data[view.$dataItem]
		if (!data) {
			return
		}
		var module
		if (!data.module) {
			module = view.$module
		} else {
			module = data.module
		}
		if (!module) {
			return
		}
		setTimeout(delayRender, 0)

		function delayRender() {
			var bufferingBox = view.querySelector('.nd-plugin-buffering-box')
			var par = view.querySelector('.nd-plugin-buffering-loader')
			var dom = Array.from(par.getElementsByTagName('div'))
			var small_time = data.animation_time / dom.length
			dom.forEach(function(item, index) {
				DD.css(item, 'animation-duration', data.animation_time + 's')
				DD.css(item, 'animation-delay', small_time * index + 's')
				DD.css(item, 'background-color', data.color_1)
				DD.css(item, 'width', 2 * data.radius + 'px')
				DD.css(item, 'height', 2 * data.radius + 'px')
			})
			var bufferingBoxParents = bufferingBox.parentNode.parentNode
			var bufferingBoxWidth = document.defaultView.getComputedStyle(bufferingBoxParents, null).width
			var bufferingBoxHeight = document.defaultView.getComputedStyle(bufferingBoxParents, null).height
			DD.css(bufferingBox, 'width', '300px')
			DD.css(bufferingBox, 'height', bufferingBoxHeight)
			var mask = document.querySelector('.mask')
			DD.css(mask, 'width', bufferingBoxWidth)
			DD.css(mask, 'height', bufferingBoxHeight)
		}
	}

	DD.Plugin.create('buffering', Buffering)

	DD.createModule({
		delayInit: true,
		name: 'm_plugin_download_Animation_1',
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/animation_1/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/animation_1/index.html',
		data: {
			name: '泡泡动画',
			buffering_data: {
				animation_time: 1,
				color_1: '#999999',
				radius: 5
			}
		},
		onBeforeFirstRender: function() {
			var me = this
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data.buffering_data
				if (data.animation_time <= 1) {
					data.animation_time = 1
				}
				var obj = {
					plugin_id: 901,
					js: JSON.stringify({
						animation_time: data.animation_time,
						color_1: data.color_1.replace('#', ''),
						radius: data.radius
					}),
					total: 0,
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})() /**
 * create by xll on 2018/5/11.
 * 加载动画
 */
;(function() {
	var my_download_animation_2 = function() {}
	my_download_animation_2.prototype = {
		init: function(view) {
			var me = this
			var template = `<div class="nd-plugin-loading-2" x-show="show">
                            <div class="spinner">
                                <div class="rect1"></div>
                                <div class="rect2"></div>
                                <div class="rect3"></div>
                                <div class="rect4"></div>
                                <div class="rect5"></div>
                            </div>
                        </div>`
			view.$dataItem = DD.attr(view, 'dataName')
			view.removeAttribute('dataName')
			view.innerHTML = template
		},
		render: function(view) {
			var me = this
			var data = view.$getData().data[view.$dataItem]
			var height = parseInt(data.height)
			var width = parseInt(data.width)
			var color = data.color_1
			var time = parseInt(data.animation_time)
			if (time <= 0) {
				time = 1.5
				data.animation_time = 1.5
			}
			setTimeout(function() {
				me.content = view.querySelector('.spinner')
				me.dom = Array.from(me.content.getElementsByTagName('div'))
				DD.css(me.content, 'width', width + 'px')
				DD.css(me.content, 'height', height + 'px')

				me.dom.forEach(function(i, index) {
					DD.css(i, 'height', height + 'px')
					DD.css(i, 'width', (width - 0.2 * width) / me.dom.length + 'px')
					DD.css(i, 'background-color', color)
					DD.css(i, 'animation-duration', time + 's')
					if (index) {
						DD.css(i, 'animation-delay', time * -1 + index * (time / 10) + 's')
					}
				})
			}, 0)
		}
	}
	DD.Plugin.create('my-download-animation-2', my_download_animation_2)
	DD.createModule({
		name: 'm_plugin_download_Animation_2',
		delayInit: true,
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/animation_2/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/animation_2/index.html',
		data: {
			name: '方块动画',
			buffering_data: {
				width: 80,
				height: 100,
				color_1: '#FDB702',
				animation_time: 1.2
			},
			show: true
		},
		onBeforeFistrRender: function() {
			var me = this
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data.buffering_data
				if (data.animation_time < 0) {
					data.animation_time = 1
				}

				// 方块个数
				var len = document.querySelector('.spinner').children.length
				var obj = {
					plugin_id: 902,
					js: JSON.stringify({
						animation_time: data.animation_time,
						color_1: data.color_1.replace('#', ''),
						height: data.height,
						width: data.width
					}),
					total: 0,
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
;(function() {
	var m_loading_animation_3 = function() {}
	m_loading_animation_3.prototype = {
		init: function(view) {
			var me = this
			var template = `<div class="nd-plugin-buffering-box-3" x-if="buffering_data.show">
                                <div class="nd-plugin-buffering-imgbox">
                                    <div class="nd-plugin-buffering-leftbox">
                                        <div class="nd-plugin-buffering-left"></div>
                                    </div>
                                    <div class="nd-plugin-buffering-rightbox">
                                        <div class="nd-plugin-buffering-right"></div>
                                    </div>
                                </div>
                            </div>`
			view.innerHTML = template
			var data = DD.attr(view, 'dataName') || 'data'
			//数据项名字
			view.$dataItem = data
			//移除showItem
			view.removeAttribute('dataItem')
			//设置innerHTML
			DD.Compiler.compile(view, view.$module)
			view.$forceRender = true
		},
		render: function(view) {
			var me = this
			var data = view.$getData().data[view.$dataItem]
			setTimeout(function() {
				var right = view.querySelector('.nd-plugin-buffering-right')
				var left = view.querySelector('.nd-plugin-buffering-left')
				var rightBox = view.querySelector('.nd-plugin-buffering-rightbox')
				var leftBox = view.querySelector('.nd-plugin-buffering-leftbox')
				var imgBox = view.querySelector('.nd-plugin-buffering-imgbox')
				var color = data.color_1
				var time = parseInt(data.animation_time)
				if (time < 1) time = 2
				DD.css(imgBox, 'width', data.size + 'px')
				DD.css(imgBox, 'height', data.size + 'px')
				DD.css(left, 'animation-duration', time + 's')
				DD.css(left, 'border-left-color', color)
				DD.css(left, 'border-bottom-color', color)
				DD.css(left, 'width', data.size + 'px')
				DD.css(left, 'height', data.size + 'px')
				DD.css(leftBox, 'width', data.size / 2 + 'px')
				DD.css(leftBox, 'height', data.size + 'px')
				DD.css(rightBox, 'width', data.size / 2 + 'px')
				DD.css(rightBox, 'height', data.size + 'px')
				DD.css(rightBox, 'left', data.size / 2 + 'px')
				DD.css(right, 'width', data.size + 'px')
				DD.css(right, 'height', data.size + 'px')
				DD.css(right, 'margin-left', -data.size / 2 + 'px')
				DD.css(right, 'animation-duration', time + 's')
				DD.css(right, 'border-left-color', color)
				DD.css(right, 'border-bottom-color', color)
			}, 0)
		}
	}
	DD.Plugin.create('m-loading-animation-3', m_loading_animation_3)
	DD.createModule({
		name: 'm_plugin_download_Animation_3',
		delayInit: true,
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/animation_3/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/animation_3/index.html',
		data: {
			name: '圆环动画',
			buffering_data: {
				show: true, // 是否显示
				color_1: '#409EFF',
				animation_time: 3,
				size: 64
			}
		},
		onBeforeFirstRender: function() {
			var me = this
			me.data.color_1 = '#409EFF'
			me.data.animation_time = 3
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data.buffering_data
				if (data.animation_time < 0) {
					data.animation_time = 1
				}
				var obj = {
					plugin_id: 903,
					js: JSON.stringify({
						show: true,
						color_1: data.color_1.replace('#', ''),
						animation_time: data.animation_time,
						size: data.size
					}),
					total: 0,
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
;(function() {
	var el_animation_4 = function() {}
	el_animation_4.prototype = {
		init: function(view) {
			var template = `<div class="content">
                              <span class="my_span"></span>
                              <span class="my_span"></span>
                              <span class="my_span"></span>
                              <span class="my_span"></span>
                              <span class="my_span"></span>
			              </div>`
			view.$dataItem = DD.attr(view, 'dataName')
			view.removeAttribute('dataName')
			view.innerHTML = template
		},
		render: function(view) {
			var me = this
			var data = view.$getData().data[view.$dataItem]
			var color = data.color
			var time = data.time
			var height = parseInt(data.height)
			var width = parseInt(data.width)
			setTimeout(function() {
				var span = view.querySelectorAll('.my_span')
				var content = view.querySelector('.content')
				DD.css(content, 'width', width + 'px')
				span.forEach(function(i, index) {
					DD.css(i, 'animation-delay', index * time / 4 + 's')
					DD.css(i, 'background-color', color)
					DD.css(i, 'height', height + 'px')
					DD.css(i, 'width', 0.5 * width / span.length + 'px')
				})
			}, 0)
		}
	}
	DD.Plugin.create('el-animation-4', el_animation_4)
	DD.createModule({
		name: 'm_plugin_download_Animation_4',
		delayInit: true,
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/animation_4/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/animation_4/index.html',
		data: {
			name: '闪烁动画',
			buffering_data: {
				color: '#00bfff',
				time: 0.8,
				width: 150,
				height: 70
			}
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data.buffering_data
				console.log(data)
				if (data.time < 0) {
					data.time = 1
				}
				var obj = {
					plugin_id: 904,
					// class0: JSON.stringify({
					//     names: '.el-animation-4 .content span',
					//     total: 1,
					//     background_color: {
					//         names: 'background-color',
					//         values: data.color.replace("#", "")
					//     }
					// }),
					total: 0,
					js: JSON.stringify({
						time: data.time,
						color: data.color.replace('#', ''),
						width: data.width,
						height: data.height
					}),
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
;(function() {
	var el_animation_5 = function() {}
	el_animation_5.prototype = {
		init: function(view) {
			var template = `<div class="com-loading">
                                <div class="spinner">
                                    <div class="bounce1 small"></div>
                                    <div class="bounce2 small"></div>
                                    <div class="bounce3 small"></div>
                                </div>
                            </div>`
			view.$dataItem = DD.attr(view, 'dataName')
			view.removeAttribute('dataName')
			view.innerHTML = template
		},
		render: function(view) {
			var data = view.$getData().data[view.$dataItem]
			setTimeout(function() {
				var dom = view.querySelectorAll('.small')
				dom.forEach(function(i, index) {
					DD.css(i, 'background-color', data.color)
					DD.css(i, 'animation-delay', data.time / 5 * index + 's')
					DD.css(i, 'width', 2 * data.radius + 'px')
					DD.css(i, 'height', 2 * data.radius + 'px')
				})
			}, 0)
		}
	}
	DD.Plugin.create('animation-5', el_animation_5)
	DD.createModule({
		name: 'm_plugin_download_Animation_5',
		delayInit: true,
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/animation_5/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/animation_5/index.html',
		data: {
			name: '水滴动画',
			buffering_data: {
				color: ' #363636',
				show: true,
				radius: 5
			}
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data.buffering_data
				if (data.time <= 0) {
					data.time = 1
				}
				var obj = {
					plugin_id: 905,
					total: 0,
					js: JSON.stringify({
						color: data.color.replace('#', ''),
						show: true,
						radius: data.radius
					}),
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
;(function() {
	var Animation_6 = function() {}

	Animation_6.prototype.init = function(view) {
		var me = this
		var template = `<div class='nd-plugin-buffering-box-line' style="margin:0 auto">
                            <div class='mask'></div>
                            <div class='nd-plugin-buffering-loader'>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>`
		view.$dataItem = DD.attr(view, 'dataName') || 'data'
		view.innerHTML = template
		view.removeAttribute('dataName')
		DD.Compiler.compile(view, view.$module)
		view.$forceRender = true
	}

	Animation_6.prototype.render = function(view) {
		var me = this
		var data = view.$getData().data[view.$dataItem]
		if (!data) {
			return
		}
		var module
		if (!data.module) {
			module = view.$module
		} else {
			module = data.module
		}
		if (!module) {
			return
		}
		setTimeout(delayRender, 0)

		function delayRender() {
			var bufferingBox = view.querySelector('.nd-plugin-buffering-box-line')
			var par = view.querySelector('.nd-plugin-buffering-loader')
			var dom = Array.from(par.getElementsByTagName('div'))
			var small_time = data.animation_time / dom.length
			dom.forEach(function(item, index) {
				DD.css(item, 'animation-duration', data.animation_time + 's')
				DD.css(item, 'animation-delay', small_time * index + 's')
				DD.css(item, 'background-color', data.color_1)
			})
			var bufferingBoxParents = bufferingBox.parentNode.parentNode
			var bufferingBoxWidth = document.defaultView.getComputedStyle(bufferingBoxParents, null).width
			var bufferingBoxHeight = document.defaultView.getComputedStyle(bufferingBoxParents, null).height
			DD.css(bufferingBox, 'width', '300px')
			DD.css(bufferingBox, 'height', bufferingBoxHeight)
			var mask = document.querySelector('.mask')
			DD.css(mask, 'width', bufferingBoxWidth)
			DD.css(mask, 'height', bufferingBoxHeight)
		}
	}

	DD.Plugin.create('Animation_6', Animation_6)

	DD.createModule({
		name: 'm_plugin_download_Animation_6',
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/animation_6/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/animation_6/index.html',
		delayInit: true,
		data: {
			name: '泡泡动画',
			buffering_data: {
				animation_time: 1,
				color_1: '#999999'
			}
		},
		onBeforeFirstRender: function() {
			var me = this
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data.buffering_data
				if (data.animation_time <= 1) {
					data.animation_time = 1
				}
				var obj = {
					plugin_id: 1706,
					js: JSON.stringify({ animation_time: data.animation_time, color_1: data.color_1.replace('#', '') }),
					total: 0,
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
;(function() {
	var button_list = function() {}
	button_list.prototype = {
		init: function(view) {
			var template = `<div class="nd-plugin-list-1">
    <div x-repeat="list_one" class="list_one">{{value}}</div>
</div>
<div class="nd-plugin-list-2">
    <div x-repeat="list_two" class="list_two">
        <div class="list_i">{{value}}</div>{{name}}
    </div>
</div>
<div class="nd-plugin-list-3">
    <div x-repeat="list_three" class="list_three">
    <div class="list_i">{{value}}</div>
    </div>
</div>`
			view.$dataItem = DD.attr(view, 'dataName')
			view.removeAttribute('dataName')
			view.innerHTML = template
		},
		render: function(view) {
			var data = view.$getData().data
			var color = []
			color.push(data.color_1)
			color.push(data.color_2)
			color.push(data.color_3)
			setTimeout(function() {
				var dom = view.querySelectorAll('.list_one')
				var dom2 = view.querySelectorAll('.list_two')
				var dom3 = view.querySelectorAll('.list_three')
				dom.forEach(function(i, index, arr) {
					DD.css(i, 'background-color', color[index])
					new DD.Event({
						view: i,
						eventName: 'mouseenter',
						handler: function(e, d, v) {
							var color = DD.css(v, 'background-color')
							color.substr(0, color.length - 1)
							color = color.substr(0, color.length - 1) + ',0.5)'
							DD.css(v, 'background-color', color)
						}
					})
					new DD.Event({
						view: i,
						eventName: 'mouseleave',
						handler: function(e, d, v) {
							var color = DD.css(v, 'background-color')
							color = color.substr(0, color.length - 6) + ')'
							DD.css(v, 'background-color', color)
						}
					})
				})
				dom2.forEach(function(i, index, arr) {
					DD.css(i, 'background-color', color[index])
					new DD.Event({
						view: i,
						eventName: 'mouseenter',
						handler: function(e, d, v) {
							var color = DD.css(v, 'background-color')
							color.substr(0, color.length - 1)
							color = color.substr(0, color.length - 1) + ',0.5)'
							DD.css(v, 'background-color', color)
						}
					})
					new DD.Event({
						view: i,
						eventName: 'mouseleave',
						handler: function(e, d, v) {
							var color = DD.css(v, 'background-color')
							color = color.substr(0, color.length - 6) + ')'
							DD.css(v, 'background-color', color)
						}
					})
				})
				dom3.forEach(function(i, index, arr) {
					DD.css(i, 'background-color', color[index])
					new DD.Event({
						view: i,
						eventName: 'mouseenter',
						handler: function(e, d, v) {
							var color = DD.css(v, 'background-color')
							color.substr(0, color.length - 1)
							color = color.substr(0, color.length - 1) + ',0.5)'
							DD.css(v, 'background-color', color)
						}
					})
					new DD.Event({
						view: i,
						eventName: 'mouseleave',
						handler: function(e, d, v) {
							var color = DD.css(v, 'background-color')
							color = color.substr(0, color.length - 6) + ')'
							DD.css(v, 'background-color', color)
						}
					})
				})
			}, 0)
		}
	}
	DD.Plugin.create('button-list', button_list)
	DD.createModule({
		name: 'm_plugin_download_Button_1',
		delayInit: true,
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/button_1/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/button_1/index.html',
		data: {
			name: '按钮列表',
			button_data: {
				list_one: [
					{
						value: '危险'
					},
					{
						value: '警告'
					},
					{
						value: '成功'
					}
				],
				list_two: [
					{
						name: '删除',
						value: 'delete'
					},
					{
						name: '编辑',
						value: 'edit'
					},
					{
						name: '分享',
						value: 'share'
					}
				],
				list_three: [
					{
						value: 'keyboard_arrow_down'
					},
					{
						value: 'keyboard_arrow_up'
					},
					{
						value: 'keyboard_arrow_left'
					}
				],
				color_1: '#e53935',
				color_2: '#ff9800',
				color_3: '#4caf50'
			}
		},
		onBeforeFirstRender: function() {
			var me = this
			me.data.button_data = {
				list_one: [
					{
						value: '危险'
					},
					{
						value: '警告'
					},
					{
						value: '成功'
					}
				],
				list_two: [
					{
						name: '删除',
						value: 'delete'
					},
					{
						name: '编辑',
						value: 'edit'
					},
					{
						name: '分享',
						value: 'share'
					}
				],
				list_three: [
					{
						value: 'keyboard_arrow_down'
					},
					{
						value: 'keyboard_arrow_up'
					},
					{
						value: 'keyboard_arrow_left'
					}
				],
				color_1: '#e53935',
				color_2: '#ff9800',
				color_3: '#4caf50'
			}
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data.button_data
				var obj = {
					plugin_id: 1301,
					total: 0,
					js: JSON.stringify({
						color_1: data.color_1.replace('#', ''),
						color_2: data.color_2.replace('#', ''),
						color_3: data.color_3.replace('#', '')
					}),
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})() //普通轮播图
;(function() {
	var photo = function() {}
	photo.prototype = {
		init: function(view) {
			var template = `<div class='content' x-model='ca_photo' style="width:{{width}}px;height:{{width/2}}px">
        <div class='show' x-class="{'translate':'translate'}">
            <img class='imgs' x-repeat='imgs' src="{{url}}">
        </div>
        <div class='span'>
        <span x-repeat='span'  x-class="{'blight':'blight'}" class='photo-span' x-show="$index!==0" style="width:{{width}}px;height:{{height}}px"></span>
        </div>
       <div class="left"><div class="img-content"></div></div>
      <div class="right"><div class="img-content"></div></div>
    </div>`
			view.$dataItem = DD.attr(view, 'dataName')
			view.removeAttribute('dataName')
			view.innerHTML = template
		},
		render: function(view) {
			var me = this
			me.data = view.$getData().data.ca_photo.imgs
			//me.check_color=view.$getData().data.ca_photo;
			me.drawimage = function() {
				var me = this
				DD.css(me.show, 'transform', 'translateX(' + me.translate + 'px)')
			}
			me.removespan = function() {
				var me = this
				me.span.forEach(function(item) {
					DD.removeClass(item, 'is_check')
				})
			}
			me.addspan = function() {
				if (me.span[me.index]) {
					if (me.index === 0) DD.addClass(me.span[me.data.length - 1], 'is_check')
					else {
						DD.addClass(me.span[me.index], 'is_check')
					}
				}
			}
			me.moveLeft = function() {
				var me = this
				me.translate -= me.imgwidth
				if (me.index > me.data.length - 2) {
					me.index = 0
					DD.css(me.show, 'left', -1 * me.translate - me.imgwidth + 'px')
				}
				me.index++
			}
			me.moveright = function() {
				var me = this
				me.translate += me.imgwidth
				if (me.index === 0) {
					me.index = me.data.length - 2
					DD.css(me.show, 'left', -1 * me.translate - me.imgwidth * (me.data.length - 2) + 'px')
				} else {
					me.index--
				}
			}
			me.updata = function() {
				clearInterval(window.timer_1)
				var my_time = 3000
				if (window.data && window.data.time) {
					my_time = window.data.time
				}
				window.timer_1 = setInterval(function() {
					me.doself(me.flag)
				}, my_time)
			}
			me.doself = function(flag) {
				var me = this
				me.is_can = false
				me.removespan()
				if (flag) {
					me.moveright()
				} else {
					me.moveLeft()
				}
				me.drawimage()
				me.addspan()
			}
			setTimeout(function() {
				view.addEventListener('transitionend', function() {
					me.is_can = true
				})
				me.is_can = false
				me.span = view.querySelectorAll('.photo-span')
				me.imgs = view.querySelectorAll('.imgs')
				me.imgwidth = parseInt(DD.css(view.querySelector('.content'), 'width'))
				me.show = view.querySelector('.show')
				//true为左边滑动
				me.flag = true
				if (view.$getData().data.small_div.right) {
					me.flag = false
				}
				DD.css(me.show, 'width', '' + me.imgwidth * me.data.length + 'px')
				me.index = 1
				DD.css(me.show, 'left', -1 * me.index * me.imgwidth + 'px')
				//开始位移
				me.translate = 0
				for (var i = 0; i < me.data.length; i++) {
					DD.css(me.imgs[i], 'width', '' + me.imgwidth + 'px')
				}
				me.addspan()
				me.updata()
			}, 0)
			new DD.Event({
				eventName: 'swipeleft',
				view: view,
				handler: function(e, data, view) {
					if (me.is_can) {
						me.is_can = false
						clearInterval(window.timer_1)
						me.doself()
						me.updata()
					}
				}
			})
			new DD.Event({
				eventName: 'click',
				view: view.querySelector('.right'),
				handler: function(e, data, view) {
					if (me.is_can) {
						me.is_can = false
						clearInterval(window.timer_1)
						me.doself()
						me.updata()
					}
				}
			})
			new DD.Event({
				eventName: 'click',
				view: view.querySelector('.left'),
				handler: function(e, data, view) {
					if (me.is_can) {
						me.is_can = false
						clearInterval(window.timer_1)
						me.doself(1)
						me.updata()
					}
				}
			})
			new DD.Event({
				eventName: 'swiperight',
				view: view,
				handler: function(e, data, view) {
					if (me.is_can) {
						me.is_can = false
						clearInterval(window.timer_1)
						me.doself(1)
						me.updata()
					}
				}
			})
		}
	}
	DD.Plugin.create('photo', photo)
	DD.createModule({
		name: 'm_plugin_download_Carousel_1',
		delayInit: true,
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/carouse_1/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/carouse_1/index.html',
		onBeforeFirstRender: function() {
			var me = this
			me.data.carousel_data.ca_photo.width = window.innerWidth * 0.5
			me.data.carousel_data.name = '常见轮播图'
			me.data.carousel_data.small_div = {
				check: '#ff6800',
				no_check: '#ffffff',
				width: '8',
				height: '8',
				time: 3,
				left: false,
				right: true
			}
			if (window.timer_1) {
				clearInterval(window.timer_1)
			}
			if (window.timer_2) {
				clearInterval(window.timer_2)
			}
			if (window.timer_3) {
				clearInterval(window.timer_3)
			}
			if (window.timer_4) {
				clearInterval(window.timer_4)
			}
		},
		onRender: function() {
			var me = this
			var tem = parseInt(DD.css(document.querySelector('.router-content'), 'height'))
			if (tem > window.innerHeight - 80) {
				me.module.send('m_plugin_download', {
					upload: false,
					height: tem
				})
			}
		},
		data: {
			name: '常见轮播图',
			carousel_data: {
				ca_photo: {
					width: '',
					check_color: '#ff6800',
					translate: false,
					imgs: [
						{ url: HTMLURL + '/plugin_download/carouse_1/img/1.jpg' },
						{ url: HTMLURL + '/plugin_download/carouse_1/img/2.jpg' },
						{ url: HTMLURL + '/plugin_download/carouse_1/img/3.jpg' },
						{ url: HTMLURL + '/plugin_download/carouse_1/img/4.jpg' },
						{ url: HTMLURL + '/plugin_download/carouse_1/img/5.jpg' },
						{ url: HTMLURL + '/plugin_download/carouse_1/img/1.jpg' }
					],
					span: [
						{ blight: false, width: '', height: '' },
						{ blight: false, width: '', height: '' },
						{ blight: false, width: '', height: '' },
						{ blight: false, width: '', height: '' },
						{ blight: false, width: '', height: '' },
						{ blight: false, width: '', height: '' }
					]
				},
				small_div: {
					check: '#ff6800',
					no_check: '#ffffff',
					width: '8',
					height: '8',
					time: 3,
					left: false
				}
			}
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data.carousel_data
				if (data.small_div.time < 2) {
					data.small_div.time = 3
				}
				var obj = {
					plugin_id: 101,
					js: JSON.stringify({
						time: data.small_div.time * 1000,
						left: data.small_div.left,
						check_color: data.small_div.check.replace('#', ''),
						no_check_color: data.small_div.no_check.replace('#', ''),
						width: data.small_div.width,
						height: data.small_div.height
					}),
					//total是css的数量
					//flag为1表明有js
					total: 0,
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
;(function() {
	var carous = function() {}
	carous.prototype = {
		init: function(view) {
			var tem = `<figure class='carous' x-model='img_ct'>
        <img src="{{url}}" alt="图片" x-repeat='imgs' class='img-trans'>
    </figure>
    <div class="spancont">
    <div class="span" x-model='img_ct'>
            <span class='inline-span' x-repeat='spans'></span>
        </div>
    </div><div class="left"><div class="img-content"></div></div>
  <div class="right"><div class="img-content"></div></div>`
			view.$dataItem = DD.attr(view, 'dataName')
			view.removeAttribute('dataName')
			view.innerHTML = tem
		},
		render: function(view) {
			var me = this
			me.removespan = function() {
				me.span.forEach(function(i) {
					DD.removeClass(i, 'active')
				})
			}
			me.addspan = function() {
				var index = (me.imgs.length - me.count) % me.imgs.length
				if (index < 0) index += me.imgs.length
				DD.addClass(me.span[index], 'active')
			}
			me.updata = function() {
				clearInterval(window.timer_2)
				me.is_can = false
				window.timer_2 = setInterval(function() {
					me.is_can = false
					me.count += me.direct
					me.removespan()
					me.addspan()
					me.content.style.transform = 'rotateY(' + 2 * me.count * Math.PI / me.imgs.length + 'rad)'
				}, 5000)
			}
			//获取旋转的y轴距离
			me.getheight = function() {
				var r = Math.PI * 2
				//rad求出一条边所占的角度
				var rad = r / me.imgs.length
				me.rotateZ = me.imgw / (2 * Math.tan(rad / 2))
			}
			setTimeout(function() {
				window.addEventListener('transitionend', function() {
					me.is_can = true
				})
				me.is_can = false
				me.count = 0
				me.spans = view.querySelector('.span')
				me.content = view.querySelector('.carous')
				me.imgs = view.querySelectorAll('.img-trans')
				me.imgw = parseInt(DD.css(me.imgs[0], 'width'))
				me.span = view.querySelectorAll('.inline-span')
				//1为left -1为right
				if (view.$getData().data.small_div.right) {
					me.direct = 1
				}
				me.direct = -1
				var temp = me.imgs.length * 25
				DD.css(me.spans, 'width', temp + 'px')
				//求出旋转中心点的z坐标
				me.getheight()
				me.content.style.transformOrigin = '50% 50% ' + -1 * me.rotateZ + 'px'
				//transform-origin属性规定了旋转的点
				me.imgs.forEach(function(item, index) {
					//第一张是0不需要设置
					if (index) {
						item.style.transformOrigin = '50% 50% ' + -1 * me.rotateZ + 'px'
					}
					item.style.transform = 'rotateY(' + index * Math.PI * 2 / me.imgs.length + 'rad)'
				})
				me.removespan()
				me.addspan()
				me.updata()
			}, 0)
			new DD.Event({
				eventName: 'swipeleft',
				view: view,
				handler: function() {
					if (me.is_can) {
						clearInterval(window.timer_2)
						me.is_can = false
						me.count--
						me.removespan()
						me.addspan()
						me.content.style.transform = 'rotateY(' + 2 * me.count * Math.PI / me.imgs.length + 'rad)'
						me.updata()
					}
				}
			})
			new DD.Event({
				eventName: 'click',
				view: view.querySelector('.right'),
				handler: function() {
					if (me.is_can) {
						clearInterval(window.timer_2)
						me.is_can = false
						me.count--
						me.removespan()
						me.addspan()
						me.content.style.transform = 'rotateY(' + 2 * me.count * Math.PI / me.imgs.length + 'rad)'
						me.updata()
					}
				}
			})
			new DD.Event({
				eventName: 'swiperight',
				view: view,
				handler: function() {
					if (me.is_can) {
						clearInterval(window.timer_2)
						me.is_can = false
						me.count++
						me.removespan()
						me.addspan()
						me.content.style.transform = 'rotateY(' + 2 * me.count * Math.PI / me.imgs.length + 'rad)'
						me.updata()
					}
				}
			})
			new DD.Event({
				eventName: 'click',
				view: view.querySelector('.left'),
				handler: function() {
					if (me.is_can) {
						clearInterval(window.timer_2)
						me.is_can = false
						me.count++
						me.removespan()
						me.addspan()
						me.content.style.transform = 'rotateY(' + 2 * me.count * Math.PI / me.imgs.length + 'rad)'
						me.updata()
					}
				}
			})
		}
	}
	DD.Plugin.create('carous', carous)
	DD.createModule({
		name: 'm_plugin_download_Carousel_2',
		delayInit: true,
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/carouse_2/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/carouse_2/index.html',
		data: {
			width_data: '',
			name: '',
			carousel_data: {
				width_data: '',
				img_ct: {
					width: '',
					translate: false,
					spans: [{}, {}, {}, {}, {}, {}],
					imgs: [
						{ url: HTMLURL + '/plugin_download/carouse_2/img/1.jpg' },
						{ url: HTMLURL + '/plugin_download/carouse_2/img/2.jpg' },
						{ url: HTMLURL + '/plugin_download/carouse_2/img/3.jpg' },
						{ url: HTMLURL + '/plugin_download/carouse_2/img/4.jpg' },
						{ url: HTMLURL + '/plugin_download/carouse_2/img/2.jpg' },
						{ url: HTMLURL + '/plugin_download/carouse_1/img/1.jpg' }
					]
				},
				small_div: {
					check: '#ff6800',
					no_check: '#ffffff',
					width: '8',
					height: '8',
					time: 5,
					left: true,
					right: false
				}
			}
		},
		onBeforeFirstRender: function() {
			var me = this
			me.data.name = '水平旋转'
			me.data.carousel_data.img_ct.spans.forEach(function(i) {
				i.width = me.data.carousel_data.small_div.width
				i.height = me.data.carousel_data.small_div.height
			})
			me.data.carousel_data.img_ct.$set('spans', me.data.carousel_data.img_ct.spans)
			if (window.timer_1) {
				clearInterval(window.timer_1)
			}
			if (window.timer_2) {
				clearInterval(window.timer_2)
			}
			if (window.timer_3) {
				clearInterval(window.timer_3)
			}
			if (window.timer_4) {
				clearInterval(window.timer_4)
			}
			me.data.carousel_data.small_div.left = true
			me.data.carousel_data.small_div.right = false
		},
		onRender: function() {
			var me = this
			var tem = parseInt(DD.css(document.querySelector('.router-content'), 'height'))
			me.data.width_data = window.innerWidth * 0.5
			me.data.carousel_data.width_data = me.data.width_data
			if (tem > window.innerHeight - 80) {
				me.module.send('m_plugin_download', {
					upload: false,
					height: tem
				})
			}
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data.carousel_data
				if (data.small_div.time < 3) data.small_div.time = 3
				var obj = {
					plugin_id: 102,
					class0: JSON.stringify({
						names: '.carous_ct .spancont .span .inline-span',
						width: {
							names: 'width',
							values: data.small_div.width + 'px'
						},
						height: {
							names: 'height',
							values: data.small_div.height + 'px'
						},
						background: {
							names: 'background-color',
							values: data.small_div.no_check.replace('#', '')
						},
						total: 3
					}),
					class1: JSON.stringify({
						names: '.carous_ct .spancont .span .active',
						background: {
							names: 'background-color',
							values: data.small_div.check.replace('#', '')
						},
						total: 1
					}),
					class2: JSON.stringify({
						names: '.carous',
						transition: {
							names: 'transition',
							values: 'all ' + (data.small_div.time - 2) + 's'
						},
						total: 1
					}),
					js: JSON.stringify({
						time: data.small_div.time * 1000,
						left: data.small_div.left,
						right: data.small_div.right
					}),
					total: 3,
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
;(function() {
	my_plugin_3 = function() {}
	my_plugin_3.prototype = {
		init: function(view) {
			var tem = ` <div class='content' x-model='ca_photo'>
  <div class="img-photo">
       <div  style="background-image: url('{{url}}');background-size:100% 100%" class='img' x-repeat='imgs'></div>
  </div>
  <div style="clear:both"></div>
  <div class='span'>
     <div class='span-cont'>
        <span x-repeat='imgs' class='item-span'></span>
     </div>
  </div>
 <div class="left"><div class="img-content"></div></div>
  <div class="right"><div class="img-content"></div></div>
    </div>`
			view.innerHTML = tem
		},
		render: function(view) {
			var me = this
			me.count = 0
			//标记能够事件
			me.is_can = false
			//由于有数组个translationend事件 用来标记
			me.time_count = 0
			//更新页面
			me.direct = 1
			if (view.$getData().data.small_div.left) {
				me.direct = -1
			}
			me.updata = function() {
				clearInterval(window.timer_3)
				me.is_can = false
				window.timer_3 = setInterval(function() {
					me.is_can = false
					me.count += me.direct
					me.removespan()
					me.addspan()
					me.tem.forEach(function(item, index) {
						item.style.transform = 'rotateX(' + parseInt(360 / me.img_arr.length) * -1 * me.count + 'deg)'
						item.style.transitionDelay = index * 0.3 + 's'
					})
				}, 3000)
			}
			//改变span颜色
			me.addspan = function() {
				var me = this
				var index = me.count % me.img_arr.length
				if (index < 0) {
					index += me.img_arr.length
				}
				me.span[index].classList.add('is_check')
			}
			//去掉span颜色
			me.removespan = function() {
				var me = this
				me.span.forEach(function(item) {
					DD.removeClass(item, 'is_check')
				})
			}
			me.getheight = function() {
				var r = Math.PI * 2
				var rad = r / me.img_arr.length
				me.rotateZ = me.imgh / (2 * Math.tan(rad / 2))
			}
			//在渲染完毕开始执行
			setTimeout(function() {
				window.addEventListener('transitionend', function() {
					me.time_count += me.direct
					if (me.time_count === me.tem.length) {
						me.is_can = true
						me.time_count = 0
					}
				})
				//span数组
				me.span = view.querySelectorAll('.item-span')
				me.spans = view.querySelector('.span-cont')
				var temp = me.span.length * 25
				//获取容器高度用来呈现3d效果
				me.imgh = parseInt(DD.css(view.querySelector('.content'), 'height'))
				//imgs下面的小数组
				me.tem = view.querySelectorAll('.img-photo')
				//操作小数组下面的元素
				me.tem.forEach(function(item, index) {
					me.img_arr = Array.from(item.getElementsByTagName('DIV'))
					me.getheight()
					me.img_arr.forEach(function(i, d, a) {
						i.style.transform =
							'rotateX(' + d * parseInt(360 / a.length) + 'deg) translateZ(' + me.rotateZ + 'px)'
					})
				})
				//初始化第一个span
				me.addspan()
				//更新页面
				me.updata()
			}, 0)
			new DD.Event({
				eventName: 'swiperight',
				view: view,
				handler: function(e, data, view) {
					if (me.is_can) {
						me.is_can = false
						clearInterval(window.timer_3)
						me.removespan()
						me.count--
						me.addspan()
						me.tem.forEach(function(item, index) {
							item.style.transform =
								'rotateX(' + parseInt(360 / me.img_arr.length) * -1 * me.count + 'deg)'
							item.style.transitionDelay = index * 0.3 + 's'
						})
						me.updata()
					}
				}
			})
			new DD.Event({
				eventName: 'click',
				view: view.querySelector('.left'),
				handler: function(e, data, view) {
					if (me.is_can) {
						me.is_can = false
						clearInterval(window.timer_3)
						me.removespan()
						me.count--
						me.addspan()
						me.tem.forEach(function(item, index) {
							item.style.transform =
								'rotateX(' + parseInt(360 / me.img_arr.length) * -1 * me.count + 'deg)'
							item.style.transitionDelay = index * 0.3 + 's'
						})
						me.updata()
					}
				}
			})
			new DD.Event({
				eventName: 'swipeleft',
				view: view,
				handler: function(e, data, view) {
					if (me.is_can) {
						me.is_can = false
						me.removespan()
						clearInterval(window.timer_3)
						me.count++
						me.removespan()
						me.addspan()
						me.tem.forEach(function(item, index) {
							item.style.transform =
								'rotateX(' + parseInt(360 / me.img_arr.length) * -1 * me.count + 'deg)'
							item.style.transitionDelay = index * 0.3 + 's'
						})
						me.updata()
					}
				}
			})
			new DD.Event({
				eventName: 'click',
				view: view.querySelector('.right'),
				handler: function(e, data, view) {
					if (me.is_can) {
						me.is_can = false
						me.removespan()
						clearInterval(window.timer_3)
						me.count++
						me.removespan()
						me.addspan()
						me.tem.forEach(function(item, index) {
							item.style.transform =
								'rotateX(' + parseInt(360 / me.img_arr.length) * -1 * me.count + 'deg)'
							item.style.transitionDelay = index * 0.3 + 's'
						})
						me.updata()
					}
				}
			})
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
	}
	DD.Plugin.create('my_plugin_3', my_plugin_3)
	DD.createModule({
		name: 'm_plugin_download_Carousel_3',
		delayInit: true,
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/carouse_3/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/carouse_3/index.html',
		data: {
			name: '',
			width_data: '',
			carousel_data: {
				width_data: '',
				ca_photo: {
					width: '',
					translate: false,
					imgs: [
						{ url: HTMLURL + '/plugin_download/carouse_3/img/1.jpg' },
						{ url: HTMLURL + '/plugin_download/carouse_3/img/2.jpg' },
						{ url: HTMLURL + '/plugin_download/carouse_3/img/3.jpg' },
						{ url: HTMLURL + '/plugin_download/carouse_3/img/4.jpg' }
					]
				},
				small_div: {
					check: '#ff6800',
					no_check: '#ffffff',
					width: '8',
					height: '8',
					time: 3,
					left: false,
					right: true
				}
			}
		},
		onBeforeFirstRender: function() {
			var me = this
			me.data.name = '垂直轮播图'
			if (window.timer_1) {
				clearInterval(window.timer_1)
			}
			if (window.timer_2) {
				clearInterval(window.timer_2)
			}
			if (window.timer_4) {
				clearInterval(window.timer_4)
			}
			if (window.timer_3) {
				clearInterval(window.timer_3)
			}
			me.data.carousel_data = {
				width_data: '',
				ca_photo: {
					width: '',
					translate: false,
					imgs: [
						{ url: HTMLURL + '/plugin_download/carouse_3/img/1.jpg' },
						{ url: HTMLURL + '/plugin_download/carouse_3/img/2.jpg' },
						{ url: HTMLURL + '/plugin_download/carouse_3/img/3.jpg' },
						{ url: HTMLURL + '/plugin_download/carouse_3/img/4.jpg' }
					]
				},
				small_div: {
					check: '#ff6800',
					no_check: '#ffffff',
					width: '8',
					height: '8',
					time: 3,
					left: false,
					right: true
				}
			}
		},
		onRender: function() {
			var me = this
			var tem = parseInt(DD.css(document.querySelector('.router-content'), 'height'))
			me.data.width_data = window.innerWidth * 0.5
			me.data.carousel_data.width_data = me.data.width_data
			if (tem > window.innerHeight - 80) {
				me.module.send('m_plugin_download', {
					upload: false,
					height: tem
				})
			}
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data.carousel_data
				if (data.small_div.time < 3) {
					data.small_div.time = 3
				}
				var obj = {
					plugin_id: 103,
					class0: JSON.stringify({
						names: '.el-plugin .plugin .content .span .span-cont span .item-span',
						width: {
							names: 'width',
							values: data.small_div.width + 'px'
						},
						height: {
							names: 'height',
							values: data.small_div.height + 'px'
						},
						background: {
							names: 'background-color',
							values: data.small_div.no_check.replace('#', '')
						},
						total: 3
					}),
					class1: JSON.stringify({
						names: '.el-plugin .plugin .content .span .span-cont .is_check',
						background: {
							names: 'background-color',
							values: data.small_div.check.replace('#', '')
						},
						total: 1
					}),
					class2: JSON.stringify({
						names: '.el-plugin .plugin .content .img-photo',
						transition: {
							names: 'transition',
							values: 'all ' + (data.small_div.time - 1) + 's'
						},
						total: 1
					}),
					js: JSON.stringify({
						time: data.small_div.time * 1000,
						left: data.small_div.left,
						right: data.small_div.right
					}),
					total: 3,
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
;(function() {
	my_plugin_4 = function() {}
	my_plugin_4.prototype = {
		init: function(view) {
			var me = this
			var tem = ` <div class='content' x-model='ca_photo'>
  <div class="img-photo" x-repeat="imgs">
    <div src="{{url}}" alt='图片库' x-repeat='img_item' style="background-image: url('{{url}}');background-size:100% 100%" class='img'></div>
  </div>
  <div style="clear:both"></div>
  <div class='span'>
     <div class='span-cont'>
        <span x-repeat='span' class='item-span' style="width:{{width}}px;height:{{height}}px"></span>
     </div>
  </div>
  <div class="left"><div class="img-content"></div></div>
  <div class="right"><div class="img-content"></div></div>
    </div>`
			view.innerHTML = tem
			me.flag = 1
		},
		render: function(view) {
			console.log(11111)
			var me = this
			me.one = view.$getData().data
			me.count = 0
			//标记能够事件
			me.is_can = false
			//由于有数组个translationend事件 用来标记
			me.time_count = 0
			//更新页面
			me.updata = function() {
				clearInterval(window.timer_4)
				me.is_can = false
				window.timer_4 = setInterval(function() {
					me.is_can = false
					me.count += me.dx
					me.removespan()
					me.addspan()
					me.tem.forEach(function(item, index) {
						item.style.transform = 'rotateX(' + parseInt(360 / me.tem.length) * -1 * me.count + 'deg)'
						item.style.transitionDelay = index * 0.3 + 's'
					})
				}, 3000)
			}
			//改变span颜色
			me.addspan = function() {
				var me = this
				var index = me.count % me.tem.length
				if (index < 0) {
					index += me.tem.length
				}
				me.span[index].classList.add('is_check')
			}
			//去掉span颜色
			me.removespan = function() {
				var me = this
				me.span.forEach(function(item) {
					DD.removeClass(item, 'is_check')
				})
			}
			//在渲染完毕开始执行dx为1是下滑
			me.dx = 1
			if (view.$getData().data.small_div.up) {
				me.dx = -1
			}

			setTimeout(function() {
				window.addEventListener('transitionend', function() {
					me.time_count++
					if (me.time_count === me.tem.length * 2) {
						me.is_can = true
						me.time_count = 0
					}
				})
				//span数组
				me.span = view.querySelector('.span-cont').querySelectorAll('.item-span')
				//获取容器高度用来呈现3d效果
				me.imgh = parseInt(DD.css(view.querySelector('.content'), 'height'))
				//imgs下面的小数组
				me.tem = view.querySelectorAll('.img-photo')
				//操作小数组下面的元素
				me.tem.forEach(function(i) {
					i.style.transitionDelay = i * 0.3 + 's'
					var arr = Array.from(i.getElementsByTagName('DIV'))
					arr.forEach(function(item, index) {
						item.style.transform =
							'rotateX(' +
							index * parseInt(360 / me.tem.length) +
							'deg) translateZ(' +
							me.imgh / 2 +
							'px)'
					})
				})
				//初始化第一个span
				me.addspan()
				//更新页面
				me.updata()
			}, 0)
			new DD.Event({
				eventName: 'swiperight',
				view: view,
				handler: function(e, data, view) {
					if (me.is_can) {
						me.is_can = false
						clearInterval(window.timer_4)
						me.removespan()
						me.count--
						me.addspan()
						me.tem.forEach(function(item, index) {
							item.style.transform = 'rotateX(' + parseInt(360 / me.tem.length) * -1 * me.count + 'deg)'
							item.style.transitionDelay = index * 0.3 + 's'
						})
						me.updata()
					}
				}
			})
			new DD.Event({
				eventName: 'swipeleft',
				view: view,
				handler: function(e, data, view) {
					if (me.is_can) {
						me.is_can = false
						me.removespan()
						clearInterval(window.timer_4)
						me.count++
						me.removespan()
						me.addspan()
						me.tem.forEach(function(item, index) {
							item.style.transform = 'rotateX(' + parseInt(360 / me.tem.length) * -1 * me.count + 'deg)'
							item.style.transitionDelay = index * 0.3 + 's'
						})
						me.updata()
					}
				}
			})
			new DD.Event({
				eventName: 'click',
				view: view.querySelector('.right'),
				handler: function(e, data, view) {
					if (me.is_can) {
						me.is_can = false
						me.removespan()
						clearInterval(window.timer_4)
						me.count++
						me.removespan()
						me.addspan()
						me.tem.forEach(function(item, index) {
							item.style.transform = 'rotateX(' + parseInt(360 / me.tem.length) * -1 * me.count + 'deg)'
							item.style.transitionDelay = index * 0.3 + 's'
						})
						me.updata()
					}
				}
			})
			new DD.Event({
				eventName: 'click',
				view: view.querySelector('.left'),
				handler: function(e, data, view) {
					if (me.is_can) {
						me.is_can = false
						clearInterval(window.timer_4)
						me.removespan()
						me.count--
						me.addspan()
						me.tem.forEach(function(item, index) {
							item.style.transform = 'rotateX(' + parseInt(360 / me.tem.length) * -1 * me.count + 'deg)'
							item.style.transitionDelay = index * 0.3 + 's'
						})
						me.updata()
					}
				}
			})
		}
	}
	DD.Plugin.create('my_plugin_4', my_plugin_4)
	DD.createModule({
		name: 'm_plugin_download_Carousel_4',
		delayInit: true,
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/carouse_4/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/carouse_4/index.html',
		data: {
			base_url: '/plugin_set/public/view/plugin_download/carouse_4/img/',
			width_data: '',
			name: '',
			carousel_data: {
				width_data: '',
				one: 1,
				ca_photo: {
					one: true,
					width: '',
					translate: false,
					imgs: [
						{
							img_item: [
								{ url: 'img/4.jpg' },
								{ url: 'img/8.jpg' },
								{ url: 'img/12.jpg' },
								{ url: 'img/16.jpg' }
							]
						},
						{
							img_item: [
								{ url: 'img/3.jpg' },
								{ url: 'img/7.jpg' },
								{ url: 'img/11.jpg' },
								{ url: 'img/15.jpg' }
							]
						},
						{
							img_item: [
								{ url: 'img/2.jpg' },
								{ url: 'img/6.jpg' },
								{ url: 'img/10.jpg' },
								{ url: 'img/14.jpg' }
							]
						},
						{
							img_item: [
								{ url: 'img/1.jpg' },
								{ url: 'img/5.jpg' },
								{ url: 'img/9.jpg' },
								{ url: 'img/13.jpg' }
							]
						}
					],
					span: [{}, {}, {}, {}]
				},
				small_div: {
					check: '#ff6800',
					no_check: '#ffffff',
					width: '8',
					height: '8',
					time: 3,
					up: true,
					down: false
				}
			}
		},
		onBeforeFirstRender: function() {
			var me = this
			me.data.name = '3d轮播图'
			me.data.carousel_data.ca_photo.imgs.forEach(function(i, inde) {
				i.img_item.forEach(function(item, index) {
					//图片url地址赋值
					item.url = me.data.base_url + ((index + 1) * 4 - inde) + '.jpg'
				})
			})
			me.data.carousel_data.ca_photo.span.forEach(function(i) {
				i.width = 8
				i.height = 8
			})
			me.data.carousel_data.small_div = {
				check: '#ff6800',
				no_check: '#ffffff',
				width: '8',
				height: '8',
				time: 3,
				up: true,
				down: false
			}
			if (window.timer_1) {
				clearInterval(window.timer_1)
			}
			if (window.timer_2) {
				clearInterval(window.timer_2)
			}
			if (window.timer_3) {
				clearInterval(window.timer_3)
			}
			if (window.timer_4) {
				clearInterval(window.timer_4)
			}
		},
		onRender: function() {
			var me = this
			var tem = parseInt(DD.css(document.querySelector('.router-content'), 'height'))
			me.data.width_data = window.innerWidth * 0.5
			me.data.carousel_data.width_data = me.data.width_data
			if (tem > window.innerHeight - 80) {
				me.module.send('m_plugin_download', {
					upload: false,
					height: tem
				})
			}
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data.carousel_data
				if (data.small_div.time < 3) {
					data.small_div.time = 3
				}
				var obj = {
					plugin_id: 104,
					class0: JSON.stringify({
						names: '.el-plugin .plugin .content .span .span-cont .photo-span',
						width: {
							names: 'width',
							values: data.small_div.width + 'px'
						},
						height: {
							names: 'height',
							values: data.small_div.height + 'px'
						},
						background: {
							names: 'background-color',
							values: data.small_div.no_check.replace('#', '')
						},
						total: 3
					}),
					class1: JSON.stringify({
						names: '.el-plugin .plugin .content .span .span-cont .is_check',
						background: {
							names: 'background-color',
							values: data.small_div.check.replace('#', '')
						},
						total: 1
					}),
					js: JSON.stringify({
						time: data.small_div.time * 1000,
						up: data.small_div.up,
						down: data.small_div.down
					}),
					total: 2,
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
DD.createModule({
	name: 'm_plugin_download_Chart_1',
	delayInit: true,
	requires: [{ type: 'css', path: HTMLURL + '/plugin_download/chart_1/css/index.css' }],
	templateUrl: HTMLURL + '/plugin_download/chart_1/index.html',
	data: {
		line: {
			title: '折线图',
			legend: '',
			marker: false,
			titleColor: '#000000',
			gridLine: 0,
			gridLineColor: '#cccccc',
			legends: [
				{ value: '', text: '无' },
				{ value: 'top', text: '顶部' },
				{ value: 'right', text: '右侧' },
				{ value: 'bottom', text: '底部' }
			],
			lines: [
				{ value: 0, text: '无' },
				{ value: 1, text: '横向' },
				{ value: 2, text: '纵向' },
				{ value: 3, text: '全部' }
			],
			data: [
				{
					title: '成都店',
					datas: [
						{ x: '1月', y: 300 },
						{ x: '2月', y: 320 },
						{ x: '3月', y: 280 },
						{ x: '4月', y: 250 },
						{ x: '5月', y: 300 },
						{ x: '6月', y: 380 }
					]
				},
				{
					title: '北京店',
					datas: [
						{ x: '1月', y: 900 },
						{ x: '2月', y: 820 },
						{ x: '3月', y: 880 },
						{ x: '4月', y: 850 },
						{ x: '5月', y: 900 },
						{ x: '6月', y: 980 }
					]
				},
				{
					title: '上海店',
					datas: [
						{ x: '1月', y: 600 },
						{ x: '2月', y: 520 },
						{ x: '3月', y: 580 },
						{ x: '4月', y: 550 },
						{ x: '5月', y: 600 },
						{ x: '6月', y: 680 }
					]
				}
			],
			addTitle: '',
			addData: ''
		}
	},
	methods: {
		ensure: function(e, data, view) {
			var me = this
			var obj = {
				plugin_id: 1701,
				total: 0,
				js: JSON.stringify({
					titleColor: me.data.line.titleColor.replace('#', ''),
					marker: me.data.line.marker,
					gridLineColor: me.data.line.gridLineColor.replace('#', ''),
					gridLine: me.data.line.gridLine,
					legend: me.data.line.legend + ''
				}),
				flag: 1
			}
			if (view.innerHTML.indexOf('Less') > -1) {
				obj.isLess = true
			} else {
				obj.isLess = false
			}
			me.module.send('m_plugin_download', {
				upload: true,
				obj: obj
			})
		},
		changeTitleColor(e, data, view) {
			data.titleColor = e.target.value
		},
		changeLegend(e, data, view) {
			data.legend = e.target.value
		},
		changeMarker(e, data, view) {
			data.marker = e.target.checked
		},
		changeLine(e, data) {
			data.gridLine = e.target.value
		},
		changeLineColor(e, data) {
			var me = this
			data.gridLineColor = e.target.value
		}
	}
})
DD.createModule({
	name: 'm_plugin_download_Chart_2',
	delayInit: true,
	requires: [{ type: 'css', path: HTMLURL + '/plugin_download/chart_2/css/index.css' }],
	templateUrl: HTMLURL + '/plugin_download/chart_2/index.html',
	data: {
		histogram: {
			title: '直方图',
			legend: '',
			marker: false,
			titleColor: '#000000',
			legend: '',
			gridLine: 0,
			gridLineColor: '#cccccc',
			legends: [
				{ value: '', text: '无' },
				{ value: 'top', text: '顶部' },
				{ value: 'right', text: '右侧' },
				{ value: 'bottom', text: '底部' }
			],
			lines: [
				{ value: 0, text: '无' },
				{ value: 1, text: '横向' },
				{ value: 2, text: '纵向' },
				{ value: 3, text: '全部' }
			],
			data: [
				{
					title: '成都店',
					datas: [
						{ x: '1月', y: 300 },
						{ x: '2月', y: 320 },
						{ x: '3月', y: 280 },
						{ x: '4月', y: 250 },
						{ x: '5月', y: 300 },
						{ x: '6月', y: 380 }
					]
				},
				{
					title: '北京店',
					datas: [
						{ x: '1月', y: 900 },
						{ x: '2月', y: 820 },
						{ x: '3月', y: 880 },
						{ x: '4月', y: 850 },
						{ x: '5月', y: 900 },
						{ x: '6月', y: 980 }
					]
				},
				{
					title: '上海店',
					datas: [
						{ x: '1月', y: 600 },
						{ x: '2月', y: 520 },
						{ x: '3月', y: 580 },
						{ x: '4月', y: 550 },
						{ x: '5月', y: 600 },
						{ x: '6月', y: 680 }
					]
				}
			],
			addTitle: '',
			addData: ''
		}
	},
	methods: {
		ensure: function(e, data, view) {
			var me = this
			var obj = {
				plugin_id: 1702,
				total: 0,
				js: JSON.stringify({
					titleColor: me.data.histogram.titleColor.replace('#', ''),
					gridLineColor: me.data.histogram.gridLineColor.replace('#', ''),
					gridLine: me.data.histogram.gridLine,
					legend: me.data.histogram.legend + ''
				}),
				flag: 1
			}
			if (view.innerHTML.indexOf('Less') > -1) {
				obj.isLess = true
			} else {
				obj.isLess = false
			}
			me.module.send('m_plugin_download', {
				upload: true,
				obj: obj
			})
		},
		changeTitleColor(e, data, view) {
			data.titleColor = e.target.value
		},
		changeLegend(e, data, view) {
			data.legend = e.target.value
		},
		changeLine(e, data) {
			data.gridLine = e.target.value
		},
		changeLineColor(e, data) {
			data.gridLineColor = e.target.value
		}
	}
})
DD.createModule({
	name: 'm_plugin_download_Chart_3',
	delayInit: true,
	requires: [{ type: 'css', path: HTMLURL + '/plugin_download/chart_3/css/index.css' }],
	templateUrl: HTMLURL + '/plugin_download/chart_3/index.html',
	data: {
		pie: {
			title: '饼状图',
			legend: '',
			titleColor: '#000000',
			showPercent: true,
			showText: true,
			legends: [
				{ value: '', text: '无' },
				{ value: 'top', text: '顶部' },
				{ value: 'right', text: '右侧' },
				{ value: 'bottom', text: '底部' }
			],
			data: [
				{ value: 300, title: '数据一' },
				{ value: 800, title: '数据二' },
				{ value: 600, title: '数据三' },
				{ value: 100, title: '数据四' },
				{ value: 400, title: '数据五' },
				{ value: 450, title: '数据六' }
			],
			addTitle: '',
			addData: ''
		}
	},
	methods: {
		ensure: function(e, data, view) {
			var me = this
			var obj = {
				plugin_id: 1703,
				total: 0,
				js: JSON.stringify({
					titleColor: me.data.pie.titleColor.replace('#', ''),
					legend: me.data.pie.legend + ''
				}),
				flag: 1
			}
			if (view.innerHTML.indexOf('Less') > -1) {
				obj.isLess = true
			} else {
				obj.isLess = false
			}
			me.module.send('m_plugin_download', {
				upload: true,
				obj: obj
			})
		},
		changeTitleColor(e, data, view) {
			data.titleColor = e.target.value
		},
		changeLegend(e, data, view) {
			data.legend = e.target.value
		}
	}
})
DD.createModule({
	name: 'm_plugin_download_Chart_4',
	delayInit: true,
	requires: [{ type: 'css', path: HTMLURL + '/plugin_download/chart_4/css/index.css' }],
	templateUrl: HTMLURL + '/plugin_download/chart_4/index.html',
	data: {
		scatter: {
			title: '散点图',
			legend: '',
			marker: false,
			titleColor: '#000000',
			symbolSize: 12,
			gridLine: 0,
			gridLineColor: '#cccccc',
			legends: [
				{ value: '', text: '无' },
				{ value: 'top', text: '顶部' },
				{ value: 'right', text: '右侧' },
				{ value: 'bottom', text: '底部' }
			],
			lines: [
				{ value: 0, text: '无' },
				{ value: 1, text: '横向' },
				{ value: 2, text: '纵向' },
				{ value: 3, text: '全部' }
			],
			data: [
				{
					title: '测试',
					datas: [
						{ x: 10.0, y: 8.04 },
						{ x: 8.0, y: 6.95 },
						{ x: 13.0, y: 7.58 },
						{ x: 9.0, y: 8.81 },
						{ x: 11.0, y: 8.33 },
						{ x: 14.0, y: 9.96 },
						{ x: 6.0, y: 7.24 },
						{ x: 4.0, y: 4.26 },
						{ x: 12.0, y: 10.84 },
						{ x: 7.0, y: 4.82 },
						{ x: 5.0, y: 5.68 }
					],
					cs: 8
				}
			],
			addX: '',
			addY: ''
		}
	},
	methods: {
		ensure: function(e, data, view) {
			var me = this
			var obj = {
				plugin_id: 1704,
				total: 0,
				js: JSON.stringify({
					titleColor: me.data.scatter.titleColor.replace('#', ''),
					legend: me.data.scatter.legend + '',
					gridLine: me.data.scatter.gridLine,
					gridLineColor: me.data.scatter.gridLineColor.replace('#', ''),
					cs: me.data.scatter.data.cs,
					symbolSize: me.data.scatter.symbolSize
				}),
				flag: 1
			}
			if (view.innerHTML.indexOf('Less') > -1) {
				obj.isLess = true
			} else {
				obj.isLess = false
			}
			me.module.send('m_plugin_download', {
				upload: true,
				obj: obj
			})
		},
		changeTitleColor(e, data, view) {
			data.titleColor = e.target.value
		},
		changeLegend(e, data, view) {
			data.legend = e.target.value
		},
		changeLine(e, data) {
			data.gridLine = e.target.value
		},
		changeLineColor(e, data) {
			data.gridLineColor = e.target.value
		}
	}
})
DD.createModule({
	name: 'm_plugin_download_Chart_5',
	delayInit: true,
	requires: [{ type: 'css', path: HTMLURL + '/plugin_download/chart_5/css/index.css' }],
	templateUrl: HTMLURL + '/plugin_download/chart_5/index.html',
	data: {
		radar: {
			title: '雷达图实例',
			legend: 'right',
			marker: true,
			titleColor: '#000000',
			legends: [
				{ value: '', text: '无' },
				{ value: 'top', text: '顶部' },
				{ value: 'right', text: '右侧' },
				{ value: 'bottom', text: '底部' }
			],
			radar: {
				titles: ['顶点一', '顶点二', '顶点三', '顶点四', '顶点五', '顶点六'],
				colors: ['#e6e6e6', '#f5f5f5'],
				lineColor: '#ccc'
			},
			data: [
				{
					title: '111',
					datas: [93, 55, 45, 78, 66, 45]
				},
				{
					title: '555',
					datas: [45, 79, 79, 88, 93, 67]
				}
			],
			addTitle: '',
			addData: '',
			changeColors: ''
		}
	},
	methods: {
		ensure: function(e, data, view) {
			var me = this
			var obj = {
				plugin_id: 1705,
				total: 0,
				js: JSON.stringify({
					titleColor: me.data.radar.titleColor.replace('#', ''),
					legend: `${me.data.radar.legend}`,
					marker: me.data.radar.marker,
					lineColor: me.data.radar.radar.lineColor.replace('#', ''),
					changeColors: me.data.radar.changeColors.replace('#', '')
				}),
				flag: 1
			}
			if (view.innerHTML.indexOf('Less') > -1) {
				obj.isLess = true
			} else {
				obj.isLess = false
			}
			me.module.send('m_plugin_download', {
				upload: true,
				obj: obj
			})
		},
		changeTitleColor(e, data, view) {
			data.titleColor = e.target.value
		},
		changeLegend(e, data, view) {
			data.legend = e.target.value
		},
		changeRadarLineColor(e, data) {
			var radar = DD.clone(data.radar)
			radar.lineColor = e.target.value
			data.radar = radar
		},
		changeRadarColors(e, data) {
			var radar = DD.clone(data.radar)
			radar.colors = data.changeColors.split(' ')
			data.radar = radar
		}
	}
})
;(function() {
	var checkBox = function() {}
	checkBox.prototype = {
		init: function(view) {
			var template = `<div class="check-content">
                                <div class="check">
                                    <div class="check-center"></div>
                                </div>
	                        </div>`
			view.innerHTML = template
			var data = DD.attr(view, 'dataName') || 'data'
			//数据项名字
			view.$dataItem = data
			//移除showItem
			view.removeAttribute('dataName')
			//设置innerHTML
			DD.Compiler.compile(view, view.$module)
			view.$forceRender = true
		},
		render: function(view) {
			var me = this
			var data = view.$getData().data[view.$dataItem]
			setTimeout(function() {
				me.check = view.querySelector('.check')
				var checkCenter = view.querySelector('.check-center')
				DD.css(me.check, 'width', data.size + 'px')
				DD.css(me.check, 'height', data.size + 'px')
				if (data.is_circle) {
					DD.css(me.check, 'border-radius', '100%')
					DD.css(checkCenter, 'border-radius', '100%')
				} else {
					DD.css(me.check, 'border-radius', 0)
					DD.css(checkCenter, 'border-radius', 0)
				}

				if (data.is_check) {
					DD.css(me.check, 'background-color', data.check_color)
				} else {
					DD.css(me.check, 'background-color', data.no_check_color)
				}
				new DD.Event({
					view: me.check,
					eventName: 'click',
					handler: function() {
						data.is_check = !data.is_check
					}
				})
			}, 0)
		}
	}
	DD.Plugin.create('checkBox-1', checkBox)
	DD.createModule({
		delayInit: true,
		name: 'm_plugin_download_Checkbox_1',
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/checkbox_1/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/checkbox_1/index.html',
		data: {
			name: '普通选择框',
			check_data: {
				check_color: '#26a2ff',
				no_check_color: '#ffffff',
				empty_color: '#cccccc',
				is_check: false,
				is_circle: false,
				size: 20
			}
		},
		onBeforeFirseRender: function() {
			var me = this
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data.check_data
				var obj = {
					plugin_id: 1201,
					total: 0,
					js: JSON.stringify({
						is_circle: me.data.check_data.is_circle,
						check_color: me.data.check_data.check_color.replace('#', ''),
						no_check_color: me.data.check_data.no_check_color.replace('#', ''),
						empty_color: me.data.check_data.empty_color.replace('#', ''),
						is_check: me.data.check_data.is_check,
						size: me.data.check_data.size
					}),
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
;(function() {
	var check_list = function() {}
	check_list.prototype = {
		init: function(view) {
			var template = `<div class="check-one">
    <div class="item" x-class="{'check':'yes'}">
        <svg id="_san_41014" class="fill" viewBox="0 0 24 24">
            <path id="_san_2038" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
        </svg>
    </div>
    <div class="item" x-class="{'no-check':'!yes'}">
        <svg id="_san_2030" class="fill" viewBox="0 0 24 24">
            <path id="_san_2032" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
        </svg>
    </div>
</div>
<div class="check-two">
    <div x-class="{'check':'yes_1'}">
        favorite
    </div>
    <div x-class="{'no-check':'!yes_1'}">
        favorite_border
    </div>
</div>
<div class="check-three">
    <div x-class="{'check':'yes_2'}">
        visibility_off
    </div>
    <div x-class="{'no-check':'!yes_2'}">
        visibility
    </div>
</div>
<div class="check-four">
    <div class="item" x-class="{'no-check':true}">
        <svg id="_san_2030" class="fill" viewBox="0 0 24 24">
            <path id="_san_2032" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
        </svg>
    </div>
</div>
<div class="check-five">
    <div class="item" x-class="{'check':true}">
        <svg id="_san_41014" class="fill" viewBox="0 0 24 24">
            <path id="_san_2038" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
        </svg>
    </div>
</div>`
			view.innerHTML = template
		},
		render: function(view) {
			setTimeout(function() {
				new DD.Event({
					view: view.querySelector('.check-one'),
					eventName: 'click',
					handler: function(e, d, v) {
						var me = this
						me.data.checkbox_data.yes = !me.data.checkbox_data.yes
					}
				})
				new DD.Event({
					view: view.querySelector('.check-two'),
					eventName: 'click',
					handler: function(e, d, v) {
						var me = this
						me.data.checkbox_data.yes_1 = !me.data.checkbox_data.yes_1
					}
				})
				new DD.Event({
					view: view.querySelector('.check-three'),
					eventName: 'click',
					handler: function(e, d, v) {
						var me = this
						me.data.checkbox_data.yes_2 = !me.data.checkbox_data.yes_2
					}
				})
			}, 0)
		}
	}
	DD.Plugin.create('check_list', check_list)
	DD.createModule({
		name: 'm_plugin_download_Checkbox_2',
		delayInit: true,
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/checkbox_2/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/checkbox_2/index.html',
		data: {
			name: '炫酷选择框',
			checkbox_data: {
				yes: true,
				yes_1: true,
				yes_2: true,
				check_color: '#03a9f4',
				no_check_color: '#000000'
			}
		},
		onBeforeFirstRender: function() {
			var me = this
			me.data.checkbox_data = {
				yes: true,
				yes_1: true,
				yes_2: true,
				check_color: '#03a9f4',
				no_check_color: '#000000'
			}
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data.checkbox_data
				var obj = {
					plugin_id: 1202,
					total: 6,
					class0: JSON.stringify({
						names: '.nd-plugin-check-list .content-check .check-one .check',
						background: {
							names: 'color',
							values: data.check_color.replace('#', '')
						},
						total: 1
					}),
					class1: JSON.stringify({
						names: '.nd-plugin-check-list .content-check .check-two .check',
						background: {
							names: 'color',
							values: data.check_color.replace('#', '')
						},
						total: 1
					}),
					class2: JSON.stringify({
						names: '.nd-plugin-check-list .content-check .check-three .check',
						background: {
							names: 'color',
							values: data.check_color.replace('#', '')
						},
						total: 1
					}),
					class3: JSON.stringify({
						names: '.nd-plugin-check-list .content-check .check-one .no-check',
						background: {
							names: 'color',
							values: data.no_check_color.replace('#', '')
						},
						total: 1
					}),
					class4: JSON.stringify({
						names: '.nd-plugin-check-list .content-check .check-two .no-check',
						background: {
							names: 'color',
							values: data.no_check_color.replace('#', '')
						},
						total: 1
					}),
					class5: JSON.stringify({
						names: '.nd-plugin-check-list .content-check .check-three .no-check',
						background: {
							names: 'color',
							values: data.no_check_color.replace('#', '')
						},
						total: 1
					}),
					flag: 0
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
;(function() {
	var plugin_04002 = function() {}
	plugin_04002.prototype = {
		init: function(view) {
			var template = `<div class="check-one">
                                <div class="item" x-class="{'no-check':true}">
                                    <svg id="not-check-icon" class="fill no_check" viewBox="0 0 24 24" preserveAspectRatio="meet">
                                        <path id="_san_2032" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
                                    </svg>
                                    <svg id="check-icon" class="fill check" viewBox="0 0 24 24" preserveAspectRatio="meet">
                                        <path id="_san_2038" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                    </svg>
                                </div>
                            </div>`
			view.innerHTML = template
			var data = DD.attr(view, 'dataName') || 'data'
			//数据项名字
			view.$dataItem = data
			//移除showItem
			view.removeAttribute('dataItem')
			//设置innerHTML
			DD.Compiler.compile(view, view.$module)
			view.$forceRender = true
		},
		render: function(view) {
			var data = view.$getData().data[view.$dataItem]
			setTimeout(function() {
				var checkTwo = view.querySelector('.check-one')
				var not_check = view.querySelector('#not-check-icon')
				var check = view.querySelector('#check-icon')
				DD.css(check, 'color', data.check_color)
				DD.css(not_check, 'color', data.no_check_color)
				DD.css(check, 'width', data.size + 'px')
				DD.css(check, 'height', data.size + 'px')
				DD.css(not_check, 'width', data.size + 'px')
				DD.css(not_check, 'height', data.size + 'px')
				if (data.is_check) {
					DD.css(not_check, 'display', 'none')
					DD.css(check, 'display', 'block')
				} else {
					DD.css(not_check, 'display', 'block')
					DD.css(check, 'display', 'none')
				}
				if (data)
					new DD.Event({
						view: checkTwo,
						eventName: 'click',
						handler: function(e, d, v) {
							var me = this
							data.is_check = !data.is_check
							if (data.is_check) {
								DD.css(not_check, 'display', 'none')
								DD.css(check, 'display', 'block')
							} else {
								DD.css(not_check, 'display', 'block')
								DD.css(check, 'display', 'none')
							}
						}
					})
			}, 0)
		}
	}
	DD.Plugin.create('check_box_3', plugin_04002)
	DD.createModule({
		delayInit: true,
		name: 'm_plugin_download_Checkbox_3',
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/checkbox_3/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/checkbox_3/index.html',
		data: {
			name: '方形选择框',
			check_data: {
				check_color: '#03a9f4',
				no_check_color: '#00000080',
				size: 24,
				is_check: true
			}
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data.check_data
				var obj = {
					plugin_id: 1203,
					js: JSON.stringify({
						check_color: data.check_color.replace('#', ''),
						no_check_color: data.no_check_color.replace('#', ''),
						size: data.size,
						is_check: data.is_check
					}),
					total: 0,
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
;(function() {
	var plugin_040041 = function() {}
	plugin_040041.prototype = {
		init: function(view) {
			var template = `<div class="check-three">
                                <div class="check-icon" x-class="{'check':'is_check'}">
                                    visibility_off
                                </div>
                                <div class="check-icon" x-class="{'no-check':'!is_check'}">
                                    visibility
                                </div>
                            </div>`
			view.innerHTML = template
			var data = DD.attr(view, 'dataName') || 'data'
			//数据项名字
			view.$dataItem = data
			//移除showItem
			view.removeAttribute('dataName')
			//设置innerHTML
			DD.Compiler.compile(view, view.$module)
			view.$forceRender = true
		},
		render: function(view) {
			var data = view.$getData().data[view.$dataItem]

			setTimeout(function() {
				var checkThree = view.querySelector('.check-three')
				var divs = view.querySelectorAll('.check-icon')
				DD.css(divs[0], 'color', data.check_color)
				DD.css(divs[1], 'color', data.no_check_color)
				if (data.is_check) {
					DD.css(divs[0], 'visibility', 'visible')
					DD.css(divs[1], 'visibility', 'hidden')
				} else {
					DD.css(divs[0], 'visibility', 'hidden')
					DD.css(divs[1], 'visibility', 'visible')
				}
				divs.forEach(function(item) {
					DD.css(item, 'font-size', data.size + 'px')
				})
				new DD.Event({
					view: checkThree,
					eventName: 'click',
					handler: function(e, d, v) {
						var me = this
						data.is_check = !data.is_check
						if (data.is_check) {
							DD.css(v, 'color', data.check_color)
						} else {
							DD.css(v, 'color', data.no_check_color)
						}
					}
				})
			}, 0)
		}
	}
	DD.Plugin.create('check_box_4', plugin_040041)
	DD.createModule({
		delayInit: true,
		name: 'm_plugin_download_Checkbox_4',
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/checkbox_4/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/checkbox_4/index.html',
		data: {
			name: '眼睛选择框',
			check_data: {
				size: 24,
				check_color: '#03a9f4',
				is_check: true,
				no_check_color: '#00000080'
			}
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data.check_data
				var obj = {
					plugin_id: 1204,
					total: 0,
					js: JSON.stringify({
						size: data.size,
						check_color: data.check_color.replace('#', ''),
						no_check_color: data.no_check_color.replace('#', ''),
						is_check: data.is_check
					}),
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
;(function() {
	var plugin_040031 = function() {}
	plugin_040031.prototype = {
		init: function(view) {
			var template = `<div class="check-two">
                                <div class="check-icon">
                                    favorite
                                </div>
                                <div class="check-icon">
                                    favorite_border
                                </div>
                            </div>`
			view.innerHTML = template
			var data = DD.attr(view, 'dataName') || 'data'
			//数据项名字
			view.$dataItem = data
			//移除showItem
			view.removeAttribute('dataItem')
			//设置innerHTML
			DD.Compiler.compile(view, view.$module)
			view.$forceRender = true
		},
		render: function(view) {
			var data = view.$getData().data[view.$dataItem]
			setTimeout(function() {
				var checkTwo = view.querySelector('.check-two')
				var divs = view.querySelectorAll('.check-icon')
				DD.css(divs[0], 'color', data.check_color)
				DD.css(divs[1], 'color', data.no_check_color)
				if (data.is_check) {
					DD.css(divs[0], 'visibility', 'visible')
					DD.css(divs[1], 'visibility', 'hidden')
				} else {
					DD.css(divs[0], 'visibility', 'hidden')
					DD.css(divs[1], 'visibility', 'visible')
				}
				divs.forEach(function(item) {
					DD.css(item, 'font-size', data.size + 'px')
				})
				new DD.Event({
					view: checkTwo,
					eventName: 'click',
					handler: function(e, d, v) {
						var me = this
						data.is_check = !data.is_check
						if (data.is_check) {
							DD.css(v, 'color', data.check_color)
						} else {
							DD.css(v, 'color', data.no_check_color)
						}
					}
				})
			}, 0)
		}
	}
	DD.Plugin.create('check_box_5', plugin_040031)
	DD.createModule({
		// el: '.nd-plugin-check-checkbox5',
		name: 'm_plugin_download_Checkbox_5',
		delayInit: true,
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/checkbox_5/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/checkbox_5/index.html',
		data: {
			name: '心形选择框',
			check_data: {
				size: 24,
				check_color: '#03a9f4',
				is_check: true,
				no_check_color: '#00000080'
			}
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data.check_data
				var obj = {
					plugin_id: 1205,
					total: 0,
					js: JSON.stringify({
						size: data.size,
						check_color: data.check_color.replace('#', ''),
						no_check_color: data.no_check_color.replace('#', ''),
						is_check: data.is_check
					}),
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
//渲染原因使mousemove卡顿
;(function() {
	var picker = function() {}
	picker.prototype = {
		init: function(view) {
			var template = `<div class="color-content" x-show="show">
    <div class="content">
        <div class="top">
            <div class="color-jbe" ></div>
            <div class="color-w">
            <div class="color-b"></div>
            <div class="moveE" ondragstart="return false;"></div>
            <div class="small-item" ondragstart="return false;"></div>
            </div>
         </div>
                <div class="bottom">
                    <div class="color-band">
                        <div class="point" style="left:{{left}}px" ondragstart="return false;"></div>
                    </div>
                    <div class="eventName"></div>
                </div>
                <div class="rgb">
                        <span class="name">r</span><input class="item" x-field="r" type="number">
                        <span class="name">g</span><input class="item"  x-field="g" type="number">
                        <span class="name">b</span><input class="item" x-field="b" type="number">
                </div>
                 <div class="rgb">
                        <span class="name">H</span><input class="item" x-field="H" type="number">
                        <span class="name">s</span><input class="item"  x-field="s" type="number">
                        <span class="name">v</span><input class="item" x-field="v" type="number">
                </div>
                 <div class="rgb">
                                 <div e-click='sure' class="ensure">确定</div>
                  </div>
            </div>
        </div>`
			view.innerHTML = template
			DD.Compiler.compile(view, view.$module)
			view.$forceRender = true
		},
		render: function(view) {
			var me = this
			me.datas = view.$getData().data
			me.one = me.datas.first
			//每次渲染都会执行那么第一次执行完毕就可以不用执行了
			if (!me.one) {
				return
			}
			me.datas.first = 0
			me.rotate = 0
			me.str = ''
			me.time = {
				new: 0
			}
			var move = 1
			var flag = 0
			var flag_2 = 0
			//直接改变是获取的值
			//而如果是对象的话就是获取引用
			//即可以实现双向和单项数据的绑定
			me.case = function() {
				DD.css(me.point, 'left', me.datas.left + 'px')
				//度数
				me.rotate = me.datas.left / 180 * 360
				me.datas.H = me.rotate
				var mod = parseInt((me.datas.left + 1) / 30)
				var data = ((me.datas.left - mod * 30) * 255 / 30) | 0
				switch (mod) {
					case 0:
						me.str = 'rgb(255,' + data + ',0)'
						me.datas.r = 255
						me.datas.g = data
						me.datas.b = 0
						break
					case 1:
						me.str = 'rgb(' + (255 - data) + ',255,0)'
						me.datas.r = 255 - data
						me.datas.g = 255
						me.datas.b = 0
						break
					case 2:
						me.str = 'rgb(0,255,' + data + ')'
						me.datas.r = 0
						me.datas.g = 255
						me.datas.b = data
						break
					case 3:
						me.str = 'rgb(0,' + (255 - data) + ',255)'
						me.datas.r = 0
						me.datas.g = 255 - data
						me.datas.b = 255
						break
					case 4:
						me.str = 'rgb(' + data + ',0,255)'
						me.datas.r = data
						me.datas.g = 0
						me.datas.b = 255
						break
					case 5:
						me.str = 'rgb(255,0,' + (255 - data) + ')'
						me.datas.r = 255
						me.datas.g = 0
						me.datas.b = 255 - data
						break
				}
				DD.css(me.dom, 'background', me.str)
			}
			me.moveitem = function() {
				DD.css(me.small, 'left', me.x + 'px')
				DD.css(me.small, 'top', me.y + 'px')
				var v = (((me.pery - me.y) / me.pery).toFixed(2) * 255) | 0
				var s = (me.x / me.perx).toFixed(2)
				var f1 = parseInt((me.rotate + 1) / 60)
				var f = me.rotate / 60 - f1
				var p = ((1 - s) * 255) | 0
				var q = ((1 - f * s) * 255) | 0
				var t = ((1 - (1 - f) * s) * 255) | 0
				var str = ''
				switch (f1) {
					case 0:
						str = 'rgb(' + v + ',' + t + ',' + p + ')'
						me.datas.r = v
						me.datas.g = t
						me.datas.b = p
						break
					case 1:
						str = 'rgb(' + q + ',' + v + ',' + p + ')'
						me.datas.r = q
						me.datas.g = v
						me.datas.b = p
						break
					case 2:
						str = 'rgb(' + p + ',' + v + ',' + t + ')'
						me.datas.r = p
						me.datas.g = v
						me.datas.b = t
						break
					case 3:
						str = 'rgb(' + p + ',' + q + ',' + v + ')'
						me.datas.r = p
						me.datas.g = q
						me.datas.b = v
						break
					case 4:
						str = 'rgb(' + t + ',' + p + ',' + v + ')'
						me.datas.r = t
						me.datas.g = p
						me.datas.b = v
						break
					case 5:
						str = 'rgb(' + v + ',' + p + ',' + q + ')'
						me.datas.r = v
						me.datas.g = p
						me.datas.b = q
						break
				}
				me.datas.H = me.rotate
				me.datas.s = (s * 255) | 0
				me.datas.v = v
			}
			setTimeout(function() {
				me.dom = view.querySelector('.color-jbe')
				me.point = view.querySelector('.point')
				me.bar = view.querySelector('.eventName')
				me.small = view.querySelector('.small-item')
				me.perx = parseInt(DD.css(me.dom, 'width'))
				me.pery = parseInt(DD.css(me.dom, 'height'))
				new DD.Event({
					view: me.point,
					eventName: 'mousedown',
					nopopo: true,
					handler: function(e, data, view) {
						flag = 1
						first = 1
						move = 1
					}
				})
				new DD.Event({
					view: view.querySelector('.color-content'),
					eventName: 'mouseup',
					nopopo: true,
					handler: function(e, data, view) {
						flag = 0
					}
				})
				new DD.Event({
					view: me.bar,
					eventName: 'mousemove',
					nopopo: true,
					handler: function(e, data, view) {
						if (flag) {
							if (!first) {
								if (new Date().getTime() > me.time.new + 3000) {
									move = 0
								} else {
									move = 1
								}
							}
							if (move) {
								me.first = 0
								me.datas.left = e.offsetX
								me.case()
								me.time.new = new Date().getTime()
							}
						}
					}
				})
				new DD.Event({
					view: me.bar,
					eventName: 'click',
					nopopo: true,
					handler: function(e, data, view) {
						me.datas.left = e.offsetX
						me.case()
						flag = 0
					}
				})
				new DD.Event({
					view: view.querySelector('.moveE'),
					eventName: 'mousemove',
					nopopo: true,
					handler: function(e, data, view) {
						if (flag_2) {
							me.x = e.offsetX
							me.y = e.offsetY
							me.moveitem()
						}
					}
				})
				new DD.Event({
					view: view.querySelector('.moveE'),
					eventName: 'mouseup',
					nopopo: true,
					handler: function(e, data, view) {
						flag_2 = 0
					}
				})
				new DD.Event({
					view: view.querySelector('.moveE'),
					eventName: 'click',
					nopopo: true,
					handler: function(e, data, view) {
						me.x = e.offsetX
						me.y = e.offsetY
						me.moveitem()
						flag_2 = 0
					}
				})
				new DD.Event({
					view: view.querySelector('.small-item'),
					eventName: 'mousedown',
					nopopo: true,
					handler: function(e, data, view) {
						flag_2 = 1
					}
				})
				new DD.Event({
					view: view.querySelector('.small-item'),
					eventName: 'mouseup',
					nopopo: true,
					handler: function(e, data, view) {
						flag_2 = 0
					}
				})
				new DD.Event({
					view: view.querySelector('.ensure'),
					eventName: 'click',
					nopopo: true,
					handler: function(e, data, view) {
						//颜色特殊处理一下
						var change = function(num) {
							var swicth = function(n) {
								if (n > 9) {
									switch (n) {
										case 10:
											return 'a'

										case 11:
											return 'b'

										case 12:
											return 'c'

										case 13:
											return 'd'

										case 14:
											return 'e'

										case 15:
											return 'f'
									}
								}
								return n + ''
							}
							var x = swicth(parseInt(num / 16))
							var y = swicth(num % 16)
							return x + y
						}
						data.show = false
						data.str = '#' + change(data.r) + '' + change(data.g) + '' + change(data.b) + ''
					}
				})
			}, 0)
		}
	}
	DD.Plugin.create('color-picker-1', picker)
	DD.createModule({
		delayInit: true,
		name: 'm_plugin_download_ColorPicker_1',
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/colorPicker_1/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/colorPicker_1/index.html',
		data: {
			colorpicker_data: {
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
			},
			name: '颜色选择器'
		},
		onBeforeFirstRender: function() {
			var me = this
			me.data.colorpicker_data = {
				left: 0,
				first: 1,
				r: 255,
				g: 0,
				b: 0,
				H: 0,
				s: 255,
				v: 255,
				show: false,
				str: '#ff0000',
				name: '颜色选择器'
			}
		},
		methods: {
			select: function() {
				var me = this
				me.data.colorpicker_data.show = true
			},
			ensure: function(e, data, view) {
				var me = this
				var obj = {
					plugin_id: 1501,
					total: 0,
					flag: 0
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})() /**
 * 日期插件
 */
;(function() {
	var xDate = function() {}

	xDate.prototype.init = function(view) {
		var dataYear = DD.attr(view, 'Year')
		var dataMonth = DD.attr(view, 'Month')
		var dataDay = DD.attr(view, 'Day')
		view.$dataYear = dataYear
		view.$dataMonth = dataMonth
		view.$dataDay = dataDay
		view.removeAttribute('Year')
		view.removeAttribute('Month')
		view.removeAttribute('Day')
		var template = `<div class="xDate" x-model='xDate'>
 		<div class="xDate-input">
 		<input type="text" name="" id='xDate-input'>
 		</div>
 		<div class="xDate-calendar" x-show='show'>
 		<div class="xDate-date">
 		<div class="xDate-header">
 		<div class="xDate-btn fr" id='nextMonthBtn'>&gt;</div>
 		<div class="xDate-btn fl" id='preMonthBtn'>&lt;</div>
 		<div class="xDate-Date">{{year}}年{{month}}月<div id='goToToday' title='回到今日'></div></div>
 		<div class="clear"></div>
 		</div>
 		<div class="xDate-body">
 		<div class="xDate-table">
 		<div class="xDate-week">
 		<div class='xDate-day-header' x-repeat='xDate_day'>{{day}}</div>
 		</div>
 		<div class="xDate-week" x-repeat='xDate_week'>
 		<div class='xDate-day' x-repeat='xDate_days' x-class="{'xDate-today':'today','xDate-no-this-month':'month===0||month===2'}">{{day}}</div>
 		</div>
 		</div>
 		</div>
 		</div>
 		</div>
 		</div>`
		view.innerHTML = template
		DD.Compiler.compile(view, view.$module)
		view.$forceRender = true
	}

	xDate.prototype.render = function(view) {
		var me = this
		var data = view.$getData().data
		if (!data) {
			return
		}
		var module
		if (!data.module) {
			module = view.$module
		} else {
			module = data.module
		}
		if (!module) {
			return
		}
		setTimeout(delayRender, 500)
		var input = view.querySelector('#xDate-input')
		var setDateInfo = function(year, month, day) {
			var date
			if (!month || !year) {
				date = new Date()
			} else {
				if (day) {
					date = new Date(year, month - 1, day)
				} else {
					date = new Date(year, month - 1, 1)
				}
			}
			var nowDate = new Date()
			var thisYear = nowDate.getFullYear()
			var thisMonth = nowDate.getMonth() + 1
			var thisDate = nowDate.getDate()
			var year = date.getFullYear()
			var month = date.getMonth() + 1
			var today = date.getDate()
			var firstDay = new Date(year, month - 1, 1)
			var lastDayOfLastMonth = new Date(year, month - 1, 0).getDate()
			var allDays = new Date(year, month, 0).getDate()
			var weeks = [[], [], [], [], [], []]
			var index = 0
			for (var i = 1; i <= firstDay.getDay(); i++) {
				weeks[0].push({ day: lastDayOfLastMonth - firstDay.getDay() + i, month: 0, today: false })
			}
			for (var j = 1; j <= allDays; j++) {
				var state = year === thisYear && month == thisMonth && j == thisDate
				if (weeks[index].length < 7) {
					weeks[index].push({ day: j, month: 1, today: state })
				} else {
					weeks[++index].push({ day: j, month: 1, today: state })
				}
			}
			for (var k = 0; k < weeks.length; k++) {
				if (weeks[k] == '') {
					weeks.splice(k, 1)
				}
			}
			var nextMonthDays = 7 - weeks[weeks.length - 1].length
			for (var day = 1; day <= nextMonthDays; day++) {
				weeks[weeks.length - 1].push({ day: day, month: 2, today: false })
			}
			data.xDate.year = year
			data.xDate.month = month
			data.xDate.day = today
			data.xDate.xDate_week = []
			for (var k = 0; k < weeks.length; k++) {
				data.xDate.xDate_week.push({ xDate_days: weeks[k] })
			}
			if (data.xDate.day > allDays) {
				data.xDate.day = allDays
			}
		}

		if (data.xDate.year === '' || data.xDate.month === '') {
			setDateInfo()
		}

		function delayRender() {
			var updateCSS = function() {
				me.days = view.getElementsByClassName('xDate-day')
				me.header = view.querySelector('.xDate-header')
				me.bg = view.querySelector('.xDate-body')
				DD.css(me.header, 'background', data.xDate.xDate_color.header_color)
				DD.css(me.bg, 'background', data.xDate.xDate_color.bg_color)
				for (var i = 0; i < me.days.length; i++) {
					if (me.days[i].className.indexOf('xDate-no-this-month') === -1) {
						DD.css(me.days[i], 'color', data.xDate.xDate_color.month_color)
					} else {
						DD.css(me.days[i], 'color', data.xDate.xDate_color.day_color)
					}
					if (me.days[i].className.indexOf('xDate-today') !== -1) {
						DD.css(me.days[i], 'border-color', data.xDate.xDate_color.today_color)
					}
				}
			}
			//变量提升写在这
			updateCSS()
			var preMonth = function() {
				if (data.xDate.month === 1) {
					data.xDate.year--
					data.xDate.month = 12
				} else {
					data.xDate.month--
				}
				setDateInfo(data.xDate.year, data.xDate.month)
				updateCSS()
			}

			var nextMonth = function() {
				if (data.xDate.month === 12) {
					data.xDate.year++
					data.xDate.month = 1
				} else {
					data.xDate.month++
				}
				setDateInfo(data.xDate.year, data.xDate.month)
				updateCSS()
			}

			var backToday = function() {
				var date = new Date()
				data.xDate.month = date.getMonth() + 1
				data.xDate.year = date.getFullYear()
				data.xDate.day = date.getDate()
				setDateInfo(data.xDate.year, data.xDate.month, data.xDate.day)
				updateCSS()
			}

			var changeShowState = function() {
				//view 渲染速度过慢会导致updateCss报错
				data.xDate.show = !data.xDate.show
				// if(data.xDate.show){
				// 	setTimeout(updateCSS,100);
				// }
			}
			var chooseDay = function(e, d, v) {
				data.xDate.show = false
				data.xDate.day = d.day
				input.value = data.xDate.year + '/' + data.xDate.month + '/' + data.xDate.day
			}

			if (data.xDate.show) {
				me.preBtn = view.querySelector('#preMonthBtn')
				me.nextBtn = view.querySelector('#nextMonthBtn')
				me.days = view.querySelectorAll('.xDate-day')
				me.todayBtn = view.querySelector('#goToToday')

				for (var i = 0; i < me.days.length; i++) {
					new DD.Event({
						eventName: 'click',
						view: me.days[i],
						handler: chooseDay
					})
				}

				new DD.Event({
					eventName: 'click',
					view: me.preBtn,
					handler: preMonth
				})

				new DD.Event({
					eventName: 'click',
					view: me.nextBtn,
					handler: nextMonth
				})

				new DD.Event({
					eventName: 'click',
					view: me.todayBtn,
					handler: backToday
				})
			}

			new DD.Event({
				eventName: 'click',
				view: input,
				handler: changeShowState
			})
		}
	}
	DD.Plugin.create('xDate', xDate)
	DD.createModule({
		delayInit: true,
		name: 'm_plugin_download_Date_1',
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/dateInput_1/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/dateInput_1/index.html',
		data: {
			name: '日历',
			xDate: {
				year: '', //当前 年/月/日
				month: '',
				day: '',
				show: false,
				xDate_color: {
					//日历自定义颜色
					header_color: '#e6e6e6',
					bg_color: '#fff',
					day_color: '#555555',
					today_color: '#112233',
					month_color: '#333333'
				},
				xDate_day: [
					{
						//日历头部
						day: '日'
					},
					{
						day: '一'
					},
					{
						day: '二'
					},
					{
						day: '三'
					},
					{
						day: '四'
					},
					{
						day: '五'
					},
					{
						day: '六'
					}
				],
				xDate_week: [] //日历日期内容
			}
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var me_data = me.data.xDate.xDate_color
				var obj = {
					plugin_id: 1001,
					js: JSON.stringify({
						header_color: me_data.header_color.replace('#', ''),
						bg_color: me_data.bg_color.replace('#', ''),
						day_color: me_data.day_color.replace('#', ''),
						today_color: me_data.today_color.replace('#', ''),
						month_color: me_data.month_color.replace('#', '')
					}),
					total: 0,
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})() /**
 * 选择框插件
 */
;(function() {
	var Select = function() {}
	Select.prototype.init = function(view) {
		var me = this
		var template =
			"<div class='nd-plugin-select-box'><div class='quit-area'></div><div class='select-area'><div class='select-header'><div class='header-left' e-click='confirm'>取消</div><div class='header-middle'>选择日期</div><div class='header-right' e-click='confirm'>确定</div><div class='clear'></div></div><div class='select-content'><ul class='options'><li class='option' x-repeat='options'>{{date}}</li></ul><div class='nowOption'></div></div></div></div>"
		view.innerHTML = template
		DD.Compiler.compile(view, view.$module)
		view.$forceRender = true
	}

	Select.prototype.render = function(view) {
		var me = this
		var data = view.$getData().data
		var canMove = false
		var startX = 0,
			StartY = 0
		var nowtranslateY = 0
		if (!data) {
			return
		}
		var module
		if (!data.module) {
			module = view.$module
		} else {
			module = data.module
		}
		if (!module) {
			return
		}
		setTimeout(delayRender, 0)

		function delayRender() {
			var plugin = view.querySelector('.nd-plugin-select-box')
			var quit = view.querySelector('.quit-area')
			var select = view.querySelector('.select-area')
			var options = view.querySelector('.options')
			var nowOption = view.querySelector('.nowOption')
			DD.css(select, 'height', '300px')
			DD.css(select, 'font-size', data.font_size + 'px')
			DD.css(nowOption, 'background-color', data.select_color)
			DD.css(options, 'color', data.font_color)
			if (!data.show) {
				DD.css(plugin, 'display', 'none')
			} else {
				DD.css(plugin, 'display', 'block')
			}
			var hideSelect = function(e, d, v) {
				DD.css(select, 'height', '0px')
				DD.css(plugin, 'display', 'none')
				data.show = false
			}
			var showSelect = function(e, d, v) {}

			new DD.Event({
				eventName: 'click',
				view: quit,
				handler: hideSelect
			})

			new DD.Event({
				eventName: 'click',
				view: select,
				handler: showSelect
			})

			new DD.Event({
				eventName: 'mousedown',
				view: options,
				handler: function(event) {
					canMove = true
					var e = event || window.event
					if (DD.config.deviceType !== 1) {
						startX = e.clientX
						startY = e.clientY
					} else {
						startX = e.touches[0].clientX
						startY = e.touches[0].clientY
					}
					nowtranslateY = DD.css(options, 'transform')
						.replace(/[^0-9,.-]/g, '')
						.split(',')[5]
				}
			})
			new DD.Event({
				eventName: 'mouseover',
				view: view,
				handler: function(event) {
					var e = event || window.event
					if (canMove) {
						var nowY
						if (DD.config.deviceType !== 1) {
							nowY = e.clientY
						} else {
							e.preventDefault()
							nowY = e.touches[0].clientY
						}

						var distance = nowY - startY + parseFloat(nowtranslateY)
						if (distance < 0 && -distance > data.options.length * 30) {
							distance = -(data.options.length * 30 - 15)
						} else if (distance > 0 && distance > data.options.length * 30) {
							distance = data.options.length * 30 + 15
						}
						DD.css(options, 'transform', 'translate(0,' + distance + 'px)')
					}
				}
			})

			new DD.Event({
				eventName: 'mouseup',
				view: view,
				handler: function() {
					setTimeout(function() {
						if (canMove) {
							nowtranslateY = DD.css(options, 'transform')
								.replace(/[^0-9,.-]/g, '')
								.split(',')[5]
							var distance = Math.ceil(Math.abs(nowtranslateY) / 30) * -30 + 15
							DD.css(options, 'transform', 'translate(0,' + distance + 'px)')
							data.nowDate = data.options[Math.ceil(Math.abs(nowtranslateY) / 30) - 1].date
							canMove = false
						}
					}, 0)
				}
			})
		}
	}

	// DD.Plugin.create('Select', Select);
	DD.createModule({
		name: 'm_plugin_download_Date_2',
		delayInit: true,
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/dateInput_2/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/dateInput_2/index.html',
		onReceive: function(m, data) {
			var me = this
			if (m === 'm_show') {
				me.data.show = data.show
			}
		},
		data: {
			nowDate: '周一',
			show: false,
			options: [
				{
					date: '周一'
				},
				{
					date: '周二'
				},
				{
					date: '周三'
				},
				{
					date: '周四'
				},
				{
					date: '周五'
				},
				{
					date: '周六'
				},
				{
					date: '周日'
				}
			],
			select_color: '#ffffff',
			font_color: '#000000',
			font_size: 12
		},
		onBeforeFirstRender: function() {},
		methods: {
			confirm: function(e, d, v) {
				var me = this
				me.module.send('m_show', { nowDate: me.data.nowDate })
				me.data.show = false
			},
			cancel: function(e, d, v) {
				var me = this
				me.data.show = false
			},
			ensure: function(e, data, view) {
				var me = this
				var obj = {
					plugin_id: 1002,
					js: JSON.stringify({
						select_color: me.data.select_color.replace('#', ''),
						font_color: me.data.font_color.replace('#', ''),
						font_size: me.data.font_size
					}),
					total: 0,
					flag: 1
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		},
		modules: [
			{
				name: 'm_show',
				el: '.el-plugin-date-show',
				onReceive: function(m, d) {
					var me = this
					if (m === 'm_plugin_download_Date_2') {
						me.data.$set('nowDate', d.nowDate)
					}
				},
				onBeforeFirstRender: function() {},
				methods: {
					show: function() {
						var me = this
						me.module.send('m_plugin_download_Date_2', { show: true })
					}
				}
			}
		]
	})
})() /**
 * Created by xll on 2017/11/27.
 */
;(function() {
	var Collapse = function() {}

	Collapse.prototype.init = function(view) {
		var me = this
		var template = `<div class="nd-plugin-collapse-box nd-plugin-slideimg-panel">
                            <div class="nd-plugin-collapse-heading">
                                
                            </div>
                            <div class="nd-plugin-collapse-content" >
                                <span class="nd-plugin-collapse-coninfo"></span>
                            </div>
                        </div>`
		var data = DD.attr(view, 'dataName') || 'data'
		view.$dataName = data
		view.innerHTML = template
		DD.Compiler.compile(view, view.$module)
		view.$forceRender = true
	}

	Collapse.prototype.render = function(view) {
		var me = this
		var data = view.$getData().data[view.$dataName]
		if (!data) {
			return
		}
		var module
		if (!data.module) {
			module = view.$module
		} else {
			module = data.module
		}
		if (!module) {
			return
		}
		setTimeout(delayRender, 0)

		function delayRender() {
			var collapseHead = document.querySelector('.nd-plugin-collapse-heading')
			var collapseCon = document.querySelector('.nd-plugin-collapse-content')
			var collapseConInfo = document.querySelector('.nd-plugin-collapse-coninfo')
			collapseHead.innerText = data.heading
			collapseConInfo.innerText = data.content
			var collapseConInfoHeight =
				parseInt(window.getComputedStyle(collapseConInfo, null).height) + parseInt(20) + 'px'
			if (data.isCollapse) {
				DD.css(collapseCon, 'height', collapseConInfoHeight)
				DD.css(collapseHead, 'border-bottom', '1px solid #ddd')
			} else {
				DD.css(collapseCon, 'height', 0)
				DD.css(collapseHead, 'border-bottom', 'none')
			}
			DD.css(collapseHead, 'background-color', data.head_bg_color)
			DD.css(collapseCon, 'background-color', data.content_bg_color)
			DD.css(collapseHead, 'color', data.head_font_color)
			DD.css(collapseConInfo, 'color', data.content_font_color)
			DD.css(collapseHead, 'font-size', data.head_font_size + 'px')
			DD.css(collapseCon, 'font-size', data.content_font_size + 'px')
			var clickEvent = function(e, d, v) {
				if (data.isCollapse) {
					DD.css(collapseCon, 'height', 0)
					setTimeout(function() {
						DD.css(collapseHead, 'border-bottom', 'none')
					}, 500)
					data.isCollapse = false
				} else {
					data.isCollapse = true
					DD.css(collapseCon, 'height', collapseConInfoHeight)
					DD.css(collapseHead, 'border-bottom', '1px solid #ddd')
				}
				DD.css(collapseCon, 'transition-property', 'height')
				DD.css(collapseCon, 'transition-duration', data.time + 's')
				DD.css(collapseCon, '-webkit-transition-property', 'height')
				DD.css(collapseCon, '-webkit-transition-duration', data.time + 's')
			}
			//点击事件
			new DD.Event({
				eventName: 'click',
				view: collapseHead,
				handler: clickEvent
			})
		}
	}

	DD.Plugin.create('collapse', Collapse)
	DD.createModule({
		name: 'm_plugin_download_foldCollapse_1',
		delayInit: true,
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/foldCollapse_1/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/foldCollapse_1/index.html',
		data: {
			name: '折叠',
			collapse_data: {
				time: 0.5,
				isCollapse: true,
				heading: '点击展开，再次点击折叠',
				content:
					'NoDom提供了丰富的指令集，如x-repeat( 重复条目渲染 )、x-model(数据模型)、x-if/x-else(条件)、x-show(显示和隐藏)、x-route／x-router(路由)、 x-field(字段和双向绑定)、x-validity(字段验证)。 同时提供了自定义指令集，指令可以帮助简化模版，丰富渲染内容。',
				head_bg_color: '#f5f5f5',
				content_bg_color: '#FFFFFF',
				head_font_color: '#666666',
				content_font_color: '#999999',
				head_font_size: 16,
				content_font_size: 14
			}
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data.collapse_data
				if (data.time <= 0) {
					data.time = 0.5
				}
				var obj = {
					plugin_id: 801,
					js: JSON.stringify({
						time: data.time,
						head_bg_color: data.head_font_color.replace('#', ''),
						content_bg_color: data.content_bg_color.replace('#', ''),
						head_font_color: data.head_font_color.replace('#', ''),
						content_font_color: data.content_bg_color.replace('#', ''),
						head_font_size: data.head_font_size,
						content_font_size: data.content_font_size
					}),
					total: 0,
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
;(function() {
	var Icon_base = function() {}
	Icon_base.prototype = {
		init: function(view) {
			var me = this
			var template = `<div class="Icon-content">
	<div x-repeat="font" class="arr">
		<div class="Icon">{{font}}</div>
		<p>{{font}}</p>
	</div>
</div>`
			view.innerHTML = template
			view.$forceRender = true
		},
		render: function(view) {}
	}
	DD.Plugin.create('Icon-base', Icon_base)
	DD.createModule({
		name: 'm_plugin_download_Icon_1',
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/icon_1/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/icon_1/index.html',
		data: {
			name: '图标列表',
			Icon_data: {
				font: []
			}
		},
		onBeforeFirstRender: function() {
			var me = this
			DD.request({
				params: { name: 'font' },
				rand: true,
				url: 'http://112.74.56.131/api/json?',
				successFunc: function(r) {
					var result = JSON.parse(r)
					me.data.Icon_data.$set('font', result.font.font)
				}
			})
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var obj = {
					plugin_id: 1401,
					total: 0,
					flag: 0
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
;(function() {
	// 对样式操作
	DD.createModule({
		delayInit: true,
		name: 'm_plugin_download_Complete_1',
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/inputAuto_1/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/inputAuto_1/index.html',
		data: {
			name: '自动补全',
			color: '#eeeeee',
			font_color: '#000000',
			one: 1,
			results: [],
			flag: false,
			now: 0,
			result: '',
			li: [
				{ txt: 1, check: false },
				{ txt: 12, check: false },
				{ txt: 13, check: false },
				{ txt: 11, check: false },
				{ txt: 2, check: false },
				{ txt: 4, check: false },
				{ txt: 4, check: false }
			]
		},
		methods: {
			check(e, d, v) {
				console.log(d)
				var me = this
				me.data.results = []
				me.data.result = d.txt
				me.data.flag = false
				document.querySelector('.inputAuto').querySelector('input').value = me.data.result
			},
			ensure: function(e, data, view) {
				var me = this
				var obj = {
					plugin_id: 601,
					total: 2,
					class0: JSON.stringify({
						names: '.on',
						background: {
							names: 'background-color',
							values: me.data.color.replace('#', '')
						},
						total: 1
					}),
					class1: JSON.stringify({
						names: '.auto_out ',
						background: {
							names: 'color',
							values: me.data.font_color.replace('#', '')
						},
						total: 1
					}),
					flag: 0
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
;(function() {
	var Location = function() {}
	Location.prototype = {
		init: function(view) {
			var me = this
			me.province = {
				A: [
					{
						name: '安徽省'
					},
					{
						name: '澳门特别行政区'
					}
				],
				B: [
					{
						name: '北京市'
					}
				],
				C: [
					{
						name: '重庆市'
					}
				],
				D: [],
				E: [],
				F: [
					{
						name: '福建省'
					}
				],
				G: [
					{
						name: '甘肃省'
					},
					{
						name: '广东省'
					},
					{
						name: '广西壮族自治区'
					},
					{
						name: '贵州省'
					}
				],
				H: [
					{
						name: '海南省'
					},
					{
						name: '河北省'
					},
					{
						name: '黑龙江省'
					},
					{
						name: '河南省'
					},
					{
						name: '湖北省'
					},
					{
						name: '湖南省'
					}
				],
				I: [],
				J: [
					{
						name: '江苏省'
					},
					{
						name: '江西省'
					},
					{
						name: '吉林省'
					}
				],
				K: [],
				L: [
					{
						name: '辽宁省'
					}
				],
				M: [],
				N: [
					{
						name: '内蒙古'
					},
					{
						name: '宁夏回族自治区'
					}
				],
				O: [],
				P: [],
				Q: [
					{
						name: '青海省'
					}
				],
				R: [],
				S: [
					{
						name: '陕西省'
					},
					{
						name: '山东省'
					},
					{
						name: '上海市'
					},
					{
						name: '山西省'
					},
					{
						name: '四川省'
					}
				],
				T: [
					{
						name: '台湾省'
					},
					{
						name: '天津市'
					}
				],
				U: [],
				V: [],
				W: [],
				X: [
					{
						name: '香港特别行政区'
					},
					{
						name: '新疆维吾尔族自治区'
					},
					{
						name: '西藏自治区'
					}
				],
				Y: [
					{
						name: '云南省'
					}
				],
				Z: [
					{
						name: '浙江省'
					}
				]
			}
			var template = `<div class="nd-plugin-location-box">
                                <div class="nd-plugin-location-country">
                                    <span></span>
                                </div>
                                <div class="nd-plugin-location-popular">
                                    <span class="nd-plugin-location-star"></span>
                                    <span>热门省份</span>
                                </div>
                                <ul class="nd-plugin-location-popularlist">
                                    <li x-repeat="popular_country" name="location_li">
                                        <div name={{name}}>{{name}}</div>
                                    </li>
                                </ul>`
			var letter = `<ul class="nd-plugin-location-letterlist">
                            <span>定位</span>` //字母
			for (var p in me.province) {
				if (me.province[p].length > 0) {
					letter += `<li><a href=#nd-plugin-location-` + p + `>` + p + `</a></li>`
					template +=
						`<div class="nd-plugin-location-letter">
                                    <div id=nd-plugin-location-` +
						p +
						` class='nd-plugin-location-title'>` +
						p +
						`</div>
                                </div>
                                <div class="nd-plugin-location-provicesbox">`
					for (var i = 0; i < me.province[p].length; i++) {
						template +=
							`<div class="nd-plugin-location-provices">
                                        <div name="` +
							me.province[p][i].name +
							`">` +
							me.province[p][i].name +
							`</div>
                                        <span class="nd-plugin-location-checked"></span>
                                    </div>`
					}
					template += `</div>`
				}
			}
			letter += `</ul>`
			template += letter
			template += `</div>`
			view.innerHTML = template
			DD.Compiler.compile(view, view.$module)
			view.$forceRender = true
		},
		render: function(view) {
			var me = this
			var data = view.$getData().data
			setTimeout(function() {
				var pop = view.querySelector('.nd-plugin-location-popularlist')
				var fixed = view.querySelector('.nd-plugin-location-letterlist')
				var route = document.querySelector('.router-content')
				var color1 = data.small_div.color_1
				var color2 = data.small_div.color_2
				var color3 = data.small_div.color_3
				var color4 = data.small_div.color_4
				var li = []
				li = Array.from(fixed.getElementsByTagName('a'))
				li.forEach(function(i) {
					DD.css(i, 'color', color2)
				})
				li = Array.from(pop.getElementsByTagName('div'))
				li.forEach(function(i) {
					DD.css(i, 'background-color', color1)
					DD.css(i, 'border', '1px solid' + color4)
					if (window.my_li) {
						DD.css(window.my_li, 'background-color', color1)
					}
				})
				li = document.querySelectorAll('.nd-plugin-location-title')
				li.forEach(function(i) {
					DD.css(i, 'color', color3)
				})
				if (data.location_country) {
					data.location_country = data.location_country.substring(0, 2)
				}
				if (data.popular_country) {
					if (data.popular_country.length > 8) {
						data.popular_country.splice(8, data.popular_country.length)
					}
					DD.css(
						view.querySelector('.nd-plugin-location-popularlist'),
						'height',
						33 * parseInt((2 + data.popular_country.length) / 3) + 'px'
					)
				}
				var location_country = view.querySelector('.nd-plugin-location-country')
				for (var p in me.province) {
					if (me.province[p].length > 0) {
						for (var i = 0; i < me.province[p].length; i++) {
							var span = view
								.querySelector('[name=' + me.province[p][i].name + ']')
								.parentNode.querySelector('span')
							if (DD.css(span, 'display') === 'block') {
								DD.css(span, 'display', 'none')
							}
							if (me.province[p][i].name.substring(0, 2) === data.location_country) {
								location_country.querySelector('span').innerHTML = '当前城市:' + me.province[p][i].name
								DD.css(span, 'display', 'block')
							}
						}
					}
				}
				new DD.Event({
					eventName: 'click',
					view: view,
					handler: function(e, d, v) {
						if (DD.attr(e.path[0], 'name')) {
							if (DD.attr(e.path[0], 'name').length === 2) {
								for (var i = 0; i < e.path[2].querySelectorAll('div').length; i++) {
									DD.css(e.path[2].querySelectorAll('div')[i], 'background-color', '#ffffff')
								}
								window.my_li = e.path[0]
							}
							data.location_country = DD.attr(e.path[0], 'name').substring(0, 2)
							view.$forceRender = true
						}
					}
				})
			}, 0)
		}
	}
	DD.Plugin.create('location', Location)
	DD.createModule({
		delayInit: true,
		el: '.position',
		name: 'm_plugin_download_Location_1',
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/location_1/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/location_1/index.html',
		data: {
			name: '区域插件',
			width_d: 320,
			location_data: {
				width_d: 320,
				small_div: {
					color_1: '#ffffff',
					color_2: '#66d9ef',
					color_3: '#457eb1',
					color_4: '#5a8dba'
				},
				location_country: '重庆',
				popular_country: [
					{ name: '北京' },
					{ name: '重庆' },
					{ name: '四川' },
					{ name: '江西' },
					{ name: '青海' },
					{ name: '重庆' },
					{ name: '江苏' },
					{ name: '天津' },
					{ name: '深圳' },
					{ name: '浙江' },
					{ name: '重庆' },
					{ name: '江苏' },
					{ name: '天津' },
					{ name: '深圳' },
					{ name: '浙江' }
				]
			}
		},
		onRender: function() {
			var me = this
			me.module.send('m_plugin_download', { no: true })
		},
		onBeforeFirstRender: function() {
			var me = this
			me.data.width_d = 320
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data.location_data
				if (data.small_div.animation_time <= 1) {
					data.small_div.animation_time = 1
				}
				var obj = {
					plugin_id: 701,
					js: JSON.stringify({
						color_1: data.small_div.color_1.replace('#', ''),
						color_2: data.small_div.color_2.replace('#', ''),
						color_3: data.small_div.color_3.replace('#', ''),
						color_4: data.small_div.color4.replace('#', '')
					}),
					total: 0,
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
;(function() {
	var magn = function() {}
	magn.prototype = {
		init: function(view) {
			var tem = `<div class='ct' style="position:relative; width:100%;height:100%">
                            <div class="small"></div>
                            <img class='small-img'>
                            <div class="magn"></div>
                        <div class="big"><img class='big_img'></div></div>`
			view.innerHTML = tem
			var data = DD.attr(view, 'dataName') || 'data'
			view.$dataName = data
			DD.Compiler.compile(view, view.$module)
			view.$forceRender = true
			view.$onceRender = false
		},
		render: function(view) {
			var me = this
			var data = view.$getData().data[view.$dataName]
			me.getx = function(x) {
				var me = this
				if (x <= me.width / 2) {
					me.move_x = 0
					return
				}
				if (x >= me.width * me.radio - me.width / 2) {
					me.move_x = me.width * (me.radio - 1)
					return
				}
				me.move_x = x - me.width / 2
			}
			me.gety = function(y) {
				var me = this
				if (y <= me.height / 2) {
					me.move_y = 0
					return
				}
				if (y >= me.height * me.radio - me.height / 2) {
					me.move_y = me.height * (me.radio - 1)
					return
				}
				me.move_y = y - me.height / 2
			}
			me.move = function() {
				var me = this
				DD.css(me.magn, 'left', me.move_x + 'px')
				DD.css(me.magn, 'top', me.move_y + 'px')
				DD.css(me.bigimg, 'left', -me.move_x * me.radio + 'px')
				DD.css(me.bigimg, 'top', -me.move_y * me.radio + 'px')
			}
			//渲染结束后开始执行
			setTimeout(function() {
				//比例系数
				me.radio = data.radio
				me.move_y = 0
				me.move_x = 0
				if (!view.$onceRender) {
					me.bigimg = view.querySelector('.big_img')
					me.smallimg = view.querySelector('.small-img')
					DD.attr(me.bigimg, 'src', data.big_img)
					DD.attr(me.smallimg, 'src', data.small_img)
					view.$onceRender = true
				}

				//可以移动的小方块
				me.magn = view.querySelector('.magn')
				me.content_div = view.querySelector('.ct')
				var ct_height = parseInt(DD.css(me.content_div, 'height'))
				var ct_width = parseInt(DD.css(me.content_div, 'width'))
				DD.css(me.magn, 'width', ct_width / me.radio + 'px')
				DD.css(me.magn, 'background-color', data.mark_color)
				DD.css(me.magn, 'opacity', data.mark_opacity / 10)
				DD.css(me.magn, 'height', ct_height / me.radio + 'px')
				DD.css(me.bigimg, 'width', ct_width * me.radio + 'px')
				DD.css(me.bigimg, 'height', ct_height * me.radio + 'px')
				me.height = parseInt(DD.css(me.magn, 'height'))
				me.width = parseInt(DD.css(me.magn, 'width'))
				me.big = view.querySelector('.big')
				new DD.Event({
					eventName: 'mouseenter',
					view: view.querySelector('.small'),
					handler: function(e, data, view) {
						DD.css(me.magn, 'visibility', 'visible')
						DD.css(me.big, 'visibility', 'visible')
					}
				})
				new DD.Event({
					eventName: 'mouseleave',
					view: view.querySelector('.small'),
					handler: function(e, data, view) {
						DD.css(me.magn, 'visibility', 'hidden')
						DD.css(me.big, 'visibility', 'hidden')
					}
				})
				new DD.Event({
					eventName: 'mousemove',
					view: view.querySelector('.small'),
					handler: function(e, data, view) {
						//获取鼠标位置
						me.getx(e.offsetX)
						me.gety(e.offsetY)
						//移动
						me.move()
					}
				})
			}, 0)
		}
	}
	DD.Plugin.create('magn', magn)
	DD.createModule({
		delayInit: true,
		name: 'm_plugin_download_Magn_1',
		templateUrl: HTMLURL + '/plugin_download/magn_1/index.html',
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/magn_1/css/index.css' }],
		data: {
			name: '放大镜',
			photo_to_big: {
				small_img: '/plugin_set/public/view/plugin_download/magn_1/img/small.jpg',
				big_img: '/plugin_set/public/view/plugin_download/magn_1/img/big.jpg',
				radio: 2,
				mark_color: '#666666',
				mark_opacity: '2'
			}
		},
		onBeforeFirstRender: function() {
			var me = this
			me.data.width = window.innerWidth * 0.6 / 2
		},
		onRender: function() {
			var me = this
			var tem = parseInt(DD.css(document.querySelector('.router-content'), 'height'))
			if (tem > window.innerHeight - 80) {
				me.module.send('m_plugin_download', {
					upload: false,
					height: tem
				})
			}
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data.photo_to_big
				if (data.radio <= 1) {
					data.radio = 2
				}
				var obj = {
					plugin_id: 201,
					js: JSON.stringify({
						radio: data.radio,
						mark_color: data.mark_color.replace('#', ''),
						mark_opacity: data.mark_opacity
					}),
					total: 0,
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})() /**
 * 分页插件
 * 欲用此插件，必先在使用此插件的模块上有一个updatePage函数,用来点击之后刷新页面
 * page:当前页
 * to_page:输入框的数据（到第几页）
 * allpage:总共多少页
 * @return {[type]} [description]
 */
;(function() {
	// var Paging_1 = function() {};

	// Paging_1.prototype = {
	// 	init: function(view) {
	// 		var me = this;
	// 		var template = `<div class="nd-plugin-paging">
	// 				            <span>共<span class="red">{{total}}</span>条记录</span>
	// 				            <span>共<span class="red">{{allpage}}</span>页</span>
	// 				            <span>当前第<span class="red">{{page}}</span>页</span>
	// 				            <div class="to-first" x-class="{'can-not':'page==1'}">首页</div>
	// 				            <div class="to-prev" x-class="{'can-not':'page==1'}">上一页</div>
	// 				            <div class="to-next" x-class="{'can-not':'page==allpage'}">下一页</div>
	// 				            <div class="to-last" x-class="{'can-not':'page==allpage'}">末页</div>
	// 				            <span>转到:</span>
	// 				            <input type="number" x-field="to_page">
	// 				            <div class="go-to">GO</div>
	// 				        </div>
	// 				        <div class="clear"></div>
	// 				        `;
	// 		view.innerHTML = template;
	// 		DD.Compiler.compile(view,view.$module);
	// 		view.$forceRender = true;
	// 	},
	// 	render:function(view){
	// 		var data=view.$getData().data;
	//            if(data.total && data.row) {
	//                data.allpage = Math.ceil(data.total /data.row);
	//            }
	// 		var color_1=data.word_color;
	// 		var color_2=data.page_color;
	// 		setTimeout(function(){
	// 			var red=[];
	// 			var plugin=view.querySelector(".nd-plugin-paging");
	// 			red=view.querySelectorAll(".red");
	// 			red.forEach(function(i){
	// 				DD.css(i,"color",color_2);
	// 			});
	// 			DD.css(plugin,"color",color_1)

	// 		},0)
	// 		new DD.Event({
	// 			eventName:'click',
	// 			view:view.querySelector('.to-first'),
	// 			handler:function(e,d,v){
	//                 if(this.data.page!==1){
	//                     this.data.page = 1;
	//                     this.module.methodFactory.methods.updatePage.call(this);
	//                 }
	// 			}
	// 		});
	// 		new DD.Event({
	// 			eventName:'click',
	// 			view:view.querySelector('.to-last'),
	// 			handler:function(e,d,v){
	//                 if(this.data.page!==this.data.allpage){
	//                     this.data.page = this.data.allpage;
	//                 	this.module.methodFactory.methods.updatePage.call(this);
	//                 }
	// 			}
	// 		});
	// 		new DD.Event({
	// 			eventName:'click',
	// 			view:view.querySelector('.to-prev'),
	// 			handler:function(e,d,v){
	//                 if(this.data.page>1){
	//                     this.data.page--;
	//                 	this.module.methodFactory.methods.updatePage.call(this);
	//                 }
	// 			}
	// 		});
	// 		new DD.Event({
	// 			eventName:'click',
	// 			view:view.querySelector('.to-next'),
	// 			handler:function(e,d,v){
	//                 if(this.data.page<this.data.allpage){
	//                     this.data.page++;
	//                 	this.module.methodFactory.methods.updatePage.call(this);
	//                 }
	// 			}
	// 		});
	// 		new DD.Event({
	// 			eventName:'click',
	// 			view:view.querySelector('.go-to'),
	// 			handler:function(e,d,v){
	//                 if(this.data.page !== this.data.to_page&&
	//                     this.data.to_page>=1&&
	//                     this.data.to_page<=this.data.allpage){
	//                     this.data.page = this.data.to_page;
	//                 	this.module.methodFactory.methods.updatePage.call(this);
	//                 }
	// 			}
	// 		});
	// 	}
	// }
	//    DD.Plugin.create('paging_1', Paging_1);
	DD.createModule({
		delayInit: true,
		name: 'm_plugin_download_Page_1',
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/page_1/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/page_1/index.html',
		data: {
			//字体颜色
			word_color: '#000000',
			//页数颜色
			page_color: '#ff0000',
			name: '常见分页',
			page: 1,
			row: 10,
			total: 100,
			to_page: 1
		},
		methods: {
			//更新函数
			updatePage: function() {
				var me = this
			},
			ensure: function(e, data, view) {
				var me = this
				var obj = {
					js: JSON.stringify({
						word_color: me.data.word_color.replace('#', ''),
						page_color: me.data.page_color.replace('#', '')
					}),
					plugin_id: 1101,
					total: 0,
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})() /**
 * Created by xll on 2018/5/10.
 *
 * 分页插件
 * 欲用此插件，必先在使用此插件的模块上有一个updatePage函数,用来点击之后刷新页面
 * pre_page:当前页
 * go_page:输入框的数据（到第几页）
 * all_page:总共多少页
 * @return {[type]} [description]
 */
;(function() {
	var Paging_2 = function() {}

	Paging_2.prototype = {
		init: function(view) {
			var me = this
			var template = `<div class="com-page" x-model="page">
                            <div class="com-go-pre"></div>
                            <div class="com-page-box">
                                <span class="com-page-item mar-left" x-repeat="page_rows" x-class="{'com-pre-page': 'page===pre_page'}">{{page}}</span>
                            </div>
                            <div class="com-go-next"></div>
                            <div class="com-go">
                                <span>前往</span>
                                <input type="text" x-field="go_page">
                                <span>页</span>
                                <button class="com-go-btn" >GO</button>
                            </div>
                        </div>`
			view.innerHTML = template
			var data = DD.attr(view, 'dataName') || 'data'
			//数据项名字
			view.$dataItem = data
			//移除showItem
			view.removeAttribute('dataItem')
			DD.Compiler.compile(view, view.$module)
			view.$forceRender = true
		},
		render: function(view) {
			var data = view.$getData().data
			var me = this
			if (data.one) {
				if (data.page.all_page >= 0) {
					// 动态修改页码数组
					if (data.page.all_page > 7) {
						data.page.page_rows = []
						for (var i = 1; i < 8; i++) {
							if (i === 7) {
								data.page.page_rows.push({
									page: '...',
									pre_page: data.page.pre_page
								})
							} else {
								data.page.page_rows.push({
									page: i,
									pre_page: data.page.pre_page
								})
							}
						}
						data.page.page_rows.push({
							page: data.page.all_page,
							pre_page: data.page.pre_page
						})
					} else {
						// 清空数据
						data.page.page_rows = []
						for (var i = data.page.all_page; i > 0; i--) {
							data.page.page_rows.push({
								page: data.page.all_page - i + 1,
								pre_page: data.page.pre_page
							})
						}
					}
				}
			}
			data.one = 0
			var module
			if (!data.module) {
				module = view.$module
			} else {
				module = data.module
			}
			if (!module) {
				return
			}
			setTimeout(function() {
				var box = []
				box = view.querySelectorAll('.com-page-item')
				box.forEach(function(i) {
					if (parseInt(i.innerText) === data.page.pre_page) {
						DD.css(i, 'background-color', data.color_2)
						// DD.css(i, "color", data.color_1);
					} else {
						DD.css(i, 'background-color', '#ffffff')
						DD.css(i, 'color', data.color_1)
					}
				})
				/**,
                 * 修改page_rows
                 * @param pre_page   当前页
                 * @param all_page   总页数
                 */
				function changePageRows(pre_page, all_page) {
					if (pre_page <= 6) {
						if (all_page <= 6) {
							data.page.page_rows = []
							for (var i = all_page; i > 0; i--) {
								data.page.page_rows.push({
									page: all_page - i + 1,
									pre_page: pre_page
								})
							}
						} else {
							data.page.page_rows = [
								{
									page: 1,
									pre_page: pre_page
								},
								{
									page: 2,
									pre_page: pre_page
								},
								{
									page: 3,
									pre_page: pre_page
								},
								{
									page: 4,
									pre_page: pre_page
								},
								{
									page: 5,
									pre_page: pre_page
								},
								{
									page: 6,
									pre_page: pre_page
								},
								{
									page: '...',
									pre_page: pre_page
								},
								{
									page: all_page,
									pre_page: pre_page
								}
							]
						}
					} else if (pre_page > 6 && pre_page <= all_page - 5) {
						data.page.page_rows = [
							{
								page: 1,
								pre_page: pre_page
							},
							{
								page: '...',
								pre_page: pre_page
							},
							{
								page: pre_page - 1,
								pre_page: pre_page
							},
							{
								page: pre_page,
								pre_page: pre_page
							},
							{
								page: pre_page + 1,
								pre_page: pre_page
							},
							{
								page: pre_page + 2,
								pre_page: pre_page
							},
							{
								page: '...',
								pre_page: pre_page
							},
							{
								page: all_page,
								pre_page: pre_page
							}
						]
					} else if (pre_page > all_page - 5) {
						data.page.page_rows = [
							{
								page: 1,
								pre_page: pre_page
							},
							{
								page: '...',
								pre_page: pre_page
							},
							{
								page: all_page - 5,
								pre_page: pre_page
							},
							{
								page: all_page - 4,
								pre_page: pre_page
							},
							{
								page: all_page - 3,
								pre_page: pre_page
							},
							{
								page: all_page - 2,
								pre_page: pre_page
							},
							{
								page: all_page - 1,
								pre_page: pre_page
							},
							{
								page: all_page,
								pre_page: pre_page
							}
						]
					}
					data.page.$set('page_rows', data.page.page_rows)
				}
				new DD.Event({
					eventName: 'click',
					view: view.querySelector('.com-go-pre'),
					handler: function(e, d, v) {
						var me = this
						if (data.page.pre_page === 1) {
							return
						}
						data.page.pre_page--
						changePageRows(data.page.pre_page, data.page.all_page)
						// 请求数据
						// this.module.methodFactory.methods.updatePage.call(this);
						view.$forceRender = true
					}
				})
				new DD.Event({
					eventName: 'click',
					view: view.querySelector('.com-go-next'),
					handler: function(e, d, v) {
						var me = this
						if (data.page.pre_page === data.page.all_page) {
							return
						}
						data.page.pre_page++
						changePageRows(data.page.pre_page, data.page.all_page)
						// console.log(data);
						// 请求数据
						// this.module.methodFactory.methods.updatePage.call(this);
						view.$forceRender = true
					}
				})
				new DD.Event({
					eventName: 'click',
					view: view.querySelector('.com-go-btn'),
					handler: function(e, d, v) {
						var me = this

						if (parseInt(data.page.go_page) > data.page.all_page) {
							return
						}
						data.page.pre_page = parseInt(data.page.go_page)
						changePageRows(data.page.pre_page, data.page.all_page)
						// 请求数据
						// this.module.methodFactory.methods.updatePage.call(this);
						view.$forceRender = true
					}
				})
				var page_arr = view.querySelectorAll('.com-page-item')
				for (let i = 0; i < page_arr.length; i++) {
					new DD.Event({
						eventName: 'click',
						view: page_arr[i],
						handler: function(e, d, v) {
							if (d.page !== '...') {
								data.page.pre_page = d.page
								changePageRows(data.page.pre_page, data.page.all_page)
								// 请求数据
								// this.module.methodFactory.methods.updatePage.call(this);
								view.$forceRender = true
							}
						}
					})
				}
			}, 100)
		}
	}

	DD.Plugin.create('paging_2', Paging_2)
	DD.createModule({
		delayInit: true,
		name: 'm_plugin_download_Page_2',
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/page_2/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/page_2/index.html',
		data: {
			name: '酷炫分页',
			color_1: '#999999',
			color_2: '#5eaee3',
			page: {
				pre_page: 1,
				go_page: 1,
				all_page: 16,
				page_rows: []
			},
			one: 1
		},
		onBeforeFirstRender: function() {
			var me = this
			me.data.one = 1
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var obj = {
					plugin_id: 1102,
					class0: JSON.stringify({
						names: '.com-pre-page',
						total: 1,
						color: {
							names: 'background-color',
							values: me.data.color_2.replace('#', '')
						}
					}),
					class1: JSON.stringify({
						names: '.com-page-item',
						total: 1,
						color: {
							names: 'color',
							values: me.data.color_1.replace('#', '')
						}
					}),
					js: JSON.stringify({
						color_1: me.data.color_1.replace('#', ''),
						color_2: me.data.color_2.replace('#', '')
					}),
					total: 0,
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
;(function() {
	/**
     * 数据项配置说明
     * 参数dragProBar的取值为0~1或者是百分比,若是百分比，值为字符串
     * showStyle表示水平显示还是垂直显示
     */
	var DragProBarHV = function() {}

	DragProBarHV.prototype.init = function(view) {
		var me = this
		var template = `<div class="nd-plugin-dragprobar-box">
                            <div class="nd-plugin-dragprobar-total">
                                <span class="nd-plugin-dragprobar-percent"></span>
                                <span class="nd-plugin-dragprobar-btn"></span>
                            </div>
                        </div>`
		DD.addClass(view, 'nd-plugin-dragprobar')
		//数据项名
		var data = DD.attr(view, 'process')
		view.$dataName = data
		//显示样式
		var showStyle = DD.attr(view, 'showStyle')
		view.$showStyle = showStyle

		view.$processBoxBg = DD.attr(view, 'processBoxBg')
		view.$percentColor = DD.attr(view, 'percentColor')
		view.$processBg = DD.attr(view, 'processBg')
		view.$dragBtnWidth = DD.attr(view, 'dragBtnWidth')
		view.$dragBtnColor = DD.attr(view, 'dragBtnColor')
		view.innerHTML = template
		DD.Compiler.compile(view, view.$module)
		view.$forceRender = true
	}

	DragProBarHV.prototype.render = function(view) {
		var me = this
		var data = view.$getData().data
		if (!data) {
			return
		}
		var module
		if (!data.module) {
			module = view.$module
		} else {
			module = data.module
		}
		if (!module) {
			return
		}
		setTimeout(delayRender, 0)

		function delayRender() {
			var box = document.querySelector('.nd-plugin-dragprobar-box')
			DD.css(box, 'background-color', 'rgba(96,96,96,0.5)')
			var boxParents = box.parentNode.parentNode
			var boxParentsStyle = window.getComputedStyle(boxParents, null)
			var percent = document.querySelector('.nd-plugin-dragprobar-percent')
			var btn = document.querySelector('.nd-plugin-dragprobar-btn')
			var total = document.querySelector('.nd-plugin-dragprobar-total')
			var temp = 0
			var totalWidth
			var totalHeight
			DD.css(box, 'background-color', data[view.$processBoxBg])
			DD.css(total, 'background-color', data[view.$processBg])
			DD.css(percent, 'background-color', data[view.$percentColor])
			DD.css(btn, 'width', data[view.$dragBtnWidth] + 'px')
			DD.css(btn, 'height', data[view.$dragBtnWidth] + 'px')
			DD.css(btn, 'margin-top', -(data[view.$dragBtnWidth] / 2 - 1) + 'px')
			DD.css(btn, 'margin-left', -(data[view.$dragBtnWidth] / 2 - 1) + 'px')
			DD.css(btn, 'background-color', data[view.$dragBtnColor])
			if (data[view.$showStyle] === 'vertical') {
				//设置总滑动条长宽
				DD.css(total, 'width', '2px')
				DD.css(total, 'height', boxParentsStyle.height)
				totalWidth = window.getComputedStyle(total, null).width
				totalHeight = window.getComputedStyle(total, null).height
				//设置percent的width
				DD.css(percent, 'width', '2px')
				//设置percent的height，top及btn的top
				if (data[view.$dataName]) {
					if (typeof data[view.$dataName] === 'string') {
						var percentNum = parseInt(data[view.$dataName].replace('%', ''))
						if (percentNum >= 0 && percentNum <= 100) {
							DD.css(percent, 'height', data[view.$dataName])
							DD.css(percent, 'top', parseInt(100) - parseInt(percentNum) + '%')
							DD.css(btn, 'top', parseInt(100) - parseInt(percentNum) + '%')
						} else {
							alert('百分比取值为1%~100%')
						}
					} else {
						if (data[view.$dataName] >= 0 && data[view.$dataName] <= 1) {
							var percentHeight = data[view.$dataName] * 100 + '%'
							DD.css(percent, 'height', percentHeight)
							DD.css(percent, 'top', (parseFloat(1) - parseFloat(data[view.$dataName])) * 100 + '%')
							DD.css(btn, 'top', (parseFloat(1) - parseFloat(data[view.$dataName])) * 100 + '%')
						} else if (parseFloat(data[view.$dataName]) < 0 || parseFloat(data[view.$dataName]) > 1) {
							alert('请输入正确的dragProBar值！')
						}
					}
				} else {
					alert('找不到数据dragProBar！')
				}
			} else if (data[view.$showStyle] === 'horizontal') {
				DD.css(box, 'height', boxParentsStyle.height)
				//设置总滑动条长宽
				DD.css(total, 'width', boxParentsStyle.width)
				DD.css(total, 'height', '2px')
				totalWidth = window.getComputedStyle(total, null).width
				totalHeight = window.getComputedStyle(total, null).height
				//设置percent的width
				DD.css(percent, 'height', '2px')

				if (data[view.$dataName]) {
					if (typeof data[view.$dataName] === 'string') {
						var percentNum = parseInt(data[view.$dataName].replace('%', ''))
						if (percentNum >= 0 && percentNum <= 100) {
							DD.css(percent, 'width', data[view.$dataName])
							DD.css(btn, 'left', data[view.$dataName])
						} else {
							alert('百分比取值为1%~100%')
						}
					} else {
						if (data[view.$dataName] >= 0 && data[view.$dataName] <= 1) {
							DD.css(percent, 'width', data[view.$dataName] * 100 + '%')
							DD.css(btn, 'left', data[view.$dataName] * 100 + '%')
						} else if (parseFloat(data[view.$dataName]) < 0 || parseFloat(data[view.$dataName]) > 1) {
							alert('请输入正确的dragProBar值！')
						}
					}
				} else {
					alert('找不到数据dragProBar！')
				}
			}
			new DD.Event({
				eventName: 'click',
				view: box,
				delg: true,
				capture: true,
				handler: function(e, data, v) {
					var me = this
					if (e.target.className === 'nd-plugin-dragprobar-btn') {
						return
					}
					if (data[view.$showStyle] === 'horizontal') {
						var box_width = parseInt(DD.css(box, 'width'))
						data[view.$dataName] = e.offsetX / box_width
						DD.css(percent, 'width', e.offsetX + 'px')
						DD.css(btn, 'left', e.offsetX + 'px')
					} else if (data[view.$showStyle] === 'vertical') {
						var box_height = parseInt(DD.css(box, 'height'))
						data[view.$dataName] = e.offsetY / box_height
						DD.css(percent, 'top', e.offsetY + 'px')
						DD.css(percent, 'height', (1 - data[view.$dataName]) * box_height + 'px')
						DD.css(btn, 'top', e.offsetY + 'px')
					}
				}
			})
		}
	}
	DD.Plugin.create('dragProBarHV', DragProBarHV)
	DD.createModule({
		delayInit: true,
		name: 'm_plugin_download_Progress_1',
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/progress_1/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/progress_1/index.html',
		data: {
			name: '横向进度条',
			drag_pro_bar_process: 0.4,
			show_style: 'horizontal',
			process_box_bg: 'rgba(96,96,96,0.5)',
			percent_color: '#ffffff',
			drag_btn_width: 10,
			process_bg: '#000',
			drag_btn_color: '#00ff00'
		},
		onBeforeFirstRender: function() {
			var me = this
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var obj = {
					plugin_id: 501,
					js: JSON.stringify({
						process_bg_color: me.data.process_bg.replace('#', ''),
						process_box_bg_color: me.data.process_box_bg.replace('#', ''),
						percent_color: me.data.percent_color.replace('#', ''),
						drag_btn_color: me.data.drag_btn_color.replace('#', ''),
						drag_btn_width: me.data.drag_btn_width
					}),
					total: 0,
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})() /**
 * Created by xll on 2017/11/28.
 */
;(function() {
	/**
     * 数据项配置说明
     * 参数proBar的取值为0~1或者是百分比,若是百分比，值为字符串
     */
	var ProBar = function() {}

	ProBar.prototype.init = function(view) {
		var me = this
		var template = `<div class="nd-plugin-probar-box">
                            <div class="nd-plugin-probar-total">
                                <span class="nd-plugin-probar-pro"></span>
                                <span class="nd-plugin-probar-percent"></span>
                            </div>
                        </div>`
		DD.addClass(view, 'nd-plugin-probar')
		var data = DD.attr(view, 'dataItem')
		var show = DD.attr(view, 'showItem')
		view.$dataName = data
		view.$showItem = show
		view.$processBgColor = DD.attr(view, 'processBgColor')
		view.$processPercentColor = DD.attr(view, 'processPercentColor')
		view.$processPercentNumColor = DD.attr(view, 'processPercentNum')
		view.innerHTML = template
		DD.Compiler.compile(view, view.$module)
		view.$forceRender = true
	}

	ProBar.prototype.render = function(view) {
		var me = this
		var data = view.$getData().data
		if (!data) {
			return
		}
		var module
		if (!data.module) {
			module = view.$module
		} else {
			module = data.module
		}
		if (!module) {
			return
		}
		setTimeout(delayRender, 0)

		function delayRender() {
			var total = view.querySelector('.nd-plugin-probar-total')
			var pro = view.querySelector('.nd-plugin-probar-pro')
			var percent = view.querySelector('.nd-plugin-probar-percent')
			DD.css(percent, 'color', data[view.$processPercentNumColor])
			DD.css(pro, 'background-color', data[view.$processPercentColor])
			DD.css(total, 'background-color', data[view.$processBgColor])
			var totalHeight = window.getComputedStyle(total, null).height
			DD.css(pro, 'height', totalHeight)
			DD.css(percent, 'line-height', totalHeight)
			DD.css(pro, 'border-radius', parseInt(totalHeight) / 1.5 + 'px')
			DD.css(total, 'border-radius', parseInt(totalHeight) / 1.5 + 'px')
			if (data[view.$showItem]) {
				//判断data[view.$dataName]是百分比还是小数
				if (typeof data[view.$dataName] === 'string') {
					var percentNum = parseInt(data[view.$dataName].replace('%', ''))
					if (percentNum >= 0 && percentNum <= 100) {
						DD.css(pro, 'width', data[view.$dataName])
						percent.innerText = data[view.$dataName]
						DD.css(percent, 'left', data[view.$dataName])
					} else {
						alert('百分比取值为1%~100%')
					}
				} else {
					//判断小数是否在0~1范围
					if (data[view.$dataName] >= 0 && data[view.$dataName] <= 1) {
						DD.css(pro, 'width', data[view.$dataName] * 100 + '%')
						percent.innerText = data[view.$dataName] * 100 + '%'
						var percentRight = parseFloat(data[view.$dataName]) * 100 + '%'
						DD.css(percent, 'left', percentRight)
					} else if (data[view.$dataName] < 0 || data[view.$dataName] > 1) {
						alert('请输入正确的proBar值！')
					}
				}
			} else {
				if (typeof data[view.$dataName] === 'string') {
					var percentNum = parseInt(data[view.$dataName].replace('%', ''))
					if (percentNum >= 0 && percentNum <= 100) {
						DD.css(pro, 'width', data[view.$dataName])
					} else {
						alert('百分比取值为1%~100%')
					}
				} else {
					if (data[view.$dataName] >= 0 && data[view.$dataName] <= 1) {
						DD.css(pro, 'width', data[view.$dataName] * 100 + '%')
					} else if (data[view.$dataName] < 0 || data[view.$dataName] > 1) {
						alert('请输入正确的proBar值！')
					}
				}
			}
		}
	}

	DD.Plugin.create('proBar', ProBar)
	DD.createModule({
		delayInit: true,
		name: 'm_plugin_download_Progress_2',
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/progress_2/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/progress_2/index.html',
		data: {
			name: '普通进度条',
			proBar: 0.9,
			percent: true,
			process_percent_num_color: '#ffffff',
			process_percent_color: '#4A98FF',
			process_bg_color: '#DDDDDD'
		},
		onBeforeFirstRender: function() {
			var me = this
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var obj = {
					plugin_id: 502,
					total: 0,
					flag: 1,
					js: JSON.stringify({
						process_percent_num_color: me.data.process_percent_num_color.replace('#', ''),
						process_percent_color: me.data.process_percent_color.replace('#', ''),
						process_bg_color: me.data.process_bg_color.replace('#', '')
					})
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
;(function() {
	el_svg = function() {}
	el_svg.prototype = {
		init: function(view) {
			var template = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="200" height="200" viewBox="0,0,200,200">
    	    <path d="M 100,100 m0,-{{r}} a {{r}},{{r}},0,1,1,0,{{2*r}}  a {{r}},{{r}},0,1,1,0,{{-2*r}}" stroke={{color_1}} stroke-width="10" style="fill-opacity:0;"/>
    	    <path d="M 100,100 m0,-{{r}} a {{r}},{{r}},0,1,1,0,{{2*r}}  a {{r}},{{r}},0,1,1,0,{{-2*r}}" stroke={{color_2}} stroke-width="10" style="fill-opacity:0;stroke-dasharray:{{r1}}px,{{r2}}px;stroke-dashoffset:0px;transition: stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s, stroke-width 0.06s ease 0.3s;stroke-linecap:round"/>
    </svg>`
			view.innerHTML = template
		},
		render: function(view) {}
	}
	DD.Plugin.create('svg-1', el_svg)
	DD.createModule({
		delayInit: true,
		name: 'm_plugin_download_Progress_3',
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/progress_3/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/progress_3/index.html',
		data: {
			name: '圆环进度条',
			progress_data: {
				r: 90,
				r1: '',
				r2: '',
				per: 1,
				color_1: '#f5f5f5',
				color_2: '#108ee9'
			}
		},
		onBeforeFirstRender: function() {
			var me = this
			me.data.progress_data = {
				r: 90,
				r1: Math.PI * 2 * me.data.progress_data.per * 90 / 10,
				r2: Math.PI * 2 * 90,
				per: 1,
				color_1: '#f5f5f5',
				color_2: '#108ee9'
			}
		},
		methods: {
			add: function() {
				var me = this
				var data = me.data.progress_data
				data.per += data.per > 9 ? 0 : 1
				data.r1 = data.per / 10 * Math.PI * 2 * data.r
			},
			dele: function() {
				var me = this
				var data = me.data.progress_data
				data.per -= data.per < 1 ? 0 : 1
				data.r1 = data.per / 10 * Math.PI * 2 * data.r
			},
			ensure: function(e, data, view) {
				var me = this
				var data = me.data.progress_data
				var obj = {
					plugin_id: 503,
					total: 0,
					js: JSON.stringify({
						color_1: data.color_1.replace('#', ''),
						color_2: data.color_2.replace('#', '')
					}),
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})() /**
 * switcher
 */
;(function() {
	var Switcher_1 = function() {}

	Switcher_1.prototype.init = function(view) {
		var me = this
		var template = `<div class="nd-plugin-switcher-box">
            <div class="nd-plugin-switcher-btn"></div></div>`
		DD.addClass(view, 'nd-plugin-switcher')
		var data = DD.attr(view, 'dataItem') || 'data'
		//数据项名字
		view.$dataItem = data
		view.$switchStatus = DD.attr(view, 'switchStatus')
		view.$openColor = DD.attr(view, 'openColor')
		view.$closeColor = DD.attr(view, 'closeColor')
		view.$btnColor = DD.attr(view, 'btnColor')
		//移除showItem
		view.removeAttribute('dataItem')
		//设置innerHTML
		view.innerHTML = template
		DD.Compiler.compile(view, view.$module)
		view.$forceRender = true
	}

	Switcher_1.prototype.render = function(view) {
		var me = this
		var data = view.$getData().data
		if (!data) {
			return
		}
		var module
		if (!data.module) {
			module = view.$module
		} else {
			module = data.module
		}
		if (!module) {
			return
		}
		setTimeout(delayRender, 0)

		function delayRender() {
			//初始化设置switcher
			var switcherBox = view.querySelector('.nd-plugin-switcher-box')
			var switcherBtn = view.querySelector('.nd-plugin-switcher-btn')
			DD.css(switcherBtn, 'background-color', data[view.$btnColor])
			var switcherBoxParent = switcherBox.parentNode.parentNode
			var switcherBoxWidth = document.defaultView.getComputedStyle(switcherBoxParent, null).width
			var switcherBoxHeight = document.defaultView.getComputedStyle(switcherBoxParent, null).height
			DD.css(switcherBox, 'width', switcherBoxWidth)
			DD.css(switcherBox, 'height', switcherBoxHeight)
			DD.css(switcherBtn, 'width', switcherBoxHeight)
			DD.css(switcherBtn, 'height', switcherBoxHeight)
			DD.css(switcherBox, 'border-radius', switcherBoxHeight)
			var slideWidth =
				parseInt(document.defaultView.getComputedStyle(switcherBox, null).width) -
				parseInt(document.defaultView.getComputedStyle(switcherBtn, null).width)
			if (data.switcher) {
				DD.css(switcherBox, 'background-color', data[view.$openColor])
				DD.css(switcherBtn, 'left', slideWidth + 2 + 'px')
			} else {
				DD.css(switcherBox, 'background-color', data[view.$closeColor])
			}

			//点击事件
			var clickEvent = function(e, d, v) {
				if (data[view.$dataItem]) {
					data[view.$dataItem] = false
					DD.css(switcherBox, 'background-color', data[view.$openColor])
					DD.css(switcherBtn, 'left', 0)
				} else {
					data[view.$dataItem] = true
					DD.css(switcherBox, 'background-color', data[view.$closeColor])
					DD.css(switcherBtn, 'left', slideWidth + 2 + 'px')
				}
				DD.css(switcherBox, 'transition-property', 'border')
				DD.css(switcherBox, 'transition-duration', '400ms')
				DD.css(switcherBox, '-webkit-transition-property', 'border')
				DD.css(switcherBox, '-webkit-transition-duration', '400ms')
				DD.css(switcherBox, 'transition-property', 'box-shadow')
				DD.css(switcherBox, 'transition-duration', '400ms')
				DD.css(switcherBox, '-webkit-transition-property', 'box-shadow')
				DD.css(switcherBox, '-webkit-transition-duration', '400ms')
				DD.css(switcherBox, 'transition-property', 'background-color')
				DD.css(switcherBox, 'transition-duration', '1200ms')
				DD.css(switcherBox, '-webkit-transition-property', 'background-color')
				DD.css(switcherBox, '-webkit-transition-duration', '1200ms')

				DD.css(switcherBtn, 'transition-property', 'left')
				DD.css(switcherBtn, 'transition-duration', '500ms')
				DD.css(switcherBtn, '-webkit-transition-property', 'left')
				DD.css(switcherBtn, '-webkit-transition-duration', '500ms')
				DD.css(switcherBtn, '-moz-transition-property', 'left')
				DD.css(switcherBtn, '-moz-transition-duration', '500ms')
				DD.css(switcherBtn, '-o-transition-property', 'left')
				DD.css(switcherBtn, '-o-transition-duration', '500ms')
				view.$forceRender = true
			}

			//添加按钮事件
			new DD.Event({
				eventName: 'click',
				view: view,
				handler: clickEvent
			})
		}
	}
	DD.Plugin.create('switcher_1', Switcher_1)
	DD.createModule({
		delayInit: true,
		name: 'm_plugin_download_Switch_1',
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/switcher_1/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/switcher_1/index.html',
		data: {
			name: '普通开关',
			width_d: window.innerWidth * 0.45,
			switcher: true,
			open_color: '#4BD763',
			close_color: '#F9F9F9',
			btn_color: '#ffffff'
		},
		onBeforeFirstRender: function() {
			var me = this
			me.data.width_d = window.innerWidth * 0.45
		},
		onRender: function() {
			var me = this
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data
				var obj = {
					plugin_id: 301,
					js: JSON.stringify({
						color_1: data.open_color.replace('#', ''),
						color_2: data.close_color.replace('#', ''),
						color_3: data.btn_color.replace('#', '')
					}),
					total: 0,
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})() /**
 * NEON TEXT TOGGLE
 */
;(function() {
	var Switcher_2 = function() {}
	Switcher_2.prototype.init = function(view) {
		var me = this
		var template = `<div class='nd-plugin-switcher-box'><div class='nd-plugin-switcher' id='on'>ON</div><div class='nd-plugin-switcher' id='off'>OFF</div></div>`
		var dataValue = DD.attr(view, 'dataValue')
		view.$dataValue = dataValue
		view.$bgColor = DD.attr(view, 'bgColor')
		view.$shadowColor = DD.attr(view, 'shadowColor')
		view.$btnColor = DD.attr(view, 'btnColor')
		view.removeAttribute('dataValue')
		view.innerHTML = template
		DD.Compiler.compile(view, view.$module)
		view.$forceRender = true
	}
	Switcher_2.prototype.render = function(view) {
		var me = this
		var data = view.$getData().data
		if (!data) {
			return
		}
		var module
		if (!data.module) {
			module = view.$module
		} else {
			module = data.module
		}
		if (!module) {
			return
		}
		setTimeout(function() {
			var data = view.$getData().data
			var color_1 = data[view.$bgColor]
			var color_2 = data[view.$shadowColor]
			var color_3 = data[view.$shadowColor]
			var color_4 = data[view.$btnColor]
			var switcherON = view.querySelector('#on')
			var switcherOFF = view.querySelector('#off')
			var switcherBox = view.querySelector('.nd-plugin-switcher-box')
			DD.css(switcherBox, 'background', color_1)
			DD.css(switcherBox, 'padding', '0 20px')
			DD.css(switcherBox, 'width', '400px')
			DD.css(switcherBox, 'cursor', 'pointer')
			DD.css(switcherON, 'display', 'inline-block')
			DD.css(switcherON, 'transition', '220ms ease-in-out')
			DD.css(switcherOFF, 'transition', '220ms ease-in-out')
			DD.css(switcherON, 'margin-right', '20px')
			DD.css(switcherOFF, 'display', 'inline-block')
			DD.css(switcherBox, 'font-size', '100px')
			DD.css(switcherBox, 'color', color_2)
			DD.css(switcherBox, 'text-shadow', '0 0 90px transparent')
			DD.css(view, 'user-select', 'none')
			if (data.switcher) {
				DD.css(switcherOFF, 'color', color_1)
				DD.css(switcherON, 'color', color_4)
				DD.css(
					switcherON,
					'text-shadow',
					'0 0 5px #fff,0 0 10px #fff,0 0 20px ' +
						color_2 +
						',0 0 35px ' +
						color_2 +
						',0 0 40px ' +
						color_2 +
						',0 0 50px ' +
						color_2
				)
				DD.css(switcherOFF, 'text-shadow', 'none')
			} else {
				DD.css(switcherOFF, 'color', color_4)
				DD.css(switcherON, 'color', color_1)
				DD.css(
					switcherOFF,
					'text-shadow',
					'0 0 5px #fff,0 0 10px #fff,0 0 20px ' +
						color_3 +
						',0 0 35px ' +
						color_3 +
						',0 0 40px ' +
						color_3 +
						',0 0 50px ' +
						color_3
				)
				DD.css(switcherON, 'text-shadow', 'none')
			}
			var clickEvent = function(e, d, v) {
				if (data[view.$dataValue]) {
					data[view.$dataValue] = false
					DD.css(switcherOFF, 'color', color_4)
					DD.css(switcherON, 'color', color_1)
					DD.css(
						switcherOFF,
						'text-shadow',
						'0 0 5px #fff,0 0 10px #fff,0 0 20px ' +
							color_3 +
							',0 0 35px ' +
							color_3 +
							',0 0 40px ' +
							color_3 +
							',0 0 50px ' +
							color_3
					)
					DD.css(switcherON, 'text-shadow', 'none')
				} else {
					data[view.$dataValue] = true
					DD.css(switcherOFF, 'color', color_1)
					DD.css(switcherON, 'color', color_4)
					DD.css(
						switcherON,
						'text-shadow',
						'0 0 5px #fff,0 0 10px #fff,0 0 20px ' +
							color_2 +
							',0 0 35px ' +
							color_2 +
							',0 0 40px ' +
							color_2 +
							',0 0 50px ' +
							color_2
					)
					DD.css(switcherOFF, 'text-shadow', 'none')
				}
				view.$forceRender = true
			}
			new DD.Event({
				eventName: 'click',
				view: view,
				handler: clickEvent
			})
		}, 0)
	}
	DD.Plugin.create('textSwitcher', Switcher_2)
	DD.createModule({
		delayInit: true,
		name: 'm_plugin_download_Switch_2',
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/switcher_2/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/switcher_2/index.html',
		data: {
			name: '3d开关',
			width_d: 200,
			switcher: false,
			bg_color: '#292827',
			shadow_color: '#FF9900',
			btn_color: '#FFFFFF'
		},
		onBeforeFirstRender: function() {
			var me = this
			me.data.width_d = window.innerWidth * 0.45
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data
				var obj = {
					plugin_id: 302,
					js: JSON.stringify({
						color_1: data.bg_color.replace('#', ''),
						color_2: data.shadow_color.replace('#', ''),
						color_3: data.shadow_color.replace('#', ''),
						color_4: data.btn_color.replace('#', '')
					}),
					total: 0,
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})() /**
 * 3D switcher
 */
;(function() {
	var ThreeDimensionSwithcerA = function() {}

	ThreeDimensionSwithcerA.prototype.init = function(view) {
		var me = this
		var dataValue = DD.attr(view, 'dataValue')
		view.$dataValue = dataValue
		view.removeAttribute('dataValue')
		var template = `<div class="nd-plugin-switcher-box" style="width:{{width_d}}px"></div>`
		view.innerHTML = template
		view.$openColor = DD.attr(view, 'openColor') || 'open_color'
		view.$closeColor = DD.attr(view, 'closeColor') || 'close_color'
		DD.Compiler.compile(view, view.$module)
		view.$forceRender = true
	}
	ThreeDimensionSwithcerA.prototype.render = function(view) {
		var me = this
		var data = view.$getData().data
		// if (!data) {
		//     return;
		// }
		// var module;
		// if (!data.module) {
		//     module = view.$module;
		// } else {
		//     module = data.module;
		// }
		// if (!module) {
		//     return;
		// }
		setTimeout(delayRender, 0)

		function delayRender() {
			var switcherBox = view.querySelector('.nd-plugin-switcher-box')
			var switcherBtn = view.querySelector('.nd-plugin-switcher-btn')
			var check = view.querySelector('.check')
			var switcherBoxParent = switcherBox.parentNode.parentNode
			var switcherBoxWidth = document.defaultView.getComputedStyle(switcherBoxParent, null).width
			var switcherBoxHeight = document.defaultView.getComputedStyle(switcherBoxParent, null).height
			console.log(switcherBoxWidth)
			DD.css(switcherBox, 'width', switcherBoxWidth)
			DD.css(switcherBox, 'height', switcherBoxHeight)
			DD.css(switcherBox, 'border-radius', switcherBoxHeight)
			var color1 = data[view.$closeColor]
			var color2 = data[view.$openColor]
			var box_width = data.width_d / 10
			document.styleSheets[0].addRule(
				'.nd-plugin-switcher-box::before',
				'box-shadow:inset 0px 0px 0px ' + box_width / 2 + 'px ' + color1 + ',inset 0px 0px 0px 1000px #fff'
			)
			document.styleSheets[0].addRule('.nd-plugin-switcher-box::after', 'background-color:' + color1)
			document.styleSheets[0].addRule(
				'.checked::before',
				'box-shadow:inset 0px 0px 0px ' + box_width / 2 + 'px ' + color2 + ',inset 0px 0px 0px 1000px #fff'
			)
			document.styleSheets[0].addRule('.checked::after', 'background-color:' + color2)
			document.styleSheets[0].addRule('.checked::after', 'color:blue')
			if (data.switcher) {
				DD.css(switcherBox, 'box-shadow', '0 2px 5px 0px grey, 0 15px 20px 0px transparent')
				DD.addClass(switcherBox, 'checked')
			} else {
				DD.css(switcherBox, 'box-shadow', '0 5px 10px 0px #333, 0 15px 20px 0px #cccccc')
				DD.removeClass(switcherBox, 'checked')
			}
			DD.css(switcherBox, 'transition-property', 'box-shadow')
			DD.css(switcherBox, 'position', 'relative')
			DD.css(switcherBox, 'cursor', 'pointer')
			DD.css(switcherBox, 'transition', 'all 250ms ease-in')
			DD.css(switcherBox, '-webkit-transition-property', 'box-shadow')
			DD.css(switcherBox, '-webkit-transition', 'all 250ms ease-in')
			var clickEvent = function(e, d, v) {
				if (data[view.$dataValue]) {
					data[view.$dataValue] = false
					DD.css(switcherBox, 'box-shadow', '0 2px 5px 0px grey, 0 15px 20px 0px transparent')
					DD.removeClass(switcherBox, 'checked')
				} else {
					data[view.$dataValue] = true
					DD.addClass(switcherBox, 'checked')
					DD.css(switcherBox, 'box-shadow', '0 5px 10px 0px #333, 0 15px 20px 0px #cccccc')
				}
				view.$forceRender = true
			}
			new DD.Event({
				eventName: 'click',
				view: view,
				handler: clickEvent
			})
		}
	}

	DD.Plugin.create('ThreeDimensionSwithcerA', ThreeDimensionSwithcerA)
	DD.createModule({
		delayInit: true,
		name: 'm_plugin_download_Switch_3',
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/switcher_3/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/switcher_3/index.html',
		data: {
			name: '3d按钮开关',
			width_d: window.innerWidth * 0.4,
			switcher: true,
			close_color: '#cccccc',
			open_color: '#ff9900'
		},
		onBeforeFirstRender: function() {
			var me = this
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var data = me.data
				var obj = {
					plugin_id: 303,
					js: JSON.stringify({
						close_color: data.close_color.replace('#', ''),
						open_color: data.open_color.replace('#', '')
					}),
					total: 0,
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
;(function() {
	var mytable = function() {}
	mytable.prototype = {
		init: function(view) {
			var tem = `<div class="common">
            <div class="left">
                <div class='item border-right add-btn'>新增</div>
                <div class='item border-right reverse-btn'>修改</div>
                <div class='item dele-btn'>删除</div>
            </div>
            <div class='right'>
                <div class='item search-btn'>查询</div>
                <div class='search'>
                    <input type="text" class="input" />
                </div>
            </div>
        </div>
        <div class="header" >
            <div class="head-cont">
                <div class='thead'>
                    <input class='input' type="checkbox" x-field='check_all' yes-value='true' no-value='false' />
                </div>
                <div x-repeat='thead' class='thead'>{{name}}</div>
            </div>
        </div>
        <div class="my-table">
            <div class="head-cont">
                <div class='rows'>
                    <input class="input" type="checkbox" x-field='check_all' yes-value='true' no-value='false' />
                </div>
                <div x-repeat='thead' class='rows'>{{name}}</div>
            </div>
            <div class="table">
                <div class="list" x-repeat='th' x-class="{'check':'check'}">
                    <div class='rows'>
                        <input class="input" type="checkbox" x-field='check' yes-value='true' no-value='false' />
                    </div>
                    <div class="rows" x-repeat='td'><span class="span">{{ct}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="addmmit">
            <div class="page">
                <div class='pre'>上一页</div>
                <div class='next'>下一页</div>
                <div class='go'>
                    <div class='ensure'>转到</div>
                    <input class='text' type="text" />
                </div>
            </div>
        </div>
        <div class="reverse" x-show="show_reverse">
            <div class="cont">
                <div class="head">编辑
                    <div class="dele"></div>
                </div>
                <div class="item" x-repeat=" reverse">
                    <div>{{name}}</div>
                    <input class="ipt" x-field="field" type="text" />
                </div>
                <div class="ensure">确定</div>
            </div>
        </div>`
			view.innerHTML = tem
		},
		render: function(view) {
			var me = this
			me.datas = view.$getData().data
			me.setwidth = function() {
				var me = this
				me.dom1.forEach(function(item, index) {
					DD.css(item, 'width', 100 / (me.data.thead.length + 1) + '%')
					DD.css(item, 'padding', ' 2% 1%')
					DD.css(item, 'fontSize', 12 + 'px')
					DD.css(item, 'minWidth', 25 + 'px')
					DD.css(item, 'cursor', 'pointer')
					if (index % (me.data.thead.length + 1) !== 6) {
						DD.css(item, 'border-right', '1px solid #ddd')
					}
				})
				me.dom2.forEach(function(item, index) {
					DD.css(item, 'width', 100 / (me.data.thead.length + 1) + '%')
					DD.css(item, 'padding', ' 2% 1%')
					DD.css(item, 'fontSize', 12 + 'px')
					DD.css(item, 'boxSizing', 'border-box')
					DD.css(item, 'border-bottom', '1px solid #ddd')
					if (index % (me.data.thead.length + 1) !== 6) {
						DD.css(item, 'border-right', '1px solid #ddd')
					}
					//前期个为标题
					if (index < me.data.thead.length + 1) {
						DD.css(item, 'cursor', 'pointer')
					}
				})
				DD.css(me.first_thead, 'border', '1px solid #ddd')
				DD.css(me.header, 'width', me.second_thead.offsetWidth + 'px')
				DD.css(me.header, 'top', me.view.offsetTop + 'px')
			}
			setTimeout(function() {
				DD.css(view, 'color', me.datas.color_1)
				var arr = Array.from(view.querySelector('.left').children)
				// arr.forEach(function(i) {
				//     DD.css(i, "background-color", me.datas.color_2);
				// })
				me.reverse = view.querySelector('.reverse')
				me.header = view.querySelector('.header')
				me.data = view.$getData().data
				me.view = view.querySelector('.my-table')
				me.first_thead = view.querySelector('.head-cont')
				me.second_thead = me.view.querySelector('.head-cont')
				me.dom1 = me.first_thead.querySelectorAll('.thead')
				me.dom2 = view.querySelectorAll('.rows')
				me.setwidth()
				view.onresize = function() {
					me.setwidth()
				}
				me.view.onscroll = function() {
					me.setwidth()
					if (me.view.scrollTop > me.second_thead.scrollHeight) {
						DD.css(me.first_thead, 'display', 'block')
					}
					if (me.view.scrollTop <= me.second_thead.scrollHeight) {
						DD.css(me.first_thead, 'display', 'none')
					}
				}
				//搜索按钮
				new DD.Event({
					eventName: 'click',
					view: view.querySelector('.search-btn'),
					handler: function(e, data, v) {
						console.log(v.nextElementSibling.firstElementChild)
						var tem = v.nextElementSibling.firstElementChild.value.replace(/ /gi, '')
						var url = ''
						var params = {
							page: 1,
							row: 15
						}
						DD.request({
							params: {
								key: tem
							},
							url: 'http://localhost:3000/api/search.action'
							// successFunc: function(r) {
							//     me.data.table.th = [];
							//     r.rows.forEach(function(it, index, arr) {
							//         me.data.table.th.push({
							//             td: it,
							//             check: false,
							//         });
							//     });
							//     me.data.table.$set('th', me.data.table.th);
							// }
						})
					}
				})
				//删除按钮
				new DD.Event({
					eventName: 'click',
					view: view.querySelector('.dele-btn'),
					handler: function(e, data, view) {
						for (var i = 0; i < me.data.th.length; i++) {
							if (me.data.th[i].check === true || me.data.th[i].check === 'true') {
								me.data.th.splice(i, 1)
								i--
							}
						}
						me.data.check_all = false
					}
				})
				//修改按钮
				new DD.Event({
					eventName: 'click',
					view: view.querySelector('.reverse-btn'),
					handler: function(e, data, view) {
						var tem = null
						me.data.th.forEach(function(it, index, ar) {
							if (it.check === true || it.check === 'true') {
								tem = index
							}
						})
						if (!tem && tem !== 0) {
							return
						}
						me.data.th[tem].td.forEach(function(it, index) {
							me.data.reverse[index].field = it.ct
						})
						me.data.show_reverse = true
					}
				})
				//新增按钮
				new DD.Event({
					eventName: 'click',
					view: view.querySelector('.add-btn'),
					handler: function(e, data, view) {
						me.data.reverse.forEach(function(i) {
							i.field = ''
						})
						me.data.show_reverse = true
					}
				})
				//新增加的确认按钮
				new DD.Event({
					eventName: 'click',
					view: me.reverse.querySelector('.ensure'),
					handler: function(e, data, view) {
						me.data.reverse.forEach(function(i) {
							i.field = i.field + ''
							i.field = i.field.replace(/ /gi, '')
						})
						me.data.show_reverse = false
					}
				})
				//新增加的退出按钮
				new DD.Event({
					eventName: 'click',
					view: me.reverse.querySelector('.dele'),
					handler: function(e, data, view) {
						me.data.reverse.forEach(function(i) {
							i.field = ''
						})
						me.data.show_reverse = false
					}
				})
				//checkbox全选
				new DD.Event({
					eventName: 'click',
					view: me.second_thead,
					handler: function(e, data, view) {
						if (e.target.className === 'input') {
							var bool = false
							if (me.data.check_all === 'false' || me.data.check_all === false) bool = true
							me.data.th.forEach(function(i) {
								i.check = bool
							})
							return
						}
						var key = e.target.innerHTML.replace(/ /g, '')
						var index = 0
						me.data.thead.forEach(function(i, id, ar) {
							if (i.name.trim() === key) {
								index = id
							}
						})
						me.data.th.sort(function(a, b) {
							return parseInt(a.td[index].ct) - parseInt(b.td[index].ct)
						})
						me.setwidth()
					}
				})
				//checkbox全选
				new DD.Event({
					eventName: 'click',
					delg: true,
					view: me.first_thead,
					handler: function(e, data, view) {
						me.view.scrollTop = 0
						if (e.target.className === 'input') {
							var bool = false
							if (me.data.check_all === 'false' || me.data.check_all === false) bool = true
							me.data.th.forEach(function(i) {
								i.check = bool
							})
							return
						}
						var key = e.target.innerHTML.replace(/ /g, '')
						var index = 0
						me.data.thead.forEach(function(i, id, ar) {
							if (i.name.trim() === key) {
								index = id
							}
						})
						me.data.th.sort(function(a, b) {
							return parseInt(a.td[index].ct) - parseInt(b.td[index].ct)
						})
						me.setwidth()
					}
				})
			}, 0)
		}
	}
	DD.Plugin.create('table', mytable)
	DD.createModule({
		delayInit: true,
		name: 'm_plugin_download_Table_1',
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/table_1/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/table_1/index.html',
		onBeforeFirstRender: function() {},
		data: {
			name: '多用表格',
			table: {
				color_1: '#000',
				color_2: '#ffffff',
				show_reverse: false,
				check_all: false,
				thead: [
					{ name: '姓名' },
					{ name: '年龄' },
					{ name: '身高' },
					{ name: '体重' },
					{ name: '学历' },
					{ name: '工作经历' }
				],
				reverse: [
					{ name: '姓名', field: '' },
					{ name: '年龄', field: '' },
					{ name: '身高', field: '' },
					{ name: '体重', field: '' },
					{ name: '学历', field: '' },
					{ name: '工作经历', field: '' }
				],
				th: [
					{
						check: false,
						td: [{ ct: '张三' }, { ct: 100 }, { ct: '171' }, { ct: '53' }, { ct: '本科' }, { ct: '2年' }]
					},
					{
						check: false,
						td: [{ ct: '张三' }, { ct: 101 }, { ct: '173' }, { ct: '53' }, { ct: '本科' }, { ct: '1年' }]
					},
					{
						check: false,
						td: [{ ct: '张三' }, { ct: 107 }, { ct: '172' }, { ct: '53' }, { ct: '本科' }, { ct: '5年' }]
					},
					{
						check: false,
						td: [{ ct: '张三' }, { ct: 102 }, { ct: '173' }, { ct: '53' }, { ct: '本科' }, { ct: '3年' }]
					},
					{
						check: true,
						td: [{ ct: '张三' }, { ct: 101 }, { ct: '173' }, { ct: '53' }, { ct: '本科' }, { ct: '3年' }]
					},
					{
						check: false,
						td: [{ ct: '张三' }, { ct: 128 }, { ct: '177' }, { ct: '53' }, { ct: '本科' }, { ct: '3年' }]
					},
					{
						check: false,
						td: [{ ct: '张三' }, { ct: 128 }, { ct: '175' }, { ct: '53' }, { ct: '本科' }, { ct: '3年' }]
					},
					{
						check: false,
						td: [{ ct: '张三' }, { ct: 128 }, { ct: '178' }, { ct: '53' }, { ct: '本科' }, { ct: '3年' }]
					},
					{
						check: false,
						td: [{ ct: '张三' }, { ct: 128 }, { ct: '173' }, { ct: '53' }, { ct: '本科' }, { ct: '3年' }]
					},
					{
						check: false,
						td: [{ ct: '张三' }, { ct: 128 }, { ct: '179' }, { ct: '53' }, { ct: '本科' }, { ct: '3年' }]
					},
					{
						check: false,
						td: [{ ct: '张三' }, { ct: 128 }, { ct: '173' }, { ct: '53' }, { ct: '本科' }, { ct: '3年' }]
					},
					{
						check: false,
						td: [{ ct: '张三' }, { ct: 128 }, { ct: '173' }, { ct: '53' }, { ct: '本科' }, { ct: '3年' }]
					},
					{
						check: false,
						td: [{ ct: '张三' }, { ct: 128 }, { ct: '173' }, { ct: '53' }, { ct: '本科' }, { ct: '3年' }]
					}
				]
			}
		},
		onBeforeFirstRender: function() {
			var me = this
			me.data.color_2 = '#1b7adc'
			me.data.color_1 = 'fff'
			//清楚数据的方法
			// me.module.methodFactory.methods.clear.call(me, me.data);
			// console.log(me.data);
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var obj = {
					plugin_id: 401,
					class0: JSON.stringify({
						total: 1,
						names: '.el-plugin-table-1 .plugin .common .left .item',
						color: {
							names: 'background-color',
							values: me.data.table.color_2.replace('#', '')
						}
					}),
					class1: JSON.stringify({
						names: '.el-plugin-table-1 .plugin',
						color: {
							names: 'color',
							values: me.data.table.color_1.replace('#', '')
						}
					}),
					total: 2,
					flag: 0
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			},
			clear: function(obj) {
				var me = this
				for (var i in obj) {
					if (obj.hasOwnProperty(i) && i.indexOf('$') === -1) {
						if (typeof obj[i] === 'object') {
							if (obj[i] instanceof Array) {
								obj[i].forEach(function(it, index, arr) {
									if (typeof it === 'object') {
										me.module.methodFactory.methods.clear.call(me, it)
									} else {
										arr[index] = ''
									}
									return
								})
							} else {
								me.module.methodFactory.methods.clear.call(me, obj[i])
							}
						} else {
							obj[i] = ''
						}
					}
				}
			}
		}
	})
})()
;(function() {
	var tree = function() {}
	tree.prototype = {
		init: function(view) {},
		render: function(view) {
			var me = this
			me.datas = view.$getData().data
			if (!me.datas.one) {
				return
			}
			me.datas.one = 0
			//递归方法创建无限树
			me.create = function(arr) {
				var s = ''
				var tem = `  <div class="item wrap" id="{{txt}}" x-repeat="arr" x-class="{'show':'show'}">
                   <div class="ct">
                          <div   e-click="check" x-class="{'check':'click'}" class="input"></div>
                          <span class="txt" e-click="show">{{txt}}</span>
                   </div>\r\n`
				var arrd = []
				var count = 0
				arr.forEach(function(i, index, a) {
					if (i.arr) {
						arrd[count] = me.create(i.arr)
						count += 1
					}
				})
				var length = 0
				var max = '\r\n'
				arrd.forEach(i => {
					if (i.length > length) {
						max = i
						length = i.length
					}
				})
				return tem + max + `</div>\r\n`
			}
			var str = me.create(me.datas.arr) + `</div>`
			view.innerHTML = str
			view.$forceRender = true
			//重新编译
			DD.Compiler.compile(view, view.$module)
		}
	}
	DD.Plugin.create('tree', tree)
	DD.createModule({
		delayInit: true,
		name: 'm_plugin_download_Tree_1',
		requires: [
			{
				type: 'css',
				path: HTMLURL + '/plugin_download/tree_1/css/index.css'
			}
		],
		templateUrl: HTMLURL + '/plugin_download/tree_1/index.html',
		delayInit: true,
		data: {
			name: '树形组件',
			tree_data: {
				color_1: '#333333',
				color_2: '#1890ff',
				one: 1,
				arr: [
					{
						click: false,
						txt: 'parent-1',
						show: true,
						arr: [
							{
								click: false,
								txt: 'child-1',
								show: false,
								arr: [
									{
										click: false,
										txt: 'child-1-1',
										show: false
									},
									{
										click: false,
										txt: 'child-1-2',
										show: false
									}
								]
							},
							{
								click: false,
								txt: 'child-2',
								show: false
							},
							{
								click: false,
								txt: 'child-3',
								show: false
							},
							{
								click: false,
								txt: 'child-4',
								show: false
							}
						]
					},
					{
						click: false,
						txt: 'parent-2',
						show: true
					},
					{
						click: false,
						txt: 'parent-3',
						show: true
					},
					{
						click: false,
						txt: 'parent-4',
						show: true
					}
				]
			}
		},
		onBeforeFirstRender: function() {
			var me = this
			me.data.tree_data = {
				color_1: '#333333',
				color_2: '#1890ff',
				one: 1,
				arr: [
					{
						click: false,
						txt: 'parent-1',
						show: true,
						arr: [
							{
								click: false,
								txt: 'child-1',
								show: false,
								arr: [
									{
										click: false,
										txt: 'child-1-1',
										show: false
									},
									{
										click: false,
										txt: 'child-1-2',
										show: false
									}
								]
							},
							{
								click: false,
								txt: 'child-2',
								show: false
							},
							{
								click: false,
								txt: 'child-3',
								show: false
							},
							{
								click: false,
								txt: 'child-4',
								show: false
							}
						]
					},
					{
						click: false,
						txt: 'parent-2',
						show: true
					},
					{
						click: false,
						txt: 'parent-3',
						show: true
					},
					{
						click: false,
						txt: 'parent-4',
						show: true
					}
				]
			}
		},
		methods: {
			ensure: function(e, data, view) {
				var me = this
				var obj = {
					plugin_id: 1601,
					total: 0,
					flag: 1,
					js: JSON.stringify({
						color_1: me.data.tree_data.color_1.replace('#', ''),
						color_2: me.data.tree_data.color_2.replace('#', '')
					})
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			},
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
				// d.click=!d.click;
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
	})
})()
