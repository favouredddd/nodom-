;(function() {
	var data = {
		
delayInit:true,requires: [{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/tree/tree_1/css/index.css' }],
		name: 'm_plugin_tree',
		delayInit: true,
		data: {
			hasCreated: false,
			name: '菜单树'
		},
		modules: [
			{
				el: '.el-plugin-14001',
				name: 'm_plugin14001',
				data: {
					tree_data: {
						color_1: '#333333',
						color_2: '#1890ff',
						one: 1,
						arr: [
							{
								click: false,
								txt: 'parent-1',
								show: true,
								arr: [
									{
										click: false,
										txt: 'child-1',
										show: false,
										arr: [
											{
												click: false,
												txt: 'child-1-1',
												show: false
											},
											{
												click: false,
												txt: 'child-1-2',
												show: false
											}
										]
									},
									{
										click: false,
										txt: 'child-2',
										show: false
									},
									{
										click: false,
										txt: 'child-3',
										show: false
									},
									{
										click: false,
										txt: 'child-4',
										show: false
									}
								]
							},
							{
								click: false,
								txt: 'parent-2',
								show: true
							},
							{
								click: false,
								txt: 'parent-3',
								show: true
							},
							{
								click: false,
								txt: 'parent-4',
								show: true
							}
						]
					}
				},
				onBeforeFirstRender() {
					var me = this
					me.data.tree_data.one = 1
				},
				methods: {
					show: function(e, d, v) {
						var me = this
						d.show = !d.show
					},
					sendPro: function(txt, data) {
						var me = this
						var tem = null
						data.forEach(i => {
							if (i.arr) {
								i.arr.forEach(it => {
									if (it.txt === txt) tem = i
									if (!tem) {
										tem = me.module.methodFactory.methods.sendPro.call(me, txt, i.arr)
									}
								})
							}
						})
						return tem
					},
					check: function(e, d, v) {
						var me = this
						console.log(me)
						d.click = !d.click
						if (!d.click && d.txt.indexOf('parent') === -1) {
							parent = me.module.methodFactory.methods.sendPro.call(me, d.txt, me.data.tree_data.arr)
							if (parent) {
								parent.click = false
							}
						}
						if (d.click && d.txt.indexOf('parent') === -1) {
							parent = me.module.methodFactory.methods.sendPro.call(me, d.txt, me.data.tree_data.arr)
							if (parent) {
								if (
									parent.arr.every(function(i) {
										return i.click
									})
								) {
									parent.click = true
								}
							}
						}
						me.module.methodFactory.methods.checkall.call(me, d)
					},
					checkall: function(d) {
						var me = this
						if (d.arr) {
							d.arr.forEach(function(i) {
								i.click = d.click
								if (i.arr) {
									me.module.methodFactory.methods.checkall.call(me, i)
								}
							})
						}
					}
				}
			}
		],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_tree/m_plugin_tree.html'
	}
	DD.createModule(data)
})()
