;
// (function() {
//     var page = function() {
//         var me = this;
//         me.container = null;
//         me.allpage = 16;
//         me.pagebtn = [];
//         me.now = 1;
//         me.index = 0;
//     };
//     page.prototype = {
//         constructor: page,
//         init: function() {
//             var me = this;
//             me.container = document.querySelector(".pageBtn");
//             document.querySelector('.next').addEventListener("click", me.changeUp.bind(me), false);
//             document.querySelector('.pre').addEventListener("click", me.changeDown.bind(me), false);
//             document.querySelector('.ensure').addEventListener("click", me.go.bind(me), false);
//             setInterval(function(){document.querySelector('.next').click()},1000);
//             if (me.allpage < 9) {
//                 for (var i = 1; i <= me.allpage; i += 1) {
//                     var tem = document.createElement("div");
//                     tem.addEventListener("click",function(e){
//                      me.go.call(me,e);
//                     },false);
//                     tem.innerHTML = i;
//                     me.pagebtn.push(tem);
//                 }
//                 me.now = 1;
//             }
//             if (me.allpage > 8) {
//                 for (var i = 1; i < 9; i += 1) {
//                     var tem = document.createElement("div");
//                     tem.addEventListener("click",function(e){
//                      me.go.call(me,e);
//                     },false);
//                     tem.innerHTML = i;
//                     if (i === 7)
//                         tem.innerHTML = "...";
//                     me.pagebtn.push(tem);
//                 }
//                 me.pagebtn[7].innerHTML = me.allpage;
//                 me.now = 1;
//             }
//             me.pagebtn.forEach(i => {
//                 me.container.append(i);
//             });
//             me.pagebtn[me.index].classList.add("check");

//         },
//         append: function() {
//             var me = this;
//             var tem = [...me.container.children];
//             tem.forEach(i => {
//                 i.classList.remove("check");
//             });
//             if (me.allpage < 9) {
//                 tem[me.index].classList.add("check");
//             }
//             if (me.allpage >= 9) {
//                 console.log(me.now);
//                 if (me.now <= 6) {
//                     tem.forEach((i, index) => {
//                         i.innerHTML = index + 1;
//                     });
//                     tem[7].innerHTML = me.allpage;
//                     tem[6].innerHTML = "...";
//                     tem[me.index].classList.add("check");
//                     return ;
//                 }
//                 if (me.now >= 7 && me.now <= me.allpage - 4) {
//                     tem[0].innerHTML = 1;
//                     tem[1].innerHTML = "...";
//                     for (var i = 2; i <= 5; i += 1) {
//                         tem[i].innerHTML = me.now - 3 + i;
//                     }
//                     tem[6].innerHTML = "...";
//                     tem[me.index].classList.add("check");
//                     return ;
//                 }
//                 if (me.now > me.allpage - 5) {
//                     tem[0].innerHTML = 1;
//                     tem[1].innerHTML = "...";
//                     for (var i = 2; i <= 6; i += 1) {
//                         tem[i].innerHTML = me.allpage - 7 + i;
//                     }
//                     tem[me.index].classList.add("check");
//                 }
//             }
//         },
//         changeUp: function() {
//             var me = this;
//             if (me.now >= me.allpage) {
//                 return;
//             }
//             if (me.allpage < 9) {
//                 me.index += 1;
//                 me.now += 1;
//                 me.append();
//             }
//             if (me.allpage > 9) {
//                 if (me.now < 6) {
//                     me.index++;
//                     me.now++;
//                     me.append();
//                     return;
//                 }
//                 if (me.now >= 6 && me.now < me.allpage - 4) {
//                     me.index = 3;
//                     me.now++;
//                     me.append();
//                     return;
//                 }
//                 if (me.now >= me.allpage - 4) {
//                     me.now++;
//                     me.index = 7 - Math.abs(me.now - me.allpage);
//                     me.append();
//                     return;
//                 }
//             }

//         },
//         changeDown: function() {
//             var me = this;
//             if (me.now <= 1) {
//                 return;
//             }
//             if (me.allpage < 9) {
//                 me.index -= 1;
//                 me.now -= 1;
//                 me.append();
//             }
//             if (me.allpage > 9) {
//                 if (me.now <= 7) {
//                     if (me.now === 7) {
//                         me.index = 5;
//                     } else {
//                         me.index--;
//                     }
//                     me.now--;
//                     me.append();
//                     return;
//                 }
//                 if (me.now > 7 && me.now <= me.allpage - 4) {
//                     me.index = 3;
//                     me.now--;
//                     me.append();
//                     return;
//                 }
//                 if (me.now > me.allpage - 4) {
//                     me.now--;
//                     me.index = 7 - Math.abs(me.now - me.allpage);
//                     me.append();
//                     return;
//                 }
//             }
//         },
//         go: function(e) {
//             var me = this;
//             var go = parseInt(e.target.value||e.target.innerHTML);
//             if(!go)
//              return ;
//             if (go === 1) {
//                 me.index = 1;
//                 me.changeDown.call(me);
//             } else {
//                 me.now = go - 1;
//                 if (me.allpage < 9) {
//                     me.index = me.now - 1;
//                 }
//                 if (me.allpage > 9 && go < 6) {
//                     me.index = me.now - 1;
//                 }

//                 me.changeUp.call(me);
//             }
//         }
//     };
//     new page().init();
// })()
;
(function() {
    var page = function() {
        var me = this;
        me.all = 200;
        me.now = 1;
        me.page = [];
        me.str = [];
    }
    page.prototype = {
        constructor: page,
        init: function() {
            var me = this;
            me.container = document.querySelector(".pageBtn");
            document.querySelector(".next").addEventListener("click", me.add.bind(me), false);
            document.querySelector(".pre").addEventListener("click", me.reduce.bind(me), false);
            document.querySelector(".ensure").addEventListener("click", function(e) {
                me.jump.call(me, document.querySelector(".input"));
            }, false);
            me.create();
            me.updata();
        },
        create: function() {
            var me = this;
            var tem = me.all;
            if (tem > 8) {
                tem = 8;
            }
            for (var i = 0; i < tem; i += 1) {
                var dom = document.createElement("div");
                me.page.push(dom);
                me.str.push(i + 1);
            }
            me.container.addEventListener("click", function(e) {
                if (!e.target.innerHTML.trim())
                    return;
                me.go.call(me, e);
            }, false);
            if (me.all > 8) {
                me.str[tem - 1] = me.all;
                me.str[tem - 2] = "...";
            }
            for (var i = 0; i < tem; i += 1) {
                me.page[i].innerHTML = me.str[i];
                me.container.append(me.page[i]);
            }
        },
        updata: function() {
            var me = this;
            if (me.all <= 8) {
                for (var i = 0; i < me.all; i += 1) {
                    me.str[i] = i + 1;
                }
            }
            if (me.all > 8) {
                if (me.now <= 6) {
                    for (var i = 0; i < 8; i += 1) {
                        me.str[i] = i + 1;
                    }
                    me.str[me.str.length - 1] = me.all;
                    me.str[me.str.length - 2] = "...";
                }
                if (me.now >= 7 && me.now < me.all - 4) {
                    for (var i = 0; i < 8; i += 1) {
                        me.str[i] = me.now - 3 + i;
                    }
                    me.str[0] = 1;
                    me.str[me.str.length - 1] = me.all;
                    me.str[me.str.length - 2] = "...";
                    me.str[1] = "...";
                }
                if (me.now >= me.all - 4) {
                    for (var i = 0; i < me.str.length; i += 1) {
                        me.str[i] = me.all - 7 + i;
                    }
                    me.str[0] = 1;
                    me.str[1] = "...";
                }
            }
            me.change();
        },
        change: function() {
            var me = this;
            me.str.forEach((i, index) => {
                me.page[index].classList.remove("check");
                if (parseInt(i) === me.now) {
                    me.page[index].classList.add("check");
                }
                me.page[index].innerHTML = i;
            });
        },
        add: function() {
            var me = this;
            if (me.now === me.all)
                return;
            me.now += 1;
            me.updata();
        },
        reduce: function() {
            var me = this;
            if (me.now === 1) {
                return;
            }
            me.now -= 1;
            me.updata();
        },
        go: function(e) {
            var me = this;
            if (e.target.innerHTML === "...")
                return;
            me.str.forEach(i => {
                if (parseInt(e.target.innerHTML) === parseInt(i)) {
                    me.now = parseInt(i);
                    me.updata();
                }
            })
        },
        jump: function(e) {
            var me = this;
            var value = parseInt(e.value);
            if (value > 0 && value <= me.all) {
                me.now = value;
                me.updata();
            }
        }
    };
    new page().init();
})()