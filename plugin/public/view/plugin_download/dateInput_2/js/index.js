DD.createModule({
	name: 'm_plugin_download_Date_2',
	requires: [{ type: 'css', path: HTMLURL + '/plugin_download/dateInput_2/css/index.css' }],
	templateUrl: HTMLURL + '/plugin_download/dateInput_2/index.html',
	onReceive: function(m, data) {
		var me = this
		if (m === 'm_show') {
			me.data.show = data.show
		}
	},
	data: {
		nowDate: '周一',
		show: false,
		options: [
			{
				date: '周一'
			},
			{
				date: '周二'
			},
			{
				date: '周三'
			},
			{
				date: '周四'
			},
			{
				date: '周五'
			},
			{
				date: '周六'
			},
			{
				date: '周日'
			}
		],
		select_color: '#ffffff',
		font_color: '#000000',
		font_size: 12
	},
	delayInit: true,
	onBeforeFirstRender: function() {},
	methods: {
		confirm: function(e, d, v) {
			var me = this
			me.module.send('m_show', { nowDate: me.data.nowDate })
			me.data.show = false
		},
		cancel: function(e, d, v) {
			var me = this
			me.data.show = false
		},
		ensure: function(e, data, view) {
			var me = this
			var obj = {
				plugin_id: 1002,
				js: JSON.stringify({
					select_color: me.data.select_color.replace('#', ''),
					font_color: me.data.font_color.replace('#', ''),
					font_size: me.data.font_size
				}),
				total: 0,
				flag: 1
			}
			me.module.send('m_plugin_download', {
				upload: true,
				obj: obj
			})
		}
	},
	modules: [
		{
			name: 'm_show',
			el: '.el-plugin-date-show',
			onReceive: function(m, d) {
				var me = this
				if (m === 'm_plugin_download_Date_2') {
					me.data.$set('nowDate', d.nowDate)
				}
			},
			onBeforeFirstRender: function() {},
			methods: {
				show: function() {
					var me = this
					me.module.send('m_plugin_download_Date_2', { show: true })
				}
			}
		}
	]
})
