;(function() {
	var data = {
		
delayInit:true,requires: [
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/checkBox/checkbox_1/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/checkBox/checkbox_2/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/checkBox/checkbox_3/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/checkBox/checkbox_4/css/index.css' }
		],
		name: 'm_plugin_checkBox',
		data: { hasCreated: false, name: '选择框' },
		delayInit: true,
		modules: [
			{
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
			},
			{
				el: '.el-plugin-04002',
				name: 'm_plugin04002',
				data: {
					name: 'check02',
					check_data: { check_color: '#26a2ff', no_check_color: '#aaaaaa', is_check: true, size: 30 }
				}
			},
			{
				el: '.el-plugin-04003',
				name: 'm_plugin04003',
				data: {
					name: 'check03',
					check_data: { check_color: '#26a2ff', no_check_color: '#000000', is_check: true, size: 30 }
				}
			},
			{
				el: '.el-plugin-04004',
				name: 'm_plugin04004',
				data: {
					name: 'check04',
					check_data: { check_color: '#26a2ff', no_check_color: '#aaaaaa', is_check: true, size: 30 }
				}
			}
		],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_checkBox/m_plugin_checkBox.html'
	}
	DD.createModule(data)
})()
