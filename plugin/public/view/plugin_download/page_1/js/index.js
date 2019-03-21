/**
 * 分页插件
 * 欲用此插件，必先在使用此插件的模块上有一个updatePage函数,用来点击之后刷新页面
 * page:当前页
 * to_page:输入框的数据（到第几页）
 * allpage:总共多少页
 * @return {[type]} [description]
 */
;(function() {
	DD.createModule({
		name: 'm_plugin_download_Page_1',
		requires: [{ type: 'css', path: HTMLURL + '/plugin_download/page_1/css/index.css' }],
		templateUrl: HTMLURL + '/plugin_download/page_1/index.html',
		delayInit: true,
		data: {
			//字体颜色
			word_color: '#000000',
			//页数颜色
			page_color: '#ff0000',
			name: '常见分页',
			page: 1,
			row: 10,
			total: 100,
			to_page: 1
		},
		methods: {
			//更新函数
			updatePage: function() {
				var me = this
			},
			ensure: function(e, data, view) {
				var me = this
				var obj = {
					js: JSON.stringify({
						word_color: me.data.word_color.replace('#', ''),
						page_color: me.data.page_color.replace('#', '')
					}),
					plugin_id: 1101,
					total: 0,
					flag: 1
				}
				if (view.innerHTML.indexOf('Less') > -1) {
					obj.isLess = true
				} else {
					obj.isLess = false
				}
				me.module.send('m_plugin_download', {
					upload: true,
					obj: obj
				})
			}
		}
	})
})()
