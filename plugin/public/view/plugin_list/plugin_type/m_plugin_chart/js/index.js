;(function() {
	var data = {
		
delayInit:true,requires: [
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/chart/chart_1/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/chart/chart_2/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/chart/chart_3/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/chart/chart_4/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/chart/chart_5/css/index.css' }
		],
		name: 'm_plugin_chart',
		data: { hasCreated: false, name: '图表' },
		modules: [
			{
				el: '.el-plugin-15001',
				name: 'm_plugin15001',
				data: {
					histogram: {
						title: '直方图',
						legend: 'top',
						marker: false,
						titleColor: '#000000',
						gridLine: 0,
						gridLineColor: '#cccccc',
						legends: [
							{ value: '', text: '无' },
							{ value: 'top', text: '顶部' },
							{ value: 'right', text: '右侧' },
							{ value: 'bottom', text: '底部' }
						],
						lines: [
							{ value: 0, text: '无' },
							{ value: 1, text: '横向' },
							{ value: 2, text: '纵向' },
							{ value: 3, text: '全部' }
						],
						data: [
							{
								title: '成都店',
								datas: [
									{ x: '1月', y: 300 },
									{ x: '2月', y: 320 },
									{ x: '3月', y: 280 },
									{ x: '4月', y: 250 },
									{ x: '5月', y: 300 },
									{ x: '6月', y: 380 }
								]
							},
							{
								title: '北京店',
								datas: [
									{ x: '1月', y: 900 },
									{ x: '2月', y: 820 },
									{ x: '3月', y: 880 },
									{ x: '4月', y: 850 },
									{ x: '5月', y: 900 },
									{ x: '6月', y: 980 }
								]
							},
							{
								title: '上海店',
								datas: [
									{ x: '1月', y: 600 },
									{ x: '2月', y: 520 },
									{ x: '3月', y: 580 },
									{ x: '4月', y: 550 },
									{ x: '5月', y: 600 },
									{ x: '6月', y: 680 }
								]
							}
						]
					}
				}
			},
			{
				el: '.el-plugin-15002',
				name: 'm_plugin15002',

				data: {
					line: {
						title: '折线图',
						legend: '',
						marker: true,
						titleColor: '#000000',
						gridLine: 0,
						gridLineColor: '#cccccc',
						legends: [
							{ value: '', text: '无' },
							{ value: 'top', text: '顶部' },
							{ value: 'right', text: '右侧' },
							{ value: 'bottom', text: '底部' }
						],
						lines: [
							{ value: 0, text: '无' },
							{ value: 1, text: '横向' },
							{ value: 2, text: '纵向' },
							{ value: 3, text: '全部' }
						],
						data: [
							{
								title: '成都店',
								datas: [
									{ x: '1月', y: 300 },
									{ x: '2月', y: 320 },
									{ x: '3月', y: 280 },
									{ x: '4月', y: 250 },
									{ x: '5月', y: 300 },
									{ x: '6月', y: 380 }
								]
							},
							{
								title: '北京店',
								datas: [
									{ x: '1月', y: 900 },
									{ x: '2月', y: 820 },
									{ x: '3月', y: 880 },
									{ x: '4月', y: 850 },
									{ x: '5月', y: 900 },
									{ x: '6月', y: 980 }
								]
							},
							{
								title: '上海店',
								datas: [
									{ x: '1月', y: 600 },
									{ x: '2月', y: 520 },
									{ x: '3月', y: 580 },
									{ x: '4月', y: 550 },
									{ x: '5月', y: 600 },
									{ x: '6月', y: 680 }
								]
							}
						]
					}
				}
			},
			{
				el: '.el-plugin-15003',
				name: 'm_plugin15003',
				data: {
					pie: {
						title: '饼状图',
						legend: '',
						titleColor: '#000000',
						showPercent: true,
						showText: true,
						legends: [
							{ value: '', text: '无' },
							{ value: 'top', text: '顶部' },
							{ value: 'right', text: '右侧' },
							{ value: 'bottom', text: '底部' }
						],
						data: [
							{ value: 300, title: '数据一' },
							{ value: 800, title: '数据二' },
							{ value: 600, title: '数据三' },
							{ value: 100, title: '数据四' },
							{ value: 400, title: '数据五' },
							{ value: 450, title: '数据六' }
						]
					}
				}
			},
			{
				el: '.el-plugin-15004',
				name: 'm_plugin15004',
				data: {
					radar: {
						title: '雷达图实例',
						legend: 'right',
						marker: true,
						titleColor: '#000000',
						legends: [
							{ value: '', text: '无' },
							{ value: 'top', text: '顶部' },
							{ value: 'right', text: '右侧' },
							{ value: 'bottom', text: '底部' }
						],
						radar: {
							titles: ['顶点一', '顶点二', '顶点三', '顶点四', '顶点五', '顶点六'],
							colors: ['#e6e6e6', '#f5f5f5'],
							lineColor: '#ccc'
						},
						data: [
							{ title: '111', datas: [93, 55, 45, 78, 66, 45] },
							{ title: '555', datas: [45, 79, 79, 88, 93, 67] }
						]
					}
				}
			},
			{
				el: '.el-plugin-15005',
				name: 'm_plugin15005',
				data: {
					scatter: {
						title: '散点图',
						legend: '',
						marker: false,
						titleColor: '#000000',
						symbolSize: 8,
						gridLine: 0,
						gridLineColor: '#cccccc',
						legends: [
							{ value: '', text: '无' },
							{ value: 'top', text: '顶部' },
							{ value: 'right', text: '右侧' },
							{ value: 'bottom', text: '底部' }
						],
						lines: [
							{ value: 0, text: '无' },
							{ value: 1, text: '横向' },
							{ value: 2, text: '纵向' },
							{ value: 3, text: '全部' }
						],
						data: [
							{
								title: '测试',
								datas: [
									{ x: 10, y: 8.04 },
									{ x: 8, y: 6.95 },
									{ x: 13, y: 7.58 },
									{ x: 9, y: 8.81 },
									{ x: 11, y: 8.33 },
									{ x: 14, y: 9.96 },
									{ x: 6, y: 7.24 },
									{ x: 4, y: 4.26 },
									{ x: 12, y: 10.84 },
									{ x: 7, y: 4.82 },
									{ x: 5, y: 5.68 }
								],
								cs: ''
							}
						],
						addX: '',
						addY: ''
					}
				}
			}
		],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_chart/m_plugin_chart.html'
	}
	DD.createModule(data)
})()
