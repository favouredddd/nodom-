'use strict';
(function() {
    if (Object.prototype.clone) {
        return
    }
    Object.prototype.clone = function(expKey) {
        let map = new WeakMap();
        let src = this;
        let retObj = clone(src);
        map = null;
        return retObj;

        function clone(src) {
            let dst;
            if (nodom.isObject(src)) {
                dst = new Object();
                map.set(src, dst);
                Object.getOwnPropertyNames(src).forEach((prop) => {
                    if (expKey) {
                        if (expKey.constructor === RegExp && expKey.test(prop) || expKey.constructor === String && expKey === prop) {
                            return
                        }
                    }
                    if (nodom.isObject(src[prop]) || nodom.isArray(src[prop])) {
                        let co = null;
                        if (!map.has(src[prop])) {
                            co = clone(src[prop]);
                            map.set(src[prop], co)
                        } else {
                            co = map.get(src[prop])
                        }
                        dst[prop] = co
                    } else {
                        dst[prop] = src[prop]
                    }
                })
            } else if (nodom.isArray(src)) {
                dst = new Array();
                map.set(src, dst);
                src.forEach(function(item, i) {
                    if (nodom.isObject(item) || nodom.isArray(item)) {
                        dst[i] = clone(item)
                    } else {
                        dst[i] = item
                    }
                })
            }
            return dst
        }
    }
}());
class nodom {
    static genId() {
        return this.generatedId++
    }
    static merge() {
        for (let i = 0; i < arguments.length; i++) {
            if (!nodom.isObject(arguments[i])) {
                throw Error.handle('invoke', 'nodom.merge', i, 'object');
            }
        }
        let retObj = Object.assign.apply(null, arguments);
        subObj(retObj);
        return retObj;

        function subObj(retObj) {
            for (let o in retObj) {
                if (nodom.isObject(retObj[o]) || nodom.isArray(retObj[o])) {
                    retObj[o] = retObj[o].clone()
                }
            }
        }
    }
    static assign(obj1, obj2) {
        if (Object.assign) {
            Object.assign(obj1, obj2)
        } else {
            nodom.getOwnProps(obj2).forEach(function(p) {
                obj1[p] = obj2[p]
            })
        }
        return obj1
    }
    static getOwnProps(obj) {
        if (!obj) {
            return []
        }
        return Object.getOwnPropertyNames(obj)
    }
    static isFunction(foo) {
        return foo !== undefined && foo !== null && foo.constructor === Function
    }
    static isArray(obj) {
        return obj !== undefined && obj !== null && obj.constructor === Array
    }
    static isObject(obj) {
        return obj !== null && obj !== undefined && obj.constructor === Object
    }
    static isInt(x) {
        return Number.isInteger(x)
    }
    static isNumber(v) {
        return typeof v === 'number'
    }
    static isBoolean(v) {
        return typeof v === 'boolean'
    }
    static isString(str) {
        return typeof str === 'string'
    }
    static isNumberString(str) {
        return /^\d+\.?\d*$/.test(str)
    }
    static isEmpty(obj) {
        if (obj === null || obj === undefined) return true;
        let tp = typeof obj;
        if (nodom.isObject(obj)) {
            let keys = Object.keys(obj);
            if (keys !== undefined) {
                return keys.length === 0
            }
        } else if (tp === 'string') {
            return obj === ''
        }
        return false
    }
    static get(selector, findAll, pview) {
        pview = pview || document;
        if (findAll === true) {
            return pview.querySelectorAll(selector)
        }
        return pview.querySelector(selector)
    }
    static append(el, dom) {
        if (nodom.isNode(dom)) {
            el.appendChild(dom)
        } else if (nodom.isString(dom)) {
            let div = nodom.newEl('div');
            div.innerHTML = dom;
            nodom.transChildren(div, el)
        }
    }
    static isEl(el) {
        return el !== undefined && el !== null && el.nodeType === Node.ELEMENT_NODE
    }
    static isNode(node) {
        return node !== undefined && node !== null && (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE)
    }
    static cloneNode(el) {
        if (!nodom.isNode(el)) {
            throw Error.handle('invoke', 'nodom.cloneNode', 0, 'Node');
        }
        let node = el.cloneNode(true);
        nodom.copyProp(node, el);
        return node
    }
    static copyProp(nod1, nod2) {
        let po = {};
        if (!nod1 || !nod2) {
            return
        }
        let notCloneArr = ['$model', '$module', '$events'];
        nodom.getOwnProps(nod2).forEach(function(p) {
            if (p[0] === '$') {
                let flag = false;
                for (let i = 0; i < notCloneArr.length; i++) {
                    if (p === notCloneArr[i]) {
                        flag = true;
                        break
                    }
                }
                if (!flag) {
                    po[p] = nod2[p]
                }
            }
        });
        nodom.merge(nod1, po);
        nod1.$module = nod2.$module;
        nod1.$events = {};
        if (nod2.$model) {
            nod1.$model = {};
            nodom.getOwnProps(nod2.$model).forEach(function(item) {
                nod1.$model[item] = nod2.$model[item]
            })
        }
        if (!nodom.isEmpty(nod2.$events)) {
            nodom.getOwnProps(nod2.$events).forEach(function(e) {
                let eo = nod2.$events[e];
                if (eo instanceof nodom.Event) {
                    let module = eo.module;
                    eo.view = nod1;
                    delete eo.module;
                    let p = nodom.merge({}, eo);
                    new nodom.Event(p)
                }
            })
        }
        for (let i = 0; i < nod1.childNodes.length; i++) {
            nodom.copyProp(nod1.childNodes[i], nod2.childNodes[i])
        }
    }
    static getAttrs(el, reg) {
        if (!nodom.isEl(el)) {
            throw Error.handle('invoke', 'nodom.getAtrs', 0, 'element');
        }
        let arr = [];
        for (let i = 0; i < el.attributes.length; i++) {
            let attr = el.attributes[i];
            if (reg.test(attr.name)) {
                arr.push(attr)
            }
        }
        return arr
    }
    static getTranslate(el) {
        let tr = el.style.transform;
        let arr;
        if (tr && tr !== 'none') {
            arr = [];
            let va = tr.substring(tr.indexOf('(') + 1, tr.indexOf(')') - 1);
            va = va.split(',');
            for (let i = 0; i < va.length; i++) {
                arr.push(parseInt(va[i]))
            }
        }
        if (arr) {
            return arr
        }
        return [0, 0, 0]
    }
    static getAttrsByValue(el, reg) {
        if (!nodom.isEl(el)) {
            throw Error.handle('invoke', 'nodom.getAttrsByValue', 0, 'element');
        }
        if (!reg instanceof RegExp) {
            throw Error.handle('invoke', 'nodom.getAttrsByValue', 1, 'RegExp');
        }
        let arr = [];
        for (let i = 0; i < el.attributes.length; i++) {
            let attr = el.attributes[i];
            if (reg.test(attr.value)) {
                arr.push(attr)
            }
        }
        return arr
    }
    static copyAttrs(srcEl, dstEl) {
        if (!nodom.isEl(srcEl)) {
            throw Error.handle('invoke', 'nodom.copyAttrs', 0, 'element');
        }
        if (!nodom.isEl(dstEl)) {
            throw Error.handle('invoke', 'nodom.copyAttrs', 1, 'element');
        }
        for (let i = 0; i < srcEl.attributes.length; i++) {
            let attr = srcEl.attributes[i];
            dstEl.setAttribute(attr.name, attr.value)
        }
    }
    static newEl(tagName, config, text) {
        if (!nodom.isString(tagName) || nodom.isEmpty(tagName)) {
            throw Error.handle('invoke', 'nodom.newEl', 0, 'string');
        }
        let el = document.createElement(tagName);
        if (nodom.isObject(config)) {
            nodom.attr(el, config)
        } else if (nodom.isString(text)) {
            el.innerHTML = text
        }
        return el
    }
    static newSvgEl(tagName) {
        return document.createElementNS("http://www.w3.org/2000/svg", tagName)
    }
    static replaceNode(srcNode, nodes, srcPropCopy) {
        if (!nodom.isNode(srcNode)) {
            throw Error.handle('invoke', 'nodom.replaceNode', 0, 'Node');
        }
        if (!nodom.isNode(nodes) && !nodom.isArray(nodes)) {
            throw Error.handle('invoke1', 'nodom.replaceNode', 1, 'Node', 'Node Array');
        }
        let pnode = srcNode.parentNode;
        let bnode = srcNode.nextSibling;
        if (pnode === null) {
            return
        }
        pnode.removeChild(srcNode);
        if (!nodom.isArray(nodes)) {
            nodes = [nodes]
        }
        nodes.forEach(function(node) {
            if (bnode === undefined || bnode === null) {
                pnode.appendChild(node)
            } else {
                pnode.insertBefore(node, bnode)
            } if (srcPropCopy !== false) {
                srcPropCopy = true
            }
            if (srcPropCopy && srcNode.$isView) {
                nodom.copyProp(node, srcNode)
            }
        })
    }
    static insertAfter(newNode, srcNode, pNode) {
        let me = this;
        if (!nodom.isNode(newNode)) {
            throw Error.handle('invoke', 'nodom.insertAfter', 0, 'Node');
        }
        if (!nodom.isNode(srcNode) && !nodom.isNode(pNode)) {
            throw Error.handle('invoke2', 'nodom.insertAfter', 1, 2, 'Node');
        }
        let bNode = null;
        if (srcNode === undefined || srcNode === null) {
            bNode = pNode.firstChild
        } else {
            pNode = srcNode.parentNode;
            bNode = srcNode.nextSibling
        } if (!nodom.isNode(pNode)) {
            return
        }
        if (bNode === null) {
            if (nodom.isArray(newNode)) {
                newNode.forEach(function(n) {
                    if (me.isEl(n)) {
                        pNode.appendChild(n)
                    }
                })
            } else {
                pNode.appendChild(newNode)
            }
        } else {
            if (nodom.isArray(newNode)) {
                newNode.forEach(function(n) {
                    if (me.isEl(n)) {
                        pNode.insertBefore(n, bNode)
                    }
                })
            } else {
                pNode.insertBefore(newNode, bNode)
            }
        }
    }
    static empty(el) {
        let me = this;
        if (!me.isEl(el)) {
            throw Error.handle('invoke', 'nodom.empty', 0, 'Element');
        }
        let nodes = el.childNodes;
        for (let i = nodes.length - 1; i >= 0; i--) {
            el.removeChild(nodes[i])
        }
    }
    static remove(node) {
        let me = this;
        if (!me.isNode(node)) {
            throw Error.handle('invoke', 'nodom.remove', 0, 'Node');
        }
        if (node.parentNode !== null) {
            node.parentNode.removeChild(node)
        }
    }
    static copyChildren(el) {
        let me = this;
        if (!me.isEl(el)) {
            throw Error.handle('invoke', 'nodom.copyChildren', 0, 'Element');
        }
        let nodes = el.childNodes;
        let arr = [];
        for (let i = nodes.length - 1; i >= 0; i--) {
            arr.push(nodes[i])
        }
        return arr
    }
    static transChildren(srcEl, dstEl) {
        let me = this;
        if (!me.isEl(srcEl)) {
            throw Error.handle('invoke', 'nodom.copyChildren', 0, 'Element');
        }
        if (!me.isEl(dstEl)) {
            throw Error.handle('invoke', 'nodom.copyChildren', 1, 'Element');
        }
        let frag = document.createDocumentFragment();
        for (; srcEl.childNodes.length > 0;) {
            frag.appendChild(srcEl.childNodes[0])
        }
        dstEl.appendChild(frag)
    }
    static attr(el, param, value) {
        let me = this;
        if (!me.isEl(el)) {
            throw Error.handle('invoke', 'nodom.attr', 0, 'Element');
        }
        if (nodom.isEmpty(param)) {
            throw Error.handle('invoke', 'nodom.attr', 1, 'string', 'object');
        }
        if (value === undefined || value === null) {
            if (nodom.isObject(param)) {
                nodom.getOwnProps(param).forEach(function(k) {
                    if (k === 'value') {
                        el[k] = param[k]
                    } else {
                        el.setAttribute(k, param[k])
                    }
                })
            } else if (nodom.isString(param)) {
                if (param === 'value') {
                    return param.value
                }
                return el.getAttribute(param)
            }
        } else {
            if (param === 'value') {
                el[param] = value
            } else {
                el.setAttribute(param, value)
            }
        }
    }
    static css(el, name, value) {
        let me = this;
        if (!me.isEl(el)) {
            throw Error.handle('invoke', 'nodom.css', 0, 'Element');
        }
        if (nodom.isEmpty(name)) {
            throw Error.handle('invoke1', 'nodom.css', 1, 'string', 'object');
        }
        let compStyle;
        if (window.getComputedStyle) {
            compStyle = window.getComputedStyle(el, null)
        }
        if (!compStyle) {
            return
        }
        if (value === undefined || value === null) {
            if (nodom.isObject(name)) {
                nodom.getOwnProps(name).forEach(function(k) {
                    if (nodom.cssconfig !== undefined && nodom.cssconfig[k] !== undefined) {
                        nodom.cssconfig[k].forEach(function(sn) {
                            el.style[sn] = name[k]
                        })
                    } else {
                        el.style[k] = name[k]
                    }
                })
            } else {
                return compStyle[name]
            }
        } else {
            if (nodom.$cssconfig !== undefined && nodom.$cssconfig[name] !== undefined) {
                nodom.$cssconfig[name].forEach(function(sn) {
                    el.style[sn] = value
                })
            } else {
                el.style[name] = value
            }
        }
    }
    static width(el, value) {
        if (!nodom.isEl(el)) {
            throw Error.handle('invoke', 'nodom.width', 0, 'Element');
        }
        if (nodom.isNumber(value)) {
            el.style.width = value + 'px'
        } else {
            let compStyle;
            if (window.getComputedStyle) {
                compStyle = window.getComputedStyle(el, null)
            }
            if (!compStyle) {
                return null
            }
            let w = parseInt(compStyle['width']);
            if (value === true) {
                let pw = parseInt(compStyle['panodom.ngLeft']) + parseInt(compStyle['panodom.ngRight']);
                w -= pw
            }
            return w
        }
    }
    static height(el, value) {
        if (!nodom.isEl(el)) {
            throw Error.handle('invoke', 'nodom.height', 0, 'Element');
        }
        if (nodom.isNumber(value)) {
            el.style.height = value + 'px'
        } else {
            let compStyle;
            if (window.getComputedStyle) {
                compStyle = window.getComputedStyle(el, null)
            }
            if (!compStyle) {
                return null
            }
            let w = parseInt(compStyle['height']);
            if (value === true) {
                let pw = parseInt(compStyle['panodom.ngTop']) + parseInt(compStyle['panodom.ngBotto,']);
                w -= pw
            }
            return w
        }
    }
    static addClass(el, cls) {
        if (!nodom.isEl(el)) {
            throw Error.handle('invoke', 'nodom.anodom.lass', 0, 'Element');
        }
        if (nodom.isEmpty(cls)) {
            throw Error.handle('invoke', 'nodom.anodom.lass', 1, 'string');
        }
        let cn = el.className.trim();
        if (nodom.isEmpty(cn)) {
            el.className = cls
        } else {
            let arr = cn.split(/\s+/);
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === cls) {
                    return
                }
            }
            arr.push(cls);
            el.className = arr.join(' ')
        }
    }
    static removeClass(el, cls) {
        if (!nodom.isEl(el)) {
            throw Error.handle('invoke', 'nodom.removeClass', 0, 'Element');
        }
        if (nodom.isEmpty(cls)) {
            throw Error.handle('invoke', 'nodom.removeClass', 1, 'string');
        }
        let cn = el.className.trim();
        if (!nodom.isEmpty(cn)) {
            let arr = cn.split(/\s+/);
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === cls) {
                    arr.splice(i, 1);
                    el.className = arr.join(' ');
                    return
                }
            }
        }
    }
    static formatDate(srcDate, format) {
        if (nodom.isString(srcDate)) {
            let reg = new RegExp(/^\d+$/);
            if (reg.exec(srcDate) !== null) {
                try {
                    srcDate = parseInt(srcDate)
                } catch (e) {}
            }
        }
        let srcDate = new Date(srcDate);
        if (isNaN(srcDate.getDay())) {
            return ''
        }
        let o = {
            "M+": srcDate.getMonth() + 1,
            "d+": srcDate.getDate(),
            "h+": srcDate.getHours() % 12 === 0 ? 12 : srcDate.getHours() % 12,
            "H+": srcDate.getHours(),
            "m+": srcDate.getMinutes(),
            "s+": srcDate.getSeconds(),
            "q+": Math.floor((srcDate.getMonth() + 3) / 3),
            "S": srcDate.getMilliseconds()
        };
        let week = {
            "0": "日",
            "1": "一",
            "2": "二",
            "3": "三",
            "4": "四",
            "5": "五",
            "6": "六"
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (srcDate.getFullYear() + "").substr(4 - RegExp.$1.length))
        }
        nodom.getOwnProps(o).forEach(function(k) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
            }
        });
        if (/(E+)/.test(format)) {
            format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[srcDate.getDay() + ""])
        }
        return format
    }
    static toDate(dateStr) {
        let date1;
        try {
            date1 = new Date(Date.parse(dateStr))
        } catch (e) {}
        if (!date1) {
            throw Error.handle('invoke', 'nodom.toDate', 0, 'date string');
        }
        if (isNaN(date1) || isNaN(date1.getDay())) {
            if (dateStr.length === 14) {
                dateStr = dateStr.substr(0, 4) + '/' + dateStr.substr(4, 2) + '/' + dateStr.substr(6, 2) + ' ' + dateStr.substr(8, 2) + ':' + dateStr.substr(10, 2) + ':' + dateStr.substr(12);
                date1 = new Date(Date.parse(dateStr))
            } else if (dateStr.length === 8) {
                dateStr = dateStr.substr(0, 4) + '/' + dateStr.substr(4, 2) + '/' + dateStr.substr(6, 2);
                date1 = new Date(Date.parse(dateStr))
            }
        }
        return date1
    }
    static compileStr() {
        let reg = new RegExp(/\{.+?\}/);
        let arr = [];
        let r;
        let args = arguments;
        let str = args[0];
        while ((r = reg.exec(str)) !== null) {
            let rep;
            let sIndex = r[0].substr(1, r[0].length - 2);
            let pIndex = parseInt(sIndex) + 1;
            if (args[pIndex] !== undefined) {
                rep = args[pIndex]
            } else {
                rep = ''
            }
            str = str.replace(reg, rep)
        }
        return str
    }
    static parseJson(jsonStr) {
        jsonStr = jsonStr.trim();
        let arr = jsonStr.substr(1, jsonStr.length - 2).split(',');
        let repStr = "$$nodom.rep_str";
        let obj = {};
        let reg1 = new RegExp(/\'/g);
        let reg2 = new RegExp(/\"/g);
        arr.forEach(function(item) {
            let a = item.split(':');
            if (a[0] !== '"' && a[0] !== "'" || a[a.length - 1] !== '"' && a[a.length - 1] !== "'") {
                let key = a[0].replace(reg1, '\\\'');
                let v = a[1];
                let l = v.length;
                if (l > 2 && (v[0] === '"' && v[l - 1] === '"' || v[0] === '"' && v[l - 1] === '"')) {
                    v = v.substr(1, l - 2)
                }
                obj[key] = v
            }
        });
        return obj
    }
    static addStrQuot(srcStr, quot) {
        srcStr = srcStr.replace(/\'/g, '\\\'');
        srcStr = srcStr.replace(/\"/g, '\\\"');
        srcStr = srcStr.replace(/\`/g, '\\\`');
        quot = quot || '"';
        srcStr = quot + srcStr + quot;
        return srcStr
    }
    static apply(foo, obj, args) {
        return Reflect.apply(foo, obj, args)
    }
    static load(type, path, callback, retName, sync) {
        let head = nodom.get('head');
        if (head === null) {
            head = document.body
        }
        switch (type) {
            case 'css':
                let cs = nodom.get("link[href='" + path + "']");
                if (cs !== null) {
                    return
                }
                let css = nodom.newEl('link');
                css.type = 'text/css';
                css.rel = 'stylesheet';
                css.href = path;
                head.appendChild(css);
                if (nodom.isFunction(callback)) {
                    callback()
                }
                break;
            case 'js':
                let cs = nodom.get("script[dsrc='" + path + "']");
                if (cs !== null) {
                    if (nodom.isFunction(callback)) {
                        callback()
                    }
                    return
                }
                let script = nodom.newEl('script');
                head.appendChild(script);
                script.setAttribute('dsrc', path);
                nodom.request({
                    url: path,
                    type: 'js',
                    async: !sync,
                    successFunc(r) {
                        let script = nodom.newEl('script');
                        if (retName) {
                            r = retName + '=' + r
                        }
                        script.innerHTML = r;
                        head.appendChild(script);
                        script.innerHTML = '';
                        head.removeChild(script);
                        if (nodom.isFunction(callback)) {
                            callback()
                        }
                    }
                });
                break
        }
    }
    static equest(config) {
        let req = new XMLHttpRequest();
        if (nodom.isEmpty(config.url)) {
            throw Error.handle('invoke', 'nodom.request', "config.url", 'string');
        }
        if (config.params && !nodom.isObject(config.params)) {
            throw Error.handle('invoke', 'nodom.request', "config.params", 'object');
        }
        if (config.rand) {
            config.params = config.params || {};
            config.params.$rand = Math.random()
        }
        let async = config.async === false ? false : true;
        if (typeof config.successFunc === 'function') {
            req.onload = function(e) {
                switch (req.status) {
                    case 200:
                        let r = req.responseText;
                        switch (config.type) {
                            case 'json':
                                try {
                                    r = JSON.parse(r)
                                } catch (e) {
                                    r = {
                                        success: false,
                                        result: {
                                            "errmsg": "未知错误"
                                        }
                                    }
                                }
                                break
                        }
                        if (r.success !== undefined && r.success === false) {
                            Dialog.showErrmsg(r.result.errmsg)
                        }
                        config.successFunc.call(req, r);
                        break;
                    default:
                        if (nodom.isFunction(config.errorFunc)) {
                            config.errorFunc.call(req, req.status)
                        }
                }
            }
        }
        if (nodom.isFunction(config.errorFunc)) {
            req.onerror = config.errorFunc
        }
        if (nodom.isFunction(config.timeoutFunc)) {
            req.ontimeout = config.timeoutFunc
        }
        let reqType = config.reqType || 'GET';
        let url = config.url;
        config.timeout = config.timeout || 60000;
        switch (reqType) {
            case 'GET':
                let pa;
                if (nodom.isObject(config.params)) {
                    let ar = [];
                    nodom.getOwnProps(config.params).forEach(function(key) {
                        ar.push(key + '=' + config.params[key])
                    });
                    pa = ar.join('&')
                }
                if (pa !== undefined) {
                    if (url.indexOf('?') !== -1) {
                        url += '&' + pa
                    } else {
                        url += '?' + pa
                    }
                }
                req.open(reqType, url, async, config.user, config.pwd);
                if (async) {
                    req.timeout = config.timeout
                }
                req.send(null);
                break;
            case 'POST':
                let fd = new FormData();
                for (let o in config.params) {
                    fd.append(o, config.params[o])
                }
                req.open(reqType, url, async, config.user, config.pwd);
                req.timeout = config.timeout;
                req.send(fd);
                break
        }
    }
}
nodom.generatedId = 1;