;(function() {
	var data = {
		delayInit: true,
		requires: [{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/other/uploadImage/css/index.css' }],
		name: 'm_plugin_other',
		data: {
			hasCreated: false,
			name: "上传图片"
		},
		delayInit: true,
		modules: [
			{
				el: '.el-plugin-20001',
				onBeforeFirstRender() {
					if (window.navigator.userAgent.indexOf('iPhone') !== -1) {
						this.data.upload.height = 80
					}
				},
				data: {
					upload: {
						height: 100,
						value: '',
						init: false,
						fileDefault: 'imgs/file.png',
						imgs: []
					}
				},
				methods: {
					cancle(e, d, v) {
						let me = this
						if (d.$index === undefined) return
						me.data.upload.imgs.splice(d.$index, 1)
						me.data.upload.value = ''
					}
				}
			}
		],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_other/m_plugin_other.html'
	}
	DD.createModule(data)
})()
