;(function() {
	var data = {
		
delayInit:true,requires: [
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/dateInput/dateInput_1/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/dateInput/dateInput_2/css/index.css' }
		],
		name: 'm_plugin_dateInput',
		delayInit: true,
		data: { hasCreated: false, name: '日期选择' },
		modules: [
			{
				el: '.el-plugin-06001',
				name: 'm_plugin06001',
				data: {
					date_data: {
						year: '',
						month: '',
						day: '',
						show: false,
						xDate_color: {
							header_color: '#e6e6e6',
							bg_color: '#fff',
							day_color: '#555555',
							today_color: '#112233',
							month_color: '#333333'
						},
						xDate_day: [
							{ day: '日' },
							{ day: '一' },
							{ day: '二' },
							{ day: '三' },
							{ day: '四' },
							{ day: '五' },
							{ day: '六' }
						],
						xDate_week: []
					}
				}
			},
			{
				el: '.el-plugin-06002',
				name: 'm_plugin_06002',
				template: ``,
				methods: {
					confirm: function(e, d, v) {
						var me = this
						me.data.nowDate = me.data.nowDate
						me.data.show = false
					},
					cancel: function(e, d, v) {
						var me = this
						me.data.show = false
					},
					show: function() {
						var me = this
						me.data.show = true
					}
				},
				data: {
					nowDate: '周一',
					show: false,
					options: [
						{ date: '周一' },
						{ date: '周二' },
						{ date: '周三' },
						{ date: '周四' },
						{ date: '周五' },
						{ date: '周六' },
						{ date: '周日' }
					],
					select_color: '#ffffff',
					font_color: '#000000',
					font_size: 12
				}
			}
		],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_dateInput/m_plugin_dateInput.html'
	}
	DD.createModule(data)
})()
