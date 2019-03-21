;(function() {
	var data = {
		
delayInit:true,requires: [
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/paging/page_1/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/paging/page_2/css/index.css' }
		],
		name: 'm_plugin_paging',
		data: { name: '分页' },
		delayInit: true,
		modules: [
			{
				el: '.el-plugin-10001',
				name: 'm_plugin10001',
				data: { page: 1, row: 10, total: 50, to_page: 1, allpage: 3, page_color: '#FF0000' }
			},
			{
				el: '.el-plugin-10002',
				name: 'm_plugin10002',
				data: {
					page: {
						pre_page: 1,
						go_page: 1,
						all_page: 16,
						page_rows: [],
						pre_color: '#5eaee3',
						word_color: '#999999',
						one: 1
					}
				}
			}
		],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_paging/m_plugin_paging.html'
	}
	DD.createModule(data)
})()
