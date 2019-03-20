;(function(){
	var createTree=function(arr){
		var me=this;
		me.arr=arr;
		me.r={};
		me.r=me.create(me.r,0);
	};
	createTree.prototype={
		contructor:createTree,
		create:function(node,index){
			var me=this;
			node={};
			if(me.arr[2*index+1]&&me.arr[2*index+2]){
				node.left=me.create(node.left,2*index+1);
				node.right=me.create(node.right,2*index+2);
			}
			node.value=me.arr[index];
			return node;
		}
	};
	var arr=[50,45,40,20,25,35,30,10,15];
	var r=new createTree(arr);
	console.log(r);
})()