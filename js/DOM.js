var DOM = (function () { //这个作用域不销毁
    var flag = "getComputedStyle" in window;//判断高版本浏览器
    return {
        listToArray: function (likeArray) {
            var arr = [];
            try {
                arr = Array.prototype.slice.call(likeArray);
            } catch (e) {
                for (var i = 0; i < likeArray.length; i++) {
                    arr.push(likeArray[i]);
                }
            }
            return arr;
        },
        formatJSON: function (str) {
            return "JSON" in window ? JSON.parse(str) : eval('(' + str + ')');
        },
        win: function (attr, val) {//指的是获取window的各种属性
            if (typeof val == "undefined") {
                return document.documentElement[attr] || document.body[attr]
            }
            document.documentElement[attr] = val;
            document.body[attr] = val;
        },
        getCss: function (ele, attr) {//获取元素ele的属性attr
            var val = '';
            var reg = '';
            if (flag) {
                val = getComputedStyle(ele, null)[attr];
            } else {
                if (attr == "opacity") {
                    val = ele.currentStyle["filter"];
                    reg = /^alpha\(opacity=(\d+(\.\d+)?)\)$/;
                    val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
                } else {
                    val = ele.currentStyle[attr];
                }
            }
            reg = /^-?\d+(\.\d+)?(px|pt|em|rem|%)?$/;
            return reg.test(val) ? parseFloat(val) : val;
        },
        offset: function (ele) {//获取ele元素的offsetTop 和offsetLeft
            var top = ele.offsetTop;
            var left = ele.offsetLeft;
            var p = ele.offsetParent;
            while (p) {
                if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
                    top += p.clientTop;
                    left += p.clientLeft;
                }
                top += p.offsetTop;
                left += p.offsetLeft;
                p = p.offsetParent;
            }
            return {
                top: top,
                left: left
            }
        },
        children: function (ele, tagName) {
            var arr = [];
            if (flag) {
                arr = this.listToArray(ele.children);
            } else {
                for (var i = 0; i < ele.childNodes.length; i++) {
                    var cur = ele.childNodes[i];
                    if (cur.nodeType == 1) {
                        arr[arr.length] = cur;
                    }
                }
            }
            if (typeof tagName == "string") {
                var newArr = [];
                for (var i = 0; i < arr.length; i++) {
                    var cur = arr[i];
                    if (cur.nodeName == tagName.toUpperCase()) {
                        newArr.push(cur);
                    }
                }
                arr = newArr;
            }
            return arr;
        },
        prev: function (ele) {
            if (flag) {
                return ele.previousElementSibling;
            }
            var p = ele.previousSibling;
            while (p && p.nodeType != 1) {
                p = p.previousSibling;
            }
            return p;
        },
        next: function (ele) {
            if (flag) {
                return ele.nextElementSibling;
            }
            var p = ele.nextSibling;
            while (p && p.nodeType != 1) {
                p = p.nextSibling;
            }
            return p;
        },
        preAll: function (ele) {
            var arr = [];
            var p = this.prev(ele);
            while (p) {
                arr.unshift(p);
                p = this.prev(p);
            }
            return arr;
        },
        nextAll: function (ele) {
            var arr = [];
            var n = this.next(ele);
            while (n) {
                arr.push(n);
                n = this.next(n);
            }
            return arr;
        },
        /*获取相邻元素,上一个哥哥，下一个弟弟*/
        sibling: function (ele) {
            var arr = [];
            this.prev(ele) ? arr.push(this.prev(ele)) : false;
            this.next(ele) ? arr.push(this.next(ele)) : false;
            return arr;
        },
        /*获取所有的哥哥元素和所有的弟弟元素*/
        siblings: function (ele) {
            return this.preAll(ele).concat(this.nextAll(ele));
        },
        /*获取当前元素的索引位置*/
        index: function (ele) {
            return this.preAll(ele).length;
        },
        /*第一个儿子节点*/
        firstChild: function (container) {
            if (flag) {
                return container.firstElementChild;
            }
            return this.children(container).length ? this.children(container)[0] : null;
        },
        lastChild: function (container) {
            if (flag) {
                return container.lastElementChild;
            }
            return this.children(container).length ? this.children(container)[this.children(container).length - 1] : null;
        },
        /*把某个元素追加到某个元素里面的末尾
         * ele: 指要操作的元素
         * container：要放的盒子，即将ele放到container盒子里
         * */
        append: function (ele, container) {
            return container.appendChild(ele);
        },
        /*加到盒子内元素的前面*/
        /**
         *
         * @param ele 我们要插进去的那个元素
         * @param container  把元素放到那个容器里
         */
        prepend: function (ele, container) {
            var of = this.firstChild(container);
            /*当container的儿子不存在的情况下，自动的把他append进去*/
            return container.insertBefore(ele, of);
        },
        /**
         *
         * @param newEle  新的元素
         * @param oldEle  旧的元素
         */
        insertBefore: function (newEle, oldEle) {
            return oldEle.parentNode.insertBefore(newEle, oldEle);
        },

        /*把某个元素插入到某个元素的后面*/
        insertAfter: function (ele, oldEle) {
            var oN = this.next(oldEle);
            return oldEle.parentNode.insertBefore(ele, oN);
        },
        hasClass: function (ele, name) {
            var reg = new RegExp("(?:^| +)" + name + "(?: +|$)");
            return reg.test(ele.className);
        },
        addClass: function (ele, className) {
            var ary = className.split(/\s+/);
            for (var i = 0; i < ary.length; i++) {
                var cur = ary[i];
                if (!this.hasClass(ele, cur)) {
                    ele.className += " " + cur;
                }
            }
        },
        removeClass: function (ele, className) {
            if (this.hasClass(ele, className)) {
                ele.className = ele.className.replace(className, "");
            }
        },
        getByClass: function(context,className){
            var context=context|document;
            if(flag){
                return this.listToArray(context.getElementsByClassName(className));
            }
            var allTags=context.getElementsByTagName("*");
            var classList=className.replace(/^ +| +$/g,"").split(/\s+/);
            var arr=[];
            for(var i=0;i<allTags.length;i++){
                var cur=allTags[i];
                var f=true;
                for(var k=0;k<classList.length;k++){
                    var curClass=classList[k];
                    var reg=new RegExp("(?:^| +)"+curClass+"(?: +|$)");
                    if(!reg.test(cur.className)){
                        f=false;
                        break
                    }
                }
                if(f){
                    arr.push(cur);
                }
            }
            return arr;
        },
        setCss: function (ele, attr, value) {
            if (attr == 'opacity') {
                // window.navigator.userAgent.indexOf('MSIE') >= 0
                if (/MSIE (?:6|7|8)/.test(window.navigator.userAgent)) {
                    ele.style['filter'] = 'alpha(opacity=' + value * 100 + ')';
                } else {
                    ele.style.opacity = value;
                }
                return;
            }
            if (attr === 'float') {
                ele.style['cssFloat'] = value;
                ele.style['styleFloat'] = value;
                return;
            }
            var reg = /^(width|height|left|top|right|bottom|(margin|padding)(Top|Bottom|Left|Right)?)$/;
            // 5px
            if (reg.test(attr)) {
                if (!isNaN(value)) {
                    value += 'px';
                }
            }
            ele.style[attr] = value;
        },
        /**
         *
         * @param ele  要设置的元素
         * @param obj  要
         */
        setGroupCss: function (ele, obj) {
            //首先保证obj是一个对象
            /*
             if(!Object.prototype.toString.call(obj) == '[object Object]'){
             return;
             }
             */
            //我嫌弃这个有点长
            obj = obj || '0'; //如果没传要做处理
            if (obj.toString() != '[object Object]') {
                return;
            }
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    this.setCss(ele, key, obj[key]);
                }
            }
        }
    }
})();



