//header
(function () {
    var rightHead = document.getElementsByClassName("right_head")[0];
    var quickPop = document.getElementsByClassName("right_head")[0].getElementsByClassName("quick_pop")[0];
    var quickPopT = document.getElementsByClassName("quick_pop_two")[0];
    var colorA = document.getElementsByClassName("seen")[0];
    var colorT = document.getElementsByClassName("seen_two")[0];
    var res=document.documentElement.clientHeight;
    console.log(document.body.style.height);
    ~function () {
        quickPop.onmouseover = function (e) {
            e = e || window.event;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        };
        quickPopT.onmouseover = function (e) {
            e = e || window.event;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        };
        quickPop.onmouseleave = function (e) {
            e = e || window.event;
            this.style.display = "none";
            colorA.style.color = "#424242";
        };
        quickPopT.onmouseleave = function (e) {
            e = e || window.event;
            this.style.display = "none";
            colorT.style.color = "#424242";
        };

        document.body.onmouseover = function (e) {
            e = e || window.event;
            e.target = e.target || e.srcElement;
            var tar = e.target.tagName.toUpperCase();
            if (tar === "A" && e.target.className === "seen") {
                quickPop.style.display = "block";
                colorA.style.color = "#ff993f";
                return;
            }
            if (tar === "DIV" && e.target.className === "quick_pop") {
                return;
            }
            if (tar === "A" && e.target.className === "seen_two") {
                quickPopT.style.display = "block";
                colorT.style.color = "#ff993f";
                return;
            }
            if (tar === "DIV" && e.target.className === "quick_pop_two") {
                return;
            }
            quickPop.style.display = "none";
            colorA.style.color = "#424242";
            quickPopT.style.display = "none";
            colorT.style.color = "#424242";

        }
    }();

    var search = document.getElementsByClassName("con_search")[0];
    search.onfocus = function () {
        if (this.value == this.defaultValue)
            this.value = "";
    };
    search.onblur = function () {
        var reg = /^\s*$/;
        if (reg.test(this.value)) {
            this.value = "约吧大明星";//
        }
    };

})();
/*登录页*/
var login = document.getElementById("login");
var oDiv = DOM.children(login, "div");
var loginHeader=document.getElementsByClassName("login_header")[0];
var list=loginHeader.getElementsByTagName("li");
for(var i=0;i<list.length;i++){
    var cur=list[i];
    cur.index=i;
    cur.onclick=function(){
        for(var j=0;j<list.length;j++){
            list[j].className='';
            oDiv[j].style.display="none";
        }
        this.className="current";
        oDiv[this.index].style.display="block";
    }
}

var loginTipBtn=document.getElementsByClassName("login_tip_btn");
var mask=document.getElementById("mask");
var loginClose=document.getElementById("login_close");
var qrTips=document.getElementById("qrtips");
var loginQq=document.getElementById("login_qq_wm");
var loginWxWm=document.getElementById("login_wx_wm");
var wxtips=document.getElementById("wxtips");

for(var i=0;i<loginTipBtn.length;i++){
    ~function(i){
        var oLog=loginTipBtn[i];
        oLog.onclick=function(){
            mask.style.display="block";
        }
    }(i);
}
loginClose.onclick=function(){
    mask.style.display="none";
};
loginQq.onmouseenter=function(){
    qrTips.style.display="block";
    zhufengAnimate(qrTips,{opacity:1},500);
};
loginQq.onmouseleave=function(){
    qrTips.style.display="none";
    zhufengAnimate(qrTips,{opacity:0},500);
};
loginWxWm.onmouseenter=function(){
    zhufengAnimate(wxtips,{opacity:1},300);
    var _this=this;
    zhufengAnimate(_this,{left: -75},300);

}
loginWxWm.onmouseleave=function(){
    zhufengAnimate(wxtips,{opacity:0},300);
    var _this=this;
    zhufengAnimate(_this,{left: 0},300);
};


//轮播图

~function () {
    var banner = document.getElementsByClassName("banner")[0];
    var btnL = document.getElementsByClassName("btnL")[0];
    var btnR = document.getElementsByClassName("btnR")[0];
    var text = document.getElementsByClassName("text")[0];
    var imgBox = document.getElementsByClassName("imgBox")[0];
    var bannerPic = document.getElementsByClassName("banner_pic")[0];
    var imgs = imgBox.getElementsByTagName("img");
    var oLis = imgBox.getElementsByTagName("li");
    var xhr=new XMLHttpRequest();
    var data = null;
    xhr.open("get", "banner.txt", false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState ===4 && /^2\d{2}$/.test(xhr.status)) {
            var val = xhr.responseText;
            data = eval('(' + val + ')');
        }
    };
    xhr.send(null);
    var str = "";
    for (var i = 0; i < data.length; i++) {
        var curD = data[i];
        if (i === 0) {
            str += '<li class="fir"><a href="##"><img class="current" src="' + curD.url + '"/></a></li>'
        } else {
            str += '<li><a href="##"><img src="' + curD.url + '"/></a></li>'
        }
    }
    imgBox.innerHTML = str;
    var step = 0;

    function autoMove() {
        if (step < 6) {
            for (var i = 0; i < oLis.length; i++) {
                var cur = oLis[i];
                if (i <= 6) {
                    cur.style.display = "list-item";
                } else {
                    cur.style.display = "none";
                }
            }
            step++;
            DOM.setCss(bannerPic, "background", data[step].img);
            bannerPic.style.opacity = 0;
            text.innerHTML = data[step].title;
            run();
            fadeIn();
        } else if (step >= 6 && step < 13) {
            for (var i = 0; i < oLis.length; i++) {
                var cur = oLis[i];
                if (i >= 7) {
                    cur.style.display = "list-item";
                } else {
                    cur.style.display = "none";
                }
            }
            step++;
            DOM.setCss(bannerPic, "background", data[step].img);
            bannerPic.style.opacity = 0;
            text.innerHTML = data[step].title;
            run();
            fadeIn();
        } else {
            step++;
            step = 0;
            for (var i = 0; i < oLis.length; i++) {
                var cur = oLis[i];
                if (i < 7) {
                    cur.style.display = "list-item";
                } else {
                    cur.style.display = "none";
                }
            }
            DOM.setCss(bannerPic, "background", data[step].img);
            bannerPic.style.opacity = 0;
            text.innerHTML = data[step].title;
            run();
            fadeIn();
        }
    }

    var autoTimer = window.setInterval(autoMove, 5000);

    imgBox.onmouseover=function(){
        clearInterval(autoTimer);
    };
    imgBox.onmouseout=function(){
        autoTimer=window.setInterval(autoMove,5000);
    };
    for(var i=0;i<imgs.length;i++){
        var oImg=imgs[i];
        oImg.index=i;
        oImg.onmouseover=function(){
            step=this.index;
            DOM.setCss(bannerPic, "background", data[step].img);
            bannerPic.style.opacity = 0;
            text.innerHTML = data[step].title;
            run();
            fadeIn();
        }
    }
    function run() {
        for (var i = 0; i < imgs.length; i++) {
            step === i ? imgs[i].className = "current" : imgs[i].className = "";
        }
    }

    for(var g=0;g<oLis;g++){
        ~function(g){
            var cur=oLis[g];
            cur.index=g;
            cur.onclick=function(){
                console.log(1);
                clearInterval(autoTimer);
                step=this.index;
                DOM.setCss(bannerPic, "background", data[step].img);
                bannerPic.style.opacity = 0;
                text.innerHTML = data[step].title;
                run();
                fadeIn();
            }
        }(g);
    }
    btnL.onclick = function () {
        clearTimeout(autoTimer);
        for (var i = 0; i < oLis.length; i++) {
            ~function (i) {
                var curLi = oLis[i];
                var curStyle = curLi.style.display;
                if (curStyle === "list-item") {
                    curLi.style.display = "none"
                } else {
                    curLi.style.display = "list-item";
                }
            }(i);
        }
        autoTimer = window.setInterval(autoMove, 5000);
    };
    btnR.onclick = function () {
        clearTimeout(autoTimer);
        for (var i = 0; i < oLis.length; i++) {
            ~function (i) {
                var curLi = oLis[i];
                var curStyle = curLi.style.display;
                if (curStyle === "list-item") {
                    curLi.style.display = "none"
                } else {
                    curLi.style.display = "list-item";
                }
            }(i);
        }
        autoTimer = window.setInterval(autoMove, 5000);
    };

    function fadeIn() {
        var target = 1;
        var duration = 500;
        var interval = 15;
        var step = target / duration * interval;
        var timer = window.setInterval(function () {
            var curP = getCss(bannerPic, "opacity");
            curP += step;
            if (curP + step >= 1) {
                DOM.setCss(bannerPic, "opacity", 1);
                clearInterval(timer);
            }
            DOM.setCss(bannerPic, "opacity", curP);
        }, interval);
    }

    function getCss(ele, attr) {
        var val = null, reg = null;
        if ("getComputedStyle" in window) {
            val = window.getComputedStyle(ele, null)[attr];
        } else {
            if (attr === "opacity") {
                val = ele.currentStyle["filter"];
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = ele.currentStyle[attr];
            }
        }
        reg = /^(-?\d+(\.\d+)?)(px|pt|em|rem)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    //渐隐渐现轮播图
   ~function(){
       var adListcf=document.getElementsByClassName("cf")[0];
       var adList=adListcf.getElementsByTagName("li");
       var xhr=new XMLHttpRequest();
       var data=null;
       xhr.open("get","banner1.txt",false);
       xhr.onreadystatechange=function(){
           if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
               var val=xhr.responseText;
               data = eval('(' + val + ')');
           }
       };
       xhr.send(null);

       var str='';
       for(var i=0;i<data.length;i++){
           var cur=data[i];
           if(i===0){
               str+='<li class="on"><a href=""><img src="'+cur.url+'" alt=""/></a></li>'
           }else{
               str+='<li><a href=""><img src="'+cur.url+'" alt=""/></a></li>'
           }
       }
       adListcf.innerHTML=str;
       var stepF=0;
       function autoMoveFadeIn(){
           stepF++;
          if(stepF>2){
               stepF=0;
           }
           setbanner();
       }
       function setbanner(){
           for(var i=0;i<adList.length;i++){
               var curLi=adList[i];
               if(i===stepF){
                   DOM.setCss(curLi,'zIndex',1);
                   zhufengAnimate(curLi,{opacity:1},600, function () {
                       var curLiSib=DOM.siblings(this);
                       for(var k=0;k<curLiSib.length;k++){
                           DOM.setCss(curLiSib[k],'opacity',0)
                       }
                   });
                   //continue;
               }else{
                   DOM.setCss(curLi,'zIndex',0)
               }
           }
       }
       var autoFTimer=window.setInterval(autoMoveFadeIn,5000);
   }();

    //渐隐渐现轮播图2
    ~function (){
        var Carousel=document.getElementById("Carousel");
        var lists=Carousel.getElementsByTagName("li");
        var tips=document.getElementById("tips");
        var tipList=tips.getElementsByTagName("li");
        var data=null;
        var xhr=new XMLHttpRequest();
        xhr.open("get","banner2.txt?_="+Math.random(),false);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
                var val=xhr.responseText;
                data= eval('(' + val + ')');
                console.log(data);
            }
        };
        xhr.send(null);
        var str='';
        for(var i=0;i<data.length;i++){
            var cur=data[i];
            if(i===0){
                str+='<li class="on"><a href=""><img src="'+cur.url+'" alt=""/></a></li>'
            }else{
                str+='<li><a href=""><img src="'+cur.url+'" alt=""/></a></li>'
            }
        }
        Carousel.innerHTML=str;
        str='';
        for(var i=0;i<data.length;i++){
            if(i===0){
                str+='<li class="current"></li>'
            }else{
                str+='<li></li>'
            }
        }
        tips.innerHTML=str;
        var step=0;
        function autoMove(){
            step++;
            if(step>5){
                step=0;
            }
            setbanner();
            focus();
        }
        function setbanner(){
            for(var i=0;i<lists.length;i++){
                var curLi=lists[i];
                if(i===step){
                    DOM.setCss(curLi,'zIndex',1);
                    zhufengAnimate(curLi,{opacity:1},600, function () {
                        var curLiSib=DOM.siblings(this);
                        for(var k=0;k<curLiSib.length;k++){
                            DOM.setCss(curLiSib[k],'opacity',0)
                        }
                    });
                }else{
                    DOM.setCss(curLi,'zIndex',0)
                }
            }
        }
        var autoFTimer=window.setInterval(autoMove,5000);
        function focus(){
            var tempStep=step>=6?0:step;
            for(var i=0;i<tipList.length;i++){
                var curLi=tipList[i];
                tempStep==i?curLi.className="current":curLi.className="";
            }

        }
    }();


    //推拉门（腾讯）
    var inner=document.getElementById("inner");
    var list=inner.getElementsByTagName("li");
    var li1=list[0],li2=list[1],li3=list[2],li4=list[3],li5=list[4];
    inner.onmouseover=function(e){
        var e=e||window.event;
        var tar= e.target;
        if(tar.parentNode.parentNode.parentNode==li1){
            zhufengAnimate(li1,{width: 992},300);
        }
        if(tar.parentNode.parentNode.parentNode==li2){
            zhufengAnimate(inner,{left:-248},300);
            zhufengAnimate(li2,{width: 992},300);
        }
        if(tar.parentNode.parentNode.parentNode==li3){
            zhufengAnimate(inner,{left:-496},300);
            zhufengAnimate(li3,{width: 992},300);
        }
        if(tar.parentNode.parentNode.parentNode==li4){
            zhufengAnimate(inner,{left:-744},300);
            zhufengAnimate(li4,{width: 992},300);
        }
        if(tar.parentNode.parentNode.parentNode==li5){
            zhufengAnimate(inner,{left:-744},300);
            zhufengAnimate(li5,{width: 992},300);
        }
        for(var i=0;i<list.length;i++){
            list[i].onmouseleave=function(e){
                if(e.target==li1){
                    zhufengAnimate(li1,{width: 248},300);
                }
                if(e.target==li2){
                    zhufengAnimate(inner,{left:0},300);
                    zhufengAnimate(li2,{width: 248},300);
                }
                if(e.target==li3){
                    zhufengAnimate(inner,{left:0},300);
                    zhufengAnimate(li3,{width: 248},300);
                }
                if(e.target==li4){
                    zhufengAnimate(inner,{left:0},300);
                    zhufengAnimate(li4,{width: 248},300);
                }
                if(e.target==li5){
                    zhufengAnimate(inner,{left:0},300);
                    zhufengAnimate(li5,{width: 248},300);
                }

            }
        }

    };

    //推拉门（）
    var doorInner=document.getElementById("door_inner");
    var aList=doorInner.getElementsByTagName("a");
    var a0=aList[0],a1=aList[1],a2=aList[2],a3=aList[3],a4=aList[4],a5=aList[5];
    doorInner.onmouseover=function(e){
        var tar= e.target;
        if(tar.parentNode.parentNode.parentNode==a0){
            zhufengAnimate(a0,{width: 930},300);
        }
        if(tar.parentNode.parentNode.parentNode==a1){
            zhufengAnimate(a1,{width: 930},300);
            zhufengAnimate(doorInner,{left: -190},300);
        }
        if(tar.parentNode.parentNode.parentNode==a2){
            zhufengAnimate(a2,{width: 930},300);
            zhufengAnimate(doorInner,{left: -380},300);
        }
        if(tar.parentNode.parentNode.parentNode==a3){
            zhufengAnimate(a3,{width: 930},300);
            zhufengAnimate(doorInner,{left: -570},300);
        }
        if(tar.parentNode.parentNode.parentNode==a4){
            zhufengAnimate(a4,{width: 930},300);
            zhufengAnimate(doorInner,{left: -760},300);
        }
        if(tar.parentNode.parentNode.parentNode==a5){
            zhufengAnimate(a5,{width: 930},300);
            zhufengAnimate(doorInner,{left: -760},300);
        }
    };
    for(var i=0;i<aList.length;i++){
        aList[i].onmouseleave=function(e){
            if(e.target==a0){
                zhufengAnimate(a0,{width: 170},300);
            }
            if(e.target==a1){
                zhufengAnimate(doorInner,{left:0},300);
                zhufengAnimate(a1,{width: 170},300);
            }
            if(e.target==a2){
                zhufengAnimate(doorInner,{left:0},300);
                zhufengAnimate(a2,{width: 170},300);
            }
            if(e.target==a3){
                zhufengAnimate(doorInner,{left:0},300);
                zhufengAnimate(a3,{width: 170},300);
            }
            if(e.target==a4){
                zhufengAnimate(doorInner,{left:0},300);
                zhufengAnimate(a4,{width: 170},300);
            }
            if(e.target==a5){
                zhufengAnimate(doorInner,{left:0},300);
                zhufengAnimate(a5,{width: 170},300);
            }
        }
    }



    //回到顶部
    var top=document.getElementById("Top");
    var header=document.getElementsByClassName("header")[0];
    var navigation=document.getElementsByClassName("navigation")[0];
    console.log(header,navigation);
    top.onclick=function(){
        this.style.display="none";
        window.onscroll=null;
        var duration=500;
        var interval=10;
        var distance=DOM.win("scrollTop");
        var step=distance/duration*interval;
        var timer=setInterval(function(){
            var curTop=DOM.win("scrollTop");
            if(curTop===0){
                clearInterval(timer);
                window.onscroll=scroll;
                return;
            }
            curTop-=step;
            DOM.win("scrollTop",curTop);
        },interval);
    };


    var curH=document.documentElement.scrollTop;
    window.onscroll=scroll;
    function scroll(){
        var curTop=DOM.win("scrollTop");
        var winH=DOM.win("clientHeight");
        console.log(curTop,curH);
        if(curTop>=winH){
            top.style.display="block";
            return;
        }
        top.style.display="none";
     /*   if(curTop>curH){
            zhufengAnimate(header,{top:-77},500);
            zhufengAnimate(navigation,{top:-121},500);
        }else{
            zhufengAnimate(header,{top:0},500);
            zhufengAnimate(navigation,{top: 0},500)
        }
        curH=curTop;*/
    }


    // 今日热播
    var midFigure=document.getElementsByClassName("mid_figure")[0];
    var oLisMidFigures=midFigure.getElementsByTagName("li");
    var midFigureDown=document.getElementsByClassName("mid_figure_list_two")[0];
    var oLisMidDowns=midFigureDown.getElementsByTagName("li");
    for(var k=0;k<oLisMidFigures.length;k++){
        ~function(k){
            var curM=oLisMidFigures[k];
            curM.onmousemove=function(){
                this.style.background="#f0f0f0";
            };
            curM.onmouseout=function(){
                this.style.background="white";
            }
        }(k);
    }
    for(var j=0;j<oLisMidDowns.length;j++){
        var curPic=oLisMidDowns[j];
        curPic.onmousemove=function(){
            this.style.background="#f0f0f0";
        };
        curPic.onmouseout=function(){
            this.style.background="white";
        }
    }
    var modFigureH=document.getElementsByClassName("mod_figure_h")[0];
    var oLisModFigureH=modFigureH.getElementsByTagName("li");
    for(var i=0;i<oLisModFigureH.length;i++) {
        var curP = oLisModFigureH[i];
        curP.onmousemove = function () {
            this.style.background = "#f0f0f0";
        };
        curP.onmouseout = function () {
            this.style.background = "white";
        }
    }
    var midFigureOn=document.getElementsByClassName("mid_figure_list_on")[0];
    var oLists=midFigureOn.getElementsByTagName("li");
    for(var i=0;i<oLists.length;i++) {
        var curP = oLists[i];
        curP.onmousemove = function () {
            this.style.background = "#f0f0f0";
        };
        curP.onmouseout = function () {
            this.style.background = "white";
        }
    }
    var modRrowRight=document.getElementsByClassName("mod_row_right")[0];
    var modLists=modRrowRight.getElementsByTagName("li");
    for(var i=0;i<modLists.length;i++) {
        var curP = modLists[i];
        curP.onmousemove = function () {
            this.style.background = "#f0f0f0";
        };
        curP.onmouseout = function () {
            this.style.background = "white";
        }
    }
    var modRowRight=document.getElementsByClassName("mod_row_right");
    for(var i=0;i<modRowRight.length;i++){
        var curL=modRowRight[i];
        var lists=curL.getElementsByTagName("li");
        for(var h=0;h<lists.length;h++){
            lists[h].onmouseover=function (){
                this.style.background="#f0f0f0";
            };
            lists[h].onmouseleave=function (){
                this.style.background="#fff";
            }
        }
    }
}();
