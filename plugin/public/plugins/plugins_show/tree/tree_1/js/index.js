// ;
// (function() {
//        var plugin_14001 = function() {};
//     plugin_14001.prototype = {
//         init: function(view) {},
//         render: function(view) {
//             var me = this;
//             me.datas = view.$getData().data;
//             if (!me.datas.one) {
//                 return;
//             }
//             me.datas.one = 0;
//             //递归方法创建无限树
//             me.create = function(arr) {
//                 var s = "";
//                 var tem = `  <div class="item wrap" id="{{txt}}" x-repeat="arr" x-class="{'show':'show'}">
//                    <div class="ct">
//                           <div   e-click="check" x-class="{'check':'click'}" class="input"></div>
//                           <span class="txt" e-click="show">{{txt}}</span>
//                    </div>\r\n`;
//                 var arrd = [];
//                 var count = 0;
//                 arr.forEach(function(i, index, a) {
//                     if (i.arr) {
//                         arrd[count] = me.create(i.arr);
//                         count += 1;
//                     }
//                 });
//                 var length = 0;
//                 var max = "\r\n";
//                 arrd.forEach(i => {
//                     if (i.length > length) {
//                         max = i;
//                         length = i.length;
//                     }
//                 });
//                 return tem + max + `</div>\r\n`;
//             };
//             console.log(me.datas);
//             var str = me.create(me.datas.arr) + `</div>`;
//             view.innerHTML = str;
//             view.$forceRender = true;
//
//             //重新编译
//             DD.Compiler.compile(view, view.$module);
//         }
//     };
//     DD.Plugin.create("plugin_14001", plugin_14001);
// })()