;(function() {
	DD.createModule({
		name: 'm_manager',
		templateUrl: HTMLURL + '/manager/manager.html',
		delayInit: true,
		requires: [
			{ type: 'css', path: CSSURL + '/manager.css' },
			{ type: 'css', path: HTMLURL + '/plugin_download/page_1/css/index.css' }
		],
		data: {
			list: [],
			//字体颜色
			word_color: '#000000',
			//页数颜色
			page_color: '#ff0000',
			page: 1,
			row: 10,
			total: 0,
			to_page: 1,
			allpage: 0
		},
		onBeforeFirstRender() {
			var me = this
			if (!util.getItem('token')) {
				try {
					DD.Router.go('/route/home')
					return
				} catch (e) {
					console.log(e)
				}
				try {
					DD.Router.Start('/route/home')
					return
				} catch (e) {
					console.log(e)
				}
			}
			if (window.innerWidth > 800) {
				me.data.row = 10
			} else {
				me.data.row = 5
			}
			me.module.methodFactory.methods.update.call(me, 1)
		},
		methods: {
			update(page = 1) {
				var me = this
				DD.request({
					url: `http://112.74.56.131/api/get_list`,
					params: {
						page: page,
						row: me.data.row
					},
					successFunc(r) {
						r = JSON.parse(r)
						r.result.forEach(i => {
							i.ip = i.ip.split(':')
							i.ip = i.ip.slice(-1).join(':')
							i.time = i.time.split(':')
							i.time = i.time.slice(2, 5).join(':')
						})
						me.data.$set('list', r.result)
						me.data.$set('total', r.all)
						me.data.$set('allpage', Math.ceil(r.all / me.data.row))
					}
				})
			},
			updatePage() {
				var me = this
				me.module.methodFactory.methods.update.call(me, me.data.page)
			},
			delete(e, d, v) {
				var me = this
				DD.request({
					url: 'http://112.74.56.131/api/deleteList?',
					params: {
						session: d.session
					},
					successFunc(r) {
						r = JSON.parse(r)
						if (r.result) {
							me.module.methodFactory.methods.update.call(me)
						}
					}
				})
			}
		}
	})
})()
