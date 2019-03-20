// js建立二叉排序树
;
(function() {
    // var mySort = function(arr) {
    //     var me = this;
    //     me.arr = arr;
    //     me.len = me.arr.length;
    //     me.r = null;
    //     me.arr.forEach(i => {
    //         me.judge(me.r, i);
    //     });
    //     me.search(me.r, 1);
    // };
    // mySort.prototype = {
    //     constructor: mySort,
    //     judge: function(node, v) {
    //         var me = this;
    //         if (!node) {
    //             me.r = {};
    //             me.r.value = v;
    //             return;
    //         }
    //         if (node.left && node.value > v) {
    //             me.judge(node.left, v)
    //             return;
    //         }
    //         if (node.right && node.value < v) {
    //             me.judge(node.right, v)
    //             return;
    //         }
    //         if (node.value > v) {
    //             node.left = { value: v };
    //         }
    //         if (node.value < v) {
    //             node.right = { value: v };
    //         }
    //         if (node.value === v)
    //             return;
    //     },
    //     search: function(node, v) {
    //         var me = this;
    //         if (node.right && v > node.value) {
    //             me.search(node.right, v);
    //             return;
    //         }
    //         if (node.left && v < node.value) {
    //             me.search(node.left, v);
    //             return;
    //         }
    //         if (node.value < v && !node.right) {
    //             console.log(false);
    //             return;
    //         }
    //         if (node.value > v && !node.left) {
    //             console.log(false);
    //             return;
    //         }
    //         if (node.value === v)
    //             console.log("yes")

    //     }
    // };
    var create = function(arr) {
        var me = this;
        me.root = null;
        arr.forEach(i => {
            me.insert(i);
        });
        return me;
    }
    var display = function(node) {
        if (node) {
            if (node.left) {
                display(node.left);
            }
            if (node.right) {
                display(node.right);
            }
        }
    }
    create.prototype = {
        constructor: create,
        insert(v) {
            var me = this;
            var tem = {};
            tem.v = v;
            tem.left = null;
            tem.right = null;
            tem.color = "red";
            tem.p = null;
            if (!me.root) {
                me.root = tem;
                me.fix(tem);
                return;
            }
            var p = me.root;
            while (p[v < p.v ? 'left' : 'right']) {
                p = p[v < p.v ? 'left' : 'right'];
            }
            p[v < p.v ? 'left' : 'right'] = tem;
            tem.p = p;
            me.fix(tem);
        },
        fix(node) {
            var me = this;
            while (node.p && node.p.color !== "black") {
                // console.log(node.v);
                var p = node.p;
                var g = p.p;
                var u = g[g.left === p ? 'right' : "left"];
                if (!u || u.color === "black") {
                    var df = p.left === node ? 'left' : 'right';
                    var gf = g.left === p ? 'left' : 'right';
                    if (df === gf) {
                        me.rotate(p);
                        p.color = 'black';
                        g = 'red';
                    } else {
                        me.rotate(node);
                        me.rotate(node);
                        node.color = "black";
                        g.color = "red";
                    }
                    break;
                } else {
                    g.color = "red";
                    p.color = "black";
                    u.color = "black";
                    node = g;
                }
            }
            if (!node.p) {
                node.color = "black";
                me.root = node;
                return;
            }
        },
        rotate(node) {
            var me = this;
            var p = node.p;
            if (p.right === node) {
                if (p.p) {
                    p.p[p.p.left === p ? 'left' : 'right'] = node;
                }
                node.p = p.p;
                if (node.left) {
                    node.left.p = p;
                }
                p.right = node.left;
                node.left = p;
                p.p = node;
            } else {
                if (p.p) {
                    p.p[p.p.left === p ? 'left' : 'right'] = node;
                }
                node.p = p.p;
                if (node.right) {
                    node.right.p = p;
                }
                p.left = node.right;
                node.right = p;
                p.p = node;
            }
        }
    }
    var arr = [8, 1, 4, 5, 3, 7, 2];
    // var tem = new mySort(arr);
    // console.log(tem);
    var result = new create(arr);
    console.log(result);
    // display(result);
})()