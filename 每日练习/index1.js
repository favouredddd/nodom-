;
(function() {
    // class A 继承 class B
    // function getName() {
    //     console.log(1)
    // }

    // function Foo() {
    //     this.getName = function() {
    //         console.log(2);
    //     };
    //     return this;
    // }
    // Foo.getName = function() {
    //     console.log(typeof this);
    // };
    // Foo.getName();
    class a{
        static test(){
            console.log(1212);
        }
        constructor(){
            var me=this;
            me.name=1;
        }
        getName(){
            console.log(this.name);
        }
    }
    var tem={};
    console.log({}.toString.call(window));
    Object.defineProperty(window,"c",{
        set:function(){
            throw "不能修改const"
        },
        get:function(){
            return 1
        }
    });
    console.log(c);
})()