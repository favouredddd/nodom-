;
(() => {
    var getNode = function(v) {
        var tem = { v: v, l: null, r: null, p: null };
        return tem;
    }
    var create = function(v) {
        var me = this;
        var node = getNode(v);
        if (!me.root) {
            me.root = node;
            return;
        }
        var tem = me.root;
        while (tem[tem.v > v ? 'l' : 'r']) {
            tem = tem[tem.v > v ? 'l' : 'r'];
        }
        tem[v < tem.v ? 'l' : 'r'] = node;
        node.p = tem;
    }
    var after = function(node) {
        var me = this;
        if (node.l) {
            me.after(node.l)
        }
        if (node.r) {
            me.after(node.r)
        }
        console.log(node.v)
    }
    var mid = function(node) {
        var me = this;
        if (node.l) {
            me.mid(node.l);
        }
        console.log(node.v)
        if (node.r) {
            me.mid(node.r);
        }
    }
    var pre = function(node) {
        var me = this;
        console.log(node.v)
        if (node.l) {
            pre(node.l)
        }
        if (node.r) {
           pre(node.r)
        }
    }
    var init = function(arr) {
        var me = this;
        me.pre = pre;
        me.mid = mid;
        me.after = after;
        me.create = create;
        arr.forEach(i => {
            me.create(i);
        });
        // me.pre(me.root);
        // me.mid(me.root);
        me.after(me.root);
    }
    // new init([1,5,4,9,3])
    var getTree = function(f, m) {
        var me = this;
        var tem;
        var len = f.length;
        var r = f[f.length - 1];
        tem = getNode(r);
        var index = m.indexOf(r);
        if ((f.slice(0, index), m.slice(0, index)).length) {
            tem.l = getTree(f.slice(0, index), m.slice(0, index));
        }
        if ((f.slice(index, -1), m.slice(index + 1)).length) {
            tem.r = getTree(f.slice(index, -1), m.slice(index + 1));
        }
        return tem;
    }
    pre(new getTree('FDBGECA'.split(""), 'BFDAEGC'.split("")))
})()