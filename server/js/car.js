function Car(){
    this.tbody = document.querySelector(" .car tbody");
    this.url = "http://localhost:5555/date/shop.json";

    this.span = document.querySelector(".h-r .h-r-r span");
    this.oa = document.querySelector(".car a");
    this.thead = document.querySelector(" .car thead");
    this.init();
    this.addEvent();
}

Car.prototype.init = function(){
    var that = this
    ajaxGet(this.url).then(function(res){
        // console.log(res)
        that.res = JSON.parse(res)
        that.getCookie()
    })
}

Car.prototype.getCookie = function(){
    this.goods = getCookie("goods") != "" ?  JSON.parse(getCookie("goods")) :[];
    if(getCookie("goods") != "[]"){
        this.display()
        this.oa.innerHTML = "";
        
    }else{
        this.thead.innerHTML = "";
    }
}

Car.prototype.display = function(){
    var str = ""
    for(var i=0;i<this.res.length;i++){
        for(var j=0;j<this.goods.length;j++){
            if(this.res[i].id == this.goods[j].id){
                str += `<tr index="${this.res[i].id}">
                            <td><img src="${this.res[i].url}"/></td>
                            <td>${this.res[i].name}</td>
                            <td>${this.res[i].price}</td>
                            <td><input type="number" min=1 value="${this.goods[j].num}" class="num"></td>
                            <td ><em class="dele">删除</em></td>
                        </tr> `
            }
        }
    }
    this.tbody.innerHTML = str;
    this.span.innerHTML = this.goods.length
}

Car.prototype.addEvent = function(){
    var that = this
    addEvent(this.tbody,"input",function(eve){
        var e = eve || window.eve
        var target = e.target || e.srcElement
        if(target.className=="num"){
            // console.log(target.value)
            that.num = target.value
            that.id = target.parentNode.parentNode.getAttribute("index")
            that.changeCookie(function(i){
                that.goods[i].num = that.num
            })
        }
    })
    this.tbody.addEventListener("click",function(eve){
        var e = eve || window.event
        var target = e.target || e.srcElement
        if(target.className == "dele"){
            that.id = target.parentNode.parentNode.getAttribute("index")
            target.parentNode.parentNode.remove()
            // console.log(that.id)
            that.changeCookie(function(i){
                that.goods.splice(i,1)
            })

        }
    })
}

function addEvent(ele,type,callback){
    if(ele.addEventListener){
        ele.addEventListener(type,callback,false)
    }else if(ele.attachEvent){
        ele.attachEvent("on"+type,callback)
    }else{
        ele["on"+type] = callback;
    }
}

function removeEvent(ele,type,callback){
    if(ele.removeEventListener){
        ele.removeEventListener(type,callback,false)
    }else if(ele.detachEvent){
        ele.detachEvent("on"+type,callback)
    }else{
        ele["on"+type] = null;
    }
}

Car.prototype.changeCookie = function(callback){
    for(var i=0;i<this.goods.length;i++){
        if(this.goods[i].id==this.id){
           callback(i)
           
        }
    }
    setCookie("goods",JSON.stringify(this.goods))
}

new Car();


class shop{
    constructor(){
        this.getData()
    }
    getData(){
        this.date = localStorage.getItem("date");
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
                // location.href="car.html"
                return;
            }
        }
        location.href="login.html"
    }
    
}

new shop();
