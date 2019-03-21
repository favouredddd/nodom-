;(function() {
	var data = {
		
delayInit:true,requires: [
			{
				type: 'css',
				path: '/plugin_set/public/plugins/plugins_show/table/table_1/css/index.css'
			}
		],
		name: 'm_plugin_table',
		data: { hasCreated: false, name: '表格' },
		delayInit: true,
		modules: [
			{
				el: '.el-plugin-13001',
				name: 'm_plugin13001',
				data: {
					aa: 1,
					d: [1, 2, 3],
					table: {
						show_reverse: false,
						check_all: false,
						thead: [
							{ name: '姓名' },
							{ name: '年龄' },
							{ name: '身高' },
							{ name: '体重' },
							{ name: '学历' },
							{ name: '工作经历' }
						],
						reverse: [
							{ name: '姓名', field: '' },
							{ name: '年龄', field: '' },
							{
								name: '身高',
								field: ''
							},
							{ name: '体重', field: '' },
							{ name: '学历', field: '' },
							{ name: '工作经历', field: '' }
						],
						th: [
							{
								check: false,
								td: [{ ct: '张三' }, { ct: 100 }, { ct: '171' }, { ct: '53' }, { ct: '本科' }, { ct: '2年' }]
							},
							{
								check: false,
								td: [{ ct: '张三' }, { ct: 101 }, { ct: '173' }, { ct: '53' }, { ct: '本科' }, { ct: '1年' }]
							},
							{
								check: false,
								td: [{ ct: '张三' }, { ct: 107 }, { ct: '172' }, { ct: '53' }, { ct: '本科' }, { ct: '5年' }]
							},
							{
								check: false,
								td: [{ ct: '张三' }, { ct: 102 }, { ct: '173' }, { ct: '53' }, { ct: '本科' }, { ct: '3年' }]
							},
							{
								check: true,
								td: [{ ct: '张三' }, { ct: 101 }, { ct: '173' }, { ct: '53' }, { ct: '本科' }, { ct: '3年' }]
							},
							{
								check: false,
								td: [{ ct: '张三' }, { ct: 128 }, { ct: '177' }, { ct: '53' }, { ct: '本科' }, { ct: '3年' }]
							},
							{
								check: false,
								td: [{ ct: '张三' }, { ct: 128 }, { ct: '175' }, { ct: '53' }, { ct: '本科' }, { ct: '3年' }]
							},
							{
								check: false,
								td: [{ ct: '张三' }, { ct: 128 }, { ct: '178' }, { ct: '53' }, { ct: '本科' }, { ct: '3年' }]
							},
							{
								check: false,
								td: [{ ct: '张三' }, { ct: 128 }, { ct: '173' }, { ct: '53' }, { ct: '本科' }, { ct: '3年' }]
							},
							{
								check: false,
								td: [{ ct: '张三' }, { ct: 128 }, { ct: '179' }, { ct: '53' }, { ct: '本科' }, { ct: '3年' }]
							},
							{
								check: false,
								td: [{ ct: '张三' }, { ct: 128 }, { ct: '173' }, { ct: '53' }, { ct: '本科' }, { ct: '3年' }]
							},
							{
								check: false,
								td: [{ ct: '张三' }, { ct: 128 }, { ct: '173' }, { ct: '53' }, { ct: '本科' }, { ct: '3年' }]
							},
							{
								check: false,
								td: [{ ct: '张三' }, { ct: 128 }, { ct: '173' }, { ct: '53' }, { ct: '本科' }, { ct: '3年' }]
							}
						]
					}
				}
			}
		],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_table/m_plugin_table.html'
	}
	DD.createModule(data)
})()
