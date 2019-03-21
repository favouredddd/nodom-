;(function() {
	var data = {
		
delayInit:true,requires: [
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/colorPicker/colorPicker_1/css/index.css' }
		],
		name: 'm_plugin_colorPicker',
		delayInit: true,
		data: { hasCreated: false, name: '颜色选择' },
		modules: [
			{
				el: '.el-plugin-05001',
				name: 'm_plugin05001',
				data: { left: 0, first: 1, r: 255, g: 0, b: 0, H: 0, s: 255, v: 255, show: false, str: '#ff0000' }
			}
		],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_colorPicker/m_plugin_colorPicker.html'
	}
	DD.createModule(data)
})()
