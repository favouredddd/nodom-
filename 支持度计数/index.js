;
(function() {
    var list = [
        ["面包", "牛奶"],
        ["面包", "尿布", "啤酒", "鸡蛋"],
        ["牛奶", "尿布", "可乐", "面包"],
        ["面包", "牛奶", "尿布", "啤酒"],
        ["面包", "牛奶", "尿布", "可乐"]
    ];
    var map = [];
    list.forEach(i => {
        i.forEach(it => {
            map.push(it);
        });
    });
    var re=[];
    var result=[];
    var all = 3;
    var orignData=[];
    map = [...new Set(map)];
    var count = function() {
        var me = this;
        function dele(arr) {
            var tem = [];
            var r = [];
            arr.forEach(i => {
                tem.push([].concat(i))
            });
            for (var i = 0; i < tem.length - 1; i += 1) {
                for (var j = i + 1; j < tem.length; j += 1) {
                    var c = 0;
                    tem[i].forEach(it => {
                        if (tem[j].indexOf(it) !== -1) {
                            c++;
                        }
                    });
                    if (c === tem[i].length) {
                        r.push(j);
                    }
                }
            }
            var t = r.length;
            var first = 0;
           r=Array.from(new Set(r));
            for (var i = 0; i < r.length; i++) {
                arr[r[i]] = 0;
            }
            for (var i = 0; i < arr.length; i += 1) {
                if (arr[i] === 0) {
                    arr.splice(i, 1);
                    tem.splice(i,1);
                    i--;
                }
            }
        }

        function getC(arr) {
        	var tem=[];
            arr.forEach(i => {
                var count;
                i.all = 0;
                list.forEach(j => {
                    var c = 0;
                    i.forEach(k => {
                        if(j.indexOf(k)!==-1){
                        	c++;
                        }
                    });
                    if (c === i.length) {
                        i.all += 1;
                    }
                });
            });
            var OA=[];
             arr.forEach(i=>{
            	var tems=i.concat([]);
            	tems.all=i.all;
            	OA.push(tems);
            });
            orignData.push(OA);
            for (var i = 0; i < arr.length; i += 1) {
                if (arr[i].all < all) {
                    arr.splice(i, 1);
                    i--;
                }
            }
            arr.forEach(i=>{
            	var temA=i.concat([]);
            	temA.all=i.all;
            	tem.push(temA);
            });
            re.push(tem);
        }
        function getList(m, map) {
            var tem = [];
            m.forEach(i => {
                var result = [];
                var r = [];
                map.forEach((it) => {
                    if (i.indexOf(it) === -1)
                        r.push(it);
                });
                if (!r.length)
                    return;
                r.forEach(t => {
                    tem.push(Array.from(new Set(i.concat(t))));
                });
            });
            dele(tem);
            getC(tem);
            return tem;
        }
        k = 3;
        var m = [];
        var table={};
        while (k > 1) {
            if (k === 3) {
                map.forEach(i => {
                    m.push([i]);
                });
                getC(m);
            }
            var tem = [];
            m.forEach(i => {
                i.forEach(it => {
                    tem.push(it);
                });
            });
            tem = [...new Set(tem)];
            m = getList(m, tem);
            k -= 1;
        }
        function birth(m,map){
        	 var tem = [];
        	m.forEach(i => {
                var r = [];
                map.forEach((it) => {
                    if (i.indexOf(it) === -1)
                        r.push(it);
                });
                if (!r.length)
                    return;
                r.forEach(t => {
                    tem.push(Array.from(new Set(i.concat(t))));
                });
            });
            return tem;
        }
        var c=1;
        var cc=[];
        var z=[];
        while(c<m[0].length){
        	var dd=tem;
        	if (c === 1) {
                tem.forEach(i => {
                    z.push(i);
                    cc.push([i]);
                    result.push([i]);
                });
            }
            c++;
        	cc=birth(cc,z);
        	dele(cc);
        	cc.forEach(i=>{
        		result.push(i.concat([]));
        	});
        }
        var mytabe=[];
       result.forEach(i=>{
       	re[i.length-1].forEach((it)=>{
       		count=0;
       		i.forEach(j=>{
       			if(it.indexOf(j)!==-1){
       				count+=1;
       			}
       		});
       		if(count===i.length){
       			mytabe.push({name:i,value:it,total:re[2][0].all,per:re[2][0].all/it.all,re:re[re.length-1][0]});
       		}
       	});
       });
       console.log(mytabe);
       console.log(re);
       console.log(orignData);
    }
    count();
})()