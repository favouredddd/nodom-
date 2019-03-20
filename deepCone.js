 let nodom = {
        isobject(obj) {
            return typeof obj === 'object';
        },
        isObject(obj) {
            return this.isobject(obj)&&{}.toString.call(obj) === '[object Object]';
        },
        isArray(arr) {
            return this.isobject(obj)&&{}.toString.call(arr) === '[object Array]';
        },
        isNull(obj) {
            return this.isobject(obj)&&{}.toString.call(obj) === '[object Null]';
        },
        cloneobject(src, oldMap = new Map()) {
            let map = new WeakMap();
            let dst=this.clone(src, map, oldMap);
            map=null;
            oldMap=null;
            return dst;
        },
        clone(src, map, oldMap) {
            let dst;
            if (!this.isobject(src) || this.isNull(src))
                return src;
            //本次对象的拷贝
            if (map.get(src)) {
                return map.get(src);
            }
            //多个对象的合并
            if (oldMap.get(src)) {
                return oldMap.get(src);
            }
            if (this.isObject(src)) {
                dst = {};
                //null指向
                map.set(src, dst);
                if (!oldMap.get(src)) {
                    oldMap.set(src, dst);
                }
                Object.getOwnPropertyNames(src).forEach(prop => {
                    dst[prop] = this.clone(src[prop], map, oldMap);
                });
            } else {
                dst = [];
                map.set(src, dst);
                if (!oldMap.get(src)) {
                    oldMap.set(src, dst);
                }
                src.forEach((i, index) => {
                    dst[index] = this.clone(i, map, oldMap);
                });
            }
            return dst;
        },
        merge(){
            //对象共享空间
            var map = new Map();
            //去重
            let arr = [...new Set(arguments)];
            if (arr.length === 1) {
                return arr[0];
            }
            for (let i = 0; i < arr.length; i += 1) {
                if (!this.isobject(arr[i])) {
                    throw new Error("merge must object")
                    return;
                }
                if (!arr[i]) {
                    throw new Error("can not merge null Object");
                    return;
                }
            }
            let dst = Object.assign.apply(null, arr);
            //多个对象都指向新对象
            arr.forEach(i => {
                map.set(i, dst);
            });
            Object.getOwnPropertyNames(dst).forEach(props => {
                dst[props] = this.cloneobject(dst[props], map)
            }, this);
            map=null;
            return dst;
        }
    };
