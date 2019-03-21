;(function() {
	var data = {
		
delayInit:true,requires: [
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/switcher/button_1/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/switcher/switcher_1/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/switcher/switcher_2/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/switcher/switcher_3/css/index.css' },
			{ type: 'css', path: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
		],
		name: 'm_plugin_switcher',
		data: { hasCreated: false, name: '开关' },
		delayInit: true,
		modules: [
			{
				el: '.el-plugin-12001',
				name: 'm_plugin12001',
				data: { switcher: true, open_color: '#4BD763', close_color: '#F9F9F9', btn_color: '#ffffff' }
			},
			{
				el: '.el-plugin-12002',
				name: 'm_plugin12002',
				data: { switcher: false, bg_color: '#292827', shadow_color: '#FF9900', btn_color: '#FFFFFF' }
			},
			{
				el: '.el-plugin-12003',
				name: 'm_plugin12003',

				data: { switcher: true, open_color: '#cccccc', close_color: '#ff9900' }
			},
			{
				el: '.el-plugin-12004',
				name: 'm_plugin12004',

				data: {
					list_one: [{ value: '危险' }, { value: '警告' }, { value: '成功' }],
					list_two: [
						{ name: '删除', value: 'delete' },
						{ name: '编辑', value: 'edit' },
						{ name: '分享', value: 'share' }
					],
					list_three: [
						{ value: 'keyboard_arrow_down' },
						{ value: 'keyboard_arrow_up' },
						{ value: 'keyboard_arrow_left' }
					],
					color_1: '#e53935',
					color_2: '#e53935',
					color_3: '#4caf50'
				}
			}
		],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_switcher/m_plugin_switcher.html'
	}
	DD.createModule(data)
})()
