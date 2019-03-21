;(function() {
	var data = {
		
delayInit:true,requires: [
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/foldCollapse/foldCollapse_1/css/index.css' }
		],
		name: 'm_plugin_foldCollapse',
		data: { hasCreated: false, name: '折叠' },
		delayInit: true,
		modules: [
			{
				el: '.el-plugin-07001',
				name: 'm_plugin07001',
				data: {
					collapse_data: {
						time: 0.5,
						isCollapse: true,
						heading: '点击展开，再次点击折叠',
						content:
							'NoDom提供了丰富的指令集，如x-repeat( 重复条目渲染 )、x-model(数据模型)、x-if/x-else(条件)、x-show(显示和隐藏)、x-route／x-router(路由)、 x-field(字段和双向绑定)、x-validity(字段验证)。 同时提供了自定义指令集，指令可以帮助简化模版，丰富渲染内容。',
						head_bg_color: '#f5f5f5',
						content_bg_color: '#FFFFFF',
						head_font_color: '#666666',
						content_font_color: '#999999',
						head_font_size: 16,
						content_font_size: 14
					}
				}
			}
		],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_foldCollapse/m_plugin_foldCollapse.html'
	}
	DD.createModule(data)
})()
