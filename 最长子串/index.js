var getMax = (arr1, arr2) => {
    var status = [];
    status.push([]);
    arr1.forEach(i => {
        status.push([]);
    });
    var result = 0;
    for (var i = 0; i <= arr1.length; i += 1) {
        for (var j = 0; j <= arr2.length; j += 1) {
            if (!i || !j)
                status[i][j] = 0
            else {
                if (arr1[i - 1] === arr2[j - 1]) {
                    status[i][j] = status[i - 1][j - 1] + 1;
                } else {
                    status[i][j] = Math.max(status[i - 1][j], status[i][j - 1]);
                }
            }
        }
    }
    var re = [];
    i = arr1.length;
    j = arr2.length;
    var c = status;
    result = 0 || c[i - 1][j - 1];
    while (result >=0) {
        if (c[i][j] === c[i-1][j]) {
            i--;
        } else {
            if (c[i][j] === c[i][j-1]) {
                j--;
            } else {
                if (c[i][j] === c[i - 1][j - 1]+1) {
                    re[result--] = arr1[i - 1];
                    i--;
                    j--;
                }
            }
        }
    }
    return { len: result, lsc: re };
}
var test1=`ABCBDAB`;
var test2=`BDCABA`
//不连续
console.log(getMax(test1.split(""), test2.split("")).lsc);
//连续
var getMoreList=(arr1,arr2)=>{
	var re=[];
	var index=0,len=0;
	var status=[];
	arr1.forEach(i=>{
		status.push([]);
	});
	status.push([]);
	for(var i=1;i<=arr1.length;i+=1){
		for(var j=1;j<=arr2.length;j+=1){
			if(arr1[i-1]===arr2[j-1]){
				status[i][j]=status[i-1][j-1]+1
			}else{
				status[i][j]=0;
			}
			if(len<=status[i][j]){
				len=status[i][j]
				index=i;
			}
		}
	}
	re=arr2.slice(index-len-1,index);
	return re;
}
console.log(getMoreList(test1.split(""),test2.split("")));