;
(() => {
	class Ajax {
		constructor() {
			let me = this;
		}
		static init(config) {
			let me = this;
			config.type = config.type === undefined ? 'get' : config.type;
			switch (config.type) {
				case "get":
					me.getRequest(config);
					break;
				case "post":
					me.postRequest(config);
					break;
			}
		}
		static getRequest(config) {
			let params = config.params || {};
			let url = Object.keys(config.params).map(i => {
				return i + "=" + config.params[i];
			}).join("&");
			if (config.url.endWith("?")) {
				url = config.url + url;
			} else {
				url = config.url + '?' + url;
			}
			let xml = new XMLHttpRequest();
			xml.onload = () => {
				if (xml.status === 200) {
					config.callback(xml.responseText);
				}
			}
			xml.open('get', url);
			xml.send(null);
		}
		static postRequest(config) {
			let file = new FormData();
			let xml = new XMLHttpRequest();
			xml.onload = () => {
				if (xml.status === 200) {
					config.callback(xml.responseText);
				}
			}
			if (config.params.constructor === Array) {
				config.params.forEach((i, index) => {
					file.append("file" + index, i.file);
				});
			} else {
				Object.keys(config.params).forEach(i => {
					file.append(i, config.params[i]);
				});
			}
			xml.open("post", config.url);
			xml.send(file);
		}
	}
	class uploadImage {
		constructor() {}
		init(view) {
			view.$dataName = DD.attr(view, "dataName");
			let template = `<div class="wrap">
			                    <div class="imgs" x-repeat="imgs">
			                        <img src="{{src}}" alt="">
			                        <div class="cancle" e-click="cancle" index="{{$index}}">
			                        </div>
			                    </div>
			                    <div class="select">
			                      <input type="file" class="file" multiple value="{{value}}">
			                      <div class="mask"></div>
			                    </div>
			                    <div class="ensure">
			                       <div class="upload">上传</div>
			                    </div>
			              </div>`;
			view.innerHTML = template;
			view.removeAttribute('dataName');
			view.$forceRender = true;
		}
		deal(files) {
			let me = this;
			let tem = [];
			let regExp = /\.(gif|jpg|jpeg|png|gif|jpg|png)$/;
			for (let i = 0; i < files.length; i += 1) {
				if (regExp.test(files[i].name)) {
					tem.push(files[i]);
				} else {
					me.data.imgs.push({
						src: me.data.fileDefault,
						type: "file",
						file: files[i]
					});
				}
			}
			Promise.all(tem.map(i => {
				return me.addFile(i);
			})).then((r) => {
				me.data.$set("imgs", me.data.imgs);
				me.data.value = "";
			});
		}
		addFile(file) {
			return new Promise((re, rj) => {
				let me = this;
				let fileReader = new FileReader();
				fileReader.onload = (e) => {
					me.data.imgs.push({
						src: e.target.result,
						type: "img",
						file: file
					});
					re();
				}
				fileReader.readAsDataURL(file);
			});
		}
		render(view) {
			let me = this;
			me.data = view.$getData().data;
			if (me.data.init)
				return;
			me.data.init = false;
			setTimeout(() => {
				let input = view.querySelector("input");
				let cancle = view.querySelector(".cancle");
				new DD.Event({
					eventName: "change",
					view: input,
					handler(e, d, v) {
						if (!e.target.files.length) {
							return;
						}
						me.deal(e.target.files);
					}
				});
				new DD.Event({
					view: view.querySelector(".ensure"),
					eventName: "click",
					handler(e, d, v) {
						if (!me.data.imgs.length)
							return;
						Ajax.init({
							type: "post",
							params: me.data.imgs,
							url: "http://112.74.56.131/api/upload",
							callback() {
								alert("upload Success");
							}
						})
					}
				});
			}, 100)
		}
	}
	DD.Plugin.create("uploadImage", uploadImage);
	DD.createModule({
		el: ".el-model",
		onBeforeFirstRender() {},
		data: {
			upload: {
				value: "",
				init: false,
				fileDefault: "imgs/file.png",
				imgs: [],
			}
		},
		methods: {
			cancle(e, d, v) {
				let me = this;
				if (d.$index === undefined)
					return;
				me.data.upload.imgs.splice(d.$index, 1);
				me.data.upload.value = "";
			}
		}
	})
})()