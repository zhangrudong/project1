
// 商品列表
function Goods(){
    this.cont = document.querySelector(".list ul");
    this.url = "http://localhost:5555/date/shop.json";
    this.li = document.querySelectorAll(".list ul li");
    console.log(this.cont)
    
    this.init();
    this.addEvent();
}

Goods.prototype.init = function(){
    var that = this
    ajaxGet(this.url).then(function(res){
        that.res = JSON.parse(res)
        // console.log(that.res)
        that.display()
    })
}

Goods.prototype.display = function(){
    
    var str = ""
    for(var i=0;i<this.res.length;i++){
        // console.log(this.res[i].url)
        
        str += `
        <li index="${this.res[i].id}">
                    <a href="${this.res[i].src}">
                    <img src="${this.res[i].url}">
                    <span>${this.res[i].price}</span>
                    <p>${this.res[i].name}</p></a>
                    <em class="add">加入购物车</em>
                </li>`    
    }
    this.cont.innerHTML = str 
    
}

Goods.prototype.addEvent = function(){
    
    var that = this
    addEvent(this.cont,"click",function(eve){
        // alert("加入购物车成功")
        var e = eve || window.event
        var target = e.target || e.srcElement
        if(target.className == "add"){
            that.id = target.parentNode.getAttribute("index")
         
            that.setCookie()
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

Goods.prototype.setCookie = function(){
    this.goods = getCookie("goods")
    // this.span.innerHTML = this.goods.length
    if(this.goods == ""){
        this.goods=[{
            id:this.id,
            num:1
        }]
    }else{
        var onoff = true
        this.goods = JSON.parse(this.goods)
        for(var i=0;i<this.goods.length;i++){
            if(this.goods[i].id == this.id){
                this.goods[i].num++
                onoff = false
                break
            }
        }
        if(onoff){
            this.goods.push({
                id:this.id,
                num:1
            })
        }
    }
    setCookie("goods",JSON.stringify(this.goods))
}


new Goods();