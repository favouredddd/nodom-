let util = {
	getItem(str) {
		let me = this
		if (str.indexOf('Object') !== -1) {
			return JSON.parse(localStorage.getItem(str))
		}
		return localStorage.getItem(str)
	},
	setItem(key, value) {
		let me = this
		if (key.indexOf('object') !== -1) {
			localStorage.setItem(key, JSON.stringify(value))
		}
		localStorage.setItem(key, value)
	}
}
class myUtil{
	static deepClone(obj) {
		let map = new WeakMap();
		return this.cloneDeep(map, obj);
	}
	static cloneDeep(map, obj) {
		if (typeof obj !== 'object')
			return obj;
		if (!obj)
			return null;
		if (map.get(obj)){
			return null;
		}
		map.set(obj, obj);
		let result;
		let test = {}.toString.call(obj);
		if (test === `[object Object]`) {
			result = {};
			Reflect.ownKeys(obj).forEach(i => {
				result[i] = this.cloneDeep(map, obj[i]);
			});
		}
		if(test===`[object Array]`){
			result=[];
			obj.forEach((i,index,arr)=>{
				result[index]=this.cloneDeep(map,i);
			});
		}
		return result;
	}
}
let object={
	a:1,
	b:2,
}
let sys=Symbol();
console.log(myUtil.deepClone(object));
