;(function() {
	var data = {
		
delayInit:true,requires: [
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/buffering/animation_1/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/buffering/animation_2/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/buffering/animation_3/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/buffering/animation_4/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/buffering/animation_5/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/buffering/animation_6/css/index.css' }
		],
		name: 'm_plugin_buffering',
		data: { hasCreated: false, name: '缓冲' },
		modules: [
			{
				el: '.el-plugin-02001',
				name: 'm_plugin02001',
				data: { buffering_data: { show: true, animation_time: 1, color: '#FF0000', radius: 5 } }
			},
			{
				el: '.el-plugin-02002',
				name: 'm_plugin02002',

				data: { buffering_data: { show: true, width: 40, height: 60, color: '#FDB702', animation_time: 1.2 } }
			},
			{
				el: '.el-plugin-02003',
				name: 'm_plugin02003',
				data: { buffering_data: { show: true, color_1: '#409EFF', animation_time: 3, size: 64 } }
			},
			{
				el: '.el-plugin-02004',
				name: 'm_plugin02004',
				data: { buffering_data: { show: true, color: '#00bfff', time: 0.8, width: 150, height: 70 } }
			},
			{
				el: '.el-plugin-02005',
				name: 'm_plugin02005',
				data: { name: '水滴动画', buffering_data: { color: '#363636', show: true, time: 2, radius: 5 } }
			},
			{
				el: '.el-plugin-02006',
				name: 'm_plugin02006',
				data: { buffering_data: { show: true, animation_time: 1, color: '#0000FF' } }
			}
		],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_buffering/m_plugin_buffering.html'
	}
	DD.createModule(data)
})()
