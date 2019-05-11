"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 所有商品分类，三级菜单鼠标进入显示，离开隐藏


function Classify() {
    this.ali = document.querySelectorAll("nav .n-l .menu li");
    this.menu = document.querySelector("nav .n-l .menu-r");
    this.h6 = document.querySelector("nav .n-l .menu-r h6");
    this.nl = document.querySelector("nav .n-l");
    this.init();
}

Classify.prototype.init = function () {
    var that = this;
    for (var i = 0; i < this.ali.length; i++) {

        this.ali[i].setAttribute("hehe", i);

        this.ali[i].onmouseenter = function () {

            that.menu.style.display = "block";
            var index = this.getAttribute("hehe");
            that.h6.innerHTML = that.ali[index].innerHTML;
        };

        this.nl.onmouseleave = function () {
            that.menu.style.display = "none";
        };
    }
};

new Classify();

// 下拉搜索菜单框
function Select() {

    function stopBubble(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    };
    var olist = document.querySelector(".list");
    var ali = olist.children;
    var otxt = document.querySelector("header .h-c-b .txt");

    var onoff = true;
    var index = 0;
    otxt.onclick = function (eve) {

        var e = eve || window.event;
        stopBubble(e);
        if (onoff == true) {
            olist.style.display = "block";
            for (var j = 0; j < ali.length; j++) {
                ali[j].className = "";
            }
            ali[index].className = "active";
            onoff = false;
        } else {
            olist.style.display = "none";
            onoff = true;
        }
    };
    document.onclick = function () {
        olist.style.display = "none";
        onoff = true;
    };
    for (var i = 0; i < ali.length; i++) {
        ali[i].index = i;
        ali[i].onmouseover = function () {
            index = this.index;
            for (var j = 0; j < ali.length; j++) {
                ali[j].className = "";
            }
            this.className = "active";
        };
        ali[i].onclick = function () {
            otxt.placeholder = this.innerHTML;
            index = this.index;
        };
    }

    document.onkeydown = function (eve) {
        if (onoff == true) {
            return;
        }
        var e = eve || window.event;
        var code = e.keycode || e.which;

        if (code == 38) {
            if (index == 0) {
                index = 0;
            } else {
                index--;
            }
            for (var j = 0; j < ali.length; j++) {
                ali[j].className = "";
            }
            ali[index].className = "active";
            otxt.placeholder = ali[index].innerHTML;
        }
        if (code == 40) {
            if (index == ali.length - 1) {
                index = ali.length - 1;
            } else {
                index++;
            }
            for (var j = 0; j < ali.length; j++) {
                ali[j].className = "";
            }
            ali[index].className = "active";
            otxt.placeholder = ali[index].innerHTML;
        }
        if (code == 13) {
            olist.style.display = "none";
            onoff = true;
        }
    };
}

Select();

// 登录欢迎

var Index = function () {
    function Index() {
        _classCallCheck(this, Index);

        this.p = document.querySelector("#top .div p");
        this.span = document.querySelector("#top .div p span");
        this.exit = document.querySelector("#top .div p #exit");
        this.left = document.querySelector("#top .left");
        this.getData();
        this.addEvent();
    }

    _createClass(Index, [{
        key: "getData",
        value: function getData() {
            this.date = localStorage.getItem("date");
            // 读取localStorage，如果有就解析成数组，如果没有就给一个空数组，方便操作
            if (this.date == null) {
                this.date = [];
            } else {
                this.date = JSON.parse(this.date);
            }
            this.panduan();
        }
    }, {
        key: "panduan",
        value: function panduan() {
            for (var i = 0; i < this.date.length; i++) {
                if (this.date[i].onoff == 1) {
                    this.left.style.display = "none";
                    this.p.style.display = "block";

                    this.span.innerHTML = this.date[i].tel;
                    this.successUser = this.date[i].tel;
                    return;
                }
            }
            this.left.style.display = "block";
            this.p.style.display = "none";
            this.span.innerHTML = "";
        }
    }, {
        key: "addEvent",
        value: function addEvent() {
            var that = this;
            this.exit.onclick = function () {
                if (that.successUser) {
                    for (var i = 0; i < that.date.length; i++) {
                        if (that.date[i].tel === that.successUser) {
                            that.date[i].onoff = 0;
                            localStorage.setItem("date", JSON.stringify(that.date));
                            that.panduan();
                        }
                    }
                }
            };
        }
    }]);

    return Index;
}();
new Index();


// 商品详情
var shop = function () {
    function shop() {
        _classCallCheck(this, shop);

        this.getData();
    }

    _createClass(shop, [{
        key: "getData",
        value: function getData() {
            this.date = localStorage.getItem("date");
            if (this.date == null) {
                this.date = [];
            } else {
                this.date = JSON.parse(this.date);
            }
            this.panduan();
        }
    }, {
        key: "panduan",
        value: function panduan() {
            for (var i = 0; i < this.date.length; i++) {
                if (this.date[i].onoff == 1) {
                    // location.href="car.html"
                    return;
                }
            }
            location.href = "login.html";
        }
    }]);

    return shop;
}();

new shop();

// 选项卡
function Tab() {
    this.li = document.querySelectorAll("#t-nav li");
    this.cont = document.querySelectorAll(".shop #cont");
    this.cont2 = document.querySelector(".shop #cont2");
    this.index = 0;

    this.init();
}

Tab.prototype.init = function () {
    var that = this;
    for (var i = 0; i < this.li.length; i++) {
        this.li[i].xuhao = i;
        this.li[i].onclick = function () {

            that.changeIndex(this);
        };
    }
};

Tab.prototype.changeIndex = function (ele) {
    this.index = ele.xuhao;
    this.hide();
};
Tab.prototype.hide = function () {
    for (var i = 0; i < this.li.length; i++) {
        this.li[i].className = "";
        // this.cont[i].innerHTML = ""
        // console.log(this.cont[i])
    }
    this.show();
};
Tab.prototype.show = function () {
    this.li[this.index].className = "te";
    // this.cont2.style.display = "block"
    // this.cont.style.display = "none"
};

new Tab();

// 首页商品列表
function Goods() {
    this.cont = document.querySelector(".shop #cont");
    this.url = "http://localhost:5555/date/shop.json";
    this.li = document.querySelectorAll(".shop #cont li");

    this.span = document.querySelector(".h-r .h-r-r span");
    // console.log(this.span)

    this.init();
    this.addEvent();
}

Goods.prototype.init = function () {
    var that = this;
    ajaxGet(this.url).then(function (res) {
        that.res = JSON.parse(res);
        // console.log(that.res)
        that.display();
    });
};

Goods.prototype.display = function () {

    var str = "";
    for (var i = 0; i < this.res.length; i++) {
        // console.log(this.res[i].url)

        str += "\n        <li index=\"" + this.res[i].id + "\">\n                    <a  href=\"" + this.res[i].src + "\">\n                    <img src=\"" + this.res[i].url + "\">\n                    <span>" + this.res[i].price + "</span>\n                    <p>" + this.res[i].name + "</p></a>\n                    <em class=\"add\">\u52A0\u5165\u8D2D\u7269\u8F66</em>\n                </li>";
    }
    this.cont.innerHTML = str;
};

Goods.prototype.addEvent = function () {

    var that = this;
    addEvent(this.cont, "click", function (eve) {
        // alert("加入购物车成功")
        var e = eve || window.event;
        var target = e.target || e.srcElement;
        if (target.className == "add") {
            that.id = target.parentNode.getAttribute("index");

            that.setCookie();
        }
    });
};

function addEvent(ele, type, callback) {
    if (ele.addEventListener) {
        ele.addEventListener(type, callback, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + type, callback);
    } else {
        ele["on" + type] = callback;
    }
}

Goods.prototype.setCookie = function () {
    this.goods = getCookie("goods");
    // this.span.innerHTML = this.goods.length
    if (this.goods == "") {
        this.goods = [{
            id: this.id,
            num: 1
        }];
    } else {
        var onoff = true;
        this.goods = JSON.parse(this.goods);
        for (var i = 0; i < this.goods.length; i++) {
            if (this.goods[i].id == this.id) {
                this.goods[i].num++;
                onoff = false;
                break;
            }
        }
        if (onoff) {
            this.goods.push({
                id: this.id,
                num: 1
            });
        }
    }
    setCookie("goods", JSON.stringify(this.goods));
};

new Goods();

// 商品列表
function Goodss() {
    this.cont = document.querySelector(".list ul");
    this.url = "http://localhost:5555/date/shop.json";
    this.li = document.querySelectorAll(".list ul li");
    // console.log(this.cont);

    this.init();
    this.addEvent();
}

Goodss.prototype.init = function () {
    var that = this;
    ajaxGet(this.url).then(function (res) {
        that.res = JSON.parse(res);
        // console.log(that.res)
        that.display();
    });
};

Goodss.prototype.display = function () {

    var str = "";
    for (var i = 0; i < this.res.length; i++) {
        // console.log(this.res[i].url)

        str += "\n        <li index=\"" + this.res[i].id + "\">\n                    <a href=\"" + this.res[i].src + "\">\n                    <img src=\"" + this.res[i].url + "\">\n                    <span>" + this.res[i].price + "</span>\n                    <p>" + this.res[i].name + "</p></a>\n                    <em class=\"add\">\u52A0\u5165\u8D2D\u7269\u8F66</em>\n                </li>";
    }
    this.cont.innerHTML = str;
};

Goodss.prototype.addEvent = function () {

    var that = this;
    addEvent(this.cont, "click", function (eve) {
        // alert("加入购物车成功")
        var e = eve || window.event;
        var target = e.target || e.srcElement;
        if (target.className == "add") {
            that.id = target.parentNode.getAttribute("index");

            that.setCookie();
        }
    });
};

function addEvent(ele, type, callback) {
    if (ele.addEventListener) {
        ele.addEventListener(type, callback, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + type, callback);
    } else {
        ele["on" + type] = callback;
    }
}

Goodss.prototype.setCookie = function () {
    this.goods = getCookie("goods");
    // this.span.innerHTML = this.goods.length
    if (this.goods == "") {
        this.goods = [{
            id: this.id,
            num: 1
        }];
    } else {
        var onoff = true;
        this.goods = JSON.parse(this.goods);
        for (var i = 0; i < this.goods.length; i++) {
            if (this.goods[i].id == this.id) {
                this.goods[i].num++;
                onoff = false;
                break;
            }
        }
        if (onoff) {
            this.goods.push({
                id: this.id,
                num: 1
            });
        }
    }
    setCookie("goods", JSON.stringify(this.goods));
};

new Goodss();

var Login = function () {
    function Login() {
        _classCallCheck(this, Login);

        // this.url = "http://www.icodeilife.cn/ctrl/register.php";
        this.tel = $("#tel");
        this.pass = $("#pass");
        this.apass = $("#apass");
        this.sub = $("#sub");
        this.span = $("#span");
        this.aspan = $(".write span");
        this.radio = $("#radio");

        this.init();
        this.getData();
        // console.log(this.apass)
    }

    _createClass(Login, [{
        key: "init",
        value: function init() {

            var that = this;
            this.sub.click(function () {
                if (that.tel.val() != "" && that.pass.val() != "") {
                    that.Proving();
                } else {
                    that.aspan.eq(0).html("请输入正确的手机号");
                }
            });
            // this.radio.click(function(){ 
            //     that.sub.css("background","red")
            // });

            this.tel.blur(function () {
                // console.log(that.tel.val())
                var reg = /^1[3-9]\d{9}$/;
                if (reg.test(that.tel.val())) {

                    that.aspan.eq(0).html("");
                } else {
                    that.aspan.eq(0).html("手机号有误，请重新输入！");
                }
            });

            this.pass.blur(function () {

                var lengthReg = /^.{6,18}$/;
                if (!lengthReg.test(that.pass.val())) {
                    that.aspan.eq(1).html("密码错误！");
                } else {
                    that.aspan.eq(1).html("");
                }
            });

            // this.apass.blur(function(){
            //     if(that.apass.val() != ""){
            //         if(that.apass.val() == that.pass.val()){
            //             // console.log(that.pass.val())
            //             that.aspan.eq(2).html("");

            //         }else{
            //             that.aspan.eq(2).html("用户名密码不符");

            //         }
            //     }
            // });
        }
    }, {
        key: "getData",
        value: function getData() {
            this.date = localStorage.getItem("date");
            // 读取localStorage，如果有就解析成数组，如果没有就给一个空数组，方便操作
            if (this.date == null) {
                this.date = [];
            } else {
                this.date = JSON.parse(this.date);
            }
        }
    }, {
        key: "Proving",
        value: function Proving() {
            for (var i = 0; i < this.date.length; i++) {
                if (this.date[i].tel == this.tel.val() && this.date[i].pass == this.pass.val()) {
                    alert("登录成功,点击跳转到首页");

                    this.date[i].onoff = 1;

                    localStorage.setItem("date", JSON.stringify(this.date));

                    setTimeout(function () {
                        location.href = "index.html";
                    }, 0);
                    return;
                }
            }
            this.aspan.eq(0).html("用户名密码不符");
        }
    }]);

    return Login;
}();

new Login();

// 注册

var register = function () {
    function register() {
        _classCallCheck(this, register);

        // this.url = "http://www.icodeilife.cn/ctrl/register.php";
        this.tel = $("#tel");
        this.pass = $("#pass");
        this.apass = $("#apass");
        this.sub = $("#sub");
        this.span = $("#span");
        this.aspan = $(".write span");
        this.radio = $("#radio");

        this.init();
        this.getData();
        // console.log(this.apass)
    }

    _createClass(register, [{
        key: "init",
        value: function init() {

            var that = this;
            this.radio.click(function () {
                that.sub.css("background", "rgb(255, 115, 0)");
                that.sub.click(function () {
                    that.setData();
                });
            });

            this.tel.blur(function () {
                // console.log(that.tel.val())
                var reg = /^1[3-9]\d{9}$/;
                if (reg.test(that.tel.val())) {

                    that.aspan.eq(0).html("");
                } else {
                    that.aspan.eq(0).html("请输入正确的手机号");
                }
            });

            this.pass.blur(function () {

                var lengthReg = /^.{6,18}$/;
                if (!lengthReg.test(that.pass.val())) {
                    that.aspan.eq(1).html("密码长度不符");
                } else {
                    that.aspan.eq(1).html("");
                }
            });

            this.apass.blur(function () {
                if (that.apass.val() != "") {
                    if (that.apass.val() == that.pass.val()) {
                        // console.log(that.pass.val())
                        that.aspan.eq(2).html("");
                    } else {
                        that.aspan.eq(2).html("密码不一致");
                    }
                }
            });
        }
    }, {
        key: "getData",
        value: function getData() {
            this.date = localStorage.getItem("date");
            // 读取localStorage，如果有就解析成数组，如果没有就给一个空数组，方便操作
            if (this.date == null) {
                this.date = [];
            } else {
                this.date = JSON.parse(this.date);
            }
            // console.log(this.date)
        }
    }, {
        key: "setData",
        value: function setData() {
            if (this.date.length == 0) {
                // 第一次注册
                this.date.push({
                    tel: this.tel.val(),
                    pass: this.pass.val(),
                    onoff: 0
                });
                // this.aspan.eq(3).html("注册成功");
                alert("注册成功，点击立即跳转到登录页面！");
                location.href = "login.html";
                localStorage.setItem("date", JSON.stringify(this.date));
            } else {
                // 不是第一次注册，如果不是第一次注册，需要判断这次注册的和之前注册的是否重名，如果重名，不执行
                for (var i = 0; i < this.date.length; i++) {
                    if (this.date[i].tel === this.tel.val()) {
                        // console.log(this.date[i].user)
                        this.aspan.eq(3).html("已经被注册了，重新换个吧！");
                        return;
                    }
                }
                // 如果执行了，表示没重名，那就再增加一个
                this.date.push({
                    tel: this.tel.val(),
                    pass: this.pass.val(),
                    onoff: 0
                });
                // this.aspan.eq(3).html("注册成功");
                alert("注册成功，点击立即跳转到登录页面！");
                location.href = "login.html";
                localStorage.setItem("date", JSON.stringify(this.date));
            }
        }
    }]);

    return register;
}();

new register();

// 放大镜
function Magnifier() {
    // 1.选元素
    this.sBox = document.querySelector(".s-l .simg");
    this.sImg = document.querySelector(".s-l .simg img");
    this.span = document.querySelector(".s-l .simg span");
    this.bBox = document.querySelector(".s-l .bimg");
    this.list = document.querySelectorAll(".s-l .s-b ul li");
    this.bImg = document.querySelector(".s-l .bimg img");

    // console.log(this.list)

    this.index = 0;
    this.init();
}
Magnifier.prototype.show = function () {

    this.span.style.display = "block";
    this.bBox.style.display = "block";
};
Magnifier.prototype.hide = function () {

    this.span.style.display = "none";
    this.bBox.style.display = "none";
};
Magnifier.prototype.move = function (pos) {

    // console.log(pos.x)

    var l = pos.x - this.span.offsetWidth * 1.6;
    var t = pos.y - this.span.offsetHeight * 2.1;
    // console.log(this.span.offsetWidth)

    if (l < 0) l = 0;
    if (t < 0) t = 0;
    l > this.sBox.offsetWidth - this.span.offsetWidth && (l = this.sBox.offsetWidth - this.span.offsetWidth);

    t > this.sBox.offsetHeight - this.span.offsetHeight && (t = this.sBox.offsetHeight - this.span.offsetHeight);

    this.span.style.left = l + "px";
    this.span.style.top = t + "px";

    var x = l / (this.sBox.offsetWidth - this.span.offsetWidth);
    var y = t / (this.sBox.offsetHeight - this.span.offsetHeight);

    this.bImg.style.left = -x * (this.bImg.offsetWidth - this.bBox.offsetWidth) + "px";
    this.bImg.style.top = -y * (this.bImg.offsetHeight - this.bBox.offsetHeight) + "px";
};
Magnifier.prototype.init = function () {
    var that = this;

    this.sBox.onmouseover = function () {

        that.show();
        this == that.sBox;
        this.onmousemove = function (eve) {
            var e = eve || window.event;
            // console.log(this.offsetLeft)

            that.move({
                x: e.pageX - this.offsetLeft,
                y: e.pageY - this.offsetTop
            });
        };
    };
    this.sBox.onmouseout = function () {
        that.hide();
    };

    // for(var i=0;i<this.list.length;i++){
    //     // console.log(this.list[i])
    //     this.list[i].onclick = function(){
    //         // console.log("dianjile ")
    //     }

    //     // this.sImg = this.list[this.index].children[0]
    // }
};

new Magnifier();



// 购物车
function Car() {
    this.tbody = document.querySelector(" .car tbody");
    this.url = "http://localhost:5555/date/shop.json";

    this.span = document.querySelector(".h-r .h-r-r span");
    this.oa = document.querySelector(".car a");
    this.thead = document.querySelector(" .car thead");
    this.init();
    this.addEvent();
}

Car.prototype.init = function () {
    var that = this;
    ajaxGet(this.url).then(function (res) {
        // console.log(res)
        that.res = JSON.parse(res);
        that.getCookie();
    });
};

Car.prototype.getCookie = function () {
    this.goods = getCookie("goods") != "" ? JSON.parse(getCookie("goods")) : [];
    if (getCookie("goods") != "[]") {
        this.display();
        this.oa.innerHTML = "";
    } else {
        this.thead.innerHTML = "";
    }
};

Car.prototype.display = function () {
    var str = "";
    for (var i = 0; i < this.res.length; i++) {
        for (var j = 0; j < this.goods.length; j++) {
            if (this.res[i].id == this.goods[j].id) {
                str += "<tr index=\"" + this.res[i].id + "\">\n                            <td><img src=\"" + this.res[i].url + "\"/></td>\n                            <td>" + this.res[i].name + "</td>\n                            <td>" + this.res[i].price + "</td>\n                            <td><input type=\"number\" min=1 value=\"" + this.goods[j].num + "\" class=\"num\"></td>\n                            <td ><em class=\"dele\">\u5220\u9664</em></td>\n                        </tr> ";
            }
        }
    }
    this.tbody.innerHTML = str;
    this.span.innerHTML = this.goods.length;
};

Car.prototype.addEvent = function () {
    var that = this;
    addEvent(this.tbody, "input", function (eve) {
        var e = eve || window.eve;
        var target = e.target || e.srcElement;
        if (target.className == "num") {
            // console.log(target.value)
            that.num = target.value;
            that.id = target.parentNode.parentNode.getAttribute("index");
            that.changeCookie(function (i) {
                that.goods[i].num = that.num;
            });
        }
    });
    this.tbody.addEventListener("click", function (eve) {
        var e = eve || window.event;
        var target = e.target || e.srcElement;
        if (target.className == "dele") {
            that.id = target.parentNode.parentNode.getAttribute("index");
            target.parentNode.parentNode.remove();
            // console.log(that.id)
            that.changeCookie(function (i) {
                that.goods.splice(i, 1);
            });
        }
    });
};

function addEvent(ele, type, callback) {
    if (ele.addEventListener) {
        ele.addEventListener(type, callback, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + type, callback);
    } else {
        ele["on" + type] = callback;
    }
}

function removeEvent(ele, type, callback) {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, callback, false);
    } else if (ele.detachEvent) {
        ele.detachEvent("on" + type, callback);
    } else {
        ele["on" + type] = null;
    }
}

Car.prototype.changeCookie = function (callback) {
    for (var i = 0; i < this.goods.length; i++) {
        if (this.goods[i].id == this.id) {
            callback(i);
        }
    }
    setCookie("goods", JSON.stringify(this.goods));
};
new Car();