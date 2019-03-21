/**
 * 分页插件
 * 欲用此插件，必先在使用此插件的模块上有一个updatePage函数,用来点击之后刷新页面
 * page:当前页
 * to_page:输入框的数据（到第几页）
 * allpage:总共多少页
 * @return {[type]} [description]
 */
;(function() {
	var plugin_01001 = function() {}

	plugin_01001.prototype = {
		init: function(view) {
			var me = this
			var template = `<div class="nd-plugin-paging"> <span>共<span class="red">{{total}}</span>条记录</span>
                                <span>共<span class="red">{{allpage}}</span>页</span>
                                <span>当前第<span class="red">{{page}}</span>页</span>
                                <div class="to-first" x-class="{'can-not':'page==1'}">首页</div>
                                <div class="to-prev" x-class="{'can-not':'page==1'}">上一页</div>
                                <div class="to-next" x-class="{'can-not':'page==allpage'}">下一页</div>
                                <div class="to-last" x-class="{'can-not':'page==allpage'}">末页</div>
                                <span>转到:</span>
                                <input type="number" x-field="to_page">
                                <div class="go-to">GO</div>
                            </div>`
			view.innerHTML = template
			DD.Compiler.compile(view, view.$module)
			view.$forceRender = true
		},
		render: function(view) {
			new DD.Event({
				eventName: 'click',
				view: view.querySelector('.to-first'),
				handler: function(e, d, v) {
					if (this.data.page !== 1) {
						this.data.page = 1
						this.module.methodFactory.methods.updatePage.call(this)
					}
				}
			})
			new DD.Event({
				eventName: 'click',
				view: view.querySelector('.to-last'),
				handler: function(e, d, v) {
					if (this.data.page !== this.data.allpage) {
						this.data.page = this.data.allpage
						this.module.methodFactory.methods.updatePage.call(this)
					}
				}
			})
			new DD.Event({
				eventName: 'click',
				view: view.querySelector('.to-prev'),
				handler: function(e, d, v) {
					if (this.data.page > 1) {
						this.data.page--
						this.module.methodFactory.methods.updatePage.call(this)
					}
				}
			})
			new DD.Event({
				eventName: 'click',
				view: view.querySelector('.to-next'),
				handler: function(e, d, v) {
					if (this.data.page < this.data.allpage) {
						this.data.page++
						this.module.methodFactory.methods.updatePage.call(this)
					}
				}
			})
			new DD.Event({
				eventName: 'click',
				view: view.querySelector('.go-to'),
				handler: function(e, d, v) {
					if (
						this.data.page !== this.data.to_page &&
						this.data.to_page >= 1 &&
						this.data.to_page <= this.data.allpage
					) {
						this.data.page = this.data.to_page
						this.module.methodFactory.methods.updatePage.call(this)
					}
				}
			})
		}
	}
	DD.Plugin.create('paging', plugin_01001)
})()
;(function() {
	var plugin_01001 = function() {}
	plugin_01001.prototype = {
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
									<li x-repeat="popular_country">
										<div name="{{name}}">{{name}}</div>
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
						`>` +
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
			if (data.data) {
				data = data.data
			}
			if (!data) {
				return
			}
			setTimeout(function() {
				var pop = view.querySelector('.nd-plugin-location-popularlist')
				var fixed = view.querySelector('.nd-plugin-location-letterlist')
				var route = document.querySelector('.router-content')
				var color1 = data.small_div.color_1
				var color2 = data.small_div.color_2
				var color3 = data.small_div.color_3
				var li = []
				li = Array.from(fixed.getElementsByTagName('a'))
				li.forEach(function(i) {
					DD.css(i, 'color', color2)
				})
				li = Array.from(pop.getElementsByTagName('div'))
				li.forEach(function(i) {
					DD.css(i, 'background-color', color1)
					DD.css(i, 'background-color', '#ffffff')
				})
				li = document.querySelectorAll('.nd-plugin-location-A')
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
								location_country.querySelector('span').innerHTML = '当前省份:' + me.province[p][i].name
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
	DD.Plugin.create('plugin_01001', plugin_01001)
})()
;(function() {
	var plugin_01001 = function() {}

	plugin_01001.prototype = {
		init: function(view) {
			var me = this
			var template = `<div class="nd-plugin-paging">
                                <span>共<span class="red">{{total}}</span>条记录</span>
                                <span>共<span class="red">{{allpage}}</span>页</span>
                                <span>当前第<span class="red">{{page}}</span>页</span>
                                <div class="to-first" x-class="{'can-not':'page==1'}">首页</div>
                                <div class="to-prev" x-class="{'can-not':'page==1'}">上一页</div>
                                <div class="to-next" x-class="{'can-not':'page==allpage'}">下一页</div>
                                <div class="to-last" x-class="{'can-not':'page==allpage'}">末页</div>
                                <span>转到:</span>
                                <input type="number" x-field="to_page">
                                <div class="go-to">GO</div>
                            </div>`
			view.innerHTML = template
			DD.Compiler.compile(view, view.$module)
			view.$forceRender = true
		},
		render: function(view) {
			new DD.Event({
				eventName: 'click',
				view: view.querySelector('.to-first'),
				handler: function(e, d, v) {
					if (this.data.page !== 1) {
						this.data.page = 1
						this.module.methodFactory.methods.updatePage.call(this)
					}
				}
			})
			new DD.Event({
				eventName: 'click',
				view: view.querySelector('.to-last'),
				handler: function(e, d, v) {
					if (this.data.page !== this.data.allpage) {
						this.data.page = this.data.allpage
						this.module.methodFactory.methods.updatePage.call(this)
					}
				}
			})
			new DD.Event({
				eventName: 'click',
				view: view.querySelector('.to-prev'),
				handler: function(e, d, v) {
					if (this.data.page > 1) {
						this.data.page--
						this.module.methodFactory.methods.updatePage.call(this)
					}
				}
			})
			new DD.Event({
				eventName: 'click',
				view: view.querySelector('.to-next'),
				handler: function(e, d, v) {
					if (this.data.page < this.data.allpage) {
						this.data.page++
						this.module.methodFactory.methods.updatePage.call(this)
					}
				}
			})
			new DD.Event({
				eventName: 'click',
				view: view.querySelector('.go-to'),
				handler: function(e, d, v) {
					if (
						this.data.page !== this.data.to_page &&
						this.data.to_page >= 1 &&
						this.data.to_page <= this.data.allpage
					) {
						this.data.page = this.data.to_page
						this.module.methodFactory.methods.updatePage.call(this)
					}
				}
			})
		}
	}
	if (!DD.Plugin.plugins['plugin_01001']) {
		DD.Plugin.create('plugin_01001', plugin_01001)
	}
})()
;(function() {
	var plugin_02001 = function() {}
	plugin_02001.prototype.init = function(view) {
		var me = this
		var template = `<div class='nd-plugin-buffering-box'>
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
		view.innerHTML = template
		var data = DD.attr(view, 'dataName') || 'data'
		//数据项名字
		view.$dataItem = data
		//移除showItem
		view.removeAttribute('dataItem')
		//设置innerHTML
		DD.Compiler.compile(view, view.$module)
		view.$forceRender = true
	}

	plugin_02001.prototype.render = function(view) {
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
			var data = view.$getData().data
			var bufferingBox = document.querySelector('.nd-plugin-buffering-box')
			var par = view.querySelector('.nd-plugin-buffering-loader')
			var dom = []
			var dom = Array.from(par.getElementsByTagName('div'))
			var small_time = data[view.$dataItem].animation_time / dom.length
			dom.forEach(function(item, index) {
				DD.css(item, 'animation-duration', data[view.$dataItem].animation_time + 's')
				DD.css(item, 'animation-delay', small_time * index + 's')
				DD.css(item, 'background-color', data[view.$dataItem].color)
				DD.css(item, 'width', 2 * data[view.$dataItem].radius + 'px')
				DD.css(item, 'height', 2 * data[view.$dataItem].radius + 'px')
			})
			var bufferingBoxParents = bufferingBox.parentNode.parentNode
			var bufferingBoxWidth = document.defaultView.getComputedStyle(bufferingBoxParents, null).width
			var bufferingBoxHeight = document.defaultView.getComputedStyle(bufferingBoxParents, null).height
			DD.css(bufferingBox, 'width', bufferingBoxWidth)
			DD.css(bufferingBox, 'height', bufferingBoxHeight)
			var mask = document.querySelector('.mask')
			DD.css(mask, 'width', bufferingBoxWidth)
			DD.css(mask, 'height', bufferingBoxHeight)
		}
	}

	DD.Plugin.create('plugin_02001', plugin_02001)
})() /**
 * create by xll on 2018/5/11.
 * 加载动画
 */
var plugin_02002 = function() {}
plugin_02002.prototype = {
	init: function(view) {
		var me = this
		var template = `<div class="nd-plugin-loading-2" x-if="buffering_data.show">
                            <div class="spinner">
                                <div class="rect1"></div>
                                <div class="rect2"></div>
                                <div class="rect3"></div>
                                <div class="rect4"></div>
                                <div class="rect5"></div>
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
		var data = view.$getData().data
		var height = parseInt(data[view.$dataItem].height)
		var width = parseInt(data[view.$dataItem].width)
		var color = data[view.$dataItem].color
		setTimeout(function() {
			me.content = view.querySelector('.spinner')
			me.dom = Array.from(me.content.getElementsByTagName('div'))
			DD.css(me.content, 'width', width + 'px')
			DD.css(me.content, 'height', height + 'px')

			me.dom.forEach(function(i) {
				DD.css(i, 'height', height + 'px')
				DD.css(i, 'width', (width - 0.2 * width) / me.dom.length + 'px')

				DD.css(i, 'background-color', color)
			})
		}, 0)
	}
}
DD.Plugin.create('plugin_02002', plugin_02002) /**
 * create by xll on 2018/5/11.
 * 加载动画
 */
var plugin_02003 = function() {}
plugin_02003.prototype = {
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
			var box = view.querySelector('.nd-plugin-buffering-box-3')
			var pluginBox = box.parentNode.parentNode
			var right = view.querySelector('.nd-plugin-buffering-right')
			var left = view.querySelector('.nd-plugin-buffering-left')
			var rightBox = view.querySelector('.nd-plugin-buffering-rightbox')
			var leftBox = view.querySelector('.nd-plugin-buffering-leftbox')
			var imgBox = view.querySelector('.nd-plugin-buffering-imgbox')
			var color = data.color_1
			var time = parseInt(data.animation_time)
			if (time < 1) time = 2

			DD.css(box, 'height', document.defaultView.getComputedStyle(pluginBox, null).height)
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
DD.Plugin.create('plugin_02003', plugin_02003)
;(function() {
	var plugin_02004 = function() {}
	plugin_02004.prototype = {
		init: function(view) {
			var template = `<div class="content" x-if="buffering_data.show">
                          <span class="my_span"></span>
                          <span class="my_span"></span>
                          <span class="my_span"></span>
                          <span class="my_span"></span>
                          <span class="my_span"></span>
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
			var data = view.$getData().data
			var color = data[view.$dataItem].color
			var time = data[view.$dataItem].time
			var height = parseInt(data[view.$dataItem].height)
			var width = parseInt(data[view.$dataItem].width)
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
	DD.Plugin.create('plugin_02004', plugin_02004)
})()
;(function() {
	var plugin_02005 = function() {}
	plugin_02005.prototype = {
		init: function(view) {
			var template = `<div class="com-loading" x-if="buffering_data.show">
                                <div class="spinner">
                                    <div class="bounce1 small"></div>
                                    <div class="bounce2 small"></div>
                                    <div class="bounce3 small"></div>
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
			var data = view.$getData().data
			setTimeout(function() {
				var dom = view.querySelectorAll('.small')
				dom.forEach(function(i, index) {
					DD.css(i, 'background-color', data[view.$dataItem].color)
					DD.css(i, 'width', 2 * data[view.$dataItem].radius + 'px')
					DD.css(i, 'height', 2 * data[view.$dataItem].radius + 'px')
					DD.css(i, 'animation-delay', data[view.$dataItem].time / 5 * index + 's')
				})
			}, 0)
		}
	}
	DD.Plugin.create('plugin_02005', plugin_02005)
})()
;(function() {
	var plugin_02006 = function() {}
	plugin_02006.prototype.init = function(view) {
		var me = this
		var template = `<div class='nd-plugin-buffering-box-line'>
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
		view.innerHTML = template
		var data = DD.attr(view, 'dataName') || 'data'
		//数据项名字
		view.$dataItem = data
		//移除showItem
		view.removeAttribute('dataItem')
		//设置innerHTML
		DD.Compiler.compile(view, view.$module)
		view.$forceRender = true
	}

	plugin_02006.prototype.render = function(view) {
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
			var data = view.$getData().data
			var bufferingBox = document.querySelector('.nd-plugin-buffering-box-line')
			var par = view.querySelector('.nd-plugin-buffering-loader')
			var dom = []
			var dom = Array.from(par.getElementsByTagName('div'))
			var small_time = data[view.$dataItem].animation_time / dom.length
			dom.forEach(function(item, index) {
				DD.css(item, 'animation-duration', data[view.$dataItem].animation_time + 's')
				DD.css(item, 'animation-delay', small_time * index + 's')
				DD.css(item, 'background-color', data[view.$dataItem].color)
			})
			var bufferingBoxParents = bufferingBox.parentNode.parentNode
			var bufferingBoxWidth = document.defaultView.getComputedStyle(bufferingBoxParents, null).width
			var bufferingBoxHeight = document.defaultView.getComputedStyle(bufferingBoxParents, null).height
			console.log(bufferingBoxParents)
			DD.css(bufferingBox, 'width', bufferingBoxWidth)
			DD.css(bufferingBox, 'height', bufferingBoxHeight)
			var mask = document.querySelector('.mask')
			DD.css(mask, 'width', bufferingBoxWidth)
			DD.css(mask, 'height', bufferingBoxHeight)
		}
	}

	DD.Plugin.create('plugin_02006', plugin_02006)
})() //普通轮播图
;(function() {
	var plugin_03001 = function() {}
	plugin_03001.prototype = {
		init: function(view) {
			var template = `<div class='content' x-model='carousel_data'">
                                <div class='show' x-class="{'translate':'translate'}">
                                    <img class='imgs' x-repeat='imgs' src="{{url}}">
                                </div>
                                <div class='span'>
                                    <span x-repeat='imgs' class='photo-span' x-show="$index!==0"></span>
                                </div>
                                <div class="left"><div class="img-content"></div></div>
                                <div class="right"><div class="img-content"></div></div>
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
			console.log(view.$getData())
			me.data = view.$getData().data[view.$dataItem].imgs
			me.data.push(DD.clone(me.data[0]))
			me.color = view.$getData().data[view.$dataItem].check_color
			//me.check_color=view.$getData().data.ca_photo;
			me.drawimage = function() {
				var me = this
				DD.css(me.show, 'transform', 'translateX(' + me.translate + 'px)')
			}
			me.removespan = function() {
				var me = this
				me.span.forEach(function(item) {
					DD.css(item, 'background-color', '#ffffff')
				})
			}
			me.addspan = function() {
				if (me.span[me.index]) {
					if (me.index === 0) DD.css(me.span[me.data.length - 1], 'background-color', me.color)
					else {
						DD.css(me.span[me.index], 'background-color', me.color)
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
				clearInterval(window.timer_11)
				var my_time = 3000
				if (window.data && window.data.time) {
					my_time = window.data.time
				}
				window.timer_11 = setInterval(function() {
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
				me.span_width = view.$getData().data[view.$dataItem].width
				//true为左边滑动
				me.flag = true
				if (view.$getData().data[view.$dataItem].right) {
					me.flag = false
				}

				if (view.$getData().data[view.$dataItem].is_circle) {
					me.span.forEach(function(item) {
						DD.css(item, 'border-radius', '100%')
						DD.css(item, 'width', me.span_width + 'px')
						DD.css(item, 'height', me.span_width + 'px')
					})
				} else {
					me.span.forEach(function(item) {
						DD.css(item, 'width', me.span_width + 'px')
						DD.css(item, 'height', me.span_width + 'px')
					})
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
				eventName: 'mouseover',
				view: view.querySelector('.content'),
				handler: function(e, data, view) {
					DD.css(document.querySelector('.left'), 'display', 'block')
					DD.css(document.querySelector('.right'), 'display', 'block')
				}
			})
			new DD.Event({
				eventName: 'mouseout',
				view: view.querySelector('.content'),
				handler: function(e, data, view) {
					DD.css(document.querySelector('.left'), 'display', 'none')
					DD.css(document.querySelector('.right'), 'display', 'none')
				}
			})
			new DD.Event({
				eventName: 'swipeleft',
				view: view,
				handler: function(e, data, view) {
					if (me.is_can) {
						me.is_can = false
						clearInterval(window.timer_11)
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
						clearInterval(window.timer_11)
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
						clearInterval(window.timer_11)
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
						clearInterval(window.timer_11)
						me.doself(1)
						me.updata()
					}
				}
			})
		}
	}
	DD.Plugin.create('plugin_03001', plugin_03001)
})()
;(function() {
	var plugin_03002 = function() {}
	plugin_03002.prototype = {
		init: function(view) {
			var tem = `<figure class='carous' x-model='carousel_data'>
                            <img src="{{url}}" alt="图片" x-repeat='imgs' class='img-trans'>
                        </figure>
                        <div class="spancont">
                        <div class="span" x-model='carousel_data'>
                                <span class='inline-span' x-repeat='imgs' x-show="$index>1"></span>
                            </div>
                        </div><div class="left"><div class="img-content"></div></div>
                      <div class="right"><div class="img-content"></div></div>`
			view.innerHTML = tem
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
			me.imgs = view.$getData().data[view.$dataItem].imgs
			me.imgs.push(DD.clone(me.imgs[0]))
			me.imgs.push(DD.clone(me.imgs[1]))
			me.check_color = view.$getData().data[view.$dataItem].check_color
			me.removespan = function() {
				me.span.forEach(function(i) {
					DD.css(i, 'background-color', '#FFFFFF')
				})
			}
			me.addspan = function() {
				var index = (me.imgs.length - me.count) % me.imgs.length
				if (index < 0) index += me.imgs.length
				DD.css(me.span[index], 'background-color', me.check_color)
			}
			me.updata = function() {
				clearInterval(window.timer_12)
				me.is_can = false
				window.timer_12 = setInterval(function() {
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
				me.span_width = view.$getData().data[view.$dataItem].width
				me.span_is_circle = view.$getData().data[view.$dataItem].is_circle
				if (me.span_is_circle) {
					me.span.forEach(function(i) {
						DD.css(i, 'width', me.span_width + 'px')
						DD.css(i, 'height', me.span_width + 'px')
						DD.css(i, 'border-radius', '100%')
					})
				} else {
					me.span.forEach(function(i) {
						DD.css(i, 'width', me.span_width + 'px')
						DD.css(i, 'height', me.span_width + 'px')
					})
				}
				//1为left -1为right
				if (view.$getData().data[view.$dataItem].right) {
					me.direct = 1
				}
				me.direct = -1
				var temp = me.imgs.length * 25
				autopreFix.fixPre(DD.css,me.spans, 'width', temp + 'px')
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
				eventName: 'mouseover',
				view: view.querySelector('.carous'),
				handler: function(e, data, view) {
					DD.css(document.querySelector('.left'), 'display', 'block')
					DD.css(document.querySelector('.right'), 'display', 'block')
				}
			})
			new DD.Event({
				eventName: 'mouseout',
				view: view.querySelector('.carous'),
				handler: function(e, data, view) {
					DD.css(document.querySelector('.left'), 'display', 'none')
					DD.css(document.querySelector('.right'), 'display', 'none')
				}
			})
			new DD.Event({
				eventName: 'swipeleft',
				view: view,
				handler: function() {
					if (me.is_can) {
						clearInterval(window.timer_12)
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
						clearInterval(window.timer_12)
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
						clearInterval(window.timer_12)
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
						clearInterval(window.timer_12)
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
	DD.Plugin.create('plugin_03002', plugin_03002)
})()
;(function() {
	plugin_03003 = function() {}
	plugin_03003.prototype = {
		init: function(view) {
			var tem = ` <div class='content' x-model='carousel_data'>
                          <div class="img-photo3">
                               <div  style="background-image: url('{{url}}');background-size:100% 100%" class='img' x-repeat='imgs'></div>
                          </div>
                          <div style="clear:both"></div>
                          <div class='span'>
                             <div class='span-cont'>
                                <span x-repeat='imgs' class='item-spans'></span>
                             </div>
                          </div>
                          <div class="left"><div class="img-content"></div></div>
                          <div class="right"><div class="img-content"></div></div>
                        </div>`
			view.innerHTML = tem
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
			me.count = 0
			//标记能够事件
			me.is_can = false
			//由于有数组个translationend事件 用来标记
			me.time_count = 0
			//更新页面
			me.direct = 1
			console.log(view.$getData())
			me.check_color = view.$getData().data[view.$dataItem].check_color
			if (view.$getData().data[view.$dataItem].up) {
				me.direct = -1
			}
			me.updata = function() {
				clearInterval(window.timer_13)
				me.is_can = false
				window.timer_13 = setInterval(function() {
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
				DD.css(me.span[index], 'background-color', me.check_color)
			}
			//去掉span颜色
			me.removespan = function() {
				var me = this
				me.span.forEach(function(item) {
					DD.css(item, 'background-color', '#FFFFFF')
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
				me.span = view.querySelectorAll('.item-spans')
				me.spans = view.querySelector('.span-cont')
				var temp = me.span.length * 25
				me.span_width = view.$getData().data[view.$dataItem].width
				me.span_is_circle = view.$getData().data[view.$dataItem].is_circle
				if (me.span_is_circle) {
					me.span.forEach(function(i) {
						DD.css(i, 'width', me.span_width + 'px')
						DD.css(i, 'height', me.span_width + 'px')
						DD.css(i, 'border-radius', '100%')
					})
				} else {
					me.span.forEach(function(i) {
						DD.css(i, 'width', me.span_width + 'px')
						DD.css(i, 'height', me.span_width + 'px')
					})
				}
				//获取容器高度用来呈现3d效果
				me.imgh = parseInt(DD.css(view.querySelector('.content'), 'height'))
				//imgs下面的小数组
				me.tem = view.querySelectorAll('.img-photo3')
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
				eventName: 'mouseover',
				view: view.querySelector('.content'),
				handler: function(e, data, view) {
					DD.css(document.querySelector('.left'), 'display', 'block')
					DD.css(document.querySelector('.right'), 'display', 'block')
				}
			})
			new DD.Event({
				eventName: 'mouseout',
				view: view.querySelector('.content'),
				handler: function(e, data, view) {
					DD.css(document.querySelector('.left'), 'display', 'none')
					DD.css(document.querySelector('.right'), 'display', 'none')
				}
			})
			new DD.Event({
				eventName: 'swiperight',
				view: view,
				handler: function(e, data, view) {
					if (me.is_can) {
						me.is_can = false
						clearInterval(window.timer_13)
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
						clearInterval(window.timer_13)
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
						clearInterval(window.timer_13)
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
						clearInterval(window.timer_13)
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
	DD.Plugin.create('plugin_03003', plugin_03003)
})()
;(function() {
	plugin_03004 = function() {}
	plugin_03004.prototype = {
		init: function(view) {
			var tem = ` <div class='content' x-model='carousel_data'>
                          <div class="img-photo ttttt" x-repeat="imgs">
                            <div src="{{url}}" alt='图片库' x-repeat='img_item' style="background-image: url('{{url}}');background-size:100% 100%" class='img'></div>
                          </div>
                          <div style="clear:both"></div>
                          <div class='spans'>
                             <div class='span-cont'>
                                <span x-repeat='imgs' class='item-span' style="width:{{width}}px;height:{{height}}px"></span>
                             </div>
                          </div>
                          <div class="left"><div class="img-content"></div></div>
                          <div class="right"><div class="img-content"></div></div>
                            </div>`
			view.innerHTML = tem
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
			me.count = 0
			//标记能够事件
			me.is_can = false
			//由于有数组个translationend事件 用来标记
			me.time_count = 0
			me.check_color = view.$getData().data[view.$dataItem].check_color
			//更新页面
			me.updata = function() {
				clearInterval(window.timer_14)
				me.is_can = false
				window.timer_14 = setInterval(function() {
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
				DD.css(me.span[index], 'background-color', me.check_color)
			}
			//去掉span颜色
			me.removespan = function() {
				var me = this
				me.span.forEach(function(item) {
					DD.css(item, 'background-color', '#FFFFFF')
				})
			}
			//在渲染完毕开始执行dx为1是下滑
			me.dx = 1
			if (view.$getData().data[view.$dataItem].up) {
				me.dx = -1
			}

			setTimeout(function() {
				window.addEventListener('transitionend', function() {
					me.time_count++
					if (me.time_count === me.tem.length) {
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
				me.span_width = view.$getData().data[view.$dataItem].width
				me.span_is_circle = view.$getData().data[view.$dataItem].is_circle
				if (me.span_is_circle) {
					me.span.forEach(function(i) {
						DD.css(i, 'width', me.span_width + 'px')
						DD.css(i, 'height', me.span_width + 'px')
						DD.css(i, 'border-radius', '100%')
					})
				} else {
					me.span.forEach(function(i) {
						DD.css(i, 'width', me.span_width + 'px')
						DD.css(i, 'height', me.span_width + 'px')
					})
				}
				//初始化第一个span
				me.addspan()
				//更新页面
				me.updata()
			}, 0)
			new DD.Event({
				eventName: 'mouseover',
				view: view.querySelector('.content'),
				handler: function(e, data, view) {
					DD.css(document.querySelector('.left'), 'display', 'block')
					DD.css(document.querySelector('.right'), 'display', 'block')
				}
			})
			new DD.Event({
				eventName: 'mouseout',
				view: view.querySelector('.content'),
				handler: function(e, data, view) {
					DD.css(document.querySelector('.left'), 'display', 'none')
					DD.css(document.querySelector('.right'), 'display', 'none')
				}
			})
			new DD.Event({
				eventName: 'swiperight',
				view: view,
				handler: function(e, data, view) {
					if (me.is_can) {
						me.is_can = false
						clearInterval(window.timer_14)
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
						clearInterval(window.timer_14)
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
						clearInterval(window.timer_14)
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
						clearInterval(window.timer_14)
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
	DD.Plugin.create('plugin_03004', plugin_03004)
})()
DD.createModule({
	el: '#app',
	data: {
		histogram: {
			title: '直方图',
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
		},
		addLineData(e, data) {
			var d = DD.clone(data.data)
			var o = {}
			var ad = data.addData.split(' ')
			var datas = [{ x: '1月' }, { x: '2月' }, { x: '3月' }, { x: '4月' }, { x: '5月' }, { x: '6月' }]
			for (var i = 0, l = 6; i < l; i++) {
				datas[i].y = parseInt(ad[i], 10)
			}
			o.datas = datas
			o.title = data.addTitle
			d.push(o)
			data.data = d
		}
	}
})
DD.createModule({
	el: '#app',
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
	}
})
DD.createModule({
	el: '#app',
	data: {
		pie: {
			title: '饼状图',
			legend: '',
			titleColor: '#000000',
			legend: '',
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
		changeTitleColor(e, data, view) {
			data.titleColor = e.target.value
		},
		changeLegend(e, data, view) {
			data.legend = e.target.value
		},

		addPieData(e, data) {
			var cD = DD.clone(data.data)
			var d = {
				title: data.addTitle,
				value: parseInt(data.addData, 10)
			}
			cD.push(d)
			data.data = cD
		}
	}
})
DD.createModule({
	el: '#app',
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
		addRadarData(e, data) {
			var cD = DD.clone(data.data)
			var ads = data.addData.split(' ')
			for (var i = 0, l = ads.length; i < l; i++) {
				ads[i] = parseFloat(ads[i], 10)
			}
			cD.push({
				title: data.addTitle,
				datas: ads
			})
			data.data = cD
		},
		changeRadarColors(e, data) {
			var radar = DD.clone(data.radar)
			radar.colors = data.changeColors.split(' ')
			data.radar = radar
		}
	}
})
DD.createModule({
	el: '#app',
	data: {
		scatter: {
			title: '散点图',
			legend: '',
			marker: false,
			titleColor: '#000000',
			legend: '',
			symbolSize: 8,
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
					cs: ''
				}
			],
			addX: '',
			addY: ''
		}
	},
	methods: {
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
		},
		changeSymbolSize(e, data) {
			data.symbolSize = parseInt(data.cs, 10)
		},
		addScatterData(e, data) {
			var cD = DD.clone(data.data)
			cD[0].datas.push({
				x: parseFloat(data.addX, 10),
				y: parseFloat(data.addY, 10)
			})
			data.data = cD
		}
	}
})
;(function() {
	var plugin_04001 = function() {}
	plugin_04001.prototype = {
		init: function(view) {
			var template = `<div class="check-content">
                                <div class="check"></div>
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
				me.check = view.querySelector('.check')
				DD.css(me.check, 'width', data.size + 'px')
				DD.css(me.check, 'height', data.size + 'px')
				if (data.is_circle) {
					DD.css(me.check, 'border-radius', '100%')
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
	DD.Plugin.create('plugin_04001', plugin_04001)
})()
;(function() {
	var plugin_04002 = function() {}
	plugin_04002.prototype = {
		init: function(view) {
			var template = `<div class="check-one">
                                <div class="item" x-class="{'no-check':true}">
                                    <svg id="not-check-icon" class="fill" viewBox="0 0 24 24">
                                        <path id="_san_2032" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
                                    </svg>
                                    <svg id="check-icon" class="fill" viewBox="0 0 24 24">
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
	DD.Plugin.create('plugin_04002', plugin_04002)
})()
;(function() {
	var plugin_04003 = function() {}
	plugin_04003.prototype = {
		init: function(view) {
			var template = `<div class="check-three">
                                <div class="check-icon" x-class="{'check':'yes_2'}">
                                    visibility_off
                                </div>
                                <div class="check-icon" x-class="{'no-check':'!yes_2'}">
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
	DD.Plugin.create('plugin_04003', plugin_04003)
})()
;(function() {
	var plugin_04004 = function() {}
	plugin_04004.prototype = {
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
	DD.Plugin.create('plugin_04004', plugin_04004)
})()
flag2 = true
if (flag1 && flag2) {
	flag1 = false
	flag2 = false
	var script = document.createElement('script')
	script.src = '/plugin_set/public/js/plugin_set.js'
	document.body.append(script)
}
