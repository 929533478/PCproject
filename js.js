
var nav=document.getElementById("nav_main");

~function navChange() {
    var f=0;
    var list=nav.getElementsByTagName("li");
    var divs=utils.getElementsByClass("navigation_sub",nav);
    var cur=null;
    nav.onmouseover=function (e) {
        e=e||window.event;
        e.target=e.target||e.srcElement;
        if(e.target.parentNode.tagName.toUpperCase()=="LI"&&e.target.parentNode.className=="list_item"){
            cur=utils.next(e.target);
            detailFn.call(e.target.parentNode);
            e.preventDefault();
        }
    };
    nav.onmouseleave=function () {
        f=0;
        utils.addClass(cur,"selectSub");
        utils.css(cur,{height:44,opacity:1});
        setTimeout(function () {
            animate(cur,{height:0,opacity:0},500,function () {
                utils.removeClass(cur,"selectSub");
                utils.css(cur,{height:44,opacity:1});
            })
        },800);
    };
    for(var i=0;i<list.length;i++){
        (function (i) {
            list[i].onmouseleave=function () {
                utils.removeClass(divs[i],"selectSub");
            }
        })(i)
    }
    function detailFn() {
        for(var i=0;i<list.length;i++){
            if(list[i]==this){
                if(!f){
                    utils.css(divs[i],{height:0,opacity:0});
                    animate(divs[i],{opacity:1,height:44},1000);
                    utils.addClass(divs[i],"selectSub");
                    f++;
                }
                else {
                    utils.addClass(divs[i],"selectSub");
                }
            }
        }
    }
}();
