(() => {
    var quickSort = (arr, l, h) => {
        var le = l;
        var ri = h
        var key = arr[l];
        if(l>=h)
        	return ;
        while (le !== ri) {
            while (le < ri && arr[ri] >= key) {
                ri-=1;
            }
            if(ri>le)
            	arr[le] = arr[ri];
            while (le < ri && arr[le]<=key) {
                le += 1;
            }
            if(le<ri)
            	arr[ri] = arr[le];
        }
        arr[le] = key;
        quickSort(arr,l,le-1);
        quickSort(arr,le+1,h);
    }
    var arr=[1,2,5,3,7,4];
    quickSort(arr,0,arr.length-1);
    console.log(arr);
}
)()