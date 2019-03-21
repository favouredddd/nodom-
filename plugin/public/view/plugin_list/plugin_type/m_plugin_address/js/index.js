;(function() {
	var data = {
		requires: [{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/address/location_1/css/index.css' }],
		name: 'm_plugin_address',
delayInit:true,		data: { hasCreated: false, name: '地址' },
		modules: [
			{
				el: '.el-plugin-01001',
				name: 'm_plugin01001',
				data: {
					location_country: '重庆',
					popular_country: [
						{ name: '北京' },
						{ name: '重庆' },
						{ name: '四川' },
						{ name: '江西' },
						{ name: '青海' },
						{ name: '重庆' },
						{ name: '江苏' },
						{ name: '天津' },
						{ name: '深圳' },
						{ name: '浙江' },
						{ name: '重庆' },
						{ name: '江苏' },
						{ name: '天津' },
						{ name: '深圳' },
						{ name: '浙江' }
					],
					small_div: { color_1: '#ffffff', color_2: '#66d9ef', color_3: '#457eb1', color_4: '#5a8dba' }
				}
			}
		],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_address/m_plugin_address.html'
	}
	DD.createModule(data)
})()
