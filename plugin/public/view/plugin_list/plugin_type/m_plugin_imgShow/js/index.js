;
(function() {
	var data = {

		delayInit: true,
		requires: [{
			type: 'css',
			path: '/plugin_set/public/plugins/plugins_show/imgShow/magn_1/css/index.css'
		},{
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
})()