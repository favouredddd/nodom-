var getMax = function(arr) {
    var tem = arr.map(i => i.v);
    var max = Math.min(...tem);
    var index = tem.indexOf(max);
    return { v: max, index: index, value: arr[index].value };
}
var Node = function(v) {
    return { v: v, left: null, right: null, value: 0 };
}
var createTree = function(arr) {
    var me = this;
    var tem = arr.slice(0);
    tem = tem.map(i => Node(i));
    var tree = null;
    while (tem.length > 1) {
        var l = getMax(tem);
        var ll = tem.splice(l.index, 1)[0];
        var r = getMax(tem);
        var rr = tem.splice(r.index, 1)[0];
        var result = Node(r.v + l.v);
        result.left = l.v < r.v ? ll : rr;
        result.right = r.v > l.v ? rr : ll;
        tem.push(result);
    }
    tree = tem[0];
    me.getV(tree, 0);
    me.all = me.getAll(tree);
}
createTree.prototype = {
    constructor: createTree,
    getV(node) {
        var me = this;
        if (node.left) {
            node.left.value = node.value + 1;
            me.getV(node.left);
        }
        if (node.right) {
            node.right.value = node.value + 1;
            me.getV(node.right);
        }
    },
    getAll(p) {
        var me = this;
        var l = 0,
            r = 0;
        if (p.left) {
            l += me.getAll(p.left)
        }
        if (p.right) {
            r += me.getAll(p.right);
        }
        if (!p.left && !p.right) {
            return p.value * p.v;
        }
        return l + r;
    },
    display() {}
}
console.log(new createTree([4, 3, 5, 1, 2]).all)