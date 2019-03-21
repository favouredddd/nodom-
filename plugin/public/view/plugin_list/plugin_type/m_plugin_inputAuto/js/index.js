;(function() {
	var data = {
		
delayInit:true,requires: [],
		name: 'm_plugin_inputAuto',
		data: { hasCreated: false, name: '自动补全' },
		delayInit: true,
		modules: [
			{
				el: '.el-plugin-09001',
				name: 'm_plugin09001',
				requires: [{ type: 'css', path: HTMLURL + '/plugin_download/inputAuto_1/css/index.css' }],
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
						var me = this
						me.data.results = []
						me.data.result = d.txt
						me.data.flag = false
						document.querySelector('.inputAuto').querySelector('input').value = me.data.result
					}
				}
			}
		],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_inputAuto/m_plugin_inputAuto.html'
	}
	DD.createModule(data)
})()
