;(function() {
	var data = {
		
delayInit:true,requires: [
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/progress/progress_1/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/progress/progress_2/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/progress/progress_3/css/index.css' }
		],
		name: 'm_plugin_progress',
		data: { hasCreated: false, name: '进度条' },
		delayInit: true,
		modules: [
			{
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
			},
			{
				el: '.el-plugin-11002',
				name: 'm_plugin11002',
				data: {
					proBar: 0.9,
					percent: true,
					process_percent_num_color: '#ffffff',
					process_percent_color: '#4A98FF',
					process_bg_color: '#DDDDDD'
				}
			},
			{
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
			}
		],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_progress/m_plugin_progress.html'
	}
	DD.createModule(data)
})()
