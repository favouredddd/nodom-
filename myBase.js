'use strict';

/**
 * Object 扩展
 */
 (function(){
    if(Object.prototype.clone){
        return;
    }

    /**
     * 对象复制
     * @param expKey    不复制的键正则表达式或名
     * @return          复制的对象
     */

    Object.prototype.clone = function(expKey){
        let map = new WeakMap();
        let src = this;
        let retObj = clone(src);
        map = null;
        return retObj;

        /**
         * clone对象
         * @param src   待clone对象
         * @return      克隆后的对象
         */
        function clone(src){
            let dst;
            if(nodom.isObject(src)){
                dst = new Object();
                //把对象加入map，如果后面有新克隆对象，则用新克隆对象进行覆盖
                map.set(src,dst);
                Object.getOwnPropertyNames(src).forEach((prop)=>{
                    //不克隆的键
                    if(expKey){
                        if(expKey.constructor === RegExp && expKey.test(prop) //正则表达式匹配的键不复制
                            || expKey.constructor === String && expKey === prop   //被排除的键不复制
                            ){
                            return;
                        }
                    }
                    //数组或对象继续克隆
                    if(nodom.isObject(src[prop]) || nodom.isArray(src[prop])){
                        let co = null;
                        if(!map.has(src[prop])){  //clone新对象
                            co = clone(src[prop]);
                            //存储已克隆对象，避免重复创建或对象相互引用带来的溢出
                            map.set(src[prop],co);
                        }else{                    //从map中获取对象
                            co = map.get(src[prop]);
                        }
                        dst[prop] = co;
                    }else{  //直接复制
                        dst[prop] = src[prop];
                    }
                });
            } else if(nodom.isArray(src)){
                dst = new Array();
                //把对象加入map，如果后面有新克隆对象，则用新克隆对象进行覆盖
                map.set(src,dst);
            
                src.forEach(function(item,i){
                   if(nodom.isObject(item) || nodom.isArray(item)){
                        dst[i] = clone(item);
                    }else{  //直接复制
                        dst[i] = item;
                    } 
                });
            }
            return dst;
        }
    }
 }());
 

/**
 * @description 基础服务库
 * @author      yanglei
 * @since       1.0.0
 * @create      2016-09-28
 */
class nodom{
    //唯一主键
    static genId(){
        return this.generatedId++;
    }
    
    /******对象相关******/

    /**
     * 合并多个对象并返回
     * @param   参数数组
     * @return  返回对象
     */
    static merge(){
        for(let i=0;i<arguments.length;i++){
            if(!nodom.isObject(arguments[i])){
                throw Error.handle('invoke','nodom.merge',i,'object');    
            }
        }

        let retObj = Object.assign.apply(null,arguments);
        
        subObj(retObj);
        return retObj;
        //处理子对象
        function subObj(retObj){
            for(let o in retObj){
                if(nodom.isObject(retObj[o]) || nodom.isArray(retObj[o])){ //对象或数组
                    retObj[o] = retObj[o].clone();
                }
            }
        }
    }

    
    /**
     * 把obj2对象所有属性赋值给obj1
     */
    static assign(obj1,obj2){
        if(Object.assign){
            Object.assign(obj1,obj2);
        }else{
            nodom.getOwnProps(obj2).forEach(function(p){
                obj1[p] = obj2[p];
            });    
        }
        return obj1;
    }

    /**
     * 获取对象自有属性
     */
    static getOwnProps(obj){
        if(!obj){
            return [];
        }
        return Object.getOwnPropertyNames(obj);
    }
    /**************对象判断相关************/
    /**
     * 是否为函数
     * @param foo   检查的对象
     * @return true/false
     */
    static isFunction(foo){
        return foo !== undefined && foo !== null && foo.constructor === Function;
    }
    /**
     * 是否为数组
     * @param obj   检查的对象
     * @return true/false
     */
    static isArray(obj) {
        return obj !== undefined && obj !== null && obj.constructor === Array;
    }

    /**
     * 是否为对象
     * @param obj   检查的对象
     * @return true/false
     */
    static isObject(obj) {
        return obj !== null && obj !== undefined && obj.constructor === Object;
    }

    /**
     * 判断是否为整数
     */
    static isInt(x) {
        return Number.isInteger(x);
    }
    /**
     * 判断是否为number
     */
    static isNumber(v){
        return typeof v === 'number';
    }

    /**
     * 判断是否为boolean
     */
    static isBoolean(v){
        return typeof v === 'boolean';
    }
    /**
     * 判断是否为字符串
     */
    static isString(str){
        return typeof str === 'string';
    }

    /**
     * 是否为数字串
     */
    static isNumberString(str){
        return /^\d+\.?\d*$/.test(str);
    }

    /**
     * 对象/字符串是否为空
     * @param obj   检查的对象
     * @return true/false
     */
    static isEmpty(obj){
        if(obj === null || obj === undefined)
            return true;
        let tp = typeof obj;
        if(nodom.isObject(obj)){
            let keys = Object.keys(obj);
            if(keys !== undefined){
                return keys.length === 0;
            }
        }else if(tp === 'string'){
            return obj === '';
        }
        return false;
    }


   /**********dom相关***********/
    /**
     * 获取dom节点
     * @param selector  选择器
     * @param findAll   是否获取所有，默认为false
     * @param pview     父对象
     * @return element/null 或 element数组/[]
     */
    static get(selector,findAll,pview){
        pview = pview || document;
        if(findAll === true){
            return pview.querySelectorAll(selector);
        }
        return pview.querySelector(selector);
    }

    /**
     * 追加子节点
     * @param el    父element
     * @param dom   要添加的dom节点或dom串
     */
    static append(el,dom){
        if(nodom.isNode(dom)){
            el.appendChild(dom);
        }else if(nodom.isString(dom)){
            let div = nodom.newEl('div');
            div.innerHTML = dom;
            nodom.transChildren(div,el);
        }
    }
    /**
     * 是否为element
     * @param el 传入的对象
     * @return true/false
     */
    static isEl(el){
        return el !== undefined && el !== null && el.nodeType === Node.ELEMENT_NODE;
    }

    /**
     * 是否为node
     * @param node 传入的对象
     * @return true/false
     */
    static isNode(node){
        return node !== undefined && node !== null && (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE);  
    }
    /**
     * 复制节点，并复制view属性
     * @param el    待克隆 el
     */
    static cloneNode(el){
        if(!nodom.isNode(el)){
            throw Error.handle('invoke','nodom.cloneNode',0,'Node');
        }
        let node = el.cloneNode(true);
        nodom.copyProp(node,el);
        return node;
    }

    /**
     * 复制node自定义属性
     * @param nod1  目标node
     * @param nod2  源node
     */
    static copyProp(nod1,nod2){
        let po = {};
        if(!nod1 || !nod2){
            return;
        }
        let notCloneArr = ['$model','$module','$events'];
        //复制自定义属性
        nodom.getOwnProps(nod2).forEach(function(p){
            if(p[0] === '$'){
                let flag = false;
                for(let i=0;i<notCloneArr.length;i++){
                    if(p === notCloneArr[i]){
                        flag = true;
                        break;
                    }
                }
                if(!flag){
                    po[p] = nod2[p];
                }
            }
        });
        nodom.merge(nod1,po);
        //$model要单独处理
        nod1.$module = nod2.$module;
        //先把事件清空
        nod1.$events = {};
        //复制model
        if(nod2.$model){
            nod1.$model = {};
            nodom.getOwnProps(nod2.$model).forEach(function(item){
                nod1.$model[item] = nod2.$model[item];
            });
        }
        //处理事件
        if(!nodom.isEmpty(nod2.$events)){
            nodom.getOwnProps(nod2.$events).forEach(function(e){
                let eo = nod2.$events[e];
                if(eo instanceof nodom.Event){
                    let module = eo.module;
                    eo.view = nod1;    
                    delete eo.module;
                    let p = nodom.merge({},eo);
                    new nodom.Event(p);
                }
            });
        }
        //处理子孙节点
        for(let i=0;i<nod1.childNodes.length;i++){
            nodom.copyProp(nod1.childNodes[i],nod2.childNodes[i]);
        }
    }
    /**
     * 获取属性数组
     * @param   el  element
     * @param   reg 正则式
     * @return  属性数组
     */
    static getAttrs(el,reg){
        if(!nodom.isEl(el)){
            throw Error.handle('invoke','nodom.getAtrs',0,'element');
        }
        let arr = [];
        for(let i=0;i<el.attributes.length;i++){
            let attr = el.attributes[i];
            if(reg.test(attr.name)){
                arr.push(attr);
            }
        }
        return arr;
    }

    /**
     * 获取translate3d 数据
     * @param view  element
     */
    static getTranslate(el){
        let tr = el.style.transform;
        let arr;
        if(tr && tr !== 'none'){
            arr = [];
            let va = tr.substring(tr.indexOf('(')+1,tr.indexOf(')')-1);
            va = va.split(',');
            for(let i=0;i<va.length;i++){
                arr.push(parseInt(va[i]));
            }
        }
        if(arr){
            return arr;
        }
        return [0,0,0];
    }

    /**
     * 通过属性值获取属性列表
     * @param el    element
     * @param reg   正则表达式
     */
    static getAttrsByValue(el,reg){
        if(!nodom.isEl(el)){
            throw Error.handle('invoke','nodom.getAttrsByValue',0,'element');
        }
        if(!reg instanceof RegExp){
            throw Error.handle('invoke','nodom.getAttrsByValue',1,'RegExp');   
        }
        let arr = [];

        for(let i=0;i<el.attributes.length;i++){
            let attr = el.attributes[i];
            if(reg.test(attr.value)){
                arr.push(attr);
            }
        }
        return arr;
    }
    /**
     * 复制element 属性
     * @param srcEl     源element
     * @param dstEl     目标element
     */
    static copyAttrs(srcEl,dstEl){
        if(!nodom.isEl(srcEl)){
            throw Error.handle('invoke','nodom.copyAttrs',0,'element');
        }
        if(!nodom.isEl(dstEl)){
            throw Error.handle('invoke','nodom.copyAttrs',1,'element');
        }
        for(let i=0;i<srcEl.attributes.length;i++){
            let attr = srcEl.attributes[i];
            dstEl.setAttribute(attr.name,attr.value);
        }
    }
    /**
     * 新建dom
     * @param tagName   标签名
     * @param config    属性集合
     * @param text      innerText
     * @return 新建的elelment
     */
    static newEl(tagName,config,text){
        if(!nodom.isString(tagName) || nodom.isEmpty(tagName)){
            throw Error.handle('invoke','nodom.newEl',0,'string');   
        }
        let el = document.createElement(tagName);
        if(nodom.isObject(config)){
            nodom.attr(el,config);
        }else if(nodom.isString(text)){
            el.innerHTML = text;
        }
        return el;
    }
    /**
     * 新建svg element
     * @param tagName   标签名
     * @return          svg element
     */
    static newSvgEl(tagName){
        return document.createElementNS("http://www.w3.org/2000/svg",tagName);
    }
    /**
     * 把srcNode替换为nodes
     * @param srcNode       源dom
     * @param nodes         替换的dom或dom数组
     * @param srcPropCopy   是否保留原有dom的扩展view参数，缺省true
     */
    static replaceNode(srcNode,nodes,srcPropCopy){
        if(!nodom.isNode(srcNode)){
            throw Error.handle('invoke','nodom.replaceNode',0,'Node');
        }
        
        if(!nodom.isNode(nodes) && !nodom.isArray(nodes)){
            throw Error.handle('invoke1','nodom.replaceNode',1,'Node','Node Array');
        }

        let pnode = srcNode.parentNode;
        let bnode = srcNode.nextSibling;
        if(pnode === null){
            return;
        }
        pnode.removeChild(srcNode);
        if(!nodom.isArray(nodes)){
            nodes = [nodes];
        }
        
        nodes.forEach(function(node){
            if(bnode === undefined || bnode === null){
                pnode.appendChild(node);
            }else{
                pnode.insertBefore(node,bnode);
            }
            if(srcPropCopy !== false){
                srcPropCopy = true;
            }
            // 扩展node处理 参数复制
            if(srcPropCopy && srcNode.$isView){
                nodom.copyProp(node,srcNode);
            }
        });
    }
    /**
     * 在srcNode后面插入newNode,如果srcNode无效，则插入到第一个
     * @param newNode   新节点或数组
     * @param oldNode   旧节点
     */
    static insertAfter(newNode,srcNode,pNode){
        let me = this;
        if(!nodom.isNode(newNode)){
            throw Error.handle('invoke','nodom.insertAfter',0,'Node');
        }
        if(!nodom.isNode(srcNode) && !nodom.isNode(pNode)){
            throw Error.handle('invoke2','nodom.insertAfter',1,2,'Node');
        }
        let bNode=null;
        //如果srcNode不存在，则添加在第一个位置
        if(srcNode === undefined || srcNode === null){
            bNode = pNode.firstChild;
        }else{
            pNode = srcNode.parentNode;
            bNode = srcNode.nextSibling;
        }
        if(!nodom.isNode(pNode)){
            return;
        }
        if(bNode === null){
            if(nodom.isArray(newNode)){
                newNode.forEach(function(n){
                    if(me.isEl(n)){
                        pNode.appendChild(n);
                    }
                });
            }else{
                pNode.appendChild(newNode);
            }
        }else{
            if(nodom.isArray(newNode)){
                newNode.forEach(function(n){
                    if(me.isEl(n)){
                        pNode.insertBefore(n,bNode);
                    }
                });
            }else{
                pNode.insertBefore(newNode,bNode);
            }
        }
    }

    /**
     * 清空子节点
     * @param el
     */
    static empty(el){
        let me = this;
        if(!me.isEl(el)){
            throw Error.handle('invoke','nodom.empty',0,'Element');
        }
        let nodes = el.childNodes;
        for(let i=nodes.length-1;i>=0;i--){
            el.removeChild(nodes[i]);
        }
    }
    /**
     * 删除自己
     * @param node
     */
    static remove(node){
        let me = this;
        if(!me.isNode(node)){
            throw Error.handle('invoke','nodom.remove',0,'Node');
        }
        if(node.parentNode !== null){
            node.parentNode.removeChild(node);
        }
    }

    /**
     * 复制子节点
     * @param el    element
     * @return  返回复制的子节点数组
     */
    static copyChildren(el){
        let me = this;
        if(!me.isEl(el)){
            throw Error.handle('invoke','nodom.copyChildren',0,'Element');
        }
        let nodes = el.childNodes;
        let arr = [];
        for(let i=nodes.length-1;i>=0;i--){
            arr.push(nodes[i]);
        }
        return arr;
    }

    /**
     * 转移孩子节点
     * @param srcEl 源父节点
     * @param dstEl 目的父节点
     */
    static transChildren(srcEl,dstEl){
        let me = this;
        if(!me.isEl(srcEl)){
            throw Error.handle('invoke','nodom.copyChildren',0,'Element');
        }
        if(!me.isEl(dstEl)){
            throw Error.handle('invoke','nodom.copyChildren',1,'Element');
        }
        //通过fragment 转移，减少渲染
        let frag = document.createDocumentFragment();
        for(;srcEl.childNodes.length>0;){
            frag.appendChild(srcEl.childNodes[0]);
        }
        dstEl.appendChild(frag);
    }

    /**
     * 获取／设置属性
     * @param el    element
     * @param param 属性名，设置多个属性时用对象
     * @param value 属性值，获取属性时不需要设置
     */
    static attr(el,param,value){
        let me = this;
        if(!me.isEl(el)){
            throw Error.handle('invoke','nodom.attr',0,'Element');
        }
        if(nodom.isEmpty(param)){
            throw Error.handle('invoke','nodom.attr',1,'string','object');   
        }
        if(value === undefined || value === null){
            if(nodom.isObject(param)){ //设置多个属性
                nodom.getOwnProps(param).forEach(function(k){
                    if(k === 'value'){
                        el[k] = param[k];
                    }else{
                        el.setAttribute(k,param[k]);
                    }
                });
            }else if(nodom.isString(param)){ //获取属性
                if(param === 'value'){
                    return param.value
                }
                return el.getAttribute(param);
            }
        }else { //设置属性
            if(param === 'value'){
                    el[param] = value;
            }else{
                el.setAttribute(param,value);
            }
        }
    }
    /**
     * 设置样式
     * @param el    element
     * @param name  样式名，设置多个样式时用对象
     * @param value 样式值，获取样式时不需要设置
     */
    static css(el,name,value){
        let me = this;
        if(!me.isEl(el)){
            throw Error.handle('invoke','nodom.css',0,'Element');
        }
        if(nodom.isEmpty(name)){
            throw Error.handle('invoke1','nodom.css',1,'string','object');   
        }
        let compStyle;
        //ie 9+ firefox chrome safari
        if(window.getComputedStyle){
            compStyle = window.getComputedStyle(el,null);
        }
        if(!compStyle){
            return;
        }

        if(value === undefined || value === null){
            if(nodom.isObject(name)){ //设置多个属性
                nodom.getOwnProps(name).forEach(function(k){
                    if(nodom.cssconfig !== undefined && nodom.cssconfig[k] !== undefined){
                        //遍历属性名数组
                        nodom.cssconfig[k].forEach(function(sn){
                             el.style[sn] = name[k];
                        });
                    }else{
                        el.style[k] = name[k];
                    }
                });
            }else{ //获取样式
                return compStyle[name];
            }
        }else { //设置属性
            if(nodom.$cssconfig !== undefined && nodom.$cssconfig[name] !== undefined){
                //遍历属性名数组
                nodom.$cssconfig[name].forEach(function(sn){
                     el.style[sn] = value;
                });
            }else{
                el.style[name] = value;
            }
        }
    }
    /**
     * 获取或设置宽度
     * @param el        elment
     * @param value     如果为false，则获取外部width(含panodom.ng)，否则获取内部width，如果为数字，则设置width + px
     */
    static width(el,value){
        if(!nodom.isEl(el)){
            throw Error.handle('invoke','nodom.width',0,'Element');
        }
        if(nodom.isNumber(value)){
            el.style.width = value + 'px';
        }else{
            let compStyle;
            //ie 9+ firefox chrome safari
            if(window.getComputedStyle){
                compStyle = window.getComputedStyle(el,null);
            }
            if(!compStyle){
                return null;
            }
            let w = parseInt(compStyle['width']);
            if(value === true){
                let pw = parseInt(compStyle['panodom.ngLeft'])+parseInt(compStyle['panodom.ngRight']);
                w -= pw;    
            }
            return w;
        }
    }

    static height(el,value){
        if(!nodom.isEl(el)){
            throw Error.handle('invoke','nodom.height',0,'Element');
        }
        if(nodom.isNumber(value)){
            el.style.height = value + 'px';
        }else{
            let compStyle;
            //ie 9+ firefox chrome safari
            if(window.getComputedStyle){
                compStyle = window.getComputedStyle(el,null);
            }
            if(!compStyle){
                return null;
            }
            let w = parseInt(compStyle['height']);
            if(value === true){
                let pw = parseInt(compStyle['panodom.ngTop'])+parseInt(compStyle['panodom.ngBotto,']);
                w -= pw;    
            }
            return w;
        }
    }
    /**
     * 添加class
     * @param el        element
     * @param cls   类名
     */
    static addClass(el,cls){
        if(!nodom.isEl(el)){
            throw Error.handle('invoke','nodom.anodom.lass',0,'Element');
        }
        if(nodom.isEmpty(cls)){
            throw Error.handle('invoke','nodom.anodom.lass',1,'string');   
        }

        let cn = el.className.trim();
        if(nodom.isEmpty(cn)){
            el.className = cls;
        }else{
            let arr = cn.split(/\s+/);
            //遍历class数组，如果存在cls，则不操作
            for(let i=0;i<arr.length;i++){
                if(arr[i] === cls){
                    return;
                }
            }
            //追加cls
            arr.push(cls);
            el.className = arr.join(' ');
        }
    }
    /**
     * 移除cls
     * @param el        element
     * @param cls   类名
     */
    static removeClass(el,cls){
        if(!nodom.isEl(el)){
            throw Error.handle('invoke','nodom.removeClass',0,'Element');
        }
        if(nodom.isEmpty(cls)){
            throw Error.handle('invoke','nodom.removeClass',1,'string');   
        }

        let cn = el.className.trim();
        if(!nodom.isEmpty(cn)){
            let arr = cn.split(/\s+/);
            //遍历class数组，如果存在cls，则移除
            for(let i=0;i<arr.length;i++){
                if(arr[i] === cls){
                    arr.splice(i,1);
                    el.className = arr.join(' ');
                    return;
                }
            }
        }
    }

    /******日期相关******/
    /**
     * 日期格式化
     * @param srcDate   原始日期
     * @param format    日期格式
     * @return          日期串
     */
    static formatDate(srcDate,format){
        if(nodom.isString(srcDate)){
            //排除日期格式串,只处理时间戳
            let reg = new RegExp(/^\d+$/);
            if(reg.exec(srcDate) !== null){
                try{
                    srcDate = parseInt(srcDate);
                }catch(e){}    
            }
        }
            
        //得到日期
        let srcDate = new Date(srcDate);
        // invalid date
        if(isNaN(srcDate.getDay())){
            return '';
            // throw Error.handle('invoke','nodom.formatDate',0,'date string','date');
        }

        let o = {
            "M+" : srcDate.getMonth()+1, //月份
            "d+" : srcDate.getDate(), //日
            "h+" : srcDate.getHours()%12 === 0 ? 12 : srcDate.getHours()%12, //小时
            "H+" : srcDate.getHours(), //小时
            "m+" : srcDate.getMinutes(), //分
            "s+" : srcDate.getSeconds(), //秒
            "q+" : Math.floor((srcDate.getMonth()+3)/3), //季度
            "S" : srcDate.getMilliseconds() //毫秒
        };
        let week = {
            "0" : "日",
            "1" : "一",
            "2" : "二",
            "3" : "三",
            "4" : "四",
            "5" : "五",
            "6" : "六"
       };
       //年份单独处理
       if(/(y+)/.test(format)){
           format=format.replace(RegExp.$1, (srcDate.getFullYear()+"").substr(4 - RegExp.$1.length));
       }
       //月日
       nodom.getOwnProps(o).forEach(function(k){
           if(new RegExp("("+ k +")").test(format)){
               format = format.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
           }
       });

       //星期
       if(/(E+)/.test(format)){
           format=format.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "") + week[srcDate.getDay() + ""]);
       }
       return format;
    }

    /**
     * 日期串转日期
     * @param dateStr   日期串
     * @return          日期
     */
    static toDate(dateStr){
        let date1;
        try{
            date1 = new Date(Date.parse(dateStr));
        }catch(e){

        }
        if(!date1){
            throw Error.handle('invoke','nodom.toDate',0,'date string');
        }

        //处理非标准日期串
        //14位
        if(isNaN(date1) || isNaN(date1.getDay())){
            if(dateStr.length === 14){
                dateStr = dateStr.substr(0,4) + '/' + dateStr.substr(4,2) + '/' + dateStr.substr(6,2) + ' ' +
                          dateStr.substr(8,2) + ':' + dateStr.substr(10,2) + ':' + dateStr.substr(12);
                date1 = new Date(Date.parse(dateStr));
            }else if(dateStr.length === 8){ //8位
                dateStr = dateStr.substr(0,4) + '/' + dateStr.substr(4,2) + '/' + dateStr.substr(6,2);
                date1 = new Date(Date.parse(dateStr));
            }
        }
        return date1;
    }
    /******字符串相关*****/
    /**
     * 编译字符串
     * @param str 待编译的字符串
     * @param args1,args2,args3,... 待替换的参数
     * @return 转换后的消息
     */
    static compileStr(){
        let reg = new RegExp(/\{.+?\}/);
        let arr = [];
        let r;
        let args = arguments;
        let str = args[0];
        while((r=reg.exec(str))!==null){
            let rep;
            let sIndex = r[0].substr(1,r[0].length-2);
            let pIndex = parseInt(sIndex)+1;
            if(args[pIndex] !== undefined){
                rep = args[pIndex];
            }else{
                rep = '';
            }
            str = str.replace(reg,rep);
        }
        return str;
    }
    /**
     * json解析
     * @param jsonStr: 待解析json串
     * @return json object
     */
    static parseJson(jsonStr){
        jsonStr = jsonStr.trim();
        let arr = jsonStr.substr(1,jsonStr.length-2).split(',');
        let repStr = "$$nodom.rep_str";
        
        let obj = {};
        let reg1 = new RegExp(/\'/g);
        let reg2 = new RegExp(/\"/g);
        
        arr.forEach(function(item){
            let a = item.split(':');
            if(a[0] !== '"' && a[0] !== "'" || a[a.length-1] !== '"' && a[a.length-1] !== "'"){
                let key = a[0].replace(reg1,'\\\'');
                let v = a[1];
                let l = v.length;
                //去掉两端引号
                if(l>2 && (v[0] === '"' && v[l-1] === '"' || v[0] === '"' && v[l-1] === '"')){
                    v = v.substr(1,l-2);
                }
                obj[key] = v;
            }
        });  
        return obj;
    }

    /**
     * 为字符串值两端添加引号
     * @param srcStr    带转换的字符串
     * @param quot      引号 " 或 ' 或 `
     */
    static addStrQuot(srcStr,quot){
        srcStr = srcStr.replace(/\'/g,'\\\'');
        srcStr = srcStr.replace(/\"/g,'\\\"');
        srcStr = srcStr.replace(/\`/g,'\\\`');
        quot = quot || '"';
        srcStr  = quot + srcStr + quot;
        return srcStr;
    }

    /**
     * 函数调用
     * @param foo   函数
     * @param obj   this指向
     * @param args  参数数组
     */
    static apply(foo,obj,args){
        return Reflect.apply(foo,obj,args);
    }
    /**********ajax相关************/
    /**
     * 加载文件
     * @param type      类型，可设置css和js，默认js，
     * @param path      路径
     * @param callback  回调函数
     * @param retName   针对require返回object时使用
     * @param snyc      同步
     */
    static load(type,path,callback,retName,sync){
        let head = nodom.get('head');
        if(head === null){
            head = document.body;
        }
        
        switch(type){
            case 'css': 
                let cs = nodom.get("link[href='" + path + "']"); 
                if(cs !== null){     
                    return; 
                } 
                let css = nodom.newEl('link');
                css.type = 'text/css'; 
                css.rel = 'stylesheet';  // 保留script标签的path属性
                css.href = path; 
                head.appendChild(css); 
                if(nodom.isFunction(callback)){
                    callback(); 
                } 
                break;     
            case 'js': 
                // 不重复加载
                let cs = nodom.get("script[dsrc='" + path + "']");
                if(cs !== null){ 
                    if(nodom.isFunction(callback)){
                        callback();
                    }
                    return; 
                }
                let script = nodom.newEl('script');
                head.appendChild(script);
                script.setAttribute('dsrc',path);
                nodom.request({
                    url:path,
                    type:'js',
                    async:!sync,
                    successFunc(r){
                        let script = nodom.newEl('script');
                        if(retName){
                            r = retName + '=' + r;
                        }
                        script.innerHTML =  r;
                        head.appendChild(script);
                        script.innerHTML = '';
                        head.removeChild(script);
                        if(nodom.isFunction(callback)){
                            callback();
                        }
                    }
                });
                break;
        }
    }
    /**
     * 请求
     * @param config
     *          url:         请求url,
     *          reqType:     请求类型 GET、POST
     *          type:        返回类型 json、js、text，默认text
     *          async:       是否异步，默认true
     *          mime:        mime 类型
     *          params:      提交参数
     *          successFunc: 成功函数
     *          errorFunc:   失败函数
     *          timeoutFunc: 超时函数
     *          timeout:     超时时间(毫秒)
     *          user:        用户名（跨域是使用）
     *          pwd:         密码 （跨域是使用）
     *          rand:        随机数
     * callback 传递参数 ERR-1 服务器无响应 ERR-2 超时无响应  ERR-3 服务器响应错误  其它:正常返回
     */
    
    static equest(config){
        let req = new XMLHttpRequest();
        if(nodom.isEmpty(config.url)){
            throw Error.handle('invoke','nodom.request',"config.url",'string');
        }
        if(config.params && !nodom.isObject(config.params)){
            throw Error.handle('invoke','nodom.request',"config.params",'object');
        }
        //随机数
        if(config.rand){  //针对数据部分，仅在app中使用
            config.params = config.params || {};
            config.params.$rand = Math.random();
        }

        let async = config.async===false?false:true;
        //设置mime
        /* ie不支持
        let mime = config.type || 'text';
        switch(mime){
            case 'html':
                req.overrideMimeType('text/html;charset=utf-8');
                break;
            case 'json':
                req.overrideMimeType('text/javascript;charset=utf-8');
                break;
            case 'js':
                req.overrideMimeType('text/javascript;charset=utf-8');
                break;
            case 'xml':
                req.overrideMimeType('text/xml;charset=utf-8');
                break;
            default:
                req.overrideMimeType('text/plain;charset=utf-8');
        }*/

        /**
         * 回调函数处理
         */
        //成功函数
        if(typeof config.successFunc === 'function'){
            req.onload = function(e){
                switch(req.status){
                    case 200:
                        let r = req.responseText;
                        switch(config.type){
                            case 'json':
                                try{
                                    r = JSON.parse(r);    
                                }catch(e){
                                    r = {
                                        success:false,
                                        result:{"errmsg":"未知错误"}
                                    }
                                }
                                break;

                        }
                        //为app使用统一错误提示
                        if(r.success !== undefined && r.success === false){
                           Dialog.showErrmsg(r.result.errmsg);
                        }
                        config.successFunc.call(req,r);

                        break; 
                    default:    //服务器异常
                        if(nodom.isFunction(config.errorFunc)){
                            config.errorFunc.call(req,req.status);
                        }                
                }
                
            }
        }

        //异常函数
        if(nodom.isFunction(config.errorFunc)){
            req.onerror = config.errorFunc;
        }

        //超时函数
        if(nodom.isFunction(config.timeoutFunc)){
            req.ontimeout = config.timeoutFunc;
        }

        let reqType = config.reqType||'GET';
        let url = config.url;
        //默认60秒
        config.timeout = config.timeout || 60000;
        //发送请求
        switch(reqType){
            case 'GET':
                //参数
                let pa;
        
                if(nodom.isObject(config.params)){
                    let ar = [];
                    nodom.getOwnProps(config.params).forEach(function(key){
                        ar.push(key + '=' + config.params[key]);
                    });
                    pa = ar.join('&');
                }
                if(pa !== undefined){
                    if(url.indexOf('?') !== -1){
                        url += '&' + pa;
                    }else{
                        url += '?' + pa;
                    }
                }
                req.open(reqType,url,async,config.user,config.pwd);
                if(async){
                    req.timeout = config.timeout;
                }
                req.send(null);
                break;
            case 'POST':
                let fd = new FormData();
                for(let o in config.params){
                    fd.append(o,config.params[o]);
                }
                req.open(reqType,url,async,config.user,config.pwd);
                req.timeout = config.timeout;
                req.send(fd);
                break;
        }
    }
}

//主键
nodom.generatedId = 1;

