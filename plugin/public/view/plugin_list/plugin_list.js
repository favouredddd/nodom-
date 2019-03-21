/**
 * Created by xll on 2018/6/28.
 * 插件列表
 */
(function () {
    DD.createModule({
        name: 'm_plugin_list',
        el: '.el-plugin-list',
        templateUrl: HTMLURL + '/plugin_list/plugin_list.html',
        delayInit:true,
        requires: [
             HTMLURL + '/plugin_list/plugin_type/list.js',
            HTMLURL + '/plugin_list/plugin_instruction/plugin_instruction.js',
            //HTMLURL + '/plugin_list/plugin_type/m_plugin_address/js/index.js',
            HTMLURL + '/plugin_list/plugin_type/m_plugin_other/js/index.js',
            //HTMLURL + '/plugin_list/plugin_type/m_plugin_buffering/js/index.js',
            //HTMLURL + '/plugin_list/plugin_type/m_plugin_carousel/js/index.js',
            //HTMLURL + '/plugin_list/plugin_type/m_plugin_checkBox/js/index.js',
            //HTMLURL + '/plugin_list/plugin_type/m_plugin_colorPicker/js/index.js',
            //HTMLURL + '/plugin_list/plugin_type/m_plugin_foldCollapse/js/index.js',
            //HTMLURL + '/plugin_list/plugin_type/m_plugin_imgShow/js/index.js',
            //HTMLURL + '/plugin_list/plugin_type/m_plugin_inputAuto/js/index.js',
            //HTMLURL + '/plugin_list/plugin_type/m_plugin_paging/js/index.js',
            //HTMLURL + '/plugin_list/plugin_type/m_plugin_progress/js/index.js',
            //HTMLURL + '/plugin_list/plugin_type/m_plugin_switcher/js/index.js',
            //HTMLURL + '/plugin_list/plugin_type/m_plugin_table/js/index.js',
            //HTMLURL + '/plugin_list/plugin_type/m_plugin_tree/js/index.js',
            //HTMLURL + '/plugin_list/plugin_type/m_plugin_chart/js/index.js',
            //HTMLURL + '/plugin_list/plugin_type/m_plugin_dateInput/js/index.js'
        ],
        data: {
            plugin_list: [{
                name: "插件使用说明",
                path: "/route/plugin_list/instruction",
                active: true
            }, {
                name: "图表",
                path: "/route/plugin_list/chart",
                active: false
            }, {
                name: "缓冲动画",
                path: "/route/plugin_list/buffering",
                active: false
            }, {
                name: "轮播图",
                path: "/route/plugin_list/carousel",
                active: false
            }, {
                name: "分页",
                path: "/route/plugin_list/paging",
                active: false
            }, {
                name: "选择框",
                path: "/route/plugin_list/checkBox",
                active: false
            }, {
                name: "日期选择",
                path: "/route/plugin_list/dateInput",
                active: false
            }, {
                name: "折叠",
                path: "/route/plugin_list/foldCollapse",
                active: false
            }, {
                name: "图片放大",
                path: "/route/plugin_list/imgShow",
                active: false
            }, {
                name: "自动补全",
                path: "/route/plugin_list/inputAuto",
                active: false
            }, {
                name: "进度条",
                path: "/route/plugin_list/progress",
                active: false
            }, {
                name: "开关",
                path: "/route/plugin_list/switcher",
                active: false
            }, {
                name: "地址",
                path: "/route/plugin_list/address",
                active: false
            }, {
                name: "表格",
                path: "/route/plugin_list/table",
                active: false
            }, {
                name: "菜单树",
                path: "/route/plugin_list/tree",
                active: false
            },
             {
                name: "其他",
                path: "/route/plugin_list/other",
                active: false
            }
                // , {
                //     name: "颜色选择",
                //     path: "/route/plugin_list/colorPicker",
                //     active: false
                // }
            ],
            display: false,
            flag: true
        },
        onReceive: function (m, d) {
            var me = this;
            if (m === "m_index") {
                me.data.display = d;
            }
        },
        onBeforeFirstRender: function () {
            var me = this;
            me.data.plugin_list.forEach(function (item) {
                item.active = false;
            });
            me.data.plugin_list[0].active = true;
            me.data.display = false;
            me.data.flag = true;
            me.module.send("m_index", {first: true});
        },
        methods: {
            display: function () {
                var me = this;
                me.data.display = false;
                me.module.send("m_index", false);
            },
            scroll: function (t) {
                //var me = this;
                //if (t <= 0) {
                    //me.data.flag = true;
                    //return
                //} else {
                   // window.scrollTo(0, t - 3);
                    //window.requestAnimationFrame(me.module.methodFactory.methods.scroll.bind(me, t - 3))
                //}
                 window.scrollTo(0,0);
            },
            Top: function () {
                var me = this;
                //if (!me.data.flag)
                    //return;
                var t = window.pageYOffset;
                //me.data.flag = false;
                me.module.methodFactory.methods.scroll.call(me, t)
            }
        }
    })
}())