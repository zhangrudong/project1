// 所有商品分类，三级菜单鼠标进入显示，离开隐藏


function Classify(){
    this.ali = document.querySelectorAll("nav .n-l .menu li")
    this.menu = document.querySelector("nav .n-l .menu-r")
    this.h6 = document.querySelector("nav .n-l .menu-r h6")
    this.nl = document.querySelector("nav .n-l")
    this.init()
}

Classify.prototype.init = function(){
    var that = this
    for(var i=0;i<this.ali.length;i++){
       
        this.ali[i].setAttribute("hehe",i)
                
        this.ali[i].onmouseenter=function(){
        
            that.menu.style.display="block";
            var index = this.getAttribute("hehe");
            that.h6.innerHTML = that.ali[index].innerHTML
        }
                
        this.nl.onmouseleave =function(){
            that.menu.style.display="none"
        }
    }
           
}

new Classify();


// 下拉搜索菜单框
function Select(){

    function stopBubble(e){
                if(e.stopPropagation){
                    e.stopPropagation()
                }else{
                    e.cancelBubble = true;
                }
    };
    var olist =document.querySelector(".list")
    var ali = olist.children
    var otxt = document.querySelector("header .h-c-b .txt" )
    
    var onoff = true
    var index = 0
    otxt.onclick=function(eve){
        
        var e = eve || window.event
        stopBubble(e)
        if(onoff == true){
            olist.style.display="block";
            for(var j=0;j<ali.length;j++){
                ali[j].className="";
            }
            ali[index].className = "active"
            onoff = false
        }else{
            olist.style.display="none"
            onoff = true
        }
    }
    document.onclick=function(){
        olist.style.display="none"
        onoff = true
    }
    for(var i=0;i<ali.length;i++){
        ali[i].index = i;
        ali[i].onmouseover=function(){
            index = this.index
            for(var j=0;j<ali.length;j++){
                ali[j].className="";
            }
            this.className="active"
        }
        ali[i].onclick=function(){
            otxt.placeholder = this.innerHTML
            index = this.index
        }
    }
    
    document.onkeydown=function(eve){
        if(onoff==true){
            return
        }
        var e=eve || window.event
        var code = e.keycode || e.which
    
        if(code==38){
            if(index==0){
                index=0
            }else{
                index --
            }
            for(var j=0;j<ali.length;j++){
                ali[j].className="";
            }
            ali[index].className="active"
            otxt.placeholder = ali[index].innerHTML
        }
        if(code==40){
            if(index==ali.length-1){
                index=ali.length-1
            }else{
                index ++
            }
            for(var j=0;j<ali.length;j++){
                ali[j].className="";
            }
            ali[index].className="active"
            otxt.placeholder = ali[index].innerHTML
        }
        if(code==13){
            olist.style.display="none"
            onoff = true
        }
    }
}

Select();


// 登录欢迎
class Index{
    constructor(){
        this.p = document.querySelector("#top .div p");
        this.span = document.querySelector("#top .div p span");
        this.exit = document.querySelector("#top .div p #exit");
        this.left = document.querySelector("#top .left");
        this.getData()
        this.addEvent();
    }
    getData(){
        this.date = localStorage.getItem("date");
        // 读取localStorage，如果有就解析成数组，如果没有就给一个空数组，方便操作
        if(this.date == null){
            this.date = [];
        }else{
            this.date = JSON.parse(this.date)
        }
        this.panduan()
    }
    panduan(){
        for(var i=0;i<this.date.length;i++){
            if(this.date[i].onoff == 1){
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
    addEvent(){
        var that = this;
        this.exit.onclick = function(){
            if(that.successUser){
                for(var i=0;i<that.date.length;i++){
                    if(that.date[i].tel === that.successUser){
                        that.date[i].onoff = 0;
                        localStorage.setItem("date",JSON.stringify(that.date))
                        that.panduan();
                    }
                }
            }
        }
    }
}

new Index();


