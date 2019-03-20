;
(function() {
    var up = function(config) {
        var me=this;
        me.init(config);
    };
    up.prototype = {
        constructor: up,
        init: function(config) {
            var me = this;
            me.xml = new XMLHttpRequest();
            me.xml.onload = function() {
                if (me.xml.status === 200) {
                    config.callback(me.xml.responseText);
                }
            }
            switch (config.type) {
                case "GET":
                    me.get(config);
                    break;
                case "POST":
                    me.post(config);
                    break;
            }
        },
        get: function(config) {
            var me = this;
            var tem = [];
            var url = config.url;
            Object.keys(config.params).forEach(i => {
                tem.push(i + '=' + config.params[i]);
            });
            url += url.indexOf("?") + 1 > 0 ? tem.join("&") : "?" + tem.join("&");
            me.xml.open("GET", url);
            me.xml.send(null);
        },
        post: function(config) {
            var me = this;
            var data = new FormData();
            Object.keys(config.params).forEach(i => {
                data.append(i, config.params[i]);
            });
            me.xml.open("POST", config.url);
            me.xml.send(data);
        }
    }
    var upload = function() {
        var me = this;
        me.select = null;
        me.img = null;
        me.input = null;
        me.view = false;
        me.data = null;
        me.ensure = null;
        me.init();
    };
    upload.prototype = {
        constructor: upload,
        init: function() {
            var me = this;
            me.select = document.querySelector(".select");
            me.imgContainer = document.querySelector(".img");
            me.img = me.imgContainer.querySelector("img");
            me.input = document.querySelector(".input");
            me.ensure = document.querySelector(".ensure");
            me.cancle = document.querySelector(".cancel");
            me.cancle.addEventListener("click", me.checkCancle.bind(me), false);
            me.ensure.addEventListener("click", me.upload.bind(me), false);
            me.input.addEventListener("change", function(e) {
                me.judge(e.target);
            }, false);
        },
        judge: function(dom) {
            var me = this;
            me.view = true;
            if (!dom.files[0]) {
                me.view = false;
                me.img.src="";
            } else {
                var reader = new FileReader();
                reader.readAsDataURL(dom.files[0]);
                reader.onload = function(e) {
                    me.img.src = e.target.result;
                    me.data = dom.files[0];
                    me.upload(me.data);
                }
            }
            me.visible();
        },
        visible: function() {
            var me = this;
            if (!me.view) {
                me.select.style.display = "block";
                me.imgContainer.style.display = "none";
                me.input.style.display="block";
            } else {
                me.input.style.display="none";
                me.select.style.display = "none";
                me.imgContainer.style.display = "block";
            }
        },
        upload: function(data) {
            var me = this;
            new up({
                type: "POST",
                params: {file:data},
                url: "http://127.0.0.1:3000/api/post?",
                callback: function(r) {
                  console.log(unescape(r.replace(/\\u/g, '%u')));
                }
            });
        },
        checkCancle:function(){
            var me=this;
            me.view=false;
            me.data=null;
            me.img.src="";
            me.visible();
        }
    };
    new upload();
})();
var test=function(r){
    console.log(r);
}